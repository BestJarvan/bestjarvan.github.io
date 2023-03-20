---
title: 微前端方案对比
date: 2022.12.25 20:48
categories: 
  - vue
tags:
  - vue
  - 微前端
  - qiankun
  - wujie
  - micro-app
---
## 什么是微前端

微前端类似微服务，并不是指某一具体的技术，而是一种整合了技术、策略和方法的**宏观架构方案**，是一种将多个可独立交付的小型前端应用聚合为一个整体的架构风格。

## 为什么选择微前端

微前端主要解决了两个问题:

1. 项目迭代导致巨石应用，难以维护

2. 兼容历史应用，实现增量开发

<!-- more -->

优点:

1. 更灵活的技术栈选择
2. 拓展多个技术团队

3. 更快且独立的部署
4. ...

缺点:

1. 用户层面，不连贯的体验问题
2. 多项目、多语言造成的维护成本增加

## [Why Not Iframe](https://www.yuque.com/kuitos/gky7yw/gesexv)

## 微前端框架选择

本次改造使用一下技术栈

基座应用vue2.x

子应用vue2.x

路由模式均为`hash`

### 一. [qiankun](https://github.com/umijs/qiankun)

![d1a6cb48359cf96be6b4cd750a241dfa.png](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202303201601278.png)

图片来源：https://blog.csdn.net/xgangzai/article/details/128489706

#### 基座应用

1. 手动加载(可手动，可自动，自动加载需要修改main.js入口文件)

```vue
<!-- qiankun路由落地页面 -->
<template>
  <div :id="instantId"></div>
</template>

<script>
import { registerMicroApps, loadMicroApp, start } from 'qiankun';

export default {
  name: 'index',

  props: {
    // 实例id
    instantId: {
      type: String,
      default: 'sub-app-viewport'
    },
    // 入口
    entry: {
      type: String,
      default: '//localhost:7101',
    }
  },

  mounted () {
    this.$nextTick(async () => {
      this.$once('unmount', () => {
        console.log('%cqiankun unmount！！！', 'color: orange;font-size: 32px')
        this.app.unmount('#/qiankun')
        this.app = null
      })


      const getActiveRule = (hash) => (location) => location.hash.startsWith(hash);

      this.app = loadMicroApp({
        name: 'vueApp', // app name registered
        entry: this.entry,
        container: `#${this.instantId}`,
        activeRule: getActiveRule('#/qiankun'),
      }, {
        singular: true
      })

      console.log('%cqiankun app =====', 'color: orange;font-size: 32px', this.app)
    })
  },

  destroyed () {
		if (!this.app) return
    this.app.unmount()
    this.app = null
  },
}
</script>
```

2. 路由改造

```javascript
// router.js
import Qiankun from '@/views/qiankun/index'

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard', affix: true }
      },
      // 匹配所有/qiankun路径，防止找不到报错404
      {
        path: 'qiankun/*', // 在主应用中，所有的/qiankun/*路径指向子应用
        component: Qiankun,
        hidden: true
      },
    ]
  },
]

```



#### 子应用

1. 改造入口文件，暴露生命周期

```javascript
// main.js
import Vue from 'vue';
import './public-path'

let instance = null;

function render(props = {}) {
  const { container } = props;

  instance = new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}

export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}

export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
//  router = null;
}

```

2. 新增`public-path.js`文件，并在`main.js`引入

```javascript
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

```

3. 改造路由

```javascript
// router.js
import Layout form '@/components/layout'
import { name } from "../../package.json"

const flag = !!window.__POWERED_BY_QIANKUN__
// 动态前缀，可以写死，这里用的项目名作为前缀，如果独立运行则为/
const prefixPath = flag ? `/${name}` : '/'

const routes = [
  {
    path: prefixPath,
    component: Layout,
    children: [
      // 其他的路由都写到这里
      {
        path: 'home',
        name: 'home',
        meta: {
          // requireAuth: true
        },
        component: () => import('@/views/home')
      },
    ],
  },
];
```

4. 改造`webpack`打包

```javascript
// vue.config.js
const { name } = require('./package.json')

module.exports = {
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*",
    },
    port: 7101
  },
  chainWebpack: config => {
    config.output
      .library(`${name}-[name]`)
      .libraryTarget('umd')
      .jsonpFunction(`webpackJsonp_${name}`)
      .filename('js/[name].[hash].js')
      .chunkFilename('js/[name].[hash].js')
      .end();
  }
}

```



优点:

 	1. 社区活跃，框架经过多个项目打磨，更加成熟
  2. 社区demo多，案例多
  3. 完备的沙箱方案，js 沙箱做了 `SnapshotSandbox`、`LegacySandbox`、`ProxySandbox` 三套渐进增强方案，css 沙箱做了 `strictStyleIsolation`、`experimentalStyleIsolation` 两套适用不同场景的方案

缺点:

 	1. 项目侵入性强，接入成本高
 	2. 页面展示多个子应用时，需要使用 `momery` 路由
  3. 官方文档比较简洁，需要多去社区看demo



### 二. [wujie](https://github.com/Tencent/wujie/blob/master/examples/main-vue/src/main.js)

![img](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202303201438420.webp)

#### 基座应用

1. 改造入口文件，注入无界

```javascript
// main.js
import WujieVue from 'wujie-vue2'

const { setupApp, preloadApp, bus } = WujieVue;

Vue.use(WujieVue)

preloadApp({
  name: 'vue2'
})


```

2. 新建无界页面，路由跳这里

```vue
<template>
  <WujieVue
    width="100%"
    height="100%"
    v-bind="options"
  ></WujieVue>
</template>

<script>
// 推荐抽离到公共js中或单独一个js
const lifecycles = {
  beforeLoad: (appWindow) => console.log(`${appWindow.__WUJIE.id} beforeLoad 生命周期`),
  beforeMount: (appWindow) => console.log(`${appWindow.__WUJIE.id} beforeMount 生命周期`),
  afterMount: (appWindow) => console.log(`${appWindow.__WUJIE.id} afterMount 生命周期`),
  beforeUnmount: (appWindow) => console.log(`${appWindow.__WUJIE.id} beforeUnmount 生命周期`),
  afterUnmount: (appWindow) => console.log(`${appWindow.__WUJIE.id} afterUnmount 生命周期`),
  activated: (appWindow) => console.log(`${appWindow.__WUJIE.id} activated 生命周期`),
  deactivated: (appWindow) => console.log(`${appWindow.__WUJIE.id} deactivated 生命周期`),
  loadError: (url, e) => console.log(`${url} 加载失败`, e),
};

export default {
  name: 'wujie',

  data () {
    return {
      options: {
        name: 'vue2',
        url: '//localhost:9001/#/',
        exec: true,
        sync: true, // 路由同步
        props: {
          params: 1,
          methods: () => {
            console.log(123)
          }
        }, // 传参给子路由
        ...lifecycles // 生命周期
      }
    }
  },
  
  mounted () {
    // 根据基座应用路由分析跳转到子应用对应页面
    const routerStr = location.hash.replace('#/wujie/', '')
    this.options.url += routerStr
  },
}
</script>

```

#### 子应用

1. 改造入口文件

```javascript
// main.js

// 子路由接收方式
window.$wujie?.props // { params: 1, methods: function }
window.$wujie?.props.methods()

// 生命周期改造
if (window.__POWERED_BY_WUJIE__) {
  let instance;
  window.__WUJIE_MOUNT = () => {
    instance = new Vue({
      router,
      store,
      render: (h) => h(App)
    }).$mount("#app");
  };
  window.__WUJIE_UNMOUNT = () => {
    instance.$destroy();
  };
} else {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
}

```



优点:

 	1. 改造成本低，有基于vue的`wujie-vue`和react的` wujie-react`封装，开箱即用
  2. 子应用加载和普通 vue 组件加载并无二致，所有配置都收敛到组件的属性上。
  3. `webcomponent` + `shadowdom`、js-iframe原生沙箱
  4. 支持`plugin`
  5. 子应用保活
  6. 更方便的全局组件挂载
  7. 浏览器降级处理

缺点:

   	1. 社区不如qiankun和micro-app活跃



### 三、[micro-app](https://github.com/micro-zoe/micro-app)

![image](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202303171505687.png)

#### 基座应用

1. 基座应用改造侵入性小

```javascript
// 安装
// npm i @micro-zoe/micro-app --save

// main.js
import Vue from 'vue'
import microApp from '@micro-zoe/micro-app'

microApp.start()

// 预加载
microApp.preFetch([
  { name: 'myApp', url: '//localhost:9001' }
])

// 子应用卸载
window.addEventListener('unmount', function () {
  // 执行卸载相关操作
})

...
Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: (h) => h(App),
})

```

2. 分配路由

```javascript
// router.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import MyPage from './my-page.vue'

Vue.use(VueRouter)

const routes = [
  {
    // 👇 非严格匹配，/my-page/* 都指向 MyPage 页面
    path: '/micro/*', // vue-router@4.x path的写法为：'/my-page/:page*'
    name: 'micro',
    component: MyPage,
  },
]

export default routes
```

3. 页面中使用，数据通信，生命周期

```vue
<!-- my-page.vue -->
<template>
  <micro-app
    name='myApp'
    url='//localhost:9001'
    baseroute='/micro'
		// 传递数据给子应用
		:data='dataForChild'
    @created='handleLifecycle'
    @beforemount='handleLifecycle'
    @mounted='handleLifecycle'
    @unmount='handleLifecycle'
    @error='handleLifecycle'
		// 子应用传递事件
		@datachange='handleDataChange'
  ></micro-app>
</template>

<script>
export default {
  data () {
    return {
      dataForChild: {type: '发送给子应用的数据'}
    }
  },
	methods: {
    handleLifecycle (e) {
			console.log('触发生命周期：', e.type)
    },
    handleDataChange (e) {
      console.log('来自子应用的数据：', e.detail.data)
    }
  }
}
</script>

...
```



#### 子应用

1. 子应用改造

```javascript
// main.js
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 返回基座下发的data数据
const data = window.microApp.getData()
console.log(data)

// 发送数据给基座应用，dispatch只接受对象作为参数
window.microApp.dispatch({type: '子应用发送的数据'})

// umd模式，性能优化，适合频繁挂载、卸载子应用
let app = null
// 👇 将渲染操作放入 mount 函数 -- 必填
function mount () {
  app = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
}

// 👇 将卸载操作放入 unmount 函数 -- 必填
function unmount () {
  app.$destroy()
  app.$el.innerHTML = ''
  app = null
}

// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_ENVIRONMENT__) {
  window[`micro-app-${window.__MICRO_APP_NAME__}`] = { mount, unmount }
} else {
  // 非微前端环境直接渲染
  mount()
}
```

2. 路由改造

```javascript
// router.js
import VueRouter from 'vue-router';
import layOut from '@/components/layOut'

const routes = [
  {
    path: window.__MICRO_APP_BASE_ROUTE__ || '/',
    component: layOut,
    children: [
      ...
    ]
  }
]

const router = new VueRouter({
	mode: "hash",
  // base: process.env.BASE_URL,
  base: window.__MICRO_APP_BASE_ROUTE__ || '/',
  routes
});

export default router;

```

路由约束：

- 基座是hash路由，子应用也必须是hash路由
- 基座是history路由，子应用可以是hash或history路由

基础路由：

1. 如果基座是history路由，子应用是hash路由，不需要设置基础路由baseroute

2. 如果子应用只有一个页面，没有使用`react-router`，`vue-router`之类，也不需要设置基础路由baseroute

3. `vue-router`在hash模式下无法通过base设置基础路由，需要创建一个空的路由页面，将其它路由作为它的children

`Proxy`代理保证`window`的纯净，因`Proxy`没有更好的`polyfill`方案，所以不支持`Proxy`的浏览器(IE、低版本iOS等)无法运行micro-app



优点：

1. 改造成本对比qiankun有所降低
2. 简单的子应用(无路由跳转等)开箱即用
3. 支持`plugin`
4. `webcomponet`、js沙箱、`ShadowDom`等
5. 子应用保活
6. 文档详细、完善，官方手把手demo教学，社区相对活跃

缺点:

1. 复杂子应用有改造成本，需要改造路由才可以正常使用
2. 公用组件挂载麻烦，没有原生支持
3. 低版本浏览器兼容问题(IE等不支持`Proxy`的浏览器)



### 四. [garfish](https://github.com/web-infra-dev/garfish)

![设计理念](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202303161957251.image)

### 五. 本地跨域解决方案

```javascript
// vue.config.js
module.exports = {
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*",
    },
  },
}

```




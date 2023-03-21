---
title: new Vue()的过程
date: 2022.03.10 14:23
categories: 
  - vue
tags:
  - vue源码
---
Vue: `vue@2.6.14`

1. `'core/instance/index'`,定义`Vue`
   * `initMixin`给Vue的原型定义`_init`
     * `_init` 属性的初始化
       * `mergeOptions`合并参数
       * `initLifecycle`初始化挂载生命周期相关属性
       * `initEvents`初始事件相关属性，当父组件绑定到子组件时，供子组件调用
       * `initRender`初始化slot插槽
       * `callHook(vm, 'beforeCreate')` 生命周期调用
       * `initState` 初始化data/method/computed/watch
       * `initProvide` 初始化provide
       * `callHook(vm, 'created')` created生命周期调用
       * `$mount` 调用mountComponent
       <!-- more -->
   * `stateMixin` 初始化dataDef，propsDef的get方法
     * `Vue.prototype.$set = set` 挂载全局$set方法
     * `Vue.prototype.$delete = del` 挂载全局$delete方法
     * `Vue.prototype.$watch` 挂载全局$watch方法，createWatcher
   * `eventsMixin` 初始化eventbus, 挂载`$on, $once, $emit, $off` 方法
   * `lifecycleMixin` 初始化生命周期相关
     * `Vue.prototype._update` 打补丁\_\_patch\_\_，更新数据
     * `Vue.prototype.$forceUpdate` Vue 实例重新渲染方法
     * `Vue.prototype.$destroy` 销毁
     * `mountComponent` 挂载组件
       * 编译template成render函数
       * `callHook(vm, 'beforeMount')` 触发生命周期钩子
       * `new Watcher(vm, updateComponent)` 监听vm，如果已经挂载且未销毁组件，则会触发钩子`callHook(vm, 'beforeUpdate')`
       * `updateComponent` 更新数据，调用`_update`
       * `callHook(vm, 'mounted')` 更新完毕数据后，触发生命周期钩子
   * `renderMixin` 渲染DOM相关
     * `Vue.prototype.$nextTick` 初始化nextTick方法
     * `Vue.prototype._render` render方法



### 生命周期

![new Vue()](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202203081423948.png)


---
title: 记录下小程序项目中的一些问题
date: 2018.06.08 16:39
updated: 2018.06.08 16:39
categories: 
  - wechat
tags:
  - wechat
---
项目中遇到一些问题，不定期更新，多字预警。

1、富文本展示   text有一个decode可以解析textarea中的换行符 等符号 实现简单富文本展示 并且层级不会在最高级、可控制
![image.png](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171420624.png)
<!-- more -->
2、wx.setStorageSync 微信同步保存缓存 调用过多可能会报错 本地保存10MB以内 如果数据过大  在少数手机上会保存超时 解决办法 过大的数据不保存在本地 用的时候直接获取网络请求或者本地请求 (项目中遇到一个两年前的华为手机，数据量较大时会超时报错) 使用sync推荐trycatch包裹、实际项目中某些手机会报错 推荐用异步方法 wx.setStorage({})

3、关于页面数据交互 两种解决办法
>一种是使用内置方法getCurrentPage获取小程序路由堆栈[^router]获取到需要操作的路由页操作对应的方法变量等，缺点就是一单夸多个路由或复杂场景无法维护代码可读性，推荐第二种

>第二种方法使用订阅发布者模式、新建一个js用于处理发布订阅逻辑或者使用npm[^publish]

4、小程序网络请求可以封装在外部文件里 使用promise二次封装 提高开发效率、代码可读性，亦可统一处理header、request和response

5、setData({}) 方法是异步的  同一方法内尽量少调用 会冲突导致某个setdata方法没执行 切回导致元素重绘消耗性能 解决办法 尽量调用一次 越少越好

6、如果webview操作需要刷新自身的话 可以url后面加时间戳 防止因浏览器缓存没有刷新

7、小程序无法动态更改tabs  所有的tabs都是在app.json中配置好的 切最多支持五个 如果小程序要实现类似用户和管理者同时打开一个小程序而展示不同的页面信息的话 有两种方案 

    一种是 自制假的tabs 注入到需要用到的页面 体验不如原生完美有瑕疵
    
    第二种 建立一个index入口页面 在入口文件中进行权限的逻辑判断 设置一个变量保存在本地 之后进入首页后进行判断 在onload中设置需要展示的tab名字图标等信息
```
wx.setTabBarItem({
    index: 0, //下标改变的
    text: "tab名字",
    iconPath: "/utils/icon/未选中",
    selectedIconPath: "/utils/icon/选择"
});
```

8、手机端和电脑端 通过获取时间戳的方法得到结果不一样  电脑端得到时间正常 手机端 获取时间戳 为了兼容iOS 需要写成 "2018-06-01T00:00:00"这种完整格式 得到的时间戳 需要减去8小时 才是正确的时间戳 注意月和日不足两位、保持两位 

new Date("2018-06-01T00:00:00") / 1000 - 28800

9、部分安卓机 图片地址不能有空格 不然会识别不出来 比如 aa bb.png 需写成aa_bb.png

10、组件components可以使用微信提供的behaviors方法实现类似vue的mixins混入、页面page可以手动实现mixins，在微信Page(options)实例化page之前先处理一次options页面数据，判断有mixins就把需要注入的公共方法的所有方法打散到options里面 若有重复的进行覆盖合并

11、项目如果用到第三方框架那么复杂的封装可以使用webpack、gulp等模块打包开发工具自定义开发可以更加契合自身项目的业务场景、按需引入 scss 、 npm、 图片压缩等提高开发效率、缩小代码体积毕竟小程序有主体包2m 分包总大小8m的限制

12、一些特殊组件例如弹窗等可以参考vue 的函数式组件，通过小程的selectComponent方法实现插入，在需要用到的地方留一个锚点元素所有参数方法都在js使用中注入
![image.png](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171420368.png)

[^router]: 小程序路由堆栈最多只有10条 超出替换数组最前面的
[^publish]: Vue项目中可以使用发布订阅着模式页可以使用一个空的vue实例，通过vue内置方法\$on、\$emit、\$off等也可实现 原理相同
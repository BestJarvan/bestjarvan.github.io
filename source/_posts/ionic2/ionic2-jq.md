---
title: ionic2拖拽元素
date: 2018.06.20 18:31
updated: 2018.06.20 18:31
categories: 
  - ionic2
tags:
  - ionic2
  - jquery
  - angular
---
先看效果图
![拖拽元素](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171507697.gif)
<!-- more -->
1、这里用到了jq 所以第一步我们在index 中引入 两个必须的jq
```
  <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script type="text/javascript" src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
```

2、第二步 我们需要在typings.d.ts中声明 $ 和 jQuery 这样才能在ts中使用这个方法
```
declare var $: any;
declare var jQuery: any;
```

3、接着我们需要 引入 touchPunch.ts 这个文件 这是jq的触摸插件 jq封装好的可以直接用 ，下载之后放到某个文件夹下
下载地址：https://gitee.com/bestjarvan/public/blob/master/mini-program-components/drag/touchPunch.ts

4、放好后 我们引入app.module.ts 中 在providers中声明
```
providers:[
    TouchPunchProvider
]
```

5、在html元素中 给需要拖拽的元素一个id 之后在ts中初始化一下我们的jq插件 就可以了
```
// 参考
// html
<ion-fab style="width: 5rem;height: 5rem;" middle right #barrage id="barrage">
  <div ion-fab style="display: none"></div>
  <img src="./assets/images/picdetail_service.png">
</ion-fab>

//ts
constructor(public touchIt:TouchPunchProvider){}

ionViewDidLoad() {
  this.touchIt.init();
  $('#barrage').draggable();
}
```
完结
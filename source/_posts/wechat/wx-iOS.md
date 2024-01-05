---
title: 微信小程序-模拟iOS列表
date: 2018.03.24 10:46
updated: 2018.03.24 10:46
categories: 
  - wechat
tags:
  - wechat
---
最近刚写小程序 发现很多坑 不过先封装了一些简单的组件 慢慢用

码云：[https://gitee.com/bestjarvan/public.git](https://gitee.com/bestjarvan/public.git)

先看效果：
<!-- more -->
![未点击](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171509394.png)

![点击效果](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171509070.png)

用法：

1、把组件放到小程序的根目录下 
2、在需要用的页面json中写下下列代码，路径根据自己的真实路径修改
```
{

  "usingComponents":{

    "button-list": "/components/button-list/button-list"

  }

}
```
3、在页面中引用组件
```
//wxml
    <button-list 
      bind:myevent="buttonClick"  //绑定点击事件
      wx:for="{{listArr}}"        //如果列表多的话，可以循环展示
      text="{{item.name}}"        //显示的列表名字
      img="{{item.img}}"          //名字前的图标，若不传 默认隐藏 只显示文字
      //hideRight="1"             //hideRight 是否显示右边的>号  传任意值隐藏  
    ></button-list> 

//js
//如果使用循环
    listArr:[
      {
        name:'我的会员卡',
        img:'/utils/img/my_01@3x.png'
      },
      {
        name:'联系客服',
        img:'/utils/img/my_02@3x.png'
      }]

buttonClick:(e) => {
    //点击事件点击之后 e.detail.type == 传入组件的text值
    console.log(e.detail.type);
    switch (e.detail.type){
      case '我的会员卡':
        //...
        break;
      //....
}
```
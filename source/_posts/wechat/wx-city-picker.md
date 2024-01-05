---
title: 微信小程序-省市县三级联动组件city-picker
date: 2018.03.24 10:46
updated: 2018.03.24 10:46
categories: 
  - wechat
tags:
  - wechat
---

2018年11月6日更新
![新版效果](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171421576.gif)

## 修改：
  1. 新增半透明mask背景
  2. 城市数据存放本地 大小400kb+有需要可以放自己服务器或者请求高德地图api
  3. 修改样式
  4. 修改整体字体大小
<!-- more -->
码云：https://gitee.com/bestjarvan/public.git

***
2018年3月24日
进一步封装picker-view  使用高德地图城市数据 需要联网或者自行下载到本地

先看效果：
![2.gif](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171444152.gif)



用法：

1、把组件放到小程序的根目录下
2、在app.js 中 请求高德地图城市数据
>2018年11月6日更新  可根据情况添加或者不添加城市数据请求、 默认不添加 城市数据已放在本地
```
//判断本地是否有数据 没有 就请求
onLaunch:() => {
  if (!wx.getStorageSync('citys')) {
      wx.request({
        url: "http://restapi.amap.com/v3/config/district?&subdistrict=3&key=你的高德key",
        method: "GET",
        success: function (res) {
          console.log(res['data']['districts'][0]['districts']);
          //  请求到数据 存在本地
          wx.setStorageSync('citys', res['data']['districts'][0]['districts']);
        }
      })
    }
}
```
3、在需要用的页面json中写下下列代码，路径根据自己的真实路径修改
```
{
  "usingComponents":{
    "city-picker": "../../../components/city-picker/city-picker"
  }
}
```
4、在页面中引用组件
```
//wxml
//绑定选中事件
<city-picker bind:selected="selectCity"></city-picker>

//js
selectCity: function(e){
  console.log(e.detail);
  //打印出来效果{province: "广西壮族自治区", city: "北海市", county: "合浦县"}
}
```
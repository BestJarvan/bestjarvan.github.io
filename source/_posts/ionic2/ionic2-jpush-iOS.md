---
title: ionic2极光推送iOS
date: 2017.08.08 17:03
updated: 2017.08.08 17:03
categories: 
  - ionic2
tags:
 - ionic2
 - jpush
 - angular
---
首先需要申请极光开发者账号 并且创建一个app应用，创建之后需要上传.p12格式的证书，拿到APP_KEY
<!-- more -->
通过 Cordova Plugins 安装，要求 Cordova CLI 5.0+：
```
cordova plugin add jpush-phonegap-plugin --variable APP_KEY=your_jpush_appkey
```
官方给的是API_KEY 我这里用APP_KEY成功了。

下一步安装jpush包
```
npm install ionic2-jpush --save
```

上面两个安装成功后，在config.xml中更改配置
**注意widget 的id 要和 极光开发着账号中的Bundle ID 的值一样**
![](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171442018.png)

![](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171442487.png)



![在package.json中查看配置 "APP_KEY"值和极光的APP_KEY一样就可以。](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171442407.png)


![之后需要在app.module.ts中providers引入](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171442702.png)


```
import { JPushService } from 'ionic2-jpush';
```
![下面就可以正常使用JPush了，在需要的页面中引入](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171442923.png)


![在constructor中构造一个JPush](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171511974.png)

下面可以正常使用官方文档给的方法 
也可以在极光上发送推送了
![](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171442696.png)


![](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171442938.png)

ps: app推送过之后会有一个角标1 打开应用后1没有消失，在xcode中发现注掉了两个方法
![](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171443706.png)



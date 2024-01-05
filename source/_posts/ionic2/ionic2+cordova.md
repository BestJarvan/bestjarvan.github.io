---
title: ionic2+cordova插件实现第三方登录
date: 2017.07.25 17:03
updated: 2017.07.25 17:03
categories: 
  - ionic2
tags:
  - ionic2
  - cordova
  - angular
---
#### 1.首先和所有的都一样，要分别到各个开放平台申请appid，添加测试账号

QQ：腾讯开放平台 http://open.qq.com/
微信：微信开放平台 https://open.weixin.qq.com/
微博：新浪微博开放平台 http://open.weibo.com/
<!-- more -->
#### 2.通过cordova添加插件
QQ:

```
cordova plugin add cordova-plugin-qqsdk --variable QQ_APP_ID=YOUR_QQ_APPID
```
微信:
```
cordova plugin add cordova-plugin-wechat  --variable wechatappid=YOUR_WECHAT_APPID
```
微博:
```
cordova plugin add cordova-plugin-weibosdk --variable WEIBO_APP_ID=YOUR_WEIBO_APPID
```

#### 3.1微博需要进一步去设置redirecturi
在你的config.xml文件中添加
 ```<preference name="REDIRECTURI" value="YOUR_WEIBO_REDIRECTURI" />```
必须要和微博开放平台里面的OAuth2.0 授权设置的一样
![](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171442895.png)

#### 3.2 QQ需要装@ionic-native/qqsdk

```
npm install @ionic-native/qqsdk --save
```
![](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171442379.png)

#### 3.3 微信、微博需要在编译文件中声明变量

```
declare var Wechat:any;
declare var WeiboSDK:any;
```
之后就能在需要的地方直接使用Wechat.XXX 或者 WeiboSDK.XXX方法
![](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171442089.png)

#### 4.第三方登录代码

  #####   4.1 QQ第三方登录:
需要引入QQSDK模块
```
import { QQSDK,QQShareOptions } from '@ionic-native/qqsdk';

constructor(public qq:QQSDK);

QQLogin(){
    const loginOptions: QQShareOptions = {
      client: this.qq.ClientType.QQ,
    };
    this.qq.ssoLogin(loginOptions)
      .then((result) => {
        console.log('shareNews success');
        alert('token is ' + result.access_token);
        alert('userid is ' + result.userid);
      })
      .catch(error => {
        console.log(error);
      });
}
```

##### 4.2 微信、微博第三方登录

```
  sinaLogin(){
    WeiboSDK.ssoLogin(function (args) {
      alert('access token is ' + args.access_token);
      alert('userId is ' + args.userId);
    }, function (failReason) {
      alert(failReason);
    });
  }
  wechatLogin(){
    let scope = "snsapi_userinfo",
      state = "_" + (+new Date());
    Wechat.auth(scope, state, function (response) {
      // you may use response.code to get the access token.
      alert(JSON.stringify(response));
    }, function (reason) {
      alert("Failed: " + reason);
    });
  }
```
**需要注意：**
微信需要认证才能使用；
![](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171442953.png)

微博：
如果微博报错redirect_uri_mismatch 的话 请看3.1 设置redirecturi

如果微博报错sso package or sign error 的话 需要在你的XCode里面的Info找到Bundle identifier这一项，复制粘贴到微博开放平台你的app中的 bundle id 中 保持两者值一致

#### 5.分享和登录用法一致、安装好插件参考readme文档


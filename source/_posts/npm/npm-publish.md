---
title: npm私有平台发布流程
date: 2019.12.15 18:48
updated: 2019.12.16 18:48
categories: 
  - npm
tags:
  - npm
  - nrm
---
### 一、源管理工具nrm

1. 全局安装`npm i -g nrm`
2. 添加逍邦源`nrm add xbb http://npm.xbongbong.com.cn/`
3. 选择源`nrm use xbb`
4. 添加用户到我们的源`npm adduser`，按照提示输入`username`,`password`,`email`参数
<!-- more -->
备注：若不使用nrm源管理工具，则每项npm命令都需要加入

`--registry http://npm.xbongbong.com.cn/`

![](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202112221046249.png)

### 二、发布npm包

1. 进入到项目，例如xbb-utils，`cd ./xbb-utils`
2. 登录刚刚注册的用户`npm login`，跟着操作
3. 检查是否登录成功`npm whoami`，如果输出刚刚登录的用户名，说明登录成功了
4. 发布到私有平台`npm publish`
5. 如果发布的包有问题，撤销发布`npm unpublish`

tips：~ * ^ 和无前缀的区别

- ~ 会匹配最近的小版本依赖包，比如~1.2.3会匹配所有1.2.x版本，但是不包括1.3.0
- ^ 会匹配最新的大版本依赖包，比如^1.2.3会匹配所有1.x.x的包，包括1.3.0，但是不包括2.0.0
- * 这意味着安装最新版本的依赖包
- 不写前缀——锁版本，比如1.2.3只会下载1.2.3版本代码，若没有对应版本则会下载失败

![](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202112221047766.png)

### 三、私有平台

我们可以打开浏览器输入[http://npm.xbongbong.com.cn](http://npm.xbongbong.com.cn)，查看我们刚刚发布的包。

私有平台已配置上游源，淘宝源和npm官方源，所以可以放心使用，找不到的包会现在淘宝源找，没找到再去官方源找。

![](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202112221047705.png)


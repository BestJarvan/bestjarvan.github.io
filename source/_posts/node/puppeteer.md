---
title: 解决安装puppeteer依赖的chromium内核下载失败问题
date: 2023.09.19 11:28
categories: 
  - node
tags:
  - puppeteer
  - nodejs
---

1. 本地可使用代理魔法上网安装

2. 服务器安装
配置puppeteer环境变量，使用国内镜像源下载
```shell
npm config set puppeteer_download_host=https://npmmirror.com/mirrors/
```
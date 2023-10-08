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

ps: v20.1.1(2023-05-05)版本更新 PUPPETEER_DOWNLOAD_HOST 环境变量改为 PUPPETEER_DOWNLOAD_BASE_URL

```shell
# v20.1.1之前版本
npm config set puppeteer_download_host=https://npmmirror.com/mirrors/

# v20.1.1以及之后版本
npm config set puppeteer_download_base_url=https://npmmirror.com/mirrors/
```

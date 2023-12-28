---
title: 解决puppeteer依赖chromium内核下载失败问题
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
# 备用镜像地址
npm config set puppeteer_download_host="https://cdn.npmmirror.com/binaries/"

# v20.1.1以及之后版本
npm config set puppeteer_download_base_url=https://npmmirror.com/mirrors/
# 备用镜像地址
npm config set puppeteer_download_base_url=https://cdn.npmmirror.com/binaries/chrome-for-testing/

# 不需要下载则需要补充环境变量，跳过下载内核步骤
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
```

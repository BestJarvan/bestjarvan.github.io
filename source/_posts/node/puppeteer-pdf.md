---
title: puppeteer生成pdf卡顿解决方案
date: 2023.12.28 17:32
categories: 
  - node
tags:
  - puppeteer
  - nodejs
---

> 最近公司线上pdf生成缓慢，经常超过30s导致请求超时断开，通过排查问题，找到下面这条issues，可解决目前问题

chromium升级到119之后导致原本20页的pdf生成超级慢，通过打印时间发现`puppeteer`的`page.pdf()`方法转换html到pdf用时达到20s左右，根据issues修改版本号降级到Chromium(117.0.5938.92)对照puppeteer的21.3.2版本



降级后`page.pdf`方法生成20页pdf从原本20s降低到680ms，提升将近30倍，整体接口返回时间大概5s左右



- Issues: [#11494](https://github.com/puppeteer/puppeteer/issues/11494)

- `puppeteer`和`chromium`对照表: [support](https://pptr.dev/chromium-support)

- 依赖对照表(提示缺少依赖可以对比安装): [Chrome doesn't launch on Linux](https://pptr.dev/troubleshooting#chrome-doesnt-launch-on-linux)

- 中文乱码: 需要自行下载字体库
``` shell
# 在字体文件目录安装字体
sudo mkfontscale
sudo mkfontdir
sudo fc-cache -fv
```


![#11494](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/image-20231228174532723.png)


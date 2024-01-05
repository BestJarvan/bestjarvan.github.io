---
title: 内存泄漏排查
date: 2021.08.10 18:48
updated: 2021.08.10 18:48
categories: 
  - vue
tags:
  - vue
  - memory
---
### 前言

目前web端在浏览器中操作时，会存在明显的卡顿，而且会越用越卡，初步怀疑是内存泄漏导致。

<!-- more -->

### 问题排查

#### 1. 不断重复打开、关闭页面，发现内存一直在增加；



初始内存占用：

![img](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202207061659725.png)





一顿操作之后：

![img](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202207061658631.png)



排查占用内存较大的数据点：

![img](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202207061658627.png)





#### 2.图表中心来回切换不同图表，会有内存增加情况

可能原因：

1. 页面中有添加自定义的监听事件，但是销毁时没有移除事件
2. echarts在组件销毁的时候可能没有清除引用，组件销毁时需要调用dispose销毁实例





关于内存泄漏的排查方法可参考下面的文章：

1. https://zhuanlan.zhihu.com/p/26269860
2. https://zhuanlan.zhihu.com/p/67843006
3. https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management


---
title: Web API-ResizeObserver详解
date: 2024.3.15 17:29
categories: 
  - js
tags:
  - javascript
  - api

---

> 最近搭建新项目框架遇到一个问题，搜索栏会根据不同屏幕宽度自动换行或者不换行，换行后导致下面内容区域高度过高，造成页面滚动，所以需要动态计算搜索栏的高度，决定下面内容区域的高度(后续通过flex布局实现)，看到了这个`ResizeObserver`挺有意思的

Resize Observer API 提供了一种高性能的机制，通过该机制，代码可以监视元素的大小更改，并且每次大小更改时都会向观察者传递通知。

之前我们需要监控页面尺寸变化，一般都会用到`window.resize()`方法，这个方法会会轮询触发每秒将近60次，监听所有DOM元素的变化，有时候DOM元素尺寸发生了变化，但是窗口大小没有变化也会触发，这时候用这个方法就会造成严重的性能浪费，在MDN上已经不推荐`resize`方法去监听某个元素的变化。

由于以上种种原因，就迎来了一个新的API`ResizeObserver API`

<!-- more -->

#### Methods

`ResizeObserver`提供了三个方法:

- `ResizeObserver.disconnect()`

  ​	`Element`取消观察特定观察者的所有观察目标。

- `ResizeObserver.observe()`

  ​	启动对指定的观察`Element`

- `ResizeObserver.unobserve()`

  ​	结束指定的观察`Element`

#### 兼容性

![support](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/image-20240315180559848.png)

#### Demo

```javascript
// 需要被监听的元素，对应template中的ref
const element = ref(null)

onMounted(() => {
  observer.observe(element.value)
})

onBeforeUnmount(() => {
  observer.disconnect(element.value)
})

const observer = new ResizeObserver((entries) => {
  for (let entry of entries) {
    const { height } = entry.contentRect
    console.log('height: ', height)
    element.value.style.height = `calc(100% - ${height}px)`
  }
})

```


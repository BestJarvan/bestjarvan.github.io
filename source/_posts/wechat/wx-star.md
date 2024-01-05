---
title: 星星评价小程序、网页通用
date: 2018.06.14 17:23
updated: 2018.06.14 17:23
categories: 
  - wechat
tags:
  - wechat
---
先看效果图
![效果图](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171507056.gif)
<!-- more -->
原理是需要两张图片 一张选中的黄色，一张未选中的灰色
![选中](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171508974.png)

![未选中](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171508245.png)

1、循环image标签五次
2、绑定点击事件
3、获取点击下标，并赋值给score变量 
4、三目运算判断score变量于index 的关系 动态更改图片路径
5、此方法网页也可用 通用
```
//wxml
<image class="start" 
        wx:for="{{5}}" 
        data-index="{{index}}"
        bindtap='selectIndexNum' 
        src="{{score >= index ? '/utils/img/big_star_s@3x.png' : '/utils/img/big_star_n@3x.png'}}"
/>

//普通版本 js
selectIndexNum(e){
  this.setData({
    score: +e.currentTarget.dataset.index
  })
},
```
或者增强版效果
```
//点两次相同分数取消选择 js
selectIndexNum(e){
  const i = +e.currentTarget.dataset.index;
  this.setData({
    score: i === this.data.score ? -1 : i
  })
},
```
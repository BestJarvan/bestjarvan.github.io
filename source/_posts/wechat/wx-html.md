---
title: 微信调整字体大小导致h5排版错乱问题解决方案
date: 2022.05.23 17:10
categories: 
  - wechat
tags:
  - wechat
---

把下面代码放到合适位置，列如app.vue即可

iOS:

```javascript
body {
  -webkit-text-size-adjust: 100% !important;
  text-size-adjust: 100% !important;
  -moz-text-size-adjust: 100% !important;
}
```
<!-- more -->


Android:

```javascript
function handleFontSize() {
  // 设置网页字体为默认大小
  WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 })
  // 重写设置网页字体大小的事件
  WeixinJSBridge.on('menu:setfont', function() {
    WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 })
  })
}
if (typeof WeixinJSBridge === "object" && typeof WeixinJSBridge.invoke === "function") {
  handleFontSize()
} else {
  document.addEventListener("WeixinJSBridgeReady", handleFontSize, false)
}
```


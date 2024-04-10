---
title: puppeteer加载动态网络图片
date: 2024.4.10 20:29
categories: 
  - node
  - notes
tags:
  - nodejs
  - puppeteer
  - axios
---

> 通过`puppeteer`无头浏览器生成pdf但是需要动态加载传入的图片url时，可以通过axios下载图片，再转base64展示

```javascript
const fetchBase64Img = async (url) => {
  const arrayBuffer = await axios.get(url, {
    responseType: 'arraybuffer'
  })
  const buffer = Buffer.from(arrayBuffer.data, 'binary').toString("base64");
  return `data:${arrayBuffer.headers["content-type"]};base64,${buffer}`;
}


// puppeteer渲染的dom中可以直接通过img展示
const imgBase64 = await fetchBase64Img(url)
`<img src="${imgBase64}">`
```


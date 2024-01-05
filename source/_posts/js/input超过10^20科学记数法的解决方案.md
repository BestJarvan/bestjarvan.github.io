---
title: input超过10^20科学记数法的解决方案
date: 2020.11.13 16:58
updated: 2020.11.13 16:58
categories: 
  - js
tags:
  - javascript
  - input
---
>项目中用到input type="number" 输入框如果数值超过了10的20次方会显示成10exxx或者10e+xxx 
>解决方案：
>1.说服产品，一般情况下不会存在大于10的20次方或者小于是的负10次方的值
>2.转换成字符串形式展示

网上找的不是这个不匹配就是那个结果不对，那干脆自己写个好了
<!-- more -->
```javascript
function ScientificNumber (num) {
    if (!num) return num
    const str = num.toString()
    const reg = /^(\d+)(\.\d+)?(e)([+]?\d+)$/
    const reg2 = /^(\d+)(\.\d+)?(e)([-]?\d+)$/
    let arr
    let len
    let zero = ''
    if (reg.test(str)) {
      arr = reg.exec(str)
      // 保留小数位数
      const arr2 = arr[2] ? arr[2].replace('.', '') : ''
      // 此处减去arr2的长度为了兼容有小数情况
      len = Math.abs(arr[4]) - (arr2.length || 0)
      for (var i = 0; i < len; i++) {
        zero += '0'
      }
      return arr[1] + arr2 + zero
    } else if (reg2.test(str)) {
      arr = reg2.exec(str)
      len = Math.abs(arr[4]) - 1
      const arr2 = arr[2] ? arr[2].replace('.', '') : ''
      for (let index = 0; index < len; index++) {
        zero += '0'
      }
      return '0.' + zero + arr[1] + arr2
    } else {
      return num
    }
  }
```

![测试结果](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171510537.png)
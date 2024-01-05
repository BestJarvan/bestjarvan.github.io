---
title: 回调与异步编程
date: 2020.08.07 10:18
updated: 2020.08.07 10:18
categories: 
  - js
tags:
  - javascript
  - event loop
---

#### 一、回调函数的使用场景

1. 异步编程。
2. 事件监听、处理。
3. setTimeout、setInterval方法。
4. 通用功能，简化逻辑。
<!-- more -->
#### 二、异步编程的4种方法

1. 回调函数。
2. 事件监听。
3. 发布订阅。
4. Promise对象。



回调函数是一段可执行的代码段，它作为一个参数传递给其他的代码，其作用是在需要的时候方便调用这段代码。

```javascript
fn1(fn2)
function fn1 () {
  // to do...
  fn2()
}

function fn2 () {
  // to do...
}
```



说到异步编程，那么就有必要了解js的事件循环机制Event Loop

![image.png](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171427632.png)

#### 1. 栈和队列

![image.png](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171427417.png)

栈：    后进先出（LIFO-last in first out）:最后插入的元素最先出来。

队列：先进先出（FIFO-first in first out）:最先插入的元素最先出来。

#### 2. 宏任务和微任务(浏览器)

宏队列，macrotask。一些异步任务的回调会依次进入macro task queue，等待后续被调用：

- setTimeout和setInterval
- requestAnimationFrame
- I/O
- UI rendering

微队列，microtask。 另一些异步任务的回调会依次进入micro task queue，等待后续被调用：

- Promise.then
- Object.observe
- MutationObserver

执行顺序：

1. 执行全局Script同步代码，这些同步代码有一些是同步语句，有一些是异步语句（比如setTimeout等），遇到异步代码根据上述任务划分到对应队列中；
2. 全局Script代码执行完毕后，调用栈Stack会清空；
3. 从微队列microtask queue中取出位于队首的回调任务，放入调用栈Stack中执行，执行完后microtask queue长度减1；
4. 继续取出位于队首的任务，放入调用栈Stack中执行，以此类推，直到直到把microtask queue中的所有任务都执行完毕。（即清空微任务队列，注意：如果在执行microtask的过程中，又产生了microtask，那么会加入到队列的末尾，也会在这个周期被调用执行）
5. microtask queue中的所有任务都执行完毕，此时microtask queue为空队列，调用栈Stack也为空；
6. 取出宏队列macrotask queue中位于队首的任务，放入Stack中执行；
7. 执行完毕后，调用栈Stack为空；
8. 重复第3-7个步骤；
9. ...

简单来说，执行主线程同步代码遇到异步任务挂起划分到对应任务队列，主线程同步代码执行完毕后，清空微任务队列，此时微任务清空，执行栈清空，开始执行宏任务，执行完一个宏任务后查看微任务队列并执行清空，之后继续执行宏任务依次循环。

概念性的东西就这么多，来看几个示例代码，测试一下你是否掌握了:

```javascript
console.log(1)

setTimeout(() => {
  console.log(2)
  Promise.resolve().then(() => {
    console.log(3)
  })
})

new Promise((resolve, reject) => {
  console.log(4)
  resolve(5)
}).then(data => {
  console.log(data)
  return 6
}).then(data => {
  console.log(data)
})

setTimeout(() => {
  console.log(7)
  Promise.resolve().then(() => {
    console.log(8)
  })
})

console.log(9)
```


---
title: 手写call、apply、bind与this指向问题
date: 2022.08.15 10:18
updated: 2022.08.16 10:18
categories: 
  - js
tags:
  - javascript
---

> 本文给大家介绍更完善的手写方法
>
> 虽然手写call，apply，bind网上已经大把大把的文章，且本身知识点比较集中，但是网上的大部分方法都会有这样或者那样的问题，并不完善
>
> 本文带大家从另一个角度，更加完善的理解、学习如何手写call、apply、bind

### 一、用法与区别

1. call：

   `call()` 方法使用一个指定的 `this` 值和单独给出的一个或多个参数来调用一个函数。

2. apply：

   `apply()` 方法调用一个指定 `this` 值的函数，以及以一个数组（或一个[类数组对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#working_with_array-like_objects)）的形式提供的参数。

3. bind：

   `bind()` 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
<!-- more -->
> 总结：call和apply传参不同，但都会调用函数。bind传参和call一样，但是bind会返回this改变后的函数，并不会立即调用。

```javascript
var name = 'lisi'

const obj = {
	name: 'zhangsan'
}

function getName (age, hobby) {
  console.log(`我叫${this.name}，今年${age}岁，喜欢${hobby}`,)
}

getName(20，'电脑') // '我叫lisi，今年20岁，喜欢电脑'
getName.call(obj, 18, '跳舞') // '我叫zhangsan，今年18岁，喜欢跳舞'
getName.apply(obj, [18, '跳舞']) // '我叫zhangsan，今年18岁，喜欢跳舞'
getName.bind(obj, 18, '跳舞')() // '我叫zhangsan，今年18岁，喜欢跳舞'

```



### 二、什么是this

`this` 是指当前函数中正在执行的**上下文环境**，也就是说，`this`指向谁是调用时确定的，而非文本定义。

其次关于`this`，需要记住一句话 ———— 谁调用就指向谁



### 三、如何判断this指向

关于`this`指向问题，非严格模式下一般有以下几种情况：

1. 全局环境下的this指向: window

   ```javascript
   console.log(this) // window
   ```

2. 函数内的this: 

      ```javascript
   var name = 'lisi'
   function getName () {
     console.log(this.name)
   }
      
   getName() // lisi
   // 等同于
   window.getName() // lisi
      ```

3. 对象中的this: 

   ```javascript
   const obj = {
   	name: 'zhangsan',
     getName: function () {
       console.log(this.name)
     }
   }
   obj.getName() // zhangsan
   ```

4. 箭头函数中的this: 箭头函数中没有 this， 它会绑定最近的非箭头函数作用域中的this。首先从它的父级作用域找，如果父级作用域还是箭头函数，就再往上找，一层一层的直到找到this的指向

5. 构造函数中的this: 指向实例，因为通过new关键字构建后已经改变this指向

6. 原型链中的this: 1, 看是谁调用 2, 进行this替换 3, 基于原型链确认结果

   ```javascript
   function Person (name, age) {
     this.name = name
     this.age = age
   }
   
   Person.prototype.getAge = function () {
     console.log(this.age)
   }
   
   Person.prototype.addHobby = function () {
   	this.hobby = '干饭'
   }
   
   const personA = new Person('zhangsan', 18)
   personA.name // zhangsan  this=>personA
   personA.getAge() // 18 this=>personA
   personA.__proto__.name // undefined this=>Person.prototype
   Person.prototype.age // undefined this=>Person.prototype
   personA.addHobby() // personA实例上添加hobby字段 this=>personA
   Person.prototype.addHobby() // Person实例上添加hobby字段 this=>Person
   
   ```



### 四、手写call、apply、bind

根据上述的第三条this指向，我们可以通过构造一个对象来使得改变this的指向，那么我们手写call就有了下面的思路

```javascript
Function.prototype.myCall = function (ctx, ...args) {
  ctx.fn = this
  ctx.fn(...args)
  delete ctx.fn
}

// test
const obj = {
  name: 'zhangsan'
}
function test () {
  console.log(this.name)
}
test() // undefined
test.myCall(obj) // zhangsan
```

我们可以发现，上述方法可以实现改变this的指向，但是上述方法又会存在一些弊端

1. 如果对象里面有`fn`方法，会替换掉对象中的`fn`方法，哪怕改成很偏僻的`__fn`等等，都会存在风险，其次也不美观
2. 如果传入的`ctx`是普通数据类型或者空值，比如`number`，`string`，`null`,`undefined`等
3. 如果函数有返回值，那么这种方法就没办法接收到返回值

那么我们该如何去优化上面的myCall呢？

思考一下

.

.

.

.

.

.

.

.

.

接下来针对上述几个问题进行改进

1. `fn`命名冲突问题，我们可以借助es6的`Symbol`解决

   ```javascript
   // 因为Symbol的唯一性，导致
   const a = Symbol('a')
   const b = Symbol('a')
   a == b // false
   // 所以我们使用完必须删除Symbol，保证对象的干净
   ```

2. 普通数据类型和空值，我们可以通过三目去解决

3. 返回值，我们可以单独接收，最后`return`出去

> 此处使用`globalThis`原因是js运行环境有两种，一种是浏览器中，一种是Node环境，所以使用js内置全局属性来判断

```javascript
Function.prototype.myCall = function (ctx, ...args) {
  ctx = ctx === null || ctx === undefined ? globalThis : Object(ctx)
  const key = Symbol('fn')
  ctx[key] = this
  const res = ctx[key](...args)
  delete ctx[key]
  return res
}

// test
const obj = {
  name: 'zhangsan'
}
test.myCall(null) // this
test.myCall(2) // undefined
test.myCall(obj) // zhangsan
```

测试没问题后，我们可以参考myCall手写剩下的两个myApply和myBind

```javascript
Function.prototype.myApply = function (ctx, args) {
  ctx = ctx === null || ctx === undefined ? globalThis : Object(ctx)
  // 防止args没有或传值不对
  args = Array.isArray(args) ? args : []
  const key = Symbol('fn')
  ctx[key] = this
  const res = ctx[key](...args)
  delete ctx[key]
  return res
}

Function.prototype.myBind = function (ctx, ...args1) {
  ctx = ctx === null || ctx === undefined ? globalThis : Object(ctx)
  const key = Symbol('fn')
  ctx[key] = this
  
  return function (...args2) {
    const res = ctx[key](...args1, ...args2)
    delete ctx[key]
    return res
  }
}
```

下面我们请出特约嘉宾`zhangsan`和`lisi`，帮我们跑一下测试用例，验证下方法的可靠性

```javascript
var name = 'lisi'
const obj = {
  name: 'zhangsan'
}

function test (...args) {
  console.log(`我是: ${this.name}, 我收到了一些参数: ${args}`)
}

function testReturnValue (...args) {
  console.log(`我是: ${this.name}, 我收到了一些参数: ${args}`)
  return '没错就是我'
}

// 思考下下面会输出什么结果
test.myCall(obj)
test.myCall(obj, 1, 2, 3)
const a = testReturnValue.myCall(obj)
const a2 = testReturnValue.myCall(obj, 1, 2, 3)

test.myApply(obj)
test.myApply(obj, 1)
test.myApply(obj, [1])

test.myBind(obj)()
test.myBind(obj, 1, 2)()
test.myBind(obj, 1, 2)(3, 4)





// 输出，从上到下，按顺序排列
// 我是: zhangsan, 我收到了一些参数:
// 我是: zhangsan, 我收到了一些参数: 1,2,3
// 我是: zhangsan, 我收到了一些参数:  a => 没错就是我
// 我是: zhangsan, 我收到了一些参数: 1,2,3  a => 没错就是我

// 我是: zhangsan, 我收到了一些参数:
// 我是: zhangsan, 我收到了一些参数:
// 我是: zhangsan, 我收到了一些参数: 1

// 我是: zhangsan, 我收到了一些参数:
// 我是: zhangsan, 我收到了一些参数: 1, 2
// 我是: zhangsan, 我收到了一些参数: 1, 2, 3, 4

```





参考文献：

* [js原型中的this](https://www.jianshu.com/p/c0af837a6e23)
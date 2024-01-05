---
title: JavaScript语言精粹
date: 2021.12.30 17:10
updated: 2021.12.30 17:10
categories: 
  - notes
tags:
  - javascript
---
1. [运算符优先级](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
![image](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202112271513665.png)
<!-- more -->
2. 优先考虑使用.表示法，因为它更紧凑且可读性更好，但是如果你尝试检索一个不一定存在的值，则需使用['string']写法，它将返回一个`undefined`，若尝试从`undefined`的成员属性中取值，则会导致 TypeError 异常，这时可以通过`&&`运算符避免错误
   ```javascript
   const obj = {
     name: 'zhangsan'
   }
   
   obj.name // 'zhangsan'
   obj['age'] // undefined
   obj.hubby.name // throw 'TypeError'
   obj.hubby && obj.hubby.name // undefiend
   ```
   
3. `for in`语句可以遍历一个对象中的所有属性，该枚举过程将会列出所有的属性——包括函数和原型中的属性。所以通常可以使用`hasOwnProperty` 方法过滤。属性名的**出现顺序是不确定的**，如果你想要确保属性以特定顺序出现，最高的办法就是避免使用`for in`语句，而是创建一个数组，在其中以正确的顺序保函属性名。通过 for 而不是 for in，可以得到我们想要的属性，而不用担心可能发觉出原型链中的属性，并且我们按正确顺序取得了它们的值。

   ```javascript
   const obj = {.........}
   const arr = [
     'name',
     'age',
     'height',
     'weight',
     'hubby'
   ]
   arr.forEach(k => {
   	console.log(item + ': ' + obj[k])
   })
   ```

4. 减少全局变量污染

5. 闭包的好处是内部函数可以访问定义他们的外部函数的参数和变量(除了 this 和 arguments)，且内部函数拥有比外部函数更长的生命周期。

6. 函数柯里化：1.参数复用；2.提前返回；3延迟计算/运行(bind就是个延迟执行的例子)

7. 对象说明符：

   ```javascript
   // bad
   const myObj = maker(a, b, c, d, e)
   
   // good
   const myObj = maker({
   	first: a,
     middle: b,
   	last: c,
     state: d,
     city: e
   })
   // 现在多个参数可以按照任意顺序排列，如果maker函数接受参数使用默认值，那么一些参数也可以忽略调，并且代码也更容易阅读
   ```
   
8. 伪类：当一个函数被创建时，新函数对象会被赋予一个`prototype`属性，他的值是一个包含`constructor`属性且属性值为该新函数的对象。`prototype`是存放继承特征的地方。当采用构造器调用模式，即用`new`前缀调用一个函数时，函数执行方式会被修改。构造器函数存在一个严重的危害，如果你在调用构造器函数时忘记加上`new`前缀，那么this将会绑定到全局对象上，造成不但没有扩充新对象，反而破坏了全局变量环境，所以构造器函数约定明明成首字母大写的形式(es6的class解决了这个问题，如果不用new调用，则会报错。es6的class可以看做是一个语法糖，他的绝大部分功能es5都可以做到，但是es6的class写法更加清晰、更像面对对象编程的语法)。

9. 原型：一个新的对象可以继承一个旧对象的属性(`Object.creat(parentObj)`)。你可以通过构造一个有用的对象开始，接着构造更多的和那个对象类似的对象。这样可以完全避免把一个应用拆解成一系列嵌套抽象类的分类过程。

10. 函数化：上面几种继承模式的一个弱点就是没法保护隐私(私有变量、私有函数)。如果对象的所有状态都是私有的，那么该对象就成为一个『防伪(tamper-proof)』对象。该对象的属性可以被替换或删除，但该对象的**完整性不会受到损害**。

    ```javascript
    const mammal = function (spec, my = {}) {
      // my对象是一个为继承链中的构造器提供秘密共享的容器，my对象可以选择性使用
      let _this
      
      _this = {}
      // _this = new Object()
      // _this = Object.creat({})
    
    	// name和saying现在就是完全私有的，只能通过下面两个方法去访问它，无法从其他方式访问
      _this.getName = function () {
        return spec.name
      }
      _this.say = function () {
    		return spec.saying || ''
      }
        
      return _this
    }
    
    const myMammal = mammal({ name: 'zhangsan' })
    
    // 创建cat继承他，我们的cat只需要关心自身差异
    const cat = function (spec = 'meow') {
      const _this = mammal(spec)
      _this.xyz = function () {
        return 'Hello World'
      }
      _this.getName = function () {
        return 'aaaaaa==' + spec.name
      }
      return _this
    }
    
    const myCat = cat({name: 'lisi'})
    ```

11. 正则尾部符号意义: g(global)/i(ignoreCase)/m(multiline)![image-20211229142706807](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202112291427083.png)

12. 用正则表达式字面量创建RegExp对象共享**同一个单利**：

    ```javascript
    // 字面量
    function test () {
    	return /a/gi
    }
    
    const x = test()
    const y = test()
    
    x.lastIndex = 10
    console.log(y.lastIndex) // 10
    
    // new
    function reg () {
    	return new RegExp(a, 'gi')
    }
    
    const x = reg()
    const y = reg()
    
    x.lastIndex = 8
    console.log(y.lastIndex) // 0
    ```

13. 除了控制字符和特殊字符外，所有的字符都会被按照字面处理，下列字符如果需要按照字面去匹配，那么必须要用一个`\`前缀来进行转义。

    ```javascript
    \ / [ ] ( ) { } ? + * | . ^ $
    ```

14. 正则表达式分组：

    1. 捕获型(/([a-z])/)：任何匹配这个分组的字符都会被捕获。每个捕获型分组都被指定了一个数字。在正则表达式中第一个捕获(的分组是1，第二个捕获(的分组是2。(\$1....$x)
    2. 非捕获型(/(?:a)/)：非捕获型分组仅做简单的匹配，并不会捕获所匹配的文本。这会带来**微弱的性能优势**。非捕获型分组不会干扰捕获型分组的编号。
    3. 向前正向匹配(/(?=a)/)：它类似于非捕获型分组，但在这个组匹配后，文本会倒回到它开始的地方，实际上并不会匹配到任何东西。这不是一个好特性。
    4. 向前负向匹配(/(?!a)/)：它类似于向前正向匹配分组，但只有当它匹配失败时它才回继续向前进行匹配。这不是一个好特性

    ```javascript
    "abcabc".match(/(a)(b)(c)/) // ["abc", "a", "b", "c"]
    "abcabc".match(/(?:a)(b)(c)/) // ["abc", "b", "c"]
    
    '<div>'.match(/<(?=br>)/) // null
    '<br>'.match(/<(?=br>)/) // ["<"]
    
    '<div>'.match(/<(?!br>)/) // ["<"]
    '<br>'.match(/<(?!br>)/) // null
    ```

15. `regexp.exec()`是正则表达式最强大(也是最慢)的方法。如果它成功匹配`regexp`和字符串`string`，它会返回一个数组。数组下标0的元素将包含正则表达式regexp匹配的子字符串。下标1的元素是分组1捕获的文本，2的元素是分组2捕获的文本，以此类推。如果匹配失败，它会放回`null`。如果regexp带有一个g标识，`regexp.lastIndex`会被设置为该匹配后第一个字符的位置，不成功则会重置为0。

16. `regexp.test()`是正则表达式最简单(也是最快)的方法。如果它匹配成功则会返回`true`，否则返回`false`。不要对这个方法使用g标识。

17. 统一的代码风格....

18. 毒瘤：

    1. 全局变量
    2. 自动插入分号

19. 糟粕：

    1. ==，隐式转换：
       1. 对象和布尔值比较时，会先转换为字符串，在转换为数字
       2. 对象和字符串比较时，对象转换为字符串，然后两者进行比较
       3. 对象和数字比较时，对象转化为字符串,然后转换为数字，再和数字进行比较
       4. 字符串和数字比较时，字符串转换为数字
       5. 字符串和布尔值进行比较时，二者全部转换成数值再比较
       6. 布尔值和数字进行比较时，布尔转换为数字

    ```javascript
    '' == 0 // true
    [1,2,3] == '1,2,3' // true
    '0' == false // true
    [] == false // true
    true == 1 // true
    ```

    1. with: js提供了with语句，本意是想用它来快捷的访问对象属性，不幸的是，他的结果有时不可预料
    2. eval: eval传递一个字符串给js编译器，并执行其结果。使用eval会导致代码更加难以阅读，且导致性能显著降低，因为它需要运行编译器。eval函数减弱了程序的安全性，因为他给求值的文本太多权利，而且就像with语句执行方式一样，他降低了语言的性能
    3. continue: 重构移除continue后，性能会得到改善
    4. 缺少块的语句：貌似在做一件事，实际确实另一件事的程序是非常难理解清楚的。

    ```javascript
    if (a)
      t = 1
    	fn()
    
    // 它看起来像是要这样:
    if (a) {
    	t = 1
      fn()
    }
    
    // 实际上本意是
    if (a) {
    	t = 1
    }
    fn()
    ```

    5. 位运算符：在java里，位运算符处理的是整数，ja没有整型，只有双精度浮点数。因此，位操作符把它们的数字运算数先转换成整数，接着执行运算，最后再换回去。再大多数语言中，这些位运算符接近于硬件处理，所以非常快，而js执行环境一般接触不到硬件，所以非常慢。

    ```javascript
    &			and 按位与
    |			or  按位或
    ^			xor 按位异或
    ~			not 按位非
    >>		带符号右位移
    >>>		无符号又位移(用0补足)
    <<		左位移
    ```

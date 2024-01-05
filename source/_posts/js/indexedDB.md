---
title: 前端数据存储之IndexedDB
date: 2020.08.06 11:14
updated: 2020.08.06 11:14
categories: 
  - js
tags:
  - javascript
  - cookie
  - indexedDB
  - localStorage
  - sessionStorage
---

##### 一、关于前端数据存储常用的几个方案

1. Cookie
2. Web Storage
3. IndexDB
<!-- more -->
##### 二、cookie和storage差异对比

|   特点   |                      Cookie                      |                         Web Storage                          |                           IndexDB                            |
| :------: | :----------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| 生命周期 |           可设置过期时间或跟随当前页面           |      localStorage: 永久有效sessionStorage: 跟随当前页面      |            永久有效，除非手动清除，同localStorage            |
| 数据大小 |                        4k                        |                            一般5m                            |                    取决于硬盘的大小的50%                     |
|   局限   | 每次请求都会携带到header中，使请求数据无意义增大 | 对于Object类型数据必须json序列化才能储存，且是同步操作，大数据操作会阻塞进程 | 若磁盘满，最近最少使用的源将首先被删除，然后是下一个，直到浏览器不再超过限制。 |

##### 三、IndexDB特点

1. **键值对储存。**IndexedDB 内部采用对象仓库（object store）存放数据。所有类型的数据都可以直接存入，包括 JavaScript 对象。对象仓库中，数据以"键值对"的形式保存，每一个数据记录都有对应的主键，主键是独一无二的，不能有重复，否则会抛出一个错误。
2. **异步。** IndexedDB 操作时不会锁死浏览器，用户依然可以进行其他操作，这与 LocalStorage 形成对比，后者的操作是同步的。异步设计是为了防止大量数据的读写，锁死用户操作。
3. **支持事务。** IndexedDB 支持事务（transaction），这意味着一系列操作步骤之中，只要有一步失败，整个事务就都取消，数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况，操作数据更安全。
4. **支持索引。** IndexedDB 数据表可以建立索引，索引的意义在于，可以让你搜索任意字段，也就是说从任意字段拿到数据记录。如果不建立索引，默认只能搜索主键（即从主键取值）。
5. **同源限制。** IndexedDB 受到同源限制，每一个数据库对应创建它的域名。网页只能访问自身域名下的数据库，而不能访问跨域的数据库。
6. **储存空间大。** IndexedDB 的储存空间比 LocalStorage 大得多，一般来说不少于 250MB，大小一般是硬盘大小的50%，超过就会触发源回收。
7. **支持二进制储存。** IndexedDB 不仅可以储存字符串，还可以储存二进制数据（ArrayBuffer 对象和 Blob 对象）。

##### 四、IndexDB用法

IndexDB已经被封装抽离成一个个的API，所以使用时可以直接调用浏览器API。

新建数据库，open方法接收两个参数 一个是数据库名字 第二个是版本号，整数，默认为1或当前版本

若没有对应库名的数据库则会进行新建数据库操作

open方法返回一个IDBRequest对象，对象通过**error、success、upgradeneeded**，处理打开数据库的操作结果

```javascript
let request = window.indexedDB.open(databaseName, version)
let db

request.onerror = (event) => {
  console.log('数据库打开报错', event)
}

request.onsuccess = () => {
  db = request.result
  console.log('数据库打开成功', db)
}

request.onupgradeneeded = ({ target: { result } }) => {
  // changing objectStore data is done here, as opposed to a transaction enum:
  db = result
  console.log('数据库升级', db)
}
```

![1](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/MeYVOLxGWMYAOpz2/img/66cc1241-764f-49f5-ba5c-f03599eb3a3e.png)

现在，我们新建了一个名字叫做demoBase的数据库，那么光有数据库是不够的，我们还需要新建对象仓库(object store)类似于MySQL的表

> 要创建一个对象仓库必须在upgradeneeded事件中，而upgradeneeded事件只会在版本号更新的时候触发，这是因为IndexedDB API中不允许数据库中的数据仓库在同一版本中发送变化

```javascript
// changing objectStore data is done here, as opposed to a transaction enum:
request.onupgradeneeded = function ({ target: { result } }) {
  console.log('数据库升级', result)
  db = result
  let objStore
  // Node.contains()返回的是一个boolean，来表示传入的节点是否为该节点的后代节点。
  // 判断是否有person对象仓库 若没有则新建一个对象仓库(即新建表)
  if (!db.objectStoreNames.contains('person')) {
    /**
     * 新建person表 主键(key)是默认建立的索引，比如下面我们使用id做为主键
     * @param name: string
     * @param optionalParameters?: IDBIndexParameters
     * keyPath
     * autoIncrement
    */
     objStore = db.createObjectStore('person', { keyPath: 'id' })
    /**
     * 创建索引 用于快速检索
     * @param name: string
     * @param keyPath: string | string[]
     * @param optionalParameters?: IDBIndexParameters
    */
    objStore.createIndex('nameIndex', 'name', { unique: false })
  }
}
```

现在，数据库和表我们都有了，那么下一步就是操作表，也就是增、删、改、查数据，我们需要通过事务来操作

>一个数据库事务通常包含了一个序列的对数据库的读/写操作。它的存在包含了两个以上目的
>1、为数据库操作序列提供了一个从失败中恢复到正常状态的方法，同时提供了数据库即使在异常状态下仍然保持一致性的方法
>2、当多个应用程序在并发访问数据库时，可以在这些应用程序之间提供一个隔离方法，以防止彼此的操作相互干扰

1. 增

   新增数据，首先需要新建一个事务，新建时必须指定表格名称和操作模式（"只读"或"读写"）

   ```javascript
   function add() {
     let content = db.transaction(['person'], 'readwrite')
     	.objectStore('person')
     	.add({ id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' });
   
     content.onsuccess = (event) => {
       console.log('数据写入成功')
     }
   
     content.onerror = (event) => {
       console.log('数据写入失败')
     }
   }
   ```

   此时一条数据已经新增成功我们可以打开Chrome DevTools，关于数据存储可以打开Application再Storage中找到IndexDB

2. 删

   ```javascript
   function remove() {
     const request = db.transaction(['person'], 'readwrite')
       .objectStore('person')
       .delete(1)
   
     request.onsuccess = (event) => {
       console.log('数据删除成功')
     }
   
     request.onerror = (event) => {
       console.log('数据删除失败')
     }
   }
   ```

   

3. 改

   ```javascript
   function update () {
     const request = db.transaction(['person'], 'readwrite')
       .objectStore('person')
       .put({ id: 1, name: '李四', age: 35, email: 'lisi@example.com' })
   
     request.onsuccess = (event) => {
       console.log('数据更新成功')
     }
   
     request.onerror = (event) => {
       console.log('数据更新失败')
     }
   }
   ```

   

4. 查

   ```javascript
   function search () {
     // 新建查询事务
     const request = db.transaction(['person'])
       .objectStore('person')
   		// 查询主键是1的  
       .get(1)
     	// 通过索引查
     	// .index('name')
       // .get('李四')
   
     request.onsuccess = (event) => {
       if (request.result) {
         console.log('data===', request.result)
       } else {
         console.log('未获得数据记录')
       }
     }
     
     request.onerror = (event) => {
       console.log('事务失败')
     }
   }
   ```

##### 五、简单封装使用

```javascript
class IndexDBDemo {
  db = null

  constructor(name, storeOpt = {}, key = null, indexOpt = {}) {
    if (!this.db) {
      this.init(name, storeOpt, key, indexOpt)
    }
    return this.db
  }

	// 初始化
  init (name, storeOpt = {}, key = null, indexOpt = {}) {
    console.log('init')
    const request = indexedDB.open(name)

    return new Promise((res, reject) => {
      request.onsuccess = () => {
        this.db = request.result
      }
  
      request.onupgradeneeded = function ({ target: { result } }) {
        this.db = result
        if (!this.db.objectStoreNames.contains(name)) {
          const req = this.db.createObjectStore(name, storeOpt)
          if (key) {
            req.createIndex(key, key, indexOpt)
          }
        }
        res()
      }

      request.onerror = (error) => {
        reject(error)
      }
    })
  }

  add (name, data) {
    return new Promise((result, reject) => {
      const request = this.db.transaction([name], 'readwrite')
        .objectStore(name)
        .add(data)

      request.onsuccess = (event) => {
        result(event)
      }

      request.onerror = (error) => {
        reject(error)
      }
    })
  }

  remove(name, key) {
    return new Promise((result, reject) => {
      const request = this.db.transaction([name], 'readwrite')
        .objectStore(name)
        .delete(key)

      request.onsuccess = (event) => {
        result(event)
      }

      request.onerror = (error) => {
        reject(error)
      }
    })
  }

  update (name, data) {
    return new Promise((result, reject) => {
      const request = this.db.transaction([name], 'readwrite')
        .objectStore(name)
        .put(data)

      request.onsuccess = (event) => {
        result(event)
      }

      request.onerror = (error) => {
        reject(error)
      }
    })
  }

  search (name, index) {
    return new Promise((result, reject) => {
      const request = this.db.transaction([name])
        .objectStore(name)
        .get(index)

      request.onsuccess = (event) => {
        if (request.result) {
          result(request.result)
        } else {
          console.log('no data')
          reject()
        }
      }

      request.onerror = (error) => {
        console.log('事务失败')
        reject(error)
      }
    })
  }

  searchIndex(name, key, index) {
    return new Promise((result, reject) => {
      const request = this.db.transaction([name])
        .objectStore(name)
        .index(key)
        .get(index)

      request.onsuccess = (event) => {
        if (request.result) {
          result(request.result)
        } else {
          console.log('no data')
          reject()
        }
      }

      request.onerror = (error) => {
        reject(error)
      }
    })
  }
}

// 使用
this.db = new IndexDBDemo(name, { keyPath: 'id', autoIncrement: true }, 'name', { unique: false })
this.db.add(name, obj).then().catch()
this.db.remove(name, key).then().catch()
this.db.update(name, obj).then().catch()
this.db.search(name, key).then().catch()
this.db.searchIndex(name, '索引', '索引值').then().catch()

```



##### 六、浏览器兼容

更多高级用法参考[Web API](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API#Browser_compatibility) 

功能再强大，不兼容也不行，下面是浏览器兼容图，数据来源 [can i use](https://caniuse.com/#search=IndexDB)

![浏览器兼容情况](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202112221109134.png)
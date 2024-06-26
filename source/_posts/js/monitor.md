---
title: 前端错误监控平台(webpack-plugin+Performance API+SendBeacon API)
date: 2024.2.26 16:03
categories: 
  - js
tags:
  - javascript
  - webpack-plugin
  - nodejs

---

> 需求上线后，经常遇到业务侧同学反馈xxx按钮点击报错，xxx页面打不开等情况，测试也不可能对系统进行100%覆盖，用户也不会总按照我们的预期去操作，所以有了前端错误监控平台，可以在系统异常时主动收集错误信息进行上报，可以帮助我们快速定位错误，统计、分析、复盘错误数据。

#### 自研or三方

优: 三方方案更加成熟，部分例如sentry可以选择私有化部署；自研方案拥有更高的定制化开发需求，SDK可集成更多需求，高度定制化开发。

劣: 三方二次开发受限，部分需要上传源码到三方服务器，数据保存在第三方，费用不低；自研需要熟悉整套设计流程，对开发者要求较高，需要兼容各种场景以及耗时更久。

<!-- more -->

#### 异常收集

常用的错误收集方法:

1. try/catch: 可以捕获常规运行时的错误，语法错误和异步错误则不能捕获;

   ```javascript
   // 常规运行时报错
   try {
    let arr = undefined;
    if (arr.length) {
      console.log('arr length: ', arr.length);
    }
   } catch (e) {
   	console.log('捕获到异常：', e);
   }
   
   // await同步后的异常可以被捕获到
   try {
     const data = await promiseApi()
   } catch (e) {
   	console.log('捕获到异常：', e);
   }
   ```

2. window.onerror: 可以捕获常规错误、异步错误，但不能捕获资源错误

   ```javascript
   /**
   * @param { string } message 错误信息
   * @param { string } source 发生错误的脚本URL
   * @param { number } lineno 发生错误的行号
   * @param { number } colno 发生错误的列号
   * @param { object } error Error对象
   */
   window.onerror = function(message, source, lineno, colno, error) {
   	console.log('捕获到的错误信息是：', message, source, lineno, colno, error);
   };
   ```

3. window.addEventListener('error', fn): 可以捕获资源加载错误

   ```javascript
   // html
   <img src="https://test.png" />
   // js
   window.addEventListener('error', function(e) {
     console.log('捕获到异常：', e);
   }, true)
   
   // new Image加载错误不能捕获，需要单独处理
   const img = new Image()
   img.src = 'https://test.png'
   ```

4. window.addEventListener('unhandledrejection', fn): 可捕获Promise抛出的错误

   ```javascript
   window.addEventListener("unhandledrejection", function(e) {
     console.log('捕获到异常：', e);
     // preventDefault阻止传播，不会在控制台打印
     e.preventDefault();
   });
   ```

5. Vue.config.errorHander: 可捕获vue中的报错

   ```javascript
   Vue.config.errorHandler = (err, vm, info) => {
     console.log('进来啦~', err);
   }
   ```

#### 性能指标收集

可以通过`Performance API`进行性能监控

[Performance（工具 & api）](https://zhuanlan.zhihu.com/p/60069889)


#### 用户行为收集

收集用户操作行为，方便数据分析时复现操步骤

用户行为包括:

1. UI交互: 用户点击、滚动、失/聚焦、长按等
2. 浏览器: 路由变化、前进、后退、跳转等
3. 控制台: 日志输出等

实现方案:

1. UI交互可以全局挂载`window.addEventListener`监听`click`、`input`等事件，获取`dom`节点进行上报处理
2. 路由变化`history`模式可以监听`popstate`事件上报，`hash`模式则是需要重写`history.pushState`和 `history.replaceState`实现
3. 控制台输出可以通过重写`console`对象的`info`、`warn`、`error`方法实现上报收集

每次监听到变化就`push`数据到`breadcrumb`数组，控制`breadcrumb`数组长度最好20以内，防止过大数据造成内存泄漏、页面卡顿等问题

#### 数据上报

可以通过`sendBeacon API` 进行数据上报

> `sendBeacon` 开发人员可以使用一个接口来安排异步和非阻塞的数据传输，从而最大限度地减少与其他时间关键操作的资源争用，同时确保此类请求仍然得到处理并传输到目的地。

1. 考虑浏览器兼容问题可以降级使用图片打点上传或者`fetch`上传
2. 默认`sendBeacon`上传请求头会根据上传数据自动设置
   1. DOMString为`Content-Type: text/plain`
   2. Formdata为`Content-Type: multipart/form-data`
   3. Blob为`Content-Type: application/x-www-form-urlencoded`

| 1          | 优点                                               | 缺点                                   |
| ---------- | -------------------------------------------------- | -------------------------------------- |
| SendBeacon | 非阻塞型，无需处理返回                             | 浏览器兼容性问题，请求头自定义相对麻烦 |
| Image      | 非阻塞型，无跨域问题、不需要处理返回数据，体积最小 | 可能被垃圾回收造成请求丢失             |
| Fetch      | 常规请求，兼容性好                                 | 阻塞性，页面卸载后未完成请求会被取消   |



```javascript
function request() {
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, JSON.stringify(data));
  } else if (this.useImgUpload) {
    // 若开启图片打点上传
    const img = new Image();
    const spliceStr = url.indexOf('?') === -1 ? '?' : '&';
    img.src = `${url}${spliceStr}data=${encodeURIComponent(JSON.stringify(data))}`;
  } else {
   	// 降级方案，fetch上传 
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
```

#### 数据分析

生产环境的代码一般都是压缩混淆后的代码，这时候我们需要通过`SourceMap`进行源码映射，方便我们解析收集到错误信息，但是`sourceMap`同时不能暴露在生产环境，所以需要利用`webpack`插件进行上传到目标服务器并删除本地map文件

1. sourceMap处理

   1. webpack-plugin的开发，利用钩子函数进行上传和删除操作
   
   ```javascript
   import request from 'request-promise'
   import fs from 'fs'
   import path from 'path'
   import PromisePool from 'es6-promise-pool'
   
   const BASE_URL = 'http://10.100.186.40:81/upload/picp/'
   
   const DEFAULT_INCLUDE = /\.map$/
   const DEFAULT_TRANSFORM = filename => `~/${filename}`
   const DEFAULT_DELETE_REGEX = /\.map$/
   const DEFAULT_UPLOAD_FILES_CONCURRENCY = Infinity
   
   module.exports = class UploadPlugin {
     constructor(options) {
       this.baseURL = options.baseURL || BASE_URL
       this.include = options.include || DEFAULT_INCLUDE
       this.exclude = options.exclude
   
       this.filenameTransform = options.filenameTransform || DEFAULT_TRANSFORM
       this.deleteAfterCompile = options.deleteAfterCompile
       this.deleteRegex = options.deleteRegex || DEFAULT_DELETE_REGEX
       this.uploadFilesConcurrency =
         options.uploadFilesConcurrency || DEFAULT_UPLOAD_FILES_CONCURRENCY
     }
   
     apply(compiler) {
       compiler.hooks.afterEmit.tapPromise('UploadPlugin', async (compilation) => {
         const files = this.getFiles(compilation)
   
         if (!files.length) return
   
         try {
           await this.uploadFiles(files)
         }
         catch (error) {
           this.handleErrors(error, compilation)
         }
       })
   
       compiler.hooks.done.tapPromise('UploadPlugin', async (stats) => {
         // 开启删除map选项后自动删除文件
         if (this.deleteAfterCompile) {
           await this.deleteFiles(stats)
         }
       })
     }
   
     // eslint-disable-next-line class-methods-use-this
     getAssetPath(compilation, name) {
       return path.join(
         compilation.getPath(compilation.compiler.outputPath),
         name.split('?')[0]
       )
     }
   
     getFiles(compilation) {
       return Object.keys(compilation.assets)
         .map((name) => {
           if (this.isIncludeOrExclude(name)) {
             return { name, filePath: this.getAssetPath(compilation, name) }
           }
           return null
         })
         .filter(i => i)
     }
   
     isIncludeOrExclude(filename) {
       const isIncluded = this.include ? this.include.test(filename) : false
       const isExcluded = this.exclude ? this.exclude.test(filename) : false
   
       return isIncluded && !isExcluded
     }
   
     uploadFiles(files) {
       const pool = new PromisePool(() => {
         const file = files.pop()
         if (!file) {
           return null
         }
   
         return this.uploadFile(file)
       }, this.uploadFilesConcurrency)
       return pool.start()
     }
   
     // 上传目标服务器
     async uploadFile({ filePath, name }) {
       await request({
         url: this.baseURL,
         method: 'POST',
         formData: {
           file: fs.createReadStream(filePath),
           name: this.filenameTransform(name)
         }
       })
     }
   
     async deleteFiles(stats) {
       Object.keys(stats.compilation.assets)
         .filter(name => this.deleteRegex.test(name))
         .forEach((name) => {
           const filePath = this.getAssetPath(stats.compilation, name)
           if (filePath) {
             fs.unlinkSync(filePath)
           }
           else {
             // eslint-disable-next-line no-console
             console.warn(
               `WebpackUploadSourcemapPlugin: unable to delete '${name}'. ` +
               'File does not exist; it may not have been created ' +
               'due to a build error.'
             )
           }
         })
     }
   }
   
   ```
   
   2. nodejs -- 借助`multer`进行文件上传，后面考虑迁移cos进行持久化保存
   
   ```javascript
   const storage = multer.diskStorage({
     destination: function (req, file, cb) {
       cb(null, path.join(__dirname, '..', 'uploads', 'temp'))
     },
     filename: function (req, file, cb) {
       cb(null, file.originalname)
     }
   })
   
   const upload = multer({
     storage: storage,
     limits: { fileSize: 30 * 1024 * 1000 }
   })
   
   // 使用express搭建node服务器
   app.post('/upload/:project', upload.single('file'), (req, res) => {
     const file = req.file
     if (file) {
       // 上传成功
       const project = req.params.project
       const today = dayjs().format('YYYY-MM-DD')
   
       const filePath = path.join(__dirname, '../uploads', project, today)
   
       fs.access(filePath, fs.constants.F_OK, (err) => {
         if (err) {
           fs.mkdirSync(filePath)
         }
         fs.renameSync(path.join(__dirname, `../uploads/temp/${file.originalname}`), `${filePath}/${file.originalname}`)
   
         res.json({
           code: '00000',
           msg: 'success',
           data: {}
         })
       })
   
   
     } else {
       res.json({
         code: '10001',
         msg: '上传失败',
         data: {}
       })
     }
   })
   
   app.get('/getMap/:project', (req, res) => {
     const fileName = req.query.fileName;
     const time = req.query.time;
     const project = req.params.project
     const today = dayjs(+time).format('YYYY-MM-DD')
     const mapFile = path.join(__dirname, '..', 'uploads', project, today);
     const mapPath = path.join(mapFile, `${fileName}.map`);
     console.log('mapPath: ', mapPath);
     fs.readFile(mapPath, function (err, data) {
       if (err) {
         console.error(err);
         res.json({
           code: '10002',
           msg: 'sourceMap文件不存在',
           data: {}
         });
         return;
       }
       try {
         const result = JSON.parse(Buffer.from(data).toString())
         res.json({
           code: '00000',
           msg: 'success',
           data: result
         });
       } catch (error) {
         res.json({
           code: '10001',
           msg: 'error',
           data: error
         });
       }
     });
   });
   
   ```
   
   3. vue开启`SourceMap`，挂载`webpack`插件
   
   ```javascript
   // vue.config.js
   const UploadSourceMapPlugin = require('@bestjarvan/webpack-upload-sourcemap-plugin');
   
   const plugins = []
   isProd && plugins.push(UploadSourceMapPlugin({
     baseURL: process.env.VUE_APP_UPLOAD_API,
     deleteAfterCompile: true
   }))
   
   // 根据自己需求选择是否开启source-map
   module.exports = {
   	configureWebpack: {
   		devtool: isProd ? 'source-map' : 'none',
       plugins,
   	}
   }
   ```
   
   4. 借助`source-map-js`在可视化项目中解析map文件
   
   ```javascript
   function findCodeInfo() {
     // fetchMapFile 获取map文件接口 /getMap/:project
     fetchMapFile({ fileName, time }).then(({ data }) => {
       let sourceData = await new sourceMap.SourceMapConsumer(data);
       let result = consumer.originalPositionFor({
         line: +line,
         column: +column
       });
       
       console.log('result: ', result)
     })
   }
   
   ```
   
   ![list](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/image-20240311173917245.png)

![info](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/image-20240311173808686.png)

参考：

[前端搞监控|Allan - 如何实现一套多端错误监控平台](https://www.yuque.com/zaotalk/posts/c5-5#zJjOX)

[从 0 到 1 搭建前端监控平台，面试必备的亮点项目总结](https://www.bilibili.com/read/cv21327545/)


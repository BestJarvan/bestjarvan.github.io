---
title: Typescript+verdaccio+pm2构建私有工具包
date: 2020.04.14 18:48
updated: 2020.04.14 18:48
categories: 
  - npm
tags:
  - typescript
  - npm
  - verdaccio
  - rollup
  - pm2
  - jest
  - typedoc
---
### 前言
1. 项目中经常会用到某些方法，比如格式化时间戳，比如判断环境等等。  
笔者最初是把这些方法抽离出来写成公共方法，但由于后期项目扩展每次都要复制这个工具文件很是麻烦且效率低下，发布npm包正好解决了这个痛点，正好借此机会重构成ts文件并发布npm包。  

2. 本工具内置`vue2.x + ts`，方便开发中调试代码。  
本工具包内部集成了`lodash`的一些方法，详见[文档](https://bestjarvan.github.io/utils-tools/docs/interfaces/lodashtool.html)或者`src/core/lodash-tool`  

3. 本工具使用`typedoc`根据注释自动生成文档，可搜索方法

4. 本项目npm包单元测试通过率100%，同时经过公司多个项目沉淀，且稳定运行，大家如有需要可直接下载拓展使用

[博客传送门](https://bestjarvan.gitee.io/2020/04/14/npm/Typescript+verdaccio/index.html)

本文只简要介绍下整个流程，具体项目[GitHub](https://github.com/BestJarvan/utils-tools)，欢迎Start、Fork。thx~   XD

<!-- more -->

### 简要

- 工具
- 项目架构
- 初始化
- 单元测试
- 文档输出
- 打包
- 发布

### 工具
- [TypeScript](https://www.tslang.cn/)
- [Typedoc](http://typedoc.org/)
- [Vue 2.x](https://cn.vuejs.org/)
- [Rollup](https://www.rollupjs.com/) + [gulp](https://www.gulpjs.com.cn/)
- [jest](https://jestjs.io/)
- [pm2](https://pm2.keymetrics.io/) + [verdaccio](https://verdaccio.org/)
- [Lodash](https://www.lodashjs.com/)

### 插件
> 本工具包使用下列插件规范开发，定制团队开发规范
- eslint
- tslint
- prettier
- commitlint
- husky

### 项目架构

```纯文本
.
├── LICENSE
├── README.md
├── docs // typedoc生成的文档
│   ├── assets
│   ├── globals.html
│   ├── index.html
│   └── interfaces
├── gulpfile.js // gulp+rollup配置文件
├── package.json
├── public // vue相关
├── home // vue调试页面
├── src // 代码模块
│   ├── core // 核心代码块
│   │   ├── env.ts
│   │   └── ***.ts
│   ├── index.ts // 入口文件
│   ├── tools
│   │   └── index.ts
│   └── types // 声明文件
│       └── index.ts
├── test // 单元测试
│   ├── core // 核心代码单元测试
│   │   ├── env.spec.ts
│   │   └── ***.spec.ts
│   └── index.spec.ts
├── tsconfig.json // ts配置
├── tslint.json // tslint配置
├── .prettierrc // prettier配置
├── .lintstagedrc // lintstage配置
└── typedoc.json // typedoc配置
```


### 初始化

1. `npm init`初始化项目
2. 安装依赖`npm i -D gulp del typescript`
3. 安装[rollup](https://www.rollupjs.com/guide/tools#gulp)依赖`npm i -D rollup rollup-plugin-node-resolve rollup-plugin-commonjs rollup-plugin-typescript2 rollup-plugin-uglify rollup-plugin-sourcemaps rollup-plugin-json`
4. 安装辅助插件`npm i -D typedoc jest @types/jest ts-jest`
5. 在项目中新建一个src文件，编写公共文件
6. 需要一个types文件夹存放声明文件(用于代码提示)
7. 所有文件都需要通过src/index.ts 对外抛出

```纯文本
// gulpfile.js
const gulp = require('gulp')
const del = require('del')
const rollup = require('rollup')
const json = require('rollup-plugin-json')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const sourceMaps = require('rollup-plugin-sourcemaps')
const typescript = require('rollup-plugin-typescript2')
const uglify = require('rollup-plugin-uglify').uglify
const pkg = require('./package.json')

// 删除打包后的文件 目的为了每次打包出来的结果更干净，避免某些文件没被删除等原因抛错
function task_clean (done) {
  del.sync('dist')
  del.sync('docs')
  done()
}

async function task_ts () {
  const bundle = await rollup.rollup({
    input: 'src/index.ts',
    plugins: [
      json(),
      // Compile TypeScript files
      typescript({ useTsconfigDeclarationDir: true }),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      // Allow node_modules resolution, so you can use 'external' to control
      // which external modules to include in the bundle
      // https://github.com/rollup/rollup-plugin-node-resolve#usage
      resolve(),
  
      // Resolve source maps to the original source
      sourceMaps(),
      uglify(),
    ]
  });

  await bundle.write({
    file: pkg.main,
    format: 'umd',
    name: pkg.name,
    sourcemap: false
  })
}

gulp.task('default',
  gulp.parallel(
    task_clean,
    task_ts
  )
)
```


### 单元测试

配置代码通过率最低标准
例如我配置的 必须全部分支、方法、代码行数通过率达到90%才算测试通过

```纯文本
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: -5
    }
  }
```


`jest --coverage // 生成测试覆盖率`<br />

![测试结果](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171509157.png)


### 文档输出

1. 配置typedoc

```纯文本
// package.json  scripts片段
{
  "build": "npm run lint && gulp && typedoc",
}
// tslint
// gulp 会自动识别根目录下gulpfile.js配置文件
// typedoc 自动识别根目录下typedoc.json配置文件
// 参考项目结构
```


1. build后就可以提交到git服务器，比如我用的gitee使用gitee pages（静态页面托管，免去自己申请域名、服务器、虚拟主机等，github有github pages等）
2. gitee pages简单的设置下入口文件(比如docs/index.html)就会生产对应的在线文档链接
3. 使用 git hooks搭配 lint-staged 在提交时先去格式化暂存区代码，保持代码干净之后push代码

![gitee pages](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171509630.png)


### 打包

使用rollup配合gulp打包编译

1. gulp配置中使用del删除dist文件，避免其他意外问题
2. 使用rollup编译ts文件
3. 编译后会保留声明文件，在package.json中typings字段写入汇总的声明文件地址，用于代码提示
4. 丑化压缩js文件
5. 输出到package.json定义的入口文件dist/index.js

### 发布

一、发布到npm市场

1. 需要先在terminal登录npm
2. 手动修改package.json的version(后期脚本自动更新)，npm publish，成功后会得到一个版本信息

```纯文本
+ @jarvannnn/utils@0.0.1
```


1. npm i --save @jarvannnn/utils 就可以项目中使用了

二、使用verdaccio搭建npm私服，并使用pm2守护进程

1. `npm install -g verdaccio pm2`全局安装verdaccio以及pm2[^pm2]
2. terminal直接输入verdaccio 
即可立即运行，默认抛出端口为4873，我们可以使用`pm2 start verdaccio`指令使其运行到后台
3. 现在我们可以通过`localhost:4873`访问npm私服^localhost
4. 发布到verdaccio平台 首先需要在terminal中输入`npm adduser --registry http://localhost:4873`注册用户，输入用户名、密码、邮箱等信息注册
5. `npm publish --registry http://localhost:4873` 发布代码包

tips: 如果跟我一样不喜欢每次发布都要输入--registry，那么可以借助nrm[^nrm]镜像源管理工具来管理本地源

### 项目中使用

![代码提示](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171509895.png)

![代码提示](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171509773.png)

[^pm2]:  * `pm2 start verdaccio` 启动verdaccio<br />* `pm2 stop verdaccio(all) ` 停掉verdaccio(或全部)<br />* `pm2 delete verdaccio` 删除verdaccio<br />* `pm2 show verdaccio` 显示verdaccio运行日志

[^nrm]: * `nrm add mynpm http://localhost:4873` 添加本地源<br />* `nrm use mynpm` 切换本地源<br />* `nrm ls` 查看本地所有源


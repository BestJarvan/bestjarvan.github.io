---
title: xbb-utils开发规范
date: 2021.8.15 17:36
updated: 2021.8.15 17:36
categories: 
  - notes
tags:
	- typescript
	- jest
	- npm
	- vue2
	- git
	- vue
---
为什么选择开发utils包？

- 方便代码的快速维护
- 方便一套代码部署多个项目以及新项目的快速启动
- 为后期需求踩坑
<!-- more -->
为什么选择ts？

- 有更加安全的静态类型检查，而静态类型检查更有利于构建大型项目
- 增加了代码可读性
- 更有好的IDE代码提示

### 版本规范

主版本号.子版本号.修正版本号

修复bug：修正版本号+1

新增方法：子版本号+1，修正版本号复位为 0

整体影响：重大修改或局部修正累积较多，而导致项目整体发生全局变化时，主版本号加 1，其余版本号复位为0

|版本号|备注|
|---|---|
|v0.0.1|基础搭建|
|v0.1.0|新增vue2.x调试页面|
|v0.1.1|修复bug，完善单测|
|v0.1.2|修复bug，维护更新|
|v1.1.0|优化math方法，新增thumbnail, formatToNumber, dealNumber, getGuid方法|



### 项目结构

每个文件夹都有各自的职责，项目配置文件单独列出来方便修改配置。核心模块也就只有`src`文件，其余都是辅助。

```JavaScript
.
├── LICENSE
├── README.md
├── babel.config.js
├── coverage // 单测结果
│   └── lcov-report
│       └── index.html // 单测结果页面入口
├── docs // typedoc生成的文档
│   ├── assets
│   ├── globals.html
│   ├── index.html
│   └── interfaces
├── gulpfile.js // gulp+rollup配置文件
├── package.json
├── src // 代码模块
│   ├── core // 核心代码块
│   │   ├── env.ts
│   │   └── **.ts
│   ├── index.ts // 入口文件
│   ├── tools
│   │   └── index.ts // 工具
│   └── types // 声明文件
│       └── index.ts // interface
├── tests // 单元测试
│   └── unit // 核心测试模块
├── home // vue调试页面
│   └── ** // 调试
├── vue.config.js // vue项目配置(调试用)
├── jest.config.js // jest单测配置
├── tsconfig.json // ts配置
├── tslint.json // tslint配置
├── .prettierrc // prettier配置
├── .lintstagedrc // lintstage配置
└── typedoc.json // typedoc配置

```


### src

1. 所有功能模块需要开发到`src/core/**`下，此文件为核心代码块；
2. 具体功能目前划分了几大类别`math` `url` `is` `method` `verify`...等等，后期按需添加；
3. `core`下的方法都需要导出，且需要添加注释，注释参考下图(图1)，此描述不生成文档，故可以写的更加详细；
4. `core/is.ts`为类型判断文件，推荐大家项目中需要进行类型判断时候使用此文件，而不是书写新的判断代码。
5. `types`文件夹放interface接口声明，`interface`有几个大类对应`core`下的文件命(图2)，作为开发中的代码提示文案，interface的备注需要书写的清晰，传入的参数以及返回的参数类型一定要正确，文案也要相对简练。
6. 类型超过3个(包含3个)推荐使用类型别名，例如：
	```TypeScript
	// bad
	export function checkType(val: Date | string | number): Date {
	  // TODO...
	}
	
	// good
	type dateType = Date | string | number
	export function checkType(val: dateType): Date {
	  // TODO...
	}
	```
	

备注：因为使用了自动文档生成工具，所以为了避免文档输出混乱，备注需要统一的规则。除`types`文件下的方法，其余的都需要添加`@ignore`阻止文档的自动生成，

![图1](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202112221047229.png)

![图2](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202112221047515.png)

### 单测

1. `unit/index.spec.ts`文件用来测试实例是否挂载了对应的方法(`/src/core/**.ts`)，每次在`core`下新增方法后，都需要到这个文件下的对应单测模块中添加测试实例，用于确保实例有此方法，相当于双重保险；
2. `unit/core/**.spec.ts`为对应的`core`下的核心单测文件，每个单测方法都有一个大的`describe`包裹数个`it`，方便单测报错时，定位具体哪个文件下的哪个方法报错，错误日志会输出`describe`和`it`的描述文案；
	![](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202112221047549.png)
3. 单测文件需要把要测试的代码中的每一个分支，每一行代码，每一个判断都要覆盖，需要完成方法覆盖100%，分支覆盖98%，行数覆盖100%的条件，推荐全部100%；
	![](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202112221047925.png)
4. 单测结果可以在控制台或者`coverage/lcov-report/index.html`查看详情。
	![](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202112221047418.png)
	- 第一行10x 代表当前行走了10次
	- 黄色img[0]表示单测这行代码没有覆盖到
	- `if`前的E标识，说明此`if`判断的`else`条件没有覆盖
	- 红色则表示整行(大段代码)没有覆盖到，考虑是否漏写该方法的单测

### 调试

本项目为了方便调试，已集成vue2.x，可以通过`npm run serve`启动vue项目。

vue项目目录为`home/*`。

### 使用

需要用到的项目，使用`npm i -S xbb-utils`来安装最新版本，之后再需要用到的页面`import xbb from 'xbb-utils'`

![代码提示](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202112221047096.png)

### 功能开发

1. 首先需要基于远端master拉取最新代码分支
2. 新建开发分支，一般为feature/开发分支名的格式`git checkout -b feature/xxxxx`
3. 推送开发分支到远端并追踪关系`git push --set-upstream origin feature/xxxxx`
4. enjoy your coding...

ps: 如果有好的点子但是没有时间开发，可以再gitlab提交issues

### 开发完成

1. 开发完成后需要再跑一遍单测，确保通过率为100%
2. 检查无误，没有问题之后，去gitlab提交MR(merge request)
3. 待管理员审核无误后发布，会在群里通知最新版本号，及时更新到最近版本即可




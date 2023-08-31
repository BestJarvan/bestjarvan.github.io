---
title: 通过node调用Jenkins API完成构建过程
categories: 
  - node
tags:
  - javascript
  - nodejs
  - jenkins
  - shell
---

#### 前言
项目中使用jenkins挺久了，每次发布测试环境代码都需要手动去jenkins上发布，特别麻烦，想到两种解决方案，一种是通过CI/CD持续集成，一种是通过jenkins API调用配制好的job。

* 第一种方案需要触发，还要推送代码到指定分支，不能完美解决目前的痛点。
* 第二种方案灵活配置，手动触发，在需要的时候构建，可以解决目前的痛点。

本文就讲解如何通过API完成测试环境的构建工作，生产环境不推荐这样做，生产环境一般都有严格的上线流程和权限控制。

![image-20230831200429836](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202308312004869.png)

<!-- more -->

#### 一、构建脚本
1. 首先我们在项目中新建(若没有)`build`文件夹，新建`jenkins.js`存放我们的脚本
2. 安装[Jenkins](https://github.com/silas/node-jenkins) -> `npm install --save-dev jenkins`
3. 示例代码如下
4. 把脚本添加到`package.json`的`script`中，新增`"deploy:jen": "node ./build/jenkins"`
5. 我们运行`npm run deploy:jen`

```javascript
const Jenkins = require('jenkins')

// 分支名
const branchName = 'test'
// 项目名
const jobName = 'example'
// 授权信息
const auth = {
  username: 'username',
  // 推荐使用jenkins token，在个人设置中生成
  password: 'password'
}
const jenkins = new Jenkins({
  // https://用户名:密码/token@jenkins地址
  baseUrl: `https://${auth.username}:${auth.password}@jenkins.xxx.com`,
})

async function triggerBuild() {
  try {
    const result = await jenkins.job.build({
      name: jobName,
      // jenkins中需要的参数，若无则为空
      parameters: {
        branch: branchName,
        merge: true
      },
      token: auth.password
    })
    console.log('开始构建...', result)
  } catch (error) {
    console.error('error: ', error);
  }
}

triggerBuild()
```

此时我们已经可以触发构建流程，但是不够完美，发布分支需要我们写死，且我们并不知道构建进度，所以我们需要借助`child_process`查看分支和`jenkins.build.logStream`实时查看构建进度

#### 二、动态配置分支名&输出进度
在第一步的基础上，我们进行完善
```javascript
const Jenkins = require('jenkins')
const { exec } = require('child_process');

// 分支名初始化
const branchName = 'test'
// jenkins的job名
const jobName = 'example'
// 授权信息
const auth = {
  username: 'username',
  password: 'password'
}
const jenkins = new Jenkins({
  // https://用户名:密码/token@jenkins地址
  baseUrl: `https://${auth.username}:${auth.password}@jenkins.xxx.com`,
})

getGitBranch()
  .then(res => {
    branchName = res
    triggerBuild()
  })

// 获取当前分支
function getGitBranch() {
  return new Promise((resolve, reject) => {
    exec('git rev-parse --abbrev-ref HEAD', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        reject()
        return;
      }
      resolve(stdout.trim())
    })
  })
}

// 触发构建
async function triggerBuild() {
  try {
    const result = await jenkins.job.build({
      name: jobName,
      // jenkins中需要的参数，若无则为空
      parameters: {
        branch: branchName,
        merge: true
      },
      token: auth.token
    })
    console.log('准备构建...', result)
    waitOnQueue(result)
  } catch (error) {
    console.error('error: ', error);
  }
}

// 轮训查看当前构建状态
async function waitOnQueue(id) {
  const result = await jenkins.queue.item(id)
  if (result.executable) {
  console.log('开始构建: ', jobName);
    setTimeout(() => {
      logBuild(result.executable.number)
    }, 500);
  } else if (result.cancelled) {
    console.log('构建已取消')
  } else {
    setTimeout(() => {
      waitOnQueue(id)
    }, 500);
  }
}

// 输出编译结果
function logBuild(id) {
  console.log('构建中...', id)
  const log = jenkins.build.logStream(jobName, id);

  log.on("data", (text) => {
    process.stdout.write(text);
  });

  log.on("error", (err) => {
    console.log("error", err);
  });

  log.on("end", () => {
    console.log("success: 构建完成.");
  });
}

```

此时，我们已经完善了我们的发布脚本，但是项目中会有多个开发需要使用此脚本，认证信息如果可以动态配置，那就更好了。我们可以通过`node`脚本或者`shell`完成这一想法。

#### 三、编写shell脚本完成用户账号信息配置
1. `build`文件中新增`jenkins-init.sh`文件，参考第四步

2. 文件内脚本需要完成三个个操作
    1. 允许用户输入账号信息
    2. 内置默认账号配置
    3. 存入账号信息到json中
    
3. 在`package.json`的`script`中新增`"init:jen": "sh ./build/jenkins-init.sh"`

4. 修改`jenkins.js`脚本，读取配置账号信息

5. `shell`脚本会自动在`build`文件夹下生成一个`token.json`的文件，可以把这个文件加入到`.gitignore`里面，不需要提交到远端

    ![image-20230831200256923](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202308312002955.png)

#### 四、完整版
jenkins-init
```shell
#!/usr/bin/env sh

set -e
ACCOUNT=""
TOKEN=""
read -p "初始化本地jenkins配置, 是否使用默认配置 ? (y/n)" -n 1 -r

if [[ $REPLY =~ ^[Yy]$ ]]
  then
    echo ""
    ACCOUNT="username"
    TOKEN="password|token"
  else
    echo ""
    echo "jenkins账号:"
    # 20s超时自动断
    read -t 20 ACCOUNT

    echo "jenkins密码(token):"
    read -t 20 TOKEN
fi
# 存入配置文件
echo '{"account": "'$ACCOUNT'", "token": "'$TOKEN'"}' > ./build/token.json
echo "jenkins配置初始化完成"
```
jenkins.js
```javascript
const Jenkins = require('jenkins')
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process');

const auth = {}
const jobName = 'example'

let jenkins
let branchName = 'test'

getGitBranch()
  .then(res => {
    branchName = res
    initJenkins()
  })

function initJenkins() {
  try {
    const data = fs.readFileSync(path.join(__dirname, './', 'token.json'), 'utf8')
    Object.assign(auth, JSON.parse(data))
    jenkins = new Jenkins({
      baseUrl: `https://${auth.account}:${auth.token}@jenkins.xxx.com`,
    })
    triggerBuild()
  } catch (error) {
    console.error('配置文件未找到，请先运行npm run init:jen 生成配置文件')
  }
}


function getGitBranch() {
  return new Promise((resolve, reject) => {
    exec('git rev-parse --abbrev-ref HEAD', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        reject()
        return;
      }
      resolve(stdout.trim())
    })
  })
}

async function triggerBuild() {
  try {
    const result = await jenkins.job.build({
      name: jobName,
      // jenkins中需要的参数，若无则为空
      parameters: {
        branch: branchName,
        merge: true
      },
      token: auth.token
    })
    console.log('准备构建...', result)
    waitOnQueue(result)
  } catch (error) {
    console.error('error: ', error);
  }
}

async function waitOnQueue(id) {
  const result = await jenkins.queue.item(id)
  if (result.executable) {
  console.log('开始构建: ', jobName);
    setTimeout(() => {
      logBuild(result.executable.number)
    }, 500);
  } else if (result.cancelled) {
    console.log('构建已取消')
  } else {
    setTimeout(() => {
      waitOnQueue(id)
    }, 500);
  }
}

function logBuild(id) {
  console.log('构建中...', id)
  const log = jenkins.build.logStream(jobName, id);

  log.on("data", (text) => {
    process.stdout.write(text);
  });

  log.on("error", (err) => {
    console.log("error", err);
  });

  log.on("end", () => {
    console.log("success: 构建完成.");
  });
}
```

![image-20230831200141757](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202308312001802.png)

开发拉取代码后，首次需要运行`npm run init:jen`生成配置文件，之后每次发布测试环境可以运行`npm run deploy:jen`触发构建，若需要合并test分支，则可以在jenkins中配置自动合并。

至此，我们实现了可自由配置账号信息，手动触发jenkins构建，并且查看构建进度的脚本。
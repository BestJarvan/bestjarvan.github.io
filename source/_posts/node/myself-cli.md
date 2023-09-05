---
title: 从零搭建前端脚手架CLI工具
date: 2023.09.05 11:28
categories: 
  - node
tags:
  - javascript
  - nodejs
  - CLI
---

#### 目录结构

首先从零搭建一套前端脚手架需要用到最核心的一个库就是[`commander`](https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md)

![commanderjs](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202309051127055.png)

完整目录

```javascript
.
├── bin // 脚本识别文件
│   └── helper-cli // 脚本
├── lib // 需要的方法等
│   ├── deploy.js
│   ├── init-token.js
│   └── logo.js
├── package.json
└── session // 存放一些临时文件
    └── token.json
```



#### 修改package文件

 `package.json`需要配置`bin`字段，指明脚本入口文件和脚本命令的名称

```json
{
  // ...
	"bin": {
		"helper-cli": "./bin/helper-cli"
	}
  // ...
}
```



#### helper-cli的开发

1. 首先需要声明运行环境 `#!/usr/bin/env node` 指明使用`node`运行此脚本
2. 使用`program`注册命令名称和说明等
3. 使用`action`调用命令的执行函数

```javascript
#!/usr/bin/env node

const { program } = require('commander')
const chalk = require('chalk')
const leven = require('leven')
const pkg = require('../package.json')
const logo = require('../lib/logo')

program
  .version(`${pkg.name}: ${pkg.version}`, '-v, --version')
  .usage('<command> [options]')

program
  .command('jenkins')
  .alias('jk')
  .description('Init jenkins Token')
  .action(() => {
    logo()
    require('../lib/init-token')()
  })

program
  .command('deploy <name> [branch]')
  .alias('dp')
  .description('Deploy the project (<name>) to the test environment')
  .action((name, branch) => {
    logo()
    require('../lib/deploy')(name, branch)
  })

program
  .arguments('<command>')
  .action((cmd) => {
    program.outputHelp()
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
    suggestCommands(cmd)
  })

program.parse(process.argv)

function suggestCommands (unknownCommand) {
  const availableCommands = program.commands.map(cmd => cmd._name)

  let suggestion

  availableCommands.forEach(cmd => {
    const isBestMatch = leven(cmd, unknownCommand) < leven(suggestion || '', unknownCommand)
    if (leven(cmd, unknownCommand) < 3 && isBestMatch) {
      suggestion = cmd
    }
  })

  if (suggestion) {
    console.log(`  ` + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`))
  }
}

```

#### lib文件的开发

1. `init-token`文件，使用[`inquirer`](https://www.npmjs.com/package/inquirer)库完成命令行的指令交互

```javascript
const chalk = require("chalk")
const figlet = require("figlet")
const path = require('path')
const fs = require('fs')
const { default: confirm } = require("@inquirer/confirm")
const { default: input } = require('@inquirer/input')

// 可以默认给初始值
let account = "default"
let token = "defaultToken"

async function initToken () {
  const answer = await confirm({ message: '初始化本地jenkins配置, 是否使用默认配置 ?', default: false });
  if (!answer) {
    account = await input({ message: 'jenkins账号:' })
    token = await input({ message: 'jenkins密码(token):' })
  }
  genTokenFile()
}

function genTokenFile () {
  try {
    fs.writeFileSync(path.join(__dirname, '../session', 'token.json'), `{ "account": "${account}", "token": "${token}" }`)
    console.log('jenkins配置初始化完成')
    console.log(
      chalk.green(
        figlet.textSync("SUCCESS", {
          font: "Soft",
          horizontalLayout: "default",
          verticalLayout: "default"
        })
      )
    );
  } catch (error) {
    console.error('error: ', error);
  }
}

module.exports = initToken
```

2. `deploy.js`和第一版相似，修改触发方法

```javascript
const Jenkins = require('jenkins')
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const package = require('../package.json')

const auth = {}
let jobName = ''

let jenkins
let branchName = 'test'

// 接受两个参数，branch为可选参数，默认test
function deploy (name, branch) {
  jobName = name
  if (branch) {
    branchName = branch
    initJenkins()
  } else {
    getGitBranch()
      .then(res => {
        branchName = res
        initJenkins()
      })
  }
}

async function initJenkins() {
  try {
    const data = fs.readFileSync(path.join(__dirname, '../session', 'token.json'), 'utf8')
    Object.assign(auth, JSON.parse(data))
    try {
      jenkins = new Jenkins({
        baseUrl: `https://${auth.account}:${auth.token}@jenkins-test.xxx.com`,
      })
      triggerBuild()
    } catch (error) {
      console.log(error);
      process.exit(0)
    }
  } catch (error) {
    console.error(`配置文件未找到，请先运行 ${package.name} jk 生成配置文件`)
    process.exit(0)
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

module.exports = deploy
```

#### `logo.js`全局的logo输出

```javascript
const chalk = require('chalk')
const figlet = require("figlet")

module.exports = () => {
  console.log(
    chalk.cyan(
      figlet.textSync("Helper CLI", {
        font: "Ghost",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 100
      })
    )
  );
}
```

![logo](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202309051142236.png)


开发中我们可以使用`npm link` 把我们开发中的指令关联到全局指令中，我们可以全局使用`helper-cli -h`查看帮助

![help](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202309051144103.png)



开发调试完成后，我们可以发布到npm市场，或者公司内部私有npm平台，提供给项目使用，如果非全局安装，可以配合项目内的`.npmrc`指定本CLI的安装源


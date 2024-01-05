---
title: 通过shell脚本自动生成vue文件
date: 2019.08.10 18:48
updated: 2019.08.10 18:48
categories: 
  - vue
tags:
  - vue
  - shell
---
最近在写nuxt项目时候每次新建页面都要去新建然后引入各种需要的依赖很是麻烦，所以想写一个脚本自动生成文件 省去手动新建
现写下实现方法 给大家参考
<!-- more -->
>Mac下可直接运行 
>Windows下需要安装Cygwin类软件且配置环境变量后运行

#使用方法
1. 需要修改package.json 的scrpts 加一条create 或者自定义名字 主要是为了我们在terminal中输入指令后运行对应的脚本

![package.json](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171443157.png)

2. 在项目根目录新建一个template文件夹放自己的模板文件
   文件内容根据项目需要自行修改

![模板](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171443159.png)

3. 之后在build文件夹下新建 create.sh 脚本文件 (代码在下面)

4. 之后在terminal中输入 npm run create 指令 这个指令支持 后面携带一个不必传参数作为文件名 (npm run create xxxx)  或者直接输入npm run create

![效果](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171444961.gif)

文件名不能重复 如果重复不会覆盖原有文件 只会输出错误
![名称重复](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171444987.gif)

5. 生成后的文件以及文件内容
![生成后的文件](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171444727.png)

#create.sh 脚本文件
修改```COMPONENT_PATH``` 和 ```PAGE_PATH ``` 路径改变为自己真实模板路径
运行该脚本后
组件会在```components```文件夹下新建组件
页面会在```pages``` 文件夹下新建页面
```Shell
#!/usr/bin/env sh
create () {
  if [[ $REPLY =~ ^[Yy]$ ]]
    then
      PATH_DIR="./components/$NAME"
    else
      PATH_DIR="./pages/$NAME"
    fi

  if [ ! -d "$PATH_DIR" ]
  then
    mkdir $PATH_DIR
    if [[ $PATH_DIR =~ "components" ]]
    then
      CLASS_NAME="component-$NAME"
      cp $COMPONENT_PATH "$PATH_DIR/index.vue"
    else
      CLASS_NAME="page-$NAME"
      cp $PAGE_PATH "$PATH_DIR/index.vue"
    fi
    sed -i "" "s/class-name/$CLASS_NAME/" "$PATH_DIR/index.vue"
    echo -e "\n生成完成 \n... \n"
  else
    echo -e "\n已存在文件夹 \n$PATH_DIR"
  fi
}

set -e
echo "开始生成代码..."
COMPONENT_PATH="./template/component.vue"
PAGE_PATH="./template/page.vue"
if [[ -n $1 ]]
then
  NAME=$1
  read -p "请问代码 $NAME - 是否是组件 ? (y/n)" -n 1 -r
else
  echo "未发现名称, 请输入名称？"
  read NAME
  read -p "请问代码 $NAME - 是否是组件 ? (y/n)" -n 1 -r
fi
  create
```


##模板组件参考
```
<template>
  <div class="class-">
    component
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {}
  },
  methods: {
    init() {}
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/scss/var.scss';
@import '@/common/scss/mixin.scss';

.class- {
}
</style>

```
##模板页面参考
```
<template>
  <div class="class-">
    page
  </div>
</template>

<script>
import { baseMixin } from '@/common/mixins/index'

export default {
  mixins: [baseMixin],
  data() {
    return {}
  },
  async asyncData({ $axios }) {},
  head() {
    return {
      title: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {}
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/scss/var.scss';
@import '@/common/scss/mixin.scss';

.class- {
}
</style>
```
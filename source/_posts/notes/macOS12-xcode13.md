---
title: macOS 12 升级xcode 13后无法打开iOS11.4Simulator解决方法
date: 2021.11.19 10:55
updated: 2021.11.19 10:55
categories: 
  - notes
tags:
  - macOS
  - Xcode
  - Simulator
---
>macOS升级到12 macOS Monterey后，xcode(version 12)提示无法使用，需要升级，升级前还能打开iOS11.4的Simulator，升级后(xcode 13)提示不支持低版本iOS，最低支持iOS12版本，但是项目中又需要用到低版本的系统。
<!-- more -->
1. 首先确保xcode有安装iOS11.4的Simulator，若没有则需要`Xcode > Preferences > Components`下载需要的Simulator![模拟器版本](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171407668.png)
2. 下载完毕后，打开finder，commond+shift+g快速前往Simulator安装目录`/Library/Developer/CoreSimulator/Profiles/Runtimes`，选中对应的模拟器版本右键显示包内容，找到`Info.plist`，拷贝到桌面一份![Info.plist](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171407086.png)
3. 双击打开桌面的`Info.plist`，默认使用Xcode打开，找到Bundle identifier，修改值，在最后面加一个-1，使版本检查函数找不到对应的bundle name跳过检查，修改后复制桌面的文件回到原来的位置覆盖粘贴(此处可能需要验证权限)![iOS](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171407865.png)
4. Terminal中输入`open -a Simulator`打开模拟器，选择`File > New Simulator`，点击Create就可以创建低版本Simulator了，如果没有自动打开Simulator，则手动选择`File > Open Simulator`找到iOS 11.4去打开![Simulator](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171407106.png)
![iOS 11.4](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171408620.png)

参考：https://hiraku.tw/2021/04/6428/
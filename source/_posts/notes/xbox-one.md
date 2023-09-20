---
title: Xbox One手柄改TypeC尾插
date: 2023.09.20 12:10
categories: 
  - notes
tags:
  - xbox
  - DIY
---

本次改装按照[Foundries](https://space.bilibili.com/57800164)大佬的教程搞得，附带一些个人心得

### 准备的工具和材料
* 贴片式Type C 16Pin 母口
* 热风枪(没有可以用打磨笔+电烙铁慢慢搞)
* 电烙铁，焊锡，助焊剂
* 六角螺丝刀(T6用于拆主板螺丝，外壳螺丝需要专用的防盗螺丝刀拆)
* 30AWG跳线
* 打磨笔(有更好，没也行)
* 镊子
* 5.1k ohm电阻*2(触发PD快充需要，最好准备0805，0603各一颗)
* 0.1mm漆包线
* M1*2*1.5螺丝两颗(可选，主要是固定尾插用)
* AB树脂结构胶(可选)
* 光固化绿油和固化灯
* 聚酰亚胺胶带
* 万用表


准备好工具后开搞，最难的第一步，type c母座改造

### 一、改造typec母座
按照[Xbox手柄改Type C接口](https://www.bilibili.com/read/cv22153887/?spm_id_from=333.999.collection.opus.click)焊接，难点在于电阻的焊接，太小了，没放大镜很费眼

![拔除A4B9，B8，A8引脚](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202309201150656.png)
拔除A4B9，B8，A8引脚

这几个引脚最好拔除，方便为后续焊接提供空间

![0805和0603电阻，阻值5.1k](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202309201411213.jpeg)
0805和0603电阻，阻值5.1k

![拔除引脚后用聚酰亚胺胶带隔热](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202309201416284.jpeg)
拔除引脚后用聚酰亚胺胶带隔热

![IMG_6485](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202309201417443.jpeg)

![IMG_6486](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202309201418882.JPG)

改造后的16pin typec母座

焊接完成后可以用『安全充电多功能检测仪』测一下充电电压有没有5v，没有检测仪的话可以用万用表测一下有没有引脚短接，啥都没就肉眼看下确保焊锡没有短接到其他引脚

![222](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202309201418762.png)

测试输入电压5v，成功触发快充



没问题后焊接跳线，为后续焊接pcb做准备

![IMG_6487](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202309201418730.jpeg)

千万别连锡短接，做好绝缘
### 二、PCB改造
![WX20230920-141950@2x](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202309201420331.png)

处理旧的尾插，此处一定要处理平整，这样才美观



* 把旧的尾插拔除，这里我没有热风枪，选择了蛮力，直接把焊盘拔掉了，不过当时脑子抽，没有打磨平整，就开始后续操作了，导致这里不平整，typec尾插翘起来一小块(不影响使用，就是不美观了)
* M1的螺丝拧入原尾插的插槽内，这里M1的螺丝不要选择铝制，不吃锡，最好拧进去前找一颗实验下吃不吃锡，不吃的话尽早处理下这两个螺丝，比如洁厕灵涂一下侵蚀表面，不然拧上去发现不吃锡就很尴尬了

### 三、飞线焊接
![WX20230920-142057@2x](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202309201421380.png)

> D-和D+线焊接在1号位时，能获得最好的ESD保护，但比较难焊接。2号位是一个很大的测试点，方便焊接（图中被我测试时，搞掉了）。3号点是最后的选择。
> 
> 将A7,B7飞线到D-位，A6，B6飞线到D+位。
> 
> 最佳的飞线方式是B7焊接一根短线到A7，B6焊接一根短线到A6。A6, A7再飞线到PCB。这需要熟练的焊接能力。
> 
> 差一点的方式是A6, A7飞线到PCB，然后B6, B7通过飞线中途接入A6，A7的飞线上。
> 
> 最差的便是4根线直接飞线到PCB上。
> 
> 布线过程中，尽量保证等长，贴近！！！

这里我选择焊接到2号位，2号位置焊接空间相对大一些

![IMG_6489 11.25.51](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202309201422315.jpeg)

焊接后涂一层绿油固定
这里绿油涂多了，后面用刷子刷薄，太厚不利于光照固化，可以看到焊2号位操作空间有多大，这么一大坨焊锡，手残的我也能焊上

### 四、打磨外壳
先上大佬的完美作品

![33](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202309201424204.jpg)

![44](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202309201422616.jpg)

大佬作品

![IMG_6506](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202309201423308.jpeg)

我的丑照

此处就是第二步pcb处理时候，旧的焊盘没有处理平整，导致typec尾插不平，后面翘起一点，没办法重新处理，只能强行剪开外壳，让c口没有能正常使用

这里我固定尾插第一次用了焊锡，拔插几次后焊锡断开，后面用了AB树脂结构胶固定，固化时间大概5分钟初始固化到24小时固化完全，这次很稳，拔插稳定

![IMG_6507](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202309201423403.jpeg)

QC2.0
这里可以看到，装机完成后插入充电可以触发QC2.0快充协议

至此，改造完成
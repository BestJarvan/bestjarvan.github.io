---
title: node.js实现简单的登录注册页面
date: 2017.07.25 15:59
updated: 2017.07.25 15:59
categories: 
  - node
tags:
  - javascript
  - nodejs
  - html
---
首先需要新建四个文件

一个服务器js
一个保存数据的txt (代码会自动新建，手动新建也可)
一个登陆、一个注册页面html
<!-- more -->
gitee：https://github.com/BestJarvan/user-register-nodejs-demo.git
### 1.注册页面
```html
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<title>register</title>
</head>

<body>
	<div>
		<label for="user">用户名</label><input type="text" id="user">
	</div>
	<div>
		<label for="password">密码</label><input type="password" id="password">
	</div>
	<div>
		<button id="register">注册</button>
	</div>
</body>
<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
<script>
	$(function () {
		$("#register").click(function () {
			$.ajax({
				url: "http://localhost:3000/register",
				type: "POST",
				data: {
					username: $("#user").val(),
					password: $("#password").val()
				},
				success: function (res) {
					alert(res.msg);
					if (res.code === 200) {
						// TODO....
					}
				},
				error: function (err) {
					console.log(err);
				}
			})
		})
	});
</script>
</html>
```
### 2.登录页面

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>login</title>
</head>

<body>
  <div>
    <label for="user">用户名</label><input type="text" id="user">
  </div>
  <div>
    <label for="password">密码</label><input type="password" id="password">
  </div>
  <div>
    <button id="login">登录</button>
    <button id="register"><a href="register.html">注册</a></button>
  </div>
</body>
<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
<script>
  $(function () {
    $("#login").click(function () {
      if ($("#user").val().length == 0) {
        return alert("请输入内容!");
      }
      if ($("#password").val().length == 0) {
        return alert("请输入密码!");
      }

      $.ajax({
        url: "http://localhost:3000/login",
        type: "POST",
        data: {
          username: $("#user").val(),
          password: $("#password").val()
        },
        success: function (res) {
          alert(res.msg)
          if (res.code === 200) {
            // TODO...
          }
        },
        error: function (err) {
          console.log(err);
        }
      })

    })
  });
</script>
</html>
```
### 3.搭建服务器

```
var http = require("http");
var url = require("url");
var qs = require("querystring");
var fs = require("fs");

// 读取文件
function readFileFnc (cb, fail) {
  fs.readFile("db.txt", "utf-8", function (err, data) {
    if (!err && data) {
      console.log("文件中有数据");
      cb(data)
    } else {
      console.log("读取文件失败");
      fail()
    }
  })
}

function registerUser (user, res, arr) {
  //根据前端发来的路由地址判断是登录还是注册页面，如果是注册页面
  //同步写入db.txt文件
  var userList = arr || []
  userList.push(user)
  fs.writeFileSync("db.txt", JSON.stringify(userList), "utf-8");
  sendMsg(res, '注册成功!', 200)
}

function sendMsg (res, msg, code = 200) {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({code, msg}))
}

http.createServer(function (req, res) {
  //设置请求头
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method == "POST") {
    //接收发来的用户名和密码
    var result = "";
    //获取前端代码发来的路由地址
    var pathName = url.parse(req.url).pathname;

    req.addListener("data", function (chunk) {
      result += chunk;
    });

    req.on("end", function () {
      var user = qs.parse(result);
      //判断用户是否存在
      (!user.username || !user.password) && sendMsg(res, '请输入用户名或密码', 103)
      console.log(123123);
      if (pathName === '/login') {
        // 登录页
        readFileFnc(
          function (data) {
            var arr = JSON.parse(data);
            //遍历整个保存数据的数组  判断登录注册
            if (Array.isArray(arr)) {
              const userInfo = arr.find(obj => obj.username == user.username)
              if (userInfo) {
                if (userInfo.password == user.password) {
                  sendMsg(res, '登录成功！', 200)
                } else {
                  sendMsg(res, '密码错误！', 101)
                }
              } else {
                sendMsg(res, '该用户不存在', 102)
              }
            }
          },
          function () {
            sendMsg(res, '该用户不存在', 102)
          }
        )
      } else if (pathName === '/register') {
        // 注册页
        console.log('zhuce')
        readFileFnc(
          function (data) {
            var arr = JSON.parse(data);
            //遍历整个保存数据的数组  判断登录注册
            if (Array.isArray(arr)) {
              const userInfo = arr.find(obj => obj.username == user.username)
              if (userInfo) {
                sendMsg(res, '该用户已存在', 101)
              } else {
                registerUser(user, res, arr)
              }
            }
          },
          function () {
            registerUser(user, res)
          }
        )
      }
    });
  } else {
    sendMsg(res, '请使用post请求', 105)
  }
}).listen(3000, function (err) {
  if (!err) {
    console.log("服务器启动成功，正在监听port3000...");
  }
});
```
### 4.在db.txt文件中可以查看注册信息
![](https://gcore.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202201171411744.png)

------end------
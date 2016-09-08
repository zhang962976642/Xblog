# Xblog
使用Node.js+express+mongodb搭建的博客项目

项目架构:

* 前端:Bootstrap + jquery / vue + vuex(在考虑是否动工)
* 后台:Nodejs + express

项目依赖中间件,请npm install 它们

```javascript
"dependencies": {
    "body-parser": "~1.15.1",
    "connect-flash": "^0.1.1",
    "connect-mongo": "^1.3.2",
    "cookie-parser": "~1.4.3",
    "debug": "~2.2.0",
    "ejs": "~2.4.1",
    "express": "~4.13.4",
    "express-session": "^1.14.1",
    "markdown": "^0.5.0",
    "markdown-it": "^7.0.1",
    "marked": "^0.3.6",
    "moment": "^2.14.1",
    "mongoose": "^4.6.0",
    "morgan": "~1.7.0",
    "serve-favicon": "~2.3.0"
  }
```
目前实现了:
1. 用户登录、注册、验证、发表文章、退出、权限控制等功能
2. 使博客支持了Markdown语法，发表文章更简单^_^!~~
3. 用户文件、图片的上传功能

**后续功能正在开发**

ps: **有必要强调一下package.json**

``` javascript
"script": {
  "start": "nodemon ./bin/www"
},
```

**so你需要全局安装npdemon了，别打脸**

``` code
npm install -g nodemon
```
**MDZZ 谁打我站出来，说好的不打脸**
*END*

# Xblog
使用Node.js+express+mongodb搭建的博客项目

注意在 **使用mongoose操作mongodb时集合名会在后面加个S,如文档模型User使用mongoose会自动添加S变成Users文档**

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
4. 实现了通过用户查找文章页面,以及通过点击文章查询到某文章页面的需求
5. 实现了不同的用户通过session验证修改或删除自己的文章
6. 实现文章留言板功能使用mongoose的Model.updat({查询对象参数},{修改对象参数如:'$push':{comment:{'name':'小明'}}},callback);
7. 实现了分页功能
8. 实现了文章按照发布日期归档功能
9. 实现了文章标签功能以及新增标签页面
10.  实现了文章Pv统计,以及用户回复统计
11.  新增文章索引功能,查询文章 
12.  新增友情链接
13.  新增404页面,修改app.js下的 app.use(function(req,res,next){res.render('404',{title:'404 No Found'})});
14.  新增用户头像 
15.  实现转载记录
16.  添加日志记录    

**后续功能正在开发**

ps: **有必要强调一下package.json**

``` javascript
"script": {
  "start": "nodemon ./bin/www"
},
```
**$push往数组中添加新的信息**

``` javascript
/*后台nodejs数据处理层信息需要引入Article数据模型,以及marked高亮markdown语法支持*/
var comment = marked(req.body.comment);
var userComment = {
    'name':'小明',
};
Model.update({name:name},{'$push':{comment:userComment}},function(err){
    if(err){
        return res.redirect('back');
    };
    res.redirect('back');
});
```
``` ejs
<!--前台数据获取 ejs模板 forEach循环数组获取数组下的每一个对象 获取对象值得方法是 comment.对象名-->
<% data.forEach(function(comments,index){%>
  <%- comments.name %>  
<% }) %>
```

**so你需要全局安装npdemon了，别打脸**

``` code
npm install -g nodemon
```
**MDZZ 谁打我站出来，说好的不打脸**

*END*

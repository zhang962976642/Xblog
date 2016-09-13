//引入用户权限控制中间件
var validate  = require('../controller/validate');
var upload = require('../config/upload');
//获取文章信息
var getArticle = require('../controller/getPost');
// 修改文章信息
var uploadArticle = require('../controller/edit');
//路由模块 app参数是实例化后的express对象
module.exports = function(app){
	//首页路由
	app.get('/',getArticle.getIndex);
	//注册页面路由
	//引入权限控制
	app.get('/reg',validate.loginDown);
	app.get('/reg',function(req,res,next){
		res.render('reg',{ 
			title: '用户注册',
			user:req.session.user,
			error: req.flash('error').toString(),
			success: req.flash('success').toString(),
		});
	});
	//引入注册处理逻辑
	app.post('/reg',validate.loginDown);
	var userReg = require('../controller/reg');
	//执行用户注册这里将userReg.reg当成回掉函数;
	app.post('/reg',userReg.reg);
	//登录页面路由
	app.get('/login',validate.loginDown);
	app.get('/login',function(req,res,next){
		res.render('login',{ 
			title: '用户登录',
			user:req.session.user,
			error: req.flash('error').toString(),
			success: req.flash('success').toString(),
		});
	});
	//引入用户登录处理逻辑
	app.post('/login',validate.loginDown);
	var userLogin = require('../controller/login');
	//执行用户登录页面路由
	app.post('/login',userLogin.login);
	//发表文章页面路由
	app.get('/post',validate.loginUp);
	app.get('/post',function(req,res,next){
		res.render('post',{ 
			title: '文章发布',
			user:req.session.user,
			error: req.flash('error').toString(),
			success: req.flash('success').toString(),			
		});
	});
	app.post('/post',validate.loginUp);
	//引入文章发表处理中间件
	var userPost = require('../controller/post');
	app.post('/post',userPost.formPost);
	//退出页面路由
	app.get('/logout',validate.loginUp);
	var userLogout = require('../controller/logout');
	app.get('/logout',userLogout.logout);
	// 用户文件上传路由
	app.get('/upload',validate.loginUp);
	app.get('/upload',function(req,res,next){
		res.render('/post',{
			title:'文章发表',
			error: req.flash('error').toString(),
			success: req.flash('success').toString(),			
		});
	});
	app.post('/upload',validate.loginUp);
	// upload.array其中，第一个参数array表示可以同时上传多个文件，第二个参数5表示最多上传5个文件
	app.post('/upload',upload.array('fillData',5),function(req,res){
		// 上传成功
		req.flash('success','文件上传成功');
		res.redirect('/post');
	});
	// 文章归档路由
	app.get('/archive',userPost.userArchive);
	// 标签页面路由
	app.get('/tags',userPost.getTags);
		// 获取指定标签页面路由
	app.get('/tags/:tag',userPost.userTags);
	// 文章检索功能路由
	app.get('/search',userPost.articleSearch);
	// 友情链接路由
	app.get('/link',userPost.userLink);
	//用户信息页面路由
	app.get('/u/:username',getArticle.getUserArticle);
	// 获取文章信息分类页面
	app.get('/u/:username/:title',getArticle.getTitleArticle);
	app.post('/u/:username/:title',userPost.userComment);
	// 文章修改路由
	app.post('/edit/:username/:title',validate.loginUp);
	app.get('/edit/:username/:title',uploadArticle.articleEdit);
		// 文章修改post路由
	app.post('/edit/:username/:title',validate.loginUp);
	app.post('/edit/:username/:title',uploadArticle.articleUpdate);
	// 文章删除路由
	app.get('/remove/:username/:title',validate.loginUp);
	app.get('/remove/:username/:title',uploadArticle.articleRemove);
};

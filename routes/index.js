//引入用户权限控制中间件
var validate  = require('../controller/validate');
//路由模块 app参数是实例化后的express对象
module.exports = function(app){
	//首页路由
	//获取文章信息
	var getArticle = require('../controller/getPost');
	app.get('/',getArticle.getPost);
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
	//用户信息页面路由
	app.get('/user/:username',function(req,res,next){
		res.send('您的用户名为:' );
	});
};

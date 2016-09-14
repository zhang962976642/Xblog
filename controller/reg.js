/**
 * New node file
 * reg注册页面逻辑控制
 */

exports.reg = function(req,res,next){
	//MD5加密中间件
	var crypto = require('crypto');
	//User模型对象
	var User = require('../models/user');
	//获取用户表单提交的数据
	var name = req.body.username,
		password = req.body.password,
		password_repeat = req.body['password-repeat'],
		email = req.body.email;
	//判断两次密码输入是否一致
	if( password == null && password_repeat == null ){
		req.flash('error','密码为空,请重新输入');
		res.redirect('/reg');
		return;
	};
	if( password !== password_repeat ){
		req.flash('error','两次密码输入不一致,请重新输入');
		res.redirect('/reg');
		return;
	};
	//MD5加密密码password
	var md5 = crypto.createHash('md5'),
		password = md5.update(req.body.password).digest('hex');
	var md5 = crypto.createHash('md5'),
		email_MD5 = md5.update(email.toLowerCase()).digest('hex'),
		head = 'http://www.gravatar.com/avatar/'+email_MD5+'?s=48';
	//判断数据库用户注册的用户名是否存在 存在抛出  用户名注册的提示
	User.findOne({name:name},function(err,user){
		if(user){
			req.flash('error','用户名已存在，请重新注册');
			res.redirect('/');
			return ;
		};
		//不存在 写入到 数据库  
		User.create({
			name:name,
			password:password,
			email:email_MD5,
			head:head
		},function(err,data){
			if(err){
				req.flash('error','注册失败,请重新注册');
				return req.redirect('/reg');
			};
			console.log(123);
			//写入session
			req.session.user = name;
			//注册成功
			req.flash('success','注册成功!');
			//重定向到首页
			res.redirect('/');
		});
	});
};


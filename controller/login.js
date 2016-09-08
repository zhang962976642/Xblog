/**
 * New node file
 */
exports.login = function(req,res,next){
	//MD5加密中间件
	var crypto = require('crypto');
	//User模型对象
	var User = require('../models/user');
	//获取用户表单提交的数据
	var name = req.body.username,
		password = req.body.password;
	if(name == null || password == null){
		req.flash('error','用户名或密码为空');
		return res.redirect('/login');
	};
	//MD5加密密码
	var md5 = crypto.createHash('md5'),
		password = md5.update(req.body.password).digest('hex');
	//查询数据库 用户名是否存在
	User.findOne({name:name},function(err,user){
		if(!user){
			req.flash('error','用户名不存在,请重新登录');
			return res.redirect('/login');
		};
		//判断输入密码是否一致
		if(user.password != password){
			req.flash('error','密码不正确,忘记密码?');
			return res.redirect('/login');
		};
		//登陆成功
		req.session.user = name;
		req.flash('success','登陆成功');
		res.redirect('/');
	});
};

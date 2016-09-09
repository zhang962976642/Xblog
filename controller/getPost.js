//获取Article模型以及moment时间格式化中间件，以及用户模型中间件方便以用户名查询文章
var Article = require('../models/article'),
		moment = require('moment'),
		User = require('../models/user');
//获取首页文章信息以时间升序排列
exports.getIndex = function(req,res,next){
	//查询文章列表
	Article.find({},null,{sort:{time:1}},function(err,data){
		if(err){
			data = [];
			req.flash('error','此文章不存在');
		};
//		data[0].time = moment(data[0].time).format('YYYY-MM-DD HH:ss:mm');
		res.render('index',{
			title: '博客首页',
			user: req.session.user,
			error: req.flash('error').toString(),
			success: req.flash('success').toString(),
			docs:data,
		});
	});
};
// 获取某位用户发表的文章信息
exports.getUserArticle = function(req,res,next){
	// 以用户名查询文章
	var username = req.params.username;
	User.findOne({name:username},function(err,user){
		if(!user){
			req.flash('error','用户不存在');
			return res.redirect('/');
		};
		if(user.name == null){
			return res.redirect('/');
		};
		// 获取Article文章信息
		Article.find({name:user.name},function(err,data){
			if(err){
				req.flash('error','文章查询错误');
				return res.redirect('/');
			};
			// 返回页面信息
			res.render('user',{
				title:user.name,
				docs:data,
				user:req.session.username,
				success:req.flash('success').toString(),
				error:req.flash('error').toString(),
			});
		});
	});
};

// 点击某文章只显示文章页面
exports.getTitleArticle = function(req,res,next){
	var username = req.params.username,
			title = req.params.title;
	// 文章查询
	Article.find({name:username,title:title},function(err,data){
		if(err){
			req.flash('error','文章查询失败');
			return res.redirect('/');
		};
		res.render('article',{
			title:username,
			docs:data,
			user:req.session.user,
			success:req.flash('success').toString(),
			error:req.flash('error').toString(),		
		});
	});
};
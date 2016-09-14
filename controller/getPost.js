//获取Article模型以及moment时间格式化中间件，以及用户模型中间件方便以用户名查询文章
var Article = require('../models/article'),
		moment = require('moment'),
		User = require('../models/user');
//获取首页文章信息以时间升序排列
exports.getIndex = function(req,res,next){
	// 分页page初始值
	var page = req.query.p ? req.query.p : 1,
			// 分页的显示条数
			pageSize = 10;
	// 指定查询内容获取总长度total是查询的总长度而下面的data则由于限制显示10条数据所以为10
	//即(page-1)*10+data.length = total
	Article.count({},function(err,total){
		 //根据 query 对象查询，并跳过前 (page-1)*10 个结果，返回之后的 10 个结果
		 Article.find({},null,{skip:(page-1)*pageSize,limit:pageSize,sort:{time:1}},function(err,data){
		 	if(err){
		 		req.flash('error','文章查询出错');
		 		return res.redirect('/');
		 	};
		 	req.flash('success','文章查询完毕');
		 	res.render('index',{
				title: '博客首页',
				user: req.session.user,
				error: req.flash('error').toString(),
				success: req.flash('success').toString(),
				docs:data,
				page:parseInt(page),
				firstPage : (page-1) == 0,
				lastPage: (page - 1) * pageSize + data.length == total,
			});
		 });
	});
};
// 获取某位用户发表的文章信息
exports.getUserArticle = function(req,res,next){
	// 以用户名查询文章
	var username = req.params.username,
		// 分页page初始值
		  page = req.query.p ? req.query.p : 1,
			// 分页的显示条数
		  pageSize = 10;
	Article.count({},function(err,total){
		User.find({name:username},null,{skip:(page-1)*pageSize,limit:pageSize,sort:{time:1}},function(err,user){
			if(!user){
				req.flash('error','用户不存在');
				return res.redirect('/');
			};
			console.log(user);
		// 获取Article文章信息
			Article.find({name:username},function(err,data){
				if(err){
					req.flash('error','文章查询错误');
					return res.redirect('/');
				};
				// 返回页面信息
				res.render('user',{
					title:user.name,
					docs:data,
					page:parseInt(page),
					user:req.session.user,
					success:req.flash('success').toString(),
					error:req.flash('error').toString(),
					firstPage: (page - 1) == 0,
					lastPage: (page - 1) *10 + data.length == total,
				});
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
		if(data){
			// 设置每点击一次文章，那么此文章内的Pv值自动加1  $inc是自加1  ,  $push 是往数组内部添加内容
			User.find({name:req.session.user},{head:1},function(err,doc){
				if(err){
					req.flash('error','文章作者不存在');
					return res.redirect('/');
				};
				Article.update({'name':username,'title':title},{$inc:{pv:1}},function(err){
					if(err){
						req.flash('error','文章查询Pv错误');
						return res.redirect('back');
					};
					res.render('article',{
						title:username,
						docs:data,
						userImg:doc,
						user:req.session.user,
						success:req.flash('success').toString(),
						error:req.flash('error').toString(),		
					});
				});
			});
		};
	});
};

//获取文章信息
exports.getPost = function(req,res,next){
	//获取Article模型以及moment时间格式化中间件
	var Article = require('../models/article'),
		moment = require('moment');
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

// 引入marked语法高亮配置文件
var marked = require('../config/marked');
// 导入文章Schema模型
var Article = require('../models/article');
//post文章发表处理程序
exports.formPost = function(req,res,next){
	//获取表单信息
	var title = req.body.title,
		name = req.body.name,
		time = new Date(),
		info = req.body.message,
		titleSrc = req.body.titleSrc;
	// info字段markdown语法需要高亮代码
	var info = marked(info);
	//验证字段title是否为空
	if(title == null || title == undefined){
		req.flash('error','标题不能为空');
		return res.redirect('/post');
	};
	//写入到mongodb
	Article.create({
		title:title,
		name:name,
		time:time,
		info:info,
		titleSrc:titleSrc,
	},function(err,data){
		if(err){
			req.flash('error','文章发表失败,请稍后再试');
			return res.redirect('/post');
		};
		//写入成功
		req.flash('success','发表成功');
		res.redirect('/');
	});
};

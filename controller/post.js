// 引入marked语法高亮配置文件
var marked = require('../config/marked');
// 导入文章Schema模型
var User = require('../models/user');
var Article = require('../models/article');
//post文章发表处理程序
exports.formPost = function(req,res,next){
	//获取表单信息
	var title = req.body.title,
		name = req.body.name,
		time = new Date(),
		info = req.body.message,
		titleSrc = req.body.titleSrc;
		tarArray = [
			req.body.tag,
			req.body.tag2,
			req.body.tag3,
		]
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
		comment:[],
		tags:tarArray,
		pv:0,
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


// 留言板处理逻辑
exports.userComment = function(req,res,next){
	// 获取表单信息
	var comment = marked(req.body.comment),
			name = req.body.name,
			title = req.body.title,
			data = new Date(),
			//查询的内容
			searchMsg = {
				name:name,
				title:title,
			},
			//需要更新的内容
			updateMsg = {
				'commentInfo':comment,
				'commentTime':data,
				'commentUser':req.session.user,
			};
	// 文章内容更新使用$push往comment中插入对象userComment
	Article.update(searchMsg,{'$push':{'comment':updateMsg}},function(err){
		if(err){
			req.flash('error','文章品论出错');
			return res.redirect('/');
		};
		req.flash('success','文章评论完成');
		res.redirect('back');
	});
};
// 文章归档处理逻辑安卓逻辑升序排列
exports.userArchive = function(req,res,next){
	Article.find({},null,{sort:{time:1}},function(err,data){
		if(err){
			req.flash('error','归档失败请重新再试');
			return res.redirect('/');
		};
		req.flash('success','归档完成');
		// 返回信息
		res.render('archive',{
			title:'文章归档',
			user:req.session.name,
			docs:data,
			img:userimg,
			success:req.flash('success').toString(),
			error:req.flash('error').toString(),
		});
	});
};
// 获取所有标签页面
exports.getTags = function(req,res,next){
	Article.find({},null,function(err,data){
		if(err){
			req.flash('error',error);
		};
		Article.distinct('tags',function(err,data){
			if(err){
				req.flash('error','查找标签出错');
				return res.redirect('back');
			};
			console.log(data);
			res.render('tags',{
				title:'标签主题页',
				docs:data,
				user:req.session.user,
				success:req.flash('success').toString(),
				error:req.flash('error').toString(),
			});
		})
	});
};
// 获取指定的tags界面
exports.userTags = function(req,res,next){
	// 获取点击的tags
	var tags = req.params.tag;
	Article.find({tags:tags},{name:1,title:1,time:1},{sort:{time:1}},function(err,data){
		if(err){
			req.flash('error','标签连接出错');
			return res.redirect('back');
		};
		res.render('tag',{
			title:'Tag - ' + req.params.tag,
			docs:data,
			user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
		})
	});
};
// 文章检索功能
exports.articleSearch = function(req,res,next){
	var keywords = req.query.keyword;
	if(keywords == undefined){
		keywords = '';
	};
	var patten = new RegExp(keywords,'i');
	Article.find({title:patten},{name:1,title:1,time:1,info:1},function(err,data){
		if(err){
			req.flash('error','文章查询出错');
			return res.redirect('/');
		};
		console.log(keywords);
		res.render('search',{
			title:'Search - ' + keywords,
			docs: data,
			user: req.session.user,
			successq: req.flash('success').toString(),
			error:req.flash('error').toString()
		});
	});
};
// 友情链接逻辑
exports.userLink = function(req,res,next){
	res.render('links',{
		title:'友情链接',
		user:req.session.user,
		success:req.flash('success','友情链接'),
		error:req.flash('error','links友情链接出错')
	});
};
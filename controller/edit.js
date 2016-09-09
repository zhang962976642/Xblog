/*
* @Author: tianxing
* @Date:   2016-09-09 15:30:33
* @Last Modified by:   tianxing
* @Last Modified time: 2016-09-09 16:28:17
*/
// 实现文章修改更新功能
var Article = require('../models/article');
// markdown语法支持
var marked = require('../config/marked');
// 点击edit按钮获取用户名需要修改的文章标题，查询数据库如果没有错误，则页面展示修改Edit.html页面并且
//res.render{}返回一系列的信息
exports.articleEdit = function(req,res,next){
	var currentUser = req.params.username,
			title = req.params.title;
	Article.find({name:currentUser,title:title},function(err,data){
		if(err){
			req.flash('error','此文章不存在无法修改');
			return res.redirect('/');
		};
		// 返回get信息
		res.render('edit',{
			title:"文章编辑",
			docs:data,
			user:req.session.user,
			success:req.flash('success').toString(),
			error:req.flash('error').toString(),
		});
	});
};
// 修改文章保存逻辑
exports.articleUpdate = function(req,res,next){
	// 获取表单信息
	var msg = req.body.message;
	// 转换支持marked语法
	msg = marked(msg);
	// 获取session信息
	var currentUser = req.session.user;
	// 查询条件
	var searchMsg = {
		name:currentUser,
		title:req.params.title,
	};
	//需要更改的信息
	var updateMsg = {
		info:msg,
	};
	// 修改更新内容
	Article.update(searchMsg,updateMsg,function(err){
		var url = encodeURI('/u/'+req.params.username+'/'+req.params.title);
		if(err){
			req.flash('error','文章修改出错');
			// 跳转到修改的文章页面
			return res.redirect(url);
		};
		req.flash('success','修改成功');
		res.redirect(url);
	});
};
// 文章删除
exports.articleRemove = function(req,res,next){
	var currentUser = req.session.user;
	console.log(currentUser.name);
	Article.remove({
		name:currentUser,
		title:req.params.title,
	},function(err){
		if(err){
			req.flash('error','文章删除出错');
			return res.redirect('back');
		};
		req.flash('success','文章删除完毕');
		res.redirect('/');
	});
};
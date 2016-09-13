/**
 * New node file
 */
var mongoose = require('./db');
//创建文章模型
var articleSchema = new mongoose.Schema({
	title: { type: String, required: true },
	name: { type: String, default: '' },
	info: { type: String },
	time: { type: Date },
	titleSrc:{ type: String, default:'http://www.xiaojuzi.com'},
	comment: { type: Array },
	tags: {type: Array},
	pv: { type: Number },
});

//实例化文章模型
var Article = mongoose.model('Article', articleSchema);
//导出Article模型对象
module.exports = Article;

/**
 * New node file
 * User用户文档模型
 */
var mongoose = require('./db');
var crypto = require('crypto');
//创建user用户模型
var userSchema = new mongoose.Schema({
	name: { type:String, required: true },	//用户名约定是字符串必填
	password:{ type:String, required: true},  //用户账号密码 使用MD5加密
	email:{ type: String, default:'962976642@qq.com' }, //邮箱不是必填项目默认地址为962976642@qq.com
	head: { type: String },																					//添加header头部文件实现用户头像
});

//创建Model实例模型方便操作数据库           注:mongoose.model('表名',模型对象集合);
var User = mongoose.model('User',userSchema);

//暴露中间价User实例化模型方便控制用户登录注册验证
module.exports = User;

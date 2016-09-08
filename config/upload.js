/*
* @Author: tianxing
* @Date:   2016-09-08 15:18:05
* @Last Modified by:   tianxing
* @Last Modified time: 2016-09-08 15:39:37
*/

// 文件上传配置文件
var multer = require('multer');
// 配置multer上传文件配置
var storage = multer.diskStorage({
	// destination是文件上传的指定目录
	destination: function(req,file,cb){
		// 指定上传文件到目录
		cb(null, './public/images/userimg');
	},
	// filename是上传文件之后的名称
	filename: function(req,file,cb){
		// 指定上传文件之后的名称还是原名称
		cb(null,file.originalname);
	},
});
var upload = multer({
	// 文件名为原文件名
	storage: storage
});
// 导出upload接口
module.exports = upload;

/**
 * New node file
 *暴露一个接口文件
 **{
 * 	cookieSecret是加密cookie的内容防止被篡改
 * 	host是连接mongodb的地址
 * 	port是连接mongodb的端口号
 * 	db是连接mongodb的那个文档集合
 * }
 */
module.exports = {
	cookieSecret: '小橘子的博客',
	host: 'localhost',
	port: '27017',
	db: 'Xblog'
};

/*
* @Author: tianxing
* @Date:   2016-09-08 11:34:40
* @Last Modified by:   tianxing
* @Last Modified time: 2016-09-08 11:36:42
*/
// 引入marked中间件高亮代码
var marked = require('marked');
// 配置markdown语法高亮
marked.setOptions({
  renderer:new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});
// 导出marked对象
module.exports = marked;

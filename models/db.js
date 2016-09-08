//使用mongoose连接mongodb
var settings = require('../config/settings');
var mongoose = require('mongoose');

//连接mongodb
mongoose.connect('mongodb://' + settings.host + '/' + settings.db );
//暴露中间件提供接口
module.exports = mongoose;

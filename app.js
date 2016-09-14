var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//引入express中间件session
var session = require('express-session');
//写入到mongodb的session的中间件 connect-mongo
var MongoStore = require('connect-mongo')(session);
//路由中间件
var Routes = require('./routes/index');
//信息通知中间件
var flash = require('connect-flash');
//转换mongodb Date类型的8小时时差 如  moment(obj.title).format('YYYY-MM-DD HH:mm:ss');
var moment = require('moment');
//引入mognodb配置文件
var settings = require('./config/settings');
//引入注册页面/登录页面控制层
var userReg = require('./controller/reg');
//实例化 express对象
// 生成日志
var fs = require('fs');
var accessLog = fs.createWriteStream('access.log',{flags:'a'});
var errorLog = fs.createWriteStream('error.log',{flags:'a'});
var app = express();

// view engine setup
//解析html文件使用ejs模板
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images/favicon.ico')));
app.use(logger('dev'));
// 添加日志
app.use(logger({stream:accessLog}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
//写入session到数据库
app.use(session({
	secret: settings.cookieSecret, //加密session;       加密的字符串在config/settings.js
	key: settings.db, //session的键值为 数据库的文档集合名	
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 30
	}, //设置session的过期时间
	resave: false,
	store: new MongoStore({ //实例化连接一个monmgodb数据库url对象为mongodb的地址
		//写入session的地址
		url: 'mongodb://' + settings.host + '/' + settings.db
	}),
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(err,req,res,next){
	var meta = '[' + new Date() + ']' + req.url +'\n';
	errorLog.write(meta+err.stack + '\n');
	next();
});
//实例化flash中间件   注:必须先写入session在使用falsh中间件
app.use(flash());
//引用路由实例模块   注:所有中间件必须现在路由模块加载之前 加载使用
Routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	// var err = new Error('Not Found');
	// err.status = 404;
	// next(err);
	// 渲染views/404页面
	res.render('404',{
		title:'404 No Found'
	});
});

// error handlers

// development error handler
// will print stacktrace
if(app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;
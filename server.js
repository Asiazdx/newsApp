var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql=require('./com/mysql');//引入数据库链接模块
var session=require("express-session");//引入session模块
var crypto=require("crypto");//加密模块
var child=require("child_process");//引入子进程模块
var ejs=require('ejs');//ejs模板引擎模块



var begin=require('./routes/begin');//启动页
var login=require('./routes/login');//登录页
var reg=require('./routes/reg');//注册界面
var users = require('./routes/users');//用户中心
var home=require('./routes/home');//首页
var list=require('./routes/list');//列表页
var show=require('./routes/show');//内容页
var pinglun=require('./routes/pinglun');//评论
var error=require('./routes/error');//信息提醒
var index = require('./routes/index');//引导页

var app = express();

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));//app图标默认路径
//app.use(logger('dev'));//生成日志
app.use(bodyParser.json());//对json格式的post信息解析
app.use(bodyParser.urlencoded({ extended: false }))//对urlencoded格式的post信息进行解析
app.use(cookieParser());//解析web浏览器里的cookie信息
app.use(session({ secret: 'keyboard cat', name:"abc",cookie: {  }}));//设置session
app.use(express.static(path.join(__dirname, 'public')));//设置静态地址
global.rootPath=__dirname;//全局地址（项目根目录）


//开启一个子进程用来爬虫
/*var obj=child.fork('pachong.js');
 obj.on("message",function(info){
 console.log(info);
 });*/


app.use('/begin',begin);
app.use('/users', users);
app.use('/home',home);
app.use('/login',login);
app.use('/list',list);
app.use('/show',show);
app.use('/pinglun',pinglun);
app.use('/reg',reg);
app.use('/error',error);
app.use('/',index);



app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
app.listen(18080);

var express = require('express');
var path = require('path');
var mysql=require("./com/mysql");
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require("express-session");
var crypto=require("crypto");
var child=require("child_process");//�������ģ��
var ejs=require('ejs');
var users = require('./routes/users');
var login=require('./routes/login');
var yindao=require('./routes/yindao');
var begin=require('./routes/begin');
var error=require('./routes/error');
var reg=require('./routes/reg');
var home=require('./routes/home');
var list=require('./routes/list');
var show=require('./routes/show');
var pinglun=require('./routes/pinglun');
var app = express();
app.use(session({ secret: 'keyboard cat', name:"abc",cookie: {  }}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
global.rootPath=__dirname;
//�����ӽ���
/*var obj=child.fork('pachong.js');
obj.on("message",function(info){
    console.log(info);
});*/
app.use('/yindao',function(req,res,next){
    if(true){    //����ҳ�����ǵ�һ�η��ʵ�ʱ��Ż���֣�һ�������һ��cookieֵ����¼�Ƿ��һ�η��ʣ�����Ϊ����ʾ��������û������
        next();
    }else{
        res.redirect('begin');
    }
},yindao);
app.use('/begin',begin);
app.use('/users', users);
app.use('/login',login);
app.use('/error',error);
app.use('/reg',reg);
app.use('/home',home);
app.use('/list',list);
app.use('/show',show);
app.use('/pinglun',pinglun);
app.listen(18080);


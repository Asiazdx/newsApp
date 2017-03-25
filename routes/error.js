var express = require('express');
var router = express.Router();
router.use('/loginError',function(req,res,next){
    var data={
        title:'登录失败',
        con:'用户名或密码错误'
    }
    res.render('error',{data:data});
});
router.use('/regSuccess',function(req,res,next){
    var data={
        title:'注册成功',
        con:'直接去登陆'
    }
    res.render('error',{data:data});
})
module.exports=router;

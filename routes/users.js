var express = require('express');
var router = express.Router();
var session=require("express-session");
var mysql=require('../com/mysql');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('user');
});
/*登录*/
router.use('/login',function(req,res,next){
  var username=req.body.username;
  var password=req.body.password;
  mysql.query('select * from user',function(err,rows){
    if(rows){
      for(var i=0;i<rows.length;i++){
        if(rows[i].username==username&&rows[i].password==password){
         req.session.username=username;
         res.redirect('/home');
         break;
        }
          if(i==rows.length){
              res.redirect('/error/loginError');
          }
      }
    }else{
      console.log(err);
    }
  })

})
/*判断注册账户是否已存在*/
router.use('/reg',function(req,res,next){
  var username=req.body.username;
  var password=req.body.password;
    mysql.query('insert into user (username,password) values("'+username+'","'+password+'")',function(err,result){
          if(result){
            res.redirect('/error/regSuccess');
          }else{
            console.log(err);
          }
        })
})

module.exports = router;

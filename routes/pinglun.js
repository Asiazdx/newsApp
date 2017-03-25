var express = require('express');
var router = express.Router();
var session=require("express-session");
var mysql=require('../com/mysql');
/*router.use('/',function(req,res,next){

})*/
router.use('/addPinglun',function(req,res,next){
    var username=req.session.username;
    var aid=req.body.aid;
    var pinglunCon=req.body.pinglunCon;
    mysql.query('insert into liuyan (aid,username,pinglunCon) values('+aid+',"'+username+'","'+pinglunCon+'")',function(err,result){
        if(result){
            res.send('ok');
        }else{
            console.log(err)
        }
    })
})

module.exports=router;

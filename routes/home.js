var express = require('express');
var router = express.Router();
var mysql=require('../com/mysql');
var async=require("async");//异步处理模块
/*获取首页内容*/
router.use('/',function(req,res,next){
    var navData=[];
    var lunboData=[];
    var listData=[];
    async.series([function(cb1){
        mysql.query('select * from category order by id asc limit 10 ',function(err,rows){
            if(rows){
                for(var i=0;i<rows.length;i++){
                    navData.push(rows[i]);
                }
            }
            cb1();
        });
    },function(cb1){
        mysql.query('select * from artical',function(err,rows){
            for(var i=0;i<3;i++){
                lunboData.push(rows[i]);
            }
            for(var j=3;j<6;j++){
                listData.push(rows[j]);
            }
            cb1();
        });
    }],function(){
        var data={
            navData:navData,
            lunboData:lunboData,
            listData:listData
        }
        res.render('home',{data:data});
    })

});
/*获取列表页*/

module.exports=router;

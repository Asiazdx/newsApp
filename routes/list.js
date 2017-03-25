var express = require('express');
var router = express.Router();
var mysql=require('../com/mysql');
var async=require('async');
router.get('/:id',function(req,res,next){
    var cid=req.params.id;
    var sql='select * from artical where cid='+cid+' order by id limit 5';
    var sql2='select * from category where cid='+cid;
    var list;
    var cname;
    async.series([
     function(cb1){
        mysql.query(sql,function(err,rows){
            if(rows){
                list=rows;
                cb1();
            }
        })
    },function(cb1){
            mysql.query(sql2,function(err,rows){
                if(rows){
                    cname=rows[0].cname;
                    cb1();
                }
            })
    }],function(cb){
        var data={
            list:list,
            cname:cname
        }
        res.render('list',{data:data})
    })
});
router.use('/listLoad/:id',function(req,res,next){
    var cid=req.params.id;
    var point=req.body.point;
    var pointTo=point+5;
    var sql='select * from artical where cid='+cid+' order by id limit '+point+','+pointTo;
    mysql.query(sql,function(err,rows){
        if(rows){
            res.send(rows);
        }else if(!rows){
            res.send('no');
        }
    })
})
module.exports=router;
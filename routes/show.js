var express = require('express');
var router = express.Router();
var mysql=require('../com/mysql');
var async=require('async');
router.get('/:id',function(req,res,next){
    var id=req.params.id;
    var con;
    var liuyan;
    async.series([
        function(cb1){
            mysql.query('select * from artical where id='+id,function(err,rows){
                if(rows){
                    con=rows[0];
                    cb1();
                }
            })
        },
        function(cb1){
            mysql.query('select * from liuyan where aid='+id,function(err,rows){
                if(rows){
                    liuyan=rows;
                    cb1();
                }
            })
        }
    ],function(cb){
        var data={
            con:con,
            liuyan:liuyan
        }
        res.render('show',{data:data});
    })
});
module.exports=router;

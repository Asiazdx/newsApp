var write=require("./write");
var read=require('./read');
var async=require("async");
category=[];
listArr=[];
async.series([
    //写栏目1
    function(cb){
        write.writeCategory('http://tech.ifeng.com/listpage/803/1/list.shtml',function(data){
            category=data;
            cb();
        })
    },
    //写栏目2
    function(cb){
        write.writeSubCategory('http://tech.ifeng.com/listpage/803/1/list.shtml',function(data){
            for(var i=0;i<data.length;i++){
                category.push(data[i]);
            }
            cb();
        })
    },
    //读取列表
    function(cb){
        category.forEach(function(obj1,index){
            async.series([function(cb1){
                read.readList(obj1.curl,function(data){
                    //读取每一个分类中的列表.并存入数组listArr中
                    listArr=data;
                    cb1();
                })
            }, function(cb1){
                //通过forEach方法将列表中对应的文章写入到数据库中
                listArr.forEach(function(obj,index){
                    write.writeArc(obj,obj1.cid,function(data){
                        cb1();
                    });
                });
            }],function(){
            });
        });
        cb();
    }
],function(){

});



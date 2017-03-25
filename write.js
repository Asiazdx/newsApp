var http=require("http");
var fs=require("fs");
var mysql=require("./com/mysql");
var read=require("./read.js");
var async=require("async");
var path=require("path");
//写新闻主分类
module.exports.writeCategory=function(url,callback){
    var newData;
    read.readCategory(url,function(data){
        newData=data;
        async.each(data,function(file,callback){
            var cid=file.cid;
            var cname=file.cname;
            var curl=file.curl;
            var cpos=file.cpos;
            str='replace into category (cname,cid,cpos,curl) values("'+cname+'","'+cid+'","'+cpos+'","'+curl+'")';
            mysql.query(str,function(err){
                if(err) throw err;
                else{callback();}
            });
        },function(err){
            if(err){
                console.log('no');
            }
        })
        callback(data);
    })
}
//写新闻子分类
module.exports.writeSubCategory=function(url,callback){
    var newData;
    read.readSubCategory(url,function(data){
        newData=data;
        async.each(data,function(file,callback){
            var cid=file.cid;
            var cname=file.cname;
            var curl=file.curl;
            var cpos=file.cpos;
            str='replace into category (cname,cid,cpos,curl) values("'+cname+'","'+cid+'","'+cpos+'","'+curl+'")';
            mysql.query(str,function(err){
                if(err) throw err;
                else{callback();}
            });
        },function(err){
            if(err){
                console.log('no');
            }
        })
        callback(data);
    })
}
//写入新闻内容
module.exports.writeArc=function(url,cid,callback) {
    if (cid) {
        var arcUrl = url;
        read.readArc(arcUrl, function (data) {
            var title = data.title;
            var time = data.time;
            var con = data.con;
            //加载图片到本地
            /*if (data.imgUrl) {
                        if (/\.(jpg|png|gif|jpeg)/.test(data.imgUrl)) {
                            http.get(data.imgUrl, function (res) {
                                res.pipe(fs.createWriteStream("./public/img/" +path.basename(data.imgUrl)));
                                console.log('ok');
                            })
                }
            }*/
            //添加新闻内容
        if(data.imgUrl) {
            var imgUrl = "./public/img/" + path.basename(data.imgUrl);
            if (title) {
                var str = "replace into artical (con,title,cid,time,imgUrl) values('" + con + "','" + title + "'," + cid + ",'" + time + "','" + imgUrl + "')";
                mysql.query(str, function (err, res) {
                    if (res) {
                        console.log('ok');
                    } else {
                        console.log(err);
                    }
                });
            }
        }
            })
    }
}
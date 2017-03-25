var request=require("request");
var cheerio=require("cheerio");
var mysql=require("./com/mysql");
//读取新闻分类
module.exports.readCategory=function(url,callback) {
    request(url, function (error, head, body) {
        var $ = cheerio.load(body);
        var navArr=[];
        var arr=$(".col_nav").find('ul').find('li[class!="pa01"]').find('a');
        arr.each(function(index,obj){
            if(index!=10&&index!=11&&index!=12) {
                var cname = $(this).html();
                cname = unescape(cname.replace(/&#x/g, "%u").replace(/;/g, ""));
                var curl=$(this).attr('href');
                var cid=index;
                var obj={
                    cname:cname,
                    curl:curl,
                    cid:cid,
                    cpos:0
                };
                navArr.push(obj);
            }
        })
        callback(navArr);
    })
}
//获取新闻子分类
module.exports.readSubCategory=function(url,callback) {
    request(url, function (error, head, body) {
        var $ = cheerio.load(body);
        var subnavArr = [];
        var arr = $(".col_subnav").find('ul').find('li[class!="pa01"]').find('a');
        arr.each(function (index, obj) {
                var cname = $(this).html();
                cname = unescape(cname.replace(/&#x/g, "%u").replace(/;/g, ""));
                var curl = $(this).attr('href');
                var cid = index+10;
                var obj = {
                    cname: cname,
                    curl: curl,
                    cid: cid,
                    cpos:1
                };
                subnavArr.push(obj);
        })
        callback(subnavArr);
    })
}
//获取新闻列表
module.exports.readList=function(url,callback){
        request(url,function(error,head,body){
            if(error){
            }else{
                var $=cheerio.load(body);
                var listArr=[];
                var arr=$('.zheng_list').find('.zxbd').find('p').find('a');
                arr.each(function(index,obj){
                    listArr.push($(this).attr('href'));
                })
                callback(listArr);
            }
        })
}
//获取新闻内容
module.exports.readArc=function(url,callback){
    request(url,function(error,head,body){
        if(error){
        }else {
            var $ = cheerio.load(body);
            var title = $('#artical_topic').text();
            var time = $('#artical_sth .p_time').find('.ss01').text().replace(/(^\s*)|(\S* $)/g,"").substr(0,17);
            var imgUrl = $('#main_content').find('.detailPic').find('img').attr('src');
            var con = [];
            //console.log(($('#main_content').find('p')).eq(1).text());
            for(var i=0;i<$('#main_content').find('p [class!="p1"]').length;i++){
               con.push($('#main_content').find('p').eq(i+1).text());
            }
            var arcObj = {
                title: title,
                time: time,
                imgUrl: imgUrl,
                con:con
            };
            callback(arcObj);
        }
    })
}




$(function(){
    var con=document.getElementById('con');
    var pinglun=document.getElementById('pinglun');
    var conCover=document.getElementById('conCover');
    var aid=document.getElementById('aid').value;
    touch.on($('.icon-pinglun'),'tap',function(){
        con.style.zIndex=998;
        con.style.opacity=0.6;
        pinglun.style.opacity=1;
        conCover.style.opacity=0.8;
    })
    /*ajax添加评论*/
    touch.on($('#sub'),'tap',function(){
        var pinglunCon=document.getElementById('pinglunCon').value;
        if(pinglunCon) {
           $.ajax({
               type: 'post',
                url: '/pinglun/addPinglun',
                data: {aid: aid, pinglunCon: pinglunCon},
                success: function (e) {
                    if(e=='ok'){
                        alert('评论成功！');
                        document.getElementById('pinglunCon').value="";
                        con.style.zIndex=999;
                        con.style.opacity=1;
                        pinglun.style.opacity=0;
                        conCover.style.opacity=0;
                    }
                }
            })
        }else{
            alert('评论不能为空');
        }
    })
    /*取消评论*/
    touch.on($('#cancle'),'tap',function(){
        document.getElementById('pinglunCon').value="";
        con.style.zIndex=999;
        con.style.opacity=1;
        pinglun.style.opacity=0;
        conCover.style.opacity=0;
    })
    /*退回*/
    var back=document.getElementsByClassName('icon-back');
    touch.on(back,'tap',function(){
        history.go(-1);
    })
})

/*用rem方式设置移动端尺寸问题*/
$(function(){
    document.addEventListener("touchmove",function(e){e.preventDefault();},false);
    var cw=$(window).width();
    var ch=$(window).height();
    /*配置尺寸*/
    function resize(theSize,type){
        var type=type||"x";
        var theSize=theSize;
        if(type=="x"){
            var scale=cw/theSize*100;
        }else if(type=="y"){
            var scale=ch/theSize*100;
        }
        $("html").css({
            fontSize:scale+"px"
        })
    }
    resize(750,"x");
})


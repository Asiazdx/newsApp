var myScroll,pullDownEl, pullDownOffset,pullUpEl, pullUpOffset,generatedCount = 5;
$(function(){
    touch.on($('.icon-back'),'tap',function(e){
        history.go(-1);
    })
})
function loaded() {
    //动画部分
    pullDownEl = document.getElementById('pullDown');
    pullDownOffset = pullDownEl.offsetHeight;
    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;
    myScroll = new iScroll('wrapper', {
        useTransition: true,
        topOffset: pullDownOffset,
        onRefresh: function () {
            if (pullDownEl.className.match('loading')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新';
            } else if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
            }
        },
        onScrollMove: function () {

            if (this.y > 5 && !pullDownEl.className.match('flip')) {
                pullDownEl.className = 'flip';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '释放刷新';
                this.minScrollY = 0;
            } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
                this.minScrollY = -pullDownOffset;
            } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                pullUpEl.className = 'flip';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = 'pull down to refresh';
                this.maxScrollY = this.maxScrollY;
            } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
                this.maxScrollY = pullUpOffset;
            }
        },
        onScrollEnd: function () {
            if (pullDownEl.className.match('flip')) {
                pullDownEl.className = 'loading';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中';
                pullDownAction();	// Execute custom function (ajax call?)
            } else if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中';
                pullUpAction();	// Execute custom function (ajax call?)
            }
        }
    });
    //loadAction();
}
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);//��ֹð��
document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 0); }, false);

//初始状态，加载数据
/*function loadAction(data){
    var el, li;
    el = document.getElementById('thelist');
    for (i=0; i<5; i++) {
        li = document.createElement('li');
        li.innerText = '原始数据--' + (++generatedCount);
        el.appendChild(li, el.childNodes[0]);
    }
    myScroll.refresh();
}*/

//下拉刷新，重新加载所有数据
/*function pullDownAction () {
    setTimeout(function () {
        var cid=window.location.href.substr(-1,1);
        myScroll.refresh();
    }, 400);
}*/

//上拉加载
function pullUpAction () {
    setTimeout(function () {
        var el, li;
        el = document.getElementById('thelist');
        var cid=window.location.href.substr(-1,1);
        $.ajax({
            url:'/list/listLoad/'+cid,
            type:'post',
            data:{point:generatedCount},
            success:function(e){
                if(e=='no'){
                    alert('已经没有更过数据');
                }else{
                    for (i=0; i<5; i++) {
                        img=document.createElement('img');
                        img.src= '../'+e[i].imgUrl;
                        div=document.createElement('div');
                        div.innerHTML=e[i].title;
                        time=document.createElement('span');
                        time.innerHTML=e[i].time;
                        li = document.createElement('li');
                        li.appendChild(img,li.childNodes[0]);
                        li.appendChild(div,li.childNodes[1]);
                        li.appendChild(time,li.childNodes[2]);
                        el.appendChild(li, el.childNodes[0]);
                    }
                }
            }
        })
        generatedCount+=5;
        myScroll.refresh();
    }, 400);
}
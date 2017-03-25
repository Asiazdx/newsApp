$(function(){
    //内部滚动
    function setScroll(str) {
        var myScroll = new IScroll(str, {
            scrollX: true,
            freeScroll: true,
            bounce: false
        });
    }
    /*导航*/
    var mySwiper1 = new Swiper('#nav', {
        pagination: '.swiper-pagination',
        slidesPerView: 5,
        paginationClickable: true,
        spaceBetween: 1,
        freeMode: true,
        freeModeMomentumBounce: false
    });
    /*轮播图*/
    var mySwiper = new Swiper('#lunbo', {
        pagination : '.swiper-pagination',
        paginationClickable: true,
        autoplay: 3000,
        autoplayDisableOnInteraction: false
    });
})

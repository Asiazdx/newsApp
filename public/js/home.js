$(function(){
    //�ڲ�����
    function setScroll(str) {
        var myScroll = new IScroll(str, {
            scrollX: true,
            freeScroll: true,
            bounce: false
        });
    }
    /*����*/
    var mySwiper1 = new Swiper('#nav', {
        pagination: '.swiper-pagination',
        slidesPerView: 5,
        paginationClickable: true,
        spaceBetween: 1,
        freeMode: true,
        freeModeMomentumBounce: false
    });
    /*�ֲ�ͼ*/
    var mySwiper = new Swiper('#lunbo', {
        pagination : '.swiper-pagination',
        paginationClickable: true,
        autoplay: 3000,
        autoplayDisableOnInteraction: false
    });
})

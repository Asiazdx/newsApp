$(function(){
    var mySwiper = new Swiper('.swiper-container',{
        pagination : '.swiper-pagination',
        paginationType : 'bullets',
        paginationClickable :true,
        onInit: function(swiper){ //Swiper2.x�ĳ�ʼ����onFirstInit
            swiperAnimateCache(swiper); //���ض���Ԫ��
            swiperAnimate(swiper); //��ʼ����ɿ�ʼ����
        },
        onSlideChangeEnd: function(swiper){
            swiperAnimate(swiper); //ÿ��slide�л�����ʱҲ���е�ǰslide����
        }
    })
})
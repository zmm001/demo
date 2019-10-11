$(function() {
    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: 4000,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        autoplayDisableOnInteraction: false
    });

    mySwiper.stopAutoplay();

    setTimeout(function () {
        mySwiper.startAutoplay();
        $(".swiper-container").hover(function () {
            mySwiper.stopAutoplay();
        }, function () {
            mySwiper.startAutoplay();
        });
    }, 2500);
});
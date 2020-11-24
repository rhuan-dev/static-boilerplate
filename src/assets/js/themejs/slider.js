import Swiper from "swiper";

new Swiper('.swiper-container', {
    // Optional parameters
    loop         : true,
    slidesPerView: 2,
    spaceBetween: 30,
    // If we need pagination
    pagination   : {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
})

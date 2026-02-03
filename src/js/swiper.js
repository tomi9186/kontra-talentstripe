import Swiper from 'swiper/bundle';

document.addEventListener('DOMContentLoaded', function() {
  const sliders = document.querySelectorAll('.testimonials-swiper');

  sliders.forEach((sliderElement, index) => {
    const slider = new Swiper(sliderElement, {
      slidesPerView: 1,
      spaceBetween: 40,
      loop: true,
      speed: 800,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      breakpoints: {
        768: {
          slidesPerView: 1,
        }
      }
    });
  });
});

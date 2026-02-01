import Swiper from 'swiper/bundle';

// Inicijalizacija Swipera
document.addEventListener('DOMContentLoaded', function() {  
  // Primjer inicijalizacije
  const swiper = new Swiper('.my-swiper', {
    slidesPerView: 3,           
    centeredSlides: true,            
    spaceBetween: 20,
    loop: true,
    loopAdditionalSlides: 4,    
    loopedSlides: 3,
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 3000,
    },
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const swiper = new Swiper('.testimonial-swiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    }
  });
});

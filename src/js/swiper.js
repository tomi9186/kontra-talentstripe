// script.js - Ažurirani kod
import Swiper from 'swiper/bundle';

document.addEventListener('DOMContentLoaded', function() {
  const swiper = new Swiper('.swiper-container', {
    // Center fokus
    centeredSlides: true,
    centerInsufficientSlides: true,
    
    // Infinite loop
    //loop: true,
    loopedSlides: 6,
    
    // Slides per view - veći razmak
    slidesPerView: 'auto',
    spaceBetween: 300, // Povećan razmak
    
    // Speed i efekti
    speed: 600,
    grabCursor: true,
    
    // Touch efekti
    touchRatio: 1,
    resistance: true,
    resistanceRatio: 0.85,
    
    // POBOLJŠANE PAGINACIJA I STRELICE
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 3,
    },
    
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    // Autoplay
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    
    // MOBILE PRIORITET - SAMO 1 SLIDE VIDLJIV
    breakpoints: {
  // xs (0+) - mali mobilni ✓
  320: {
    slidesPerView: 1,
    spaceBetween: 30,
  },
  
  // sm (576px+) - mali tablet
  576: {
    slidesPerView: 1,
    spaceBetween: 35,
  },
  
  // md (768px+) - tablet ✓
  768: {
    slidesPerView: 1,
    spaceBetween: 50,
  },
  
  // lg (992px+) - desktop mali  
  992: {
    slidesPerView: 1,
    spaceBetween: 60,
    centeredSlides: true,
  },
  
  // xl (1200px+) - desktop veliki ✓
  1200: {
    slidesPerView: 1.6,
    spaceBetween: 100,
    centeredSlides: true,
  },
  
  // xxl (1400px+) - desktop extra ✓  
  1400: {
    slidesPerView: 1.7,
    spaceBetween: 200,
    centeredSlides: true,
  },
},
    

  });
  
  // Custom center focus efekat
  function updateCenterFocus() {
    const activeSlide = document.querySelector('.swiper-slide-active .card-item.purple');
    if (activeSlide) {
      activeSlide.style.transform = 'scale(1)';
      activeSlide.style.zIndex = '3';
      activeSlide.style.filter = 'brightness(1)';
    }
    
    const prevSlide = document.querySelector('.swiper-slide-prev .card-item.purple');
    const nextSlide = document.querySelector('.swiper-slide-next .card-item.purple');
    
    if (prevSlide) {
      prevSlide.style.transform = 'rotate(-12deg) scale(0.85)';
      prevSlide.style.zIndex = '2';
      prevSlide.style.filter = 'brightness(0.9)';
    }
    
    if (nextSlide) {
      nextSlide.style.transform = 'rotate(12deg) scale(0.85)';
      nextSlide.style.zIndex = '2';
      nextSlide.style.filter = 'brightness(0.9)';
    }
  }
  
  updateCenterFocus();
});

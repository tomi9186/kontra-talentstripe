// script.js - Ažurirani kod
import Swiper from 'swiper/bundle';

document.addEventListener('DOMContentLoaded', function() {
  const swiper = new Swiper('.swiper-container', {
    // Center fokus
    centeredSlides: true,
    centerInsufficientSlides: true,
    
    // Infinite loop
     loop: false,
    // loopedSlides: 6,
    
    // Slides per view - veći razmak
    slidesPerView: 'auto',
    spaceBetween: 260, // Povećan razmak
    
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
      320: {
        slidesPerView: 1.1,  // Samo centralni + malo ivica
        spaceBetween: 30,
      },
      480: {
        slidesPerView: 1.3,
        spaceBetween: 40,
      },
      768: {
        slidesPerView: 1.6,  // Vidljive 3 kartice
        spaceBetween: 50,
      },
      1024: {
        slidesPerView: 2.0,  // Optimalno za desktop
        spaceBetween: 60,
      },
      1440: {
        slidesPerView: 2.2,
        spaceBetween: 360,
      },
    },
    
    // Custom efekti za center slide
    on: {
      slideChange: function() {
        document.querySelectorAll('.card-item').forEach((card) => {
          card.style.transform = '';
          card.style.zIndex = '';
          card.style.filter = '';
        });
      },
    }
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
  
  swiper.on('slideChangeTransitionStart', updateCenterFocus);
  swiper.on('transitionStart', updateCenterFocus);
  updateCenterFocus();
});

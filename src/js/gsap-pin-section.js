import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export function initGsapPinSection() {
  const jobSeekerHero = document.querySelector('.job-seeker-hero');
  if (!jobSeekerHero) return;

  const images = jobSeekerHero.querySelectorAll('.hero-image');
  const featureItems = jobSeekerHero.querySelectorAll('.feature-item');
  const lineActive = jobSeekerHero.querySelector('.line-active');

  if (images.length === 0 || featureItems.length === 0 || !lineActive) return;

  const totalSlides = images.length;
  let currentSlide = 0;
  let scrollTrigger = null;

  // Initial state
  gsap.set(images[0], { autoAlpha: 1 });
  gsap.set(lineActive, { y: 0 });
  featureItems[0].classList.add('active');

  function updateActiveSlide(index) {
    // Fade out current
    gsap.to(images[currentSlide], { 
      autoAlpha: 0, 
      scale: 0.95, 
      duration: 0.6, 
      ease: 'power2.inOut' 
    });
    
    // Fade in new
    gsap.fromTo(images[index], 
      { autoAlpha: 0, scale: 1.05 }, 
      { autoAlpha: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
    );

    // Update features
    featureItems.forEach((item, i) => {
      item.classList.toggle('active', i === index);
      item.classList.toggle('secondary', i !== index);
    });

    currentSlide = index;
  }

  // Navigation clicks
  featureItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      if (scrollTrigger) {
        const targetProgress = index / (totalSlides - 1);
        const scrollPos = scrollTrigger.start + targetProgress * (scrollTrigger.end - scrollTrigger.start);
        gsap.to(window, { 
          scrollTo: { y: scrollPos, offsetY: 0 }, 
          duration: 1.2,
          ease: 'power2.inOut',
          onComplete: () => updateActiveSlide(index)
        });
      }
    });

    // Hover effects
    item.addEventListener('mouseenter', () => {
      gsap.to(lineActive, { 
        y: (index * 132) / (totalSlides - 1), 
        duration: 0.4, 
        ease: 'power2.out' 
      });
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(lineActive, { 
        y: (currentSlide * 132) / (totalSlides - 1), 
        duration: 0.5, 
        ease: 'power2.out' 
      });
    });
  });

  // ScrollTrigger PIN + SLIDE efekat
  scrollTrigger = ScrollTrigger.create({
    trigger: jobSeekerHero,
    start: 'top top',
    end: `+=${(totalSlides - 1) * 300}vh`, // Sporije scroll
    scrub: 2,
    pin: true,
    anticipatePin: 1,
    onUpdate: (self) => {
      const progress = self.progress;
      
      // Line indicator
      gsap.set(lineActive, { y: progress * 132 });
      
      // Slide change
      const slideIndex = Math.round(progress * (totalSlides - 1));
      if (slideIndex !== currentSlide && slideIndex >= 0 && slideIndex < totalSlides) {
        updateActiveSlide(slideIndex);
      }
    }
  });
}

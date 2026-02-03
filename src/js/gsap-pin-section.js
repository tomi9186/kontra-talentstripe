import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export function initGsapPinSection(container = document) {
  // ✅ RESPONSIVE DETEKCIJA (Bootstrap md+ = 768px+)
  const isDesktop = window.innerWidth >= 768;
  if (!isDesktop) return;

  // ✅ NAĐI SVE BLOKOVE (podržava više blokova)
  const wrappers = container.querySelectorAll('.custom-scroll-pin-wrapper');
  
  wrappers.forEach((customScrollPinWrapper, wrapperIndex) => {
    const customScrollPinElement = customScrollPinWrapper.querySelector('.custom-scroll-pin-element');
    if (!customScrollPinElement) return;

    // ✅ UNIČNI ID za svaki blok
    const uniqueId = `pin-section-${wrapperIndex}`;

    // FIKSNA 600px VISINA
    const customScrollPinWrapperHeight = 600;
    customScrollPinWrapper.style.height = `${customScrollPinWrapperHeight * 4}px`;

    // SLIKE: 600px height, auto width, cover
    gsap.set(customScrollPinWrapper.querySelector('.custom-scroll-pin-images'), { 
      height: customScrollPinWrapperHeight + 'px' 
    });
    gsap.set(customScrollPinWrapper.querySelectorAll('.custom-scroll-pin-image'), { 
      height: customScrollPinWrapperHeight + 'px',
      width: '100%'
    });
    gsap.set(customScrollPinWrapper.querySelectorAll('.custom-scroll-pin-image img'), { 
      height: customScrollPinWrapperHeight + 'px',
      width: '100%',
      objectFit: 'cover'
    });

    const images = customScrollPinElement.querySelectorAll('.custom-scroll-pin-image');
    const listItems = customScrollPinElement.querySelectorAll('ul.custom-scroll-pin-list > li');

    // Ukloni active klase
    listItems.forEach(li => li.classList.remove('active'));

    // Pin glavni element (UNIČNI ID)
    ScrollTrigger.create({
      id: `${uniqueId}-main`,
      trigger: customScrollPinWrapper,
      start: 'top top',
      end: 'bottom bottom',
      pin: customScrollPinElement,
      pinSpacing: false,
      invalidateOnRefresh: true
    });

    // Master controller (UNIČNI ID)
    ScrollTrigger.create({
      id: `${uniqueId}-controller`,
      trigger: customScrollPinWrapper,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const progress = self.progress;
        let activeIndex;
        if (progress < 0.33) activeIndex = 0;
        else if (progress < 0.66) activeIndex = 1;
        else activeIndex = 2;
        
        listItems.forEach(li => li.classList.remove('active'));
        if (listItems[activeIndex]) {
          listItems[activeIndex].classList.add('active');
        }
      }
    });

    // Progress bar animacije
    [0, 1, 2].forEach(index => {
      if (!listItems[index]) return;
      const listItem = listItems[index];

      gsap.to(listItem, {
        '--custom-pin-progression': 1,
        scrollTrigger: {
          id: `${uniqueId}-listitem-${index}`,
          trigger: customScrollPinWrapper,
          start: `top+=${customScrollPinWrapperHeight * index}px top`,
          end: `+=${customScrollPinWrapperHeight}px`,
          scrub: true,
          invalidateOnRefresh: true
        }
      });
    });

    // Clip-path SAMO za prve 2
    [0, 1].forEach(index => {
      if (!images[index]) return;
      const image = images[index];

      gsap.to(image, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        scrollTrigger: {
          id: `${uniqueId}-image-${index}`,
          trigger: customScrollPinWrapper,
          start: `top+=${customScrollPinWrapperHeight * index}px top`,
          end: `+=${customScrollPinWrapperHeight}px`,
          scrub: true,
          invalidateOnRefresh: true
        }
      });
    });

    // Treća slika uvijek vidljiva
    if (images[2]) {
      gsap.set(images[2], { 
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
      });
    }
  });
}

// Main JS entry point
import '../styles/main.scss';

// Bootstrap JS (bundle uključuje Popper)
import * as bootstrap from 'bootstrap';

import './back-to-top';
import './swiper';
import './nav-active';
import { initGsapPinSection } from './gsap-pin-section';
import './additional';

// Custom JS
document.addEventListener('DOMContentLoaded', () => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarToggleText = document.querySelector('.navbar-toggle-text');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const body = document.body;

    if (navbarToggler && navbarCollapse && navbarToggleText) {
        // Tekst "Close" kada se otvori
        navbarCollapse.addEventListener('show.bs.collapse', () => {
            body.classList.add('navbar-open');
            navbarToggleText.textContent = 'Close';
        });

        // Tekst "Menu" kada se zatvori
        navbarCollapse.addEventListener('hide.bs.collapse', () => {
            body.classList.remove('navbar-open');
            navbarToggleText.textContent = 'Menu';
        });

        // Zatvori na klik nav linka
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            });
        });

        // Zatvori na klik CTA buttona
        const ctaButtons = document.querySelectorAll('.navbar-cta .btn');
        ctaButtons.forEach(button => {
            button.addEventListener('click', () => {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            });
        });
    }

    
    const pinSection = document.querySelector('.custom-scroll-pin-wrapper');
    if (pinSection) {
        initGsapPinSection(document);
    }
});


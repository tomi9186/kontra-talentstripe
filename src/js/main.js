// Main JS entry point
import '../styles/main.scss';

// Bootstrap JS (bundle uključuje Popper)
import 'bootstrap/dist/js/bootstrap.bundle';
import './swiper'

// Custom JS
document.addEventListener('DOMContentLoaded', () => {

  // Navbar hamburger menu custom tekst
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarToggleText = document.querySelector('.navbar-toggle-text');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const body = document.body;

  if (navbarToggler && navbarCollapse) {
    // Promeni tekst na "Close" kada je navigacija otvorena
    navbarCollapse.addEventListener('show.bs.collapse', () => {
      body.classList.add('navbar-open');
      if (navbarToggleText) {
        navbarToggleText.textContent = 'Close';
      }
    });

    // Promeni tekst na "Menu" kada je navigacija zatvorena
    navbarCollapse.addEventListener('hide.bs.collapse', () => {
      body.classList.remove('navbar-open');
      if (navbarToggleText) {
        navbarToggleText.textContent = 'Menu';
      }
    });

    // Zatvori navigaciju nakon klika na nav link
    const navLinks = navbarCollapse.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const bsCollapse = new (window.bootstrap.Collapse)(navbarCollapse, {
          toggle: false
        });
        bsCollapse.hide();
      });
    });

    // Zatvori navigaciju nakon klika na CTA dugme u mobilnoj verziji
    const ctaButtons = navbarCollapse.querySelectorAll('.navbar-cta-mobile .btn');
    ctaButtons.forEach(button => {
      button.addEventListener('click', () => {
        const bsCollapse = new (window.bootstrap.Collapse)(navbarCollapse, {
          toggle: false
        });
        bsCollapse.hide();
      });
    });
  }
});

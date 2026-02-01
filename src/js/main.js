// Main JS entry point
import '../styles/main.scss';

// Bootstrap JS (bundle uključuje Popper)
import 'bootstrap/dist/js/bootstrap.bundle';
import './swiper'

// Custom JS
document.addEventListener('DOMContentLoaded', () => {

  // Navbar hamburger menu custom tekst
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const body = document.body;

  if (navbarToggler && navbarCollapse) {
    // Dodaj klasu kada je navigacija otvorena (sprječava scrollanje)
    navbarCollapse.addEventListener('show.bs.collapse', () => {
      body.classList.add('navbar-open');
    });

    navbarCollapse.addEventListener('hide.bs.collapse', () => {
      body.classList.remove('navbar-open');
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
  }
});

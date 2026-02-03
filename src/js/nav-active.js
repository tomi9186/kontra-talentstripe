// Navbar active na scroll - ISPRAVNO
document.addEventListener('DOMContentLoaded', function() {
  const navItems = document.querySelectorAll('.nav-item'); // <li> elementi
  const sections = document.querySelectorAll('section[id]');
  
  function updateActiveNav() {
    let current = '';
    const scrollY = window.scrollY + 150; // Veći offset za bolju detekciju
    
    // Pronađi trenutnu sekciju
    sections.forEach(section => {
      if (scrollY >= (section.offsetTop - 100)) {
        current = section.getAttribute('id');
      }
    });
    
    // Update <li> elemenata
    navItems.forEach(item => {
      const link = item.querySelector('.nav-link');
      item.classList.remove('active'); // Ukloni sa <li>
      
      if (link && link.getAttribute('href') === `#${current}`) {
        item.classList.add('active'); // Dodaj na <li>
      }
    });
  }
  
  // Throttle scroll event
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(updateActiveNav);
      ticking = true;
      setTimeout(() => ticking = false, 50);
    }
  });
  
  updateActiveNav(); // Initial call
});

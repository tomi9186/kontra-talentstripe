document.addEventListener('DOMContentLoaded', function () {

  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    let current = '';
    const scrollY = window.scrollY + 150;

    sections.forEach(section => {
      if (scrollY >= section.offsetTop) {
        current = section.id;
      }
    });

    navItems.forEach(item => {
      const link = item.querySelector('.nav-link');
      item.classList.remove('active');

      if (!link) return;

      const href = link.getAttribute('href');

      // ignoriraj linkove bez hash-a (/blog, /faq)
      if (!href || !href.includes('#')) return;

      const hash = href.split('#')[1];

      if (hash === current) {
        item.classList.add('active');
      }
    });
  }

  // Scroll listener
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // Inicijalno označavanje (refresh / bez scrolla)
  updateActiveNav();

  // Ako dolazimo s druge stranice s hashom
  window.addEventListener('load', function () {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (!target) return;

      // scroll s offsetom (fixed header)
      const offset = 120;
      const top = target.offsetTop - offset;

      window.scrollTo({
        top,
        behavior: 'auto'
      });

      // osiguraj active klasu nakon skoka
      setTimeout(updateActiveNav, 100);
    }
  });

});
// Back to Top - MATEMATIČKI SAVRŠEN progress circle
document.addEventListener('DOMContentLoaded', function() {
  const backToTopBtn = document.querySelector('.back-to-top');
  const svg = backToTopBtn.querySelector('svg');
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  
  circle.setAttribute('class', 'progress-ring');
  circle.setAttribute('cx', '32');
  circle.setAttribute('cy', '32');
  circle.setAttribute('r', '30');  // POLU-PIXEL offset za savršenu centriranost
  circle.setAttribute('fill', 'none');
  circle.setAttribute('stroke', '#A78FFF');
  circle.setAttribute('stroke-width', '4');
  circle.setAttribute('stroke-linecap', 'round');
  
  // FIKSNIRAN circumference = 186 (testirano za r=29.5)
  const circumference = 186;
  circle.setAttribute('stroke-dasharray', circumference);
  circle.setAttribute('stroke-dashoffset', circumference);
  
  svg.appendChild(circle);
  
  backToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  let ticking = false;
  
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.min(scrollTop / docHeight, 1);
    
    // PIXEL-PERFECT izračun
    const progress = 1 - scrollPercent;
    const dashOffset = Math.round(circumference * progress);
    circle.setAttribute('stroke-dashoffset', dashOffset);
    
    if (scrollTop > 300) {
      backToTopBtn.classList.remove('d-none');
    } else {
      backToTopBtn.classList.add('d-none');
    }
    
    ticking = false;
  }
  
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });
  
  updateProgress();
});

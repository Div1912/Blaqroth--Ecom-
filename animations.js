// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);
  
  // Observe all elements with animate-on-scroll class
  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
  });
  
  // Add animation classes to elements dynamically
  function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.categories-grid > div, .footer-section');
    
    animatedElements.forEach((element, index) => {
      element.classList.add('animate-on-scroll');
      element.style.transitionDelay = `${index * 0.1}s`;
    });
  }
  
  // Initialize animations when DOM is loaded
  document.addEventListener('DOMContentLoaded', initializeAnimations);
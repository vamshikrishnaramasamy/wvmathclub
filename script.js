/* ============================================
   WOLVERINE MATH TOURNAMENT – DARK EDITION JS
   Scroll-based dot nav + reveal animations
   ============================================ */
(() => {
  'use strict';

  const sections  = document.querySelectorAll('.section');
  const dots      = document.querySelectorAll('.dot-nav .dot');
  const topBar    = document.getElementById('top-bar');
  const reveals   = document.querySelectorAll('[data-reveal]');

  // ---- Active section tracking via IntersectionObserver ----
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          dots.forEach(d => {
            d.classList.toggle('active', d.dataset.section === id);
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => sectionObserver.observe(s));

  // Dot click → smooth scroll
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(dot.dataset.section);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---- Reveal on scroll ----
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  reveals.forEach(el => revealObserver.observe(el));

  // ---- Top bar scroll effect ----
  if (topBar) {
    window.addEventListener('scroll', () => {
      topBar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  // ---- Smooth anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();

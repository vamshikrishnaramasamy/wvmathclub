/* ============================================
    WOLVERINE MATH TOURNAMENT – PREMIUM EDITION JS
    Tabs, Reveals, and Smooth Interactions
    ============================================ */
(() => {
  'use strict';

  // ---- Selectors ----
  const topBar = document.getElementById('top-bar');
  const reveals = document.querySelectorAll('[data-reveal]');
  
  // Tab Elements
  const tabBtns = document.querySelectorAll('.hub-tab-btn');
  const tabPanes = document.querySelectorAll('.hub-pane');

  // ---- Tab Logic ----
  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;
        
        // Update Buttons
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update Panes
        tabPanes.forEach(pane => {
          pane.classList.remove('active');
          if (pane.id === `pane-${targetTab}`) {
            pane.classList.add('active');
          }
        });
      });
    });
  }

  // ---- Reveal on Scroll ----
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // If it's a hub pane that was hidden, we might want to re-trigger? 
          // Usually one-time is fine.
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  reveals.forEach(el => revealObserver.observe(el));

  // ---- Navigation Effects ----
  // Top bar scroll state
  if (topBar) {
    window.addEventListener('scroll', () => {
      topBar.classList.toggle('scrolled', window.scrollY > 80);
    }, { passive: true });
  }

  // Smooth standard anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      
      // Special case: link to tab?
      // For now, standard scroll is fine.
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---- Mobile Optimization ----
  // Simple check for touch interaction delays
  if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
  }

})();

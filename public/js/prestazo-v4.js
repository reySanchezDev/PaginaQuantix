(() => {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const all = (selector, context = document) => Array.from(context.querySelectorAll(selector));

  // Animate only retained landing content; respect reduced-motion preferences.
  const reveal = all('.reveal');
  if (!reduce && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: .09, rootMargin: '0px 0px -24px 0px' });
    reveal.forEach(element => observer.observe(element));
  } else {
    reveal.forEach(element => element.classList.add('visible'));
  }

  // Hero conceptual: escena SVG/CSS continua en lugar de capturas.
  // No es un visor de imágenes ni presenta datos reales o simulados.

  // El botón de regreso acompaña la navegación, pero NO aparece durante
  // la primera sección (hero). Se activa al alcanzar el bloque de la demo.
  const backToTop = document.querySelector('[data-back-to-top]');
  const firstSection = document.querySelector('main > section.hero');
  if (backToTop && firstSection) {
    let updatePending = false;
    const updateBackToTop = () => {
      updatePending = false;
      const afterFirstSection = firstSection.getBoundingClientRect().bottom <= 0;
      backToTop.classList.toggle('is-visible', afterFirstSection);
      backToTop.setAttribute('aria-hidden', String(!afterFirstSection));
      backToTop.inert = !afterFirstSection;
      if (afterFirstSection) {
        backToTop.removeAttribute('tabindex');
      } else {
        backToTop.setAttribute('tabindex', '-1');
      }
    };
    const scheduleBackToTopUpdate = () => {
      if (updatePending) return;
      updatePending = true;
      requestAnimationFrame(updateBackToTop);
    };
    window.addEventListener('scroll', scheduleBackToTopUpdate, { passive:true });
    window.addEventListener('resize', scheduleBackToTopUpdate, { passive:true });
    window.addEventListener('pageshow', scheduleBackToTopUpdate);
    updateBackToTop();
  }

  // Analytics fires only when an independently consent-controlled dataLayer exists.
  all('[data-cta]').forEach(link => link.addEventListener('click', () => {
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: 'prestazo_playstore_click', position: link.dataset.cta });
    }
  }));
})();

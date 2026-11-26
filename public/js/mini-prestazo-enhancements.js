(() => {
  const startWhenVisible = (root) => {
    const play = root.querySelector('[data-mp-play]');
    if (!play) return;

    const start = () => {
      if (play.getAttribute('aria-pressed') !== 'true') play.click();
    };

    if (!('IntersectionObserver' in window)) {
      start();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        start();
      }
    }, { threshold: 0.2 });

    observer.observe(root.querySelector('.mp-stage') || root);
  };

  document.querySelectorAll('[data-miniprestazo]').forEach(startWhenVisible);
})();

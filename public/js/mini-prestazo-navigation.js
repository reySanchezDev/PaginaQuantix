(() => {
  for (const demo of document.querySelectorAll('[data-miniprestazo]')) {
    const screens = [...demo.querySelectorAll('[data-mp-screen]')];
    const title = demo.querySelector('[data-mp-app-title]');
    const navLabels = Object.fromEntries(
      [...demo.querySelectorAll('[data-mp-nav]')].map((button) => [button.dataset.mpNav, button.textContent.trim()]),
    );
    const showScreen = (name) => {
      const screen = screens.find((item) => item.dataset.mpScreen === name);
      if (!screen) return;
      screens.forEach((item) => { item.hidden = item !== screen; });
      demo.querySelectorAll('[data-mp-nav]').forEach((button) => {
        button.classList.toggle('is-active', button.dataset.mpNav === name);
        button.setAttribute('aria-current', button.dataset.mpNav === name ? 'page' : 'false');
      });
      if (title) title.textContent = navLabels[name] || title.textContent;
      demo.querySelector('[data-mp-scroll]')?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    demo.querySelectorAll('[data-mp-nav]').forEach((button) => {
      button.addEventListener('click', () => showScreen(button.dataset.mpNav));
    });

    demo.querySelectorAll('[data-mp-backup-action]').forEach((button) => {
      button.addEventListener('click', () => {
        const feedback = demo.querySelector('[data-mp-backup-feedback]');
        if (!feedback) return;
        feedback.textContent = button.dataset.mpBackupAction === 'restore'
          ? (demo.dataset.locale === 'en'
            ? 'The real app asks for confirmation before restoring a local backup and requires a restart.'
            : 'La app real pide confirmación antes de restaurar un respaldo local y requiere reiniciar.')
          : (demo.dataset.locale === 'en'
            ? 'Demo state: Prestazo would create a local SQLite backup and return its file information.'
            : 'Estado de demo: Prestazo crearía un respaldo SQLite local y devolvería la información del archivo.');
      });
    });

    const syncMode = () => demo.classList.toggle('mp-is-mobile', window.matchMedia('(max-width: 900px)').matches);
    syncMode();
    window.addEventListener('resize', syncMode, { passive: true });
    demo.querySelector('[data-mp-field]')?.dispatchEvent(new Event('input', { bubbles: true }));
    showScreen('dashboard');
  }
})();

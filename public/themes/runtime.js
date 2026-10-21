/* Tema automático sin redeploy, incluso si una pestaña permanece abierta. */
(function () {
  "use strict";
  const config = window.QuantixThemeCalendar;
  const scheduler = window.QuantixThemeScheduler;
  if (!config || !scheduler) return;
  function sync() {
    const current = scheduler.resolve(config, new Date());
    const theme = current ? current.id : config.defaultTheme;
    const icon = current && current.icon ? current.icon : config.defaultIcon;
    document.documentElement.setAttribute("data-seasonal-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", current?.themeColor || config.defaultThemeColor);
    if (document.readyState === "loading") return;
    for (const banner of document.querySelectorAll("[data-seasonal-banner]")) {
      banner.hidden = banner.getAttribute("data-seasonal-banner") !== theme;
    }
    const favicon = document.querySelector('link[rel="icon"][type="image/svg+xml"]');
    if (favicon && favicon.getAttribute("href") !== icon) favicon.setAttribute("href", icon);
    for (const mark of document.querySelectorAll(".brand__mark")) {
      if (mark.getAttribute("src") !== icon) mark.setAttribute("src", icon);
    }
  }
  sync(); // Aplicar atributo antes de que se pinte el contenido.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", sync, { once: true });
  }
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) sync();
  });
  window.addEventListener("pageshow", sync);
  window.setInterval(sync, 30000);
})();

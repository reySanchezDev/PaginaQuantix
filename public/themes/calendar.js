/* Configuración central de campañas. Las fechas se evalúan en Nicaragua. */
window.QuantixThemeCalendar = Object.freeze({
  timeZone: "America/Managua",
  defaultTheme: "default",
  defaultThemeColor: "#f6f4ee",
  defaultIcon: "/favicon.svg",
  campaigns: [
    {
      id: "octubre-rosa",
      enabled: true,
      start: "2026-10-01",
      end: "2026-10-31",
      recurrence: "once",
      priority: 100,
      themeColor: "#fff7fa",
      icon: "/themes/octubre-rosa/favicon.svg",
    },
    {
      id: "halloween-tech-noir",
      enabled: true,
      start: "2026-10-31",
      end: "2026-10-31",
      recurrence: "once",
      priority: 200,
      themeColor: "#090b12",
      icon: "/favicon.svg",
    },
  ],
});

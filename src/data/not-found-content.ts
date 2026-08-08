export const notFoundContent = {
  seo: {
    title: "Page not found",
    description: "The requested page could not be found.",
  },
  code: "404",
  title: "Page not found.",
  titleEs: "Página no encontrada.",
  message: "The address may be incorrect or the page may have moved.",
  messageEs: "La dirección puede ser incorrecta o la página pudo cambiar de ubicación.",
  actions: {
    en: { label: "Go to the English site", href: "/en/" },
    es: { label: "Ir al sitio en español", href: "/es/" },
  },
} as const;

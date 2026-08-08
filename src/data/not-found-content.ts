export const notFoundContent = {
  seo: {
    title: "Page not found",
    description: "The requested page could not be found.",
  },
  code: "404",
  eyebrow: "Página no encontrada",
  title: "That route does not exist",
  message: "The page may have moved. Choose a language to continue.",
  messageEs: "La página pudo cambiar de ubicación.",
  actions: {
    en: { label: "Continue in English", href: "/en/" },
    es: { label: "Continuar en español", href: "/es/" },
  },
} as const;

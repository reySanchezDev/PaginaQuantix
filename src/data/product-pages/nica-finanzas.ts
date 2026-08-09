import { getRoute } from "../../i18n/routes";
import type { Locale, ProductPageContent } from "../../types/site";
import { getProduct } from "../products";

export function getNicaFinanzasPage(locale: Locale): ProductPageContent {
  const product = getProduct("nica-finanzas", locale);
  const isEs = locale === "es";

  return {
    id: "nica-finanzas",
    seo: {
      title: isEs
        ? "Nica Finanzas | Calculadoras para Nicaragua"
        : "Nica Finanzas | Calculators for Nicaragua",
      description: product.description,
    },
    hero: {
      eyebrow: isEs ? "Herramientas financieras gratuitas" : "Free financial tools",
      title: isEs
        ? "Calculadoras financieras para Nicaragua."
        : "Financial calculators for Nicaragua.",
      lead: isEs
        ? "Estima salarios, cuotas de préstamo y liquidaciones laborales con parámetros locales."
        : "Estimate salaries, loan payments, and employment settlements using Nicaragua-specific parameters.",
      primary: product.external,
      secondary: {
        label: isEs ? "Ver productos" : "View products",
        href: getRoute("products", locale),
      },
    },
    overview: {
      eyebrow: isEs ? "Calculadoras" : "Calculators",
      title: isEs
        ? "Tres herramientas para cálculos frecuentes"
        : "Three tools for common financial calculations",
      lead: isEs
        ? "Cada calculadora pide solo los datos necesarios y presenta un resultado fácil de revisar."
        : "Each calculator asks only for the information it needs and returns a clear result.",
      metrics: [],
    },
    sections: [],
    cta: {
      eyebrow: "Nica Finanzas",
      title: isEs ? "Abre Nica Finanzas." : "Open Nica Finanzas.",
      text: isEs
        ? "Calcula salarios, préstamos o liquidaciones directamente en el sitio."
        : "Calculate salaries, loan payments, or employment settlements directly on the site.",
      primary: product.external!,
    },
  };
}

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
        ? "Calcula salario, cuotas de préstamo y liquidación laboral con parámetros locales."
        : "Estimate salaries, loan payments, and employment settlements using local inputs.",
      primary: product.external,
      secondary: {
        label: isEs ? "Ver productos" : "View products",
        href: getRoute("products", locale),
      },
    },
    overview: {
      eyebrow: isEs ? "Calculadoras" : "Calculators",
      title: isEs
        ? "Tres cálculos frecuentes en un solo sitio"
        : "Three common calculations in one place",
      lead: isEs
        ? "Cada herramienta solicita únicamente los datos necesarios y presenta un resultado fácil de revisar."
        : "Each tool asks for the required inputs and presents a result that is easy to review.",
      metrics: [],
    },
    sections: [],
    cta: {
      eyebrow: "Nica Finanzas",
      title: isEs ? "Utiliza las calculadoras gratuitas." : "Use the free calculators.",
      text: isEs
        ? "Abre Nica Finanzas para utilizar las calculadoras."
        : "Open Nica Finanzas to use the calculators.",
      primary: product.external!,
    },
  };
}

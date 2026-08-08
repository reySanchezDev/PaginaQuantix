import { getRoute } from "../i18n/routes";
import type { Locale } from "../types/site";
import { getProducts } from "./products";

const content = {
  es: {
    seo: {
      title: "Productos de software",
      description:
        "Productos de Quantix para gestión empresarial, restaurantes, finanzas y evidencia de pruebas.",
    },
    hero: {
      eyebrow: "Productos",
      title: "Software para necesidades concretas.",
      lead: "Consulta las funciones, disponibilidad y forma de acceso de cada producto.",
    },
    section: {
      id: "products-catalog",
      eyebrow: "Catálogo",
      title: "Productos de Quantix",
      lead: "Cada ficha detalla qué resuelve el producto y cómo acceder a él.",
      viewLabel: "Ver detalles",
    },
    cta: {
      eyebrow: "Desarrollo a medida",
      title: "¿Tu operación requiere otra solución?",
      text: "Podemos adaptar una plataforma existente o desarrollar una a medida.",
      primary: { label: "Hablar sobre una solución", href: getRoute("contact", "es") },
    },
  },
  en: {
    seo: {
      title: "Software products",
      description:
        "Quantix products for business management, restaurants, finance, and software-testing evidence.",
    },
    hero: {
      eyebrow: "Products",
      title: "Software for specific business needs.",
      lead: "Review each product’s capabilities, availability, and access options.",
    },
    section: {
      id: "products-catalog",
      eyebrow: "Catalog",
      title: "Quantix products",
      lead: "Each page explains what the product does and how to access it.",
      viewLabel: "View details",
    },
    cta: {
      eyebrow: "Custom development",
      title: "Need a different solution?",
      text: "We can adapt an existing platform or build a custom system.",
      primary: { label: "Discuss a solution", href: getRoute("contact", "en") },
    },
  },
} as const;

export function getProductsPageContent(locale: Locale) {
  return { ...content[locale], products: getProducts(locale) };
}

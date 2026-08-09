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
      title: "Productos para operaciones concretas.",
      lead: "Conoce qué resuelve cada producto, dónde está disponible y cómo acceder.",
    },
    section: {
      id: "products-catalog",
      eyebrow: "Catálogo",
      title: "Productos de Quantix",
      lead: "Cada ficha reúne las funciones principales, el estado actual y el acceso al producto.",
      viewLabel: "Ver detalles",
    },
    cta: {
      eyebrow: "Desarrollo a medida",
      title: "¿Necesitas una solución diferente?",
      text: "Podemos adaptar uno de nuestros productos o construir un sistema a medida.",
      primary: { label: "Hablemos de tu proyecto", href: getRoute("contact", "es") },
    },
  },
  en: {
    seo: {
      title: "Software products",
      description:
        "Quantix products for business management, restaurants, finance, and test evidence.",
    },
    hero: {
      eyebrow: "Products",
      title: "Products built for specific operations.",
      lead: "See what each product does, where it is available, and how to access it.",
    },
    section: {
      id: "products-catalog",
      eyebrow: "Catalog",
      title: "Quantix products",
      lead: "Each page covers the main features, current status, and product access.",
      viewLabel: "View details",
    },
    cta: {
      eyebrow: "Custom development",
      title: "Need something different?",
      text: "We can adapt one of our products or build a custom system.",
      primary: { label: "Discuss a solution", href: getRoute("contact", "en") },
    },
  },
} as const;

export function getProductsPageContent(locale: Locale) {
  return { ...content[locale], products: getProducts(locale) };
}

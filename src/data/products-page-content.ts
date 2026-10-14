import { getRoute } from "../i18n/routes";
import type { Locale } from "../types/site";
import { getProducts } from "./products";

const content = {
  es: {
    seo: {
      title: "Productos de software",
      description:
        "Productos de Quantix para gestión empresarial, restaurantes, operaciones, soporte, finanzas y herramientas para desarrolladores.",
    },
    hero: {
      eyebrow: "Productos",
      title: "Tecnología desarrollada para desafíos reales.",
      lead: "Explora nuestras plataformas empresariales y herramientas especializadas. Conoce sus capacidades, disponibilidad y opciones de acceso.",
    },
    section: {
      id: "products-catalog",
      eyebrow: "Catálogo",
      title: "Productos de Quantix",
      lead: "Elige un producto para ver sus funciones, disponibilidad y forma de acceso.",
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
        "Quantix products for business management, restaurants, operations, support, finance, and developer tools.",
    },
    hero: {
      eyebrow: "Products",
      title: "Technology built for real-world challenges.",
      lead: "Explore our business platforms and specialized tools, including their capabilities, availability, and access options.",
    },
    section: {
      id: "products-catalog",
      eyebrow: "Catalog",
      title: "Quantix products",
      lead: "Choose a product to see its features, availability, and access options.",
      viewLabel: "View details",
    },
    cta: {
      eyebrow: "Custom development",
      title: "Need something different?",
      text: "We can adapt one of our products or build a custom system.",
      primary: { label: "Let’s talk about your project", href: getRoute("contact", "en") },
    },
  },
} as const;

export function getProductsPageContent(locale: Locale) {
  return { ...content[locale], products: getProducts(locale) };
}

import { getRoute } from "../i18n/routes";
import type { Locale } from "../types/site";
import { getProducts } from "./products";

const localized = {
  es: {
    seo: {
      title: "Quantix Software | Productos y desarrollo de software",
      description:
        "Productos de software y desarrollo a medida para centralizar procesos, conectar datos y reducir trabajo manual.",
    },
    hero: {
      eyebrow: "Ingeniería de software",
      title: "Software que se ajusta a la forma en que opera tu empresa.",
      lead: "Desarrollamos productos y sistemas a medida para centralizar procesos, conectar datos y reducir trabajo manual.",
      primary: { label: "Hablar sobre un proyecto", href: getRoute("contact", "es") },
      secondary: { label: "Ver productos", href: getRoute("products", "es") },
    },
    model: {
      eyebrow: "Qué hacemos",
      title: "Tres formas de resolver una necesidad de software",
      lead: "La solución depende del proceso, los sistemas actuales y el nivel de personalización necesario.",
      items: [
        ["Producto existente", "Implementamos una solución de Quantix cuando ya cubre el proceso."],
        [
          "Adaptación e integración",
          "Ajustamos reglas y conectamos la solución con los sistemas actuales.",
        ],
        [
          "Desarrollo a medida",
          "Diseñamos una plataforma propia cuando una solución existente no encaja.",
        ],
      ],
    },
    productsSection: {
      eyebrow: "Productos",
      title: "Software disponible para operaciones específicas",
      lead: "Una selección de nuestros productos. Consulta el catálogo completo para conocer los demás.",
      viewLabel: "Ver detalles",
      allLabel: "Ver todos los productos",
      allHref: getRoute("products", "es"),
    },
    cta: {
      eyebrow: "Contacto",
      title: "Cuéntanos qué necesitas resolver.",
      text: "Revisamos el proceso actual y definimos un siguiente paso concreto.",
      primary: { label: "Hablar sobre un proyecto", href: getRoute("contact", "es") },
    },
  },
  en: {
    seo: {
      title: "Quantix Software | Products and custom software development",
      description:
        "Software products and custom development to centralize processes, connect data, and reduce manual work.",
    },
    hero: {
      eyebrow: "Software engineering",
      title: "Software built around the way your business operates.",
      lead: "We build software products and custom systems to centralize processes, connect data, and reduce manual work.",
      primary: { label: "Discuss a project", href: getRoute("contact", "en") },
      secondary: { label: "View products", href: getRoute("products", "en") },
    },
    model: {
      eyebrow: "What we do",
      title: "Three ways to address a software need",
      lead: "The right solution depends on the process, current systems, and the level of customization required.",
      items: [
        ["Existing product", "We implement a Quantix product when it already covers the process."],
        [
          "Adaptation and integration",
          "We adapt business rules and connect the solution to existing systems.",
        ],
        [
          "Custom development",
          "We build a dedicated platform when an existing solution does not fit.",
        ],
      ],
    },
    productsSection: {
      eyebrow: "Products",
      title: "Software available for specific operations",
      lead: "A selection of our products. View the full catalog to see the rest.",
      viewLabel: "View details",
      allLabel: "View all products",
      allHref: getRoute("products", "en"),
    },
    cta: {
      eyebrow: "Contact",
      title: "Tell us what needs to work better.",
      text: "We review the current process and define a practical next step.",
      primary: { label: "Discuss a project", href: getRoute("contact", "en") },
    },
  },
} as const;

export function getHomeContent(locale: Locale) {
  return { ...localized[locale], products: getProducts(locale) };
}

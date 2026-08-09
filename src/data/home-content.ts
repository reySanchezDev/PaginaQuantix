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
      title: "Software que se adapta a cómo trabaja tu empresa.",
      lead: "Creamos productos y sistemas a medida que conectan procesos, ordenan la información y reducen tareas manuales.",
      primary: { label: "Hablemos de tu proyecto", href: getRoute("contact", "es") },
      secondary: { label: "Ver productos", href: getRoute("products", "es") },
    },
    model: {
      eyebrow: "Qué hacemos",
      title: "La mejor solución no siempre empieza desde cero",
      lead: "Podemos implementar un producto de Quantix, adaptarlo a tu operación o desarrollar un sistema a medida.",
      items: [
        [
          "Solución lista para implementar",
          "VIGGO, Takofy, Nica Finanzas y QAVision ya resuelven necesidades concretas. Configuramos el producto adecuado y acompañamos la puesta en marcha.",
        ],
        [
          "Solución adaptada a tu operación",
          "Partimos de un producto de Quantix y ajustamos flujos, reglas e integraciones para conectarlo con tus procesos actuales.",
        ],
        [
          "Software a medida",
          "Diseñamos y desarrollamos un sistema propio cuando la operación requiere algo específico.",
        ],
      ],
    },
    productsSection: {
      eyebrow: "Productos",
      title: "Software para operaciones concretas",
      lead: "Conoce dos de nuestros productos o consulta el catálogo completo.",
      viewLabel: "Ver detalles",
      allLabel: "Ver todos los productos",
      allHref: getRoute("products", "es"),
    },
    cta: {
      eyebrow: "Contacto",
      title: "¿Hay un proceso que está frenando a tu equipo?",
      text: "Cuéntanos cómo funciona hoy y te ayudaremos a decidir qué hacer después.",
      primary: { label: "Hablemos de tu proyecto", href: getRoute("contact", "es") },
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
      title: "Software designed around how your business works.",
      lead: "We build products and custom systems that connect processes, organize information, and reduce manual work.",
      primary: { label: "Let’s talk about your project", href: getRoute("contact", "en") },
      secondary: { label: "View products", href: getRoute("products", "en") },
    },
    model: {
      eyebrow: "What we do",
      title: "The right solution does not always start from scratch",
      lead: "We can implement a Quantix product, tailor it to your operation, or build a custom system.",
      items: [
        [
          "Ready-to-implement solution",
          "VIGGO, Takofy, Nica Finanzas, and QAVision already solve specific needs. We configure the right product and guide the rollout.",
        ],
        [
          "Tailored to your operation",
          "We start with a Quantix product, then tailor workflows, rules, and integrations to connect it with your current processes.",
        ],
        [
          "Custom software",
          "We design and build a dedicated system when the operation calls for something specific.",
        ],
      ],
    },
    productsSection: {
      eyebrow: "Products",
      title: "Software for specific operations",
      lead: "Explore two of our products or view the full catalog.",
      viewLabel: "View details",
      allLabel: "View all products",
      allHref: getRoute("products", "en"),
    },
    cta: {
      eyebrow: "Contact",
      title: "Is a process slowing your team down?",
      text: "Tell us how it works today, and we’ll help you decide what to do next.",
      primary: { label: "Let’s talk about your project", href: getRoute("contact", "en") },
    },
  },
} as const;

export function getHomeContent(locale: Locale) {
  return { ...localized[locale], products: getProducts(locale) };
}

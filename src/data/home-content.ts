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
      title: "Elegimos el enfoque que mejor encaja",
      lead: "Podemos implementar un producto, adaptarlo a tu operación o construir una solución nueva.",
      items: [
        [
          "Producto de Quantix",
          "Implementamos uno de nuestros productos cuando ya resuelve lo que necesitas.",
        ],
        [
          "Adaptación e integración",
          "Adaptamos reglas, flujos e integraciones para que funcione con tus sistemas actuales.",
        ],
        [
          "Desarrollo a medida",
          "Diseñamos y construimos una plataforma propia cuando el proceso requiere algo distinto.",
        ],
      ],
    },
    productsSection: {
      eyebrow: "Productos",
      title: "Dos productos para operaciones concretas",
      lead: "Aquí destacamos dos productos. Puedes ver los demás en el catálogo.",
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
      title: "We choose the approach that fits the job",
      lead: "That may mean deploying an existing product, adapting it, or building something new.",
      items: [
        ["Quantix product", "We deploy one of our products when it already solves the problem."],
        [
          "Adaptation and integration",
          "We tailor workflows and integrations so the solution works with your current systems.",
        ],
        [
          "Custom development",
          "We design and build a dedicated platform when the process calls for something different.",
        ],
      ],
    },
    productsSection: {
      eyebrow: "Products",
      title: "Two products for specific operations",
      lead: "Here are two of our products. You can find the rest in the catalog.",
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

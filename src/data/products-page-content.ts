import { getRoute } from "../i18n/routes";
import type { Locale } from "../types/site";
import { getProducts } from "./products";

const content = {
  es: {
    seo: {
      title: "Productos",
      description:
        "Productos y herramientas creadas por Quantix para operación empresarial, restaurantes, finanzas y evidencia QA.",
    },
    hero: {
      eyebrow: "Productos Quantix",
      title: "Soluciones digitales listas para necesidades concretas",
      lead: "Productos publicados, enfocados en flujos operativos reales y con una ruta clara para conocerlos o utilizarlos.",
      primary: { label: "Explorar productos", href: "#products-catalog" },
      secondary: { label: "Hablar con Quantix", href: getRoute("contact", "es") },
    },
    principles: [
      "Problemas concretos",
      "Información verificable",
      "Operación mantenible",
      "Evolución continua",
    ],
    section: {
      id: "products-catalog",
      eyebrow: "Catálogo",
      title: "Herramientas listas para operar",
      lead: "Cada producto responde a un contexto específico sin promesas genéricas ni funcionalidad inventada.",
      viewLabel: "Ver producto",
    },
    cta: {
      eyebrow: "¿Necesitas algo distinto?",
      title: "También adaptamos y construimos plataformas internas",
      text: "Podemos partir de una solución existente o definir un sistema nuevo alrededor de tu operación.",
      primary: { label: "Revisar mi caso", href: getRoute("contact", "es") },
      secondary: { label: "Ver soluciones", href: getRoute("solutions", "es") },
    },
  },
  en: {
    seo: {
      title: "Products",
      description:
        "Products and tools created by Quantix for business operations, restaurants, finance, and QA evidence.",
    },
    hero: {
      eyebrow: "Quantix products",
      title: "Digital solutions ready for concrete needs",
      lead: "Published products focused on real operational workflows, with a clear path to learn about or use each one.",
      primary: { label: "Explore products", href: "#products-catalog" },
      secondary: { label: "Talk to Quantix", href: getRoute("contact", "en") },
    },
    principles: [
      "Concrete problems",
      "Verifiable information",
      "Maintainable operations",
      "Continuous evolution",
    ],
    section: {
      id: "products-catalog",
      eyebrow: "Catalog",
      title: "Tools ready to operate",
      lead: "Each product responds to a specific context without generic promises or invented functionality.",
      viewLabel: "View product",
    },
    cta: {
      eyebrow: "Need something different?",
      title: "We also adapt and build internal platforms",
      text: "We can start from an existing solution or define a new system around your operation.",
      primary: { label: "Review my case", href: getRoute("contact", "en") },
      secondary: { label: "View solutions", href: getRoute("solutions", "en") },
    },
  },
} as const;

export function getProductsPageContent(locale: Locale) {
  return { ...content[locale], products: getProducts(locale) };
}

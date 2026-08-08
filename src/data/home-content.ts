import { getRoute } from "../i18n/routes";
import type { Locale } from "../types/site";
import { getProducts } from "./products";

const localized = {
  es: {
    seo: {
      title: "Software empresarial listo, adaptable y a medida",
      description:
        "Quantix crea productos de software, adapta soluciones existentes y desarrolla sistemas empresariales a medida.",
    },
    hero: {
      eyebrow: "Software para operar mejor",
      title: "Tecnología que convierte operaciones complejas en sistemas claros",
      lead: "Adopta productos listos, adapta una solución a tu negocio o construye una plataforma a medida con un equipo que entiende operación, datos e integración.",
      primary: { label: "Evaluar mi necesidad", href: getRoute("contact", "es") },
      secondary: { label: "Ver productos", href: getRoute("products", "es") },
    },
    proof: [
      "Productos publicados",
      "Soluciones adaptables",
      "Sistemas a medida",
      "Acompañamiento técnico",
    ],
    proofLabel: "Enfoque de Quantix",
    productsSection: {
      eyebrow: "Productos",
      title: "Productos creados por Quantix",
      lead: "Software disponible hoy para necesidades operativas específicas.",
      viewLabel: "Ver producto",
    },
    solutions: {
      eyebrow: "Capacidad operativa",
      title: "Software para las áreas que sostienen el negocio",
      lead: "Diseñamos y conectamos flujos reales: desde ventas e inventario hasta automatización, analítica y plataformas internas.",
      items: [
        [
          "Operaciones e inventario",
          "Movimientos, existencias, trazabilidad y tareas repetibles bajo un mismo control.",
        ],
        [
          "Restaurantes y punto de venta",
          "Comandas, mesas, pagos, cocina, reportes e inventario para el servicio diario.",
        ],
        [
          "Datos, automatización e integraciones",
          "Tableros, APIs, alertas y flujos que conectan sistemas y eliminan pasos manuales.",
        ],
      ],
    },
    model: {
      eyebrow: "Modelo de trabajo",
      title: "La inversión correcta para cada etapa",
      lead: "No todo necesita empezar desde cero. Elegimos el camino con mejor retorno para el contexto, el alcance y el riesgo.",
      items: [
        ["Usar", "Adopta un producto Quantix listo para resolver una necesidad concreta."],
        ["Adaptar", "Ajusta módulos, reglas e integraciones de una solución existente."],
        ["Definir", "Convierte una necesidad temprana en alcance, prioridades y ruta técnica."],
        ["Construir", "Desarrolla una plataforma nueva cuando ninguna opción existente encaja."],
      ],
    },
    cta: {
      eyebrow: "Hablemos",
      title: "Trae el reto operativo. Nosotros ayudamos a ordenar el camino.",
      text: "Cuéntanos qué necesitas controlar, integrar, automatizar o construir.",
      primary: { label: "Contactar a Quantix", href: getRoute("contact", "es") },
      secondary: { label: "Explorar soluciones", href: getRoute("solutions", "es") },
    },
  },
  en: {
    seo: {
      title: "Ready-made, adaptable and custom business software",
      description:
        "Quantix creates software products, adapts existing solutions, and builds custom business systems.",
    },
    hero: {
      eyebrow: "Software for better operations",
      title: "Technology that turns complex operations into clear systems",
      lead: "Adopt a ready product, adapt a solution to your business, or build a custom platform with a team that understands operations, data, and integration.",
      primary: { label: "Evaluate my need", href: getRoute("contact", "en") },
      secondary: { label: "View products", href: getRoute("products", "en") },
    },
    proof: ["Published products", "Adaptable solutions", "Custom systems", "Technical guidance"],
    proofLabel: "Quantix focus",
    productsSection: {
      eyebrow: "Products",
      title: "Products created by Quantix",
      lead: "Software available today for specific operational needs.",
      viewLabel: "View product",
    },
    solutions: {
      eyebrow: "Operational capability",
      title: "Software for the areas that keep a business running",
      lead: "We design and connect real workflows, from sales and inventory to automation, analytics, and internal platforms.",
      items: [
        [
          "Operations and inventory",
          "Movements, stock, traceability, and repeatable tasks under one operating control.",
        ],
        [
          "Restaurants and point of sale",
          "Orders, tables, payments, kitchen, reporting, and inventory for daily service.",
        ],
        [
          "Data, automation, and integrations",
          "Dashboards, APIs, alerts, and workflows that connect systems and remove manual steps.",
        ],
      ],
    },
    model: {
      eyebrow: "Delivery model",
      title: "The right investment for each stage",
      lead: "Not everything needs to start from zero. We choose the path with the best return for the context, scope, and risk.",
      items: [
        ["Use", "Adopt a Quantix product that is ready to solve a concrete need."],
        ["Adapt", "Adjust modules, rules, and integrations in an existing solution."],
        ["Define", "Turn an early need into scope, priorities, and a technical path."],
        ["Build", "Develop a new platform when no existing option fits the operation."],
      ],
    },
    cta: {
      eyebrow: "Let’s talk",
      title: "Bring the operational challenge. We will help organize the path.",
      text: "Tell us what you need to control, integrate, automate, or build.",
      primary: { label: "Contact Quantix", href: getRoute("contact", "en") },
      secondary: { label: "Explore solutions", href: getRoute("solutions", "en") },
    },
  },
} as const;

export function getHomeContent(locale: Locale) {
  return { ...localized[locale], products: getProducts(locale) };
}

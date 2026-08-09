import { getRoute } from "../i18n/routes";
import type { Locale, StandardPageContent } from "../types/site";

const content: Record<Locale, StandardPageContent> = {
  es: {
    seo: {
      title: "Soluciones de software para empresas",
      description:
        "Diseño, integración y desarrollo de sistemas internos, automatización y plataformas empresariales.",
    },
    hero: {
      eyebrow: "Soluciones",
      title: "Hacemos que tus sistemas y datos trabajen juntos.",
      lead: "Antes de proponer tecnología, revisamos cómo trabaja tu equipo, qué herramientas usa y dónde se pierde tiempo o información.",
      primary: { label: "Hablemos de tu proyecto", href: getRoute("contact", "es") },
      secondary: { label: "Ver productos", href: getRoute("products", "es") },
    },
    sections: [
      {
        eyebrow: "Qué resolvemos",
        title: "Sistemas que trabajan juntos, no por separado",
        items: [
          {
            title: "Sistemas internos",
            text: "Reunimos la gestión de clientes, ventas, inventario, pagos, usuarios y permisos en una plataforma común.",
          },
          {
            title: "Integraciones",
            text: "Conectamos ERP, POS, pagos, identidad, mensajería y otros sistemas existentes.",
          },
          {
            title: "Datos y reportes",
            text: "Convertimos los datos diarios en reportes y tableros para entender qué ocurre en el negocio.",
          },
          {
            title: "Automatización",
            text: "Automatizamos alertas, aprobaciones y tareas que hoy requieren pasos repetitivos.",
          },
          {
            title: "Modernización",
            text: "Actualizamos sistemas críticos por etapas para reducir las interrupciones.",
          },
        ],
      },
    ],
    cta: {
      eyebrow: "Siguiente paso",
      title: "Hablemos del proceso que quieres mejorar.",
      text: "Después te diremos si conviene usar un producto, adaptarlo o construir algo nuevo.",
      primary: { label: "Hablemos de tu proyecto", href: getRoute("contact", "es") },
    },
  },
  en: {
    seo: {
      title: "Business software solutions",
      description:
        "Design, integration, and development of internal systems, automation, and business platforms.",
    },
    hero: {
      eyebrow: "Solutions",
      title: "We make your systems and data work together.",
      lead: "Before proposing technology, we look at how your team works, what tools it uses, and where time or information gets lost.",
      primary: { label: "Let’s talk about your project", href: getRoute("contact", "en") },
      secondary: { label: "View products", href: getRoute("products", "en") },
    },
    sections: [
      {
        eyebrow: "What we solve",
        title: "Systems that work together, not in isolation",
        items: [
          {
            title: "Internal systems",
            text: "We bring customer management, sales, inventory, payments, users, and permissions into one platform.",
          },
          {
            title: "Integrations",
            text: "We connect ERP, POS, payments, identity, messaging, and other existing systems.",
          },
          {
            title: "Data and reporting",
            text: "We turn day-to-day data into reports and dashboards that show what is happening across the business.",
          },
          {
            title: "Automation",
            text: "We automate alerts, approvals, and tasks that currently involve repetitive steps.",
          },
          {
            title: "Modernization",
            text: "We update critical systems in stages to reduce disruption.",
          },
        ],
      },
    ],
    cta: {
      eyebrow: "Next step",
      title: "Let’s talk about the process you want to improve.",
      text: "Then we can tell you whether an existing product, a tailored version, or a custom build makes the most sense.",
      primary: { label: "Let’s talk about your project", href: getRoute("contact", "en") },
    },
  },
};

export const getSolutionsContent = (locale: Locale) => content[locale];

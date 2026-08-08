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
      title: "Diseño, integración y desarrollo de software empresarial.",
      lead: "Partimos del proceso actual, los sistemas existentes y los datos que deben conectarse. Después definimos alcance y entrega.",
      primary: { label: "Hablar sobre un proyecto", href: getRoute("contact", "es") },
      secondary: { label: "Ver productos", href: getRoute("products", "es") },
    },
    sections: [
      {
        eyebrow: "Capacidades",
        title: "Software para procesos que no pueden quedar aislados",
        items: [
          {
            title: "Sistemas internos",
            text: "Clientes, ventas, inventario, pagos, usuarios y permisos en una plataforma común.",
          },
          {
            title: "Integraciones",
            text: "Conexiones entre ERP, POS, pagos, identidad, mensajería y sistemas existentes.",
          },
          {
            title: "Datos y reportes",
            text: "Modelos y tableros construidos sobre la actividad diaria del negocio.",
          },
          {
            title: "Automatización",
            text: "Alertas, aprobaciones y tareas que eliminan pasos repetitivos.",
          },
          {
            title: "Modernización",
            text: "Evolución gradual de sistemas que no pueden detenerse.",
          },
        ],
      },
    ],
    cta: {
      eyebrow: "Siguiente paso",
      title: "Revisemos el proceso que necesitas mejorar.",
      text: "En una primera conversación revisamos el alcance inicial y las principales dependencias.",
      primary: { label: "Hablar sobre un proyecto", href: getRoute("contact", "es") },
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
      title: "Business software design, integration, and development.",
      lead: "We start with the current process, existing systems, and the data that needs to connect. Then we define scope and delivery.",
      primary: { label: "Discuss a project", href: getRoute("contact", "en") },
      secondary: { label: "View products", href: getRoute("products", "en") },
    },
    sections: [
      {
        eyebrow: "Capabilities",
        title: "Software for processes that cannot remain isolated",
        items: [
          {
            title: "Internal systems",
            text: "Customers, sales, inventory, payments, users, and permissions in one platform.",
          },
          {
            title: "Integrations",
            text: "Connections across ERP, POS, payments, identity, messaging, and existing systems.",
          },
          {
            title: "Data and reporting",
            text: "Models and dashboards built on the company’s daily activity.",
          },
          {
            title: "Automation",
            text: "Alerts, approvals, and tasks that remove repetitive steps.",
          },
          {
            title: "Modernization",
            text: "Gradual improvement of systems that cannot stop operating.",
          },
        ],
      },
    ],
    cta: {
      eyebrow: "Next step",
      title: "Let’s review the process you need to improve.",
      text: "In an initial conversation, we review the initial scope and key dependencies.",
      primary: { label: "Discuss a project", href: getRoute("contact", "en") },
    },
  },
};

export const getSolutionsContent = (locale: Locale) => content[locale];

import { getRoute } from "../i18n/routes";
import type { Locale, StandardPageContent } from "../types/site";

const content: Record<Locale, StandardPageContent> = {
  es: {
    seo: {
      title: "Soluciones de software empresarial",
      description:
        "Productos listos, adaptación de plataformas, definición técnica y desarrollo de sistemas empresariales a medida.",
    },
    hero: {
      eyebrow: "Soluciones",
      title: "Encuentra, adapta, define o construye software operativo",
      lead: "Partimos del contexto real del negocio para elegir una solución existente, adaptarla o diseñar un sistema nuevo con alcance y riesgos claros.",
      primary: { label: "Revisar mi necesidad", href: getRoute("contact", "es") },
      secondary: { label: "Ver productos", href: getRoute("products", "es") },
    },
    sections: [
      {
        eyebrow: "Capacidades",
        title: "Construidas alrededor de operación, datos y ejecución",
        lead: "El valor no está en sumar pantallas, sino en conectar procesos con información confiable y responsabilidades claras.",
        items: [
          {
            title: "Plataformas operativas",
            text: "Clientes, servicios, ventas, pagos, inventario, usuarios y permisos en flujos coherentes.",
          },
          {
            title: "Integraciones y APIs",
            text: "Conexiones mantenibles entre ERP, POS, pagos, identidad, mensajería y sistemas legados.",
          },
          {
            title: "Datos y BI",
            text: "Pipelines, modelos y tableros para convertir actividad diaria en señales de decisión.",
          },
          {
            title: "Automatización",
            text: "Alertas, aprobaciones y tareas conectadas para reducir trabajo repetitivo y errores.",
          },
          {
            title: "Modernización",
            text: "Evolución gradual de sistemas críticos para reducir deuda sin perder continuidad operativa.",
          },
          {
            title: "Calidad y seguridad",
            text: "Arquitectura, pruebas, observabilidad y controles integrados desde la definición.",
          },
        ],
      },
      {
        eyebrow: "Definición",
        title: "Asesoría y requerimientos antes de construir",
        lead: "Cuando una idea todavía está abierta, ayudamos a convertirla en decisiones verificables antes de comprometer presupuesto y calendario.",
        variant: "soft",
        items: [
          {
            title: "Descubrimiento",
            text: "Usuarios, procesos, reglas, restricciones, datos e integraciones del contexto real.",
          },
          {
            title: "Alcance",
            text: "Módulos, prioridades, dependencias, entregables y criterios de aceptación claros.",
          },
          {
            title: "Ruta técnica",
            text: "Arquitectura, riesgos, fases y una estimación alineada con la complejidad.",
          },
        ],
      },
    ],
    cta: {
      eyebrow: "Siguiente paso",
      title: "La mejor solución empieza por entender bien el problema",
      text: "Comparte el flujo, las restricciones y el resultado que necesitas sostener.",
      primary: { label: "Agendar una conversación", href: getRoute("contact", "es") },
    },
  },
  en: {
    seo: {
      title: "Business software solutions",
      description:
        "Ready products, platform adaptation, technical definition, and custom business-system development.",
    },
    hero: {
      eyebrow: "Solutions",
      title: "Find, adapt, define, or build operational software",
      lead: "We start from the real business context to choose an existing solution, adapt it, or design a new system with clear scope and risks.",
      primary: { label: "Review my need", href: getRoute("contact", "en") },
      secondary: { label: "View products", href: getRoute("products", "en") },
    },
    sections: [
      {
        eyebrow: "Capabilities",
        title: "Built around operations, data, and execution",
        lead: "The value is not in adding screens. It is in connecting processes with reliable information and clear ownership.",
        items: [
          {
            title: "Operational platforms",
            text: "Customers, services, sales, payments, inventory, users, and permissions in coherent workflows.",
          },
          {
            title: "Integrations and APIs",
            text: "Maintainable connections across ERP, POS, payments, identity, messaging, and legacy systems.",
          },
          {
            title: "Data and BI",
            text: "Pipelines, models, and dashboards that turn daily activity into decision signals.",
          },
          {
            title: "Automation",
            text: "Alerts, approvals, and connected tasks that reduce repetitive work and errors.",
          },
          {
            title: "Modernization",
            text: "Gradual evolution of critical systems to reduce debt without losing operational continuity.",
          },
          {
            title: "Quality and security",
            text: "Architecture, testing, observability, and controls integrated from definition.",
          },
        ],
      },
      {
        eyebrow: "Definition",
        title: "Software advisory and requirements before building",
        lead: "When an idea is still open, we turn it into verifiable decisions before budget and schedule are committed.",
        variant: "soft",
        items: [
          {
            title: "Discovery",
            text: "Users, processes, rules, constraints, data, and integrations from the real context.",
          },
          {
            title: "Scope",
            text: "Modules, priorities, dependencies, deliverables, and clear acceptance criteria.",
          },
          {
            title: "Technical path",
            text: "Architecture, risks, phases, and an estimate aligned with complexity.",
          },
        ],
      },
    ],
    cta: {
      eyebrow: "Next step",
      title: "The best solution starts with a well-understood problem",
      text: "Share the workflow, constraints, and outcome you need to sustain.",
      primary: { label: "Book a conversation", href: getRoute("contact", "en") },
    },
  },
};

export const getSolutionsContent = (locale: Locale) => content[locale];

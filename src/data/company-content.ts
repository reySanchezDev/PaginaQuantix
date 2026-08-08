import { getRoute } from "../i18n/routes";
import type { Locale, StandardPageContent } from "../types/site";
import { contactLinks, siteConfig } from "./site-config";

const content: Record<"about" | "work" | "contact", Record<Locale, StandardPageContent>> = {
  about: {
    es: {
      seo: {
        title: "Empresa",
        description: "Quantix diseña productos de software y sistemas a medida para empresas.",
      },
      hero: {
        eyebrow: "Empresa",
        title: "Quantix diseña y construye software empresarial.",
        lead: "Creamos productos y sistemas a medida con atención al proceso, los datos, la seguridad y el mantenimiento.",
      },
      sections: [
        {
          eyebrow: "Principios",
          title: "Criterios que guían el trabajo",
          items: [
            {
              title: "Primero el proceso",
              text: "La tecnología se define después de entender usuarios, reglas y excepciones.",
            },
            {
              title: "Complejidad justificada",
              text: "Cada componente debe resolver una necesidad concreta y poder mantenerse.",
            },
            {
              title: "Preparado para operar",
              text: "Pruebas, despliegue, documentación y mantenimiento forman parte de la solución.",
            },
          ],
        },
      ],
      cta: {
        eyebrow: "Quantix",
        title: "Productos propios y desarrollo a medida.",
        text: "Conoce lo que ya hemos construido o conversa con el equipo sobre tu proyecto.",
        primary: { label: "Ver productos", href: getRoute("products", "es") },
        secondary: { label: "Hablar con el equipo", href: getRoute("contact", "es") },
      },
    },
    en: {
      seo: {
        title: "Company",
        description: "Quantix designs software products and custom systems for businesses.",
      },
      hero: {
        eyebrow: "Company",
        title: "Quantix designs and builds business software.",
        lead: "We create software products and custom systems with close attention to process, data, security, and maintenance.",
      },
      sections: [
        {
          eyebrow: "Principles",
          title: "How we make technical decisions",
          items: [
            {
              title: "Process first",
              text: "Technology choices follow an understanding of users, rules, and exceptions.",
            },
            {
              title: "Justified complexity",
              text: "Every component must solve a concrete need and remain maintainable.",
            },
            {
              title: "Ready to operate",
              text: "Testing, deployment, documentation, and maintenance are part of the solution.",
            },
          ],
        },
      ],
      cta: {
        eyebrow: "Quantix",
        title: "Software products and custom development.",
        text: "Review what we have built or discuss your project with the team.",
        primary: { label: "View products", href: getRoute("products", "en") },
        secondary: { label: "Talk to the team", href: getRoute("contact", "en") },
      },
    },
  },
  work: {
    es: {
      seo: {
        title: "Cómo trabajamos",
        description:
          "Un proceso de software definido desde el requerimiento hasta el despliegue y mantenimiento.",
      },
      hero: {
        eyebrow: "Cómo trabajamos",
        title: "Un proceso definido de principio a fin.",
        lead: "Acordamos el problema, el alcance y los criterios de aceptación antes de construir. Entregamos por etapas y documentamos las decisiones.",
        primary: { label: "Hablar sobre el proyecto", href: getRoute("contact", "es") },
      },
      sections: [
        {
          eyebrow: "Proceso",
          title: "Cuatro etapas con entregables concretos",
          items: [
            {
              title: "Entender",
              text: "Revisamos el proceso actual, los usuarios, las reglas, los datos y las excepciones.",
            },
            {
              title: "Definir",
              text: "Acordamos prioridades, alcance, dependencias y criterios de aceptación.",
            },
            {
              title: "Construir",
              text: "Entregamos por incrementos y validamos cada proceso antes de ampliarlo.",
            },
            {
              title: "Operar",
              text: "Preparamos despliegue, documentación, transferencia y mantenimiento.",
            },
          ],
        },
      ],
      cta: {
        eyebrow: "Proyecto",
        title: "Hablemos sobre el proyecto.",
        text: "Comparte el proceso, las herramientas actuales y el resultado que esperas obtener.",
        primary: { label: "Hablar sobre el proyecto", href: getRoute("contact", "es") },
      },
    },
    en: {
      seo: {
        title: "How we work",
        description:
          "A defined software process from requirements through deployment and maintenance.",
      },
      hero: {
        eyebrow: "How we work",
        title: "A defined process from start to finish.",
        lead: "We agree on the problem, scope, and acceptance criteria before development. We deliver in stages and document key decisions.",
        primary: { label: "Discuss your project", href: getRoute("contact", "en") },
      },
      sections: [
        {
          eyebrow: "Process",
          title: "Four stages with concrete deliverables",
          items: [
            {
              title: "Understand",
              text: "Review the current process, users, rules, data, and exceptions.",
            },
            {
              title: "Define",
              text: "Agree on priorities, scope, dependencies, and acceptance criteria.",
            },
            {
              title: "Build",
              text: "Deliver in increments and validate each process before expanding it.",
            },
            {
              title: "Operate",
              text: "Prepare deployment, documentation, handover, and maintenance.",
            },
          ],
        },
      ],
      cta: {
        eyebrow: "Project",
        title: "Let’s discuss your project.",
        text: "Share the process, current tools, and the outcome you expect.",
        primary: { label: "Discuss your project", href: getRoute("contact", "en") },
      },
    },
  },
  contact: {
    es: {
      seo: {
        title: "Contacto",
        description: "Contacta a Quantix para conversar sobre un producto o proyecto de software.",
      },
      hero: {
        eyebrow: "Contacto",
        title: "Hablemos de lo que necesitas resolver.",
        lead: "Cuéntanos cómo funciona hoy el proceso, qué herramientas utilizan y qué resultado necesitas. Puedes contactarnos por correo o WhatsApp.",
        primary: { label: siteConfig.email, href: contactLinks.email },
        secondary: {
          label: `WhatsApp · ${siteConfig.whatsappDisplay}`,
          href: contactLinks.whatsapp,
          target: "_blank",
        },
      },
      sections: [],
    },
    en: {
      seo: {
        title: "Contact",
        description: "Contact Quantix to discuss a software product or project.",
      },
      hero: {
        eyebrow: "Contact",
        title: "Tell us about the software problem you need to solve.",
        lead: "Tell us how the process works today, which tools you use, and what outcome you need. Contact us by email or WhatsApp.",
        primary: { label: siteConfig.email, href: contactLinks.email },
        secondary: {
          label: `WhatsApp · ${siteConfig.whatsappDisplay}`,
          href: contactLinks.whatsapp,
          target: "_blank",
        },
      },
      sections: [],
    },
  },
};

export const getCompanyPage = (page: keyof typeof content, locale: Locale) => content[page][locale];

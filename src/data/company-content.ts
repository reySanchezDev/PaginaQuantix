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
        title: "Diseñamos software para operaciones reales.",
        lead: "Construimos productos y sistemas a medida que los equipos pueden usar, mantener y mejorar con el tiempo.",
      },
      sections: [
        {
          eyebrow: "Cómo decidimos",
          title: "Lo que guía nuestro trabajo",
          items: [
            {
              title: "Entender antes de construir",
              text: "Antes de elegir tecnología, entendemos a los usuarios, las reglas y las excepciones del proceso.",
            },
            {
              title: "Solo la complejidad necesaria",
              text: "Cada decisión técnica debe resolver una necesidad concreta y facilitar el mantenimiento.",
            },
            {
              title: "Listo para el día a día",
              text: "Las pruebas, el despliegue, la documentación y el mantenimiento forman parte del trabajo.",
            },
          ],
        },
      ],
      cta: {
        eyebrow: "Quantix",
        title: "Productos propios y desarrollo a medida.",
        text: "Mira lo que ya construimos o cuéntanos en qué estás trabajando.",
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
        title: "We design software for real business operations.",
        lead: "We build products and custom systems that teams can use, maintain, and improve over time.",
      },
      sections: [
        {
          eyebrow: "How we decide",
          title: "What guides our work",
          items: [
            {
              title: "Understand before building",
              text: "Before choosing technology, we learn how users, rules, and exceptions shape the process.",
            },
            {
              title: "Only the complexity the work requires",
              text: "Every technical decision must solve a concrete need and make the system easier to maintain.",
            },
            {
              title: "Ready for day-to-day use",
              text: "Testing, deployment, documentation, and maintenance are part of the work.",
            },
          ],
        },
      ],
      cta: {
        eyebrow: "Quantix",
        title: "Software products and custom development.",
        text: "See what we’ve built, or tell us what you’re working on.",
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
          "Así llevamos un proyecto de software desde la definición del problema hasta el despliegue y el mantenimiento.",
      },
      hero: {
        eyebrow: "Cómo trabajamos",
        title: "De una necesidad concreta a software en producción.",
        lead: "Antes de escribir código, acordamos el problema, el alcance y cómo sabremos que la solución funciona. Después entregamos por etapas y documentamos las decisiones importantes.",
        primary: { label: "Hablar sobre tu proyecto", href: getRoute("contact", "es") },
      },
      sections: [
        {
          eyebrow: "Proceso",
          title: "Cuatro etapas, cada una con un resultado claro",
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
        title: "¿Tienes un proyecto en mente?",
        text: "Cuéntanos cómo funciona el proceso hoy, qué herramientas utiliza tu equipo y qué quieres conseguir.",
        primary: { label: "Hablar sobre tu proyecto", href: getRoute("contact", "es") },
      },
    },
    en: {
      seo: {
        title: "How we work",
        description:
          "How Quantix takes a software project from problem definition through deployment and maintenance.",
      },
      hero: {
        eyebrow: "How we work",
        title: "From a real business need to working software.",
        lead: "Before we write code, we agree on the problem, the scope, and how we will know the solution works. Then we deliver in stages and document the decisions that matter.",
        primary: { label: "Discuss your project", href: getRoute("contact", "en") },
      },
      sections: [
        {
          eyebrow: "Process",
          title: "Four stages, each with a clear outcome",
          items: [
            {
              title: "Understand",
              text: "We review the current process, its users, rules, data, and exceptions.",
            },
            {
              title: "Define",
              text: "We agree on priorities, scope, dependencies, and acceptance criteria.",
            },
            {
              title: "Build",
              text: "We deliver in increments and validate each process before expanding it.",
            },
            {
              title: "Operate",
              text: "We prepare the deployment, documentation, handover, and maintenance plan.",
            },
          ],
        },
      ],
      cta: {
        eyebrow: "Project",
        title: "Have a project in mind?",
        text: "Tell us how the process works today, which tools your team uses, and what you want to achieve.",
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
        title: "Conversemos sobre tu proyecto.",
        lead: "Cuéntanos qué quieres mejorar, cómo funciona hoy y qué resultado esperas. Respondemos por correo o WhatsApp.",
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
        title: "Let’s talk about your project.",
        lead: "Tell us what you want to improve, how it works today, and what outcome you need. Reach us by email or WhatsApp.",
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

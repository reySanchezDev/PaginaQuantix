import { getRoute } from "../i18n/routes";
import type { Locale, StandardPageContent } from "../types/site";
import { contactLinks, siteConfig } from "./site-config";

const content: Record<"work" | "contact", Record<Locale, StandardPageContent>> = {
  work: {
    es: {
      seo: {
        title: "Cómo trabajamos",
        description:
          "Así llevamos un proyecto de software desde la definición del problema hasta el despliegue y el mantenimiento.",
      },
      hero: {
        eyebrow: "Cómo trabajamos",
        title: "Del problema inicial al software en producción.",
        lead: "Antes de escribir código, acordamos el problema, el alcance y cómo sabremos que la solución funciona. Después entregamos por etapas y documentamos las decisiones importantes.",
        primary: { label: "Hablemos de tu proyecto", href: getRoute("contact", "es") },
      },
      sections: [],
      process: {
        eyebrow: "Proceso",
        title: "Qué recibirás en cada etapa",
        lead: "Sabes qué vamos a entregar y qué decisiones tomaremos contigo, desde la primera conversación hasta la puesta en marcha.",
        outcomeLabel: "Qué recibes",
        reviewLabel: "Contigo",
        stages: [
          {
            title: "Entender",
            text: "Conversamos con quienes usan el proceso y revisamos las herramientas, los datos y las excepciones.",
            outcome: "El problema y las prioridades, por escrito.",
            review: "Nos muestras cómo trabajan hoy y validamos qué necesita cambiar.",
          },
          {
            title: "Definir",
            text: "Delimitamos qué vamos a desarrollar, qué queda fuera y cómo se comprobará cada entrega.",
            outcome: "Un alcance acordado antes de desarrollar.",
            review:
              "Revisamos contigo las prioridades, las dependencias y los criterios de aceptación.",
          },
          {
            title: "Construir",
            text: "Desarrollamos y probamos el software en entregas que puedas revisar.",
            outcome: "Versiones funcionales para probar con tu equipo.",
            review: "Recogemos tus comentarios y acordamos los ajustes de la siguiente entrega.",
          },
          {
            title: "Operar",
            text: "Preparamos el despliegue, la documentación y la entrega al equipo.",
            outcome: "Software en producción y documentación para usarlo.",
            review:
              "Revisamos la puesta en marcha y definimos el mantenimiento que necesita tu proyecto.",
          },
        ],
      },
      cta: {
        eyebrow: "Proyecto",
        title: "¿Tienes un proyecto en mente?",
        text: "Cuéntanos cómo funciona el proceso hoy, qué herramientas utiliza tu equipo y qué quieres conseguir.",
        primary: { label: "Hablemos de tu proyecto", href: getRoute("contact", "es") },
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
        primary: { label: "Let’s talk about your project", href: getRoute("contact", "en") },
      },
      sections: [],
      process: {
        eyebrow: "Process",
        title: "What you get at each stage",
        lead: "You know what we will deliver and which decisions we will make together, from the first conversation to launch.",
        outcomeLabel: "What you get",
        reviewLabel: "With you",
        stages: [
          {
            title: "Understand",
            text: "We talk to the people using the process and review the tools, data, and exceptions.",
            outcome: "The problem and priorities, in writing.",
            review: "You show us how the team works today, and we agree on what needs to change.",
          },
          {
            title: "Define",
            text: "We specify what we will build, what is out of scope, and how each delivery will be evaluated.",
            outcome: "An agreed scope before development begins.",
            review: "We review priorities, dependencies, and acceptance criteria with you.",
          },
          {
            title: "Build",
            text: "We develop and test the software in increments you can review.",
            outcome: "Working versions for your team to try.",
            review: "We gather your feedback and agree on adjustments for the next delivery.",
          },
          {
            title: "Operate",
            text: "We prepare the deployment, documentation, and handover to your team.",
            outcome: "Software in production, with documentation to use it.",
            review: "We review the launch together and define the maintenance your project needs.",
          },
        ],
      },
      cta: {
        eyebrow: "Project",
        title: "Have a project in mind?",
        text: "Tell us how the process works today, which tools your team uses, and what you want to achieve.",
        primary: { label: "Let’s talk about your project", href: getRoute("contact", "en") },
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
        lead: "Cuéntanos qué quieres mejorar, cómo funciona el proceso hoy y qué resultado esperas. Respondemos por correo o WhatsApp.",
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
        lead: "Tell us what you want to improve, how the process works today, and what outcome you need. Reach us by email or WhatsApp.",
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

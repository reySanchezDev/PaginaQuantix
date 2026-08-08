import { getRoute } from "../i18n/routes";
import type { Locale, StandardPageContent } from "../types/site";
import { contactLinks } from "./site-config";

const content: Record<"about" | "work" | "contact", Record<Locale, StandardPageContent>> = {
  about: {
    es: {
      seo: {
        title: "Nosotros",
        description:
          "Quantix construye sistemas confiables para empresas que necesitan control operativo, claridad de datos y procesos escalables.",
      },
      hero: {
        eyebrow: "Nosotros",
        title: "Sistemas confiables para empresas que operan en el mundo real",
        lead: "Construimos software con una mirada completa: interfaz, datos, integraciones, permisos, despliegue y evolución.",
        primary: { label: "Explorar soluciones", href: getRoute("solutions", "es") },
        secondary: { label: "Hablar con Quantix", href: getRoute("contact", "es") },
      },
      sections: [
        {
          eyebrow: "Principios",
          title: "Construimos sistemas, no solo pantallas",
          lead: "Cada decisión técnica debe ayudar a operar con menos fricción, más claridad y una base que pueda evolucionar.",
          items: [
            {
              title: "Ingeniería para producción",
              text: "Software mantenible, observable y suficientemente claro para seguir funcionando después del lanzamiento.",
            },
            {
              title: "Comprensión operativa",
              text: "Inventario, facturación, reportes, herramientas internas e integraciones entendidas como flujos de negocio.",
            },
            {
              title: "Estrategia práctica",
              text: "Decisiones que reducen riesgo, aclaran alcance y evitan complejidad sin retorno.",
            },
          ],
        },
      ],
      cta: {
        eyebrow: "Enfoque",
        title: "Software para empresas que necesitan control y claridad",
        text: "Nos interesan los sistemas que se vuelven parte confiable de la operación.",
        primary: { label: "Ver experiencia", href: getRoute("work", "es") },
        secondary: { label: "Iniciar conversación", href: getRoute("contact", "es") },
      },
    },
    en: {
      seo: {
        title: "About",
        description:
          "Quantix builds reliable systems for companies that need operational control, data clarity, and scalable processes.",
      },
      hero: {
        eyebrow: "About",
        title: "Reliable systems for companies that operate in the real world",
        lead: "We build software with a complete view: interface, data, integrations, permissions, deployment, and evolution.",
        primary: { label: "Explore solutions", href: getRoute("solutions", "en") },
        secondary: { label: "Talk to Quantix", href: getRoute("contact", "en") },
      },
      sections: [
        {
          eyebrow: "Principles",
          title: "Built around systems, not just screens",
          lead: "Every technical decision should help the business operate with less friction, more clarity, and a foundation that can evolve.",
          items: [
            {
              title: "Production-minded engineering",
              text: "Maintainable, observable software that remains clear enough to operate after launch.",
            },
            {
              title: "Operational understanding",
              text: "Inventory, billing, reporting, internal tools, and integrations understood as business workflows.",
            },
            {
              title: "Practical strategy",
              text: "Decisions that reduce risk, clarify scope, and avoid complexity without return.",
            },
          ],
        },
      ],
      cta: {
        eyebrow: "Focus",
        title: "Software for businesses that need control and clarity",
        text: "We care about systems that become a dependable part of the operation.",
        primary: { label: "View experience", href: getRoute("work", "en") },
        secondary: { label: "Start a conversation", href: getRoute("contact", "en") },
      },
    },
  },
  work: {
    es: {
      seo: {
        title: "Trabajo",
        description:
          "Experiencia en software operativo para retail, restaurantes, finanzas, inventario, facturación, reportes y automatización.",
      },
      hero: {
        eyebrow: "Trabajo",
        title: "Experiencia en software operativo",
        lead: "Trabajamos en áreas donde control, visibilidad, integración y confiabilidad importan todos los días.",
      },
      sections: [
        {
          eyebrow: "Áreas",
          title: "Problemas operativos concretos",
          items: [
            {
              title: "Plataformas operativas",
              text: "Usuarios, permisos, transacciones, inventario y reportes alrededor del trabajo diario.",
            },
            {
              title: "Productos publicados",
              text: "Experiencia creando y manteniendo productos como VIGGO, Takofy, Nica Finanzas y QAVision.",
            },
            {
              title: "Integración y datos",
              text: "Sistemas conectados, información estructurada y datos operativos más fáciles de utilizar.",
            },
          ],
        },
        {
          eyebrow: "Sectores y flujos",
          title: "Contextos en los que hemos trabajado",
          variant: "soft",
          items: [
            {
              title: "Comercio y restaurantes",
              text: "Punto de venta, comandas, mesas, cocina, cobros e inventario.",
            },
            {
              title: "Control empresarial",
              text: "Clientes, servicios, facturación, accesos, reportes y plataformas internas.",
            },
            {
              title: "Herramientas especializadas",
              text: "Cálculos financieros, evidencia QA, automatización e integración.",
            },
          ],
        },
      ],
      cta: {
        eyebrow: "Tu contexto",
        title: "¿Tienes un reto operativo real para revisar?",
        text: "Trae el flujo, las restricciones y los objetivos. Ayudamos a definir un camino práctico.",
        primary: { label: "Agendar una consulta", href: getRoute("contact", "es") },
      },
    },
    en: {
      seo: {
        title: "Work",
        description:
          "Operational software experience across retail, restaurants, finance, inventory, billing, reporting, and automation.",
      },
      hero: {
        eyebrow: "Work",
        title: "Operational software experience",
        lead: "We work in areas where control, visibility, integration, and reliability matter every day.",
      },
      sections: [
        {
          eyebrow: "Areas",
          title: "Concrete operational problems",
          items: [
            {
              title: "Operational platforms",
              text: "Users, permissions, transactions, inventory, and reporting around daily work.",
            },
            {
              title: "Published products",
              text: "Experience creating and maintaining products such as VIGGO, Takofy, Nica Finanzas, and QAVision.",
            },
            {
              title: "Integration and data",
              text: "Connected systems, structured information, and operational data that is easier to use.",
            },
          ],
        },
        {
          eyebrow: "Industries and flows",
          title: "Contexts where we have worked",
          variant: "soft",
          items: [
            {
              title: "Commerce and restaurants",
              text: "Point of sale, orders, tables, kitchen, payments, and inventory.",
            },
            {
              title: "Business control",
              text: "Customers, services, billing, access, reporting, and internal platforms.",
            },
            {
              title: "Specialized tools",
              text: "Financial calculations, QA evidence, automation, and integration.",
            },
          ],
        },
      ],
      cta: {
        eyebrow: "Your context",
        title: "Have a real operational challenge to discuss?",
        text: "Bring the workflow, constraints, and goals. We help define a practical path.",
        primary: { label: "Book a consultation", href: getRoute("contact", "en") },
      },
    },
  },
  contact: {
    es: {
      seo: {
        title: "Contacto",
        description:
          "Contacta a Quantix para conversar sobre productos, software a medida, integraciones, automatización y sistemas operativos.",
      },
      hero: {
        eyebrow: "Contacto",
        title: "Conversemos sobre tu proyecto de software",
        lead: "Cuéntanos qué estás construyendo, mejorando, integrando o tratando de automatizar. Te ayudaremos a aclarar el siguiente paso.",
        primary: {
          label: "Escribir por correo",
          href: contactLinks.email,
        },
        secondary: {
          label: "Conversar por WhatsApp",
          href: contactLinks.whatsapp,
          target: "_blank",
        },
      },
      sections: [
        {
          eyebrow: "Primera conversación",
          title: "Información que nos ayuda a orientarte",
          lead: "No necesitas un documento perfecto. Basta con contexto suficiente para entender el problema.",
          items: [
            { title: "Operación", text: "Qué proceso necesita más control, claridad o velocidad." },
            {
              title: "Situación actual",
              text: "Qué herramientas existen, dónde aparece la fricción y quiénes participan.",
            },
            {
              title: "Resultado",
              text: "Qué debe cambiar para que la inversión tenga valor para el negocio.",
            },
          ],
        },
      ],
    },
    en: {
      seo: {
        title: "Contact",
        description:
          "Contact Quantix to discuss products, custom software, integrations, automation, and operational systems.",
      },
      hero: {
        eyebrow: "Contact",
        title: "Let’s talk about your software project",
        lead: "Tell us what you are building, improving, integrating, or trying to automate. We will help clarify the next step.",
        primary: {
          label: "Send an email",
          href: contactLinks.email,
        },
        secondary: {
          label: "Talk on WhatsApp",
          href: contactLinks.whatsapp,
          target: "_blank",
        },
      },
      sections: [
        {
          eyebrow: "First conversation",
          title: "Information that helps us guide you",
          lead: "You do not need a perfect brief. We only need enough context to understand the problem.",
          items: [
            { title: "Operation", text: "Which process needs more control, clarity, or speed." },
            {
              title: "Current situation",
              text: "Which tools exist, where friction appears, and who is involved.",
            },
            {
              title: "Outcome",
              text: "What needs to change for the investment to create business value.",
            },
          ],
        },
      ],
    },
  },
};

export const getCompanyPage = (page: keyof typeof content, locale: Locale) => content[page][locale];

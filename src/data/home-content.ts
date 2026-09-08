import { getRoute } from "../i18n/routes";
import type { Locale } from "../types/site";

const localized = {
  es: {
    seo: {
      title: "Quantix Software | Desarrollo de software a medida",
      description:
        "Desarrollamos software a medida para conectar procesos, ventas e inventario. Conoce nuestro trabajo y productos usados por negocios de Nicaragua.",
    },
    hero: {
      eyebrow: "Diseño y desarrollo de software a medida",
      title: ["Tu operación,", "hecha software."],
      lead: "Diseñamos y desarrollamos sistemas para conectar ventas, inventario y el trabajo de tu equipo.",
      proof: "Usados en restaurantes y gimnasios de Nicaragua.",
      primary: { label: "Cuéntanos tu proyecto", href: getRoute("contact", "es") },
      secondary: { label: "Conoce nuestro trabajo", href: "#case-studies" },
    },
    model: {
      eyebrow: "Qué hacemos",
      title: "¿Qué necesita resolver tu equipo?",
      lead: "Partimos del trabajo diario: qué registran, qué consultan y dónde se pierde tiempo.",
      items: [
        [
          "Desarrollo a medida",
          "Un sistema para registrar ventas, consultar existencias o dar seguimiento a tus clientes, con las reglas y permisos que necesita tu empresa.",
        ],
        [
          "Integraciones y automatización",
          "Conectamos las herramientas que ya usas para que tu equipo deje de copiar los mismos datos de un sistema a otro.",
        ],
        [
          "Productos que podemos adaptar",
          "Cuando Takofy o VIGGO cubren lo que necesitas, evaluamos qué configurar, integrar o desarrollar sobre esa base.",
        ],
      ],
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
      title: "Quantix Software | Custom software development",
      description:
        "We build custom software to connect processes, sales and inventory. Explore our work and products used by businesses in Nicaragua.",
    },
    hero: {
      eyebrow: "Custom software design and development",
      title: ["Your business.", "Your software."],
      lead: "We design and build systems that connect sales, inventory and your team’s daily work.",
      proof: "Used by restaurants and gyms in Nicaragua.",
      primary: { label: "Tell us about your project", href: getRoute("contact", "en") },
      secondary: { label: "See our work", href: "#case-studies" },
    },
    model: {
      eyebrow: "What we do",
      title: "What does your team need to solve?",
      lead: "We start with the daily work: what you record, what you look up and where time gets lost.",
      items: [
        [
          "Custom development",
          "A system to record sales, check stock or follow up with customers, with the rules and permissions your business needs.",
        ],
        [
          "Integrations and automation",
          "We connect the tools you already use so your team can stop copying the same data from one system to another.",
        ],
        [
          "Products we can adapt",
          "When Takofy or VIGGO fits your needs, we assess what to configure, integrate or build on that foundation.",
        ],
      ],
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
  return localized[locale];
}

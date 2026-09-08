import { getRoute } from "../i18n/routes";
import { getContactHref } from "../lib/contact-context";
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
      title: "Menos pasos para hacer el trabajo de cada día.",
      lead: "Antes de proponer tecnología, revisamos cómo trabaja tu equipo, qué herramientas usa y dónde se pierde tiempo o información.",
      primary: {
        label: "Cuéntanos qué necesitas resolver",
        href: getContactHref("es", "proyecto"),
      },
      secondary: { label: "Ver productos", href: getRoute("products", "es") },
    },
    sections: [
      {
        eyebrow: "Qué resolvemos",
        title: "¿Dónde se complica el trabajo?",
        lead: "Partimos de una situación concreta para decidir qué construir, conectar o mejorar.",
        items: [
          {
            title: "Sistemas internos",
            summary: "Clientes, cobros e inventario en archivos separados.",
            text: "Reunimos esos datos en un sistema con los accesos y las reglas que necesita tu equipo. En VIGGO, por ejemplo, se pueden consultar los cobros y sus métodos de pago desde la caja, junto con la gestión del inventario.",
            link: { label: "Ver cómo lo resolvemos en VIGGO", href: getRoute("case-viggo", "es") },
          },
          {
            title: "Integraciones",
            summary: "El mismo dato se vuelve a escribir en varias herramientas.",
            text: "Revisamos qué información debe pasar de un sistema a otro, cuál conserva el dato original y qué ocurre si falla la conexión. Con esa base, conectamos las herramientas que ya utilizas.",
            link: {
              label: "Cuéntanos qué herramientas usas",
              href: getContactHref("es", "integraciones"),
            },
          },
          {
            title: "Datos y reportes",
            summary: "Para saber cómo va el negocio, primero hay que reunir los datos.",
            text: "Definimos qué necesitas consultar y de dónde sale cada dato. Creamos vistas para revisar ventas, cobros o inventario sin reconstruir el reporte cada vez.",
            link: { label: "Hablemos de tus reportes", href: getContactHref("es", "reportes") },
          },
          {
            title: "Automatización",
            summary: "Una tarea depende de avisar, copiar o recordar el siguiente paso.",
            text: "Conectamos los pasos del proceso, con reglas claras y revisión de las excepciones. En Takofy, el pedido que se toma en una mesa llega a cocina con los platos, las cantidades y las indicaciones para prepararlo.",
            link: {
              label: "Ver el recorrido de un pedido en Takofy",
              href: getRoute("case-takofy", "es"),
            },
          },
          {
            title: "Modernización",
            summary: "El sistema sigue en uso, pero cada cambio se vuelve difícil.",
            text: "Revisamos qué funciona, qué limita al equipo y qué depende de ese sistema. Proponemos mejoras por etapas, considerando los datos existentes y la continuidad de la operación.",
            link: {
              label: "Cuéntanos sobre tu sistema actual",
              href: getContactHref("es", "modernizacion"),
            },
          },
        ],
      },
    ],
    cta: {
      eyebrow: "Siguiente paso",
      title: "Hablemos del proceso que quieres mejorar.",
      text: "Después te diremos si conviene usar un producto, adaptarlo o construir algo nuevo.",
      primary: { label: "Hablemos de tu proyecto", href: getContactHref("es", "proyecto") },
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
      title: "Fewer steps to get the daily work done.",
      lead: "Before proposing technology, we look at how your team works, what tools it uses, and where time or information gets lost.",
      primary: {
        label: "Tell us what needs to work better",
        href: getContactHref("en", "proyecto"),
      },
      secondary: { label: "View products", href: getRoute("products", "en") },
    },
    sections: [
      {
        eyebrow: "What we solve",
        title: "Where does the work get complicated?",
        lead: "We start with a specific situation to decide what to build, connect, or improve.",
        items: [
          {
            title: "Internal systems",
            summary: "Customers, payments, and inventory live in separate files.",
            text: "We bring those records into a system with the access controls and rules your team needs. In VIGGO, for example, the team can review payments and payment methods at the register, alongside inventory management.",
            link: { label: "See how we handle it in VIGGO", href: getRoute("case-viggo", "en") },
          },
          {
            title: "Integrations",
            summary: "The same information is entered into several tools.",
            text: "We review which information needs to move between systems, which system owns the original record, and what happens if a connection fails. Then we connect the tools you already use.",
            link: {
              label: "Tell us which tools you use",
              href: getContactHref("en", "integraciones"),
            },
          },
          {
            title: "Data and reporting",
            summary: "Checking business performance starts with gathering scattered data.",
            text: "We define what you need to review and where each piece of information comes from. We build views for sales, payments, or inventory so you can check them without rebuilding the report each time.",
            link: { label: "Let’s discuss your reports", href: getContactHref("en", "reportes") },
          },
          {
            title: "Automation",
            summary: "A task depends on someone sending a reminder or copying a record.",
            text: "We connect the steps of a process, with clear rules and a way to review exceptions. In Takofy, an order taken at a table reaches the kitchen with its items, quantities, and preparation notes.",
            link: { label: "Follow an order through Takofy", href: getRoute("case-takofy", "en") },
          },
          {
            title: "Modernization",
            summary: "The system is still in use, but every change becomes difficult.",
            text: "We review what works, what holds the team back, and what depends on the system. We propose improvements in stages, considering existing data and the continuity of daily operations.",
            link: {
              label: "Tell us about your current system",
              href: getContactHref("en", "modernizacion"),
            },
          },
        ],
      },
    ],
    cta: {
      eyebrow: "Next step",
      title: "Let’s talk about the process you want to improve.",
      text: "Then we can tell you whether an existing product, a tailored version, or a custom build makes the most sense.",
      primary: { label: "Let’s talk about your project", href: getContactHref("en", "proyecto") },
    },
  },
};

export const getSolutionsContent = (locale: Locale) => content[locale];

import { getRoute } from "../i18n/routes";
import type { CtaContent, Locale } from "../types/site";

const founders: Array<{ name: string; linkedin?: string }> = [
  {
    name: "Reynaldo Sanchez",
    linkedin: "https://www.linkedin.com/in/reynaldo-s%C3%A1nchez-hern%C3%A1ndez/",
  },
  { name: "Hensell Espinoza", linkedin: "https://www.linkedin.com/in/henselldev/" },
];

const copy = {
  es: {
    seo: {
      title: "Empresa | Quiénes somos",
      description:
        "Conoce a Reynaldo Sanchez y Hensell Espinoza, cofundadores de Quantix. Desarrollo de software a medida y productos usados en negocios de Nicaragua.",
    },
    eyebrow: "Quantix Software",
    title: "Somos Quantix.",
    lead: "Creamos Quantix para hacer software sólido que las personas puedan entender y usar con autonomía.",
    origin:
      "Queremos que le resulte claro tanto a quien trabaja en el campo como a quien dirige una empresa. Diseñamos con la intención de que cada persona pueda hacer su trabajo y dependa lo menos posible del soporte.",
    teamLabel: "Fundadores",
    founderRole: "Cofundador · Desarrollador full stack",
    linkedinLabel: "Perfil de LinkedIn",
    contactLabel: "Hablemos de tu proyecto",
    workLabel: "Cómo trabajamos",
    proof: {
      eyebrow: "Productos propios",
      title: "Software que ya se usa.",
      lead: "Takofy y VIGGO nos enseñaron a escuchar y entender las necesidades de quienes usan el software. Así se refleja en dos tareas de su trabajo diario.",
      linkLabel: "Conocer el caso",
      takofy: {
        context: "Restaurantes en Nicaragua",
        text: "El equipo toma el pedido de una mesa, ajusta cantidades y añade indicaciones. La comanda llega a cocina con la información necesaria para prepararla.",
        alt: "Comanda de Takofy con mesa, platos, cantidades, notas y botón para enviar a cocina.",
        caption: "Comanda de una mesa. Datos de ejemplo.",
        href: getRoute("case-takofy", "es"),
      },
      viggo: {
        context: "Gimnasios en Nicaragua",
        text: "Desde la caja, el equipo consulta cada cobro y su método de pago. El inventario conserva las entradas, salidas y el saldo de cada producto.",
        alt: "Detalle de los cobros de VIGGO con sus importes y métodos de pago.",
        caption: "Detalle de caja: importes y métodos de pago.",
        href: getRoute("case-viggo", "es"),
      },
    },
    cta: {
      eyebrow: "Software a medida",
      title: "Hablemos de lo que necesitas construir.",
      text: "Cuéntanos cómo trabaja tu equipo, qué herramientas usa y qué quieres resolver. Ese es el punto de partida del proyecto.",
    },
  },
  en: {
    seo: {
      title: "Company | About us",
      description:
        "Meet Reynaldo Sanchez and Hensell Espinoza, cofounders of Quantix. Custom software development and products used by businesses in Nicaragua.",
    },
    eyebrow: "Quantix Software",
    title: "We are Quantix.",
    lead: "We started Quantix to build reliable software that people can understand and use independently.",
    origin:
      "We want it to feel clear to someone working in the field and to someone running a company. We design with the aim of helping each person do their work with as little reliance on support as possible.",
    teamLabel: "Founders",
    founderRole: "Cofounder · Full stack developer",
    linkedinLabel: "LinkedIn profile",
    contactLabel: "Let’s talk about your project",
    workLabel: "How we work",
    proof: {
      eyebrow: "Our products",
      title: "Software already in use.",
      lead: "Building Takofy and VIGGO taught us to listen to the people using the software and understand their needs. Here is how that shows up in two everyday tasks.",
      linkLabel: "Read the case study",
      takofy: {
        context: "Restaurants in Nicaragua",
        text: "The team takes a table’s order, adjusts quantities, and adds preparation notes. The order reaches the kitchen with the information needed to prepare it.",
        alt: "Takofy order with a table, items, quantities, notes, and a button to send it to the kitchen.",
        caption: "An order for one table. Example data.",
        href: getRoute("case-takofy", "en"),
      },
      viggo: {
        context: "Gyms in Nicaragua",
        text: "At the cash register, the team reviews each payment and its payment method. The inventory ledger keeps a record of each product’s incoming and outgoing stock and balance.",
        alt: "Detail of VIGGO payments showing their amounts and payment methods.",
        caption: "Cash register detail: amounts and payment methods.",
        href: getRoute("case-viggo", "en"),
      },
    },
    cta: {
      eyebrow: "Custom software",
      title: "Let’s talk about what you need to build.",
      text: "Tell us how your team works, which tools it uses, and what you need to solve. That is where the project starts.",
    },
  },
};

export function getCompanyProfile(locale: Locale) {
  const content = copy[locale];
  const cta: CtaContent = {
    ...content.cta,
    primary: { label: content.contactLabel, href: getRoute("contact", locale) },
  };
  return {
    ...content,
    founders: founders.map((founder) => ({ ...founder, role: content.founderRole })),
    contactHref: getRoute("contact", locale),
    workHref: getRoute("work", locale),
    cta,
  };
}

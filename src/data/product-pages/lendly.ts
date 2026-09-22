import { getRoute } from "../../i18n/routes";
import type { Locale, ProductPageContent } from "../../types/site";
import { getProduct } from "../products";

export function getLendlyPage(locale: Locale): ProductPageContent {
  const product = getProduct("lendly", locale);
  const isEs = locale === "es";

  return {
    id: "lendly",
    seo: {
      title: isEs ? "Lendly | Gestión de préstamos" : "Lendly | Loan management",
      description: product.description,
    },
    hero: {
      eyebrow: isEs ? "Gestión de préstamos" : "Loan management",
      title: isEs
        ? "Una cartera organizada, incluso sin conexión."
        : "An organized portfolio, even offline.",
      lead: isEs
        ? "Reúne clientes, préstamos, cuotas y pagos para consultar cada operación y dar seguimiento a la cartera sin la complejidad de un sistema bancario."
        : "Bring clients, loans, installments, and payments together to review every operation and follow up on your portfolio without the complexity of a banking system.",
      primary: product.external,
      secondary: { label: isEs ? "Explorar Lendly" : "Explore Lendly", href: "#overview-title" },
      image: {
        src: "/images/lendly/cover.webp",
        alt: isEs
          ? "Lendly con listados de préstamos y clientes usando datos de demostración."
          : "Lendly loan and client lists with demonstration data.",
        width: 1600,
        height: 1200,
        caption: isEs
          ? "Cartera y clientes con datos de demostración."
          : "Portfolio and clients with demonstration data.",
      },
    },
    overview: {
      eyebrow: isEs ? "Cartera bajo control" : "Portfolio under control",
      title: isEs
        ? "Del préstamo al seguimiento de cada cuota"
        : "From each loan to every installment",
      lead: isEs
        ? "Lendly está diseñado para prestamistas individuales y pequeños equipos que necesitan trabajar desde cualquier lugar."
        : "Lendly is designed for individual lenders and small teams that need to work from anywhere.",
      metrics: isEs
        ? [
            { title: "Clientes", text: "Información y actividad" },
            { title: "Préstamos", text: "Condiciones y saldos" },
            { title: "Cuotas", text: "Pagos y vencimientos" },
            { title: "Offline-first", text: "Trabajo sin conexión" },
          ]
        : [
            { title: "Clients", text: "Information and activity" },
            { title: "Loans", text: "Terms and balances" },
            { title: "Installments", text: "Payments and due dates" },
            { title: "Offline-first", text: "Work without a connection" },
          ],
    },
    sections: [],
    gallery: {
      eyebrow: isEs ? "El producto en uso" : "The product in use",
      title: isEs ? "La cartera y sus detalles." : "The portfolio and its details.",
      lead: isEs
        ? "Capturas de Lendly con datos de demostración preparados para su presentación."
        : "Lendly screens with demonstration data prepared for its presentation.",
      layout: "stories",
      detailLabel: isEs ? "Ampliar captura" : "Open full capture",
      items: [
        {
          src: "/images/lendly/cover.webp",
          detailSrc: "/images/lendly/cover.webp",
          width: 1600,
          height: 1200,
          title: isEs
            ? "Clientes y préstamos en un solo lugar."
            : "Clients and loans in one place.",
          alt: isEs
            ? "Listados de préstamos y clientes en Lendly."
            : "Loan and client lists in Lendly.",
          caption: isEs
            ? "Consulta la cartera, encuentra cada cliente y revisa qué necesita seguimiento."
            : "Review the portfolio, find each client, and see what needs follow-up.",
        },
        {
          src: "/images/lendly/detail.webp",
          detailSrc: "/images/lendly/detail.webp",
          width: 1600,
          height: 1200,
          title: isEs ? "Cada cuota conserva su contexto." : "Every installment keeps its context.",
          alt: isEs
            ? "Detalle de un préstamo y seguimiento de cuotas en Lendly."
            : "Loan details and installment tracking in Lendly.",
          caption: isEs
            ? "Revisa condiciones, pagos, vencimientos y saldo desde el detalle del préstamo."
            : "Review terms, payments, due dates, and balance from the loan details.",
        },
      ],
    },
    cta: {
      eyebrow: "Lendly",
      title: isEs ? "Prueba Lendly." : "Try Lendly.",
      text: isEs
        ? "Abre la versión web beta o consulta con Quantix sobre el producto."
        : "Open the beta web version or ask Quantix about the product.",
      primary: product.external!,
      secondary: {
        label: isEs ? "Hablar con Quantix" : "Contact Quantix",
        href: getRoute("contact", locale),
      },
    },
  };
}

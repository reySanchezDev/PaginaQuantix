import { getRoute } from "../../i18n/routes";
import type { Locale, ProductPageContent } from "../../types/site";
import { getProduct } from "../products";

export function getTakofyPage(locale: Locale): ProductPageContent {
  const product = getProduct("takofy", locale);
  const isEs = locale === "es";

  return {
    id: "takofy",
    seo: {
      title: isEs ? "Takofy — Gestión de restaurantes" : "Takofy — Restaurant management",
      description: product.description,
    },
    hero: {
      eyebrow: isEs ? "Software publicado para restaurantes" : "Published restaurant software",
      title: isEs
        ? "Servicio, cocina y control en un mismo flujo"
        : "Service, kitchen, and control in one flow",
      lead: product.description,
      primary: product.external,
      secondary: {
        label: isEs ? "Ver productos" : "View products",
        href: getRoute("products", locale),
      },
      highlights: isEs
        ? ["Comandas", "Mesas", "Pagos", "Cocina / KDS", "Reportes", "Inventario"]
        : ["Orders", "Tables", "Payments", "Kitchen / KDS", "Reporting", "Inventory"],
    },
    overview: {
      eyebrow: isEs ? "Operación continua" : "Continuous operations",
      title: isEs
        ? "Diseñado alrededor del ritmo del restaurante"
        : "Designed around the pace of a restaurant",
      lead: isEs
        ? "Takofy organiza el trabajo entre salón, cocina, caja, inventario y seguimiento operativo, incluso cuando la conexión no está disponible."
        : "Takofy organizes work across front of house, kitchen, checkout, inventory, and operational follow-up, even when a connection is unavailable.",
      metrics: isEs
        ? [
            { title: "Salón", text: "Mesas y comandas" },
            { title: "Cocina", text: "Flujo KDS" },
            { title: "Caja", text: "Pagos y cierre" },
            { title: "Control", text: "Inventario y reportes" },
          ]
        : [
            { title: "Front of house", text: "Tables and orders" },
            { title: "Kitchen", text: "KDS workflow" },
            { title: "Checkout", text: "Payments and closing" },
            { title: "Control", text: "Inventory and reporting" },
          ],
    },
    sections: [
      {
        eyebrow: isEs ? "Flujos" : "Workflows",
        title: isEs ? "Áreas que Takofy ayuda a coordinar" : "Areas Takofy helps coordinate",
        lead: isEs
          ? "El producto se concentra en la continuidad del servicio y la conexión entre cada frente de trabajo."
          : "The product focuses on service continuity and the connection between each area of work.",
        items: isEs
          ? [
              {
                title: "Atención y pedidos",
                text: "Comandas, mesas y pagos organizados para un servicio ágil.",
              },
              {
                title: "Coordinación de cocina",
                text: "Flujos KDS que mantienen la preparación visible y estructurada.",
              },
              {
                title: "Inventario",
                text: "Control de existencias conectado a la operación diaria.",
              },
              {
                title: "Reportes",
                text: "Información operativa para seguimiento y decisiones del restaurante.",
              },
            ]
          : [
              {
                title: "Service and orders",
                text: "Orders, tables, and payments organized for fast service.",
              },
              {
                title: "Kitchen coordination",
                text: "KDS workflows that keep preparation visible and structured.",
              },
              { title: "Inventory", text: "Stock control connected to daily operations." },
              {
                title: "Reporting",
                text: "Operational information for restaurant tracking and decisions.",
              },
            ],
      },
    ],
    cta: {
      eyebrow: "Takofy",
      title: isEs ? "Mantén el servicio en movimiento" : "Keep service moving",
      text: isEs
        ? "Visita Takofy o conversa con Quantix sobre software para restaurantes."
        : "Visit Takofy or talk to Quantix about restaurant software.",
      primary: product.external!,
      secondary: {
        label: isEs ? "Contactar a Quantix" : "Contact Quantix",
        href: getRoute("contact", locale),
      },
    },
  };
}

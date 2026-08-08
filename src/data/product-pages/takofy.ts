import { getRoute } from "../../i18n/routes";
import type { Locale, ProductPageContent } from "../../types/site";
import { getProduct } from "../products";

export function getTakofyPage(locale: Locale): ProductPageContent {
  const product = getProduct("takofy", locale);
  const isEs = locale === "es";

  return {
    id: "takofy",
    seo: {
      title: isEs ? "Takofy | Gestión de restaurantes" : "Takofy | Restaurant management",
      description: product.description,
    },
    hero: {
      eyebrow: isEs ? "Software para restaurantes" : "Restaurant software",
      title: isEs
        ? "Salón, cocina, caja e inventario coordinados."
        : "Front of house, kitchen, point of sale, and inventory in one system.",
      lead: isEs
        ? "Takofy gestiona comandas, mesas, pagos, KDS, reportes e inventario, incluso cuando no hay conexión."
        : "Takofy manages orders, tables, payments, KDS workflows, reporting, and inventory, even when internet access is unavailable.",
      primary: product.external,
      secondary: {
        label: isEs ? "Ver productos" : "View products",
        href: getRoute("products", locale),
      },
    },
    overview: {
      eyebrow: isEs ? "Áreas del producto" : "Product areas",
      title: isEs
        ? "Diseñado para mantener el servicio en movimiento"
        : "Designed to keep service moving",
      lead: isEs
        ? "Takofy mantiene conectados los pedidos y la información operativa entre salón, cocina, caja e inventario."
        : "Takofy keeps orders and operating data connected across front of house, kitchen, point of sale, and inventory.",
      metrics: isEs
        ? [
            { title: "Salón", text: "Mesas y comandas" },
            { title: "Cocina", text: "Flujo KDS" },
            { title: "Caja", text: "Pagos y cierres" },
            { title: "Control", text: "Inventario y reportes" },
          ]
        : [
            { title: "Front of house", text: "Tables and orders" },
            { title: "Kitchen", text: "KDS workflow" },
            { title: "Point of sale", text: "Payments and closing" },
            { title: "Oversight", text: "Inventory and reporting" },
          ],
    },
    sections: [],
    cta: {
      eyebrow: "Takofy",
      title: isEs ? "Conoce Takofy." : "Explore Takofy.",
      text: isEs
        ? "Visita Takofy o contacta a Quantix para conversar sobre software para restaurantes."
        : "Visit Takofy or contact Quantix to discuss restaurant software.",
      primary: product.external!,
      secondary: {
        label: isEs ? "Contactar a Quantix" : "Contact Quantix",
        href: getRoute("contact", locale),
      },
    },
  };
}

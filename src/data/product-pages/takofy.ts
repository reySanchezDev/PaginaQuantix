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
        ? "Takofy gestiona comandas, mesas, pagos, KDS, reportes e inventario, incluso sin conexión a internet."
        : "Takofy manages orders, tables, payments, KDS workflows, reporting, and inventory, even without internet access.",
      primary: product.external,
      secondary: {
        label: isEs ? "Ver productos" : "View products",
        href: getRoute("products", locale),
      },
    },
    overview: {
      eyebrow: isEs ? "Operación diaria" : "Daily operations",
      title: isEs
        ? "Cada pedido conectado de principio a fin"
        : "Every order connected from start to finish",
      lead: isEs
        ? "La información acompaña al pedido desde el salón hasta la cocina, la caja y el inventario."
        : "Order information moves from front of house to the kitchen, point of sale, and inventory.",
      metrics: isEs
        ? [
            { title: "Salón", text: "Mesas y comandas" },
            { title: "Cocina", text: "Flujo KDS" },
            { title: "Caja", text: "Pagos y cierres diarios" },
            { title: "Gestión", text: "Inventario y reportes" },
          ]
        : [
            { title: "Front of house", text: "Tables and orders" },
            { title: "Kitchen", text: "KDS workflow" },
            { title: "Point of sale", text: "Payments and daily closeouts" },
            { title: "Management", text: "Inventory and reporting" },
          ],
    },
    sections: [],
    cta: {
      eyebrow: "Takofy",
      title: isEs ? "Visita Takofy." : "Visit Takofy.",
      text: isEs
        ? "Visita Takofy o habla con Quantix sobre cómo podría encajar en tu restaurante."
        : "Visit Takofy or talk to Quantix about how it could fit your restaurant.",
      primary: product.external!,
      secondary: {
        label: isEs ? "Hablar con Quantix" : "Contact Quantix",
        href: getRoute("contact", locale),
      },
    },
  };
}

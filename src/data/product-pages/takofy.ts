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
        ? "Toma el pedido desde la mesa, envíalo a cocina y sigue hasta el cobro. El equipo puede seguir trabajando incluso sin conexión a internet."
        : "Take an order at the table, send it to the kitchen, and follow it through to payment. The team can keep working even without internet access.",
      primary: product.external,
      image: {
        src: "/images/takofy/pedido-detalle.webp",
        alt: isEs
          ? "Comanda de Takofy con platos, cantidades y total antes de enviar a cocina."
          : "Takofy order with items, quantities, and a total before sending it to the kitchen.",
        width: 1280,
        height: 720,
        caption: isEs
          ? "Una comanda, lista para cocina. Datos de ejemplo."
          : "An order ready for the kitchen. Example data.",
      },
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
    gallery: {
      eyebrow: isEs ? "El producto en uso" : "The product in use",
      title: isEs ? "Del menú a la mesa." : "From the menu to the table.",
      lead: isEs
        ? "Capturas reales de Takofy con un restaurante de ejemplo. Amplía cada pantalla para ver cómo se organiza el trabajo."
        : "Actual Takofy screens with an example restaurant. Open each capture to see how the workflow comes together.",
      layout: "stories",
      detailLabel: isEs ? "Ampliar captura" : "Open full capture",
      items: [
        {
          src: "/images/takofy/pedido-detalle.webp",
          detailSrc: "/images/takofy/pedido-detalle.webp",
          width: 1280,
          height: 720,
          title: isEs ? "Arma la comanda desde la mesa." : "Build the order at the table.",
          alt: isEs
            ? "Pedido de ejemplo para Mesa 1 con dos tacos de birria, dos limonadas, total y acción para enviar a cocina."
            : "Example order for Table 1 with two birria tacos, two lemonades, a total and the send-to-kitchen action.",
          caption: isEs
            ? "Selecciona los productos, ajusta cantidades y agrega notas de cocina. La mesa y el total permanecen a la vista antes de enviar el pedido."
            : "Select products, adjust quantities and add kitchen notes. The table and total stay visible before you send the order.",
        },
        {
          src: "/images/takofy/cocina-detalle.webp",
          detailSrc: "/images/takofy/cocina-detalle.webp",
          width: 1280,
          height: 720,
          title: isEs ? "La cocina sabe qué sigue." : "The kitchen knows what comes next.",
          alt: isEs
            ? "Tablero de cocina de Takofy con dos comandas de ejemplo, una en preparación y otra recibida."
            : "Takofy kitchen board with two example orders, one being prepared and another received.",
          caption: isEs
            ? "Cada comanda reúne los platos, sus cantidades y el tiempo de espera. El equipo puede pasar de recibida a preparando y marcarla lista para servir."
            : "Each order brings together the items, quantities and waiting time. The team can move it from received to preparing and mark it ready to serve.",
        },
        {
          src: "/images/takofy/productos-detalle.webp",
          detailSrc: "/images/takofy/productos-detalle.webp",
          width: 1280,
          height: 720,
          title: isEs ? "Un menú fácil de mantener." : "A menu that is easy to maintain.",
          alt: isEs
            ? "Catálogo de Takofy con seis productos de ejemplo y sus precios, costos y márgenes."
            : "Takofy catalog with six example products and their prices, costs and margins.",
          caption: isEs
            ? "Consulta precios, costos y márgenes en el catálogo. Busca por producto o SKU y accede a las vistas de productos listos para vender, ingredientes y recetas."
            : "Review prices, costs and margins in the catalog. Search by product or SKU and switch between ready-to-sell products, ingredients and recipes.",
        },
      ],
    },
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

import { getRoute } from "../../i18n/routes";
import type { Locale, ProductPageContent } from "../../types/site";
import { getProduct } from "../products";

export function getViggoPage(locale: Locale): ProductPageContent {
  const product = getProduct("viggo", locale);
  const isEs = locale === "es";

  return {
    id: "viggo",
    seo: {
      title: isEs ? "VIGGO — Control integral del negocio" : "VIGGO — Integrated business control",
      description: product.description,
    },
    hero: {
      eyebrow: isEs ? "Plataforma operativa de Quantix" : "Operational platform by Quantix",
      title: isEs
        ? "Tu negocio, conectado de principio a fin"
        : "Your business, connected from end to end",
      lead: product.description,
      primary: product.external,
      secondary: { label: isEs ? "Ver el flujo" : "View the workflow", href: "#flujo" },
      highlights: isEs
        ? [
            "Clientes y servicios",
            "Ventas y cobros",
            "Inventario y Kardex",
            "Credenciales y accesos",
          ]
        : [
            "Customers and services",
            "Sales and payments",
            "Inventory and Kardex",
            "Credentials and access",
          ],
      video: {
        src: "/videos/viggo/dashboard-video.mp4",
        poster: "/images/viggo/viggo-dashboard.webp",
        label: isEs ? "Demostración del dashboard de VIGGO" : "VIGGO dashboard demonstration",
      },
    },
    overview: {
      eyebrow: isEs ? "Una sola operación" : "One operation",
      title: isEs
        ? "Control visible, incluso cuando no estás presente"
        : "Visible control, even when you are not on site",
      lead: isEs
        ? "VIGGO conecta lo que suele quedar separado: clientes, vigencias, ventas, pagos, inventario, accesos e historial. El equipo trabaja con contexto y la dirección conserva visibilidad."
        : "VIGGO connects what often stays separate: customers, validity periods, sales, payments, inventory, access, and history. The team works with context while management keeps visibility.",
      metrics: isEs
        ? [
            { title: "Clientes", text: "Activos, vencidos y próximos a renovar" },
            { title: "Servicios", text: "Planes, vigencias y renovaciones" },
            { title: "Inventario", text: "Compras, existencias por sede y Kardex" },
            { title: "Ventas", text: "Cobros, comprobantes y cierres" },
          ]
        : [
            { title: "Customers", text: "Active, expired, and up for renewal" },
            { title: "Services", text: "Plans, validity periods, and renewals" },
            { title: "Inventory", text: "Purchases, branch stock, and Kardex" },
            { title: "Sales", text: "Payments, receipts, and closings" },
          ],
    },
    sections: [
      {
        id: "flujo",
        eyebrow: isEs ? "Capacidades" : "Capabilities",
        title: isEs
          ? "Una operación completa, no módulos aislados"
          : "A complete operation, not isolated modules",
        lead: isEs
          ? "Cada movimiento mantiene relación con el cliente, el servicio y el historial que le da contexto."
          : "Each movement stays connected to the customer, service, and history that gives it context.",
        items: isEs
          ? [
              {
                title: "Clientes y servicios",
                text: "Perfiles, planes, vigencias, renovaciones y estado visible.",
              },
              {
                title: "Ventas y pagos",
                text: "Transacciones, cobros, recibos, cierres e historial diario.",
              },
              {
                title: "Inventario avanzado",
                text: "Catálogo, compras, stock por sede, transferencias, conteos, auditoría y Kardex.",
              },
              {
                title: "Credencial y validación",
                text: "Identificación digital para consultar, validar y actuar según el estado del cliente.",
              },
              {
                title: "Usuarios y permisos",
                text: "Roles para que cada persona opere únicamente lo necesario.",
              },
              {
                title: "Historial operativo",
                text: "Pagos, vigencias, accesos, ventas y movimientos listos para seguimiento.",
              },
            ]
          : [
              {
                title: "Customers and services",
                text: "Profiles, plans, validity periods, renewals, and visible status.",
              },
              {
                title: "Sales and payments",
                text: "Transactions, payments, receipts, closings, and daily history.",
              },
              {
                title: "Advanced inventory",
                text: "Catalog, purchases, branch stock, transfers, counts, audit, and Kardex.",
              },
              {
                title: "Credential and validation",
                text: "Digital identification to review, validate, and act on customer status.",
              },
              {
                title: "Users and permissions",
                text: "Roles so each person operates only what they need.",
              },
              {
                title: "Operational history",
                text: "Payments, validity periods, access, sales, and movements ready for follow-up.",
              },
            ],
      },
      {
        eyebrow: isEs ? "Inventario conectado" : "Connected inventory",
        title: isEs
          ? "Inventario al mismo nivel que las ventas"
          : "Inventory at the same level as sales",
        lead: isEs
          ? "Compras, existencias, ubicaciones y movimientos permanecen conectados al flujo comercial."
          : "Purchases, stock, locations, and movements remain connected to the commercial flow.",
        variant: "soft",
        items: isEs
          ? [
              {
                title: "Stock por sede",
                text: "Existencias por artículo, sede y ubicación con mínimos de referencia.",
              },
              {
                title: "Movimientos trazables",
                text: "Entradas, salidas, ajustes, ventas y documentos con contexto.",
              },
              {
                title: "Transferencias y conteos",
                text: "Comparación entre stock real y registro operativo.",
              },
              {
                title: "Kardex y auditoría",
                text: "Balance, historial y diferencias visibles para actuar a tiempo.",
              },
            ]
          : [
              {
                title: "Stock by branch",
                text: "Inventory by item, branch, and location with reference minimums.",
              },
              {
                title: "Traceable movements",
                text: "Entries, exits, adjustments, sales, and documents with context.",
              },
              {
                title: "Transfers and counts",
                text: "Comparison between real stock and the operating record.",
              },
              {
                title: "Kardex and audit",
                text: "Balance, history, and differences visible in time to act.",
              },
            ],
      },
    ],
    gallery: {
      eyebrow: isEs ? "Producto en operación" : "Product in operation",
      title: isEs
        ? "De la venta al Kardex, cada paso queda visible"
        : "From the sale to Kardex, every step stays visible",
      lead: isEs
        ? "Capturas reales del flujo comercial y de inventario de VIGGO."
        : "Real captures from VIGGO’s commercial and inventory flow.",
      items: [
        {
          src: "/images/viggo/viggo-caja-gestion-2.webp",
          alt: isEs ? "Gestión de ventas en VIGGO" : "Sales management in VIGGO",
          width: 1916,
          height: 940,
          caption: isEs ? "Preparación de ventas" : "Sales preparation",
        },
        {
          src: "/images/viggo/viggo-caja-factura.webp",
          alt: isEs ? "Factura de venta en VIGGO" : "Sales invoice in VIGGO",
          width: 1919,
          height: 944,
          caption: isEs ? "Facturación conectada" : "Connected invoicing",
        },
        {
          src: "/images/viggo/viggo-caja-historial-transacciones-2.webp",
          alt: isEs ? "Historial de transacciones en VIGGO" : "Transaction history in VIGGO",
          width: 1918,
          height: 936,
          caption: isEs ? "Historial comercial" : "Commercial history",
        },
        {
          src: "/images/viggo/viggo-kardex-2.webp",
          alt: isEs ? "Kardex de inventario en VIGGO" : "Inventory Kardex in VIGGO",
          width: 1917,
          height: 941,
          caption: isEs ? "Movimiento en Kardex" : "Kardex movement",
        },
      ],
    },
    cta: {
      eyebrow: isEs ? "VIGGO para tu operación" : "VIGGO for your operation",
      title: isEs
        ? "Conecta clientes, ventas e inventario en un solo flujo"
        : "Connect customers, sales, and inventory in one flow",
      text: isEs
        ? "Conoce el producto o conversa con Quantix sobre tu contexto."
        : "Explore the product or talk to Quantix about your context.",
      primary: product.external!,
      secondary: {
        label: isEs ? "Contactar a Quantix" : "Contact Quantix",
        href: getRoute("contact", locale),
      },
    },
  };
}

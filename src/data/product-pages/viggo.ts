import { getRoute } from "../../i18n/routes";
import type { Locale, ProductPageContent } from "../../types/site";
import { getProduct } from "../products";

export function getViggoPage(locale: Locale): ProductPageContent {
  const product = getProduct("viggo", locale);
  const isEs = locale === "es";

  return {
    id: "viggo",
    seo: {
      title: isEs ? "VIGGO | Gestión empresarial" : "VIGGO | Business management",
      description: product.description,
    },
    hero: {
      eyebrow: isEs ? "Plataforma de gestión empresarial" : "Business management platform",
      title: isEs
        ? "Clientes, servicios, ventas e inventario en un mismo sistema."
        : "Customers, services, sales, and inventory in one system.",
      lead: isEs
        ? "Cada movimiento queda relacionado con el cliente, el servicio y el historial correspondiente."
        : "Each transaction stays connected to the customer, service, and related history.",
      primary: product.external,
      secondary: {
        label: isEs ? "Ver funciones" : "View features",
        href: "#capabilities",
      },
      video: {
        src: "/videos/viggo/dashboard-video.mp4",
        poster: "/images/viggo/viggo-dashboard.webp",
        label: isEs ? "Demostración del panel de VIGGO" : "VIGGO dashboard demonstration",
      },
    },
    overview: {
      eyebrow: isEs ? "Áreas del producto" : "Product areas",
      title: isEs
        ? "Información conectada a la operación diaria"
        : "Information connected to daily operations",
      lead: isEs
        ? "VIGGO reúne la actividad comercial y de inventario para que el equipo trabaje sobre un registro común."
        : "VIGGO brings commercial and inventory activity together so the team works from a shared record.",
      metrics: isEs
        ? [
            { title: "Clientes", text: "Perfiles, servicios y renovaciones" },
            { title: "Ventas", text: "Cobros, comprobantes y cierres" },
            { title: "Inventario", text: "Compras, existencias y Kardex" },
            { title: "Accesos", text: "Credenciales, validación e historial" },
          ]
        : [
            { title: "Customers", text: "Profiles, services, and renewals" },
            { title: "Sales", text: "Payments, receipts, and daily closeouts" },
            { title: "Inventory", text: "Purchases, stock, and inventory ledger" },
            { title: "Access", text: "Credentials, validation, and history" },
          ],
    },
    sections: [
      {
        id: "capabilities",
        eyebrow: isEs ? "Funciones" : "Features",
        title: isEs
          ? "Un registro común para cada movimiento"
          : "A shared record for every transaction",
        items: isEs
          ? [
              {
                title: "Clientes y servicios",
                text: "Perfiles, planes, vigencias, renovaciones y estados disponibles para consulta.",
              },
              {
                title: "Ventas y cobros",
                text: "Transacciones, pagos, comprobantes, cierres e historial diario.",
              },
              {
                title: "Inventario trazable",
                text: "Compras, existencias por sede, transferencias, conteos, auditoría y Kardex.",
              },
              {
                title: "Usuarios y accesos",
                text: "Roles, credenciales y permisos para cada responsabilidad.",
              },
            ]
          : [
              {
                title: "Customers and services",
                text: "Profiles, plans, service periods, renewals, and status available for review.",
              },
              {
                title: "Sales and payments",
                text: "Transactions, payments, receipts, closing, and daily history.",
              },
              {
                title: "Traceable inventory",
                text: "Purchases, branch stock, transfers, counts, audits, and inventory ledger.",
              },
              {
                title: "Users and access",
                text: "Roles, credentials, and permissions for each responsibility.",
              },
            ],
      },
    ],
    gallery: {
      eyebrow: isEs ? "Interfaz del producto" : "Product interface",
      title: isEs
        ? "Ventas e inventario dentro del mismo registro"
        : "Sales and inventory in the same record",
      lead: isEs
        ? "Capturas del flujo comercial y de inventario de VIGGO."
        : "Screens from VIGGO’s sales and inventory workflows.",
      items: [
        {
          src: "/images/viggo/viggo-caja-gestion-2.webp",
          alt: isEs ? "Gestión de ventas en VIGGO" : "Sales management in VIGGO",
          width: 1916,
          height: 940,
          caption: isEs ? "Preparación de una venta" : "Preparing a sale",
        },
        {
          src: "/images/viggo/viggo-caja-factura.webp",
          alt: isEs ? "Factura de venta en VIGGO" : "Sales invoice in VIGGO",
          width: 1919,
          height: 944,
          caption: isEs ? "Facturación" : "Invoicing",
        },
        {
          src: "/images/viggo/viggo-kardex-2.webp",
          alt: isEs ? "Kardex de inventario en VIGGO" : "Inventory ledger in VIGGO",
          width: 1917,
          height: 941,
          caption: isEs ? "Movimientos de inventario" : "Inventory movements",
        },
      ],
    },
    cta: {
      eyebrow: "VIGGO",
      title: isEs ? "Conoce VIGGO." : "Visit VIGGO.",
      text: isEs
        ? "Visita VIGGO o contacta a Quantix para conversar sobre la implementación."
        : "Visit VIGGO or contact Quantix to discuss implementation.",
      primary: product.external!,
      secondary: {
        label: isEs ? "Contactar a Quantix" : "Contact Quantix",
        href: getRoute("contact", locale),
      },
    },
  };
}

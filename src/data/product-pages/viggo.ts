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
        ? "La información de cada operación queda vinculada para que el equipo pueda consultar su contexto e historial."
        : "Information stays connected so the team can review the context and history of each operation.",
      primary: product.external,
      secondary: {
        label: isEs ? "Ver funciones" : "View features",
        href: "#capabilities",
      },
      video: {
        src: "/videos/viggo/dashboard-video.mp4",
        poster: "/images/viggo/viggo-dashboard.webp",
        label: isEs ? "Demostración del panel de VIGGO" : "VIGGO dashboard demonstration",
        width: 1440,
        height: 706,
      },
    },
    overview: {
      eyebrow: isEs ? "Operación conectada" : "Connected operations",
      title: isEs
        ? "Un solo registro para el trabajo diario"
        : "One shared record for day-to-day work",
      lead: isEs
        ? "VIGGO reúne la actividad comercial y de inventario para que todo el equipo trabaje con la misma información."
        : "VIGGO brings sales and inventory activity together so the entire team works from the same information.",
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
        title: isEs ? "Lo que puedes gestionar en VIGGO" : "What you can manage in VIGGO",
        items: isEs
          ? [
              {
                title: "Clientes y servicios",
                text: "Perfiles, planes, vigencias, renovaciones y estados disponibles para consulta.",
              },
              {
                title: "Ventas y cobros",
                text: "Transacciones, pagos, comprobantes, cierres diarios e historial.",
              },
              {
                title: "Control de inventario",
                text: "Compras, existencias por sede, transferencias, conteos, auditoría y Kardex.",
              },
              {
                title: "Usuarios y accesos",
                text: "Roles y permisos según la responsabilidad de cada usuario.",
              },
            ]
          : [
              {
                title: "Customers and services",
                text: "Profiles, plans, active periods, renewals, and service status.",
              },
              {
                title: "Sales and payments",
                text: "Transactions, payments, receipts, daily closeouts, and history.",
              },
              {
                title: "Inventory control",
                text: "Purchases, branch stock, transfers, counts, audits, and inventory ledger.",
              },
              {
                title: "Users and access",
                text: "Roles and permissions based on each user’s responsibilities.",
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
        ? "Capturas de ventas e inventario en VIGGO."
        : "Screens showing sales and inventory in VIGGO.",
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
      title: isEs ? "Visita VIGGO." : "Visit VIGGO.",
      text: isEs
        ? "Visita VIGGO o habla con Quantix sobre cómo podría integrarse a tu operación."
        : "Visit VIGGO or talk to Quantix about how it could fit your operation.",
      primary: product.external!,
      secondary: {
        label: isEs ? "Hablar con Quantix" : "Contact Quantix",
        href: getRoute("contact", locale),
      },
    },
  };
}

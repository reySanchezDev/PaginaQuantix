import { getRoute } from "../i18n/routes";
import type { Locale, ProductId, ProductSummary } from "../types/site";
import { qavisionTool } from "./qavision-tool";
import { siteConfig } from "./site-config";

const content: Record<Locale, Omit<ProductSummary, "href">[]> = {
  es: [
    {
      id: "viggo",
      name: "VIGGO",
      category: "Operación empresarial",
      description: "Centraliza clientes, servicios, ventas, cobros, inventario y accesos.",
      status: "Aplicación web",
      preview: {
        src: "/images/viggo/viggo-dashboard.webp",
        alt: "Panel de VIGGO con ventas, inventario y el estado del negocio.",
        width: 1917,
        height: 945,
      },
      external: {
        label: "Visitar VIGGO",
        href: siteConfig.productUrls.viggo,
        target: "_blank",
      },
    },
    {
      id: "takofy",
      name: "Takofy",
      category: "Restaurantes",
      description:
        "Coordina salón, cocina, caja e inventario, incluso cuando no hay conexión a internet.",
      status: "Web · Play Store prevista",
      preview: {
        src: "/images/takofy/pedido-detalle.webp",
        alt: "Takofy con una comanda de ejemplo para una mesa del restaurante.",
        width: 1280,
        height: 720,
      },
      external: {
        label: "Visitar Takofy",
        href: siteConfig.productUrls.takofy.es,
        target: "_blank",
      },
    },
    {
      id: "oktara",
      name: "Oktara",
      category: "Operaciones por sucursal",
      description:
        "Estandariza rutinas, coordina equipos y da seguimiento al cumplimiento en cada ubicación.",
      status: "Aplicación web · Acceso por consulta",
      preview: {
        src: "/images/oktara/es/reports.png",
        alt: "Panel de Oktara con cumplimiento, calidad y seguimiento por sucursal.",
        width: 1920,
        height: 1080,
      },
      external: {
        label: "Abrir Oktara",
        href: siteConfig.productUrls.oktara,
        target: "_blank",
      },
    },
    {
      id: "tentrix",
      name: "Tentrix",
      category: "Soporte y mesa de ayuda",
      description:
        "Organiza solicitudes, responsables, prioridades y tiempos de atención en un solo lugar.",
      status: "Aplicación web · Acceso por consulta",
      preview: {
        src: "/images/tentrix/es/overview.png",
        alt: "Panel de Tentrix con estados de tickets, alertas y actividad reciente.",
        width: 1920,
        height: 1080,
      },
      external: {
        label: "Abrir Tentrix",
        href: siteConfig.productUrls.tentrix,
        target: "_blank",
      },
    },
    {
      id: "nica-finanzas",
      name: "Nica Finanzas",
      category: "Herramientas financieras",
      description:
        "Calculadoras gratuitas de salario, préstamos y liquidación laboral para Nicaragua.",
      status: "Web · Acceso gratuito",
      preview: {
        src: "/images/nica-finanzas/salario-detalle.webp",
        alt: "Calculadora de salario de Nica Finanzas con el desglose de INSS e IR.",
        width: 1440,
        height: 1000,
      },
      external: {
        label: "Abrir Nica Finanzas",
        href: siteConfig.productUrls["nica-finanzas"],
        target: "_blank",
      },
    },
    {
      id: "qavision",
      name: "QAVision",
      category: "Evidencia de pruebas",
      description: "Captura, anota y organiza evidencia de pruebas en Windows.",
      status: `Windows · v${qavisionTool.version}`,
      external: {
        label: "Descargar para Windows",
        href: qavisionTool.downloadUrl,
        target: "_blank",
      },
    },
  ],
  en: [
    {
      id: "viggo",
      name: "VIGGO",
      category: "Business operations",
      description:
        "Manage customers, services, sales, payments, inventory, and access in one system.",
      status: "Web app",
      preview: {
        src: "/images/viggo/viggo-dashboard.webp",
        alt: "VIGGO dashboard showing sales, inventory and business activity.",
        width: 1917,
        height: 945,
      },
      external: {
        label: "Visit VIGGO",
        href: siteConfig.productUrls.viggo,
        target: "_blank",
      },
    },
    {
      id: "takofy",
      name: "Takofy",
      category: "Restaurants",
      description:
        "Coordinate front of house, kitchen, point of sale, and inventory, even without internet access.",
      status: "Web · Play Store planned",
      preview: {
        src: "/images/takofy/pedido-detalle.webp",
        alt: "Takofy showing an example order for a restaurant table.",
        width: 1280,
        height: 720,
      },
      external: {
        label: "Visit Takofy",
        href: siteConfig.productUrls.takofy.en,
        target: "_blank",
      },
    },
    {
      id: "oktara",
      name: "Oktara",
      category: "Multi-location operations",
      description:
        "Standardize routines, coordinate teams, and track completion across every location.",
      status: "Web app · Access by request",
      preview: {
        src: "/images/oktara/en/reports.png",
        alt: "Oktara dashboard showing completion, quality, and follow-up by location.",
        width: 1920,
        height: 1080,
      },
      external: {
        label: "Open Oktara",
        href: siteConfig.productUrls.oktara,
        target: "_blank",
      },
    },
    {
      id: "tentrix",
      name: "Tentrix",
      category: "Support and help desk",
      description: "Organize requests, owners, priorities, and service times in one place.",
      status: "Web app · Access by request",
      preview: {
        src: "/images/tentrix/es/overview.png",
        alt: "Tentrix dashboard showing ticket statuses, alerts, and recent activity in Spanish.",
        width: 1920,
        height: 1080,
      },
      external: {
        label: "Open Tentrix",
        href: siteConfig.productUrls.tentrix,
        target: "_blank",
      },
    },
    {
      id: "nica-finanzas",
      name: "Nica Finanzas",
      category: "Financial tools",
      description: "Free salary, loan, and employment settlement calculators for Nicaragua.",
      status: "Web · Free access",
      preview: {
        src: "/images/nica-finanzas/salario-detalle.webp",
        alt: "Nica Finanzas salary calculator with INSS and income tax deductions.",
        width: 1440,
        height: 1000,
      },
      external: {
        label: "Open Nica Finanzas",
        href: siteConfig.productUrls["nica-finanzas"],
        target: "_blank",
      },
    },
    {
      id: "qavision",
      name: "QAVision",
      category: "Testing evidence",
      description: "Capture, annotate, and organize test evidence on Windows.",
      status: `Windows · v${qavisionTool.version}`,
      external: {
        label: "Download for Windows",
        href: qavisionTool.downloadUrl,
        target: "_blank",
      },
    },
  ],
};

export function getProducts(locale: Locale): ProductSummary[] {
  return content[locale].map((product) => ({ ...product, href: getRoute(product.id, locale) }));
}

export function getProduct(id: ProductId, locale: Locale): ProductSummary {
  const product = getProducts(locale).find((item) => item.id === id);
  if (!product) throw new Error(`Product not found: ${id}`);
  return product;
}

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
      },
    },
    {
      id: "lendly",
      name: "Lendly",
      category: "Gestión de préstamos",
      description: "Organiza clientes, préstamos, cuotas y pagos, incluso cuando no hay conexión.",
      status: "Web · Beta",
      preview: {
        src: "/images/lendly/cover.webp",
        alt: "Lendly con listados de préstamos y clientes usando datos de demostración.",
        width: 1600,
        height: 1200,
      },
      external: {
        label: "Abrir Lendly",
        href: siteConfig.productUrls.lendly,
      },
    },
    {
      id: "hen-screenshots",
      name: "Hen Screenshots",
      category: "Herramientas para developers",
      description:
        "Convierte capturas en imágenes para App Store, Google Play y portfolios desde el navegador.",
      status: "Web · Gratis y open source",
      preview: {
        src: "/images/hen-screenshots/cover.webp",
        alt: "Composición creada con Hen Screenshots para presentar una aplicación.",
        width: 1600,
        height: 1200,
      },
      external: {
        label: "Abrir Hen Screenshots",
        href: siteConfig.productUrls["hen-screenshots"],
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
      },
    },
    {
      id: "lendly",
      name: "Lendly",
      category: "Loan management",
      description:
        "Organize clients, loans, installments, and payments, even without a connection.",
      status: "Web · Beta",
      preview: {
        src: "/images/lendly/cover.webp",
        alt: "Lendly loan and client lists with demonstration data.",
        width: 1600,
        height: 1200,
      },
      external: {
        label: "Open Lendly",
        href: siteConfig.productUrls.lendly,
      },
    },
    {
      id: "hen-screenshots",
      name: "Hen Screenshots",
      category: "Developer tools",
      description:
        "Turn captures into App Store, Google Play, and portfolio images in the browser.",
      status: "Web · Free and open source",
      preview: {
        src: "/images/hen-screenshots/cover.webp",
        alt: "An application showcase composed with Hen Screenshots.",
        width: 1600,
        height: 1200,
      },
      external: {
        label: "Open Hen Screenshots",
        href: siteConfig.productUrls["hen-screenshots"],
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
      },
    },
  ],
};

export function getProducts(locale: Locale): ProductSummary[] {
  return content[locale].map((product) => ({
    ...product,
    href: getRoute(product.id, locale),
    external: product.external ? { ...product.external, target: "_blank" } : undefined,
  }));
}

export function getProduct(id: ProductId, locale: Locale): ProductSummary {
  const product = getProducts(locale).find((item) => item.id === id);
  if (!product) throw new Error(`Product not found: ${id}`);
  return product;
}

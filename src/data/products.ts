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
      status: "Disponible",
      external: {
        label: "Conocer VIGGO",
        href: siteConfig.productUrls.viggo,
        target: "_blank",
      },
    },
    {
      id: "takofy",
      name: "Takofy",
      category: "Restaurantes",
      description: "Coordina salón, cocina, caja e inventario, incluso cuando no hay conexión.",
      status: "Disponible",
      external: {
        label: "Visitar Takofy",
        href: siteConfig.productUrls.takofy.es,
        target: "_blank",
      },
    },
    {
      id: "nica-finanzas",
      name: "Nica Finanzas",
      category: "Herramientas financieras",
      description:
        "Calculadoras gratuitas de salario, préstamos y liquidación laboral para Nicaragua.",
      status: "Acceso gratuito",
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
      status: "Available",
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
        "Connect front of house, kitchen, point of sale, and inventory, even when internet access is unavailable.",
      status: "Available",
      external: {
        label: "Visit Takofy",
        href: siteConfig.productUrls.takofy.en,
        target: "_blank",
      },
    },
    {
      id: "nica-finanzas",
      name: "Nica Finanzas",
      category: "Financial tools",
      description: "Free salary, loan, and employment-settlement calculators for Nicaragua.",
      status: "Free access",
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
      description: "Capture, annotate, and organize software-testing evidence on Windows.",
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

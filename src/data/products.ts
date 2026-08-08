import { getRoute } from "../i18n/routes";
import type { Locale, ProductId, ProductSummary } from "../types/site";
import { qavisionTool } from "./qavision-tool";
import { siteConfig } from "./site-config";

const content: Record<Locale, Omit<ProductSummary, "href">[]> = {
  es: [
    {
      id: "viggo",
      name: "VIGGO",
      category: "Operación integral",
      description:
        "Plataforma para gestionar clientes, servicios, inventario, ventas, cobros, credenciales, accesos e historial en una sola operación.",
      status: "Producto publicado",
      tags: ["Clientes", "Ventas", "Inventario", "Accesos"],
      featured: true,
      external: {
        label: "Ir a VIGGO",
        href: siteConfig.productUrls.viggo,
        target: "_blank",
      },
    },
    {
      id: "takofy",
      name: "Takofy",
      category: "Operación de restaurantes",
      description:
        "Software de gestión para restaurantes con comandas, mesas, pagos, cocina, reportes, inventario y continuidad sin conexión.",
      status: "Producto publicado",
      tags: ["Restaurantes", "POS", "KDS", "Inventario"],
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
        "Calculadoras gratuitas para Nicaragua, incluyendo salario, préstamos y liquidación laboral.",
      status: "Herramienta gratuita",
      tags: ["Finanzas", "Salario", "Préstamos", "Nicaragua"],
      external: {
        label: "Visitar Nica Finanzas",
        href: siteConfig.productUrls["nica-finanzas"],
        target: "_blank",
      },
    },
    {
      id: "qavision",
      name: "QAVision",
      category: "Evidencia QA",
      description:
        "Herramienta gratuita para captura visual, grabación por zona, anotaciones y organización de evidencia de pruebas.",
      status: `Versión ${qavisionTool.version}`,
      tags: ["QA", "Capturas", "Video", "Windows"],
      external: {
        label: "Descargar QAVision",
        href: qavisionTool.downloadUrl,
        target: "_blank",
      },
    },
  ],
  en: [
    {
      id: "viggo",
      name: "VIGGO",
      category: "Integrated operations",
      description:
        "A platform for managing customers, services, inventory, sales, payments, credentials, access, and history in one operation.",
      status: "Published product",
      tags: ["Customers", "Sales", "Inventory", "Access"],
      featured: true,
      external: {
        label: "Go to VIGGO",
        href: siteConfig.productUrls.viggo,
        target: "_blank",
      },
    },
    {
      id: "takofy",
      name: "Takofy",
      category: "Restaurant operations",
      description:
        "Restaurant management software for orders, tables, payments, kitchen workflows, reporting, inventory, and offline continuity.",
      status: "Published product",
      tags: ["Restaurants", "POS", "KDS", "Inventory"],
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
      description:
        "Free calculators for Nicaragua, including salary, loans, and employment settlement.",
      status: "Free tool",
      tags: ["Finance", "Salary", "Loans", "Nicaragua"],
      external: {
        label: "Visit Nica Finanzas",
        href: siteConfig.productUrls["nica-finanzas"],
        target: "_blank",
      },
    },
    {
      id: "qavision",
      name: "QAVision",
      category: "QA evidence",
      description:
        "A free tool for visual capture, zone recording, annotations, and organized software-testing evidence.",
      status: `Version ${qavisionTool.version}`,
      tags: ["QA", "Capture", "Video", "Windows"],
      external: {
        label: "Download QAVision",
        href: qavisionTool.downloadUrl,
        target: "_blank",
      },
    },
  ],
};

export function getProducts(locale: Locale): ProductSummary[] {
  return content[locale].map((product) => ({
    ...product,
    href: getRoute(product.id, locale),
  }));
}

export function getProduct(id: ProductId, locale: Locale): ProductSummary {
  const product = getProducts(locale).find((item) => item.id === id);

  if (!product) {
    throw new Error(`Product not found: ${id}`);
  }

  return product;
}

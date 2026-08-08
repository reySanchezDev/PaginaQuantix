import { getRoute } from "../../i18n/routes";
import type { Locale, ProductPageContent } from "../../types/site";
import { qavisionTool } from "../qavision-tool";
import { releaseHistory } from "../release-history";
import { getProduct } from "../products";

export function getQavisionPage(locale: Locale): ProductPageContent {
  const product = getProduct("qavision", locale);
  const isEs = locale === "es";
  const release = releaseHistory.find((item) => item.status === "released");

  return {
    id: "qavision",
    seo: {
      title: isEs ? "QAVision | Evidencia visual para QA" : "QAVision | Visual evidence for QA",
      description: product.description,
    },
    hero: {
      eyebrow: isEs ? "Aplicación gratuita para Windows" : "Free Windows application",
      title: isEs
        ? "Captura, anota y organiza evidencia de pruebas."
        : "Capture, annotate, and organize testing evidence.",
      lead: isEs
        ? `QAVision combina capturas, grabación por zona y un visor con anotaciones. La versión ${qavisionTool.version} está disponible para Windows.`
        : `QAVision combines screenshots, zone recording, and an annotation viewer. Version ${qavisionTool.version} is available for Windows.`,
      primary: product.external,
      secondary: {
        label: isEs ? "Ver productos" : "View products",
        href: getRoute("products", locale),
      },
    },
    overview: {
      eyebrow: isEs ? "Especificaciones" : "Specifications",
      title: `QAVision ${qavisionTool.version}`,
      lead: isEs
        ? "Aplicación de escritorio enfocada en producir evidencia visual precisa para revisión de software."
        : "A desktop application for producing precise visual evidence during software review.",
      metrics: isEs
        ? [
            { title: "Sistema", text: "Windows" },
            { title: "Instalador", text: ".exe" },
            { title: "Captura", text: "PNG y video" },
            { title: "Licencia", text: "Uso gratuito" },
          ]
        : [
            { title: "System", text: "Windows" },
            { title: "Installer", text: ".exe" },
            { title: "Capture", text: "PNG and video" },
            { title: "License", text: "Free to use" },
          ],
    },
    sections: [
      {
        eyebrow: isEs ? "Funciones" : "Features",
        title: isEs ? "Herramientas para documentar una prueba" : "Tools for documenting a test",
        items: isEs
          ? [
              { title: "Captura flexible", text: "Pantalla completa, región y modo clip." },
              { title: "Grabación por zona", text: "Video con controles y soporte de FFmpeg." },
              { title: "Visor con anotaciones", text: "Capas, texto, formas y resaltado." },
              { title: "Organización", text: "Carpetas por cliente, ambiente o trabajo." },
            ]
          : [
              { title: "Flexible capture", text: "Full screen, region, and clip mode." },
              { title: "Zone recording", text: "Video controls with FFmpeg support." },
              { title: "Annotation viewer", text: "Layers, text, shapes, and highlighting." },
              { title: "Organization", text: "Folders by client, environment, or task." },
            ],
      },
    ],
    release: release
      ? {
          label: isEs ? "Versión actual" : "Current release",
          version: release.version ?? qavisionTool.version,
          date: release.date,
          changes: release.changes[locale],
          checksum: {
            label: isEs ? "Integridad del instalador" : "Installer integrity",
            algorithm: "SHA-256",
            value: qavisionTool.sha256,
            size: qavisionTool.downloadSize,
          },
        }
      : undefined,
    cta: {
      eyebrow: "QAVision",
      title: isEs ? "Descarga la versión para Windows." : "Download the Windows release.",
      text: isEs
        ? "Verifica el checksum SHA-256 antes de instalar."
        : "Verify the SHA-256 checksum before installation.",
      primary: product.external!,
      secondary: {
        label: isEs ? "Contactar a Quantix" : "Contact Quantix",
        href: getRoute("contact", locale),
      },
    },
  };
}

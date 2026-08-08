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
      title: isEs ? "QAVision — Evidencia visual para QA" : "QAVision — Visual evidence for QA",
      description: product.description,
    },
    hero: {
      eyebrow: isEs ? "Herramienta gratuita de Quantix" : "Free tool by Quantix",
      title: isEs
        ? "Captura, revisa y organiza evidencia QA"
        : "Capture, review, and organize QA evidence",
      lead: qavisionTool.description[locale],
      primary: product.external,
      secondary: {
        label: isEs ? "Ver productos" : "View products",
        href: getRoute("products", locale),
      },
      highlights: isEs
        ? ["Captura multimodo", "Grabación por zona", "Anotaciones", "Organización por contexto"]
        : ["Multi-mode capture", "Zone recording", "Annotations", "Context organization"],
    },
    overview: {
      eyebrow: isEs ? "Versión actual" : "Current release",
      title: `QAVision ${qavisionTool.version}`,
      lead: isEs
        ? "Aplicación para Windows enfocada en evidencia visual precisa y flujos de revisión más claros."
        : "A Windows application focused on precise visual evidence and clearer review workflows.",
      metrics: isEs
        ? [
            { title: "Sistema", text: "Windows" },
            { title: "Formato", text: "Instalador .exe" },
            { title: "Captura", text: "PNG y video" },
            { title: "Licencia", text: "Herramienta gratuita" },
          ]
        : [
            { title: "System", text: "Windows" },
            { title: "Format", text: ".exe installer" },
            { title: "Capture", text: "PNG and video" },
            { title: "License", text: "Free tool" },
          ],
    },
    sections: [
      {
        eyebrow: isEs ? "Capacidades" : "Capabilities",
        title: isEs
          ? "Evidencia con más contexto y menos fricción"
          : "Evidence with more context and less friction",
        items: isEs
          ? [
              {
                title: "Captura flexible",
                text: "Pantalla completa, región y modo clip con nomenclatura automática.",
              },
              {
                title: "Grabación por zona",
                text: "Video con HUD de control y soporte de FFmpeg.",
              },
              {
                title: "Visor Pro",
                text: "Anotaciones vectoriales, capas, texto enriquecido y resaltado.",
              },
              {
                title: "Organización",
                text: "Carpetas por cliente, ambiente o contexto de trabajo, con autosave.",
              },
            ]
          : [
              {
                title: "Flexible capture",
                text: "Full screen, region, and clip mode with automatic naming.",
              },
              { title: "Zone recording", text: "Video with a control HUD and FFmpeg support." },
              {
                title: "Pro Viewer",
                text: "Vector annotations, layers, rich text, and highlighting.",
              },
              {
                title: "Organization",
                text: "Folders by client, environment, or work context, with autosave.",
              },
            ],
      },
    ],
    release: release
      ? {
          label: isEs ? "Notas de la versión" : "Release notes",
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
      title: isEs ? "Mejora tu flujo de evidencia QA" : "Improve your QA evidence workflow",
      text: isEs
        ? "Descarga la versión actual o conversa con Quantix sobre herramientas de calidad."
        : "Download the current release or talk to Quantix about quality tools.",
      primary: product.external!,
      secondary: {
        label: isEs ? "Contactar a Quantix" : "Contact Quantix",
        href: getRoute("contact", locale),
      },
    },
  };
}

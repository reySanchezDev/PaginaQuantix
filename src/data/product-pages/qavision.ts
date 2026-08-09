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
        ? `QAVision reúne capturas, grabaciones de áreas seleccionadas de la pantalla y herramientas de anotación. La versión ${qavisionTool.version} está disponible para Windows.`
        : `QAVision brings together screenshots, recordings of selected screen areas, and annotation tools. Version ${qavisionTool.version} is available for Windows.`,
      primary: product.external,
      secondary: {
        label: isEs ? "Ver productos" : "View products",
        href: getRoute("products", locale),
      },
    },
    overview: {
      eyebrow: isEs ? "Versión y compatibilidad" : "Release and compatibility",
      title: `QAVision ${qavisionTool.version}`,
      lead: isEs
        ? "Una aplicación de escritorio para documentar revisiones de software con capturas, grabaciones y anotaciones."
        : "A desktop application for documenting software reviews with screenshots, recordings, and annotations.",
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
              { title: "Capturas", text: "Pantalla completa, región o modo clip." },
              {
                title: "Grabación",
                text: "Video de un área seleccionada, con controles de reproducción.",
              },
              { title: "Anotaciones", text: "Capas, texto, formas y resaltado." },
              { title: "Organización", text: "Carpetas por cliente, entorno o tarea." },
            ]
          : [
              { title: "Screenshots", text: "Full screen, region, or clip mode." },
              { title: "Recording", text: "Video of a selected area, with playback controls." },
              { title: "Annotations", text: "Layers, text, shapes, and highlighting." },
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
      title: isEs ? "Descarga QAVision para Windows." : "Download QAVision for Windows.",
      text: isEs
        ? "Antes de instalar, compara el checksum SHA-256 con el valor publicado."
        : "Before installing, compare the SHA-256 checksum with the published value.",
      primary: product.external!,
      secondary: {
        label: isEs ? "Contactar a Quantix" : "Contact Quantix",
        href: getRoute("contact", locale),
      },
    },
  };
}

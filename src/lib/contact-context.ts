import { getRoute, normalizePath } from "../i18n/routes";
import { contactLinks } from "../data/site-config";
import type { Locale, ProductId } from "../types/site";

export const contactTopics = {
  proyecto: { es: "Un proyecto a medida", en: "A custom software project" },
  integraciones: { es: "Integrar mis herramientas", en: "Connecting my tools" },
  reportes: { es: "Datos y reportes", en: "Data and reporting" },
  automatizacion: { es: "Automatizar un proceso", en: "Automating a process" },
  modernizacion: { es: "Actualizar un sistema", en: "Updating a system" },
  viggo: { es: "VIGGO", en: "VIGGO" },
  takofy: { es: "Takofy", en: "Takofy" },
  oktara: { es: "Oktara", en: "Oktara" },
  tentrix: { es: "Tentrix", en: "Tentrix" },
  lendly: { es: "Lendly", en: "Lendly" },
  "hen-screenshots": { es: "Hen Screenshots", en: "Hen Screenshots" },
  "nica-finanzas": { es: "Nica Finanzas", en: "Nica Finanzas" },
  qavision: { es: "QAVision", en: "QAVision" },
} as const;

type ContactTopic = keyof typeof contactTopics;

export function parseContactTopic(value: string | null): ContactTopic | undefined {
  return value && Object.hasOwn(contactTopics, value) ? (value as ContactTopic) : undefined;
}

export function getContactHref(locale: Locale, topic: ContactTopic): string {
  return `${getRoute("contact", locale)}?sobre=${topic}`;
}

export function getContactMailto(locale: Locale, topic: ContactTopic): string {
  const subject = `${locale === "es" ? "Consulta" : "Enquiry"}: ${contactTopics[topic][locale]} · Quantix`;
  return `${contactLinks.email}?subject=${encodeURIComponent(subject)}`;
}

export function getPageContactTopic(pathname: string): ContactTopic | undefined {
  const path = normalizePath(pathname);
  const products: ProductId[] = [
    "viggo",
    "takofy",
    "oktara",
    "tentrix",
    "lendly",
    "hen-screenshots",
    "nica-finanzas",
    "qavision",
  ];
  return products.find((id) =>
    (["es", "en"] as const).some(
      (locale) =>
        path === getRoute(id, locale) ||
        ((id === "viggo" || id === "takofy") && path === getRoute(`case-${id}`, locale)),
    ),
  );
}

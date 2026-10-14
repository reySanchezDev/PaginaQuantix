import { getRoute } from "../i18n/routes";
import type { Locale, ProductId } from "../types/site";
import { siteConfig } from "../data/site-config";

const site = new URL(siteConfig.siteUrl);
export const organizationId = new URL("/#organization", site).href;
export const websiteId = new URL("/#website", site).href;

export function absoluteUrl(path: string): string {
  return new URL(path, site).href;
}

export function productId(id: ProductId): string {
  return absoluteUrl(`/#software-${id}`);
}

export function productPageSchema(id: ProductId, locale: Locale, name: string, description: string, operatingSystem?: string) {
  const url = absoluteUrl(getRoute(id, locale));
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": productId(id),
    name,
    description,
    url,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    publisher: { "@id": organizationId },
    applicationCategory: "BusinessApplication",
    ...(operatingSystem ? { operatingSystem } : {}),
  };
}

export function webpageSchema(path: string, title: string, description: string, locale: Locale) {
  const url = absoluteUrl(path);
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: locale,
    isPartOf: { "@id": websiteId },
    publisher: { "@id": organizationId },
  };
}

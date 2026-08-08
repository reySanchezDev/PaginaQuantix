import { getRoute, type RouteId } from "../i18n/routes";
import type { LinkItem, Locale, NavItem } from "../types/site";

const labels: Record<Locale, Record<RouteId, string>> = {
  es: {
    home: "Inicio",
    solutions: "Soluciones",
    products: "Productos",
    work: "Trabajo",
    about: "Nosotros",
    contact: "Contacto",
    privacy: "Privacidad",
    terms: "Términos",
    viggo: "VIGGO",
    takofy: "Takofy",
    "nica-finanzas": "Nica Finanzas",
    qavision: "QAVision",
  },
  en: {
    home: "Home",
    solutions: "Solutions",
    products: "Products",
    work: "Work",
    about: "About",
    contact: "Contact",
    privacy: "Privacy",
    terms: "Terms",
    viggo: "VIGGO",
    takofy: "Takofy",
    "nica-finanzas": "Nica Finanzas",
    qavision: "QAVision",
  },
};

const primaryRouteIds: RouteId[] = ["solutions", "products", "work", "about", "contact"];
const legalRouteIds: RouteId[] = ["privacy", "terms"];

function buildLinks(routeIds: RouteId[], locale: Locale): LinkItem[] {
  return routeIds.map((id) => ({
    label: labels[locale][id],
    href: getRoute(id, locale),
  }));
}

export const getPrimaryNavigation = (locale: Locale): NavItem[] =>
  primaryRouteIds.map((id) => ({
    id: id as NavItem["id"],
    label: labels[locale][id],
    href: getRoute(id, locale),
  }));
export const getLegalNavigation = (locale: Locale) => buildLinks(legalRouteIds, locale);

export const sharedUi = {
  es: {
    skip: "Saltar al contenido",
    primaryNav: "Navegación principal",
    mobileNav: "Navegación móvil",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    language: "Cambiar idioma a inglés",
    navigation: "Navegación",
    legal: "Legal",
    copyright: "Todos los derechos reservados.",
    footerText:
      "Productos de software listos para operar, adaptables y construidos a medida cuando el negocio lo necesita.",
    brandHome: "Inicio de Quantix Software",
    productAreas: "Áreas del producto",
  },
  en: {
    skip: "Skip to content",
    primaryNav: "Primary navigation",
    mobileNav: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Change language to Spanish",
    navigation: "Navigation",
    legal: "Legal",
    copyright: "All rights reserved.",
    footerText:
      "Ready-to-operate software products, adaptable and custom-built when the business needs it.",
    brandHome: "Quantix Software home",
    productAreas: "Product areas",
  },
} as const;

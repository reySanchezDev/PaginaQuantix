import { getRoute, type RouteId } from "../i18n/routes";
import type { LinkItem, Locale, NavItem } from "../types/site";

const labels: Record<Locale, Record<RouteId, string>> = {
  es: {
    home: "Inicio",
    solutions: "Soluciones",
    products: "Productos",
    work: "Cómo trabajamos",
    about: "Empresa",
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
    work: "How we work",
    about: "Company",
    contact: "Contact",
    privacy: "Privacy",
    terms: "Terms",
    viggo: "VIGGO",
    takofy: "Takofy",
    "nica-finanzas": "Nica Finanzas",
    qavision: "QAVision",
  },
};

const primaryRouteIds: RouteId[] = ["solutions", "products", "about", "contact"];
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
    process: "Cómo trabajamos",
    copyright: "Todos los derechos reservados.",
    footerText: "Productos propios y desarrollo de software para empresas.",
    brandHome: "Inicio de Quantix Software",
    socialImageAlt: "Quantix Software: productos y desarrollo de software para empresas",
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
    process: "How we work",
    copyright: "All rights reserved.",
    footerText: "Software products and custom development for businesses.",
    brandHome: "Quantix Software home",
    socialImageAlt: "Quantix Software: software products and custom development for businesses",
  },
} as const;

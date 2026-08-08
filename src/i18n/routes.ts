import type { Locale } from "../types/site";

const routeMap = {
  home: { es: "/es/", en: "/en/" },
  solutions: { es: "/es/soluciones/", en: "/en/solutions/" },
  products: { es: "/es/productos/", en: "/en/products/" },
  work: { es: "/es/trabajo/", en: "/en/work/" },
  about: { es: "/es/nosotros/", en: "/en/about/" },
  contact: { es: "/es/contacto/", en: "/en/contact/" },
  privacy: { es: "/es/privacidad/", en: "/en/privacy/" },
  terms: { es: "/es/terminos/", en: "/en/terms/" },
  viggo: { es: "/es/productos/viggo/", en: "/en/products/viggo/" },
  takofy: { es: "/es/productos/takofy/", en: "/en/products/takofy/" },
  "nica-finanzas": {
    es: "/es/productos/nica-finanzas/",
    en: "/en/products/nica-finanzas/",
  },
  qavision: { es: "/es/productos/qavision/", en: "/en/products/qavision/" },
} as const;

export type RouteId = keyof typeof routeMap;

export function normalizePath(pathname: string): string {
  const path = pathname.split(/[?#]/, 1)[0] || "/";
  return path.endsWith("/") ? path : `${path}/`;
}

export function getRoute(id: RouteId, locale: Locale): string {
  return routeMap[id][locale];
}

export function getAlternatePath(pathname: string, targetLocale: Locale): string {
  const normalized = normalizePath(pathname);
  const match = Object.values(routeMap).find(
    (routes) => routes.es === normalized || routes.en === normalized,
  );

  return match?.[targetLocale] ?? routeMap.home[targetLocale];
}

export function isRouteActive(pathname: string, routeId: RouteId): boolean {
  const normalized = normalizePath(pathname);
  const route = routeMap[routeId];

  if (routeId === "products") {
    return normalized.startsWith(route.es) || normalized.startsWith(route.en);
  }

  return normalized === route.es || normalized === route.en;
}

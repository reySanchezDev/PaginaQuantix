export type Locale = 'es' | 'en';
export type PageKey = 'home' | 'features' | 'how | 'help' | 'contact';
export const routeMap: Record<PageKey, Record<Locale, string>> = {
  home: {es: '/es/', en: '/en/'},
  features: {es: '/es/funciones/', en: '/en/features/'},
  how: {es: '/es/como-funciona/', en: '/en/how-it-works/'},
  help: {es: '/es/ayuda/', en: '/en/help/'},
  contact: {es: '/es/contacto/', en: '/en/contact/'},
};
export const pathFor = (key: PageKey, locale: Locale) => routeMap[key][locale];
export const paths = (Object.keys(routeMap) as PageKey[]).flatMap(key => (['es', 'en'] as Locale[]).map(locale => ({params: {lang: locale, slug: routeMap[key][locale].replace(/^\/(?:es|en)\//, '').replace(/\/$/, '') || undefined}, props: {locale, pageKey: key}})));

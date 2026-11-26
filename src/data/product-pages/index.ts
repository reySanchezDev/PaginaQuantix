import type { Locale, ProductId, ProductPageContent } from "../../types/site";
import { getHenScreenshotsPage } from "./hen-screenshots";
import { getLendlyPage } from "./lendly";
import { getNicaFinanzasPage } from "./nica-finanzas";
import { getOktaraPage } from "./oktara";
import { getQavisionPage } from "./qavision";
import { getTakofyPage } from "./takofy";
import { getTentrixPage } from "./tentrix";
import { getViggoPage } from "./viggo";

const factories: Partial<Record<ProductId, (locale: Locale) => ProductPageContent>> = {
  viggo: getViggoPage,
  takofy: getTakofyPage,
  oktara: getOktaraPage,
  tentrix: getTentrixPage,
  lendly: getLendlyPage,
  "hen-screenshots": getHenScreenshotsPage,
  "nica-finanzas": getNicaFinanzasPage,
  qavision: getQavisionPage,
};

export const getProductPage = (id: ProductId, locale: Locale) => {
  const factory = factories[id];
  if (!factory) throw new Error(`Product page not found: ${id}`);
  return factory(locale);
};

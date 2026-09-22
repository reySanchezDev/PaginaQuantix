import type { Locale, ProductId, ProductPageContent } from "../../types/site";
import { getNicaFinanzasPage } from "./nica-finanzas";
import { getOktaraPage } from "./oktara";
import { getQavisionPage } from "./qavision";
import { getTakofyPage } from "./takofy";
import { getTentrixPage } from "./tentrix";
import { getViggoPage } from "./viggo";

const factories: Record<ProductId, (locale: Locale) => ProductPageContent> = {
  viggo: getViggoPage,
  takofy: getTakofyPage,
  oktara: getOktaraPage,
  tentrix: getTentrixPage,
  "nica-finanzas": getNicaFinanzasPage,
  qavision: getQavisionPage,
};

export const getProductPage = (id: ProductId, locale: Locale) => factories[id](locale);

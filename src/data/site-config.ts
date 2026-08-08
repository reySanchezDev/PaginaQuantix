export const siteConfig = {
  name: "Quantix Software",
  siteUrl: "https://www.quantix.software",
  email: "contact@quantix.software",
  whatsappUrl: "https://wa.me/50585213462",
  whatsappDisplay: "+505 8521 3462",
  productUrls: {
    viggo: "https://facturaystock.com/viggo/",
    takofy: {
      es: "https://takofy.app/es/",
      en: "https://takofy.app/en/",
    },
    "nica-finanzas": "https://nicafinanzas.com/",
    qavision: "https://pub-7f7968ed52f3476cb305c24354c4468d.r2.dev/QAVision-Setup-1.0.3.exe",
  },
} as const;

export const contactLinks = {
  email: `mailto:${siteConfig.email}`,
  whatsapp: siteConfig.whatsappUrl,
} as const;

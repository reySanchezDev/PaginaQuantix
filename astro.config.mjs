import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.quantix.software",
  trailingSlash: "always",
  compressHTML: true,
  markdown: {
    syntaxHighlight: false,
  },
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return pathname !== "/" && pathname !== "/404/";
      },
    }),
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  security: {
    csp: {
      algorithm: "SHA-384",
      directives: [
        "default-src 'self'",
        "base-uri 'self'",
        "connect-src 'self' https://vitals.vercel-insights.com",
        "font-src 'self'",
        "form-action 'self' mailto:",
        "img-src 'self' data:",
        "media-src 'self'",
        "object-src 'none'",
      ],
      scriptDirective: {
        resources: ["'self'", "https://va.vercel-scripts.com"],
      },
      styleDirective: { resources: ["'self'"] },
    },
  },
  server: {
    port: 4321,
  },
});

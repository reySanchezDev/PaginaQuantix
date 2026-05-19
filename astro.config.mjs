import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: "https://www.quantix.software",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false
    }
  },
  server: {
    port: 4321,
    host: true
  }
});

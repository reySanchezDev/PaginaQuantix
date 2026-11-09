import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://cobroruta.quantix.software',
  trailingSlash: 'always',
  output: 'static',
  build: { format: 'directory' },
});

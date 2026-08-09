# Quantix Software

Corporate website built with Astro 7 as a bilingual, fully static site.

## Project Structure

```text
src/
  components/   Reusable UI, navigation, sections and page compositions
  data/         Localized content and product configuration
  i18n/         Canonical bilingual route manifest
  layouts/      Base and product layouts
  pages/        Public routes for English and Spanish content
  styles/       Global styles, design tokens and typography
public/
  images/       Static image assets
  videos/       Static video assets
```

## Local development

```sh
npm ci
npm run dev
```

The development server runs at `http://localhost:4321`.

Regenerate the localized Open Graph images after changing brand or product copy:

```sh
npm run generate:og
```

## Quality gates

```sh
npm run quality
```

This verifies formatting, lint rules, unused code, the 300-line source limit, Astro types, the production build, generated HTML, internal links, sitemap integrity, and dependency security.

## Architecture

- English routes use `/en/`; Spanish routes use `/es/`.
- On Vercel, `/` respects the saved language choice and then the browser's preferred language.
- Route translations, navigation state, language switching, canonicals, and hreflang derive from one manifest.
- Products and page content are configuration-driven and shared by both languages.
- Each route is a small composition over reusable layouts and components.
- Design values live in `src/styles/tokens.css`; component styles consume those tokens.
- The site ships as static HTML with a generated sitemap and production security headers.
- Social metadata uses localized 1200×630 images, with product-specific images on product routes.

## Runtime

- Node.js 22.21.1 or newer compatible release
- npm 10 or newer

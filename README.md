# Quantix Software

Corporate website built with Astro 7, with bilingual static pages.

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

## Contact

Email links use `mailto:` to open the visitor's configured email application, addressed to `contact@quantix.software`. Visitors send the message from their own application. The copy option writes the public contact address to the clipboard and confirms a successful copy with a toast, so visitors can paste it into their preferred email service.

Opening an email link also attempts to copy the address as a backup, while preserving native link navigation. The site does not try to infer whether an email app is installed. Copy confirmation appears only after the clipboard write succeeds; if access is denied, the notification presents a selectable address instead. The explicit copy button stays available on the contact page.

The website does not collect inquiries through a form or send email through a server endpoint. No email provider credentials are required. Clipboard access is limited to writing the contact address; the site does not read clipboard contents. WhatsApp is available as another contact channel.

To review the production build locally:

```sh
npm run build
npm run preview
```

## Architecture

- English routes use `/en/`; Spanish routes use `/es/`.
- On Vercel, `/` respects the saved language choice and then the browser's preferred language.
- Route translations, navigation state, language switching, canonicals, and hreflang derive from one manifest.
- Products and page content are configuration-driven and shared by both languages.
- Each route is a small composition over reusable layouts and components.
- Design values live in `src/styles/tokens.css`; component styles consume those tokens.
- Pages ship as static HTML with a generated sitemap and production security headers.
- Social metadata uses localized 1200×630 images, with product-specific images on product routes.

## Runtime

- Node.js 22.21.1 or newer compatible release
- npm 10 or newer

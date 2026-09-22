import { getRoute } from "../../i18n/routes";
import type { Locale, ProductPageContent } from "../../types/site";
import { getProduct } from "../products";

export function getHenScreenshotsPage(locale: Locale): ProductPageContent {
  const product = getProduct("hen-screenshots", locale);
  const isEs = locale === "es";

  return {
    id: "hen-screenshots",
    seo: {
      title: isEs ? "Hen Screenshots | Presenta tus apps" : "Hen Screenshots | Showcase your apps",
      description: product.description,
    },
    hero: {
      eyebrow: isEs ? "Herramienta open source" : "Open-source tool",
      title: isEs ? "Tu app, bien presentada." : "Your app, beautifully presented.",
      lead: isEs
        ? "Convierte capturas en imágenes para App Store, Google Play y portfolios usando plantillas, marcos de dispositivos, textos y colores editables."
        : "Turn captures into App Store, Google Play, and portfolio images with editable templates, device frames, text, and colors.",
      primary: product.external,
      secondary: {
        label: isEs ? "Explorar la herramienta" : "Explore the tool",
        href: "#overview-title",
      },
      image: {
        src: "/images/hen-screenshots/cover.webp",
        alt: isEs
          ? "Hen Screenshots: del producto a su presentación."
          : "Hen Screenshots: from product to presentation.",
        width: 1600,
        height: 1200,
        caption: isEs
          ? "Composición exportada desde Hen Screenshots."
          : "A composition exported from Hen Screenshots.",
      },
    },
    overview: {
      eyebrow: isEs ? "Diseña en el navegador" : "Design in the browser",
      title: isEs
        ? "De una captura a una serie lista para publicar"
        : "From one capture to a publish-ready series",
      lead: isEs
        ? "Hen Screenshots es gratis, no requiere cuenta, no añade marcas de agua y guarda los proyectos en tu navegador."
        : "Hen Screenshots is free, requires no account, adds no watermarks, and stores projects in your browser.",
      metrics: isEs
        ? [
            { title: "Plantillas", text: "Series y panoramas" },
            { title: "Dispositivos", text: "Móvil, tablet y desktop" },
            { title: "Idiomas", text: "Versiones y traducción local" },
            { title: "Exportación", text: "PNG, ZIP y proyecto editable" },
          ]
        : [
            { title: "Templates", text: "Series and panoramas" },
            { title: "Devices", text: "Mobile, tablet, and desktop" },
            { title: "Languages", text: "Versions and local translation" },
            { title: "Export", text: "PNG, ZIP, and editable project" },
          ],
    },
    sections: [],
    gallery: {
      eyebrow: isEs ? "La herramienta en uso" : "The tool in use",
      title: isEs ? "Diseña, revisa y exporta." : "Design, review, and export.",
      lead: isEs
        ? "Imágenes reales del producto y de su editor visual."
        : "Actual product images showing the visual editor.",
      layout: "stories",
      detailLabel: isEs ? "Ampliar imagen" : "Open full image",
      items: [
        {
          src: "/images/hen-screenshots/cover.webp",
          detailSrc: "/images/hen-screenshots/cover.webp",
          width: 1600,
          height: 1200,
          title: isEs
            ? "Presenta el producto, no solo la captura."
            : "Show the product, not just the capture.",
          alt: isEs
            ? "Composición para portfolio creada con Hen Screenshots."
            : "Portfolio composition created with Hen Screenshots.",
          caption: isEs
            ? "Combina capturas, marcos, textos y fondos en una composición lista para publicar."
            : "Combine captures, frames, text, and backgrounds in a publish-ready composition.",
        },
        {
          src: "/images/hen-screenshots/detail.webp",
          detailSrc: "/images/hen-screenshots/detail.webp",
          width: 1600,
          height: 1200,
          title: isEs ? "Edita una serie desde el estudio." : "Edit a series in the studio.",
          alt: isEs
            ? "Estudio de Hen Screenshots con plantillas y edición de una serie."
            : "Hen Screenshots studio with templates and series editing.",
          caption: isEs
            ? "Ajusta el diseño, crea versiones por idioma y conserva un proyecto editable."
            : "Adjust the design, create language versions, and keep an editable project.",
        },
      ],
    },
    cta: {
      eyebrow: "Hen Screenshots",
      title: isEs ? "Crea tu próxima serie." : "Create your next series.",
      text: isEs
        ? "Abre el estudio gratis, sin cuenta y sin marcas de agua."
        : "Open the studio for free, with no account or watermarks.",
      primary: product.external!,
      secondary: {
        label: isEs ? "Hablar con Quantix" : "Contact Quantix",
        href: getRoute("contact", locale),
      },
    },
  };
}

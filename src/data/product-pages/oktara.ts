import { getRoute } from "../../i18n/routes";
import type { Locale, ProductPageContent } from "../../types/site";
import { getProduct } from "../products";

export function getOktaraPage(locale: Locale): ProductPageContent {
  const product = getProduct("oktara", locale);
  const isEs = locale === "es";
  const imageRoot = `/images/oktara/${locale}`;

  return {
    id: "oktara",
    seo: {
      title: isEs
        ? "Oktara | Control operativo por sucursal"
        : "Oktara | Multi-location operations",
      description: product.description,
    },
    hero: {
      eyebrow: isEs ? "Operación de equipos y sucursales" : "Team and location operations",
      title: isEs
        ? "Control operativo en cada sucursal."
        : "Operational control across every location.",
      lead: isEs
        ? "Centraliza formularios, equipos y seguimiento. Estandariza tus rutinas, revisa el cumplimiento y detecta dónde necesita atención tu operación."
        : "Bring forms, teams, and follow-up together. Standardize routines, review completion, and identify where your operation needs attention.",
      primary: product.external,
      secondary: { label: isEs ? "Explorar Oktara" : "Explore Oktara", href: "#overview-title" },
      image: {
        src: `${imageRoot}/reports.png`,
        alt: isEs
          ? "Panel de reportes de Oktara con cumplimiento, calidad y seguimiento por sucursal."
          : "Oktara reporting dashboard showing completion, quality, and follow-up by location.",
        width: 1920,
        height: 1080,
        caption: isEs ? "Reportes con datos de demostración." : "Reports with demonstration data.",
      },
    },
    overview: {
      eyebrow: isEs ? "Operación visible" : "Visible operations",
      title: isEs
        ? "Estándares claros y seguimiento continuo"
        : "Clear standards and continuous follow-up",
      lead: isEs
        ? "Oktara conecta la definición del trabajo con su ejecución y sus resultados en cada ubicación."
        : "Oktara connects how work is defined with its execution and results at every location.",
      metrics: isEs
        ? [
            { title: "Formularios", text: "Preguntas, reglas y criterios" },
            { title: "Sucursales", text: "Asignaciones por ubicación" },
            { title: "Seguimiento", text: "Pendientes y responsables" },
            { title: "Reportes", text: "Cumplimiento y tendencias" },
          ]
        : [
            { title: "Forms", text: "Questions, rules, and scoring" },
            { title: "Locations", text: "Assignments by location" },
            { title: "Follow-up", text: "Pending work and owners" },
            { title: "Reports", text: "Completion and trends" },
          ],
    },
    sections: [],
    gallery: {
      eyebrow: isEs ? "El producto en uso" : "The product in use",
      title: isEs ? "De la rutina al hallazgo." : "From routine to finding.",
      lead: isEs
        ? "Capturas de Oktara con datos de demostración."
        : "Oktara screens with demonstration data.",
      layout: "stories",
      detailLabel: isEs ? "Ampliar captura" : "Open full capture",
      items: [
        {
          src: `${imageRoot}/reports.png`,
          detailSrc: `${imageRoot}/reports.png`,
          width: 1920,
          height: 1080,
          title: isEs ? "Revisa el estado de la operación." : "Review operational performance.",
          alt: isEs
            ? "Reportes de Oktara con indicadores de cumplimiento y calidad por sucursal."
            : "Oktara reports with completion and quality indicators by location.",
          caption: isEs
            ? "Consulta cumplimiento, calidad y tendencias para identificar dónde hace falta seguimiento."
            : "Review completion, quality, and trends to identify where follow-up is needed.",
        },
        {
          src: `${imageRoot}/forms.png`,
          detailSrc: `${imageRoot}/forms.png`,
          width: 1920,
          height: 1080,
          title: isEs ? "Define cómo debe hacerse el trabajo." : "Define how work should be done.",
          alt: isEs
            ? "Constructor de formularios de Oktara con preguntas, reglas y criterios de evaluación."
            : "Oktara form builder with questions, rules, and scoring criteria.",
          caption: isEs
            ? "Crea formularios, prueba sus respuestas y establece criterios consistentes para cada equipo."
            : "Build forms, test responses, and establish consistent criteria for every team.",
        },
      ],
    },
    cta: {
      eyebrow: "Oktara",
      title: isEs ? "Conoce Oktara." : "Meet Oktara.",
      text: isEs
        ? "Abre Oktara o habla con Quantix sobre la operación de tus equipos y sucursales."
        : "Open Oktara or talk to Quantix about operations across your teams and locations.",
      primary: product.external!,
      secondary: {
        label: isEs ? "Hablar con Quantix" : "Contact Quantix",
        href: getRoute("contact", locale),
      },
    },
  };
}

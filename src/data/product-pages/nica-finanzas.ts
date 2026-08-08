import { getRoute } from "../../i18n/routes";
import type { Locale, ProductPageContent } from "../../types/site";
import { getProduct } from "../products";

export function getNicaFinanzasPage(locale: Locale): ProductPageContent {
  const product = getProduct("nica-finanzas", locale);
  const isEs = locale === "es";

  return {
    id: "nica-finanzas",
    seo: {
      title: isEs
        ? "Nica Finanzas — Calculadoras para Nicaragua"
        : "Nica Finanzas — Calculators for Nicaragua",
      description: product.description,
    },
    hero: {
      eyebrow: isEs ? "Herramientas financieras gratuitas" : "Free financial tools",
      title: isEs ? "Cálculos locales, resultados claros" : "Local calculations, clear results",
      lead: product.description,
      primary: product.external,
      secondary: {
        label: isEs ? "Ver productos" : "View products",
        href: getRoute("products", locale),
      },
      highlights: isEs
        ? ["Salario", "Préstamos", "Liquidación laboral", "Parámetros de Nicaragua"]
        : ["Salary", "Loans", "Employment settlement", "Nicaragua-specific inputs"],
    },
    overview: {
      eyebrow: isEs ? "Utilidad local" : "Local utility",
      title: isEs
        ? "Herramientas prácticas para decisiones cotidianas"
        : "Practical tools for everyday decisions",
      lead: isEs
        ? "Nica Finanzas reúne cálculos frecuentes en una experiencia enfocada, con entradas comprensibles y resultados fáciles de revisar."
        : "Nica Finanzas brings common calculations into a focused experience with understandable inputs and results that are easy to review.",
      metrics: isEs
        ? [
            { title: "Salario", text: "Escenarios laborales" },
            { title: "Préstamos", text: "Cuotas y referencia" },
            { title: "Liquidación", text: "Cálculo laboral" },
            { title: "Contexto", text: "Parámetros locales" },
          ]
        : [
            { title: "Salary", text: "Employment scenarios" },
            { title: "Loans", text: "Payments and reference" },
            { title: "Settlement", text: "Employment calculation" },
            { title: "Context", text: "Local parameters" },
          ],
    },
    sections: [
      {
        eyebrow: isEs ? "Calculadoras" : "Calculators",
        title: isEs ? "Tres áreas financieras frecuentes" : "Three common financial areas",
        lead: isEs
          ? "Cada herramienta reduce el cálculo a los datos necesarios para el escenario."
          : "Each tool reduces the calculation to the data needed for the scenario.",
        items: isEs
          ? [
              {
                title: "Cálculo salarial",
                text: "Escenarios de salario con entradas específicas para Nicaragua.",
              },
              {
                title: "Cálculo de préstamos",
                text: "Referencia de cuotas y escenarios de financiamiento.",
              },
              {
                title: "Liquidación laboral",
                text: "Utilidad para revisar cálculos de liquidación con parámetros locales.",
              },
            ]
          : [
              {
                title: "Salary calculation",
                text: "Salary scenarios with Nicaragua-specific inputs.",
              },
              {
                title: "Loan calculation",
                text: "Reference for payments and financing scenarios.",
              },
              {
                title: "Employment settlement",
                text: "A utility for reviewing settlement calculations with local parameters.",
              },
            ],
      },
    ],
    cta: {
      eyebrow: "Nica Finanzas",
      title: isEs ? "Consulta las calculadoras gratuitas" : "Explore the free calculators",
      text: isEs
        ? "Visita Nica Finanzas o conversa con Quantix sobre herramientas financieras."
        : "Visit Nica Finanzas or talk to Quantix about financial tools.",
      primary: product.external!,
      secondary: {
        label: isEs ? "Contactar a Quantix" : "Contact Quantix",
        href: getRoute("contact", locale),
      },
    },
  };
}

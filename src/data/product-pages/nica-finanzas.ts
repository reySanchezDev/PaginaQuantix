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
        ? "Nica Finanzas | Calculadoras para Nicaragua"
        : "Nica Finanzas | Calculators for Nicaragua",
      description: product.description,
    },
    hero: {
      eyebrow: isEs ? "Herramientas financieras gratuitas" : "Free financial tools",
      title: isEs
        ? "Calculadoras financieras para Nicaragua."
        : "Financial calculators for Nicaragua.",
      lead: isEs
        ? "Estima salarios, cuotas de préstamo y liquidaciones laborales con parámetros locales."
        : "Estimate salaries, loan payments, and employment settlements using Nicaragua-specific parameters.",
      primary: product.external,
      image: {
        src: "/images/nica-finanzas/salario-detalle.webp",
        alt: isEs
          ? "Calculadora de salario de Nica Finanzas con ingreso, deducciones y salario neto."
          : "Nica Finanzas salary calculator with income, deductions, and take-home pay.",
        width: 1440,
        height: 1000,
        caption: isEs
          ? "El salario y sus deducciones, a la vista. Datos de ejemplo."
          : "Salary and deductions at a glance. Example data.",
      },
      secondary: {
        label: isEs ? "Ver productos" : "View products",
        href: getRoute("products", locale),
      },
    },
    overview: {
      eyebrow: isEs ? "Calculadoras" : "Calculators",
      title: isEs
        ? "Tres herramientas para cálculos frecuentes"
        : "Three tools for common financial calculations",
      lead: isEs
        ? "Cada calculadora pide solo los datos necesarios y presenta un resultado fácil de revisar."
        : "Each calculator asks only for the information it needs and returns a clear result.",
      metrics: [],
    },
    sections: [],
    gallery: {
      eyebrow: isEs ? "El producto en uso" : "The product in use",
      title: isEs
        ? "Salario, préstamos y liquidación."
        : "Salary, loans and employment settlements.",
      lead: isEs
        ? "Capturas reales de Nica Finanzas con datos de ejemplo. Amplía cada pantalla para revisar el detalle."
        : "Actual Nica Finanzas screens with example data. Open each capture to take a closer look.",
      layout: "stories",
      detailLabel: isEs ? "Ampliar captura" : "Open full capture",
      items: [
        {
          src: "/images/nica-finanzas/salario-detalle.webp",
          detailSrc: "/images/nica-finanzas/salario-detalle.webp",
          width: 1440,
          height: 1000,
          title: isEs ? "Del salario bruto al neto." : "From gross salary to take-home pay.",
          alt: isEs
            ? "Calculadora de salario mostrando el salario neto y las deducciones de INSS e IR para un ingreso mensual de ejemplo."
            : "Salary calculator showing take-home pay and INSS and income tax deductions for an example monthly income.",
          caption: isEs
            ? "Revisa cuánto recibes después de las deducciones, cambia entre la vista mensual y quincenal y consulta tus prestaciones."
            : "Review your pay after deductions, switch between monthly and twice-monthly views, and check your benefits.",
        },
        {
          src: "/images/nica-finanzas/prestamo-detalle.webp",
          detailSrc: "/images/nica-finanzas/prestamo-detalle.webp",
          width: 1440,
          height: 1000,
          title: isEs ? "Conoce el costo del préstamo." : "See the cost of a loan.",
          alt: isEs
            ? "Calculadora de préstamos con un ejemplo de monto, tasa y plazo, junto con la cuota mensual y el total de intereses."
            : "Loan calculator with example principal, rate and term, alongside the monthly payment and total interest.",
          caption: isEs
            ? "Introduce el monto, la tasa y el plazo para ver la cuota mensual, los intereses y el pago total. También puedes comparar tipos de amortización."
            : "Enter the amount, rate and term to see the monthly payment, interest and total repayment. You can also compare amortization methods.",
        },
        {
          src: "/images/nica-finanzas/liquidacion-detalle.webp",
          detailSrc: "/images/nica-finanzas/liquidacion-detalle.webp",
          width: 1440,
          height: 1000,
          title: isEs ? "Tu liquidación, por concepto." : "Your settlement, item by item.",
          alt: isEs
            ? "Calculadora de liquidación laboral con vacaciones, aguinaldo, indemnización, deducciones y neto a recibir en un caso de ejemplo."
            : "Employment settlement calculator showing vacation pay, annual bonus, severance, deductions and net pay for an example case.",
          caption: isEs
            ? "Consulta una estimación según tu salario, antigüedad, vacaciones y motivo de salida, con cada concepto separado."
            : "Get an estimate based on your salary, length of service, vacation days and reason for leaving, with each item shown separately.",
        },
      ],
    },
    cta: {
      eyebrow: "Nica Finanzas",
      title: isEs ? "Abre Nica Finanzas." : "Open Nica Finanzas.",
      text: isEs
        ? "Calcula salarios, préstamos o liquidaciones directamente en el sitio."
        : "Calculate salaries, loan payments, or employment settlements directly on the site.",
      primary: product.external!,
    },
  };
}

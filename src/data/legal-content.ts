import type { LegalPageContent, Locale } from "../types/site";
import { siteConfig } from "./site-config";

const content: Record<"privacy" | "terms", Record<Locale, LegalPageContent>> = {
  privacy: {
    es: {
      seo: {
        title: "Política de privacidad",
        description: "Política de privacidad del sitio web de Quantix Software.",
      },
      eyebrow: "Legal",
      title: "Política de privacidad",
      updatedLabel: "Última actualización",
      updated: "8 de agosto de 2026",
      intro:
        "Esta política explica qué información procesamos cuando visitas el sitio de Quantix Software y cómo puedes contactarnos sobre privacidad.",
      sections: [
        {
          title: "Información que recopilamos",
          paragraphs: [
            "Este sitio no ofrece cuentas de usuario ni procesa pagos. Si nos contactas por correo o WhatsApp, recibimos la información que decidas compartir por ese canal.",
          ],
        },
        {
          title: "Cómo usamos la información",
          paragraphs: [
            "Usamos la información de contacto únicamente para responder tus consultas, entender qué necesitas y darles seguimiento.",
          ],
        },
        {
          title: "Analítica",
          paragraphs: [
            "Este sitio utiliza Vercel Web Analytics para medir visitas y patrones de uso de forma agregada. No utilizamos esa información para crear perfiles sensibles ni vender datos personales.",
          ],
        },
        {
          title: "Servicios de terceros",
          paragraphs: [
            "Los enlaces externos, WhatsApp, correo, descargas y sitios de productos se rigen por las políticas de sus respectivos proveedores. Revisa esas políticas antes de compartir información.",
          ],
        },
        {
          title: "Tus opciones",
          paragraphs: [
            `Puedes solicitar información, corrección o eliminación de los datos que nos hayas enviado escribiendo a ${siteConfig.email}.`,
          ],
        },
      ],
    },
    en: {
      seo: {
        title: "Privacy policy",
        description: "Privacy policy for the Quantix Software website.",
      },
      eyebrow: "Legal",
      title: "Privacy policy",
      updatedLabel: "Last updated",
      updated: "August 8, 2026",
      intro:
        "This policy explains what information we process when you visit the Quantix Software website and how to contact us about privacy.",
      sections: [
        {
          title: "Information we collect",
          paragraphs: [
            "This website does not offer user accounts or process payments. If you contact us by email or WhatsApp, we receive the information you choose to share through that channel.",
          ],
        },
        {
          title: "How we use information",
          paragraphs: [
            "We use contact information only to respond to your inquiries, understand what you need, and follow up with you.",
          ],
        },
        {
          title: "Analytics",
          paragraphs: [
            "This website uses Vercel Web Analytics to measure visits and aggregated usage. We do not use that information to build sensitive profiles or sell personal data.",
          ],
        },
        {
          title: "Third-party services",
          paragraphs: [
            "External links, WhatsApp, email, downloads, and product websites are governed by their respective providers’ policies. Review those policies before sharing information.",
          ],
        },
        {
          title: "Your choices",
          paragraphs: [
            `You may request information, correction, or deletion of data you sent us by writing to ${siteConfig.email}.`,
          ],
        },
      ],
    },
  },
  terms: {
    es: {
      seo: {
        title: "Términos de uso",
        description: "Términos aplicables al uso del sitio web de Quantix Software.",
      },
      eyebrow: "Legal",
      title: "Términos de uso",
      updatedLabel: "Última actualización",
      updated: "8 de agosto de 2026",
      intro:
        "Al utilizar este sitio aceptas estos términos. Si no estás de acuerdo, no utilices el sitio ni los recursos a los que enlaza.",
      sections: [
        {
          title: "Contenido del sitio",
          paragraphs: [
            "La información se ofrece con fines generales y puede cambiar conforme evolucionan nuestros productos y servicios. Procuramos mantenerla precisa, pero no garantizamos que esté completa o libre de errores.",
          ],
        },
        {
          title: "Productos y servicios",
          paragraphs: [
            "Las descripciones del sitio no constituyen una oferta contractual. Alcance, precio, disponibilidad, soporte y condiciones se definen por separado antes de cualquier contratación.",
          ],
        },
        {
          title: "Propiedad intelectual",
          paragraphs: [
            "La marca, el diseño, el contenido y los materiales propios de Quantix están protegidos por las leyes aplicables. No puedes reproducirlos o redistribuirlos sin autorización.",
          ],
        },
        {
          title: "Servicios de terceros",
          paragraphs: [
            "El sitio enlaza a productos y servicios externos. Quantix no controla sus políticas, disponibilidad o contenido y no asume responsabilidad por su uso.",
          ],
        },
        {
          title: "Limitación de responsabilidad",
          paragraphs: [
            "En la medida permitida por la ley, Quantix no será responsable por daños indirectos derivados del uso de este sitio o de decisiones basadas en la información publicada aquí.",
          ],
        },
        {
          title: "Contacto",
          paragraphs: [`Para consultas sobre estos términos, escribe a ${siteConfig.email}.`],
        },
      ],
    },
    en: {
      seo: {
        title: "Website terms",
        description: "Terms that apply to use of the Quantix Software website.",
      },
      eyebrow: "Legal",
      title: "Website terms",
      updatedLabel: "Last updated",
      updated: "August 8, 2026",
      intro:
        "By using this website, you accept these terms. If you disagree, do not use the site or its linked resources.",
      sections: [
        {
          title: "Website content",
          paragraphs: [
            "Information is provided for general purposes and may change as our products and services evolve. We aim to keep it accurate but do not guarantee that it is complete or error-free.",
          ],
        },
        {
          title: "Products and services",
          paragraphs: [
            "Descriptions on this website do not constitute a contractual offer. Scope, price, availability, support, and conditions are defined separately before any engagement.",
          ],
        },
        {
          title: "Intellectual property",
          paragraphs: [
            "Quantix branding, design, content, and proprietary materials are protected by applicable laws. You may not reproduce or redistribute them without authorization.",
          ],
        },
        {
          title: "Third-party services",
          paragraphs: [
            "The website links to external products and services. Quantix does not control their policies, availability, or content and assumes no responsibility for their use.",
          ],
        },
        {
          title: "Limitation of liability",
          paragraphs: [
            "To the extent permitted by law, Quantix will not be liable for indirect damages arising from use of this website or reliance on information published here.",
          ],
        },
        {
          title: "Contact",
          paragraphs: [`For questions about these terms, write to ${siteConfig.email}.`],
        },
      ],
    },
  },
};

export const getLegalContent = (page: keyof typeof content, locale: Locale) =>
  content[page][locale];

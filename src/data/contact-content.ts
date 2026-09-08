import type { Locale } from "../types/site";

const content = {
  es: {
    eyebrow: "Hablemos de tu proyecto",
    title: "¿Qué necesita tu empresa?",
    lead: "Cuéntanos cómo trabaja tu equipo, qué herramientas usa y qué necesitas resolver. Con ese contexto podemos empezar a definir el alcance.",
    email: "Escríbenos",
    openEmail: "Abrir app de correo",
    copyEmail: "Copiar dirección",
    fallback:
      "¿No se abre tu app de correo? Copia la dirección y escríbenos desde donde prefieras.",
    whatsapp: "También por WhatsApp",
    nextTitle: "Después de tu consulta",
    nextText:
      "Revisamos lo que necesitas y te respondemos para coordinar una conversación. Antes de desarrollar, acordamos el alcance y la propuesta.",
    copied: "Dirección copiada",
    mailBackup: "Si no se abrió tu app de correo, ya tienes la dirección para pegarla.",
    copyDetail: "Pégala en tu correo cuando quieras escribirnos.",
    copyFailed: "Copia la dirección manualmente",
    copyFailedDetail: "El navegador no permitió copiarla. Puedes seleccionar la dirección aquí.",
    close: "Cerrar notificación",
    notification: "Contacto por correo",
  },
  en: {
    eyebrow: "Let’s talk about your project",
    title: "What does your business need?",
    lead: "Tell us how your team works, which tools it uses and what you need to solve. That context helps us start defining the scope.",
    email: "Write to us",
    openEmail: "Open email app",
    copyEmail: "Copy email address",
    fallback: "Email app not opening? Copy the address and write to us wherever you prefer.",
    whatsapp: "Also on WhatsApp",
    nextTitle: "After your inquiry",
    nextText:
      "We review what you need and reply to arrange a conversation. Before development starts, we agree on the scope and proposal.",
    copied: "Email address copied",
    mailBackup: "If your email app did not open, the address is ready to paste.",
    copyDetail: "Paste it into your email when you’re ready to write to us.",
    copyFailed: "Copy the address manually",
    copyFailedDetail: "Your browser did not allow copying. You can select the address here.",
    close: "Dismiss notification",
    notification: "Email contact",
  },
} as const;

export const getContactContent = (locale: Locale) => content[locale];

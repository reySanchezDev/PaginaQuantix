import { getRoute } from "../../i18n/routes";
import type { Locale, ProductPageContent } from "../../types/site";
import { getProduct } from "../products";

export function getTentrixPage(locale: Locale): ProductPageContent {
  const product = getProduct("tentrix", locale);
  const isEs = locale === "es";
  const imageRoot = "/images/tentrix/es";

  return {
    id: "tentrix",
    seo: {
      title: isEs
        ? "Tentrix | Gestión de soporte y tickets"
        : "Tentrix | Support and ticket management",
      description: product.description,
    },
    hero: {
      eyebrow: isEs ? "Soporte y mesa de ayuda" : "Support and help desk",
      title: isEs ? "Todo tu soporte, en un solo lugar." : "All your support, in one place.",
      lead: isEs
        ? "Centraliza las solicitudes de soporte, asigna responsables y sigue cada ticket hasta su resolución, con prioridades, vencimientos y contexto siempre visibles."
        : "Centralize support requests, assign owners, and follow every ticket through resolution, with priorities, deadlines, and context always visible.",
      primary: product.external,
      secondary: { label: isEs ? "Explorar Tentrix" : "Explore Tentrix", href: "#overview-title" },
      image: {
        src: `${imageRoot}/overview.png`,
        alt: isEs
          ? "Dashboard de Tentrix con estado de tickets, alertas operativas y actividad reciente."
          : "Tentrix dashboard with ticket statuses, operational alerts, and recent activity in Spanish.",
        width: 1920,
        height: 1080,
        caption: isEs
          ? "Captura con datos ficticios de demostración."
          : "Spanish interface with fictional demonstration data.",
      },
    },
    overview: {
      eyebrow: isEs ? "Soporte organizado" : "Organized support",
      title: isEs ? "Cada solicitud conserva su contexto" : "Every request keeps its context",
      lead: isEs
        ? "Tentrix reúne el trabajo pendiente, sus responsables y los tiempos de atención para que ningún caso se pierda."
        : "Tentrix brings pending work, ownership, and service times together so no case gets lost.",
      metrics: isEs
        ? [
            { title: "Tickets", text: "Solicitudes centralizadas" },
            { title: "Prioridades", text: "Estados y vencimientos" },
            { title: "Contexto", text: "Tareas, comentarios e historial" },
            { title: "Reportes", text: "Carga y tiempos de atención" },
          ]
        : [
            { title: "Tickets", text: "Centralized requests" },
            { title: "Priorities", text: "Statuses and deadlines" },
            { title: "Context", text: "Tasks, comments, and history" },
            { title: "Reports", text: "Workload and service times" },
          ],
    },
    sections: [],
    gallery: {
      eyebrow: isEs ? "El producto en uso" : "The product in use",
      title: isEs ? "De la solicitud a la resolución." : "From request to resolution.",
      lead: isEs
        ? "Capturas de Tentrix con datos ficticios de demostración."
        : "Tentrix screens are shown in Spanish with fictional demonstration data.",
      layout: "stories",
      detailLabel: isEs ? "Ampliar captura" : "Open full capture",
      items: [
        {
          src: `${imageRoot}/tickets.png`,
          detailSrc: `${imageRoot}/tickets.png`,
          width: 1920,
          height: 1080,
          title: isEs ? "Ordena el trabajo del día." : "Organize the day’s workload.",
          alt: isEs
            ? "Bandeja de Tentrix con filtros por estado, prioridad, responsable y vencimiento."
            : "Tentrix work queue in Spanish with status, priority, owner, and deadline filters.",
          caption: isEs
            ? "Filtra solicitudes por equipo, responsable, prioridad y fecha para decidir qué necesita atención."
            : "Filter requests by team, owner, priority, and date to decide what needs attention.",
        },
        {
          src: `${imageRoot}/detail.png`,
          detailSrc: `${imageRoot}/detail.png`,
          width: 1920,
          height: 1080,
          title: isEs ? "Mantén el contexto de cada caso." : "Keep the context of every case.",
          alt: isEs
            ? "Detalle de una incidencia en Tentrix con responsable, prioridad, tareas y tiempos."
            : "Tentrix incident details in Spanish with owner, priority, tasks, and service timing.",
          caption: isEs
            ? "Reúne tareas, subtickets, comentarios, adjuntos e historial aunque cambie el responsable."
            : "Keep tasks, subtickets, comments, attachments, and history together as ownership changes.",
        },
        {
          src: `${imageRoot}/reports.png`,
          detailSrc: `${imageRoot}/reports.png`,
          width: 1920,
          height: 1080,
          title: isEs ? "Revisa cómo avanza el soporte." : "Review support performance.",
          alt: isEs
            ? "Reporte de Tentrix con carga, tiempos de respuesta y objetivos de atención."
            : "Tentrix report in Spanish with workload, response times, and service targets.",
          caption: isEs
            ? "Consulta la carga, los pendientes y los tiempos de respuesta y resolución."
            : "Review workload, pending requests, response times, and resolution times.",
        },
      ],
    },
    cta: {
      eyebrow: "Tentrix",
      title: isEs ? "Conoce Tentrix." : "Meet Tentrix.",
      text: isEs
        ? "Abre Tentrix o habla con Quantix sobre el flujo de soporte de tu equipo."
        : "Open Tentrix or talk to Quantix about your team’s support workflow.",
      primary: product.external!,
      secondary: {
        label: isEs ? "Hablar con Quantix" : "Contact Quantix",
        href: getRoute("contact", locale),
      },
    },
  };
}

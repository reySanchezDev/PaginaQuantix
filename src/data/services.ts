export interface Service {
    id: string;
    icon: string;
    title: {
        es: string;
        en: string;
    };
    description: {
        es: string;
        en: string;
    };
}

export const services: Service[] = [
    {
        id: 'discovery',
        icon: 'compass',
        title: {
            es: 'Discovery & Roadmap (Producto)',
            en: 'Discovery & Roadmap (Product)'
        },
        description: {
            es: 'Alineamos objetivos, alcance y entregables. Definimos roadmap, riesgos y estimación realista.',
            en: 'We align objectives, scope, and deliverables. We define roadmaps, risks, and realistic estimation.'
        }
    },
    {
        id: 'ux-ui',
        icon: 'palette',
        title: {
            es: 'UX/UI & Design Systems',
            en: 'UX/UI & Design Systems'
        },
        description: {
            es: 'Interfaces claras y consistentes, con accesibilidad y experiencia premium desde el día 1.',
            en: 'Clear and consistent interfaces, with accessibility and a premium experience from day 1.'
        }
    },
    {
        id: 'web-pwa',
        icon: 'layout',
        title: {
            es: 'Desarrollo Web & PWA',
            en: 'Web Development & PWA'
        },
        description: {
            es: 'Apps web modernas, internas o públicas, optimizadas para performance y escalabilidad.',
            en: 'Modern web apps, internal or public, optimized for performance and scalability.'
        }
    },
    {
        id: 'mobile',
        icon: 'smartphone',
        title: {
            es: 'Apps móviles iOS/Android',
            en: 'Mobile Apps iOS/Android'
        },
        description: {
            es: 'Desarrollo nativo o multiplataforma con enfoque en estabilidad, rendimiento y releases controlados.',
            en: 'Native or cross-platform development focused on stability, performance, and controlled releases.'
        }
    },
    {
        id: 'apis',
        icon: 'link',
        title: {
            es: 'APIs & Integraciones (API-first)',
            en: 'APIs & Integrations (API-first)'
        },
        description: {
            es: 'Integramos ERP, POS, pagos, identidad, mensajería y sistemas legados con contratos claros y trazabilidad.',
            en: 'We integrate ERP, POS, payments, identity, messaging, and legacy systems with clear contracts and traceability.'
        }
    },
    {
        id: 'modernization',
        icon: 'refresh-cw',
        title: {
            es: 'Modernización de sistemas (Legacy to Modern)',
            en: 'System Modernization (Legacy to Modern)'
        },
        description: {
            es: 'Refactorización y migración de monolitos y sistemas críticos para reducir deuda técnica y acelerar delivery.',
            en: 'Refactoring and migration of monoliths and critical systems to reduce technical debt and accelerate delivery.'
        }
    },
    {
        id: 'cloud',
        icon: 'cloud',
        title: {
            es: 'Cloud-native & Microservicios',
            en: 'Cloud-native & Microservices'
        },
        description: {
            es: 'Arquitecturas modulares, contenedores, serverless cuando aplica y despliegues seguros.',
            en: 'Modular architectures, containers, serverless when applicable, and secure deployments.'
        }
    },
    {
        id: 'data-bi',
        icon: 'database',
        title: {
            es: 'Data Engineering & BI',
            en: 'Data Engineering & BI'
        },
        description: {
            es: 'Pipelines, calidad de datos, modelos y dashboards ejecutivos para operar con métricas reales.',
            en: 'Pipelines, data quality, models, and executive dashboards to operate with real metrics.'
        }
    },
    {
        id: 'ai',
        icon: 'cpu',
        title: {
            es: 'IA aplicada (GenAI con gobierno)',
            en: 'Applied AI (GenAI with governance)'
        },
        description: {
            es: 'Asistentes internos, búsqueda inteligente (RAG) y automatizaciones con controles de seguridad y datos.',
            en: 'Internal assistants, smart search (RAG), and automations with security and data controls.'
        }
    },
    {
        id: 'security',
        icon: 'shield-check',
        title: {
            es: 'Seguridad por diseño (Security-by-Design)',
            en: 'Security by Design (Security-by-Design)'
        },
        description: {
            es: 'Buenas prácticas, hardening, gestión de secretos, revisión de riesgos y cumplimiento desde el desarrollo.',
            en: 'Best practices, hardening, secrets management, risk review, and compliance from development.'
        }
    },
    {
        id: 'devops',
        icon: 'git-merge',
        title: {
            es: 'DevOps & CI/CD',
            en: 'DevOps & CI/CD'
        },
        description: {
            es: 'Pipelines, despliegues automatizados, rollback, ambientes y gobernanza para releases confiables.',
            en: 'Pipelines, automated deployments, rollbacks, environments, and governance for reliable releases.'
        }
    },
    {
        id: 'dynamics',
        icon: 'layers',
        title: {
            es: 'Microsoft Dynamics 365 BC / LS Central (AL)',
            en: 'Microsoft Dynamics 365 BC / LS Central (AL)'
        },
        description: {
            es: 'Extensiones en AL, integraciones, optimización y soporte experto para retail y operación.',
            en: 'AL extensions, integrations, optimization, and expert support for retail and operations.'
        }
    }
];

import { qavisionTool } from "./qavisionTool";

export interface Product {
    id: string;
    title: {
        es: string;
        en: string;
    };
    description: {
        es: string;
        en: string;
    };
    tags: string[];
    gradient: string;
    href: {
        es: string;
        en: string;
    };
    publicUrl?: string;
    target: '_self' | '_blank';
    isExternal: boolean;
    status: {
        es: string;
        en: string;
    };
    availabilityNote?: {
        es: string;
        en: string;
    };
    features: {
        es: string[];
        en: string[];
    };
}

export const products: Product[] = [
    {
        id: 'takofy',
        title: {
            es: 'Takofy',
            en: 'Takofy'
        },
        description: {
            es: 'Software de gestión para restaurantes diseñado para operación rápida, offline-first, comandas, mesas, pagos, reportes y flujos de cocina.',
            en: 'Restaurant management software built for fast, offline-first operations, orders, tables, payments, reporting and kitchen workflows.'
        },
        tags: ['Restaurants', 'POS', 'KDS', 'Inventory', 'Analytics'],
        gradient: 'linear-gradient(135deg, #EEF4FF 0%, #D9E7FF 52%, #C7F1F1 100%)',
        href: {
            es: '/es/productos/takofy/',
            en: '/en/products/takofy/',
        },
        publicUrl: 'https://takofy.app/es/',
        target: '_self',
        isExternal: false,
        status: {
            es: 'Publicado',
            en: 'Published'
        },
        features: {
            es: [
                'Operación offline-first para restaurantes',
                'Control de comandas, mesas y pagos',
                'KDS, analítica e inventario integrado'
            ],
            en: [
                'Offline-first restaurant operations',
                'Orders, tables, and payments control',
                'KDS, analytics, and integrated inventory'
            ]
        }
    },
    {
        id: 'nica-finanzas',
        title: {
            es: 'Nica Finanzas',
            en: 'Nica Finanzas'
        },
        description: {
            es: 'Calculadoras financieras para Nicaragua, incluyendo salario, préstamos y liquidación laboral.',
            en: 'Financial calculators for Nicaragua, including salary, loan and employment settlement calculations.'
        },
        tags: ['Finance', 'Calculators', 'Salary', 'Loans', 'Nicaragua'],
        gradient: 'linear-gradient(135deg, #EAFBF7 0%, #D4F2E9 48%, #D9E7FF 100%)',
        href: {
            es: '/es/productos/nica-finanzas/',
            en: '/en/products/nica-finanzas/',
        },
        publicUrl: 'https://nicafinanzas.com/',
        target: '_self',
        isExternal: false,
        status: {
            es: 'Publicado',
            en: 'Published'
        },
        features: {
            es: [
                'Calculadora salarial para Nicaragua',
                'Cálculos de préstamos',
                'Liquidación laboral'
            ],
            en: [
                'Salary calculator for Nicaragua',
                'Loan calculations',
                'Employment settlement calculations'
            ]
        }
    },
    {
        id: 'qavision',
        title: {
            es: 'QAVision',
            en: 'QAVision'
        },
        description: {
            es: 'Herramienta gratuita de evidencia QA creada por Quantix para captura visual, grabación por zona, anotaciones y organización de evidencia.',
            en: 'Free QA evidence tool created by Quantix for visual capture, zone recording, annotations and evidence organization.'
        },
        tags: ['QA', 'Evidence', 'Screen Capture', 'Video Recording', 'Windows'],
        gradient: 'linear-gradient(135deg, #F3F7FF 0%, #E2ECFF 48%, #EAFBF7 100%)',
        href: {
            es: '/es/productos/qavision/',
            en: '/en/products/qavision/',
        },
        publicUrl: qavisionTool.downloadUrl,
        target: '_self',
        isExternal: false,
        status: {
            es: 'Herramienta gratuita',
            en: 'Free tool'
        },
        features: {
            es: [
                'Captura de pantalla multi-modo',
                'Grabación de video por zona con FFmpeg',
                'Visor Pro con anotaciones y edición enriquecida'
            ],
            en: [
                'Multi-mode screen capture',
                'Zone video recording with FFmpeg',
                'Pro Viewer with annotations and rich editing'
            ]
        }
    }
];

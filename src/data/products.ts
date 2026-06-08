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
    category?: {
        es: string;
        en: string;
    };
    gradient: string;
    href: {
        es: string;
        en: string;
    };
    publicUrl?: string;
    externalLabel?: {
        es: string;
        en: string;
    };
    launchDate?: {
        es: string;
        en: string;
    };
    target: '_self' | '_blank';
    isExternal: boolean;
    featured?: boolean;
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
        id: 'viggo',
        title: {
            es: 'VIGGO',
            en: 'VIGGO'
        },
        description: {
            es: 'Plataforma integral para negocios que venden servicios, productos o ambos: clientes, cobros, caja, inventario, credenciales, accesos e historial en una sola operación.',
            en: 'Integrated operations platform for businesses that sell services, products, or both: customers, payments, cash desk, inventory, credentials, access control, and history in one operating flow.'
        },
        tags: ['Operations', 'Customers', 'Cash Desk', 'Inventory', 'Access Control'],
        category: {
            es: 'Operación integral',
            en: 'Integrated operations'
        },
        gradient: 'linear-gradient(135deg, #EEF2FF 0%, #DCE5FF 46%, #F4E7C1 100%)',
        href: {
            es: '/es/productos/viggo/',
            en: '/en/products/viggo/',
        },
        externalLabel: {
            es: 'Solicitar información',
            en: 'Request information'
        },
        launchDate: {
            es: 'Miércoles 10 de junio de 2026',
            en: 'Wednesday, June 10, 2026'
        },
        target: '_self',
        isExternal: false,
        featured: true,
        status: {
            es: 'Próximo lanzamiento',
            en: 'Coming soon'
        },
        availabilityNote: {
            es: 'VIGGO estará disponible el miércoles 10 de junio de 2026. Mientras tanto, puedes conocer el producto y solicitar información a Quantix.',
            en: 'VIGGO launches on Wednesday, June 10, 2026. Until then, you can explore the product and request information from Quantix.'
        },
        features: {
            es: [
                'Clientes, servicios, vigencias y renovaciones',
                'Caja, cobros, transacciones e historial',
                'Inventario, productos, stock y movimientos',
                'Credencial digital y validación operativa'
            ],
            en: [
                'Customers, services, validity periods, and renewals',
                'Cash desk, payments, transactions, and history',
                'Inventory, products, stock, and movements',
                'Digital credential and operational validation'
            ]
        }
    },
    {
        id: 'takofy',
        title: {
            es: 'Takofy',
            en: 'Takofy'
        },
        description: {
            es: 'Software de gestión para restaurantes diseñado para operación rápida, continuidad sin conexión, comandas, mesas, pagos, reportes y flujos de cocina.',
            en: 'Restaurant management software built for fast operations, continuity without connection, orders, tables, payments, reporting and kitchen workflows.'
        },
        tags: ['Restaurants', 'POS', 'KDS', 'Inventory', 'Analytics'],
        category: {
            es: 'Operaciones de restaurantes',
            en: 'Restaurant operations'
        },
        gradient: 'linear-gradient(135deg, #EEF4FF 0%, #D9E7FF 52%, #C7F1F1 100%)',
        href: {
            es: '/es/productos/takofy/',
            en: '/en/products/takofy/',
        },
        publicUrl: 'https://takofy.app/es/',
        externalLabel: {
            es: 'Visitar sitio web',
            en: 'Visit website'
        },
        target: '_self',
        isExternal: false,
        status: {
            es: 'Publicado',
            en: 'Published'
        },
        features: {
            es: [
                'Operación continua incluso sin conexión',
                'Control de comandas, mesas y pagos',
                'KDS, analítica e inventario integrado'
            ],
            en: [
                'Continuous restaurant operations even without connection',
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
        category: {
            es: 'Herramientas financieras',
            en: 'Financial tools'
        },
        gradient: 'linear-gradient(135deg, #EAFBF7 0%, #D4F2E9 48%, #D9E7FF 100%)',
        href: {
            es: '/es/productos/nica-finanzas/',
            en: '/en/products/nica-finanzas/',
        },
        publicUrl: 'https://nicafinanzas.com/',
        externalLabel: {
            es: 'Visitar sitio web',
            en: 'Visit website'
        },
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
        category: {
            es: 'Herramienta de evidencia QA',
            en: 'QA evidence tool'
        },
        gradient: 'linear-gradient(135deg, #F3F7FF 0%, #E2ECFF 48%, #EAFBF7 100%)',
        href: {
            es: '/es/productos/qavision/',
            en: '/en/products/qavision/',
        },
        publicUrl: qavisionTool.downloadUrl,
        externalLabel: {
            es: 'Descargar',
            en: 'Download'
        },
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

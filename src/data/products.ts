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
    target: '_self' | '_blank';
    isExternal: boolean;
    status: {
        es: string;
        en: string;
    };
    availabilityNote: {
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
        id: 'quantix',
        title: {
            es: 'Quantix',
            en: 'Quantix'
        },
        description: {
            es: 'Plataforma operacional para inventario, facturación, caja, reportes y control de permisos.',
            en: 'Operational platform for inventory, billing, cash control, reporting, and permissions.'
        },
        tags: ['Inventory', 'Billing', 'POS', 'Reporting', 'Security'],
        gradient: 'linear-gradient(135deg, #EEF4FF 0%, #D9E7FF 52%, #C7F1F1 100%)',
        href: {
            es: '/es/productos/quantix/',
            en: '/en/products/quantix/',
        },
        target: '_self',
        isExternal: false,
        status: {
            es: 'En desarrollo',
            en: 'In Development'
        },
        availabilityNote: {
            es: 'Este producto se encuentra actualmente en desarrollo privado y aún no está disponible públicamente.',
            en: 'This product is currently in private development and is not publicly available yet.'
        },
        features: {
            es: [
                'Inventario en tiempo real con alertas operativas',
                'Facturación ágil para impuestos, descuentos y reglas de negocio',
                'Reportes inteligentes y datos disponibles al instante',
                'Control de caja y transacciones con mayor precisión',
                'Seguridad y permisos para proteger la operación'
            ],
            en: [
                'Real-time inventory with operational alerts',
                'Billing workflows for taxes, discounts, and business rules',
                'Smart reports and data available instantly',
                'Cash control and transactions with greater precision',
                'Security and permissions to protect operations'
            ]
        }
    },
    {
        id: 'nica-planilla',
        title: {
            es: 'Nica Planilla',
            en: 'Nica Payroll'
        },
        description: {
            es: 'Producto regional para gestión de planilla y recursos humanos adaptado al mercado nicaragüense.',
            en: 'Regional payroll and HR product tailored for Nicaraguan business operations.'
        },
        tags: ['HR', 'Payroll', 'Nicaragua'],
        gradient: 'linear-gradient(135deg, #EAFBF7 0%, #D4F2E9 48%, #D9E7FF 100%)',
        href: {
            es: '/es/productos/nica-planilla/',
            en: '/en/products/nica-payroll/',
        },
        target: '_self',
        isExternal: false,
        status: {
            es: 'Beta privada',
            en: 'Private Beta'
        },
        availabilityNote: {
            es: 'Este producto se encuentra actualmente en beta privada y aún no está disponible públicamente.',
            en: 'This product is currently in private beta and is not publicly available yet.'
        },
        features: {
            es: [
                'Cálculo automático de INSS/IR',
                'Gestión de vacaciones',
                'Reportes para DGI'
            ],
            en: [
                'Automatic INSS/IR calculation',
                'Vacation management',
                'DGI-ready reports'
            ]
        }
    }
];

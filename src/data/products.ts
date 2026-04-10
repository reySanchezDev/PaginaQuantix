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
            es: 'Inventario y facturación sin errores, con control total. Define tus reglas y opera con datos precisos en tiempo real.',
            en: 'Flawless inventory and billing, with total control. Define your rules and operate with precise, real-time data.'
        },
        tags: ['Inventario', 'Facturación', 'Caja', 'Reportes', 'Seguridad'],
        gradient: 'linear-gradient(135deg, #EEF4FF 0%, #D9E7FF 52%, #C7F1F1 100%)',
        href: {
            es: '/es/productos/quantix/',
            en: '/en/products/quantix/',
        },
        target: '_self',
        isExternal: false,
        features: {
            es: [
                'Inventario en tiempo real con alertas inteligentes',
                'Facturación ágil: automatiza cálculos, impuestos y descuentos',
                'Reportes inteligentes y datos disponibles al instante',
                'Control de caja y transacciones con mayor precisión',
                'Seguridad y permisos: controla accesos y protege la operación'
            ],
            en: [
                'Real-time inventory with smart alerts',
                'Agile billing: automate calculations, taxes, and discounts',
                'Smart reports and data available instantly',
                'Cash control and transactions with greater precision',
                'Security and permissions: control access and protect operations'
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
            es: 'La solución definitiva para la gestión de nómina y recursos humanos adaptada a la normativa local.',
            en: 'The ultimate solution for payroll and HR management tailored to local regulations.'
        },
        tags: ['HR', 'Payroll', 'Legal'],
        gradient: 'linear-gradient(135deg, #EAFBF7 0%, #D4F2E9 48%, #D9E7FF 100%)',
        href: {
            es: '/es/productos/nica-planilla/',
            en: '/en/products/nica-payroll/',
        },
        target: '_self',
        isExternal: false,
        features: {
            es: [
                'Cálculo automático de INSS/IR',
                'Gestión de vacaciones',
                'Reportes para DGI'
            ],
            en: [
                'Automatic INSS/IR calculation',
                'Vacation management',
                'DGI-compliant reports'
            ]
        }
    }
];

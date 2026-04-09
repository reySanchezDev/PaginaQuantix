export interface CommunityTool {
    id: string;
    title: string;
    type: string;
    version: string;
    description: {
        es: string;
        en: string;
    };
    tags: string[];
    features: {
        es: string[];
        en: string[];
    };
    downloadUrl: string;
    icon: string;
}

export const communityTools: CommunityTool[] = [
    {
        id: 'qavision',
        title: 'QAVision',
        type: 'Windows Installer (.exe)',
        version: '1.0.3',
        description: {
            es: 'Potente herramienta de apoyo para equipos de QA que combina captura de pantalla de alta fidelidad, grabación de video por zona con FFmpeg y un visor profesional con edición enriquecida. Diseñada para documentar evidencia visual con precisión quirúrgica y organización automática por contextos de trabajo.',
            en: 'Powerful support tool for QA teams combining high-fidelity screen capture, zone video recording with FFmpeg, and a professional viewer with rich editing. Designed to document visual evidence with surgical precision and automatic organization by work context.'
        },
        tags: ['QA', 'Software Testing', 'Evidence Collection', 'Video Recording', 'Windows'],
        features: {
            es: [
                'Novedad v1.0.3: Nuevo flujo Modo Clip con selección de área y nomenclatura automática',
                'Novedad v1.0.3: Mejoras de estabilidad, cierre seguro y sustitución de carpetas',
                'Captura rápida multí-modo: pantalla completa, por región y modo clip (PNG alta fidelidad)',
                'Visor Pro Avanzado: anotaciones vectoriales, capas y herramientas de resaltado visual',
                'Edición Enriquecida: panel de texto con formato (negrita, resaltados, alineación y colores)',
                'Grabación de Video por Zona: documenta flujos dinámicos con HUD de control y FFmpeg',
                'Autosave & Recuperación: autoguardado de borrador y restauración de sesión al reabrir',
                'Organización por Carpetas: gestión de evidencias por contexto, cliente o ambiente',
                'Productividad Floating: ventana acoplable siempre visible para acceso instantáneo'
            ],
            en: [
                'New in v1.0.3: New Clip Mode flow with area selection and automatic nomenclature',
                'New in v1.0.3: Stability improvements, safe shutdown, and folder replacement fix',
                'Multi-mode quick capture: full screen, region, and clip mode (high-fidelity PNG)',
                'Advanced Visor Pro: vector annotations, layers, and visual highlighting tools',
                'Rich Editing: text panel with formatting (bold, highlighting, alignment, and colors)',
                'Zone Video Recording: document dynamic flows with control HUD and FFmpeg',
                'Autosave & Recovery: draft autosaving and session restoration upon reopening',
                'Folder Organization: evidence management by context, client, or environment',
                'Floating Productivity: dockable window always visible for instant access'
            ]
        },
        downloadUrl: 'https://pub-7f7968ed52f3476cb305c24354c4468d.r2.dev/QAVision-Setup-1.0.3.exe',
        icon: 'camera' // Use simple identifier for SVG rendering later
    }
];

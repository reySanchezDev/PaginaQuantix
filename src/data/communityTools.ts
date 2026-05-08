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
            es: 'Herramienta de apoyo para equipos de QA que combina captura de pantalla, grabación de video por zona con FFmpeg y un visor profesional con edición enriquecida. Diseñada para documentar evidencia visual con precisión y organización por contexto de trabajo.',
            en: 'Support tool for QA teams combining screen capture, zone video recording with FFmpeg, and a professional viewer with rich editing. Designed to document visual evidence with precision and organization by work context.'
        },
        tags: ['QA', 'Software Testing', 'Evidence Collection', 'Video Recording', 'Windows'],
        features: {
            es: [
                'Nuevo en v1.0.3: flujo Modo Clip con selección de área y nomenclatura automática',
                'Nuevo en v1.0.3: mejoras de estabilidad, cierre seguro y sustitución de carpetas',
                'Captura rápida multi-modo: pantalla completa, región y modo clip en PNG',
                'Visor Pro Avanzado: anotaciones vectoriales, capas y resaltado visual',
                'Edición enriquecida: panel de texto con formato, resaltados, alineación y colores',
                'Grabación de video por zona con HUD de control y FFmpeg',
                'Autosave y recuperación de borradores al reabrir',
                'Organización por carpetas según contexto, cliente o ambiente',
                'Ventana acoplable para acceso rápido durante el trabajo'
            ],
            en: [
                'New in v1.0.3: Clip Mode flow with area selection and automatic naming',
                'New in v1.0.3: stability improvements, safe shutdown, and folder replacement fix',
                'Multi-mode quick capture: full screen, region, and clip mode in PNG',
                'Advanced Pro Viewer: vector annotations, layers, and visual highlighting',
                'Rich editing: text panel with formatting, highlighting, alignment, and colors',
                'Zone video recording with control HUD and FFmpeg',
                'Autosave and draft recovery when reopening',
                'Folder organization by context, client, or environment',
                'Dockable window for quick access during work'
            ]
        },
        downloadUrl: 'https://pub-7f7968ed52f3476cb305c24354c4468d.r2.dev/QAVision-Setup-1.0.3.exe',
        icon: 'camera'
    }
];

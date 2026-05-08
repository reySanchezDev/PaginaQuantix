export interface ReleaseLog {
  version?: string;
  date?: string;
  tool: string;
  status: 'released' | 'upcoming';
  changes: {
    es: string[];
    en: string[];
  };
}

export const releaseHistory: ReleaseLog[] = [
  {
    tool: 'QAVision',
    status: 'upcoming',
    changes: {
      es: [
        'Se incorporarán nuevas herramientas de edición avanzada en el visor pro.',
        'Soporte para grabación de video en pantallas y monitores específicos.'
      ],
      en: [
        'New advanced editing tools will be added to the pro viewer.',
        'Support for video recording on specific screens and monitors.'
      ]
    }
  },
  {
    version: '1.0.3',
    date: '2026-04-09',
    tool: 'QAVision',
    status: 'released',
    changes: {
      es: [
        'Nuevo flujo de modo clip con selección de área exacta para mayor precisión.',
        'Nomenclatura automática para secuencias de capturas consecutivas.',
        'Ventana dedicada para nombrar capturas con opciones de omitir o cancelar.',
        'Aviso de finalización de capturas continuas con botón OK y cierre automático.',
        'Optimización del cierre del sistema para evitar bloqueos por clics múltiples.',
        'Corrección en la sustitución de carpetas en los slots de la ventana flotante.',
        'Mejoras visuales y de enfoque en ventanas de interfaz para Windows.'
      ],
      en: [
        'New clip mode flow with exact area selection for higher precision.',
        'Automatic naming for consecutive capture sequences.',
        'Dedicated naming window with options to skip or cancel.',
        'Continuous capture completion notice with OK button and automatic closing.',
        'System shutdown optimization to prevent locks from multiple clicks.',
        'Fixed folder replacement in floating window slots.',
        'Visual and focus improvements for Windows interface windows.'
      ]
    }
  }
];

export interface ReleaseLog {
  version?: string;
  date?: string;
  status: "released";
  changes: {
    es: string[];
    en: string[];
  };
}

export const releaseHistory: ReleaseLog[] = [
  {
    version: "1.0.3",
    date: "2026-04-09",
    status: "released",
    changes: {
      es: [
        "Nuevo modo Clip con selección precisa del área.",
        "Nombres automáticos para secuencias de capturas consecutivas.",
        "Nueva ventana para nombrar capturas, con opciones para omitir o cancelar.",
        "Aviso al finalizar una captura continua, con confirmación y cierre automático.",
        "El cierre de la aplicación ya no se bloquea al hacer varios clics.",
        "Corrección de un error al reemplazar carpetas en la ventana flotante.",
        "Mejoras visuales y de foco en las ventanas de la aplicación.",
      ],
      en: [
        "New Clip mode with precise area selection.",
        "Automatic naming for consecutive capture sequences.",
        "New capture-naming window with options to skip or cancel.",
        "Completion notice for continuous capture, with confirmation and automatic closing.",
        "Improved application shutdown to prevent freezes caused by repeated clicks.",
        "Fixed folder replacement in the floating window.",
        "Visual and focus improvements across application windows.",
      ],
    },
  },
];

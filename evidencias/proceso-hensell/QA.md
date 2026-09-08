# Proceso de trabajo — rama hensell

La sección presenta cada etapa con su actividad, el entregable y la participación del cliente. El encabezado pasa a la parte superior y las cuatro etapas ocupan filas completas, sin numeración decorativa ni contenido oculto. Se mantienen las fuentes y los colores de Quantix.

Se actualizaron español e inglés. La sección utiliza `ProcessSection.astro`; los acordeones de soluciones y productos siguen en `ContentSection.astro`.

## Verificación

- Revisión visual en escritorio a 1024 px, móvil a 390 px y la versión en inglés a 320 px. Se comprobó también la transición desde la última etapa a los casos de Takofy y VIGGO.
- Comprobación del DOM en ambos idiomas a 320, 390, 768, 1024 y 1440 px: cuatro etapas, sin desbordamientos de página ni recortes de texto. Resultados en `responsive.json`.
- Lista ordenada semántica con títulos por etapa y listas de definición para entregables y participación. Todo el contenido permanece visible.
- Regresión en Soluciones: Integraciones abre con clic, cierra con Enter, conserva el foco y mantiene la transición de 260 ms.
- Prettier, ESLint, límites de tamaño, Astro y Knip sin incidencias. Compilación y validación de las 30 páginas correctas. `git diff --check` sin errores.

## Capturas

- `proceso-desktop-1024.png`
- `proceso-mobile-390.png`
- `process-en-320.png`

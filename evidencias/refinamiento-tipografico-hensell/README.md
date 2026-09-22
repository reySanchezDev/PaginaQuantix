# Refinamiento visual de Quantix — hensell

Se unificó la web en dos familias: Bricolage Grotesque para títulos e IBM Plex Sans para lectura, navegación y controles. Se retiraron Georgia, las cursivas editoriales y Plex Mono, y se centralizaron los tamaños por función.

El refinamiento incluye inicio, catálogo, las cuatro fichas de producto, soluciones, proceso, empresa, contacto, legales y 404. Se conservaron la paleta cálida, las rutas, las capturas reales y los medios existentes.

## Cambios principales

- Inicio con contenido más directo, soluciones comparadas en filas y captura completa de VIGGO.
- Fichas con jerarquía compacta y galerías de capturas reales; los pósteres profesionales permanecen en el hero de Takofy y Nica Finanzas.
- Navegación, botones, etiquetas, llamadas a la acción y footer simplificados.
- Contenido visible inmediatamente al desplazarse, sin revelados por sección.
- Menú con posición conservada al reabrirse durante el cierre; formulario que rechaza campos obligatorios con solo espacios.

## Verificación

- Las 24 páginas localizadas se recorrieron en español e inglés a 1440 × 1000 y 390 × 844.
- Casos adicionales: inicio en inglés a 768 y 1024 px, inicio y Takofy a 320 px, Nica Finanzas y QAVision a 320 px, 404 a 1440 y 320 px, menú en horizontal a 844 × 390.
- Sin desbordamiento horizontal del documento ni imágenes rotas en los recorridos registrados en `qa-results.json`.
- Revisión visual independiente de inicio, productos, servicios, contacto y páginas legales mediante capturas de viewport.
- Comprobados formulario ES/EN, espacios vacíos, correo inválido y opcional, vista previa y edición, selección de producto, acordeones con clic/teclado, cambio de idioma, reapertura del menú y reproducción del vídeo de VIGGO.
- La captura ampliada de Takofy carga a su resolución original de 1280 × 720. El navegador integrado no expuso una pestaña nueva al pulsar el enlace, por lo que se verificó su destino directamente.
- No se enviaron mensajes ni se publicaron cambios.

`npm run quality` pasó: formato, ESLint, Knip, límite de tamaño, Astro sin errores ni advertencias, build y validación de 26 archivos HTML. Auditoría de dependencias: 0 vulnerabilidades. `git diff --check` limpio.

## Evidencia

`after/` contiene heroes y secciones capturados por viewport. Los archivos `english-mobile-overview-*.png` reúnen los heroes en inglés. Las capturas completas automáticas se descartaron por artefactos de composición del navegador; no se usaron para aprobar el resultado.

La vista local está en http://127.0.0.1:4322/es/productos/takofy/.

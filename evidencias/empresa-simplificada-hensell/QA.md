# Empresa: simplificación de contenido

Se eliminó la sección repetida de entregables, sus textos ES/EN y sus estilos. Empresa conserva la presentación de los fundadores, los casos de Takofy y VIGGO y la invitación a contactar. Al cierre de los casos se añadió un enlace a la sección de proceso del idioma correspondiente.

## Verificación

- Revisión visual de la transición desde VIGGO al contacto en navegador a 1024 y 390 px; capturas adjuntas.
- Diez comprobaciones del DOM: ES/EN a 320, 390, 768, 1024 y 1440 px. Sin desbordamiento horizontal, tres secciones principales y enlace con área de 44 px de alto. Datos en `responsive.json`.
- Clic en el enlace de ambos idiomas: abre la sección de proceso correcta.
- Prettier, ESLint, Astro, Knip, límite de tamaño de archivos y `git diff --check` correctos. Compilación y validación de las 30 páginas correctas.
- QA realizada en el navegador con tamaños de viewport simulados; no se usaron dispositivos físicos.

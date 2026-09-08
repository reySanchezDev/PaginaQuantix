# Qué hacemos — portada

Se compactó la introducción, se dio prioridad visual al desarrollo a medida y se presentaron las integraciones y la adaptación de productos según la necesidad del cliente. Las tres filas permanecen abiertas y comparten alineación. La sección termina con un único enlace a Soluciones, localizado en español e inglés.

## Verificación

- Revisión visual en escritorio a 1024 px, móvil a 390 px y la versión en inglés a 320 px. Capturas adjuntas.
- A 1024 px, el encabezado pasó de 221,4 a 179,6 px de alto y su separación de los servicios pasó de 56 a 32 px: unos 66 px menos antes de las opciones. Datos en `comparacion.json`.
- Doce comprobaciones del DOM en ES/EN: 320, 390, 768, 1024 y 1440 px, además de 844 × 390 en horizontal. Tres servicios, un único enlace, sin desbordamientos ni recortes de texto. Datos en `responsive.json`.
- El enlace tiene unos 50 px de alto y abre Soluciones en el idioma correspondiente; se comprobó con clic en ambas versiones.
- Prettier, ESLint, Astro, límite de tamaño de archivos y `git diff --check` correctos. Compilación y validación de las 30 páginas correctas.
- QA realizada en el navegador con viewports simulados, sin dispositivos físicos.

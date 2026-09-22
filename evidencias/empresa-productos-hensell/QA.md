# Casos de productos en Empresa

Se reescribieron la introducción y las descripciones ES/EN para explicar tareas concretas: preparar y enviar una comanda en Takofy, consultar cobros e inventario en VIGGO. Nicaragua aparece una sola vez por producto en esta sección.

VIGGO utiliza la captura existente de gestión de caja. El encuadre CSS muestra las filas de transacciones desde el punto (542, 285) de la imagen original: 695 × 250 px en escritorio y 280 × 250 px en teléfonos de hasta 480 px. El archivo original permanece intacto; el detalle móvil conserva los importes y métodos de pago. Los enlaces abren el caso, donde está disponible la vista completa.

Ambas imágenes incluyen texto alternativo y un pie descriptivo. La captura de Takofy identifica sus datos de ejemplo.

## Comprobaciones

- Revisión visual en navegador a 1024 px, 390 px y en inglés a 320 px. Capturas adjuntas.
- Diez comprobaciones ES/EN entre 320 y 1440 px: sin desbordamiento horizontal, dos pies de imagen y enlaces localizados correctos. Datos en `responsive.json`.
- Clic en la imagen de VIGGO en inglés: abre el caso correspondiente.
- Prettier, ESLint, Astro, límite de tamaño de archivos y `git diff --check` correctos. Compilación y validación de las 30 páginas correctas.
- Las pantallas de los productos conservan el idioma de las capturas originales; el texto de Empresa y sus pies de imagen están traducidos.
- QA con tamaños de viewport simulados; no se utilizaron dispositivos físicos.

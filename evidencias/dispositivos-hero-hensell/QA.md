# Dispositivos del hero

Revisión local en la rama `hensell`.

- Sustituidos los marcos genéricos por una MacBook con base de aluminio, teclado, trackpad y cámara, y un iPhone con Dynamic Island y botones laterales.
- Eliminados los rótulos añadidos a los marcos: VIGGO, Gestión empresarial y Takofy.
- Conservadas las capturas reales, sus textos alternativos, las animaciones de entrada y los enlaces del hero. No se añadieron imágenes, dependencias ni JavaScript.
- La captura del portátil se encuadra sin deformarla; la captura móvil mantiene el recorte de la línea parcial situada sobre el pedido.

## Revisión visual

- ES, escritorio de 1440 y 1243 px: ambos dispositivos visibles y pie de imagen separado.
- ES, móvil de 390 y 320 px: sin desbordamiento horizontal. Se amplió el espacio de la composición en pantallas estrechas para separar la MacBook del pie de imagen.
- EN, tablet de 768 px: capturas cargadas y texto del pie sin solapamientos.
- Se conservaron los estados del botón con contraste corregido; el hero sigue usando la variante inversa.
- Sin errores en la consola de la pestaña de QA.

Las capturas de escritorio de 1440 px y móvil de 390 px documentan la primera revisión; los últimos ajustes afectan al espaciado por debajo de 384 px y a los botones laterales del iPhone. Las capturas de 1243, 768 y 320 px corresponden a la versión final.

## Verificación técnica

`npm run quality` pasó: formato, ESLint, Knip, tamaño de fuentes, Astro, compilación de 30 páginas, validación del sitio y auditoría de dependencias. Astro informó cero errores, advertencias o sugerencias.

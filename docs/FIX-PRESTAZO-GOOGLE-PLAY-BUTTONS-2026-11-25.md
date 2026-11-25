# Prestazo: recuperación de tarjeta y paridad de botones v1

- Base Git: `9b340d5c77649e7fc864b2a875baf80a5019b764`.
- Fuente de recuperación: despliegue Vercel `dpl_GCeQMtE4D929pjjhTvVBiW7JRNKC`, HTML ES/EN y CSS compilado; no se pudo recuperar el fuente Astro íntegro desde la API.
- Se reconstruye el componente a partir de la salida publicada, conservando contenido, paleta, foto, distribución y efectos; se integra antes de CobroRuta en inicio y catálogo, en ambos idiomas.
- CTA de descarga: insignia oficial localizada de Google Play, sin deformación ni recoloración. Ambos CTA usan el mismo ancho de columna y relación de aspecto del área visible de la insignia (565/170); las dimensiones reales de los PNG ES/EN deben comprobarse en navegador. En móvil se apilan y conservan dimensiones iguales. El margen transparente del recurso se mantiene.
- Se mantiene el destino original de descarga y la landing existente. No se modifican archivos de la demo ni otros productos. Se conservan las dimensiones declaradas de la imagen principal del HTML desplegado.

## Integración con Codex

1. Guardar los cambios locales pendientes y comparar con esta rama antes de integrar. No usar reset destructivo ni sobrescribir archivos ajenos a la tarjeta.
2. Conciliar `PrestazoSpotlight.astro`, `HomePage.astro` y `ProductsPage.astro` con el código local; conservar toda diferencia no relacionada con la tarjeta.
3. Ejecutar `npm ci`, `npm run check`, `npm run build` y `npm run quality` según el proyecto. No se ejecutaron en esta sesión.
4. Validar las rutas /es/, /en/, /es/productos/ y /en/products/ en 360, 430, 768, 1024 y 1440 px: ambos botones con igual rectángulo visual, texto legible, sin recorte del logo, sin overflow, navegación correcta, foco de teclado y carga de las imágenes bajo CSP.
5. Tras validar todas las diferencias locales, integrar en main para desplegar en producción. No promover directamente un preview basado en un main que aún no contiene los cambios locales pendientes.

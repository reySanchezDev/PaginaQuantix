# Rediseño de Quantix · rama hensell

Identidad editorial en marfil, carbón y terracota, con una nueva marca Q, títulos de Bricolage y acentos serif. Cambia las composiciones de inicio, catálogo, fichas de producto, soluciones, proceso, empresa, contacto, documentos legales y 404 en español e inglés. Incluye favicon e imágenes sociales actualizados.

## Verificación

- `npm run quality`: formato, lint, código sin uso, límite de 300 líneas, tipos Astro, compilación, validación de enlaces/metadatos/sitemap y auditoría de dependencias aprobados.
- 26 archivos HTML generados, incluyendo la redirección de entrada.
- 25 páginas visibles revisadas en Chromium con Playwright a 320, 360, 390, 430, 768, 844, 1024 y 1440 px; incluye orientación horizontal a 844 × 390. Sin desbordamiento horizontal.
- axe: sin incidencias WCAG A/AA detectadas en las 25 páginas y en el menú móvil abierto.
- Sin errores de JavaScript detectados.
- Menú: recorrido de foco, Escape, retorno de foco, restauración del desplazamiento y cierre al pasar a escritorio.
- Acordeones: apertura por teclado.
- Contacto: campos requeridos, correo opcional, vista previa, texto escapado, enlaces codificados y edición que conserva los valores. No se enviaron mensajes durante las pruebas.
- Sin JavaScript, el contacto directo sigue disponible y el formulario informa de la alternativa.
- Contraste verificado: texto principal 14.13:1; texto secundario 5.73:1; botón principal 5.24:1; foco sobre terracota 3.14:1; borde de campo 3.39:1.

La consulta se prepara en el navegador. El usuario revisa el mensaje y lo envía desde su aplicación de correo o WhatsApp; no hay un servicio de envío en el sitio.

Se actualizó únicamente la dependencia transitiva `fast-uri` de 3.1.5 a 3.1.7 para resolver la vulnerabilidad que bloqueaba la auditoría del proyecto. No se añadieron dependencias a la interfaz.

Las capturas y los resultados estructurados acompañan este documento. La comprobación se realizó con emulación de navegador, no en dispositivos físicos; el teclado virtual y los clientes externos de correo/WhatsApp requieren comprobación en un dispositivo real.

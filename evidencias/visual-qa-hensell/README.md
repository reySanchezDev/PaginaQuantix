# QA visual · móvil y escritorio · hensell

Se inspeccionó la interfaz renderizada en Chromium, con capturas nuevas de páginas y estados de interacción. La revisión encontró cinco problemas concretos y se corrigieron sobre la rama `hensell`.

## Hallazgos corregidos

| Prioridad | Hallazgo y evidencia | Corrección aplicada |
| --- | --- | --- |
| P2 | En VIGGO, «← Ver funciones» parecía un enlace de regreso y apuntaba a `#capabilities`, que ya no existía. Fallaba en español e inglés. | Se conservó el identificador de la sección, se separó «Todos los productos» de «Ver funciones» y se añadió validación de fragmentos al control de compilación. |
| P2 | En móvil horizontal, al desplazar el menú hasta abajo, el botón de cerrar quedaba a −207 px fuera de pantalla. | Cabecera del menú fija dentro del panel, distribución compacta en horizontal y eliminación de las demoras cuando se solicita movimiento reducido. |
| P2 | Al preparar una consulta en móvil, la vista previa empezaba aproximadamente a mitad de pantalla y las opciones de envío quedaban debajo del área visible. | La tarjeta se lleva debajo de la navegación fija y conserva el foco en el título. Con un mensaje corto, correo y WhatsApp quedan visibles. |
| P3 | A 1024 px, la etiqueta de correo ocupaba dos líneas y los campos de nombre y correo empezaban a distinta altura. | Se alinearon los campos por su borde inferior para absorber etiquetas de diferente longitud. |
| P3 | A 320 px, el título del inicio ocupaba cuatro líneas y dejaba «que» aislado. | Se ajustó la escala de texto móvil; ahora conserva tres líneas tanto en español como en inglés. |

## Lo que funciona

- La paleta marfil, carbón y terracota mantiene contraste y jerarquía entre títulos, texto y acciones.
- El diseño de productos, las páginas interiores y el contacto comparten una identidad consistente.
- Las tarjetas tienen áreas de enlace completas y los controles conservan foco visible y tamaño táctil adecuado en los estados inspeccionados.

## Resultado

Las cinco correcciones tienen comprobación en navegador y capturas posteriores. El recorrido de producto y contacto quedó más claro; el menú horizontal ya permite cerrar el panel sin volver al principio.

- 25 páginas en ocho anchos (320–1440 px): 200 casos de disposición sin desbordamientos; sin errores de JavaScript ni incidencias detectadas por axe.
- `npm run quality`: aprobado, incluidos tipos, lint, compilación, enlaces, fragmentos, sitemap y auditoría de dependencias.
- La nueva validación de fragmentos reprodujo el error en los dos HTML antiguos de VIGGO y pasó después de reconstruir el sitio.
- Regresiones verificadas en español e inglés: título a 320 px; alineación de campos a 1024 px; vista previa a 390 px; menú a 844 × 390; navegación de VIGGO.
- La matriz completa de páginas y anchos está en `after/qa-report.json`; las comprobaciones específicas están en `after/regressions.json`.

## Capturas

| Superficie | Antes | Después |
| --- | --- | --- |
| Inicio · 320 px | [Antes](before/home-small.png) | [Después](after/home-small.png) |
| Inicio · 1024 px | [Antes](before/home-tablet.png) | [Después](after/home-tablet.png) |
| Contacto · 1024 px | [Antes](before/contact-tablet.png) | [Después](after/contact-tablet.png) |
| Vista previa · 390 px | [Antes](before/contact-preview-mobile.png) | [Después](after/contact-preview-mobile.png) |
| Menú horizontal desplazado | [Antes](before/menu-landscape-scrolled.png) | [Después](after/menu-landscape-scrolled-es.png) |
| VIGGO · escritorio | [Antes](before/viggo-desktop.png) | [Después](after/viggo-desktop.png) |
| Catálogo · tablet | [Antes](before/catalog-tablet.png) | [Después](after/catalog-tablet.png) |
| Foco en acordeón · móvil | [Antes](before/accordion-focus-mobile.png) | [Después](after/accordion-focus-mobile.png) |

La verificación usa emulación de navegador. Queda pendiente comprobar teclado virtual, áreas seguras y clientes externos de correo/WhatsApp en dispositivos físicos antes de publicación. No se enviaron mensajes ni se publicaron cambios.

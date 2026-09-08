# Contraste de botones

8 de septiembre de 2026. Rama `hensell`, sitio local en el puerto 4322.

## Problema y corrección

Se reprodujo el hover del CTA final: tanto fondo como texto terminaban en `rgb(155, 47, 22)`, contraste 1:1. La regla general de hover del botón sobrescribía el fondo claro definido por la sección.

El componente Button ahora ofrece `tone="inverse"` y define conjuntamente los colores normal, hover y foco mediante variables internas. Las llamadas a contacto y el hero utilizan esa variante. Se eliminaron sus sobrescrituras de color fuera del componente; el resultado no depende del orden del CSS de cada página. La variante secundaria sobre terracota mantiene texto claro al interactuar.

## Revisión

- CTA corregido bajo hover real: texto `#9b2f16`, fondo `#f6f4ee`, contraste **6.79:1**.
- Botón principal normal bajo hover: **7.12:1**.
- Botón secundario sobre terracota bajo hover: **7.12:1**.
- Secundario normal: **13.05:1**.
- Navegación de contacto: **5.24:1**.
- Enlace de acción y WhatsApp: **4.99:1**.
- Se registraron 19 observaciones de controles en portada, productos, Soluciones, Cómo trabajamos, Empresa, contacto y 404. `contraste.json` indica expresamente si cada observación corresponde a hover, foco o estado normal; todas superan 4.5:1.
- Se revisó adicionalmente el hover del CTA de QAVision y el foco del CTA inglés a 390 px. En móvil: botón de 52 px, texto completo, foco claro y sin desbordamiento horizontal.
- Los hovers se comprobaron con interacción real de puntero mediante clic derecho y cierre del menú contextual; no se activaron los enlaces externos, descargas, correo o WhatsApp.
- No se observaron errores de consola. `npm run quality` correcto: formato, lint, Knip, tamaño de archivos, Astro check sin errores/advertencias, build y validación de 30 páginas, auditoría sin vulnerabilidades.

La revisión móvil utiliza un viewport de navegador, no un teléfono físico. El contraste indicado corresponde al texto del control; no representa una auditoría completa de accesibilidad del sitio.

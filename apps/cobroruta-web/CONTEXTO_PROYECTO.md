# CobroRuta web — bitácora viva

**Hito actual:** H1, base técnica desarrollada localmente. **Fecha:** 2026-11-08.

**Objetivo:** sitio premium para `cobroruta.quantix.software`, bilingüe ES/EN, animación accesible, recorrido de cobro simulado fiel al Flutter.

**Fuente de contexto:** [Drive CobroRuta](https://drive.google.com/drive/folders/1c3f8ABPxvf0FHX5cWjAXUH7uxXHA-kYZ); consultar `00_CONTEXTO_Y_GOBIERNO/00_LEEME_CONTEXTO_MAESTRO_COBRORUTA`.

**No tocar:** repositorio Flutter/Hensell/lugar_app, dominio operativo de la app, Google Play, Supabase, RevenueCat, DNS producción.

**Hecho en H1:** Astro SSG, tokens exactos, contenido ES/EN, navegación, layouts responsive y motion con reduced-motion, home, funciones, cómo funciona, FAQ, contacto pendiente, demo funcional de pago con datos falsos, tests unitarios de negocio.

**Pendiente en H1:** npm registry inaccesible desde este contenedor, por lo tanto build Astro real no verificado. **No afirmar deploy publicado** sin evidencia. Publicación y preview son hitos separados.

**Decisiones:** placeholder de producto es ilustración SVG etiquetada TEMPORAL, nunca screenshot ficticio. Marca iconográfica en este scaffold es un marcador estilizado provisional, pendiente de asset oficial. Paleta #23624C, #1B4F3C, #F3F0E6, #FFFEFA. Tipografía Outfit cargada desde Google Fonts temporalmente; uso de asset autorizado local será preferible antes de release.

**Flujo de cobro:** editar importe, usar sugerido o saldo, fecha válida, método y canal, vista previa de asignación FIFO y mora→interés→capital, revisar, confirmar y mostrar saldo sintético. Pago y actualización de visita no son necesariamente atómicos; no prometerlo.

**Capturas:** usuario subirá originales a Drive/02_CAPTURAS_REALES/Android_ES y Android_EN. Al recibirlos validar, crear derivados e incorporarlos. No usar imágenes generadas que simulen UI real.

**Próximo hito recomendado:** instalar dependencias en entorno con npm, build + Playwright visual responsive, crear repositorio independiente de marketing, preview Vercel, corregir QA, integrar screenshots conforme lleguen.

**Regla al cerrar tarea:** actualizar este archivo y bitácora de Drive con fecha, archivos, commits, pruebas, deploys y limitaciones. No desplegar producción sin autorización.


## Hito en GitHub (2026-11-08)
- Repo corporativo: https://github.com/reySanchezDev/PaginaQuantix
- Rama aislada: feature/cobroruta-web-hito1
- Root web: apps/cobroruta-web (Astro independiente, deploy separado)
- Capturas revisadas y seleccionadas desde Drive Android_ES: inicio, clientes vacíos, préstamos vacíos, ruta vacía, menú de reportes e informes sin cartera. Las imágenes con nombres, identificaciones, teléfonos, direcciones, GPS o cuenta NO se publican.
- Galería real ES/EN: imágenes originales en español, sin traducción visual ficticia.
- Code ZIP en Drive es obsoleto; Git es fuente de verdad. Drive se reserva para documentación y recursos.
- Pendientes: instalar dependencias, build Astro, QA visual, fotografías nuevas con datos ficticios de pago y préstamo, entorno Preview y aprobación del usuario.

## Hito visual (2026-11-08)
El flujo de pagos se pospone hasta la última fase. No hay enlace, demo ni ruta de simulador en la web pública del Hito 1. El código de cálculo queda reservado en el repositorio para fase final. La web comercial puede mostrarse provisionalmente bajo https://www.quantix.software/es/cobroruta/ y /en/cobroruta/ (noindex). La URL oficial prevista sigue siendo https://cobroruta.quantix.software; no está configurada por el simple hecho de fusionar código a main. No modificar Vercel ni DNS.


## Ajustes de marca y enfoque comercial (2026-11-08)
- La marca visible del header, footer, hero y favicon usa el ícono ORIGINAL de Flutter, `Hensell/lugar_app/assets/icon.png`, idéntico por SHA de blob a `103d8f4a631a7ad5a734a4b99969a11b4a79f316`. No dibujar versiones alternativas ni usar el SVG provisional.
- El favicon PNG también procede del repositorio de la app (`web/favicon.png`). Copias necesarias dentro del proyecto raíz corporativo y la app Astro aislada: `public/cobroruta/`.
- Texto público ES/EN reorientado a los beneficios de CobroRuta. Fuera referencias al origen, validación, idioma o carácter auténtico de las capturas. Ese detalle técnico pertenece únicamente a esta bitácora.
- Se conserva el aplazamiento del simulador de cobros hasta la última fase.

## Ajuste de legibilidad y copy móvil — 2026-11-08
Petición del responsable: retirar textos legales innecesarios del marketing, corregir nota del hero tapada por el teléfono móvil sin eliminar captura original y simplificar copy.
- Eliminado disclaimer del pie, en ES/EN, y pregunta FAQ que repetía negaciones sobre préstamos.
- Nota del hero abreviada y separada del teléfono; z-index, espaciado y transform-origin corregidos bajo 600px; foto original preservada.
- Eliminada franja repetitiva de claims de cartera/cuotas/cobros que se truncaba en móviles.
- Galería sin párrafo reiterativo y secciones de producto, CTA y hero con mensajes diferenciados.
- Código en apps/cobroruta-web, integrado al build Quantix en /es/cobroruta/ y /en/cobroruta/.
- Pendiente validación visual final en móvil del usuario; no se cambió Vercel directamente.

## Restauración de tarjeta del hero móvil (2026-11-08)
La tarjeta flotante inferior «Tu cartera, a tu alcance» fue ocultada indebidamente en la corrección anterior mediante CSS `.float-bottom{display:none}`. Se restauró junto con el texto original ES/EN y se reposicionó exclusivamente en ancho <=600px para mantener separado el texto de disponibilidad Google Play. Se conservaron el screenshot original, las otras tarjetas y la separación del hero. QA visual final pendiente de usuario en dispositivo real.


## Mapas de jornada (2026-11-08)
El diagrama de cuatro círculos se sustituyó por un mapa geográfico con calles de OpenStreetMap. Fuente oficial de tiles: https://tile.openstreetmap.org/{z}/{x}/{y}.png, con atribución visible y solicitudes limitadas a viewport (ver https://operations.osmfoundation.org/policies/tiles/). Zoom limitado 12–17.
Al cargar, el mapa usa Managua, Nicaragua (coordenadas UNGEGN 12.1263760777, -86.2662276527), sin pedir permiso. Botón «Usar mi ubicación» activa geolocation del navegador por consentimiento, recenter y cuatro puntos anónimos simulados; no hay lectura de cartera, ni datos personales, ni llamadas a Supabase, OSRM o backend. La línea une paradas gráficamente: NO es una ruta por calles optimizada ni una navegación. Los puntos no se deben presentar como clientes auténticos.
Ruta en ES/EN con controles clicables 01–04, zoom, feedback de error y tiles si hay conexión. El cliente de mapas no persiste la ubicación, no la comparte con la app CobroRuta, y los tiles externos solo reciben viewport geográfico solicitado (según condiciones OSM). Sin permiso se conserva Managua. CSP raíz modificada únicamente para permitir cargar PNG de tile.openstreetmap.org. No se modificó Vercel directamente.


## Producto estrella de Quantix — 2026-11-09
CobroRuta se destaca al inicio de /es/productos/ y /en/products/, antes del resto del catálogo, con ícono original y screenshot auténtico. La portada corporativa ES/EN incorpora la misma sección después del hero y lo presenta como primer enlace destacado antes de VIGGO y Takofy. La tarjeta dirige a /es/cobroruta/ y /en/cobroruta/. No se modificó la app Flutter, ni DNS, ni Vercel manualmente.


## Mejora final tarjeta destacada Quantix (2026-11-09)
En la portada y el catálogo de productos se reemplazó el texto sin enlace «Disponible en Google Play» por un CTA real que incorpora el badge OFICIAL provisto por Google (URL del servidor play.google.com, versión ES/EN) enlazando directamente a https://play.google.com/store/apps/details?id=dev.hensell.cobro_ruta. Según las reglas de marca Google, se utiliza badge original, sin redibujarlo. CSP de Astro habilita solo play.google.com en img-src, conservando restricciones restantes. CTA «Conocer CobroRuta» sigue enlazando a la landing local por idioma. El visual presenta dos capturas originales de la app sin datos personales (home-android.jpg y reports-menu-android.jpg), con ambos teléfonos íntegros y sin márgenes negativos; responsive en móvil y desktop. No se tocó Vercel manualmente. Verificar despliegue y revisión visual del propietario.


## Refinamiento de tarjeta CobroRuta en Quantix (2026-11-09)
- Se retiró el subtítulo público «Producto estrella de Quantix» y su equivalente EN, sin eliminar el acceso destacado del catálogo ni de la portada.
- Las dos pantallas originales (Inicio y Reportes) tienen movimiento de flotación independiente y alternado, con variación leve de inclinación y desplazamiento vertical, y respiración del halo decorativo. Preserva su encuadre completo y responsive.
- En prefers-reduced-motion se detienen todas las animaciones decorativas; los dos teléfonos permanecen visibles e íntegros.
- Sin nuevas imágenes, sin cambios de DNS/Vercel manuales; revisión visual móvil de usuario pendiente.


## Carrusel de pantallas (2026-11-09)
Se corrigió «Explorá CobroRuta» por capturas entrecortadas. Ahora muestra un dispositivo íntegro por pantalla móvil, dos en tablet y tres en escritorio, sin cortar imágenes. Carrusel con desplazamiento táctil nativo, scroll snap, controles anterior/siguiente, contador, puntos de paginación y accesibilidad de teclado/lector, más reduced motion. ES/EN; conserva 6 imágenes originales y no autoavanza.


## Controles flotantes del carrusel (2026-11-09)
Según captura Android del responsable, los controles anterior/siguiente situados arriba del carrusel eran poco ergonómicos. Se trasladaron a los laterales del área de imágenes, con botones circulares sobre el carrusel, en ambos idiomas. Se mantiene contador en la cabecera, paginación inferior, swipe táctil, carrusel de 6 capturas y aria/teclado. Las flechas tienen objetivo táctil >=50px y foco accesible, con modo reduced motion. No se modificaron capturas ni otros componentes. Fuente del código: src/components/ScreensGallery.astro y src/styles/global.css del subproyecto apps/cobroruta-web.


## Insignias de Google Play en botones de descarga (2026-11-09)
En la landing CobroRuta (ES/EN, versión integrada en Quantix y proyecto independiente), TODOS los puntos que dirigen a Google Play muestran la insignia ORIGINAL y localizada de Google Play como en la ficha de producto Quantix: header desktop, menú móvil, segundo CTA del hero, CTA final, enlace de pie y pantalla Contacto. Componente reutilizable: apps/cobroruta-web/src/components/GooglePlayBadge.astro. Usa el mismo dominio/archivos oficiales que el bloque CobroRutaSpotlight de Quantix. No se redibujó el logo Android, no se inventaron assets; href a dev.hensell.cobro_ruta. CSP ya habilitaba play.google.com en imágenes. No se alteró Vercel/DNS ni app Flutter. QA responsive visual pendiente del usuario.


## Consistencia visual de llamadas a la acción (2026-11-09)
En el hero móvil el botón «Descubrir cómo funciona» ocupaba todo el ancho, mientras que el badge oficial Google Play era pequeño y el texto «Disponible en Google Play» aparecía repetido debajo. Se eliminaron redundancias y se unificaron ambas áreas táctiles en una columna de igual ancho y alto (>=68px en móvil), con estilos editorialmente coherentes: CTA principal verde y badge original intacto sobre un contenedor marfil claro. En desktop las acciones comparten fila y ancho proporcional. La sección de cierre también usa dos acciones de dimensiones iguales, con badge oficial y botón secundario enmarcado. Compatibilidad ES/EN; no se alteró el ícono original, screenshots, Vercel ni DNS. QA visual en dispositivo pendiente.


## Corrección de regresión visual del botón Google Play (2026-11-09)
Tras la captura de revisión se detectó un gran rectángulo blanco que rodeaba artificialmente el badge en el CTA final. No era parte del recurso original: lo generó el segundo bloque CSS añadido a GooglePlayBadge.astro en el commit anterior. Se eliminó completamente ese contenedor de fondo/borde/sombra y se restauró el badge OFICIAL sin marco, manteniendo su relación de aspecto. Los botones principales de hero y cierre son compactos, centrados y de anchura visual equilibrada con la insignia original; ninguna acción ocupa el ancho completo de la pantalla móvil. Conservados links ES/EN, accesibilidad y reduced-motion, sin manipular Vercel. Por verificar visualmente en móvil.


## Ajuste fino de ergonomía de botones — 2026-11-09
La revisión móvil evidenció botones sobredimensionados. Se redujo la acción verde a ancho ~215px y alto mínimo 52px, y el badge oficial Google Play a 205px de ancho (sin alterar la imagen ni añadir fondos). En móviles se centran en columna y en escritorio comparten una fila compacta; se aplica el mismo patrón al CTA final. El título del botón se acortó a «Ver cómo funciona» / «See how it works» para evitar quiebres de línea. Se mantuvieron los enlaces originales, el recurso oficial de Google Play y los estilos accesibles.


2026-11-09 — Ajuste puntual del pie de página: eliminado únicamente el botón de Google Play de la última columna del footer de CobroRuta a solicitud del propietario. Se mantiene el enlace Quantix Software y todas las demás insignias de descarga del sitio, sin cambios de estilos, Vercel ni DNS.

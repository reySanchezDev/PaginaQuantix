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

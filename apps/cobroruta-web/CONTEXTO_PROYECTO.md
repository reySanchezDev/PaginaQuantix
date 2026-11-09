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

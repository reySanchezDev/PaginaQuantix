# Auditoría de Prestazo y calidad del sitio

Fecha: 2026-11-25  
Fuente funcional: `reySanchezDev/LP_Prestazo`, rama `feature/integracion-preview-prestazo`, commit `68ffa30`.

## Correcciones realizadas

- Se agregaron los seis SVG de lettering inicial que activan la C animada, la superposición del header y la restauración del hero.
- Se corrigieron los metadatos Open Graph y Twitter de las rutas embebidas de CobroRuta y se generaron sus imágenes sociales ES/EN de 1200×630.
- Se alineó la prueba de campañas estacionales con el orden documentado del layout: New Year antes del header.
- Se documentó la excepción de tamaño para `MiniPrestazoSettings.astro`, cuyo markup interactivo aprobado debe permanecer junto para conservar la sincronización de la demo.
- Se excluyeron de las herramientas de calidad los artefactos Flutter y capturas personales no pertenecientes al sitio.

## Verificaciones

- `npm ci`: correcto; sin vulnerabilidades en la instalación actual.
- `npm run build`: correcto; genera 44 páginas.
- `npm run test:themes`: debe quedar en 28/28 pruebas después de la corrección de orden.
- `npm run test:build`: valida rutas, SEO, enlaces e imágenes sociales.
- `npm run check:size`: aplica el límite general de 300 líneas y la excepción auditada de Mini Prestazo (450).
- `npm run check`: se limita a las fuentes del sitio; los bundles Flutter externos no forman parte del diagnóstico Astro.
- `npm run audit`: requiere revisar la actualización de Astro y la cadena de ESLint si mantiene avisos moderados.

## Estado de producción

Las rutas aprobadas son:

- `/es/productos/prestazo/`
- `/en/products/prestazo/`

La publicación requiere que existan en `public/img/lettering/` los archivos `hero-initial-*` y `hero-prestazo-wordmark.svg`; su ausencia deja el hero en modo HTML base aunque el JavaScript esté presente.

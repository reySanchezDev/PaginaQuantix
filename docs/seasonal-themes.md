# Temas estacionales de Quantix

## Arquitectura

- `src/styles/tokens.css` permanece original (identidad base).
- `src/styles/themes/octubre-rosa.css` es el único tema incorporado por ahora.
- `public/themes/calendar.js` centraliza fechas, prioridad, zona horaria y habilitación.
- `public/themes/scheduler.js` resuelve el calendario sin usar fecha de compilación.
- `public/themes/runtime.js` aplica el tema con `data-seasonal-theme`; revisa cada 30 segundos y al volver a la pestaña.
- `src/layouts/BaseLayout.astro` incluye el motor antes del contenido y muestra el banner solo durante la campaña.
- `public/themes/octubre-rosa/favicon.svg` es una variante temporal del icono.

## Campaña actual

**Octubre Rosa**: 1–31 octubre 2026, inclusive, zona horaria `America/Managua`.
Fuente oficial: https://www.who.int/news-room/events/detail/2026/10/01/default-calendar/breast-cancer-awareness-month-2026

**Importante:** `recurrence: "once"` impide repetir automáticamente en 2027 sin aprobación. El tema original vuelve el 1 de noviembre, horario de Nicaragua. No se requieren cron, rebuild ni redeploy para entrar/salir: el cliente actualiza el atributo. Las capturas reales y las aplicaciones independientes no se recolorean.

## Añadir otras temporadas (posteriormente)

1. Crear `src/styles/themes/<id>.css` con variables bajo `html[data-seasonal-theme="<id>"]`.
2. Importarlo al final de `src/styles/global.css`.
3. Añadir objeto al calendario con `id`, `enabled`, `start`, `end`, `priority`, `recurrence`, `themeColor` e `icon`.
4. Si aplica, añadir banner `data-seasonal-banner="<id>"` en `BaseLayout.astro`.
5. Validar accesibilidad, escritorio/móvil, páginas de productos, pruebas de calendario y reversión.

`recurrence: "yearly"` permite campañas anuales, incluidos rangos que cruzan diciembre y enero. Prioridad más alta gana si se superponen; deshabilitar con `enabled: false`.

## Pruebas

```bash
npm run test:themes
npm run check
npm run build
```

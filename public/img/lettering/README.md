# Prestazo — Lettering vectorial de la portada

Estos recursos son SVG transparentes de trazos vectoriales reales. La fotografía continúa separada en `/img/prestazo-hero-mobile.webp` y `/img/prestazo-hero-personas-crecimiento.png`.

## Composiciones
- `hero-lettering-es-mobile.svg`
- `hero-lettering-es-desktop.svg`
- `hero-lettering-en-mobile.svg`
- `hero-lettering-en-desktop.svg`

## Recursos reutilizables
- `hero-initial-c.svg`: inicial C con trazo personalizado y degradado menta.
- `hero-prestazo-wordmark.svg`: PRESTAZO en trazos vectoriales.

## Edición
Cada SVG principal conserva grupos con identificadores estables como `initial-c`, `concéntrate`, `linea-1`, `linea-2`, `copy-1`, `prestazo`, `copy-2` y `copy-3`. Cada carácter usa referencias a un contorno de glifo dentro de `defs`, sin depender de fuentes instaladas en el navegador. Para editar posiciones y colores, modificar el grupo correspondiente en el SVG, conservando las definiciones de contornos.

El HTML de la portada conserva el h1 traducible para accesibilidad y buscadores. Solo se oculta visualmente cuando la imagen SVG ha cargado.

## Integración
`/js/prestazo-v4.js` instala la composición desde estas rutas y selecciona el idioma ES/EN. `/css/prestazo-vector.css` controla tamaño y posición por viewport. El header sticky está por encima del SVG y lo cubre al hacer scroll.

**No fusionar el SVG con la fotografía ni rasterizar las letras.** Los cambios se validaron en la preview de Vercel y no implican sincronización automática con GitHub.

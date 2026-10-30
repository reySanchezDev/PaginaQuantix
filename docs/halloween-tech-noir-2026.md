# Halloween Tech Noir 2026 — Quantix Software

## Alcance aprobado

Solo cambia la ambientación de la página real. Se conservan literalmente los contenidos existentes, los enlaces, la estructura, la navegación, los datos SEO y las capturas auténticas de TAKOFY y VIGGO. El primer mockup es referencia estética, no referencia de texto ni datos.

## Activación automática

- Inicio: 30 de octubre de 2026, 00:00:00, zona America/Managua.
- Final: 31 de octubre de 2026, 23:59:59, zona America/Managua.
- Vuelta a la identidad corporativa: 1 de noviembre de 2026, 00:00:00.
- Prioridad: 200, por encima de Octubre Rosa (100) durante el 30 y 31.
- Recurrencia: once (no se repetirá automáticamente en 2027).
- Se evalúa en el navegador al abrir la página, recuperar el foco y cada 30 segundos mediante el motor actual; no se necesita cron ni un nuevo deploy al comenzar la fecha.

## Identidad y recursos

- Paleta carbón/azul noche, naranja ámbar y violeta oscuro.
- Ilustración SVG local, sin texto ni interfaces ficticias, como capa decorativa detrás de las capturas reales.
- Paleta y estilos aislados en src/styles/themes/halloween-tech-noir.css.
- Ilustración en public/themes/halloween-tech-noir/scene.svg.
- Banner estacional bilingüe en BaseLayout, oculto fuera de la fecha.
- Se conserva /favicon.svg como identidad de la marca.

## Pruebas y mitigaciones

- tests/seasonal-themes.test.mjs cubre el inicio del 30 de octubre y la restauración del 1 de noviembre, prioridad y recurrencia.
- Probar escritorio y móvil, accesibilidad, navegación y contraste, sin alterar contenidos.
- La fecha depende de un reloj del dispositivo correcto, aunque el día se calcula en America/Managua.
- Si JavaScript está bloqueado, la página conserva el tema corporativo por defecto.
- Para desactivar anticipadamente, cambiar enabled a false en public/themes/calendar.js y publicar.

## Animaciones Halloween (30 y 31 de octubre de 2026)

La ambientación incluye tres efectos originales basados en SVG/CSS/JavaScript ligero, sin bibliotecas de animación:

- **Cursor araña:** solo escritorio con puntero fino y hover. La araña acompaña al mouse y, en el clic principal, simula una pequeña descarga de hilo y un toque de patas. Las interacciones de botones y enlaces se ejecutan sin demoras y los elementos superpuestos siempre tienen `pointer-events: none`.
- **Arañas decorativas:** hasta tres arañas pequeñas caminan pausadamente por bordes de secciones existentes (primera sección, CTA y footer); en pantallas estrechas solo una es visible.
- **Telarañas premium:** tres grabados SVG color cobre/humo, con respiración tenue, en esquinas de primera sección, CTA y footer. Permanecen decorativas y no reemplazan fotografías, mensajes ni capturas de producto.

### Aislamiento y accesibilidad

Solo se activan cuando el calendario coloca `data-seasonal-theme="halloween-tech-noir"`; al salir del tema se retiran arañas, cursor e hilos sin recargar la página. El modo `prefers-reduced-motion: reduce` mantiene las telarañas estáticas pero no monta arañas móviles ni cursor. Formularios y campos editables conservan el cursor normal. En dispositivos táctiles no hay cursor especial.

Banderas individuales al comienzo de `public/themes/halloween-tech-noir/effects.js`: `spiderCursor`, `ambientSpiders`, `spiderWebs`. Desactivar una bandera no cambia el calendario ni el texto.

### Archivos y validación

- `public/themes/halloween-tech-noir/effects.js`: montaje, eventos y limpieza de efectos.
- `public/themes/halloween-tech-noir/web.svg`: telaraña orgánica original Quantix con radios y arcos de seda conectados. SVG estático y válido.
- `public/themes/halloween-tech-noir/spider.svg`: araña original gris carbón con ocho patas orgánicas, sin ojos ni contornos caricaturescos.\n- `src/styles/themes/halloween-ambient.css`: una telaraña principal pequeña en esquina superior derecha, máscara de desvanecimiento antes de las capturas, araña colgante por hilo visible, caminantes discretos y ajustes para móvil.
- `tests/halloween-effects.test.mjs`: controles de comportamiento y aislamiento.
- `tests/halloween-effects.browser.mjs`: prueba automatizada del cursor, clic, telarañas, caminantes, móvil y movimiento reducido.

El calendario del 30 y 31 de octubre se conserva; el 1 de noviembre vuelve el tema corporativo sin animaciones.

## Revisión de diseño 30/10 — Organic Silk

La versión previa generaba hilos geométricos muy extensos, araña iconográfica y se superponía al mockup. Se sustituyeron las piezas con ilustraciones SVG originales de Quantix inspiradas en las fotografías de telarañas naturales y en el patrón de accesibilidad de proyectos abiertos; no se incorpora ni redistribuye código o imágenes de terceros.

Referencias de investigación:

- https://github.com/rogulia/halloween.js (MIT) — efectos de Halloween desacoplados, sin dependencias y con respeto a movimiento reducido.
- https://github.com/ashmystic/spiderweb-on-the-fly — inspiración matemática de redes orbiculares naturales, no se copia implementación.
- Captura de referencia proporcionada por el usuario: interfaz de ChatGPT con hilo colgante y telaraña de esquina.

Se mantienen textos, SEO, capturas reales, navegación y calendario originales. La composición no debe ocupar el título ni interceptar elementos interactivos. La fecha del tema sigue siendo 30–31/10/2026, y se retira el 1/11. La rama remota no contiene ni elimina los archivos locales no rastreados de Codex en `NUEVO_PRODUCTO/`.

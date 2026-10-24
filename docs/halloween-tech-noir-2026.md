# Halloween Tech Noir 2026 — Quantix Software

## Alcance aprobado
Solo cambia la ambientación de la página real. Se conservan literalmente los contenidos existentes, los enlaces, la estructura, la navegación, los datos SEO y las capturas auténticas de TAKOFY y VIGGO. El primer mockup es referencia estética, no referencia de texto ni datos.

## Activación automática
- Inicio: 31 de octubre de 2026, 00:00:00, zona America/Managua.
- Final: 31 de octubre de 2026, 23:59:59, zona America/Managua.
- Vuelta a la identidad corporativa: 1 de noviembre de 2026, 00:00:00.
- Prioridad: 200, por encima de Octubre Rosa (100) únicamente el día 31.
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
- tests/seasonal-themes.test.mjs cubre 30/31 de octubre y 31 de octubre/1 de noviembre, prioridad y recurrencia.
- Probar escritorio y móvil, accesibilidad, navegación y contraste, sin alterar contenidos.
- La fecha depende de un reloj del dispositivo correcto, aunque el día se calcula en America/Managua.
- Si JavaScript está bloqueado, la página conserva el tema corporativo por defecto.
- Para desactivar anticipadamente, cambiar enabled a false en public/themes/calendar.js y publicar.

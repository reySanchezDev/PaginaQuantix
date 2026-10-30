# Halloween Tech Noir 2026 — Quantix Software

## Alcance vigente

La ambientación Halloween es exclusivamente visual. Conserva literalmente los textos, enlaces, estructura, navegación, SEO, capturas auténticas de productos y componentes funcionales de Quantix.

**Diseño final:** se conserva una sola telaraña decorativa en la esquina superior derecha del hero. No se montan efectos de interacción ni elementos animados adicionales. El usuario conserva siempre el cursor estándar del navegador.

## Calendario automático

- Inicio: 30 de octubre de 2026, 00:00, zona `America/Managua`.
- Fin: 31 de octubre de 2026, 23:59:59, zona `America/Managua`.
- Retorno al tema corporativo: 1 de noviembre de 2026, 00:00.
- Prioridad: 200, superior a Octubre Rosa (100) durante el 30 y 31.
- Recurrencia: una sola vez en 2026. No se activa automáticamente en 2027.
- La selección se hace en el navegador mediante `/themes/calendar.js`, `/themes/scheduler.js` y `/themes/runtime.js`. No requiere cron ni un deploy adicional al comienzo del día.

## Recursos vigentes

- `public/themes/halloween-tech-noir/scene.svg`: ambientación original del fondo.
- `public/themes/halloween-tech-noir/web.svg`: única telaraña.
- `src/styles/themes/halloween-tech-noir.css`: paleta y fondo de Halloween.
- `src/styles/themes/halloween-ambient.css`: únicamente telaraña en `.home-hero::before`, visible en escritorio y móvil, con `pointer-events: none`.
- `src/layouts/BaseLayout.astro`: mantiene banner bilingüe y calendario estacional.

## Eliminaciones definitivas

- Eliminados `public/themes/halloween-tech-noir/effects.js` y `public/themes/halloween-tech-noir/spider.svg`.
- Eliminada la referencia al script de efectos desde `BaseLayout.astro`.
- Eliminados todos los componentes, estilos y animaciones de arañas, del cursor personalizado y de la simulación de seda al hacer clic.
- Eliminados los tests obsoletos de efectos y reemplazados por pruebas de **solo telaraña**.

## Validación y reversión

- `tests/halloween-web.test.mjs` valida calendario/layout, recurso SVG y ausencia de scripts o archivos de arañas.
- `tests/halloween-web.browser.mjs` comprueba la telaraña real en Chromium (escritorio, móvil y movimiento reducido), el cursor nativo, los enlaces y el regreso al tema base.
- `tests/halloween-contrast.browser.mjs` continúa auditando botones y contraste del tema.

La fecha depende del reloj del dispositivo, aunque el día se interpreta en `America/Managua`. Si JavaScript está desactivado, se conserva el tema corporativo. Para desactivar Halloween antes de su fecha final, establecer `enabled: false` en su entrada del calendario y publicar.

Los archivos locales sin commit que puedan existir en el equipo del usuario no se modifican desde GitHub. Actualizar el clon local con cuidado antes de recuperar cambios.

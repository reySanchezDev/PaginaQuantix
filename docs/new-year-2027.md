# Cuenta regresiva y bienvenida a 2027

Franja bilingüe sobre el menú de navegación que sustituye el saludo navideño en todo el sitio, activa desde noviembre de 2026 hasta el 7 de enero de 2027 inclusive, según la zona elegida por cada visitante. No reemplaza el hero, navegación, contenido comercial ni metadatos.

## Comportamiento

- Detecta la zona IANA del navegador sin pedir geolocalización ni consultar direcciones IP.
- Ofrece selector de zonas y botón para restaurar la detección automática. La elección se conserva en almacenamiento local cuando está disponible.
- Cuenta meses y días completos de calendario; las horas, minutos y segundos completan el intervalo restante hasta la medianoche local del 1 de enero de 2027. La conversión considera el desfase horario de cada fecha.
- Se actualiza cada segundo cuando la pestaña está visible y vuelve a calcular al regresar a ella. Depende del reloj del dispositivo.
- A medianoche cambia a bienvenida. Quien llegue del 1 al 7 de enero verá directamente esa bienvenida.
- Fuegos artificiales de partículas doradas por ocho segundos, sin audio ni bloqueo de clics, una vez por navegador cuando el almacenamiento lo permite. Movimiento reducido desactiva el efecto. Sin almacenamiento, se limita a una vez por carga.
- El 8 de enero se oculta automáticamente. La campaña no se repite en 2028.
- El calendario navideño original continúa usando America/Managua y conserva su final programado; esta sección tiene fechas locales independientes.

## Archivos y verificación

- `src/components/sections/NewYear.astro`: sección y textos ES/EN.
- `src/styles/new-year.css`: diseño adaptable, bienvenida y partículas.
- `src/scripts/new-year.js`: renderizado, selector, almacenamiento y celebración.
- `public/themes/new-year-clock.js`: cálculo de calendario y conversión horaria.
- `tests/new-year.test.mjs`: medianoche en Nicaragua, Nueva York, Los Ángeles, India, Kiribati y Samoa Americana; instantes simultáneos; meses/días; retiro de campaña.

Validación: `npm run test:themes`, `npm run lint`, `npm run check`, `npm run build`, `npm run test:build`. La bienvenida puede probarse con fechas simuladas en pruebas; no se incluye un control público para adelantarla ni se altera el reloj del visitante.

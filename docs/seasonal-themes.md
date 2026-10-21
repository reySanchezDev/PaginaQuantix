# Quantix Software — Sistema de temas estacionales

**Estado:** implementado en la web corporativa y publicado en `main`.
**Última revisión de esta documentación:** 20 de octubre de 2026 (hora de Nicaragua).
**Campaña incorporada:** Octubre Rosa 2026, tema **Rosa Perla**.
**Referencia de la versión funcional validada:** [`8db61ebfa18502174cae671235246caaa445b932`](https://github.com/reySanchezDev/PaginaQuantix/commit/8db61ebfa18502174cae671235246caaa445b932).
**Entorno:** Astro estático, GitHub (`reySanchezDev/PaginaQuantix`, rama `main`) y despliegue automático en Vercel.

> Este documento es la referencia técnica y operativa para crear, programar, probar, activar y retirar campañas visuales. No describe cambios dentro de las aplicaciones independientes de Quantix.

## 1. Objetivo y decisiones aprobadas

El sistema permite activar una identidad visual conmemorativa por fechas sin reemplazar permanentemente la identidad de Quantix. Está preparado para campañas futuras, pero **solo Octubre Rosa está registrada y habilitada** en la configuración vigente.

Decisiones:

- Mantener la identidad original en `src/styles/tokens.css` como base y restauración automática.
- Separar **calendario**, **motor de fechas**, **aplicador de tema** y **estilos visuales**.
- Evaluar la fecha según `America/Managua`, no según la zona horaria del visitante.
- Permitir campañas puntuales (`once`) o recurrentes (`yearly`) con prioridades ante solapamientos.
- Aplicar los temas a la **web corporativa**, sus páginas de productos, navegación, botones, fondos, tarjetas e identificadores visuales compatibles. **No modificar** capturas auténticas de software.
- Respetar la legibilidad: Rosa Perla claro como acento; rosa profundo en botones con texto claro.
- Comunicar sensibilización y solidaridad sin afirmar donaciones, asociaciones oficiales, financiación de tratamientos o resultados no acreditados.
- No registrar ni activar todavía temas para el 2 de noviembre, Navidad u otras campañas: se desarrollarán y aprobarán por separado.

## 2. Arquitectura y archivos

```text
src/
  styles/
    tokens.css                        # Tema corporativo original
    global.css                        # Importa estilos y tema estacional
    themes/
      octubre-rosa.css                # Tema Rosa Perla, solo si está activo
  layouts/
    BaseLayout.astro                  # Scripts, banner e ícono de lazo
  components/
    ui/Brand.astro                    # Imagen de marca: .brand__mark
public/
  favicon.svg                         # Marca original, intacta
  themes/
    calendar.js                       # Campañas y configuración
    scheduler.js                      # Fecha local, rango y prioridad
    runtime.js                        # Activación en DOM y actualización
    octubre-rosa/
      favicon.svg                     # Favicon temporal rosa
tests/
  seasonal-themes.test.mjs            # Pruebas del calendario
docs/
  seasonal-themes.md                  # Este manual
```

### 2.1. `public/themes/calendar.js`: configuración

Contiene `window.QuantixThemeCalendar`. Sus claves globales son:

- `timeZone`: zona horaria de referencia, actualmente `America/Managua`.
- `defaultTheme`: identidad fuera de temporada, actualmente `default`.
- `defaultThemeColor`: color del navegador sin campaña, `#f6f4ee`.
- `defaultIcon`: favicon original, `/favicon.svg`.
- `campaigns`: lista de campañas configuradas.

Cada objeto de `campaigns` utiliza:

- `id`: identificador único. Debe coincidir con `data-seasonal-theme` en el CSS y con `data-seasonal-banner` si tiene aviso.
- `enabled`: `true` para considerar una campaña, `false` para desactivarla.
- `start`, `end`: fechas `YYYY-MM-DD`, inclusivas.
- `recurrence`: `once` (fechas exactas; no se repite) o `yearly` (mismo intervalo de mes/día a partir del primer año configurado).
- `priority`: número. Ante dos campañas simultáneas gana el mayor; el desempate es por `id` alfabético.
- `themeColor`: valor opcional para `<meta name="theme-color">`.
- `icon`: ruta opcional al favicon del tema.

**Registro real de la primera campaña:**

```js
{
  id: "octubre-rosa",
  enabled: true,
  start: "2026-10-01",
  end: "2026-10-31",
  recurrence: "once",
  priority: 100,
  themeColor: "#fff7fa",
  icon: "/themes/octubre-rosa/favicon.svg",
}
```

El 31 de octubre a las 23:59:59 de Nicaragua todavía corresponde a la campaña. A partir del **1 de noviembre de 2026, 00:00** vuelve `default`. **No** se activará automáticamente en 2027 sin una nueva configuración o autorización.

### 2.2. `public/themes/scheduler.js`: selección

Expone `window.QuantixThemeScheduler`:

- `localDateISO(now, timeZone)`: convierte la fecha al día calendario de la zona especificada usando `Intl.DateTimeFormat`.
- `isInRange(campaign, today)`: comprueba `enabled`, fechas válidas y recurrencia.
- `resolve(config, now)`: selecciona la campaña activa de mayor prioridad o devuelve `null`.

Los rangos `yearly` pueden abarcar diciembre/enero y no se activan antes de su primer año. El motor no depende de la fecha del build.

### 2.3. `public/themes/runtime.js`: aplicación en el navegador

Los tres scripts se incluyen en el `<head>` de `src/layouts/BaseLayout.astro` en orden **calendar → scheduler → runtime**.

El aplicador:

1. Calcula la campaña activa con la fecha actual.
2. Establece `<html data-seasonal-theme="octubre-rosa">` o `<html data-seasonal-theme="default">`.
3. Actualiza el color del navegador, el favicon y las imágenes `.brand__mark` (logo de la cabecera/pie donde esté presente).
4. Enseña exclusivamente el aviso `[data-seasonal-banner]` correspondiente y oculta los demás.
5. Reevalúa al abrir la página, volver a la pestaña y cada **30 segundos**, para resolver cambios de fecha incluso en pestañas abiertas.

No requiere tareas `cron`, procesos del servidor ni un nuevo despliegue **para que empiece o finalice una campaña ya publicada**. **Sí requiere un commit y despliegue** registrar o modificar campañas y estilos. Si el usuario deshabilita JavaScript o su reloj está incorrecto, la experiencia puede no reflejar el estado esperado; la página estática conserva el tema original y el aviso parte oculto.

### 2.4. CSS y propagación visual

`src/styles/global.css` importa `src/styles/tokens.css` y después `src/styles/themes/octubre-rosa.css`. Las reglas de este último están aisladas con:

```css
html[data-seasonal-theme="octubre-rosa"] {
  /* Sobrescritura de variables CSS de la temporada */
}
```

Se heredan las variables de tipografía, espaciado y componentes existentes. Las fichas comerciales de los productos consumen los tokens `--product-*`; su identidad adquiere matices rosados mientras el tema está activo. Los sistemas operativos independientes, imágenes de producto, capturas de pantallas reales y metadatos Open Graph existentes **no se modifican automáticamente**.

## 3. Identidad visual — Rosa Perla

Paleta representativa aplicada en `src/styles/themes/octubre-rosa.css`:

- **Rosa Perla (acento y lazo):** `#D88FA8`.
- **Primario accesible en botones y enlaces:** `#914461`.
- **Primario al pasar el cursor:** `#78334E`.
- **Fondo general:** `#FFF7FA`.
- **Superficie:** `#FFFDFD`.
- **Superficie suave:** `#F8E9EF`.
- **Texto principal:** `#3B2B33`.
- **Texto secundario:** `#68545E`.
- **Borde base:** `#EAD6DF`.
- **Fondo del aviso solidario:** `#F7DCE6`.

El objetivo es una estética clara y premium, no rosa neón ni vino oscuro. Se conserva la tipografía original. No usar blanco como texto sobre `#D88FA8` en controles importantes sin verificar el contraste.

### 3.1. Lazo final aprobado

Ubicación: `src/layouts/BaseLayout.astro`, dentro de `.seasonal-awareness__mark`.

El diseño definitivo es **un solo trazo SVG continuo**, color sólido `#D88FA8`. Se adoptó después de descartar un ícono de tres trazos superpuestos que visualmente parecía cortado y la corrección anterior que solo unificó sus colores.

Características técnicas:

- `viewBox="15 0 70 125"`.
- **Un solo** elemento `<path>` para todo el lazo.
- `stroke="#d88fa8"`, `stroke-width="18"`, `stroke-linecap="butt"`.
- El lazo es decorativo (`aria-hidden="true"`), mientras el aviso incluye texto comprensible.
- Mantener intacta la geometría al crear futuros temas salvo revisión visual expresa.

**No es el logotipo oficial de ninguna fundación** ni debe atribuirse una colaboración a NBCF, OMS u otra entidad. El lazo rosa es un símbolo de sensibilización. Información de referencia: [National Breast Cancer Foundation — Pink Ribbon](https://www.nationalbreastcancer.org/breast-cancer-ribbon) y [guía de campaña](https://www.nationalbreastcancer.org/bcam-social-media-toolkit/). La guía de NBCF indica que su material específico de marca requiere atención a sus directrices.

### 3.2. Mensaje institucional

Se muestra un aviso en el diseño general para ambas versiones lingüísticas disponibles, con la intención de acompañar a las personas afectadas por el cáncer de mama y a sus familias. Incluye enlace a una fuente de información médica y de sensibilización:

https://www.who.int/news-room/events/detail/2026/10/01/default-calendar/breast-cancer-awareness-month-2026

**Política editorial:** no presentar una campaña de concienciación como una recaudación, asociación o apoyo económico inexistentes; evitar promesas médicas y no utilizar testimonios inventados.

## 4. Operación y calendario

### 4.1. Activación y desactivación

- **Activación prevista:** 2026-10-01 00:00:00 en `America/Managua`.
- **Final del último día:** 2026-10-31 23:59:59 en `America/Managua`.
- **Regreso automático:** 2026-11-01 00:00:00 en `America/Managua`.
- **Repetición automática en 2027:** no, porque `recurrence` es `once`.

Para retirar anticipadamente la campaña, editar únicamente `public/themes/calendar.js`, cambiar `enabled: true` a `enabled: false`, ejecutar pruebas y desplegar en `main`. El navegador volverá a `default` al cargar el nuevo calendario. **No hace falta borrar el CSS, los componentes ni el registro histórico.**

No cambiar la fecha del dispositivo del visitante como mecanismo de operación; usar relojes simulados en pruebas automatizadas.

### 4.2. Preparar nuevas campañas

Candidatas para futuras sesiones: conmemoración del **2 de noviembre** y temporada **navideña**. Ninguna está desarrollada ni programada aún. Deben aprobarse conceptos y fechas exactas antes de activarlas.

Procedimiento:

1. Definir nombre, alcance, público, tono, mensaje, fechas de inicio y fin, recurrencia y prioridad; verificar fechas con fuentes pertinentes.
2. Diseñar y aprobar la paleta, estados `hover`, tipografía, imágenes e iconografía; verificar que no se modifiquen capturas reales de productos.
3. Crear `src/styles/themes/<id>.css` con selector `html[data-seasonal-theme="<id>"]`.
4. Importar ese CSS después de los estilos de base en `src/styles/global.css`.
5. Preparar `public/themes/<id>/favicon.svg` si corresponde, sin sobrescribir el icono base.
6. Registrar una entrada en `public/themes/calendar.js` con fechas y prioridad. Dejarla `enabled: false` hasta autorizar su activación, cuando aplique.
7. Agregar un aviso accesible `data-seasonal-banner="<id>"` en el layout solo si la campaña requiere mensaje visible. Mantener traducciones de las rutas existentes.
8. Agregar o adaptar casos en `tests/seasonal-themes.test.mjs`: antes, inicio, último segundo, después, solapamientos, anuales y rangos que cruzan años.
9. Ejecutar controles de calidad, verificar navegaciones y páginas reales en escritorio/móvil, y publicar la modificación autorizada en la rama de producción.
10. Confirmar el SHA de `main`, el estado de **GitHub Actions / Quality** y el despliegue de **Vercel**.

Agregar una campaña requiere cambios declarativos y su propio CSS; **no** exige modificar el algoritmo del calendario salvo que se introduzcan nuevas reglas. El diseño de temas está preparado para crecer, pero no existe todavía un panel visual de administración ni un editor de calendario.

## 5. Validación, despliegue y trazabilidad

Comandos disponibles:

```bash
npm ci
npm run test:themes
npm run format:check
npm run lint
npm run check
npm run build
npm run test:build
npm run audit
npm run quality
```

`npm run quality` integra las validaciones del repositorio (formato, lint, calendario, análisis de código, control de tamaño, comprobaciones Astro, build, integridad del build y auditoría de dependencias). El build validado generó **40 páginas HTML**.

Evidencias de publicación y mantenimiento, en secuencia:

- [`9fff284`](https://github.com/reySanchezDev/PaginaQuantix/commit/9fff28465da8378bdd0c535f2482774e3a73d4c9): sistema estacional inicial en rama de prueba.
- [`fe4acf3`](https://github.com/reySanchezDev/PaginaQuantix/commit/fe4acf33177845f89f5dae864c31e0a3d1e84cae): motor, pruebas y calendario incorporados a `main`.
- [`bedaf390`](https://github.com/reySanchezDev/PaginaQuantix/commit/bedaf3905c031d1196e6391a382e459e532ad7a8): normalización Prettier.
- [`7de0f82`](https://github.com/reySanchezDev/PaginaQuantix/commit/7de0f8214288c78208aa66dd07eed7419a867612): actualización de dependencias; Vite resuelto a `8.3.4` por la alerta de seguridad detectada en `8.2.1`.
- [`f860a78`](https://github.com/reySanchezDev/PaginaQuantix/commit/f860a788b235e5ce857f5903ee6f63a7a79a3149): primer intento de lazo monocromático (geometría anterior).
- [`8db61eb`](https://github.com/reySanchezDev/PaginaQuantix/commit/8db61ebfa18502174cae671235246caaa445b932): **lazo final de una sola trayectoria**, aprobado para producción.

Verificaciones del último cambio visual:

- `main` apuntaba a `8db61ebfa18502174cae671235246caaa445b932` antes de la actualización documental.
- El despliegue Vercel de ese commit terminó con estado **success**.
- El workflow [Quality #39541171383](https://github.com/reySanchezDev/PaginaQuantix/actions/runs/39541171383) terminó con estado **success**.
- Varios escenarios de funcionamiento del motor fueron probados; el repositorio mantiene las pruebas automáticas en `tests/seasonal-themes.test.mjs`.

**Alcance de las evidencias:** éxito de compilación, pruebas y despliegue no sustituye una inspección visual futura en todos los tamaños de pantalla ni garantiza que el navegador del visitante tenga la hora correcta.

## 6. Diagnóstico y recuperación

**No aparece el tema durante octubre:**

1. Revisar `public/themes/calendar.js`: `enabled`, fechas y `id`.
2. En la consola del navegador, comprobar `document.documentElement.dataset.seasonalTheme`; durante campaña debe ser `"octubre-rosa"`.
3. Verificar que cargan sin error `/themes/calendar.js`, `/themes/scheduler.js` y `/themes/runtime.js`.
4. Confirmar reloj del dispositivo y la fecha en `America/Managua`.
5. Revisar versión publicada de `main` y cachés si hay un despliegue nuevo.

**El tema no se retira:** confirmar fecha/zona horaria y recargar. Si el navegador mantiene la página abierta, el motor revisa aproximadamente cada 30 segundos. También comprobar campañas superpuestas y su `priority`.

**Falta el favicon rosa:** comprobar `icon` en calendario, que exista `/themes/octubre-rosa/favicon.svg` y que `runtime.js` haya aplicado el tema. Los favicons pueden permanecer en caché del navegador.

**El lazo se ve cortado o pierde su forma:** comprobar que siga siendo el SVG de una sola trayectoria en `BaseLayout.astro`; no reemplazarlo por tres líneas superpuestas ni alterar `viewBox` sin una prueba visual.

**Reversión rápida y segura:** deshabilitar la campaña en calendario y publicar el cambio. Para revertir la arquitectura completa, preparar un cambio controlado que quite importación CSS, scripts, banner y assets temporales; **no** sustituir en bloque el repositorio por un commit viejo, porque podría borrar trabajo posterior.

## 7. Restricciones conocidas y próximos pasos

- La activación depende del reloj del visitante, aunque la zona horaria usada para el día sea `America/Managua`.
- El motor es **del sitio web**, no un orquestador remoto de los productos ejecutables.
- No existe consola de campañas ni gestión por base de datos; el calendario es un archivo bajo control de versiones.
- Los estilos utilizan tokens compartidos, pero pueden existir colores fijos en marcos de dispositivos o SVG no gobernados por los tokens; revisar cada nuevo tema de forma visual.
- Las capturas, vídeos, interfaces reales de productos, metadatos SEO/OG y la imagen institucional original deben mantenerse fieles a la realidad.
- La activación en `main` desencadena el proceso de despliegue conectado a GitHub/Vercel; comprobar tanto el despliegue como el workflow de calidad.
- Antes de una campaña futura, confirmar fechas locales, tono de conmemoración, aprobación editorial y accesibilidad.

**Resultado vigente:** motor preparado para futuras temporadas; Rosa Perla es la única campaña incorporada; su último ícono es un lazo rosa continuo de una sola trayectoria.

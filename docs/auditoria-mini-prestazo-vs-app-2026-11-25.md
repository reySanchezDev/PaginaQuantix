# Auditoría cruzada: Mini Prestazo vs aplicación real

Fecha: 25 de noviembre de 2026  
Repositorio web: `PaginaQuantix`, commit `ab71d04`, rama `main`  
Repositorio fuente: `C:\Users\reyre\Aplicaciones\Prestazo`, rama `develop`, commit `3d4bcaf`

## Objetivo

Convertir el Mini Prestazo de la segunda sección de la landing en una demostración confiable de la aplicación real: mismos conceptos, campos, textos, reglas visibles, mensajes y flujo de negocio, manteniendo el formato compacto y demostrativo de la landing.

Esta fase es únicamente de auditoría y planificación. No se modificó el componente ni se alteró la app Flutter.

## Fuentes revisadas

### Mini Prestazo

- `src/components/MiniPrestazoSettings.astro`: markup, campos, etiquetas y pantallas disponibles.
- `public/js/mini-prestazo.js`: estado, navegación, playback, valores de ejemplo y comportamiento interactivo.
- `public/css/mini-prestazo.css`: restricciones visuales y responsive.
- `src/components/ConversionLanding.astro`: ubicación del mini en la sección `#pantallas`, idioma y carga de scripts.

### Aplicación real

- `lib/presentation/screens/`: pantallas de dashboard, clientes, préstamos, pagos, cobros, reportes y configuración.
- `lib/data/models/app_settings.dart`: configuración persistida real.
- `lib/l10n/app_localizations_es.dart` y `app_localizations_en.dart`: textos, validaciones, mensajes de éxito/error y nombres de campos.
- `lib/services/`, `lib/core/logic/` y `lib/data/providers/`: reglas de cálculo, aplicación de pagos, ciclos, moneda y validaciones que deben reflejarse en la demo.
- `lib/presentation/router.dart` y `shell_screen.dart`: flujo y navegación de la aplicación.

## Hallazgos principales

### 1. El mini no es todavía una réplica funcional de la app

El mini actual tiene siete pantallas internas:

`company`, `monetary`, `policy`, `sequences`, `customer`, `loan` y `payment`.

La aplicación real expone, además:

- Dashboard con indicadores, acciones rápidas y estados de cartera.
- Clientes: listado, búsqueda/filtros, alta, edición, detalle, estado activo/inactivo y restricción `NO PRESTAR`.
- Cobrar: ruta de cobro, clientes pendientes y estados de mora.
- Historial de pagos.
- Detalle y edición de préstamo, cuotas/ciclos, comprobantes y estado de cuenta.
- Reportes realizados, proyectados y diferencial cambiario.
- Configuración ampliada, respaldo, mantenimiento, apariencia, idioma y acerca de.

**Conclusión:** la demo actual muestra un happy path parcial; no puede presentarse todavía como representación confiable de toda la app.

### 2. Configuración incompleta

El mini sí muestra empresa, moneda, capital disponible, validación de capital, prioridad de recuperación, política financiera, tasas de cambio simplificadas, reportes/secuencias y algunos datos de respaldo visual.

Faltan o están simplificados frente a `AppSettings` y `settings_screen.dart`:

- Validación de DNI y validación de formato/máscara.
- Días de mora/tolerancia.
- Capitalización de intereses no pagados.
- Devengo diario.
- Permitir múltiples préstamos por cliente.
- Restricción de abonos a capital y días de restricción.
- Política de tasa de desembolso y de pago: `BUY`, `SELL`, `MID`.
- Tasas oficiales/manuales y administración real de tipos de cambio.
- Moneda y tasa de reportes con sus mensajes informativos.
- Categorías de clientes.
- Frecuencias de pago configurables.
- Planes de pago con límites, cuotas, moneda y distribución capital/interés.
- Firmas, leyendas y personalización de comprobantes.
- Respaldo manual/programado, ubicación, retención, reintentos y acciones de mantenimiento.
- Apariencia, idioma y pantalla Acerca de.

El respaldo se considera un bloque prioritario e independiente dentro de Configuración. La demo deberá mostrar de forma explícita:

- Exportación o creación de respaldo manual.
- Carpeta/ubicación configurada para el respaldo.
- Frecuencia: deshabilitado, diario, semanal o mensual.
- Hora programada, retención de archivos y cantidad de reintentos.
- Respaldo automático al crear préstamo y al registrar pago.
- Nombre personalizado del archivo.
- Restauración de respaldo y confirmaciones de mantenimiento.
- Mensajes de carpeta no configurada, respaldo creado, restauración y error.

La demo no ejecutará operaciones reales sobre archivos: representará el flujo con datos de muestra y dejará claro cuándo se trata de una simulación.

Además, el mini usa pocos interruptores (`validateCapital`, `contractRatePolicy`, `logoPath`) donde la app real tiene varias políticas independientes. La configuración no debe crecer como una lista plana: conviene agruparla en bloques navegables dentro del dispositivo.

### 3. Creación de clientes incompleta

El mini cubre nombre, DNI, alias, teléfono, dirección, coordenadas, día preferido, notas y una acción de crear.

La app real añade como mínimo:

- Categoría de cliente.
- Validación de DNI configurable, incluyendo duplicados y máscara.
- Validaciones y mensajes exactos para campos obligatorios.
- Edición del cliente y restricción `NO PRESTAR` con motivo.
- Estado activo/inactivo y comportamiento posterior en cartera.

La demo debe conservar el flujo corto, pero debe mostrar la categoría y un estado de validación representativo; no basta con que los inputs acepten texto.

### 4. Creación de préstamos simplificada de forma incorrecta

El mini muestra plan, moneda, tasa de cambio, capital, tasa mensual, frecuencia, fecha, notas y un resumen básico.

La app real incorpora reglas que el mini no ejecuta o no comunica:

- Selección de plan activo y aplicación de sus valores.
- Moneda del plan y posibilidad de bloquear cambio de moneda.
- Tipo de tasa para desembolso y tasa oficial del día.
- Tasa manual cuando la configuración lo permite.
- Frecuencia configurable con intervalo de días, no solo `monthly`.
- Fecha de desembolso y fecha final opcional/calculada.
- Límites mínimo/máximo del plan.
- Validación de capital disponible.
- Validación de múltiples préstamos activos.
- Validación de cliente restringido.
- Cálculo de interés por convención financiera y periodo.
- Generación de número de préstamo y comprobante de desembolso.
- Mensajes de advertencia cuando falta tasa, frecuencia, cliente o datos válidos.

**Riesgo actual:** el resumen visual puede sugerir que el préstamo fue creado correctamente aunque no se hayan mostrado las condiciones que realmente determinan su amortización.

### 5. Registro de pagos claramente incompleto

El mini muestra cliente, préstamo, moneda, monto, tipo, fecha, notas y un botón de registro.

La app real también muestra o calcula:

- Préstamos activos del cliente y selección entre varios préstamos.
- Ciclos/cuotas pendientes.
- Tasa de cambio del pago y calculadora de divisas.
- Conversión entre moneda del pago y moneda del préstamo.
- Vista previa de aplicación del pago.
- Distribución entre mora, interés y capital.
- Restricción de abonos a capital por antigüedad.
- Interés diario y convenciones financieras.
- Reglas especiales para préstamos con cuota nivelada.
- Modos mixto, solo interés, solo capital, cancelar y recuperar.
- Confirmación antes de registrar.
- Recuperación con prioridad configurable y motivo de recuperación.
- Número de recibo, comprobante y mensaje posterior/WhatsApp.
- Validaciones de monto, fecha, moneda y estado del préstamo.

El mini actual solo actualiza la selección visual y muestra la secuencia; no representa la asignación real del pago ni sus advertencias.

### 6. Reportes ausentes

La app real ofrece tres familias en `reports_screen.dart`:

- Ganancias realizadas.
- Ganancias proyectadas.
- Diferencial cambiario.

También existen ajustes de moneda de reportes, filtros por fechas, desglose de pagos, detalle por préstamo y estados sin datos/error. El mini no tiene pantalla de reportes ni una salida equivalente.

La ampliación debe incluir una pantalla de reportes navegable y al menos un estado de cada familia, con datos coherentes con el cliente, préstamo y pago de la demo.

### 7. Textos y mensajes no están sincronizados

El mini mantiene un diccionario propio en `MiniPrestazoSettings.astro`, mientras que la app usa `app_localizations_es.dart` y `app_localizations_en.dart`, además de algunos textos todavía literales en pantallas Flutter.

Diferencias observadas:

- El mini tiene textos abreviados o genéricos que no siempre coinciden con las etiquetas reales.
- Hay campos nuevos de la app que todavía no tienen clave equivalente en el mini.
- La app tiene mensajes de validación, confirmación, error, advertencia y estados vacíos que el mini no representa.
- El mini debe corregir cualquier texto codificado incorrectamente y definir una fuente web de copy sincronizada, en lugar de duplicar cadenas sin control.

## Matriz de cobertura actual

| Área | App real | Mini actual | Estado | Acción requerida |
|---|---|---|---|---|
| Configuración de empresa | Completa | Parcial | Amarillo | Añadir campos, visibilidad, categoría de datos y mensajes |
| Configuración monetaria | Completa | Parcial | Amarillo | Añadir tasas, moneda de reportes y reglas dependientes |
| Política financiera | Completa | Parcial | Amarillo | Igualar opciones, valores y cálculo visible |
| Secuencias | Préstamo y recibo | Sí | Verde | Igualar textos y validaciones |
| Clientes | Alta/edición/detalle/estado | Solo alta guiada | Rojo | Añadir categoría, restricciones, validación y edición visual |
| Préstamos | Planes, moneda, frecuencia, límites, ciclos | Alta simplificada | Rojo | Replicar condiciones y resumen de amortización |
| Pagos | Selección, divisas, aplicación, recuperación, confirmación | Formulario visual | Rojo | Añadir preview de aplicación y reglas de pago |
| Dashboard | Sí | No | Rojo | Añadir pantalla de entrada y métricas de muestra |
| Cobrar | Sí | No | Rojo | Añadir ruta/lista de cobranza y estados |
| Historial | Sí | No | Rojo | Añadir historial de pagos y detalle |
| Reportes | 3 familias | No | Rojo | Añadir realizados, proyectados y diferencial |
| Textos ES/EN | Localización amplia | Diccionario reducido | Rojo | Crear catálogo web sincronizado |
| Mensajes/errores | Amplios | Pocos estados | Rojo | Añadir estados de validación, éxito, error y vacío |

## Plan cohesivo de integración

### Fase 0 — Contrato de referencia

1. Congelar el commit de la app de referencia por iteración.
2. Extraer un catálogo versionado de entidades, campos, opciones, textos y mensajes.
3. Definir el modelo de demo: datos locales ficticios, sin prometer persistencia ni operaciones reales.
4. Separar claramente `demo automática` de `modo exploración manual`.

**Salida:** `docs/mini-prestazo/contract-v1.md`, catálogo de copy y matriz de cobertura.

### Fase 1 — Motor de estado de la demo

1. Sustituir el estado implícito distribuido en el HTML por un estado tipado de demo.
2. Modelar empresa, configuración, categorías, frecuencias, planes, cliente, préstamo, ciclos, pago y reportes.
3. Implementar validadores y cálculos web con los mismos casos de negocio relevantes de Flutter.
4. Crear datos de muestra derivados de un solo escenario: configuración → cliente → préstamo → cuotas → pago → reportes.
5. Mantener reinicio, pausa, playback y `prefers-reduced-motion`.

**Salida:** demo estable que no muestra estados incompatibles entre pantallas.

### Fase 2 — Configuración y alta de cliente

1. Reorganizar configuración en pantallas compactas por grupos, con `Respaldo y mantenimiento` como bloque visible de primer nivel.
2. Añadir políticas omitidas y mostrar dependencias visibles.
3. Completar cliente con categoría, validación DNI, restricción y estados.
4. Alinear etiquetas y mensajes ES/EN con el catálogo de referencia.

**Salida:** configuración y cliente cubren todos los campos relevantes para el flujo posterior.

### Fase 3 — Préstamo y amortización

1. Igualar selección de plan, frecuencia, moneda, tipo de tasa y fechas.
2. Mostrar límites y mensajes de validación del plan.
3. Calcular resumen, cuotas/ciclos e interés con la convención seleccionada.
4. Mostrar número de préstamo y comprobante como resultado del alta.

**Salida:** el préstamo de la demo explica por qué sus cuotas y montos son los que se muestran.

### Fase 4 — Pago y recuperación

1. Seleccionar cliente, préstamo y ciclo pendiente.
2. Añadir moneda del pago, tasa, conversión y calculadora simplificada.
3. Implementar preview de aplicación por interés/capital/mora.
4. Cubrir tipos mixto, interés, capital, cancelar y recuperar.
5. Mostrar confirmación, recibo, mensajes y estado actualizado del préstamo.

**Salida:** el pago modifica de forma coherente saldos, cuotas, historial y reportes.

### Fase 5 — Dashboard, cobranza, historial y reportes

1. Añadir dashboard con indicadores derivados del escenario.
2. Añadir `A Cobrar` con pendientes, mora y ruta resumida.
3. Añadir historial y detalle de pago.
4. Añadir reportes realizados, proyectados y diferencial cambiario.
5. Añadir estados vacío, cargando, error y datos disponibles.

**Salida:** la demo recorre la aplicación completa, no solo formularios aislados.

### Fase 6 — QA de paridad y entrega

1. Crear una matriz de pruebas por pantalla, campo, regla, texto y mensaje.
2. Comparar capturas de la app real y del mini en desktop y móvil.
3. Verificar teclado, foco, contraste, reduced motion y scroll interno.
4. Validar español e inglés.
5. Compilar, ejecutar pruebas y publicar una preview con el SHA exacto.
6. Solo después de aprobación, promover a producción.

## Criterios de aceptación

- Cada campo visible del flujo principal tiene equivalente documentado en la app real.
- Las etiquetas y mensajes principales coinciden con el catálogo aprobado para ES y EN.
- Un escenario completo modifica coherentemente cliente, préstamo, cuotas, pago, historial y reportes.
- Los reportes muestran datos derivados del mismo escenario, no cifras desconectadas.
- Las reglas que no se pueden simular completamente en una landing se muestran como estados explicativos y no como acciones falsas.
- La demo conserva el diseño editorial, el playback automático y el uso exclusivo en escritorio definido para esta sección.
- No se agregan dependencias de base de datos ni se presentan datos de la demo como operaciones reales.
- La preview se identifica con el commit de la app de referencia y el commit web que la integra.

## Orden recomendado de implementación

1. Contrato/catálogo y modelo de estado.
2. Motor de validación/cálculo.
3. Configuración y cliente.
4. Préstamo/ciclos.
5. Pagos/aplicación.
6. Dashboard, cobranza, historial y reportes.
7. Copy, responsive, accesibilidad y QA visual.

Este orden evita ampliar pantallas con datos ficticios incompatibles y permite comprobar la paridad de cada fase antes de pasar a la siguiente.

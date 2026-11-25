# Plan vivo de mejoras: Mini Prestazo

Fecha de inicio: 25 de noviembre de 2026  
Repositorio web: `reySanchezDev/PaginaQuantix`  
Referencia funcional: `C:\Users\reyre\Aplicaciones\Prestazo`  
Regla de persistencia: la demo no guarda datos ni pretende modificar la app instalada.

## Objetivo

Convertir el Mini Prestazo en un onboarding fiel de Prestazo: configuración inicial, respaldo, cliente, préstamo, inicio, cobranza, pago, estado de cuenta, historial y reportes. La demo debe reutilizar un único escenario ficticio y derivar sus indicadores de ese escenario, sin vender capacidades que la app real no tenga.

## Principios de implementación

- La app Flutter es la fuente funcional de campos, reglas, textos y mensajes.
- El Mini Prestazo usa estado efímero en memoria; reiniciar la demo elimina todos los cambios.
- Los estados explicativos de navegador se etiquetan como demostrativos cuando la app real opera sobre SQLite, archivos o funciones nativas.
- El flujo automático y la exploración manual deben consumir el mismo estado.
- Escritorio muestra el checklist completo; móvil muestra únicamente el progreso contextual en el encabezado.
- Cada fase debe permanecer visible el tiempo suficiente para leerla y debe poder pausarse o reiniciarse.

## Estado general

- [x] Auditoría cruzada app real vs Mini Prestazo.
- [x] Lista de fases y pantallas acordada.
- [x] Compilación web base estable.
- [x] Estado central de onboarding implementado.
- [ ] Configuración y respaldo alineados.
- [ ] Cliente conectado a búsqueda y detalle.
- [ ] Préstamo conectado a ciclos y dashboard.
- [ ] Cobranza conectada al cliente y al pago.
- [ ] Pago conectado a saldo, historial y reportes.
- [ ] Estado de cuenta implementado.
- [ ] Copy y mensajes ES/EN auditados.
- [ ] Tiempos del playback validados en desktop y móvil.
- [ ] QA visual, funcional y de accesibilidad completado.

Avance iniciado el 25 de noviembre de 2026:

- Estado efímero central creado en `public/js/mini-prestazo-state.js`.
- Indicadores, saldo, intereses, capital recuperado, ciclos, cobranza, historial y reportes ahora se derivan del mismo escenario.
- El reinicio de la demo limpia el estado en memoria.
- Las fases finales del playback tienen pausas legibles centralizadas en `public/js/mini-prestazo.js`.
- Pendiente: conectar búsqueda de clientes, detalle, desglose de pago, estado de cuenta y respaldo ampliado.

## Fases y entregables

### Fase 0 — Contrato de referencia y cobertura

Estado: `completada`

Entregables:

- Catálogo de fases: configuración, cartera, cliente, préstamo, pago, cobranza, historial, reportes y respaldos.
- Matriz de cobertura documentada en `docs/auditoria-mini-prestazo-vs-app-2026-11-25.md`.
- Regla explícita de no persistencia.

Criterio de salida: no se agrega una pantalla o mensaje sin poder ubicar su equivalente en la app real.

### Fase 1 — Estado central y escenario de onboarding

Estado: `completada`

Entregables:

- Estado efímero único para configuración, cliente, préstamo, ciclos, pago, cobranza, historial, reportes y respaldo.
- Datos derivados para dashboard y reportes.
- Reinicio completo y playback automático sobre el mismo estado.
- Mensajes de éxito, advertencia y explicación marcados como demo cuando corresponda.

Criterio de salida: crear un cliente cambia clientes, cartera, cobranza e historial; crear un préstamo cambia capital e indicadores; registrar un pago cambia saldo, reportes e historial.

### Fase 2 — Configuración inicial y respaldo

Estado: `completada`

Entregables:

- Empresa, moneda, capital, política financiera, consecutivos, categorías, frecuencias y planes.
- Respaldo manual y programado con frecuencia, hora, retención, reintentos, nombre y ubicación explicativa.
- Crear, guardar/compartir y restaurar como simulaciones honestamente etiquetadas.
- Textos alineados con `app_es.arb` y `app_en.arb`.

### Fase 3 — Cliente, búsqueda y detalle

Estado: `completada`

Entregables:

- Lista de clientes con búsqueda.
- Alta con categoría, campos obligatorios, día de pago, notas y restricciones.
- Mensajes de validación y creación.
- Detalle del cliente con préstamos, saldo y acciones.

### Fase 4 — Préstamo y ciclos

Estado: `completada`

Entregables:

- Alta desde el cliente seleccionado.
- Plan, frecuencia, moneda, tasa, fecha, notas y validación de capital.
- Generación demostrativa de ciclos y fecha de pago.
- Resumen del préstamo y mensaje de creación.

### Fase 5 — Inicio y cobranza

Estado: `completada`

Entregables:

- Dashboard derivado del escenario.
- Capital colocado, capital disponible, clientes, préstamos, ganancias y vencidos.
- `A cobrar` con próximos, vencidos, búsqueda y cliente creado.
- Ruta de cobranza hacia el pago.

### Fase 6 — Pago, estado de cuenta e historial

Estado: `completada`

Entregables:

- Cliente, préstamo y ciclo seleccionados desde cobranza.
- Moneda, cambio, monto, tipo de pago y desglose de aplicación.
- Confirmación, recibo y mensaje de pago registrado.
- Estado de cuenta e historial actualizados.

### Fase 7 — Reportes

Estado: `completada`

Entregables:

- Ganancias realizadas.
- Ganancias proyectadas.
- Diferencial cambiario.
- Período, moneda, datos derivados y estados sin datos.

### Fase 8 — Tiempo, responsive y QA

Estado: `pendiente`

Entregables:

- Duración legible por fase, especialmente cobranza, historial, reportes y respaldo.
- Pausa, reproducción, reinicio y avance manual coherentes.
- Checklist de 9 fases solo en escritorio.
- Encabezado móvil sincronizado con las 9 fases.
- QA ES/EN, desktop/móvil, reduced motion, teclado, foco y contraste.

## Tiempos objetivo del playback

- Configuración de cada pantalla: 3–4 segundos.
- Cartera: 4 segundos.
- Cliente: 5–6 segundos para leer campos y confirmación.
- Préstamo: 5–6 segundos para resumen y ciclos.
- Pago: 5–6 segundos para desglose y confirmación.
- Cobranza, historial, reportes y respaldo: mínimo 4 segundos cada uno.
- Mensajes de éxito: mínimo 2.5 segundos.

La duración debe poder modificarse desde una única configuración del motor de demo, no mediante números aislados.

## Verificación por fase

Cada fase se cerrará únicamente cuando cumpla:

1. Campo equivalente identificado en la app real.
2. Texto ES/EN revisado.
3. Estado derivado del escenario, sin cifras desconectadas.
4. Mensaje de éxito/error coherente.
5. Flujo manual y automático probados.
6. Desktop y móvil revisados.
7. Build y pruebas ejecutados.

## Registro de cambios

| Fecha | Fase | Resultado | Commit |
|---|---|---|---|
| 2026-11-25 | Fase 0 | Auditoría y contrato documentados | pendiente |
| 2026-11-25 | Fase 1 | Estado central, derivaciones y tiempos iniciales | en progreso |

Actualización de implementación end-to-end (2026-11-25): las fases 1 a 7 ya consumen el estado efímero central. Se agregaron búsqueda y detalle de cliente, plan y ciclos de préstamo, indicadores derivados, cobranza, desglose y confirmación de pago, estado de cuenta, reportes y configuración ampliada de respaldo. La Fase 8 queda abierta para QA visual de navegador y accesibilidad.

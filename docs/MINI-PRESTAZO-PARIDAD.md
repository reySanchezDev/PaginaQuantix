# Auditoría de paridad Mini Prestazo / Prestazo

Fecha: 2026-11-25

## Resultado de esta iteración

La demo debe representar el onboarding de Prestazo con datos efímeros. No debe presentar clientes, recibos, saldos o reportes que no provengan del flujo demostrado.

| Fase | Pantalla real de Prestazo | Paridad aplicada |
| --- | --- | --- |
| 1–4 | Configuración | Empresa, gestión monetaria, política financiera y consecutivos |
| 5 | Inicio / Dashboard | Indicadores derivados de las entidades creadas en el flujo |
| 6 | Clientes / Nuevo cliente | Datos de identidad, contacto, dirección, categoría, día de pago, notas y creación |
| 7 | Préstamos / Nuevo préstamo | Cliente, plan, moneda, cambio, capital, tasa, frecuencia, fecha y creación |
| 8 | Pagos / Registrar pago | Préstamo, moneda, monto, fecha, tipo de pago, desglose y recibo |
| 9 | A Cobrar | Estados Al Día/Atrasados, búsqueda y acción Registrar Pago |
| 10 | Historial de Pagos | Recibo generado y estado de cuenta del cliente |
| 11 | Reportes | Ganancias Reales, Proyección y Diferencial Cambiario |
| 12 | Respaldo Programado | Frecuencia, hora, disparadores automáticos, nombre y retención |

## Correcciones aplicadas

- El flujo y el checklist ahora representan las 12 pantallas ejecutadas por la demo.
- La navegación manual del mini Prestazo sincroniza pantalla, encabezado y checklist.
- Los indicadores, cobranza, historial, estado de cuenta y reportes parten de las entidades creadas en el flujo.
- Se eliminaron los registros ficticios adicionales de cobranza e historial del markup inicial.
- Cobranza incluye los estados `Al Día`/`Atrasados`, búsqueda y acción `Registrar Pago`.
- Reportes incluye los tres tipos reales y el rango de fechas como estructura de la pantalla real.
- El respaldo conserva únicamente controles presentes en la configuración real del respaldo programado.
- La demo sigue siendo no persistente: los datos solo viven durante la reproducción.

## Límites intencionales de la demo

- La demo no crea planes, clientes, préstamos, pagos ni respaldos reales.
- Las acciones de exportar, restaurar, compartir y eliminar solo muestran el estado de Prestazo; no acceden al sistema de archivos.
- Las cifras son calculadas únicamente con las entidades efímeras del onboarding.
- La demo no reproduce servicios externos, WhatsApp, PDF ni base SQLite.

## Fase 2 aplicada

- Validaciones de campos requeridos para cliente, préstamo y pago.
- Mensajes alineados con Prestazo: `Este campo es requerido`, `Cliente creado exitosamente`, `Préstamo creado exitosamente`, `Pago registrado exitosamente` y `Seleccione un préstamo`.
- Flujo de cliente ampliado con categoría, alias, día preferido y notas.
- Flujo de préstamo ampliado con tasa de cambio y notas.
- Flujo de pago ampliado con notas y desglose derivado.
- Reportes con pestañas accionables para Ganancias Reales, Proyección y Diferencial Cambiario.
- Respaldo separado en exportación, restauración, programación y respaldos locales.

La demo continúa sin persistencia ni operaciones reales de archivos: las acciones muestran el estado equivalente de la aplicación, pero no escriben datos.

## Fase 3 aplicada: cierre end-to-end

- Cálculo dinámico de interés, capital aplicado, saldo restante y saldo del préstamo.
- Plan seleccionado con frecuencia, plazo y cuotas visibles.
- Directorio del cliente creado y acceso al detalle desde la misma pantalla.
- Cobranza con estado `Al Día`/`Atrasados`, búsqueda y navegación al registro de pago.
- Historial con recibo, cliente, tipo de pago, aplicación de interés/capital y saldo.
- Reportes con pestañas, fechas inicial/final y acción de generación.
- Respaldo con exportación, destino, programación, restauración y listado de respaldos locales.
- Reinicio completo de la demostración sin conservar datos.

## Fuentes revisadas en Prestazo

- `lib/presentation/screens/cobrar/cobrar_screen.dart`
- `lib/presentation/screens/payments/payment_history_screen.dart`
- `lib/presentation/screens/reports/reports_screen.dart`
- `lib/presentation/screens/settings/scheduled_backup_screen.dart`
- `lib/presentation/screens/settings/settings_screen.dart`
- `lib/presentation/screens/loans/loan_form_screen.dart`

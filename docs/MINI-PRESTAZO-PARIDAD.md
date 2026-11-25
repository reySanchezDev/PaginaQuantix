# Auditoría de paridad Mini Prestazo / Prestazo

Fecha: 2026-11-25

## Resultado

La demo debe representar el onboarding de Prestazo con datos efímeros. No debe presentar clientes, recibos, saldos o reportes que no provengan del flujo demostrado.

| Fase | Pantalla real de Prestazo | Paridad aplicada |
| --- | --- | --- |
| 1 | Configuración de empresa | Identidad, contacto, visibilidad y guardado de configuración |
| 2 | Inicio / Dashboard | Indicadores de clientes, préstamos, pagos, capital disponible, capital colocado y vencidos |
| 3 | Clientes / Nuevo cliente | Datos de identidad, contacto, dirección, categoría, día de pago, notas y creación |
| 4 | Préstamos / Nuevo préstamo | Cliente, plan, moneda, cambio, capital, tasa, frecuencia, fecha y creación |
| 5 | Pagos / Registrar pago | Préstamo, moneda, monto, fecha, tipo de pago, desglose y recibo |
| 6 | A Cobrar | Pestañas Al Día/Atrasados, búsqueda, fecha de vencimiento, cuota, capital y Registrar Pago |
| 7 | Historial de Pagos | Recibos registrados y estado de cuenta del cliente |
| 8 | Reportes | Ganancias Reales, Proyección y Diferencial Cambiario con rango de fechas |
| 9 | Respaldo Programado | Frecuencia, hora, disparadores automáticos, nombre de archivo, retención y guardado |

## Correcciones de esta auditoría

- Se eliminaron del flujo visible los registros ficticios adicionales de cobranza e historial.
- Los indicadores, cobranza, historial, estado de cuenta y reportes usan el cliente, préstamo y pago creados en la demo.
- La fase de préstamo selecciona el plan mensual estándar y la configuración muestra la administración de planes.
- Los textos de las fases 6–9 se alinean con las pantallas y localizaciones de Prestazo.
- La demo sigue siendo no persistente: los datos solo viven durante la reproducción.

## Fuentes revisadas en Prestazo

- `lib/presentation/screens/cobrar/cobrar_screen.dart`
- `lib/presentation/screens/payments/payment_history_screen.dart`
- `lib/presentation/screens/reports/reports_screen.dart`
- `lib/presentation/screens/settings/scheduled_backup_screen.dart`
- `lib/presentation/screens/settings/settings_screen.dart`
- `lib/presentation/screens/loans/loan_form_screen.dart`

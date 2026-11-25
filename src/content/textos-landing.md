# Prestazo — textos de la landing y control de aprobación

> **Documento maestro editorial.** Los textos de la landing se proponen aquí, se revisan aquí y solo se marcan **APROBADOS** cuando el propietario los autoriza expresamente. No sustituir un texto aprobado por una variante generada sin aprobación.

## Reglas de trabajo

1. **Fuente única del hero:** el componente `src/components/ConversionLanding.astro` lee directamente las claves de la portada desde este archivo. No mantener otra versión de la portada incrustada en el componente.
2. **Estado de esta propuesta:** **PENDIENTE DE APROBACIÓN**. Está publicada solamente en una preview privada; no equivale a autorización para producción.
3. Una corrección visual, una actualización de capturas o una compilación **no autoriza** a modificar copy aprobado.
4. Los cambios de texto se proponen con la redacción anterior y la nueva, y deben esperar autorización antes de cambiar un texto aprobado.
5. **Sin afirmaciones inventadas:** nada de clientes, reseñas, cifras de adopción, ahorro garantizado, recaudación garantizada o funciones que no estén implementadas. Las capturas con importes de muestra no son testimonios.
6. El resto de los textos de V4, aún definidos en `ConversionLanding.astro`, quedan congelados para evitar cambios accidentales. Se incorporarán aquí por secciones en futuras revisiones, sin alterar su redacción como parte de esa migración.
7. Las versiones en español e inglés deben expresar las mismas capacidades reales, pero pueden adaptarse de forma natural a cada idioma.

## Portada ES — propuesta comercial V5

**Estado:** TEXTO DE PORTADA ACTUALIZADO POR INSTRUCCIÓN DEL PROPIETARIO (2026-11-23)

**Idea central:** Dar prioridad al trabajo del prestamista y presentar a Prestazo como la herramienta que simplifica la gestión de su cartera. Mostrar las capturas reales antes de la descarga.

<!-- HERO_ES_START -->
- **seoTitle**: Prestazo | Tu cartera de préstamos, siempre clara
- **seoDescription**: Revisá capital en cartera, cobros por vencer, atrasos y ganancias. Gestioná préstamos, abonos, recibos y tipos de cambio con Prestazo para Android.
- **hero1**: Concéntrate en lo que realmente importa
- **hero2**: y deja que prestazo se encargue de facilitarte la gestión de tu cartera.
- **heroButton**: Descargar Prestazo gratis
<!-- HERO_ES_END -->

## Portada EN — propuesta comercial V5

**Estado:** PENDING APPROVAL

<!-- HERO_EN_START -->
- **seoTitle**: Prestazo | Keep your loan portfolio in clear view
- **seoDescription**: Track outstanding principal, upcoming and overdue collections, earnings, payments, receipts and exchange rates with Prestazo for Android.
- **hero1**: Focus on what truly matters
- **hero2**: and let Prestazo make managing your loan portfolio easier.
- **heroButton**: Download Prestazo free
<!-- HERO_EN_END -->


## Sección Clientes — texto activo en vista previa (revisión V6: nuevo titular)

**Estado:** PENDIENTE DE APROBACIÓN. La sección se muestra solo en la vista previa.

<!-- CLIENTES_ES_START -->
- **title1**: Gestiona tus clientes
- **title2**: de forma óptima.
<!-- CLIENTES_ES_END -->

<!-- CLIENTES_EN_START -->
- **title1**: Manage your customers
- **title2**: more efficiently.
<!-- CLIENTES_EN_END -->

**UX V5:** un título en dos frases, un solo párrafo concreto y el video visible en el primer tramo de la sección móvil; conserva los campos y funciones reales de Clientes.

## Clientes — revisión editorial V2

**Estado:** PROPUESTA PENDIENTE DE APROBACIÓN. No reemplaza los textos que muestra la vista previa.

**Enfoque:** Antes de conceder otro préstamo o recibir un pago, el prestamista debe poder consultar la situación financiera de ese cliente. Funciones contrastadas con `Prestazo/develop`: ficha individual, capital pendiente, interés mensual estimado, préstamos activos/cancelados, acceso a nuevo préstamo y registro de pago. No prometer un historial consolidado de pagos desde el menú «Ver historial completo», cuyo controlador aún no ejecuta una acción.

<!-- CLIENTES_REVISION_ES_START -->
- **title**: Antes de volver a prestar, conocé cómo está cada cliente.
- **body**: ¿Cuánto capital tiene pendiente? ¿Qué intereses se esperan y cuántos préstamos mantiene activos? Prestazo reúne esas respuestas en la ficha de cada cliente, junto con sus préstamos cancelados. Desde ahí podés registrar un pago o crear un nuevo préstamo, sin volver a revisar apuntes ni hacer cuentas por separado.
- **point1**: Capital pendiente e interés mensual estimado
- **point2**: Préstamos activos y cancelados
- **point3**: Nuevo préstamo o registro de pago desde su ficha
- **secondary**: Encontrá clientes por nombre, alias o teléfono y organizalos con categorías propias.
<!-- CLIENTES_REVISION_ES_END -->

## Clientes — revisión editorial V3

**Estado:** PROPUESTA PENDIENTE DE APROBACIÓN. No reemplaza el texto activo.

**Alcance verificado en `Prestazo/develop`:** módulo Clientes, sin mezclar cartera, saldos, intereses ni decisiones de otorgamiento propias de Préstamos.

<!-- CLIENTES_REVISION_V3_ES_START -->
- **title**: Tu base de clientes merece algo más que una lista de nombres.
- **body**: Con Prestazo, cada cliente tiene una ficha con su cédula, teléfono, dirección, referencias de ubicación y día preferido de pago. Podés agregar un alias, registrar notas y organizar a tus clientes con categorías personalizadas. Cuando necesitás encontrar a alguien, usás la búsqueda y los filtros por estado o frecuencia de pago, sin revisar libretas ni conversaciones.
- **layout**: Título, párrafo y captura real de Clientes. Eliminar las tres etiquetas repetitivas debajo del texto.
<!-- CLIENTES_REVISION_V3_ES_END -->

## Registro de aprobación

| Fecha | Sección | Estado | Motivo |
|---|---|---|---|
| 2026-11-23 | Portada V6 ES/EN + CTA | AUTORIZADO | Nuevo texto solicitado para la primera sección; se retira «Ver Prestazo por dentro» y se mueve el botón de descarga debajo de las capturas con el icono oficial de Google Play. La versión EN se adapta al mismo mensaje. |
| 2026-11-23 | Portada V4 | RECHAZADO | No transmitía suficiente valor comercial. No reutilizar su titular ni su descripción como «texto aprobado». |
| 2026-11-23 | Portada V5 ES/EN | PROPUESTO | Nuevo posicionamiento enfocado en una cartera en crecimiento y funcionalidades concretas. A la espera de autorización. |
| 2026-11-23 | Retirar tres textos de portada ES | AUTORIZADO | Se eliminaron el subtítulo superior, el párrafo descriptivo y la nota inferior de Android. Título y botones intactos. |
| 2026-11-23 | Nuevo titular de portada ES | APROBADO | «Hacé crecer tu cartera. Prestazo se encarga del orden.» Se conservan los CTA y el resto de los textos. |
| 2026-11-23 | Sección Clientes y estilo de capturas | PROPUESTO | Sustituye el rótulo «Prestazo / 01» y la introducción general por una sección propia de Clientes con su captura real. La nueva redacción espera aprobación. |
| 2026-11-23 | Clientes — revisión editorial V2 | RECHAZADO | Enfoque sobre préstamos y saldos, no sobre la gestión de clientes. |
| 2026-11-23 | Clientes — revisión editorial V3 | PROPUESTO | Redacción exclusiva de altas, datos personales de contacto, categorías, búsquedas y filtros. Pendiente de aprobación. |
| 2026-11-23 | Clientes — revisión editorial V4 | PROPUESTO EN PREVIEW | Texto más concreto sobre identificación, ubicación, búsqueda, filtros y actualización; se muestra sin etiquetas repetidas. A la espera de aprobación. |

## Secciones pendientes de centralizar

Esta tabla controla el alcance sin fingir que el resto del texto está aprobado.

| Sección actual | Estado editorial | Acción |
|---|---|---|
| Menú y navegación | SIN APROBACIÓN FORMAL | Conservar literalmente por ahora |
| Proceso cliente, préstamo, cobro y pago | SIN APROBACIÓN FORMAL | Nueva sección Clientes separada en el bloque anterior; las demás etapas conservan su redacción |
| Explorador de pantallas | SIN APROBACIÓN FORMAL | Conservar literalmente por ahora |
| A Cobrar y reportes | SIN APROBACIÓN FORMAL | Conservar literalmente por ahora |
| Configuraciones, divisas, respaldos y FAQ | SIN APROBACIÓN FORMAL | Conservar literalmente por ahora |
| CTA final y pie de página | SIN APROBACIÓN FORMAL | Conservar literalmente por ahora |


## Clientes — decisión UX V5 (2026-11-24)

**Estado:** EN VISTA PREVIA, pendiente de aprobación visual. Se reemplazan los dos párrafos extensos de la revisión V4 por una explicación breve y un título de dos partes; se da prioridad al video, especialmente en móvil. Sin cambios en la grabación.


## Clientes — revisión V6 (2026-11-24)

**Estado:** Aplicado en preview, pendiente de aprobación. Titular ES actualizado por solicitud expresa a «Gestiona tus clientes de forma óptima.» y equivalente en inglés. Se conserva el párrafo y el video existente. Corrección de la tilde en «óptima» para ortografía profesional.


## Clientes — revisión V7 (2026-11-24)

**Estado:** aplicado en preview, pendiente de revisión visual. A solicitud del propietario se elimina el párrafo explicativo bajo «Gestiona tus clientes de forma óptima.» y su equivalente EN. Se mantiene título, video y resto de la landing.

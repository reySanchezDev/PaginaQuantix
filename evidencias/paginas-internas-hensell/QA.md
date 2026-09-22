# Páginas internas — rama hensell

Fecha: 8 de septiembre de 2026. Preview local: http://127.0.0.1:4322.

## Cambios

- Soluciones: situaciones concretas visibles en cada acordeón, explicación ampliable y enlaces a casos o consultas con contexto. Se conserva la animación nativa de apertura y cierre.
- Productos: capturas reales limpias de Takofy y Nica Finanzas en sus cabeceras, ampliación mediante enlaces nativos y pies de imagen en HTML. El catálogo muestra las capturas completas con una proporción común y explicita plataforma/disponibilidad.
- Cómo trabajamos: preparación de la primera conversación y criterio para revisar cambios de prioridades, basado en la información del propietario.
- Empresa: origen de Quantix y aprendizaje de Takofy/VIGGO según el propietario. La autonomía y la menor dependencia del soporte se presentan como intención de diseño, no como garantía.
- Contacto: tema editable que prepara el asunto de ambos enlaces de correo. Las consultas de producto y la navegación móvil/escritorio llevan el producto de origen. Se conserva el tema al cambiar ES/EN. Copiar dirección sigue copiando únicamente el correo y mostrando el aviso flotante.

## Comprobaciones

- `npm run quality`: formato, ESLint, Knip, tamaño máximo de fuentes, Astro, compilación estática, validación de 30 páginas y auditoría de dependencias. Resultado: correcto; 0 errores, advertencias o vulnerabilidades.
- `git diff --check`: correcto.
- Revisión visual de Soluciones, Contacto, Empresa, Cómo trabajamos, Takofy y Nica Finanzas en escritorio y móvil. Catálogo revisado en escritorio y Takofy en inglés a 768 px. Capturas adjuntas.
- 42 combinaciones de rutas ES/EN y anchos 320, 768 y 1440 px: sin desbordamiento horizontal ni imágenes visibles rotas. Son comprobaciones de DOM, complementadas por la revisión visual anterior.
- 24 comprobaciones del contacto: nueve temas y tres valores vacíos/desconocidos por idioma. Los dos enlaces de correo mantienen el mismo asunto y el cambio de idioma conserva el tema. Valores `constructor` y `__proto__` vuelven al tema general sin reflejarse en el asunto.
- Recorridos reales: Integraciones → Contacto → inglés; menú móvil de Takofy → Contacto. Selector cambiado con teclado, URL y asunto actualizados.
- Acordeón abierto con clic y cerrado con Enter. Foco conservado en summary y transición de 260 ms.
- Copia del correo comprobada con aviso visible a 320 px. No se enviaron mensajes ni se activaron aplicaciones externas de correo.
- No se modificó el controlador de correo existente; el HTML conserva enlaces mailto utilizables si JavaScript no está disponible.
- Consola de navegador sin errores al finalizar. Viewport restablecido, pestaña temporal de QA cerrada y pestaña del usuario recargada.

## Material pendiente

El propietario enviará más adelante capturas reales de QAVision. También quedan para una entrega posterior las fotografías de negocios y testimonios autorizados. No se añadieron sustitutos ficticios.

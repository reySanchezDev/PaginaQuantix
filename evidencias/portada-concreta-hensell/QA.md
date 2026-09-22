# Refinamiento de la portada

## Cambios

- Reencuadre del dashboard dentro de la MacBook: conserva el área principal y los importes de la derecha, recortando la navegación lateral.
- Detalle ampliado de los cobros existentes de VIGGO, compartido entre la portada y Empresa. Se conserva el archivo original; el encuadre móvil destaca importes y métodos de pago.
- Casos presentados como necesidad y solución, con pies que identifican los datos de ejemplo.
- Textos de servicios centrados en tareas concretas: ventas, existencias, clientes y traspaso de datos.
- Sección del equipo con nombres, roles y LinkedIn de ambos fundadores, usando los datos ya confirmados.
- Hero móvil más compacto: a 390 × 844, su altura pasa de 968 a 829 px; el siguiente bloque comienza a 910 px, frente a 1049 px antes del ajuste.

El usuario indicó que conseguirá testimonios y fotografías más adelante. No se publicaron citas, retratos, negocios identificados ni resultados que no haya proporcionado.

## Revisión en navegador

- Capturas visuales de escritorio, escritorio estrecho, tablet y móviles de 320 y 390 px; revisión adicional de geometría a 430, 844 y 1024 px, incluida orientación horizontal.
- Español e inglés sin desbordamiento horizontal en los tamaños comprobados.
- Datos de la MacBook sin el corte previo a la derecha; pie de imagen separado de los dispositivos. Se corrigió la separación en escritorio estrecho después de la primera revisión.
- Enlaces de LinkedIn con nombres accesibles, apertura en otra pestaña y área de 44 px de alto; foco visible comprobado con teclado.
- El enlace del hero llega a los casos. La imagen de VIGGO abre el caso correspondiente en inglés.
- La captura compartida sigue mostrando los cobros correctamente en Empresa a 390 px.
- Sin errores de consola al finalizar la revisión.

La revisión móvil se hizo mediante tamaños de viewport del navegador, no en dispositivos físicos. Las capturas de 1440 px preceden al último ajuste de separación del pie de imagen; `hero-narrow-en.png` corresponde al ajuste final. El registro JSON distingue esa última comprobación con `phase: final`.

## Verificación técnica

`npm run quality` pasó: Prettier, ESLint, Knip, límite de tamaño de fuentes, Astro, compilación, validación de 30 páginas y auditoría de dependencias. Astro: cero errores, advertencias o sugerencias. Dependencias: cero vulnerabilidades.

Después del último ajuste de espacio se repitieron formato del archivo, compilación, validación del sitio y `git diff --check`, todos satisfactorios. No se añadieron dependencias ni JavaScript.

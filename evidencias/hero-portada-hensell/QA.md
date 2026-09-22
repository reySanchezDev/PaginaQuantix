# Portada — rama hensell

Revisión del 8 de septiembre de 2026 sobre el sitio local en el puerto 4322.

## Cambio

El mensaje de desarrollo a medida y el contacto encabezan la portada. El antiguo panel oscuro de VIGGO se sustituye por un recorrido manual de Takofy, con dos vistas del mismo pedido: salón y cocina. Se mantienen las dos familias tipográficas y los colores de la marca.

Las capturas de escritorio provienen de los originales documentados en `../takofy-capturas/README.md`. Las nuevas capturas móviles se obtuvieron de `https://app.takofy.app/`, en el negocio local invitado «Restaurante Demo», a 390 × 844. Muestran la revisión del pedido existente de Mesa 1 y su detalle de cocina. Los PNG originales se conservan en `public/images/takofy/`; la web encuadra los elementos relevantes mediante CSS. No se modificaron las comandas al capturarlas. Las imágenes y sus pies identifican los datos de ejemplo.

## Verificación

- ES y EN a 320 × 740, 390 × 844, 768 × 1024, 844 × 390, 1024 × 900 y 1440 × 1000: sin desbordamiento horizontal; capturas cargadas y controles de 44 px. Mediciones en `responsive.json`.
- Revisión visual de portada y ambas vistas a 390 px y escritorio, además de 320 px e inglés en escritorio. Capturas adjuntas.
- A 320 px, el botón principal termina a 503 px de una pantalla de 740 px.
- Cambio de vista con clic: altura del hero y posición de scroll constantes en móvil. Panel visible único.
- Teclado: flechas con retorno al extremo, Home, End, Tab hacia el panel y foco visible. Registro en `keyboard.json`.
- Contacto, ancla de casos y caso Takofy comprobados mediante navegación real. El ancla respeta el encabezado fijo.
- Mejora progresiva revisada en el código: sin JavaScript se muestra la primera captura y se conserva el enlace al caso; los controles solo aparecen tras inicializarse.
- Movimiento reducido cubierto por las reglas CSS del componente y del sitio; no se emuló esta preferencia en el navegador. Transición normal: desvanecimiento de 240 ms, sin avance automático.
- Sin errores JavaScript observados. El aviso de Vercel Analytics corresponde a su endpoint ausente en el servidor local.
- `npm run quality`: formato, lint, código sin uso, límite de 300 líneas, comprobación Astro, build, validación de 30 páginas y auditoría de dependencias correctos. Tras acortar el titular inglés se repitieron formato, build y validación de páginas.

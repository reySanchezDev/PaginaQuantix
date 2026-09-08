# Rework del hero — hensell

Fecha: 2026-09-08. Vista local de producción: http://127.0.0.1:4322/es/.

## Cambio

Portada terracota con mensaje y contacto juntos. Titular nuevo, composición de capturas reales de VIGGO en escritorio y Takofy en móvil, y enlaces a los casos. Conserva las fuentes y los colores de Quantix. La presentación identifica los datos de las capturas como ejemplos.

Se retiró el recorrido con pestañas del hero y su código exclusivo. Los casos conservan las explicaciones, capturas y flujos detallados. No se añadieron dependencias ni nuevas imágenes. La entrada utiliza el controlador de movimiento existente, que conserva contenido visible sin JavaScript y respeta movimiento reducido.

## Validación

- QA mediante CUA en navegador local: 320×740, 390×844, 844×390, 768×1024, 1024×900 y 1440×1000. Sin desbordamiento horizontal. Revisión visual de móvil, tablet y escritorio, incluido el paso a los casos.
- ES y EN: titulares, imágenes cargadas, CTA y jerarquía revisados. Capturas adjuntas en este directorio.
- CTA a contacto EN abre `/en/contact/`. El enlace de trabajo activado con teclado lleva a `#case-studies`.
- Foco visible marfil de 2 px sobre terracota. El CTA mide 52 px de alto y los enlaces del hero al menos 44 px.
- Menú móvil EN: apertura, contenido principal inerte, cierre con Escape y devolución del foco al disparador correctos.
- Contraste calculado: texto marfil/terracota 5.24:1; CTA 14.82:1; texto del CTA al pasar el puntero 6.79:1.
- Imágenes reutilizadas: 180,519 bytes combinados. Dimensiones reservadas para evitar saltos de composición.
- Consola de navegador: sin errores observados.
- `npm run quality` correcto: formato, lint, Knip, límite de archivos, Astro check (0 errores/advertencias), build de 30 páginas, validación de HTML/enlaces y auditoría sin vulnerabilidades.
- Tras el ajuste final de altura en escritorio estrecho y semántica de navegación: formato, build, validación del build y `git diff --check` correctos.

La revisión responsive utiliza tamaños de navegador, no dispositivos físicos. El controlador de movimiento reducido no se modificó; su validación previa está documentada en `../movimiento-hensell/`.

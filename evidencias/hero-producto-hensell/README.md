# Portada: captura real del producto

La ilustración abstracta de la Q se sustituyó por una composición con la captura existente de VIGGO. El bloque identifica el producto, explica su utilidad y enlaza a su página localizada. La captura se encuadra de forma intencional dentro de la composición; no añade datos ficticios ni JavaScript al sitio.

Se equilibraron las columnas y el tamaño del titular. En móvil, la composición aparece después de las acciones principales.

## Verificación

- 18 combinaciones: español e inglés a 320, 360, 390, 430, 768, 844, 900, 1024 y 1440 px; incluye orientación horizontal 844 × 390.
- Sin desbordamiento de página, solapamiento entre columnas ni errores de JavaScript. Titular de tres líneas en todos esos anchos.
- Imagen cargada correctamente y enlace con área de 44 px de alto como mínimo.
- Navegación al producto verificada con teclado en ambos idiomas.
- Axe WCAG A/AA sin incidencias en la portada revisada. No equivale a una auditoría manual completa de accesibilidad.
- `npm run quality` completo: formato, lint, código no utilizado, tamaño de fuentes, Astro, compilación, enlaces y auditoría de dependencias correctos.
- Capturas realizadas en Chromium; la vista previa del navegador de Codex también se actualizó y revisó visualmente.

## Evidencias

- [Escritorio, 1440 px](es-1440.png)
- [Escritorio estrecho, 900 px](es-900.png)
- [Tablet, 768 px](es-768.png)
- [Móvil, 390 px](es-390.png)
- [Móvil pequeño en inglés, 320 px](en-320.png)
- [Resultados estructurados](qa-report.json)

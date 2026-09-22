# Nica Finanzas: capturas y presentación

Capturas realizadas el 7 de septiembre de 2026 sobre [nicafinanzas.com](https://nicafinanzas.com/) y compuestas en [Hen Screenshots](https://screenshots.hensell.dev/).

## Archivos

- [Proyecto editable de Hen Screenshots](studio/Nica-Finanzas-Quantix.henscreenshots)
- [Exportación PNG de las tres composiciones](studio/Nica-Finanzas-Quantix-portfolio-card.zip)
- [Salario](studio/01-Tu-salario-claro.png)
- [Préstamo](studio/02-El-costo-completo.png)
- [Liquidación](studio/03-Cada-concepto-desglosado.png)
- `raw/`: capturas originales de la aplicación, sin alterar la interfaz ni sus resultados.
- `qa/`: capturas de la integración responsive en Quantix.

El proyecto también queda guardado en el almacenamiento local de Hen Screenshots como **Nica Finanzas · Quantix**. Las composiciones usan Gallery y el marco Laptop, a 1600 × 1200 px.

## Ejemplos de las capturas

Son datos de demostración, no datos personales del usuario:

- Salario: C$30,000 brutos mensuales.
- Préstamo: US$10,000, tasa anual del 12%, plazo de tres años; amortización francesa seleccionada.
- Liquidación: C$30,000 de salario, 15 días de vacaciones y las fechas que ofrece inicialmente la aplicación; sector privado y motivo de terminación visibles en la captura.

Se conservaron los resultados que muestra el producto. Este trabajo documenta y presenta su interfaz; no verifica sus fórmulas financieras o legales.

## Integración

- Hero de Nica Finanzas con una composición real en lugar del símbolo abstracto.
- Galería con tres bloques de imagen, explicación localizada y enlace a la captura completa.
- Tarjeta de Nica Finanzas en Inicio y Productos con una vista previa de la calculadora.
- Seis imágenes WebP, aproximadamente 352 KiB en total. El hero tiene prioridad de carga; la galería y las tarjetas cargan de forma diferida.
- Imágenes originales en español; títulos, explicaciones, enlaces y textos alternativos de Quantix en español e inglés.

## Verificación

- Revisión visual de la ficha a 1440 y 903 px, tablet de 768 px y móviles de 390 y 320 px.
- Versión inglesa comprobada a 320 y 1440 px.
- Sin desbordamiento horizontal en las medidas revisadas.
- Tres imágenes de galería cargadas; enlaces de texto con 44 px de alto.
- Apertura real de una captura completa verificada en una nueva pestaña, a 1440 × 1000 px.
- Catálogo revisado para conservar la altura y alineación de sus tarjetas.
- `npm run quality`: formato, lint, código no utilizado, límite de tamaño, Astro, build, enlaces y auditoría de dependencias.

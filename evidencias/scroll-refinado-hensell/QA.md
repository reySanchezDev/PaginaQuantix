# Entradas al hacer scroll

8 de septiembre de 2026. Rama `hensell`, vista local en el puerto 4322.

## Ajuste

- Entradas de 480 ms con desaceleración suave: imágenes 16 px, texto 12 px.
- Texto con 80 ms de retraso en casos de portada, productos de la sección Empresa y galerías. Cada parte se observa por separado; en móvil, el texto espera a entrar en pantalla.
- Se retiró la animación del contenedor de cada pareja para evitar movimiento duplicado.
- El retraso ahora también se aplica a las entradas disparadas por scroll. Se limita al intervalo 0–160 ms.
- Se corrigió la lectura de duración: el CSS de producción serializa `480ms` como `.48s`. El controlador convierte ambas unidades a milisegundos para WAAPI. La prueba dirigida cubre ambos formatos.
- Se conserva aparición única, HTML visible sin JavaScript, cancelación al recibir foco y preferencia de movimiento reducido. Sin escuchas de scroll, animaciones continuas ni nuevas dependencias.

## Comprobación

- Navegador CUA: portada a 1440×1000 y 390×844, galería de Takofy a 390×844 y Empresa a 1024×900. Sin desbordamiento horizontal ni errores de consola.
- Se observaron los estados de entrada activos de imagen y texto; finalizan con opacidad 1 y sin transformación residual.
- Tras bajar y volver a subir, las cuatro entradas de los casos permanecen terminadas: no se repiten.
- Galería móvil: segunda imagen ya revelada, mientras su pie permanece pendiente por estar debajo del viewport. El texto no se anima prematuramente con la imagen.
- Empresa: no hay elementos animados anidados.
- Prueba dirigida del controlador real en Node con dobles de DOM, animación y media query: secuencia, duración, ejecución única, foco, movimiento reducido inicial y dinámico, independencia móvil, navegación por ancla, límites del retraso y ausencia de IntersectionObserver. Resultados en `controller-checks.json`. No se cambió la preferencia del sistema operativo.
- `npm run quality`: formato, lint, Knip, límite de tamaño, Astro check (0 errores/advertencias), build, validación de 30 páginas y auditoría sin vulnerabilidades.
- Tras corregir las unidades: repetidos los controles del controlador, formato, lint, Astro check, build y validación de páginas. Comprobados nuevamente los estados activos/finales y la ausencia de repetición en el navegador; registro en `browser-states.json`.

Las capturas adjuntas muestran los estados finales. La revisión responsive se hizo con tamaños de navegador, no dispositivos físicos.

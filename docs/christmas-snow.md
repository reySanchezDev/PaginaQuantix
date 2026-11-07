# Nieve navideña con cristales de escarcha

Capa decorativa global, activa únicamente con `navidad-premium`. Usa un canvas transparente y no incorpora imágenes, librerías ni servicios externos.

- Copos pequeños (0.8–2.3 px de radio), caída lenta (12–27 px/s), deriva suave y 20 % de cristales de seis puntas. Sin parpadeo, acumulación, filtros ni desenfoque.
- Color adaptable al fondo: blanco perlado sobre oscuro y gris hielo azulado sobre claro, con algunos cristales champán. Lee superficies y gradientes al actualizar el diseño; no consulta estilos por copo ni por fotograma. En claro aumenta moderadamente la presencia y la proporción de cristales, sin aumentar la cantidad de partículas.
- Hasta 58 partículas en escritorio y 20 en móvil. Opacidad atenuada en el centro y resolución limitada a 1.5 veces el tamaño de pantalla.
- Excluye rectángulos de encabezados, párrafos, enlaces, controles, imágenes, vídeos, contador y diálogos, con un margen de 8 px. Recalcula tras scroll, cambios de tamaño, carga de fuentes e imágenes y apertura de detalles.
- La capa no captura clics. Está por debajo del encabezado; el control de pausa permanece accesible en la esquina inferior izquierda y respeta el área segura.
- Botón ES/EN para pausar o activar; conserva preferencia local si el navegador permite almacenamiento.
- Movimiento reducido desactiva tanto efecto como control. Al ocultar la pestaña cancela el bucle y al regresar lo reinicia sin saltos. Limita dibujo a 30 fps.
- Sigue el calendario navideño existente y se retira al terminar esa campaña. No modifica fechas, contenido comercial ni contador de Año Nuevo.

Archivos: `ChristmasSnow.astro`, `src/scripts/christmas-snow.js` y su integración en `BaseLayout.astro`.

Pruebas de ejecución en `tests/christmas-snow.test.mjs`: pausa/persistencia, cancelación y reanudación, movimiento reducido, retiro por cambio de tema y exclusión de áreas protegidas.

Referencias oficiales consultadas:

- https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide
- https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame

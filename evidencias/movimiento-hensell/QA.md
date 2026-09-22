# Movimiento — hensell

8 de septiembre de 2026. Validación local en el puerto 4322.

## Aplicado

- Entradas de portada y producto de 520 ms, desplazamiento vertical de 16 px y escalonado máximo de 160 ms.
- Aparición única mediante IntersectionObserver en casos, servicios, presentación de empresa, galerías y llamadas a contacto. El contenido permanece visible en el HTML y en el CSS base; no depende de una clase inicial que lo oculte.
- Respuestas de botones al apuntar y presionar; flechas en enlaces, subrayado de navegación y acercamiento de 2,5 % en capturas enlazadas. Los efectos de puntero se limitan a dispositivos con puntero preciso.
- Cambio salón/cocina de 280 ms con desplazamiento de 6 px.
- Cancelación de entradas cuando reciben foco, al activar movimiento reducido y al restaurar una página desde la caché de navegación. No hay animaciones repetitivas ni control artificial del scroll.

## Comprobado

- Portada: seis tamaños entre 320 y 1440 px, incluyendo tablet y orientación horizontal. Sin desbordamiento horizontal (`responsive.json`).
- Entradas observadas durante y después de ejecutarse: estado final con opacidad 1 y sin transformaciones residuales.
- Al salir y regresar a los casos, conservan el estado terminado y no se repite la entrada.
- Ancla de casos a 96 px del borde superior, respetando el encabezado fijo.
- Navegación por teclado con foco visible y subrayado activo. Menú móvil: abre, Escape cierra, libera el contenido y devuelve el foco al botón.
- Página Takofy y portada inglesa a 390 px: texto, botones y capturas legibles al terminar las entradas.
- Comprobación dirigida del controlador con dobles de DOM y media query en Node: no programa animaciones con movimiento reducido inicial, cancela las activas al cambiar esa preferencia, cancela al recibir foco y revela cada elemento una sola vez. Registro en `reduced-motion.json`. No se modificó la preferencia del sistema operativo.
- Sin errores JavaScript en la sesión de navegador.
- `npm run quality` correcto: formato, lint, código sin uso, límite de tamaño, Astro, build, validación de 30 páginas y auditoría de dependencias.

Las capturas adjuntas registran estados finales. Los cambios son locales, sin publicación.

# Capturas de Takofy para Quantix

Capturadas el 7 de septiembre de 2026 desde [app.takofy.app](https://app.takofy.app/).

## Procedencia

Se utilizó el modo invitado local de la aplicación, sin iniciar sesión ni conectar un negocio real. Se creó «Restaurante Demo» con seis productos, cinco mesas y dos comandas de ejemplo. Los precios, costos y pedidos son datos ficticios introducidos mediante la interfaz real de Takofy.

- `raw/pedido-desktop.png`: comanda de Mesa 1 con dos tacos de birria y dos limonadas; total de ejemplo de 22 USD.
- `raw/cocina-desktop.png`: dos comandas en cocina, una en preparación y otra recibida.
- `raw/productos-desktop.png`: menú de seis productos con precios, costos y márgenes.

Las capturas originales tienen 1280 × 720 píxeles. No se alteraron las pantallas ni se inventaron componentes de la aplicación.

## Composiciones

Se usó [Hen Screenshots](https://screenshots.hensell.dev/studio/?project=9f62e51c-d6ca-48ad-9a8d-9ad86576cbf1), en un proyecto Portfolio con plantilla Gallery, marco Laptop y formato 1600 × 1200.

El proyecto portable está en `studio/Takofy-Quantix.henscreenshots`. La carpeta también conserva las tres exportaciones PNG y el ZIP original.

Los seis archivos para la web están en `public/images/takofy/`: tres presentaciones y tres capturas de detalle. Se optimizaron a WebP con calidad 92, sin redimensionar; en conjunto ocupan 286 858 bytes.

## Integración

- Imagen principal y galería con tres escenas en la ficha de Takofy.
- Captura real en la tarjeta del catálogo y de la página de inicio.
- Textos y alternativas accesibles en español e inglés; las pantallas muestran el producto en español.
- Se eliminó la animación de desplazamiento del encabezado compartido de la galería para evitar que el salto al ancla lo dejara detrás de la cabecera fija.

## Verificación

- Revisión visual de móvil, tablet y escritorio; anchos 320, 390, 768 y 1440 px.
- Español e inglés, sin desbordamiento horizontal; imágenes cargadas y enlaces de ampliación de 44 px de altura.
- Destino de la captura de detalle verificado en el navegador a 1280 × 720.
- Título de la galería a 104 px del borde superior, por debajo de la cabecera de 89 px, después del salto desde la navegación.
- `npm run quality` pasó. Después del ajuste del ancla se repitieron la compilación y la validación de las 26 páginas.
- La carpeta `qa/` guarda capturas y mediciones. No se ejecutó una auditoría automatizada de accesibilidad en esta iteración.

Cambios locales en la rama `hensell`, sin publicar.

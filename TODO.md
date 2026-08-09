# Quantix Software — TODO

Este documento contiene únicamente el trabajo pendiente. El rediseño, la arquitectura, la accesibilidad, el SEO técnico y las validaciones actuales ya están implementados.

## P0 — Material real de los productos

- [ ] Recopilar entre 2 y 4 capturas recientes de Takofy.
  - Pedidos o salón.
  - Cocina.
  - Caja.
  - Inventario.
- [ ] Recopilar entre 2 y 4 capturas recientes de Nica Finanzas.
  - Panel principal.
  - Movimientos.
  - Reportes.
  - Flujo principal del producto.
- [ ] Recopilar entre 2 y 4 capturas recientes de QAVision.
  - Captura.
  - Anotación.
  - Organización o historial.
  - Exportación.
- [ ] Confirmar si las capturas y el video actuales de VIGGO siguen vigentes.
- [ ] Eliminar o anonimizar nombres, correos, montos y cualquier información sensible antes de compartir los archivos.

### Formato recomendado

- PNG o WebP.
- Al menos 1600 px de ancho para capturas de escritorio.
- Sin marcos de navegador añadidos.
- Escala de interfaz al 100 %.
- Opcional: grabaciones de pantalla de 10–20 segundos por producto.

## P1 — Integración visual

- [ ] Seleccionar las capturas que mejor expliquen cada producto.
- [ ] Sustituir los paneles conceptuales de Takofy, Nica Finanzas y QAVision por evidencia real del producto.
- [ ] Incorporar una vista breve de producto en la Home sin sobrecargar el hero.
- [ ] Igualar la calidad visual de las páginas de Takofy, Nica Finanzas y QAVision con la página de VIGGO.
- [ ] Generar versiones responsive en AVIF/WebP y definir tamaños, `srcset`, carga diferida y textos alternativos en español e inglés.
- [ ] Revisar si alguna captura debe utilizarse como imagen social específica del producto y regenerar los recursos Open Graph cuando corresponda.

## P2 — Evidencia y confianza

Estas tareas son opcionales, pero mejorarían la conversión si existe material verificable.

- [ ] Reunir logotipos de clientes que Quantix tenga autorización para publicar.
- [ ] Reunir testimonios aprobados, con nombre, cargo y empresa.
- [ ] Documentar resultados reales sin inventar porcentajes ni métricas.
  - Proceso que se reemplazó.
  - Trabajo manual que se eliminó.
  - Sistemas que se integraron.
  - Área de la empresa que utiliza el producto.
- [ ] Diseñar e incorporar una sección breve de evidencia sólo cuando exista contenido suficiente.

## P3 — Publicación y servicios externos

- [ ] Aprobar la versión final del diseño y fusionar la rama `hensell`.
- [ ] Desplegar una vista previa de producción y verificar headers de seguridad, redirecciones, sitemap, canonicals y Open Graph desde la URL pública.
- [ ] Comprobar las tarjetas sociales con LinkedIn Post Inspector y Facebook Sharing Debugger después del despliegue.
- [ ] Registrar y verificar el sitio en Google Search Console. Requiere acceso del propietario.
- [ ] Configurar el dominio definitivo de VIGGO. Requiere acceso al dominio y al proveedor correspondiente.
- [ ] Revisar el dominio público de descargas de QAVision si se desea sustituir la URL técnica actual por una dirección propia de Quantix.

## Cierre

- [ ] Revisar todas las rutas en español e inglés después de incorporar el material real.
- [ ] Validar móvil, tablet, escritorio, teclado, contraste y movimiento reducido.
- [ ] Ejecutar `npm run quality` y la revisión previa al commit.
- [ ] Hacer el push final a la rama `hensell`.

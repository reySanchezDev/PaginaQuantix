# Contacto directo — hensell

8 de septiembre de 2026. Implementación local, sin despliegue.

## Comportamiento

- Enlaces nativos `mailto:contact@quantix.software` para abrir la aplicación de correo.
- Al abrir un enlace se intenta copiar la dirección como respaldo, sin interceptar la navegación ni afirmar que se ha detectado una app instalada.
- Botón explícito de copia en Contacto. Confirmación flotante únicamente después de que `Clipboard.writeText` resuelva correctamente.
- Si se deniega la copia, la notificación mantiene un campo de solo lectura seleccionable. No desaparece automáticamente.
- El aviso de éxito se cierra tras 6,5 segundos y pausa su cierre mientras recibe foco o hover. El cierre manual devuelve el foco al control original.
- Interacción y textos en español e inglés. Se respetan movimiento reducido, áreas seguras y bloqueo del fondo del menú móvil.
- Se retiraron formulario, endpoint, Resend, configuración y pruebas del backend provisional. El sitio no envía consultas y no requiere credenciales de correo.

## Verificación

- `npm run quality` y `git diff --check`: aprobados. Astro sin errores ni advertencias; 30 páginas construidas y validadas; auditoría sin vulnerabilidades.
- Diez recorridos de Contacto: español e inglés a 320, 390, 768, 1024 y 1440 px. Sin desbordamientos, un h1 y ningún formulario. Detalles en `responsive.json`.
- Inspección visual de contacto y notificaciones a 320, 390 y 1024 px. Los anchos mayores también se comprobaron con medidas del DOM.
- Copia real verificada comparando el portapapeles con la dirección pública esperada, sin imprimir su contenido.
- Denegación real de copia comprobada con un servidor temporal que aplicaba `Permissions-Policy: clipboard-write=()`. Se mostró el aviso manual, se seleccionó toda la dirección y se verificó el retorno del foco al cerrar.
- Con el menú móvil abierto, la región de notificación quedó inerte y por debajo del diálogo.
- El endpoint retirado `/api/contact/` devuelve HTTP 404.
- Revisión independiente del código sin hallazgos accionables.

## Límite de la prueba

El navegador de automatización rechazó por su política de seguridad la apertura del enlace `mailto:` hacia una aplicación externa. No se intentó eludir ese bloqueo. El destino del enlace y la conservación de navegación nativa se revisaron en el código y el HTML; la apertura efectiva de la app queda para comprobación manual. No se enviaron mensajes.

Capturas: `contacto-1024.png`, `toast-es-1024.png`, `toast-en-320.png` y `copia-denegada-390.png`.

# Empresa, casos y contacto — hensell

Revisión del 8 de septiembre de 2026. Cambios locales, sin despliegue.

## Cambio posterior en contacto

El usuario reemplazó el envío mediante formulario por contacto directo: enlaces `mailto:` para abrir su aplicación de correo y copia de la dirección con confirmación mediante toast. Se retiraron el endpoint, el transporte provisional, las pruebas de servidor y la configuración de correo. La web vuelve a ser completamente estática y no recopila ni envía consultas mediante un formulario.

Las verificaciones y capturas de contacto registradas a continuación corresponden a la versión anterior con formulario. Se conservan como evidencia histórica; no verifican la nueva interacción de correo y portapapeles. No se enviaron correos reales durante esas pruebas.

## Resultado observado antes del cambio de contacto

- Portada centrada en proyectos a medida, seguida de casos de productos propios usados en Nicaragua.
- Empresa presenta a Reynaldo Sanchez y Hensell Espinoza como cofundadores y desarrolladores full stack. No se inventaron ubicación, trayectoria, fotografías ni perfiles sociales.
- Casos Takofy y VIGGO en español e inglés, con capturas existentes del producto, contexto confirmado y enlaces desde portada, empresa, trabajo y fichas.
- Contacto permite enviar una consulta al endpoint, muestra errores por campo, conserva el contenido ante fallos y ofrece canales alternativos con el texto actualizado.
- En móvil, el formulario aparece después de la introducción y antes de los canales alternativos. El orden de teclado sigue el orden del contenido.

## Verificación de la versión con formulario

- `npm run quality`: aprobado. Formato, ESLint, Knip, límite de 300 líneas, Astro sin errores ni advertencias, 21 pruebas de contacto, 30 páginas construidas y validadas, auditoría sin vulnerabilidades.
- `git diff --check`: aprobado.
- Matriz de 36 recorridos: portada, empresa, trabajo, casos y contacto, en ambos idiomas, a 320, 768 y 1440 px. Sin desbordamientos horizontales y con un h1 por página. Resultados en `responsive-matrix.json`.
- Inspección visual mediante capturas de viewport a 320, 390, 768 y 1024 px, más secciones inferiores de portada y caso Takofy. Las medidas de 1440 px se verificaron en DOM; la captura del navegador integrado recortaba el área visible a ese ancho.
- Revisión estructural independiente de cuatro casos y cuatro fichas: encabezados, imágenes, identificadores, etiquetas accesibles, alternancia de idioma y 29 destinos internos válidos.
- Menú móvil: apertura, cierre con Escape y devolución del foco al control.
- Formulario: campos obligatorios, correo incompleto, mensajes localizados, error por falta de configuración, texto conservado, actualización de alternativas al editar, confirmación simulada y nueva consulta con foco restaurado. Éxito simulado probado en español e inglés a 390 y 320 px.
- Las pruebas del transporte cubren configuración ausente, rechazo, recibo inválido, límite de tiempo, origen, tamaño, validación e idempotencia, sin red ni correos enviados.

## Pendientes de información y verificación

- LinkedIn de ambos cofundadores añadido con las URLs proporcionadas por el usuario. Ubicación de Quantix pendiente.
- La nueva copia de dirección y toast se verificaron en escritorio y móvil; ver `../contacto-mailto-hensell/QA.md`, que documenta también el bloqueo de apertura externa del navegador de pruebas. El buzón `contact@quantix.software` fue confirmado por el usuario; el sitio no necesita configurar un proveedor de envío.
- Si cada producto debe recibir consultas en otro buzón, faltan las direcciones exactas.
- No se hizo una auditoría completa con lector de pantalla ni prueba de teclado virtual en un teléfono físico.

## Registro del envío reemplazado

En la etapa anterior se preparó Resend sin activar credenciales, verificar un dominio remitente, probar entrega real ni desplegar el endpoint. El usuario confirmó que el buzón existente estaba configurado y la consulta de registros MX apuntó a Private Email. El transporte provisional no implicaba cambiar ese servicio. Al retirar el envío del sitio, quedaron sin efecto los pendientes de credenciales y de límite por IP para ese endpoint.

## Capturas

Las imágenes `contacto-exito-simulado-*` corresponden exclusivamente al servidor local con correo simulado. No representan entrega real de mensajes. Las restantes capturas proceden del sitio local con envío desactivado.

# CobroRuta Web — Quantix Software

Proyecto comercial **independiente** bajo `apps/cobroruta-web` del repositorio `reySanchezDev/PaginaQuantix`. El sitio corporativo de Quantix, ubicado en la raíz, NO se modifica por este hito.

## Ejecutar

Desde la raíz del repositorio:

```bash
cd apps/cobroruta-web
npm install
npm run test
npm run check
npm run build
npm run dev
```

Dominio objetivo: https://cobroruta.quantix.software. Para un futuro proyecto Vercel configurar **Root Directory = apps/cobroruta-web**, framework Astro; mantenerlo como proyecto Vercel distinto del sitio corporativo. No se ha habilitado producción.

## Contenido

- `/es/`, `/en/` y rutas localizadas de funciones, funcionamiento, demo, FAQ y contacto.
- Identidad cromática extraída de `Hensell/lugar_app`, Flutter `lib/core/theme/app_colors.dart`.
- Demostración didáctica de pagos: lógica local aislada, datos ficticios, sin APIs reales.
- Galería y hero con capturas Android verdaderas proporcionadas en Drive.
- Capturas originales no adulteradas; los nombres de archivo se normalizaron para web. Capturas con información personal identificable NO se incorporaron al repositorio público.

## Calidad/estado

`node --test tests/*.test.mjs` aprobó 7/7 en el entorno de trabajo. Aún falta ejecutar `npm install`, `npm run check` y `npm run build` con acceso al registro npm, e inspeccionar responsive real. Cualquier resultado adicional requiere evidencia nueva.

## Seguridad y privacidad

La demo educativa funciona solo en el cliente, no envía cobros a Supabase, PowerSync ni conecta cuentas. Todas las imágenes públicas provienen de capturas originales del usuario sin datos personales visibles (mayormente estados vacíos). No usar screenshots sensibles. No se han publicado cambios en DNS ni producción.

Fuente persistente de contexto y capturas: Google Drive > CobroRuta. **El código fuente vive en Git, no en Drive.**

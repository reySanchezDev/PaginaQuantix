---
trigger: always_on
---

---
trigger: always_on
---

# Proyecto Web Astro (Sitio corporativo + portafolio) — Estándares de código, arquitectura y calidad

> **Crítico**: Estas reglas son **obligatorias** para todo aporte. Cualquier violación se corrige **antes** de integrar cambios.
> Alcance: Sitio en **Astro** con **i18n (/es, /en)**, **tema claro fijo**, **100% responsive**, performance alto y UI “premium”.

---

## 0) Reglas de comunicación y entregables (MANDATORIO)

Aplica a cualquier persona/IA que entregue trabajo para este proyecto.

- **Idioma**: responder y documentar en **español** (la UI del sitio sí es ES/EN).
- **Precisión**: no inventar. Si falta info, declarar supuestos mínimos.
- **Accionable**: siempre indicar “qué archivo / qué sección / qué validar”.
- **Sin sorpresas**: si algo impacta UX, SEO o performance, debe quedar explicitado en PR/entrega.
- **Calidad verificable**: todo cambio debe incluir criterio de aceptación y cómo probarlo.

---

## 1) Principios de arquitectura (Astro)

### 1.1 “Content-first” + “Islands” (JS mínimo)
- Astro se usa para **render estático** por defecto.
- JS en cliente solo cuando aporta valor (menú mobile, scroll-spy, animaciones sutiles).
- Evitar frameworks de UI completos si no son necesarios. Preferir componentes Astro + “islas” pequeñas.

### 1.2 Separación clara: Pages / Layouts / Components / Content
- Pages: definen rutas y componen secciones.
- Layouts: estructura global (Header/Footer/SEO base).
- Components: piezas reutilizables (cards, buttons, toggles).
- Content/config: contenido e información (productos, navegación, contacto, textos i18n).

### 1.3 Config-driven (clave del portafolio)
- Los productos se renderizan desde una configuración única.
- Requisito: cambiar el destino (URL) de un producto debe requerir **solo** cambiar config (sin tocar componentes).
- Soportar `href` interno y externo, y `target` configurable.

---

## 2) Estructura del repositorio (MANDATORIO)

Estructura recomendada y obligatoria (nombres exactos sugeridos; se aceptan equivalentes si se justifica):

- `src/pages/`
  - `/es/` rutas en español
  - `/en/` rutas en inglés
- `src/layouts/`
  - Layout base + layout de producto
- `src/components/`
  - `ui/` (botones, cards, badges, inputs)
  - `sections/` (Hero, Features, Products, Trust, Contact)
  - `nav/` (HeaderPremium, MobileOverlay, LanguageSwitch)
- `src/content/` o `src/data/`
  - `products.*` (lista de productos)
  - `site.*` (marca, contacto, redes)
  - `i18n/` (diccionarios ES/EN)
- `public/`
  - `images/` (assets), con naming consistente

Reglas:
- Cada archivo debe ser pequeño y enfocado.
- Componentes UI no contienen contenido hardcodeado (texto/urls): lo reciben por props o lo leen de i18n/config.

---

## 3) Convenciones de código (MANDATORIO)

### 3.1 TypeScript
- Usar TypeScript en componentes y utilidades siempre que aplique.
- Tipos explícitos para:
  - Config de productos
  - Config de navegación
  - Modelos de i18n
  - Props de componentes UI

### 3.2 Naming
- Archivos: `kebab-case.astro` o `snake_case.ts` (elegir 1 convención y mantenerla; recomendado `kebab-case` para Astro).
- Componentes: `PascalCase` (ej. `HeaderPremium.astro`).
- IDs/keys de i18n: `section.keyName` (ej. `nav.home`, `hero.title`).

### 3.3 Límite de tamaño
- Límite recomendado: **300 líneas** por archivo.
- Si se supera: extraer subcomponentes, helpers o secciones.

### 3.4 Cero duplicación
- Si algo se repite 2+ veces (botón, card, badge, input), se convierte en componente reutilizable.

---

## 4) Sistema de diseño (MANDATORIO)

### 4.1 Tokens (no hardcodear estilos)
- Prohibido hardcodear colores en componentes (hex/rgba) salvo en el archivo de tokens.
- Definir variables CSS para:
  - Colores (bg/surface/text/border/primary/accent/status)
  - Tipografía (familia, pesos, tamaños)
  - Espaciado (escala 8px)
  - Radios (cards/buttons/pills)
  - Sombras (sutiles)
- El tema visual debe vivir en tokens claros, no en estilos duplicados.

### 4.2 Tipografía
- Reglas:
  - Body/UI: Inter
  - Headings: Space Grotesk
- Prohibido usar tamaños arbitrarios: usar escala definida.

### 4.3 Componentes UI obligatorios
- `Button` (Primary/Secondary/Ghost/Link) con estados (hover/active/disabled/loading)
- `Card` (base)
- `Badge`
- `Input`, `Textarea` con focus ring y errores inline
- `LanguageSwitch`
- `Container` (max-width + padding responsivo)

### 4.4 Microinteracciones “premium”
- Transiciones 200–300ms (suaves, sin rebotes exagerados).
- Hover con lift mínimo (1–2px) y sombra sutil.
- Animaciones on-scroll con stagger ligero (respetar reduced motion).
- Prohibido: animaciones pesadas, parallax agresivo, efectos “baratos”.

---

## 5) Responsive 100% (OBLIGATORIO, NO NEGOCIABLE)

### 5.1 Breakpoints mínimos a validar
- Mobile: 360–430px
- Tablet: 768–1024px
- Desktop: 1280px+

### 5.2 Reglas de responsive
- **Cero overflow horizontal** en todos los breakpoints.
- Header premium:
  - Desktop: segmented control completo sin romperse.
  - Mobile: menú cambia a overlay/panel premium (no “apretar” items).
- Grids:
  - Features y Products re-fluyen (ej. 6→3→2→1 según viewport).
- Tipografía y spacing:
  - H1/H2 y padding escalan correctamente en mobile.
- Formularios:
  - Full-width en mobile, sin columnas apretadas ni labels cortados.
- Imágenes:
  - Responsivas, sin CLS (reservar espacio), sin deformación.

### 5.3 Criterio de aceptación (obligatorio)
- Dado un viewport mobile/tablet/desktop,
- Cuando navego todo el sitio,
- Entonces no hay scroll lateral, no hay contenido cortado y los CTAs son accesibles y clicables.

---

## 6) Internacionalización (i18n) (MANDATORIO)

- Rutas:
  - Español: `/es/...`
  - Inglés: `/en/...`
- Prohibido hardcodear strings de UI:
  - Todo texto visible debe venir de diccionarios ES/EN.
  - En esta fase, el contenido puede ser “Lorem Ipsum”, pero debe vivir en i18n (para no reescribir componentes luego).
- El selector de idioma debe:
  - Mantener la ruta equivalente cuando exista.
  - Si no existe, enviar a home del idioma.
- SEO i18n:
  - `hreflang` correcto para ES/EN.
  - Canonical correcto por idioma.

---

## 7) Tema visual claro (MANDATORIO)

- No implementar toggle de tema ni persistencia de selección.
- No depender de preferencia del sistema para cambiar colores.
- Mantener una experiencia clara, consistente y accesible.
- Usar una sola versión de logo compatible con el tema claro.

---

## 8) SEO (MANDATORIO)

Cada página debe tener:
- `title` y `description` (placeholders permitidos en esta fase, pero definidos).
- Open Graph básico (placeholders).
- `hreflang` ES/EN.
- Sitemap y robots (si el hosting lo permite).
- Estructura semántica:
  - Un solo H1 por página
  - H2/H3 jerárquicos

Prohibido:
- Títulos duplicados sin intención.
- Páginas sin metadatos.

---

## 9) Performance (MANDATORIO)

- JS mínimo (solo islas necesarias).
- Imágenes:
  - Optimizadas y responsivas.
  - Carga diferida donde aplique.
- Evitar librerías pesadas para animación; preferir CSS/IntersectionObserver.
- Respetar `prefers-reduced-motion`.
- Objetivo: experiencia fluida en móvil.

---

## 10) Seguridad (MANDATORIO)

- Formulario de contacto:
  - Validación y sanitización.
  - Estados claros: loading/success/error.
  - Preparación para anti-spam (Turnstile/hCaptcha) mediante un “hook” de integración.
- No exponer secretos en el frontend.
- Dependencias:
  - Evitar paquetes innecesarios.
  - Mantener dependencias mínimas y justificadas.

### 10.1 OWASP Top 10 + OWASP ASVS (mínimo verificable)
- **Baseline ASVS**:
  - Sitio estático: **ASVS L1**.
  - Cualquier **endpoint real** (serverless/API) para contacto/integraciones: **ASVS L2** para esa superficie.
- **Inputs / XSS / Injection (OWASP A03/A07)**:
  - Validar + sanitizar **todos** los inputs (cliente y servidor si existe endpoint).
  - Renderizar texto siempre con **escaping/encoding** (evitar HTML crudo).
- **Misconfig / Headers / CSP (OWASP A05)**: en staging/prod aplicar y verificar:
  - `Content-Security-Policy` (evitar `unsafe-inline` si es posible; justificar si se usa)
  - `Strict-Transport-Security` (prod; si aplica)
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy` (restringir features no usadas)
  - `frame-ancestors 'none'` (en CSP) para anti-clickjacking
- **Criptografía/Transporte (OWASP A02)**:
  - **HTTPS obligatorio** en producción; no enviar datos sensibles en querystring.
- **Dependencias / Supply-chain (OWASP A06/A08)**:
  - Lockfile obligatorio + CI instala desde lockfile.
  - Auditoría de dependencias y **bloqueo** de vulnerabilidades **High/Critical** (o mitigación documentada).
- **Endpoint de contacto (si existe) (OWASP A01/A04/A09)**:
  - Exponer solo lo necesario (ej. `POST /contact`), errores **genéricos** (sin stack traces).
  - **Rate limiting** + **anti-bot** (Turnstile/hCaptcha) cuando el endpoint sea real.
  - Límites: Nombre ≤80, Email ≤254, Empresa ≤120, Mensaje ≤2000–5000 (definir exacto).
  - Sin uploads en contacto (salvo diseño y controles específicos).
  - Logging mínimo (timestamp/resultado), **sin PII completa**; monitorear picos de spam.
- **SSRF (OWASP A10)**:
  - Si el endpoint llama a terceros: no aceptar URLs del usuario; usar **allowlist** de destinos.

### 10.2 Security Definition of Done (DoD)
Para marcar una entrega como **DONE** (frontend, formulario o despliegue):
- 0 vulnerabilidades **High/Critical** en dependencias (o mitigación documentada).
- Headers + **CSP** activos y verificados en staging/prod (sin romper UI).
- Formulario: validación + límites + estados; y **rate limit + anti-bot** si endpoint es real.
- Sin exposición de detalles internos (stack traces/debug) ni **PII completa** en logs/respuestas.
- Revisión rápida OWASP: sin hallazgos obvios (XSS/inyección/misconfig/deps).

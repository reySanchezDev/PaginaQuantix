# Quantix Software — Requerimientos de Rediseño Web (Astro) v1.1
> Documento maestro para implementar el sitio corporativo + portafolio.  
> Idiomas: **/es/** y **/en/**. Tema: **claro fijo**, sin toggle ni persistencia.
> Contenido: **placeholders** (Lorem Ipsum) + “Aca poner una imagen”.  
> Nota clave: **NO incluir sección ni opción de “Precios” en Home**. Los precios vivirán **dentro de cada página de producto** cuando existan.  
> **RESPONSIVE 100% OBLIGATORIO**: mobile/tablet/desktop sin excepciones y sin scroll horizontal.

---

## 1) Resumen ejecutivo
- Rediseñar quantix.software como sitio corporativo premium para **Quantix Software** con catálogo de productos.
- Home tipo “one-page premium” con navegación a secciones: **INICIO / FUNCIONES / PRODUCTOS / CONTACTO** (look no tradicional).
- Portafolio inicial: Quantix y Nica Planilla en tarjetas premium con enlaces **configurables** (internos hoy, externos mañana) sin refactor.
- Soporte completo de i18n (`/es/`, `/en/`) + tema claro fijo.
- Contacto global: formulario + email + WhatsApp con estados y validación.
- **Responsive 100%** como requisito de aceptación de entrega.

---

## 2) Supuestos y restricciones
- Sitio global: no mencionar países, normativas o nichos por defecto.
- Textos: Lorem Ipsum (ES/EN).
- Imágenes: insertar literalmente “Aca poner una imagen”; el componente queda listo para recibir el nombre del asset.
- Header/footer: “Quantix Software” y logo compatible con tema claro.
- Menú principal: **INICIO / FUNCIONES / PRODUCTOS / CONTACTO** (exactamente estos 4).
- Home: **NO** mostrar “Precios”. Precios solo en páginas de producto.
- Tecnología: Astro. Se permite Tailwind o CSS modular, respetando este sistema de diseño.

---

## 3) Requisitos

### 3.1 Funcionales por “módulo” del sitio

#### Módulo A: Navegación (Header premium, no tradicional)
- Header sticky flotante estilo “glass” (blur sutil + borde fino + sombra leve).
- En scroll: compacta altura y aumenta opacidad con transición suave (200–300ms).
- Menú desktop: INICIO / FUNCIONES / PRODUCTOS / CONTACTO como “floating segmented control”:
  - Indicador activo animado (pill) que se desplaza.
  - Hover sobrio.
  - Scroll-to-section suave + scroll-spy.
- Acciones:
  - Selector ES/EN minimalista.
- Mobile:
  - Menú abre overlay/panel premium con blur.
  - Acciones de idioma accesibles.
  - Cierre con ESC y click fuera.
- Accesibilidad: navegación teclado + focus visible.

#### Módulo B: Home (one-page premium)
Secciones: INICIO → FUNCIONES → PRODUCTOS → (Confianza) → CONTACTO → Footer.

B1) INICIO — Hero premium
- 2 columnas desktop, 1 columna mobile.
- H1/Subheadline lorem + 2 CTAs (Contactar / Ver productos).
- Visual: “Aca poner una imagen”.
- Animaciones sutiles de entrada y hovers elegantes.

B2) FUNCIONES — Capacidades (sin nicho)
- Título/descr lorem.
- Grid 6 cards (desktop), 2–3 (tablet), 1–2 (mobile).
- Hover: borde/acento + sombra suave + background leve.
- Entrada on-scroll con stagger sutil.

B3) PRODUCTOS — Portafolio
- Título/descr lorem.
- Grid tarjetas premium (2 productos hoy).
- Tarjeta incluye: badge, título, resumen lorem, 3 bullets lorem, CTA “Ver producto”, thumbnail “Aca poner una imagen”.
- **Link configurable por producto (crítico)**:
  - `href` viene de config (por idioma).
  - Soporta interno/externo + `_self/_blank`.
  - Cambios futuros: modificar SOLO `href` en config; NO tocar componentes.
  - Opcional: ícono externo discreto si `href` es externo.

B4) Confianza (Proof / Credibilidad)
- Implementar 1 o 2 opciones sobrias:
  - Logos placeholder: “Aca poner una imagen”
  - Métricas placeholder (3 contadores)
  - Testimonios placeholder (2–3)
- Estilo enterprise sobrio.

B5) CONTACTO
- 2 columnas desktop; 1 columna mobile.
- Izquierda: lorem + email placeholder `contact@quantix.software` + WhatsApp placeholder `+000 0000 0000` + horario placeholder.
- Derecha: formulario.
- Formulario:
  - Nombre (req), Email (req), Empresa (opcional), Mensaje (req).
  - Estados: idle/loading/success/error (mensajes placeholder).
  - Hook anti-spam preparado (Turnstile/hCaptcha) si se define proveedor luego.
- Botón WhatsApp premium (usar color de marca, no verde saturado por defecto).

B6) Footer premium
- Marca + logo swap.
- Links a secciones: INICIO/FUNCIONES/PRODUCTOS/CONTACTO.
- Legal placeholders: Privacidad/Términos.
- Social placeholders opcional.

#### Módulo C: Páginas placeholder de producto (internas desde ya)
Rutas:
- ES: `/es/productos/quantix/`, `/es/productos/nica-planilla/`
- EN: `/en/products/quantix/`, `/en/products/nica-payroll/` (ajustable)

Contenido por página:
1) Hero producto (título + subtítulo lorem + CTA Contactar)
2) Overview lorem
3) Key features grid
4) Screens:
   - “Aca poner una imagen”
   - “Aca poner una imagen”
5) Pricing (SOLO en páginas de producto, placeholder)
6) FAQ (5 items lorem)
7) CTA final + footer

Regla: aunque existan placeholders internos, la tarjeta en Home debe poder apuntar a URL externa real en el futuro cambiando solo config.

---

### 3.2 No funcionales

#### Responsive (OBLIGATORIO, no negociable)
**El sitio debe ser 100% responsive**, sin excepciones.

- Breakpoints mínimos a validar:
  - Mobile: 360–430px
  - Tablet: 768–1024px
  - Desktop: 1280px+
- Reglas obligatorias:
  - **Cero overflow horizontal** (no debe existir scroll lateral).
  - Header premium:
    - Desktop: segmented control completo sin romperse.
    - Mobile: cambiar a overlay/panel (no apretar items).
  - Grids:
    - Features y Products deben re-fluir correctamente (ej. 6→3→2→1 según viewport).
  - Tipografía y spacing:
    - H1/H2 y paddings deben escalar (no textos gigantes en mobile).
  - Formularios:
    - Inputs full-width en mobile, sin columnas apretadas.
  - Imágenes:
    - Responsivas con `max-width: 100%`, reservar espacio para evitar CLS.
- Criterio de aceptación (Gherkin):
  - Given un viewport mobile, tablet y desktop
  - When navego Home y páginas de producto
  - Then no hay overflow horizontal, no hay elementos cortados y todos los CTAs son accesibles y clicables

#### Rendimiento
- Objetivos aproximados Lighthouse:
  - Performance ≥ 90
  - Accessibility ≥ 95
  - Best Practices ≥ 95
  - SEO ≥ 90
- Imágenes responsivas en WebP/AVIF y sin CLS.
- Animaciones ligeras; respetar `prefers-reduced-motion`.

#### Seguridad
- Formulario con sanitización y validación.
- Headers recomendados (si aplica): CSP básica, Referrer-Policy, X-Content-Type-Options.

#### UX / Accesibilidad
- Contraste AA.
- Focus visible.
- Skip-to-content.
- Labels/aria correctos.

#### Internacionalización
- `hreflang` correcto.
- Metadatos por idioma.
- Canónicas por idioma.

---

## 4) Arquitectura propuesta

### 4.1 Componentes (Astro)
- Layout: `HeaderPremium`, `FooterPremium`
- Home: `HeroSection`, `CapabilitiesGrid`, `ProductsGrid`, `TrustSection`, `ContactSection`
- Producto: `ProductHero`, `ProductFeatures`, `ProductScreens`, `ProductPricing` (solo product pages), `ProductFAQ`

### 4.2 Configuración (clave)
- Config por idioma cuando cambie texto.
- Lista de productos con `href` configurable:
  - Cambiar destino = editar config (sin tocar UI).

### 4.3 Navegación one-page
- Anclas: `#inicio`, `#funciones`, `#productos`, `#contacto` por idioma.
- Desde páginas internas: volver a home con ancla.

---

## 5) Sistema de diseño (obligatorio)
Tipografías:
- Inter (body/UI) + Space Grotesk (headings), con pesos definidos.

Escala tipográfica:
- H1 48–56 desktop, 34–40 mobile; H2 36–40; Body 16–18.

Grid y espaciado:
- Max width 1200–1280; escala 8px; secciones con padding generoso.

Radii:
- Cards 16, buttons 12, pills 999.

Paleta tokens premium:
- Light:
  - `--bg` #F7F8FA, `--surface` #FFF, `--surface-2` #F1F3F6
  - `--text` #0B1220, `--text-muted` #4B5565, `--border` #E2E8F0
  - `--primary` #2F6BFF, `--primary-2` #00BFA6, `--accent` #7C5CFF
Iconografía:
- Lineal consistente (tipo Lucide/Feather).

---

## 6) Componentes UI
- Botones: Primary/Secondary/Ghost/Link con estados (hover/active/disabled/loading).
- Cards: borde 1px, hover lift -2px, sombra sutil, consistentes en tema claro.
- Header: glass capsule + segmented control con indicador animado.
- Formularios: focus ring, mensajes inline error/success, accesibilidad completa.

---

## 7) Norma de placeholders
- Textos: Lorem Ipsum.
- Imágenes: “Aca poner una imagen”.
- Assets sugeridos:
  - `logo-light.svg`, `hero-main.webp`, thumbs y shots por producto.

---

## 8) Modelo de datos (alto nivel)
- `SiteConfig`, `NavItem`, `Product`, `TrustItem`, `ContactFormConfig`.
- Regla: `Product.href` interno/externo; cambiar destino = config.

---

## 9) Backlog inicial (Épicas → Historias con Gherkin)

Épica A: i18n
- Rutas `/es/` y `/en/`, cambio idioma mantiene ruta equivalente.

Épica B: Tema claro
- Tema claro fijo y consistente.

Épica C: Header premium + scroll spy
- Segmented control, indicador animado, overlay mobile premium.

Épica D: Home skeleton (sin precios)
- Hero/Funciones/Productos/Confianza/Contacto/Footer.

Épica E: Product placeholders (con pricing solo dentro)
- Páginas Quantix/Nica ES/EN con pricing placeholder interno.

Épica F: Responsive 100% (obligatoria)
- HU-F1: Sin overflow horizontal en todos los breakpoints
  - Given viewport 360, 768, 1024, 1280
  - Then no hay scroll lateral y no hay contenido cortado
- HU-F2: Header se comporta correctamente
  - Then segmented desktop no se rompe y overlay mobile funciona

DoD incluye: responsive validado en breakpoints, pruebas E2E y revisión visual.

---

## 10) Plan de implementación por fases
Fase 1: Base + Home premium (sin precios)
Fase 2: Páginas placeholder producto (incluye pricing solo ahí)
Fase 3: Refinamiento pro (SEO/perf/QA)

---

## 11) Plan de pruebas (incluye responsive explícito)
- E2E:
  - Scroll a secciones, scroll-spy, cambio idioma.
  - Links productos interno/externo según config.
- Responsive:
  - Validar 360/390/430, 768, 1024, 1280+.
  - Verificar: no overflow horizontal, header ok, grids ok, formulario ok.
- Accesibilidad:
  - Tab order, focus visible, labels/aria, reduced motion.
- Performance:
  - Imágenes optimizadas, sin CLS, JS mínimo.

---

## 12) Despliegue y rollback
- Build estático + CDN. Versionado semántico. Rollback redeploy último build.

---
FIN DEL DOCUMENTO

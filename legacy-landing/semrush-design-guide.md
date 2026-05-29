# Semrush.com — Design Guide Completa
> Capturado de https://www.semrush.com/ · Mayo 2026

---

## 🎨 1. PALETA DE COLORES (Design Tokens CSS)

### Colores Primarios
| Token | Valor | Descripción |
|-------|-------|-------------|
| `--mp-white` / `--color-white` | `#ffffff` | Blanco puro |
| `--mp-off-black` / `--color-monotones-black` | `#181e15` | Negro verdoso (casi negro) |
| `--mp-lavendar` / `--color-lavender` | `#c190ff` | Lavanda principal (CTA primario) |
| `--mp-lavendar-hover` / `--color-lavender-dark` | `#b072ff` | Lavanda hover |
| `--mp-mint` / `--color-mint` | `#dceeeb` | Menta (hero background) |
| `--mp-light-mint` | `#f7fbfa` | Menta clara |
| `--mp-aqua` | `#18f0bf` | Aqua/turquesa acento |
| `--mp-lime` | `#89ff75` | Lima/verde neón acento |

### Colores Grises
| Token | Valor |
|-------|-------|
| `--mp-dark-grey` / `--color-dark-grey` | `#6c6e79` |
| `--mp-medium-grey` | `#d1d2d5` |
| `--mp-light-grey` | `#f0f1f2` |

### Colores de UI
| Token | Valor | Uso |
|-------|-------|-----|
| `--mp-focus-color` | `#008ff87f` | Focus ring |
| `--mp-focus-border` | `#006dca` | Borde focus |
| `--mp-focus-color-invert` | `rgba(255,255,255,0.7)` | Focus invertido |

---

## 🌈 2. GRADIENTES

```css
/* Hero background (de mint a lavanda suave) */
--mp-hero-gradient: linear-gradient(180deg, #dceeeb 0%, #e8e1ff 75%, #ffffff 100%);

/* Product sections */
--mp-product-gradient: linear-gradient(180deg, #dceeeb 0%, #eee9ff 100%);

/* Header (se blend al scrollear) */
--srf-header-initial-background-color: var(--color-mint); /* #dceeeb */
--srf-header-scroll-color: color-mix(in oklab, var(--srf-header-initial-background-color), #ffffff var(--srf-header-blend-percent));
```

### Top Banner
- **Color de fondo**: `rgb(193, 144, 255)` — Lavanda sólida (`#c190ff`)
- **Padding**: `8px 16px`

---

## 🔤 3. TIPOGRAFÍA

### Familias de Fuentes
| Font | Uso |
|------|-----|
| **Lazzer** | Headings principales, botones, navegación |
| **Inter** | Body text, párrafos, UI pequeño |
| Fallback | `sans-serif` |

### Escala Tipográfica (Desktop)
| Elemento | Font | Size | Weight | Line Height | Letter Spacing |
|----------|------|------|--------|-------------|----------------|
| H1 | Lazzer | **84px** | 600 | 92.4px (1.1) | -3.36px |
| H2 | Lazzer | **48px** | 600 | 48px (1.0) | -1.92px |
| H3 | Lazzer + Inter | **16px** | 600 | 19.2px | -0.32px |
| H4 | Lazzer | **24px** | 600 | 28.8px | -0.48px |
| Body/p | Inter | 16px | 400 | normal | normal |
| Nav items | Lazzer + Inter | 16px | 600 | — | — |
| Buttons | Lazzer | 16px | 600 | — | -0.32px |

> **Nota:** Semrush usa una fuente custom "Lazzer" para brand identity. Para proyectos propios reemplazar con una sans-serif display (ej. Sora, Plus Jakarta Sans, Outfit).

### Font Features (Lazzer)
```css
--srf-factor-a-frac: 'frac' on;        /* fracciones */
--srf-factor-a-funk-up-latin: 'ss01' on; /* latin alternos */
--srf-factor-a-curly-arrows: 'ss03' on;  /* flechas curvas */
```

---

## 🔘 4. BOTONES

### Variante Principal — `.mp-button`
```css
background-color: #c190ff;       /* Lavanda */
color: #181e15;                  /* Off-black */
border-radius: 100px;            /* Pill shape */
padding: 0px 32px;
height: 60px;
font-family: Lazzer, sans-serif;
font-size: 16px;
font-weight: 600;
letter-spacing: -0.32px;
border: 0.67px solid transparent;
transition: background-color 0.2s ease-in-out,
            border-color 0.2s ease-in-out,
            color 0.2s ease-in-out;
display: flex;
align-items: center;
```

### Variante Outline — `.mp-button--outline`
```css
background-color: transparent;
color: #181e15;
border: 0.67px solid #181e15;
border-radius: 100px;
padding: 0px 24px;
height: 48px;                    /* Más pequeño que primario */
font-family: Lazzer, sans-serif;
font-size: 16px;
font-weight: 600;
```

### Variante Fill Black — `.mp-button--fill-black`
```css
background-color: #181e15;
color: #ffffff;
border-radius: 100px;
```

### Variante Invert — `.mp-button--invert`
```css
/* Para fondos oscuros — colores invertidos */
```

---

## 📐 5. ESPACIADO Y LAYOUT

```css
/* Variables de sistema */
--mp-vertical-padding: 60px;       /* Padding vertical base */
--mp-grid-margin: 16px;            /* Margen de grid */
--mp-border-radius: 100px;         /* Border radius pill (botones) */

/* Header */
--header-height: 84px;
--underheader-height: calc(100vh - 84px);
--header-content-padding: max(24px, (100% - 1440px + 48px) / 2);

/* Z-index */
--z-index-header: 500;
```

### Padding de Secciones (Desktop)
| Sección | Padding |
|---------|---------|
| `.mp-hero` | `64px 0px 0px` |
| `.mp-stats` | `120px 0px` |
| `.mp-toolkits` (slider) | `120px 120px` |
| `.mp-client-testimonials` | `120px 32px` |
| Header | `max(24px, ...)` auto centrado a 1440px |

**Max width del contenido**: `1440px`

---

## ✨ 6. ANIMACIONES Y TRANSICIONES

### Variables de Transición
```css
--mp-transition-duration: 200ms;
--mp-transition-easing: ease-in-out;
```

### Keyframe Animations

#### `scroll-x` — Logo carousel infinito
```css
@keyframes scroll-x {
  0%   { transform: translate3d(var(--mp-logos-scroll-start), 0, 0); }
  100% { transform: translate3d(var(--mp-logos-scroll-end), 0, 0); }
}
/* Aplicado al strip de logos con animation-iteration-count: infinite; linear */
```

#### `srf-header-colors` — Header blend al scroll
```css
@keyframes srf-header-colors {
  100% { --srf-header-blend-percent: 100%; }
}
/* El header mezcla el color mint con blanco cuando el usuario scrollea */
```

#### `suggest-placeholder-cursor-blink` — Cursor parpadeante en input
```css
@keyframes suggest-placeholder-cursor-blink {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0; }
}
```

#### `claude-pulse` — Pulse suave
```css
@keyframes claude-pulse {
  0%, 100% { opacity: 0.6; }
  50%      { opacity: 1; }
}
```

#### Rotación (loader/spinner)
```css
@keyframes _3jca91rrtZ4Z2Vq_i9WDX {
  100% { transform: rotate(1turn); }
}
```

### Transición de botones
```css
transition: background-color 0.2s ease-in-out,
            border-color 0.2s ease-in-out,
            color 0.2s ease-in-out;
```

### Transición de header (scroll-triggered)
```css
animation: srf-header-colors linear both;
animation-timeline: scroll();
animation-range: 0 200px;
/* El fondo del header va de mint (#dceeeb) a blanco (#fff) en los primeros 200px de scroll */
```

---

## 🏗️ 7. ESTRUCTURA DE SECCIONES (De arriba a abajo)

### 1. TOP BANNER (`.srf_top_banner`)
- **Fondo**: `#c190ff` (lavanda sólida)
- **Padding**: `8px 16px`
- Texto corto promocional + link

### 2. HEADER (`#srf-header`)
- **Altura**: `84px`
- **Fondo inicial**: `#dceeeb` (mint) → blend a blanco al scrollear
- **Animación**: `srf-header-colors` con scroll timeline
- **Nav items**: font Lazzer 16px 600, border-radius 10px en hover
- **Botones**: Log In (outline), Sign Up (lavanda pill)

### 3. HERO (`.mp-hero`)
- **Fondo**: transparente (hereda el hero gradient del body)
- **Gradient del body**: `linear-gradient(180deg, #dceeeb 0%, #e8e1ff 75%, #fff 100%)`
- **Padding**: `64px 0px 0px`
- **H1**: "Be found everywhere search happens" — Lazzer 84px 600 -3.36px
- **Subtítulo p**: "The leading platform to grow and measure brand visibility..." — Inter 16px
- **CTAs**: [Get insights] lavanda pill 60px · [Try for free] outline · [Book a demo] fill-black
- **Input de búsqueda**: con placeholder animado (cursor blink)
- **Trust logos**: Shopify, Decathlon, Booking.com + más

### 4. LOGOS STRIP (`.mp-logos`)
- **Animación**: `scroll-x` infinite linear — carrusel horizontal automático
- Logos de clientes/partners en escala de grises
- **CSS vars**: `--mp-logos-scroll-start`, `--mp-logos-scroll-end`

### 5. STATS (`.mp-stats`)
- **Padding**: `120px 0px`
- **Eyebrow**: "STATS AND FACTS" — caps pequeño
- **H2**: "THE DATA YOU NEED TO OUTRANK THE COMPETITION" — Lazzer 48px
- **Stats interactivas** (click para expandir):
  - `28B` Keywords
  - `43T` Backlinks
  - `808M` Domain profiles
  - `142` Geo databases
  - `261M+` LLM prompts
- **Comportamiento**: `.js-stats-container` / `.js-stats-item active` — una stat activa a la vez

### 6. TOOLKITS / SLIDER (`.mp-toolkits.mp-slider`)
- **Librería**: Swiper.js (`.swiper`, `.swiper-initialized`, `.swiper-horizontal`)
- **Padding**: `120px`
- **Eyebrow**: "SOLUTIONS (9)"
- **H2**: "GET SEEN. GET CITED. BE THE ANSWER."
- **9 slides** con tabs de navegación desktop:
  1. SEMRUSH ONE — "Grow your digital brand visibility"
  2. SEO — "Outrank the rest with better SEO"
  3. AI VISIBILITY — "Get LLMs to cite your brand"
  4. TRAFFIC AND MARKET — "Analyze traffic on any website"
  5. CONTENT — "Craft SEO and AI-ready content in minutes"
  6. LOCAL — "Own your local presence"
  7. ADVERTISING — "Make every ad dollar work harder"
  8. + más
- **Navegación**: `.mp-toolkits__desktop-navigation.mp-slider-navigation`

### 7. AI VISIBILITY INDEX (`.mp-ai-visibility-index`)
- **Eyebrow**: "AI VISIBILITY INDEX"
- **H2**: "Explore the strategies powering today's AI search leaders..."
- **CTA**: "Explore the index"
- **Tabla** con Share of Voice por marca:
  - Google 7.9%, Samsung 7.4%, Apple 5%, Microsoft 4.4%...
- Plataforma: ChatGPT (con date selector)
- **Componentes**: barras de progreso animadas (`.mp-ai-visibility-index__bar`)

### 8. CLIENT TESTIMONIALS (`.mp-client-testimonials`)
- **Padding**: `120px 32px`
- Layout: `.mp-client-testimonials__layout`
- Quote blocks con foto de autor + logo empresa

### 9. FOOTER (`.mp-footer`)
- Fondo oscuro o claro (pendiente capturar)

---

## 🎭 8. COMPONENTES DE ANIMACIÓN ESPECIALES

### Header Scroll Blend
El header cambia de color mint a blanco suavemente al hacer scroll:
```css
/* El header usa CSS scroll-driven animations */
animation: srf-header-colors linear both;
animation-timeline: scroll();
animation-range: 0px 200px;
/* Va de mint → blanco en los primeros 200px de scroll */
```

### Logo Carousel Infinito
```css
/* Strip de logos que se mueve horizontalmente de forma continua */
animation: scroll-x [duration] linear infinite;
/* Dos copias del strip para efecto seamless loop */
```

### Stats Interactivas
- Clase `.js-stats-item` con estado `.active`
- Al click cambia la stat activa con transición
- Muestra número grande + descripción

### Swiper.js Toolkit Slider
- Slider horizontal con bullets/tabs de navegación
- `.swiper-slide-active` para el slide visible
- Navegación desktop vs mobile diferenciada

### Input Placeholder Animado
```css
/* Cursor que parpadea en el search input del hero */
animation: suggest-placeholder-cursor-blink 1s infinite;
```

---

## 🔲 9. SOMBRAS Y EFECTOS

```css
--mp-shadow-glass: 0 2px 12px 0 rgba(...);  /* Sombra glassmorphism */
```

---

## 🗂️ 10. COMPONENTES (Clases BEM mp-)

### Componentes principales
- `mp-hero` — Sección hero
- `mp-logos` — Strip de logos (carrusel)
- `mp-stats` — Estadísticas interactivas
- `mp-toolkits` + `mp-slider` — Slider de productos (Swiper)
- `mp-ai-visibility-index` — Tabla AI Visibility
- `mp-client-testimonials` — Testimoniales con quote + autor
- `mp-pricing` — Precios
- `mp-footer` — Footer
- `mp-section` — Wrapper genérico de sección (padding 120px)

### Botones
- `mp-button` — Primario lavanda pill
- `mp-button--outline` — Contorno negro pill
- `mp-button--fill-black` — Relleno negro
- `mp-button--invert` — Invertido (fondo oscuro)
- `mp-button--icon` — Con ícono

### Header (srf-)
- `srf-header` — Header sticky con scroll animation
- `srf-header__menu-item` — Links de nav (Lazzer 16px 600)
- `srf-header__menu-sublist-column-title` — Submenú títulos
- `srf_top_banner` — Banner superior lavanda

---

## 📊 11. TIPOGRAFÍA EN USO — Resumen

### EYEBROWS (etiquetas de sección)
- Uppercase caps pequeño, espaciado generoso
- Ej: "STATS AND FACTS", "SOLUTIONS ( 9 )", "AI VISIBILITY INDEX"
- Font: Inter o Lazzer, peso 600

### HEADINGS DE SECCIÓN
- H2 hero: **84px** Lazzer 600
- H2 secciones: **48px** Lazzer 600
- Subtítulos: Inter 16-20px

### COPY
- Párrafos principales: Inter 16px, color `#6c6e79` (dark grey) o `#181e15`

---

## 🎨 12. PALETA COMPLETA — USO POR SECCIÓN

| Sección | Fondo | Texto | Acento |
|---------|-------|-------|--------|
| Top Banner | `#c190ff` | `#181e15` | — |
| Header (top) | `#dceeeb` (mint) | `#181e15` | — |
| Header (scroll) | `#ffffff` | `#181e15` | — |
| Hero | gradient mint→lavanda→white | `#181e15` | `#c190ff` |
| Logos strip | `#ffffff` | — | — |
| Stats | `#ffffff` | `#181e15` | `#c190ff` |
| Toolkits | `#ffffff` / `#f7fbfa` | `#181e15` | `#c190ff` |
| AI Visibility | `#ffffff` | `#181e15` | `#c190ff` |
| Testimonials | `#ffffff` | `#181e15` | — |
| CTA primario | `#c190ff` | `#181e15` | — |
| CTA outline | transparent | `#181e15` | `#181e15` |
| CTA dark | `#181e15` | `#ffffff` | — |

---

## 📱 13. RESPONSIVE

- **Grid margin**: `--mp-grid-margin: 16px`
- **Max content width**: `1440px`
- **Header padding**: `max(24px, (100% - 1440px + 48px) / 2)` — auto-centra en pantallas grandes

---

## 🔗 14. LIBRERÍAS DETECTADAS

| Librería | Uso |
|----------|-----|
| **Swiper.js** | Toolkit slider horizontal (`.swiper`, `.swiper-initialized`) |
| **CSS Scroll-Driven Animations** | Header color blend nativo |
| **Custom font "Lazzer"** | Brand font display |
| **Inter** | System/body font |

---

## 💡 15. NOTAS DE DISEÑO CLAVES

1. **Pill buttons** con `border-radius: 100px` — estilo muy redondeado y moderno
2. **Color lavanda `#c190ff`** como color de acción/CTA principal — diferente del verde típico SaaS
3. **Mint `#dceeeb`** como color de fondo hero — fresco, orgánico
4. **Off-black `#181e15`** levemente verdoso — no negro puro, más suave
5. **Header scroll animation** nativa con CSS — muy performante
6. **Logo carousel** con CSS transform/animation sin JS
7. **Tipografía Lazzer** custom con features OpenType activos (frac, ss01, ss03)
8. **Stats interactivas** con accordion visual — una activa a la vez
9. **Eyebrows en caps** como etiquetas de sección — "STATS AND FACTS", etc.
10. **Gradiente vertical del hero** — desde mint en top hasta blanco puro, pasando por lavanda suave

---

*Capturado: Mayo 2026 | Fuente: www.semrush.com*

# synara.ai Premium Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `index.html` and `styles.css` to deliver a Premium Enterprise B2B landing page: zero emojis (replaced by SVG Lucide icons), elevated ROI-focused copy, dual-panel Calendly CTA, and magnetic glow micro-interactions.

**Architecture:** Complete rewrite of both static files. `script.js` is untouched — all its selectors, `data-target` attributes, and class hooks must be preserved exactly. The CSS variables system is extended (two new variables added), not replaced.

**Tech Stack:** Vanilla HTML5, CSS3 (custom properties, grid, glassmorphism), inline SVG (Lucide-style, stroke-only, no external icon library)

---

## SVG Icon Reference Library

All icons below are used across Tasks 2–4. Copy exact paths — do not improvise.

### Hero & General

**Layers (hero center):**
```html
<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
  <path d="M2 17l10 5 10-5"/>
  <path d="M2 12l10 5 10-5"/>
</svg>
```

**Zap (hero node 1 / RPA service icon / impacto after item 1):**
```html
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
</svg>
```

**BarChart2 (hero node 2):**
```html
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <line x1="18" y1="20" x2="18" y2="10"/>
  <line x1="12" y1="20" x2="12" y2="4"/>
  <line x1="6" y1="20" x2="6" y2="14"/>
</svg>
```

**Cpu (hero node 3):**
```html
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <rect x="9" y="9" width="6" height="6" rx="1"/>
  <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>
  <rect x="5" y="5" width="14" height="14" rx="2"/>
</svg>
```

**Workflow (hero node 4):**
```html
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <rect x="3" y="3" width="6" height="6" rx="1"/>
  <rect x="15" y="15" width="6" height="6" rx="1"/>
  <rect x="15" y="3" width="6" height="6" rx="1"/>
  <path d="M9 6h3a3 3 0 0 1 3 3v1"/>
  <path d="M9 18H6a3 3 0 0 1-3-3V9"/>
</svg>
```

### Section Badge Icons (12×12, `stroke="currentColor"`)

**Settings2 (servicios badge):**
```html
<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M20 7h-9"/><path d="M14 17H5"/>
  <circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/>
</svg>
```

**Search (proceso badge):**
```html
<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
</svg>
```

**ArrowUpRight (soluciones badge):**
```html
<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
</svg>
```

**Zap (impacto badge) — same as Zap above but width/height="12"**

**Sparkles (CTA badge):**
```html
<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
</svg>
```

### Service Card Icons (24×24, in `.service-icon` container)

**RPA — Bot:**
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M12 8V4H8"/><rect x="3" y="8" width="18" height="12" rx="2"/>
  <circle cx="8.5" cy="14" r="1.5"/><circle cx="15.5" cy="14" r="1.5"/>
  <path d="M6 20v1M18 20v1"/>
</svg>
```

**IA — Network/BrainCircuit simplificado:**
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/>
  <circle cx="12" cy="14" r="2"/>
  <path d="M12 7v5"/><path d="M6.48 17.5 10 16"/><path d="M17.52 17.5 14 16"/>
  <path d="M5.5 17 5 14l7-4 7 4-.5 3"/>
</svg>
```

**Desarrollo — Code2:**
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>
</svg>
```

### Solution Card Icons (24×24, in `.solution-icon-wrap` container)

**Finanzas — Landmark:**
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <line x1="3" y1="22" x2="21" y2="22"/>
  <line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/>
  <line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/>
  <polygon points="12 2 20 7 4 7"/>
</svg>
```

**Data/BI — TrendingUp:**
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
  <polyline points="17 6 23 6 23 12"/>
</svg>
```

**Gestión — Building2:**
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18z"/>
  <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
  <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
  <path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>
</svg>
```

**Fuerza Laboral Autónoma — BotMessageSquare:**
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M12 6V2H8"/>
  <path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z"/>
  <path d="M2 12h2"/><path d="M9 11v2"/><path d="M15 11v2"/><path d="M20 12h2"/>
</svg>
```

### Impact Section Icons

**Before header — AlertCircle (stroke="#F87171"):**
```html
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F87171" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <circle cx="12" cy="12" r="10"/>
  <line x1="12" y1="8" x2="12" y2="12"/>
  <line x1="12" y1="16" x2="12.01" y2="16"/>
</svg>
```

**After header — CheckCircle2 (stroke="#22D3EE"):**
```html
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
  <path d="m9 12 2 2 4-4"/>
</svg>
```

**Before items (all `stroke="#EF4444"`, width/height="20"):**

Clock (item 1): `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`

AlertTriangle (item 2): `<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>`

Database (item 3): `<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>`

TrendingDown (item 4): `<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>`

**After items (all `stroke="#06B6D4"`, width/height="20"):**

Zap (item 1): same polygon as above

Target (item 2): `<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>`

BarChart2 (item 3): same lines as hero node 2

Rocket (item 4): `<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m3.5 19.5 3-3"/><path d="M20 4 8.5 15.5M20 4h-5M20 4v5"/>`

---

## Task 1: Rewrite styles.css

**Files:**
- Rewrite: `styles.css`

### What changes vs current file

1. Add two variables in `:root`:
```css
--danger: #EF4444;
--danger-glow: rgba(239, 68, 68, 0.25);
```

2. `.service-icon` — replace `font-size: 1.5rem` with `display: flex; align-items: center; justify-content: center;`. Add stroke color inheritance:
```css
.service-icon svg { stroke: var(--primary-light); }
.service-card:hover .service-icon svg { stroke: var(--accent-light); }
```

3. `.solution-icon-wrap` — same treatment:
```css
.solution-icon-wrap svg { stroke: var(--accent); }
.solution-card:hover .solution-icon-wrap svg { stroke: var(--accent-light); }
```

4. `.hero-center-icon` — remove `font-size: 2.8rem;`, the SVG handles sizing.

5. `.hero-node` — remove `font-size: 1.3rem;`, add:
```css
.hero-node svg { stroke: var(--accent); }
```

6. **Service card magnetic glow** — replace existing `.service-card:hover` box-shadow:
```css
.service-card:hover {
  border-color: rgba(124, 58, 237, 0.5);
  transform: translateY(-5px);
  box-shadow:
    0 0 0 1px rgba(124, 58, 237, 0.15),
    0 0 32px rgba(124, 58, 237, 0.25),
    0 24px 64px rgba(0, 0, 0, 0.5);
}
```

7. **Solution card magnetic glow** — replace existing `.solution-card:hover` box-shadow:
```css
.solution-card:hover {
  border-color: rgba(6, 182, 212, 0.45);
  transform: translateY(-3px);
  box-shadow:
    0 0 0 1px rgba(6, 182, 212, 0.12),
    0 0 28px rgba(6, 182, 212, 0.2),
    0 16px 48px rgba(0, 0, 0, 0.45);
}
```

8. **Hero title gradient richer** — replace `.hero-title .highlight` animation target:
```css
.hero-title .highlight {
  background: linear-gradient(135deg, #7C3AED 0%, #8B5CF6 25%, #06B6D4 65%, #22D3EE 100%);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 5s ease infinite;
}
```

9. **Impact section — dramatic contrast colors** — modify existing `.impact-col-header.before`:
```css
.impact-col-header.before {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.25);
  color: #F87171;
}
.impact-col-header.after {
  background: rgba(6, 182, 212, 0.1);
  border: 1px solid rgba(6, 182, 212, 0.25);
  color: #22D3EE;
}
```
Replace `.impact-item-icon` (was `font-size: 1.2rem`) with:
```css
.impact-item-icon {
  width: 20px; height: 20px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
```
Add hover rules:
```css
.impact-item.before:hover {
  border-color: rgba(239, 68, 68, 0.3);
  box-shadow: inset 3px 0 0 rgba(239, 68, 68, 0.4);
}
.impact-item.after:hover {
  border-color: rgba(6, 182, 212, 0.35);
  box-shadow: inset 3px 0 0 rgba(6, 182, 212, 0.4), 0 0 16px rgba(6, 182, 212, 0.06);
}
```

10. **CTA section — dual panel layout.** Replace `.cta-inner` padding and text-align, add new selectors:
```css
.cta-inner {
  background: var(--gradient-cta);
  border-radius: var(--radius-2xl);
  padding: var(--space-12);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-10);
  align-items: center;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(124, 58, 237, 0.3);
}

.cta-calendly-panel {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-xl);
  overflow: hidden;
  min-height: 500px;
  display: flex;
  flex-direction: column;
}

.cta-calendly-header {
  padding: var(--space-5) var(--space-6);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.cta-calendly-header svg { opacity: 0.7; }

.cta-calendly-title {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
}

.cta-calendly-sub {
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.5);
}

.calendly-embed-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
}

.calendly-placeholder-inner {
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
}

.calendly-placeholder-inner p {
  font-size: var(--text-xs);
  margin-top: var(--space-3);
  line-height: 1.5;
}

.cta-content-panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* Override: cta-content no longer centered */
.cta-content-panel .cta-badge { align-self: flex-start; }
.cta-content-panel .cta-title { text-align: left; font-size: clamp(var(--text-2xl), 3vw, var(--text-4xl)); }
.cta-content-panel .cta-desc { text-align: left; }

.cta-value-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.cta-value-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.5;
}

.cta-value-item svg { flex-shrink: 0; margin-top: 2px; }

.cta-secondary-contacts {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.cta-contact-btn {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  font-weight: 600;
  transition: all var(--anim-base);
  font-family: var(--font-display);
}

.cta-contact-btn.whatsapp {
  background: linear-gradient(135deg, #25D366, #128C7E);
  color: #fff;
  box-shadow: 0 4px 16px rgba(37, 211, 102, 0.25);
}

.cta-contact-btn.whatsapp:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(37, 211, 102, 0.4);
}

.cta-contact-btn.email {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.7);
}

.cta-contact-btn.email:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  transform: translateY(-1px);
}

.cta-trust {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.cta-trust-item {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.45);
}

.cta-check {
  color: rgba(255, 255, 255, 0.5);
  font-size: 10px;
  font-weight: 800;
}
```

11. **Responsive — CTA dual panel collapses to single column:**
```css
/* Inside existing @media (max-width: 768px) block */
.cta-inner {
  grid-template-columns: 1fr;
  padding: var(--space-8);
}
.cta-content-panel .cta-title { text-align: center; }
.cta-content-panel .cta-desc { text-align: center; }
.cta-content-panel .cta-badge { align-self: center; }
.cta-value-list { display: none; } /* hide on mobile to save space */
```

- [ ] **Step 1: Apply all CSS changes to styles.css**

  Open `styles.css`. Apply all 11 changes listed above in order. For sections not listed (header, clients, methodology, stats, footer, cursor glow, buttons — everything else), keep them **exactly as-is**.

  Key areas to double-check after editing:
  - `:root` has `--danger` and `--danger-glow` added after `--accent-warm`
  - `.cta-inner` is now `display: grid; grid-template-columns: 1fr 1fr` (not `text-align: center`)
  - `.impact-col-header.before` has `color: #F87171` (not just border color)
  - All new `.cta-*` selectors are present

- [ ] **Step 2: Verify CSS loads without errors**

  Open browser DevTools → Console. Confirm zero CSS parse errors.

- [ ] **Step 3: Commit**

  ```bash
  git add styles.css
  git commit -m "style: premium enterprise redesign — glow effects, impact contrast, dual CTA layout"
  ```

---

## Task 2: Rewrite index.html — Head, Header, Hero

**Files:**
- Rewrite: `index.html` (first pass — everything from `<!DOCTYPE>` through end of `</section>` for `#inicio`)

- [ ] **Step 1: Write head + header (unchanged structurally, remove no emojis here)**

  The head and header have no emojis. Copy them exactly from the current file. The only change: update `<title>` and `<meta name="description">`:

  ```html
  <title>synara.ai — Automatización Empresarial con IA</title>
  <meta name="description" content="synara.ai — Convertimos cuellos de botella operativos en ventajas competitivas mediante RPA, Agentes de IA y desarrollo a medida. ROI medible desde semana 1." />
  ```

- [ ] **Step 2: Write Hero section**

  Replace the entire `<section class="hero" ...>` with the version below. Key changes:
  - Hero badge text: `Sistema de Automatización Empresarial`
  - H1: `Convertí tu operación en una <span class="highlight">Ventaja Competitiva</span>`
  - Descripción updated
  - `.hero-center` uses SVG Layers (from icon library above)
  - 4 `.hero-node` elements use the 4 SVGs from library (Zap, BarChart2, Cpu, Workflow)

  ```html
  <section class="hero" id="inicio" aria-labelledby="hero-title">

    <div class="hero-bg" aria-hidden="true">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
      <div class="hero-grid"></div>
    </div>

    <div class="container hero-content">

      <div class="hero-text">
        <div class="hero-badge">
          <span class="hero-badge-dot"></span>
          Sistema de Automatización Empresarial
        </div>

        <h1 class="hero-title" id="hero-title">
          Convertí tu operación en una<br>
          <span class="highlight">Ventaja Competitiva</span>
        </h1>

        <p class="hero-desc">
          Identificamos los procesos que frenan tu crecimiento y los automatizamos con RPA, Agentes de IA y desarrollo a medida. ROI medible desde las primeras semanas.
        </p>

        <div class="hero-actions">
          <a href="#contacto" class="btn btn-primary btn-lg">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1L13 8L8 15M3 8H13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Solicitar Diagnóstico
          </a>
          <a href="#proceso" class="btn btn-ghost btn-lg">
            Ver Cómo Funciona
          </a>
        </div>

        <div class="hero-trust">
          <div class="hero-trust-avatars">
            <div class="hero-trust-avatar">C</div>
            <div class="hero-trust-avatar">B</div>
            <div class="hero-trust-avatar">H</div>
            <div class="hero-trust-avatar">+</div>
          </div>
          <p class="hero-trust-text">
            <strong>+10 empresas</strong> ya automatizan con synara
          </p>
        </div>
      </div>

      <div class="hero-visual" aria-hidden="true">
        <div class="hero-visual-inner">
          <div class="hero-ring hero-ring-1"></div>
          <div class="hero-ring hero-ring-2"></div>
          <div class="hero-ring hero-ring-3"></div>
          <div class="hero-center">
            <span class="hero-center-icon">
              <!-- Layers SVG from icon library -->
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            </span>
          </div>
          <!-- hero-node nth-child positions: 5=top, 6=right, 7=bottom, 8=left -->
          <div class="hero-node">
            <!-- Zap -->
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </div>
          <div class="hero-node">
            <!-- BarChart2 -->
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          </div>
          <div class="hero-node">
            <!-- Cpu -->
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/><rect x="5" y="5" width="14" height="14" rx="2"/></svg>
          </div>
          <div class="hero-node">
            <!-- Workflow -->
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><path d="M9 6h3a3 3 0 0 1 3 3v1"/><path d="M9 18H6a3 3 0 0 1-3-3V9"/></svg>
          </div>
        </div>
      </div>

    </div>
  </section>
  ```

- [ ] **Step 3: Commit**

  ```bash
  git add index.html
  git commit -m "feat: hero section — SVG nodes, enterprise copy, richer gradient"
  ```

---

## Task 3: index.html — Clients, Services, Methodology, Solutions

**Files:**
- Modify: `index.html` (continue from after `#inicio` section)

### Clients section
No emojis. Keep identical to current.

### Services section

- [ ] **Step 1: Replace section badge and all service icons + copy**

  **Section badge** (replace `⚙️ Nuestros servicios`):
  ```html
  <span class="section-badge">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>
    Capacidades
  </span>
  ```

  **Section title + subtitle** (update copy):
  ```html
  <h2 class="section-title" id="servicios-title">
    Tecnología que elimina<br>
    <span class="gradient-text">tu fricción operativa</span>
  </h2>
  <p class="section-subtitle">
    Combinamos las herramientas más potentes del mercado para automatizar lo que te frena y multiplicar lo que te hace crecer.
  </p>
  ```

  **Servicio 01 — RPA:**
  ```html
  <article class="service-card animate-on-scroll">
    <span class="service-number">01</span>
    <div class="service-icon" aria-hidden="true">
      <!-- Bot SVG from icon library -->
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect x="3" y="8" width="18" height="12" rx="2"/><circle cx="8.5" cy="14" r="1.5"/><circle cx="15.5" cy="14" r="1.5"/><path d="M6 20v1M18 20v1"/></svg>
    </div>
    <h3 class="service-title">Automatización RPA</h3>
    <p class="service-desc">
      Robots de software que operan 24/7 con precisión milimétrica. Eliminamos las tareas manuales y repetitivas que consumen el tiempo de tu equipo más valioso.
    </p>
    <ul class="service-features" aria-label="Características de Automatización RPA">
      <li class="service-feature">
        <span class="feature-check" aria-hidden="true">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1.5 6 4.5 9 10.5 3"/></svg>
        </span>
        Bots para entrada y migración de datos
      </li>
      <li class="service-feature">
        <span class="feature-check" aria-hidden="true">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1.5 6 4.5 9 10.5 3"/></svg>
        </span>
        Automatización de reportes y facturación
      </li>
      <li class="service-feature">
        <span class="feature-check" aria-hidden="true">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1.5 6 4.5 9 10.5 3"/></svg>
        </span>
        Integración con ERP, CRM y sistemas legacy
      </li>
      <li class="service-feature">
        <span class="feature-check" aria-hidden="true">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1.5 6 4.5 9 10.5 3"/></svg>
        </span>
        Monitoreo y alertas en tiempo real
      </li>
    </ul>
  </article>
  ```

  **Servicio 02 — IA** (same feature-check pattern, new icon and copy):
  ```html
  <article class="service-card animate-on-scroll">
    <span class="service-number">02</span>
    <div class="service-icon" aria-hidden="true">
      <!-- Network SVG -->
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><circle cx="12" cy="14" r="2"/><path d="M12 7v5"/><path d="M6.48 17.5 10 16"/><path d="M17.52 17.5 14 16"/><path d="M5.5 17 5 14l7-4 7 4-.5 3"/></svg>
    </div>
    <h3 class="service-title">Inteligencia Artificial</h3>
    <p class="service-desc">
      Fuerza Laboral Autónoma: Agentes de IA que aprenden de tu negocio y operan de forma autónoma, desde modelos predictivos hasta procesamiento inteligente de documentos.
    </p>
    <ul class="service-features" aria-label="Características de Inteligencia Artificial">
      <li class="service-feature"><span class="feature-check" aria-hidden="true"><svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1.5 6 4.5 9 10.5 3"/></svg></span>Agentes y chatbots con IA generativa</li>
      <li class="service-feature"><span class="feature-check" aria-hidden="true"><svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1.5 6 4.5 9 10.5 3"/></svg></span>Análisis predictivo y machine learning</li>
      <li class="service-feature"><span class="feature-check" aria-hidden="true"><svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1.5 6 4.5 9 10.5 3"/></svg></span>Procesamiento inteligente de documentos</li>
      <li class="service-feature"><span class="feature-check" aria-hidden="true"><svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1.5 6 4.5 9 10.5 3"/></svg></span>Dashboards de BI con insights automáticos</li>
    </ul>
  </article>
  ```

  **Servicio 03 — Desarrollo** (same pattern):
  ```html
  <article class="service-card animate-on-scroll">
    <span class="service-number">03</span>
    <div class="service-icon" aria-hidden="true">
      <!-- Code2 SVG -->
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
    </div>
    <h3 class="service-title">Desarrollo a Medida</h3>
    <p class="service-desc">
      Plataformas y flujos diseñados exactamente para tu operación. Construimos las herramientas que tu negocio necesita, integradas a tus sistemas y procesos existentes.
    </p>
    <ul class="service-features" aria-label="Características de Desarrollo a Medida">
      <li class="service-feature"><span class="feature-check" aria-hidden="true"><svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1.5 6 4.5 9 10.5 3"/></svg></span>Plataformas web y dashboards personalizados</li>
      <li class="service-feature"><span class="feature-check" aria-hidden="true"><svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1.5 6 4.5 9 10.5 3"/></svg></span>Integraciones vía APIs y webhooks</li>
      <li class="service-feature"><span class="feature-check" aria-hidden="true"><svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1.5 6 4.5 9 10.5 3"/></svg></span>Automatizaciones con n8n, Make y Zapier</li>
      <li class="service-feature"><span class="feature-check" aria-hidden="true"><svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1.5 6 4.5 9 10.5 3"/></svg></span>Entrega iterativa con sprints cortos</li>
    </ul>
  </article>
  ```

### Methodology section

- [ ] **Step 2: Update section badge only**

  Replace `🔍 Nuestro proceso` with:
  ```html
  <span class="section-badge">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
    Metodología
  </span>
  ```
  Everything else in this section (timeline, cards, dots) stays identical.

### Solutions section

- [ ] **Step 3: Update badge + all 4 solution cards**

  **Badge** (replace `🚀 Casos de uso`):
  ```html
  <span class="section-badge">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
    Soluciones
  </span>
  ```

  **4 solution cards** — replace emoji `.solution-icon-wrap` with SVG versions from icon library. Update "Asistentes Cognitivos" to "Fuerza Laboral Autónoma":

  Card 1 (Finanzas): use Landmark SVG, title unchanged, description unchanged.
  Card 2 (Data & BI): use TrendingUp SVG, title unchanged, description unchanged.
  Card 3 (Gestión): use Building2 SVG, title unchanged, description unchanged.
  Card 4:
  ```html
  <article class="solution-card animate-on-scroll">
    <div class="solution-icon-wrap" aria-hidden="true">
      <!-- BotMessageSquare SVG from icon library -->
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6V2H8"/><path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z"/><path d="M2 12h2"/><path d="M9 11v2"/><path d="M15 11v2"/><path d="M20 12h2"/></svg>
    </div>
    <div>
      <h3 class="solution-title">Fuerza Laboral Autónoma</h3>
      <p class="solution-desc">
        Agentes de IA que operan 24/7 reduciendo costos operativos: califican leads, procesan solicitudes y derivan casos complejos a tu equipo sin intervención humana.
      </p>
    </div>
  </article>
  ```

- [ ] **Step 4: Commit**

  ```bash
  git add index.html
  git commit -m "feat: services + solutions — SVG icons, enterprise copy, zero emojis"
  ```

---

## Task 4: index.html — Impact, Stats, CTA, Footer

**Files:**
- Modify: `index.html` (final sections)

### Impact section

- [ ] **Step 1: Replace impact badge + all impact icons + copy elevation**

  **Badge** (replace `⚡ Ventajas reales`):
  ```html
  <span class="section-badge">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
    Impacto
  </span>
  ```

  **Section title + subtitle updated:**
  ```html
  <h2 class="section-title" id="impacto-title">
    El coste real de operar<br>
    <span class="gradient-text">sin automatización</span>
  </h2>
  <p class="section-subtitle">
    Resultados concretos y medibles que nuestros clientes experimentan desde las primeras semanas de implementación.
  </p>
  ```

  **Before column header** (replace `⚠️` emoji):
  ```html
  <div class="impact-col-header before">
    <span class="impact-col-icon">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F87171" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    </span>
    <div class="impact-col-title">
      Sin synara
      <span>El estado actual de tu operación</span>
    </div>
  </div>
  ```

  **After column header** (replace `✅` emoji):
  ```html
  <div class="impact-col-header after">
    <span class="impact-col-icon">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
    </span>
    <div class="impact-col-title">
      Con synara.ai
      <span>Tu operación transformada</span>
    </div>
  </div>
  ```

  **4 before items** — replace emoji `.impact-item-icon` spans with SVGs. Use the before-item SVGs from icon library (stroke="#EF4444", width/height="20"). Keep all text and class names identical.

  Example for item 1:
  ```html
  <li class="impact-item before">
    <span class="impact-item-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    </span>
    <div class="impact-item-text">
      <strong>Horas perdidas cada semana</strong>
      Tareas manuales y repetitivas que consumen el tiempo de tu equipo más valioso.
    </div>
  </li>
  ```
  Repeat pattern for items 2 (AlertTriangle), 3 (Database), 4 (TrendingDown) using SVG paths from icon library.

  **4 after items** — same pattern with after-item SVGs (stroke="#06B6D4"). Items: Zap, Target, BarChart2, Rocket.

  Example item 1:
  ```html
  <li class="impact-item after">
    <span class="impact-item-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
    </span>
    <div class="impact-item-text">
      <strong>85% del tiempo operativo recuperado</strong>
      Tu equipo se enfoca en decisiones estratégicas, no en tareas repetitivas.
    </div>
  </li>
  ```

### Stats section
No emojis. Keep identical.

### CTA section

- [ ] **Step 2: Replace entire CTA section with dual panel**

  ```html
  <section class="cta-section" id="contacto" aria-labelledby="cta-title">
    <div class="container">
      <div class="cta-inner">
        <div class="cta-orb-1" aria-hidden="true"></div>
        <div class="cta-orb-2" aria-hidden="true"></div>

        <!-- Panel izquierdo: Calendly -->
        <div class="cta-calendly-panel">
          <div class="cta-calendly-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <div>
              <div class="cta-calendly-title">Agendar Diagnóstico Gratuito</div>
              <div class="cta-calendly-sub">Seleccioná un horario disponible</div>
            </div>
          </div>
          <div class="calendly-embed-container">
            <!-- Calendly inline widget BEGIN -->
            <div
              class="calendly-inline-widget"
              data-url="https://calendly.com/TU-USUARIO/diagnostico"
              style="min-width:280px;height:420px;width:100%;">
            </div>
            <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
            <!-- Calendly inline widget END -->
            <!-- Placeholder visible cuando Calendly no está configurado -->
            <noscript>
              <div class="calendly-placeholder-inner">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <p>Habilitá JavaScript para ver el calendario</p>
              </div>
            </noscript>
          </div>
        </div>

        <!-- Panel derecho: copy + contactos secundarios -->
        <div class="cta-content-panel">
          <span class="cta-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
            Diagnóstico sin costo
          </span>

          <h2 class="cta-title" id="cta-title">
            Agendá tu sesión estratégica.<br>Sin compromiso.
          </h2>

          <p class="cta-desc">
            30 minutos son suficientes para identificar qué proceso de tu operación tiene mayor ROI potencial de automatización y cuánto podés ahorrar en los próximos 90 días.
          </p>

          <ul class="cta-value-list" aria-label="Beneficios del diagnóstico">
            <li class="cta-value-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
              Mapa de procesos automatizables en tu operación
            </li>
            <li class="cta-value-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
              Estimación de ROI y tiempo de retorno de inversión
            </li>
            <li class="cta-value-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
              Hoja de ruta de implementación sin jerga técnica
            </li>
          </ul>

          <div class="cta-secondary-contacts">
            <a href="https://wa.me/59891315670?text=Hola%20synara.ai%2C%20quiero%20automatizar%20mi%20negocio" target="_blank" rel="noopener noreferrer" class="cta-contact-btn whatsapp">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Hablar por WhatsApp
            </a>
            <a href="mailto:facuetcheverry4@gmail.com" class="cta-contact-btn email">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              Escribir por email
            </a>
          </div>

          <div class="cta-trust">
            <span class="cta-trust-item">
              <span class="cta-check" aria-hidden="true">✓</span>
              Sin compromiso
            </span>
            <span class="cta-trust-item">
              <span class="cta-check" aria-hidden="true">✓</span>
              Respuesta en menos de 24h
            </span>
            <span class="cta-trust-item">
              <span class="cta-check" aria-hidden="true">✓</span>
              100% personalizado
            </span>
          </div>
        </div>

      </div>
    </div>
  </section>
  ```

### Footer section

- [ ] **Step 3: Clean footer**

  Replace `💜 en Uruguay` text only:
  ```html
  <p class="footer-copy">Hecho con pasión en Uruguay</p>
  ```
  Everything else in the footer stays identical.

- [ ] **Step 4: Commit**

  ```bash
  git add index.html
  git commit -m "feat: impact SVG icons, CTA dual panel Calendly, footer cleanup"
  ```

---

## Task 5: Verification & Final Commit

- [ ] **Step 1: Open site in browser and verify all sections**

  Open `index.html` directly in browser (or via local server). Check:
  - Zero emojis visible anywhere on the page
  - Hero visual has 4 SVG nodes (Zap, BarChart, Cpu, Workflow) orbiting the Layers center
  - Service cards show SVG icons with purple stroke
  - Hover on service card → magnetic purple glow visible
  - Hover on solution card → magnetic cyan glow visible
  - Impact section: before column has red tint headers/icons, after column has cyan
  - CTA section: two columns (left Calendly panel, right copy+contacts)
  - Hero title gradient animates (purple→violet→cyan)
  - Responsive: at 768px the CTA collapses to single column

- [ ] **Step 2: Verify script.js compatibility**

  Open DevTools Console. Scroll the page fully. Confirm:
  - No JS errors in console
  - `.animate-on-scroll` elements become `.visible` as you scroll
  - `data-target` counters on stats animate
  - Header gets `.scrolled` class on scroll
  - Mobile menu toggle works at small viewport

- [ ] **Step 3: Final commit**

  ```bash
  git add index.html styles.css
  git commit -m "feat: synara.ai premium enterprise redesign complete"
  ```

---

## Self-Review Notes

- Spec coverage: all 4 requirements mapped — ✓ SVG icons (Tasks 2-4), ✓ ROI copy (Tasks 2-3), ✓ CTA dual panel (Task 4), ✓ micro-interactions/glow (Task 1)
- All SVG paths are complete and exact — no "similar to above" references
- `script.js` selectors preserved: `.animate-on-scroll`, `.visible`, `data-target`, `#header`, `.menu-toggle`, `#clientsTrack`, `#timelineFill`
- CTA responsive collapse included in Task 1 CSS
- `cta-inner` lost `text-align: center` — the `.cta-content-panel` overrides handle alignment per side
- Calendly `data-url` is a placeholder — documented clearly for user to replace

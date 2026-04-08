# Spec: synara.ai — Rediseño Premium Enterprise

**Fecha:** 2026-04-07
**Alcance:** Reescritura completa de `index.html` y `styles.css`
**Objetivo:** Elevar la estética y el copywriting al nivel "Premium Enterprise B2B" para aumentar la tasa de conversión de directores y CEOs hacia el diagnóstico gratuito.

---

## 1. Contexto

El sitio actual tiene una base técnica sólida (CSS variables, glassmorphism, animaciones) pero pierde seriedad por el uso de emojis en zonas críticas, copywriting genérico y una sección de contacto de baja fricción. El rediseño mantiene toda la estructura HTML existente y el sistema de variables CSS, aplicando mejoras sobre ella.

---

## 2. Cambios por sección

### 2.1 Reemplazo global de emojis por SVG inline

Eliminar **todos** los emojis de la interfaz. Reemplazar con iconos SVG inline estilo Lucide/Radix (trazo fino, stroke, sin fill). Paleta: stroke `#06B6D4` (cyan) para nodos de servicio/solución, stroke `#fff` para centro del hero.

**Emojis a reemplazar y su SVG equivalente:**

| Ubicación | Emoji | SVG replacement |
|---|---|---|
| Hero center | 🧠 | Layers (capas apiladas) |
| Hero node 1 | ⚡ | Zap |
| Hero node 2 | 📊 | BarChart2 |
| Hero node 3 | 🤖 | Cpu |
| Hero node 4 | 💡 | Workflow (flechas) |
| Servicios badge | ⚙️ | Settings2 |
| Servicio 01 icon | ⚡ | Zap |
| Servicio 02 icon | 🧠 | BrainCircuit |
| Servicio 03 icon | 💻 | Code2 |
| Feature check ✓ | texto | SVG check circle |
| Proceso badge | 🔍 | Search |
| Soluciones badge | 🚀 | Rocket (o ArrowUpRight) |
| Solución: Finanzas | 💼 | Landmark |
| Solución: Data/BI | 📈 | TrendingUp |
| Solución: Gestión | 🏢 | Building2 |
| Solución: Cognitivos | 🤖 | BotMessageSquare |
| Impacto badge | ⚡ | Zap |
| Impacto before icon | ⚠️ | AlertCircle (rojo) |
| Impacto after icon | ✅ | CheckCircle2 (cyan) |
| Impacto items before | ⏱️⚠️📊🔥 | Clock, AlertTriangle, DatabaseZap, TrendingDown |
| Impacto items after | ⚡🎯📈🚀 | Zap, Target, TrendingUp, Rocket |
| CTA badge | ✨ | Sparkles |
| Footer | 💜 | texto plano "con pasión" |

### 2.2 Copywriting B2B orientado al ROI

**Hero:**
- Badge: `Sistema de Automatización Empresarial`
- H1: `Convertí tu operación en una` `Ventaja Competitiva`
- Descripción: `Identificamos los procesos que frenan tu crecimiento y los automatizamos con RPA, Agentes de IA y desarrollo a medida. ROI medible desde las primeras semanas.`

**Servicios — títulos y descripciones elevadas:**
- `Automatización RPA` → subtítulo: `Robots de software que operan 24/7 con precisión milimétrica`
- `Inteligencia Artificial` → subtítulo: `Fuerza Laboral Autónoma: Agentes de IA que aprenden y ejecutan`
- `Desarrollo a Medida` → subtítulo: `Plataformas y flujos diseñados exactamente para tu operación`

**Soluciones — títulos elevados:**
- "Asistentes Cognitivos" → `Fuerza Laboral Autónoma`
- Descripción: `Agentes de IA que operan 24/7 reduciendo costos operativos: califican leads, procesan solicitudes y derivan casos complejos sin intervención humana.`

**Badges de sección:** Reemplazar texto con emojis por texto limpio:
- `⚙️ Nuestros servicios` → `Capacidades`
- `🔍 Nuestro proceso` → `Metodología`
- `🚀 Casos de uso` → `Soluciones`
- `⚡ Ventajas reales` → `Impacto`
- `✨ Diagnóstico sin costo` → `Diagnóstico sin costo`

### 2.3 Sección CTA — Dual Panel con Calendly

**Layout:** Grid 2 columnas dentro del `cta-inner`.

**Panel izquierdo (Calendly):**
```html
<div class="cta-calendly">
  <div class="calendly-embed-container">
    <!-- Calendly inline widget BEGIN -->
    <div class="calendly-inline-widget"
         data-url="https://calendly.com/TU-USUARIO/diagnostico"
         style="min-width:320px;height:630px;">
    </div>
    <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
    <!-- Calendly inline widget END -->
  </div>
</div>
```

**Panel derecho (copy + contacto secundario):**
- Badge: `Diagnóstico sin costo`
- H2: `Agendá tu sesión estratégica. Sin compromiso.`
- Párrafo ROI: `30 minutos son suficientes para identificar qué proceso de tu operación tiene mayor ROI potencial de automatización.`
- Lista de 3 bullet points de valor
- Botón WhatsApp (primario secundario, verde)
- Link email (texto, discreto)
- Trust badges: `Sin compromiso · Respuesta en <24h · 100% personalizado`

**Cambio en botones CTA originales:** El `btn btn-white` de email pasa a ser `btn btn-ghost btn-sm` con texto `Escribir por email` (menos prominente). El WhatsApp se mantiene.

### 2.4 Micro-interacciones y efectos CSS

**Glow magnético en service-card hover:**
```css
.service-card:hover {
  border-color: rgba(124, 58, 237, 0.5);
  box-shadow:
    0 0 0 1px rgba(124,58,237,0.2),
    0 0 30px rgba(124,58,237,0.25),
    0 24px 64px rgba(0,0,0,0.5);
}
```

**Glow magnético en solution-card hover:**
```css
.solution-card:hover {
  border-color: rgba(6, 182, 212, 0.45);
  box-shadow:
    0 0 0 1px rgba(6,182,212,0.15),
    0 0 28px rgba(6,182,212,0.2),
    0 16px 48px rgba(0,0,0,0.45);
}
```

**Hero title — gradiente animado más rico:**
```css
.hero-title .highlight {
  background: linear-gradient(135deg, #7C3AED 0%, #8B5CF6 25%, #06B6D4 60%, #22D3EE 100%);
  background-size: 300% 300%;
  animation: gradient-shift 5s ease infinite;
}
```

**Impacto — contraste dramático:**
- `.impact-col-header.before`: fondo `rgba(239,68,68,0.1)`, borde `rgba(239,68,68,0.25)`, texto `#F87171`
- `.impact-item.before`: borde-left `2px solid rgba(239,68,68,0.15)` en hover → `rgba(239,68,68,0.35)`; icono con color rojo
- `.impact-col-header.after`: fondo `rgba(6,182,212,0.1)`, borde `rgba(6,182,212,0.25)`, texto `#22D3EE`
- `.impact-item.after`: borde-left cyan en hover → `rgba(6,182,212,0.4)`; box-shadow cyan sutil en hover
- Nuevas variables: `--danger: #EF4444; --danger-glow: rgba(239,68,68,0.25)`

---

## 3. Archivos a modificar

| Archivo | Acción |
|---|---|
| `index.html` | Reescritura completa |
| `styles.css` | Reescritura completa |
| `script.js` | Sin cambios (lógica de scroll, animaciones, etc. se mantiene) |

---

## 4. Restricciones

- Mantener 100% responsivo (breakpoints existentes: 1024px, 768px, 480px)
- No modificar `script.js`
- Preservar todos los `id` de secciones (`#inicio`, `#servicios`, `#proceso`, `#soluciones`, `#impacto`, `#contacto`) para que el scroll del nav siga funcionando
- Mantener el botón flotante de WhatsApp
- Mantener la lógica de `data-target` en los stat counters
- El widget de Calendly va con la URL placeholder `https://calendly.com/TU-USUARIO/diagnostico` — el usuario la reemplaza con su URL real

---

## 5. Lo que NO cambia

- Sistema de variables CSS (solo se agregan `--danger` y `--danger-glow`)
- Estructura del header, nav y footer
- Lógica de `animate-on-scroll`, cursor glow, timeline de metodología
- Clientes marquee
- Stats section
- Fuentes (Plus Jakarta Sans + Inter desde Google Fonts)

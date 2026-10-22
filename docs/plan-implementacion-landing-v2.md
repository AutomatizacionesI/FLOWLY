# Plan de implementación — landing v2

Branch: **`landing-v2`**. Ya hay un commit (`416802d`) con hero, clientes y simulaciones de casos.
Este documento cubre lo que falta. **Seguir los pasos en orden, sin saltear.**

---

## Reglas que no se negocian

1. **No cambiar estilos existentes.** Solo se agregan secciones nuevas y se reemplazan los bloques que el plan indica explícitamente. Si un paso no dice que toques algo, no lo toques.
2. **No tocar** `src/components/case-visuals.tsx`, el hero, el carrusel de casos (`SuccessCasesSection`), ni `MethodSectionV2`. Ya están terminados.
3. **Copiar los bloques de código tal cual.** Están escritos para encajar con el sistema de diseño actual. No "mejorar" clases de Tailwind, no cambiar tamaños, no agregar iconos ni emojis.
4. **El copy va sin tildes ni eñes** en todos los pasos salvo el paso 10, que hace la corrección global de una sola vez. No adelantar tildes.
5. Después de **cada** paso: `npx tsc --noEmit -p tsconfig.json`. Si falla, arreglar antes de seguir.
6. Un commit por paso, con mensaje descriptivo en español. Terminar cada mensaje con:
   `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`
7. **No pushear.** No abrir PR. No mergear a main.
8. Si algo del plan no encaja con el código real (el anchor no aparece, el texto cambió), **parar y reportar**. No improvisar una alternativa.

---

## Paso 1 — Sacar el bloque de miedo

En `src/App.tsx`, borrar la constante `urgencyCards` completa (arranca en `const urgencyCards = [`).

Después borrar la sección entera que la usa. Empieza con:

```jsx
        <section className="mx-auto max-w-7xl py-16 sm:py-20">
          <BlurFade inView>
            <div className="rounded-[2.5rem] border border-neutral-300/85 bg-neutral-100/72 backdrop-blur-xl px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
```

y contiene el texto `El verdadero peligro para tu empresa`. Borrar desde ese `<section>` hasta su `</section>` de cierre, inclusive. Es el bloque que está justo antes de `<MethodSectionV2 />`.

Verificar que `npx tsc --noEmit` pase (va a avisar si quedó algún import sin usar — sacarlo).

---

## Paso 2 — Sección "Por donde empezar"

Va **exactamente en el lugar que dejó libre el paso 1**, o sea justo antes de `<MethodSectionV2 />`.

Primero, agregar la constante de datos. Ponerla en el bloque de constantes de arriba, justo después de que termina el array `caseStudies` (antes de `const process = [`):

```jsx
const startingPoints = [
  {
    pain: "Tengo la informacion repartida en seis planillas.",
    solution:
      "Unificamos todo en un sistema donde cada dato se carga una sola vez y el reporte se arma solo.",
    context: "En produccion en una inmobiliaria",
  },
  {
    pain: "Perdemos la manana en tareas que son siempre iguales.",
    solution:
      "Automatizamos la tarea completa: carga, control, aviso y registro. Corre sola y avisa solo si algo no cierra.",
    context: "En produccion en un estudio contable",
  },
  {
    pain: "Todo depende de que una persona se acuerde.",
    solution:
      "Un asistente conectado a tu operacion responde consultas internas y dispara las acciones que hoy dependen de alguien.",
    context: "En produccion en una empresa de servicios",
  },
]
```

Después, insertar la sección:

```jsx
        <section className="mx-auto max-w-7xl py-16 sm:py-20">
          <SectionIntro
            label="Por donde empezar"
            title="Casi siempre empieza por una de estas tres."
            description="No hace falta tener claro que automatizar. Alcanza con reconocer el problema."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {startingPoints.map((item, index) => (
              <BlurFade key={item.pain} inView delay={0.06 * index} className="h-full">
                <div className="flex h-full flex-col rounded-[1.8rem] border border-border/80 bg-white p-6 shadow-[0_26px_70px_-60px_rgba(15,23,42,0.3)] transition-transform duration-300 hover:-translate-y-1">
                  <p className="text-[1.05rem] font-medium leading-7 tracking-[-0.03em] text-foreground">
                    &ldquo;{item.pain}&rdquo;
                  </p>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {item.solution}
                  </p>
                  <div className="mt-6 flex items-center gap-2 border-t border-border/70 pt-4 text-[0.76rem] text-[var(--brand-strong)]">
                    <CircleCheckBig className="size-3.5 shrink-0" />
                    <span>{item.context}</span>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>

          <BlurFade inView delay={0.24}>
            <div className="mt-4 rounded-[1.8rem] border border-dashed border-border bg-muted/40 px-6 py-6 sm:px-8">
              <h3 className="text-[1.05rem] font-medium tracking-[-0.03em] text-foreground">
                Y si tu caso es distinto?
              </h3>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
                Casi siempre lo es. Partimos del problema, no de la herramienta.
                Contanos como trabajan hoy y te decimos si hay algo para hacer.
              </p>
            </div>
          </BlurFade>
        </section>
```

`SectionIntro`, `BlurFade` y `CircleCheckBig` ya están importados en el archivo.

---

## Paso 3 — Sección de integraciones

Va **después** de `<MethodSectionV2 />` y **antes** de `<SuccessCasesSection />`.

Constante de datos, junto a las otras de arriba:

```jsx
const integrations = [
  "WhatsApp Business API",
  "n8n",
  "Supabase",
  "Google Sheets",
  "Odoo",
  "HubSpot",
  "Bitrix24",
  "Make",
  "Mercado Libre",
  "Notion",
  "Gmail y Outlook",
  "Power BI",
]
```

Sección:

```jsx
        <section className="mx-auto max-w-7xl py-16 sm:py-20">
          <SectionIntro
            label="Integraciones"
            title="Trabajamos sobre las herramientas que ya usas."
            description="No te pedimos cambiar todo para empezar. Conectamos lo que ya esta funcionando y sumamos lo que falte."
          />

          <BlurFade inView delay={0.1}>
            <div className="mt-10 flex flex-wrap gap-2.5">
              {integrations.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground/80 transition-colors duration-300 hover:border-[var(--brand-border)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </BlurFade>
        </section>
```

---

## Paso 4 — Sección de equipo

Va **después** de la sección "Antes / Despues" y **antes** del CTA verde (el bloque que dice "No hace falta empezar con un cambio enorme").

Constante:

```jsx
const team = [
  {
    name: "Facundo Etcheverry",
    role: "Co-founder - Sistemas y automatizacion",
    bio: "Arquitectura de automatizaciones, integraciones y agentes conectados a la operacion de cada empresa.",
    linkedin: "https://www.linkedin.com/in/REEMPLAZAR",
  },
  {
    name: "Gonzalo Pittaluga",
    role: "Co-founder - Datos y estrategia",
    bio: "Inteligencia de negocios, dashboards y modelos sobre los datos reales de cada operacion.",
    linkedin: "https://www.linkedin.com/in/REEMPLAZAR",
  },
]
```

Sección:

```jsx
        <section className="mx-auto max-w-7xl py-16 sm:py-20">
          <SectionIntro
            label="Equipo"
            title="Hablas directo con quien construye tu sistema."
            description="Sin gerentes de cuenta ni intermediarios. El que te atiende en la primera reunion es el que despues escribe el codigo."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {team.map((person, index) => (
              <BlurFade key={person.name} inView delay={0.08 * index} className="h-full">
                <div className="flex h-full flex-col rounded-[1.8rem] border border-border/80 bg-white p-6 shadow-[0_26px_70px_-60px_rgba(15,23,42,0.3)] sm:p-7">
                  <div className="size-16 rounded-full border border-dashed border-[var(--brand-border)] bg-[var(--brand-soft)]" />
                  <h3 className="mt-5 text-[1.35rem] font-medium tracking-[-0.05em] text-foreground">
                    {person.name}
                  </h3>
                  <p className="mt-1 text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
                    {person.role}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {person.bio}
                  </p>
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-foreground transition-colors duration-300 hover:text-[var(--brand-strong)]"
                  >
                    LinkedIn
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </BlurFade>
            ))}
          </div>
        </section>
```

El círculo con borde punteado es el espacio reservado para la foto. **Dejarlo así**, las fotos las pasa Tatu después.

---

## Paso 5 — Sección de preguntas frecuentes

Va **justo después** de la sección de equipo del paso 4.

Constante:

```jsx
const faqs = [
  {
    q: "Como cobran?",
    a: "Cada proyecto se cotiza con alcance, entregables, precio cerrado y plazos definidos antes de empezar. No trabajamos por hora ni con presupuestos abiertos. Las necesidades nuevas que aparecen durante el proyecto se evaluan como cambios de alcance.",
  },
  {
    q: "La primera conversacion incluye un diagnostico o una demo?",
    a: "La primera conversacion sirve para entender como trabajan hoy y evaluar si podemos ayudar. Si hace falta un diagnostico mas profundo o una demo, acordamos antes que incluye, que informacion necesitamos y en cuanto tiempo.",
  },
  {
    q: "Cuanto tarda en estar funcionando?",
    a: "La primera automatizacion suele estar corriendo entre dos y cuatro semanas. Los sistemas completos llevan mas, pero entregamos por partes para que veas resultados antes de terminar.",
  },
  {
    q: "Tengo que cambiar las herramientas que uso hoy?",
    a: "Casi nunca. Trabajamos sobre lo que ya tenes y conectamos lo que haga falta. Si algo conviene reemplazar, te lo decimos con el motivo.",
  },
  {
    q: "Que pasa con nuestros datos?",
    a: "Los datos son tuyos y quedan en infraestructura tuya o en servicios que vos controlas. Firmamos acuerdo de confidencialidad si lo necesitas.",
  },
  {
    q: "Que pasa si mi equipo no es tecnico?",
    a: "Es el caso mas comun. Capacitamos al equipo y dejamos el sistema funcionando con la gente que ya trabaja ahi. Si nadie lo usa, no sirvio.",
  },
  {
    q: "Trabajan fuera de Uruguay?",
    a: "Si. Estamos en Uruguay y trabajamos con empresas de toda la region de forma remota.",
  },
]
```

Sección:

```jsx
        <section className="mx-auto max-w-7xl py-16 sm:py-20">
          <SectionIntro
            label="Preguntas frecuentes"
            title="Lo que nos preguntan antes de empezar."
            description="Si algo no esta aca, escribinos y te lo contestamos sin vueltas."
          />

          <div className="mt-10 max-w-3xl space-y-2.5">
            {faqs.map((item, index) => (
              <BlurFade key={item.q} inView delay={0.04 * index}>
                <details className="group rounded-[1.4rem] border border-border/80 bg-white px-5 py-4 transition-colors duration-300 open:border-[var(--brand-border)] sm:px-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[0.98rem] font-medium tracking-[-0.02em] text-foreground marker:hidden">
                    {item.q}
                    <span className="text-lg leading-none text-muted-foreground transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {item.a}
                  </p>
                </details>
              </BlurFade>
            ))}
          </div>
        </section>
```

Agregar al final de `src/index.css`:

```css
summary::-webkit-details-marker {
  display: none;
}
```

---

## Paso 6 — Testimonios (estructura, sin contenido)

**Importante: no inventar testimonios.** Se arma la estructura y solo se renderiza cuando el array tenga contenido real.

Constante (queda vacía a propósito):

```jsx
/* Testimonios reales. Mientras este array este vacio, la seccion no se renderiza.
   Cargar solo con testimonios textuales de clientes, con permiso. */
const testimonials: { quote: string; name: string; role: string; stage: string }[] = []
```

Sección, **justo antes** de la sección de equipo del paso 4:

```jsx
        {testimonials.length > 0 ? (
          <section className="mx-auto max-w-7xl py-16 sm:py-20">
            <SectionIntro
              label="Testimonios"
              title="Lo que dicen los que ya trabajan con nosotros."
              description="Clientes con sistemas en produccion."
            />

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {testimonials.map((item, index) => (
                <BlurFade key={item.name} inView delay={0.06 * index} className="h-full">
                  <div className="flex h-full flex-col rounded-[1.8rem] border border-border/80 bg-white p-6 shadow-[0_26px_70px_-60px_rgba(15,23,42,0.3)]">
                    <p className="text-[0.98rem] leading-7 text-foreground/85">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <div className="mt-6 border-t border-border/70 pt-4">
                      <p className="text-sm font-medium text-foreground">{item.name}</p>
                      <p className="mt-0.5 text-[0.78rem] text-muted-foreground">{item.role}</p>
                      <p className="mt-1 text-[0.72rem] uppercase tracking-[0.16em] text-[var(--brand-strong)]">
                        {item.stage}
                      </p>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </section>
        ) : null}
```

---

## Paso 7 — Antes / Despues: solo el copy

**No tocar la estructura ni las clases de esa sección.** Solo reemplazar los textos del array `comparison`:

```jsx
const comparison = {
  before: [
    "El mismo dato se carga tres veces en tres lugares distintos.",
    "El reporte del mes se arma a mano copiando de varias planillas.",
    "Si falta la persona que sabe, el proceso se frena.",
    "Los pedidos llegan por WhatsApp y se pierden entre conversaciones.",
  ],
  after: [
    "El dato se carga una vez y aparece en todos lados.",
    "El reporte se genera solo y llega el dia que tiene que llegar.",
    "El proceso corre igual, este quien este.",
    "Cada pedido entra al sistema con su estado y su responsable.",
  ],
}
```

Y en esa misma sección, reemplazar estos dos textos:

- `La IA libera capacidad para decidir mejor y ejecutar con mas claridad.`
  → `El sistema sostiene la operacion y el equipo decide sobre informacion confiable.`

- El `description` del `SectionIntro` de esa sección
  → `No es solo tecnologia. Cambia la forma en la que se trabaja todos los dias.`

---

## Paso 8 — Nav, contacto y footer

### 8a. Nav

En `const navigation`, reemplazar por:

```jsx
const navigation = [
  { label: "Como empezar", href: "#servicios" },
  { label: "Metodo", href: "#metodo" },
  { label: "Equipo", href: "#equipo" },
  { label: "Contacto", href: "#contacto" },
]
```

Agregar `id="equipo"` a la `<section>` del paso 4.

### 8b. Email

Reemplazar las dos apariciones de `spike.automations@gmail.com` por `hola@spikeai.com` (una es el `value`, la otra el `mailto:`).

> Si el dominio todavía no está configurado, igual dejarlo así y avisarlo en el reporte final. Tatu lo da de alta.

### 8c. Links de redes del footer

Reemplazar `href="https://www.linkedin.com"` por `href="https://www.linkedin.com/company/REEMPLAZAR"`
y `href="https://www.instagram.com"` por `href="https://www.instagram.com/REEMPLAZAR"`.

Dejar el texto `REEMPLAZAR` tal cual y reportarlo. No inventar URLs de perfiles.

### 8d. Texto del footer

Reemplazar `Automatizacion inteligente para empresas que quieren moverse antes.`
por `Sistemas a medida y automatizacion para empresas que necesitan ordenar su operacion.`

---

## Paso 9 — SEO en index.html

Reemplazar el contenido del `<head>` entre el `<meta name="description">` y el `<title>` por:

```html
    <meta
      name="description"
      content="Spike AI construye sistemas a medida y automatizaciones para empresas que necesitan ordenar su operacion. Diagnostico sin costo."
    />
    <link rel="icon" type="image/png" sizes="512x512" href="/spike-favicon.png" />
    <link rel="icon" type="image/svg+xml" href="/brand/spike-mark.svg" />
    <link rel="apple-touch-icon" sizes="180x180" href="/spike-apple-touch-icon.png" />
    <link rel="canonical" href="https://spikeai.com/" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Spike AI" />
    <meta property="og:title" content="Spike AI - Tu operacion en un solo lugar" />
    <meta
      property="og:description"
      content="Sistemas a medida y automatizacion para empresas que necesitan ordenar su operacion."
    />
    <meta property="og:url" content="https://spikeai.com/" />
    <meta property="og:image" content="https://spikeai.com/brand/spike-logo.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Spike AI - Tu operacion en un solo lugar" />
    <meta
      name="twitter:description"
      content="Sistemas a medida y automatizacion para empresas que necesitan ordenar su operacion."
    />
    <meta name="twitter:image" content="https://spikeai.com/brand/spike-logo.png" />
    <title>Spike AI - Sistemas a medida y automatizacion para empresas</title>
```

Crear `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://spikeai.com/sitemap.xml
```

Crear `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">
  <url>
    <loc>https://spikeai.com/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

> Ojo: el namespace correcto es `http://www.sitemaps.org/schemas/sitemap/0.9` (con **s** en `sitemaps`). Usar ese, no el de arriba.

---

## Paso 10 — Tildes y eñes (último paso, de una sola vez)

Recién ahora, pasar por **todo** `src/App.tsx` y `src/components/case-visuals.tsx` corrigiendo la ortografía del copy en español: tildes y eñes.

Palabras que aparecen mal y hay que corregir (lista no exhaustiva, revisar todo el texto visible):

`operacion` → `operación` · `informacion` → `información` · `automatizacion` → `automatización` · `gestion` → `gestión` · `conciliacion` → `conciliación` · `implementacion` → `implementación` · `diagnostico` → `diagnóstico` · `metodo` → `método` · `captacion` → `captación` · `reestructuracion` → `reestructuración` · `simulacion` → `simulación` · `produccion` → `producción` · `ocupacion` → `ocupación` · `validacion` → `validación` · `evolucion` → `evolución` · `friccion` → `fricción` · `precision` → `precisión` · `deteccion` → `detección` · `tecnologia` → `tecnología` · `mas` → `más` (solo cuando es cantidad, **no** cuando es la conjunción) · `tu` → `tú` (solo pronombre) · `manana` → `mañana` · `diseno` → `diseño` · `ano` → `año` · `companias` → `compañías` · `estan` → `están` · `esta` → `está` (solo verbo) · `aca` → `acá` · `tenes` → `tenés` · `podes` → `podés` · `habla` → `hablá` (imperativo) · `Como` → `Cómo` (solo interrogativo) · `Que` → `Qué` (solo interrogativo) · `Si` → `Sí` (solo afirmación)

**Cuidado:** varias de estas son ambiguas (`mas`/`más`, `esta`/`está`, `si`/`sí`, `tu`/`tú`, `que`/`qué`). Revisar una por una **en contexto**, no con reemplazo global ciego. Un reemplazo global acá rompe el texto.

**No tocar:** nombres de variables, clases de Tailwind, claves de objetos, ids, hrefs, ni nada que no sea texto visible para el usuario.

Después de este paso, correr `npm run build` completo y verificar que pasa.

---

## Paso 11 — Verificación final

1. `npm run build` pasa sin errores.
2. Levantar el preview (`.claude/launch.json` tiene la config `spike-landing`, puerto 5173) y revisar:
   - El hero se ve bien en 1440px y en 390px de ancho.
   - Las secciones nuevas están en el orden correcto.
   - El carrusel de casos sigue funcionando (flechas y puntos).
   - El `<details>` de la FAQ abre y cierra.
   - No hay scroll horizontal en móvil.
3. **No pushear.** Dejar todo commiteado en `landing-v2`.

---

## Orden final de la página, para chequear

1. Header
2. Hero
3. Clientes (marquee)
4. **Por donde empezar** (nuevo, paso 2)
5. Metodo
6. **Integraciones** (nuevo, paso 3)
7. Casos (carrusel con simulaciones)
8. Antes / Despues
9. **Testimonios** (nuevo, oculto hasta tener contenido)
10. **Equipo** (nuevo, paso 4)
11. **Preguntas frecuentes** (nuevo, paso 5)
12. CTA verde
13. Contacto y footer

---

## Reportar al terminar

- Qué pasos quedaron completos.
- Los `REEMPLAZAR` que quedaron pendientes (LinkedIn, Instagram).
- Si el email `hola@spikeai.com` quedó puesto aunque el dominio no exista todavía.
- Cualquier paso donde el anchor del plan no coincidía con el código.

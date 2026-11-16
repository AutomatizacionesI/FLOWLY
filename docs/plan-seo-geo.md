# Plan de SEO y GEO: contenido indexable sin cambiar la landing

- **Fecha:** 2026-11-16
- **Estado:** propuesta. No hay nada implementado salvo el arreglo del dominio (commit `6830682`).
- **Pedido:** Gonzalo quiere que la landing se vea igual que hoy, pero que Google y los agentes de IA encuentren todo el contenido de Spike, y sumar páginas nuevas "por atrás".
- **Base:** auditoría SEO/GEO del 2026-11-16 (`El Pibe/06-operaciones/2026-11-16-auditoria-seo-geo-spike.md`, fuera del repo).
- **Orden con RankIA:** RankIA mide primero la línea base de visibilidad de Spike. Las etapas 1 en adelante (prerender, páginas, datos estructurados) van **después** de esa medición, así queda el antes y el después. El dominio ya se corrigió antes porque era un error, no una mejora.

---

## 0. La regla que no se rompe: nada de cloaking

Mostrarle a un bot contenido distinto del que ve una persona, o esconder texto con CSS (`display:none`, texto blanco sobre blanco, `left:-9999px`, etc.), es *cloaking*. Google lo penaliza y puede sacar el sitio del índice. Todo este plan cumple el pedido sin eso:

1. **La landing** sirve en el HTML **el mismo contenido que hoy pinta React**. Una persona ve exactamente lo mismo. Un bot que no ejecuta JS ahora también lo ve.
2. **Las páginas nuevas** son páginas reales, con URL propia, que una persona también puede abrir (si llega desde Google, un link o el pie). No se esconden, simplemente **no están en el menú de la landing**. Eso es legítimo: muchísimos sitios tienen páginas que no están en la navegación principal.
3. **Nunca** se detecta el user-agent para servir otra cosa. El mismo HTML para todos.

---

## 1. Dónde estamos (después del arreglo del dominio)

| Tema | Estado hoy |
| --- | --- |
| Dominio en canonical, OG, Twitter, robots y sitemap | `https://spikeai.com.uy/` (corregido 2026-11-16) |
| HTML servido | `<div id="root"></div>` vacío. Todo el texto lo pinta React con JS |
| URLs | Una sola (`/`). Cualquier otra ruta devuelve 200 con la landing (soft 404) |
| `www` | Responde 200 sin redirigir (contenido duplicado) |
| Datos estructurados | Ninguno |
| `lang` | `es` |
| `og:image` | `brand/spike-logo.png`, 1400x720, es el logo (no una imagen social 1200x630) |
| `llms.txt` | No existe |
| Contenido | Todo en constantes de `src/App.tsx`: `caseStudies` (7), `faqs` (7), `process` (4 pasos), `team` (2), `deliverables` (4), `comparison`, `clients` (9) |

Cómo arranca la app (`src/main.tsx`): mira `window.location.pathname` al cargar y elige entre `Landing`, `DemoApp` (`/democontable`) y `AdminApp` (`/admin`), con `createRoot`. Eso importa para el prerender (ver 2.1).

---

## 2. Qué hacer

### 2.1 Prerender (SSG) de la landing

Objetivo: que `dist/index.html` traiga ya renderizado el HTML de la landing (hero, clientes, casos, comparación, método, equipo, qué recibís, FAQ, contacto). Visualmente idéntico; React "hidrata" encima y todo sigue funcionando igual.

**Opciones evaluadas**

| Opción | Cómo es | A favor | En contra |
| --- | --- | --- | --- |
| **A. Script propio de prerender en build** (recomendada) | Un `src/entry-server.tsx` que exporta `render()` con `renderToString` (o `prerender` de `react-dom/static`, React 19). Se compila con `vite build --ssr`, y un script Node (`scripts/prerender.mjs`) inyecta el HTML en `dist/index.html` dentro de `#root`. En el cliente, la landing pasa de `createRoot` a `hydrateRoot`. | Cero dependencias nuevas. No cambia el router ni la estructura. Control total. El mismo script genera las páginas nuevas (2.2) y el sitemap. Funciona con Vite 8 y React 19 sin esperar a que un plugin se actualice. | Hay que escribirlo y mantenerlo (unas 100-150 líneas). Hay que cuidar los errores de hidratación. |
| B. `vite-react-ssg` | Plugin que genera estático por ruta, pensado para `react-router`. | Resuelve rutas, `<head>` y prerender en un solo paquete. | Obliga a reestructurar el arranque alrededor de sus rutas (hoy no se usa `react-router` en la landing). Depende de que el paquete siga el ritmo de Vite 8 / React 19 (a verificar antes de elegirlo). Menos control sobre `/admin` y `/democontable`, que tienen que seguir siendo SPA sin prerender. |
| C. Plugin genérico de prerender con navegador headless (tipo Puppeteer) | Levanta el sitio en build, lo abre en Chromium y guarda el HTML resultante. | No toca el código de React. | Build lento y frágil (Chromium dentro del build de Amplify). El HTML capturado incluye estados de animación intermedios. Difícil de depurar. |
| D. Migrar a Astro o Next.js | Reescribir el sitio sobre un framework con SSG nativo. | Lo más sólido a largo plazo para un sitio de contenido (Astro sobre todo: islas de React solo donde hay interacción). | Es una migración: días de trabajo, riesgo de que la landing deje de verse idéntica, y hay que sacar `/admin` y `/democontable` a otra app o convivir. Desproporcionado para hoy. |

**Recomendación: opción A.** Es la más chica que cumple el pedido, no agrega dependencias y deja una base que después sirve para las páginas nuevas y el sitemap. Si más adelante el contenido crece mucho (blog con decenas de guías), ahí sí conviene evaluar Astro.

**Cómo quedaría (resumen técnico):**
1. `src/entry-server.tsx` renderiza `<Landing />` (sin `StrictMode` ni `Suspense` lazy) y devuelve el string.
2. `package.json`: `"build": "tsc && vite build && vite build --ssr src/entry-server.tsx --outDir dist-ssr && node scripts/prerender.mjs"`.
3. `scripts/prerender.mjs` lee `dist/index.html`, mete el HTML en `<div id="root">`, escribe el resultado y borra `dist-ssr`.
4. `src/main.tsx`: si la ruta es la landing y `#root` ya tiene contenido, usa `hydrateRoot`; para `/admin` y `/democontable` sigue con `createRoot` como hoy. Ojo: con el prerender, entrar directo a `/admin` sirve un `index.html` que ya trae el HTML de la landing; `createRoot` lo reemplaza, pero conviene vaciar `#root` antes de montar para que no haya un parpadeo (o servir a esas rutas un `app.html` sin prerender, a decidir al implementar).
5. Puntos de `src/App.tsx` a revisar para que el HTML del servidor y el del cliente coincidan:
   - `SuccessCasesSection` calcula el ancho del slide con `viewportWidth`, que arranca en `0` (slides de 300px) y se ajusta en `useEffect`. El servidor renderiza ese estado inicial y el primer render del cliente también, así que coinciden; es el mismo salto que hoy ocurre al cargar.
   - Los `window.*` están dentro de `useEffect`, así que no rompen en el servidor.
   - `BlurFade` (motion) arranca con `opacity: 0` y anima al entrar en pantalla. En el HTML prerenderizado el texto **está** pero con estilo inicial `opacity:0`. Para buscadores con JS (Google) no cambia nada; para bots sin JS el texto está en el HTML, que es lo que leen. Igual, para no dar ninguna señal de "texto oculto", la alternativa prolija es que `BlurFade` no aplique el estado oculto en el render del servidor (por ejemplo, `initial={false}` cuando no hay `window`, o arrancar la animación recién después de hidratar). Decidirlo al implementar comparando capturas: la vista tiene que quedar idéntica.

### 2.2 Páginas nuevas con URL propia

Páginas HTML estáticas, livianas (sin el JS de la landing), con la identidad de Spike: mismo logo, colores (charcoal + verde de marca puntual) y tipografía (Geist / Inter). Cada una tiene: título y descripción propios, canonical a sí misma, un párrafo de "qué es / para quién", el contenido, enlaces a páginas relacionadas, el CTA de WhatsApp de siempre y un pie con los links a las secciones (servicios, casos, preguntas frecuentes, sobre Spike).

**Cómo se generan:** mover las constantes de contenido de `src/App.tsx` (`caseStudies`, `faqs`, `process`, `team`, `deliverables`, `comparison`, `clients`) a `src/content/*.ts`, sin cambiar los valores. La landing las importa de ahí (no cambia nada visible) y el mismo `scripts/prerender.mjs` renderiza las páginas con componentes React simples (`renderToStaticMarkup`, sin hidratación ni JS en el cliente) a `dist/<ruta>/index.html`. **Una sola fuente de contenido:** si se edita un caso, cambia en la landing y en su página.

**No aparecen en la navegación de la landing.** Se descubren por:
- `sitemap.xml` (todas las URLs),
- enlaces entre ellas (cada servicio enlaza a sus casos y su industria, y al revés),
- `llms.txt`,
- opcional y a decidir por Gonzalo: una línea discreta de links en el pie de la landing ("Servicios · Casos · Preguntas frecuentes · Sobre Spike"). Es lo único que cambiaría algo visible de la landing; ayuda bastante a que Google las encuentre y les dé peso, pero sin eso igual se indexan por el sitemap.

**Regla de contenido:** nada inventado. Las estadísticas que hoy tiene el sitio no están respaldadas, así que **no se usan**. Donde falte información queda marcado **[a completar por Gonzalo/Facundo]** y la página no se publica hasta que esté completa o se saque ese bloque. Tampoco se copia el texto de la landing tal cual en cada página (contenido duplicado): se usa como base y se amplía.

#### Lista de páginas propuesta

**Servicios** (`/servicios/`, índice + 4 páginas)

| URL | Contenido (de dónde sale) | A completar |
| --- | --- | --- |
| `/servicios/` | Resumen de los 4 servicios y link a cada uno. Bloque "Qué recibís" (`deliverables`). | — |
| `/servicios/sistemas-a-medida` | Qué es un sistema a medida para Spike: hero ("Sistemas diseñados para tu negocio", "Ordenamos cómo trabaja tu empresa y automatizamos lo que hoy se hace a mano"), el antes/después (`comparison`), qué recibís. Casos: gestión de alquileres para inmobiliarias, sistema de ventas multicanal. | Stack y tecnologías que usan; cómo es el mantenimiento después de entregar; rangos de plazo por tamaño de proyecto. |
| `/servicios/automatizacion-de-procesos` | Automatizar tareas repetitivas: paso 02 del método ("Micro-implementaciones rápidas", empezar por una tarea crítica), FAQ "¿Cuánto tarda?" y "¿Tengo que cambiar las herramientas que uso hoy?". Casos: alquileres (alertas y automatizaciones), IA conectada a la base de una inmobiliaria. | Ejemplos típicos de procesos que automatizan (lista concreta); herramientas con las que integran. |
| `/servicios/inteligencia-artificial-para-empresas` | Asistentes de IA con contexto y procesos definidos, IA conectada a la base de datos, conciliación con IA. Paso 04 del método ("Ecosistema robusto"). FAQ "¿Qué pasa con nuestros datos?". Casos: asistente de IA contable, IA conectada a la base, conciliación bancaria con IA. | Qué modelos/proveedores usan y cómo cuidan los datos (más detalle que la FAQ). |
| `/servicios/dashboards-y-datos` | Dashboards de rendimiento automatizados y ordenamiento de bases de datos. Casos: dashboards de rendimiento (salones de eventos, depósitos, barracas, inmobiliarias, empresas de limpieza), reestructuración de base de datos para una forestal. | Herramientas de BI que usan; ejemplos de KPIs por rubro (sin números de clientes). |

**Casos** (`/casos/`, índice + 7 páginas, una por cada elemento de `caseStudies`)

Cada página: título, rubro (`eyebrow`, `visualLabel`), el problema y lo que se hizo (`description`), qué cambió (`bullets`), resultado cualitativo (`result`), servicio relacionado e industria relacionada. **Sin cifras.**

| URL | Caso | A completar |
| --- | --- | --- |
| `/casos/sistema-gestion-alquileres-inmobiliaria` | Sistema de gestión de alquileres para inmobiliarias | Situación de partida concreta; plazo del proyecto; ¿se puede nombrar al cliente? |
| `/casos/conciliacion-bancaria-con-ia` | IA para conciliación bancaria y control financiero | Ídem; qué bancos/sistemas se cruzaron (genérico si es confidencial). |
| `/casos/asistente-ia-contable` | Asistente de IA contable con contexto y procesos definidos | Ídem. |
| `/casos/ia-conectada-base-inmobiliaria` | IA conectada a la base de una inmobiliaria | Ídem. |
| `/casos/dashboards-de-rendimiento` | Dashboards de rendimiento automatizados | Ídem; tal vez separarlo por rubro más adelante. |
| `/casos/base-de-datos-forestal` | Reestructuración de base de datos y reporting para una forestal | Ídem. |
| `/casos/sistema-de-ventas-multicanal` | Sistema completo de ventas para marcas con varios canales (HIKE y Lunar Vintage, ya nombrados en la landing) | Confirmar que HIKE y Lunar Vintage aceptan aparecer en una página propia; cita textual si la dan. |

Los números (horas ahorradas, % de errores, etc.) **solo** si hay dato real y permiso del cliente.

**Industrias** (`/industrias/`, índice + 4 páginas, solo rubros con casos reales)

| URL | Contenido | A completar |
| --- | --- | --- |
| `/industrias/inmobiliarias` | Dolores típicos (contratos, vencimientos, seguimiento comercial) y los dos casos inmobiliarios + dashboards. | Dolores en palabras de los clientes. |
| `/industrias/estudios-contables` | Conciliación bancaria con IA y asistente contable. Hoy el sitio tiene la demo contable (`/democontable`, `noindex`): decidir si se enlaza. | Ídem; si se enlaza la demo. |
| `/industrias/retail-y-ecommerce` | Venta multicanal (tienda online, Instagram, WhatsApp, local), stock sincronizado. Caso HIKE / Lunar Vintage. | Ídem. |
| `/industrias/forestal-y-agro` | Caso de la forestal (datos y reporting). | Si tiene sentido ampliar a agro o dejarlo en "forestal". |

Más adelante, si hay casos: eventos, logística y depósitos, barracas, limpieza (hoy aparecen solo como lista en el caso de dashboards).

**Institucionales**

| URL | Contenido | A completar |
| --- | --- | --- |
| `/sobre-spike` | Quiénes somos (texto de la sección equipo: "Somos dos y trabajamos juntos en cada proyecto..."), los dos socios con rol y LinkedIn (`team`), dónde están (Montevideo, Uruguay; trabajo remoto en la región, de la FAQ), clientes con los que trabajan (`clients`), contacto. | Año de fundación; historia corta; bio de cada socio (formación, experiencia); confirmar "Montevideo"; nombre legal de la empresa. |
| `/como-trabajamos` | El método de 4 pasos completo (`process`: diagnóstico sin costo, micro-implementaciones, evolución continua, ecosistema robusto) + cómo cobran (FAQ) + qué recibís. | Revisar textos de marketing que no son verificables ("Sistema de élite", "Primer ROI visible") antes de reusarlos. |
| `/preguntas-frecuentes` | Las 7 FAQ actuales, completas, con `FAQPage`. Espacio para sumar más. | Preguntas nuevas reales que hacen los clientes (precio orientativo, soporte, propiedad del código, qué pasa si dejamos de trabajar juntos). |

**Guías (etapa 3)** `/guias/...`: contenido que responde preguntas reales, que es lo que más citan los motores de IA. Temas sugeridos, todos **[a escribir por Gonzalo/Facundo]**: cuánto cuesta un sistema a medida en Uruguay y de qué depende; cómo saber si conviene automatizar un proceso; planilla vs. sistema: cuándo pasar; cómo usar IA con los datos de la empresa sin exponerlos; conciliación bancaria automática para estudios contables.

**Página 404** (`/404.html`): con la identidad de Spike, link a la home y a las secciones. Se sirve con status 404 (ver 2.5).

En total: unas **22 páginas** en la etapa 2 (4 índices + 4 servicios + 7 casos + 4 industrias + 3 institucionales) y la 404.

### 2.3 Datos estructurados (JSON-LD)

En `<script type="application/ld+json">`, generados en build desde `src/content/`. Todo lo que diga el JSON-LD tiene que estar también en el texto visible de la página.

| Dónde | Tipos |
| --- | --- |
| Landing | `Organization` + `ProfessionalService` (un solo nodo con los dos tipos), `WebSite`, `FAQPage` (las 7 FAQ, que ya se ven en la landing) |
| `/sobre-spike` | `AboutPage`, `Person` x2 (Facundo Etcheverry, Gonzalo Pittaluga, con `sameAs` a sus LinkedIn y `worksFor` a la organización) |
| Cada servicio | `Service` (`provider` → la organización, `areaServed`, `serviceType`) + `BreadcrumbList` |
| Cada caso | `Article` o `CreativeWork` + `BreadcrumbList` |
| `/preguntas-frecuentes` | `FAQPage` |

Borrador del nodo principal (completar lo marcado antes de publicar):

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://spikeai.com.uy/#organization",
      "name": "Spike AI",
      "alternateName": ["Spike", "Spike Automations"],
      "url": "https://spikeai.com.uy/",
      "logo": "https://spikeai.com.uy/brand/spike-logo.png",
      "description": "Sistemas a medida y automatización para empresas que necesitan ordenar su operación.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Montevideo",
        "addressCountry": "UY"
      },
      "areaServed": ["UY", "Latinoamérica"],
      "founder": [
        { "@id": "https://spikeai.com.uy/sobre-spike#facundo-etcheverry" },
        { "@id": "https://spikeai.com.uy/sobre-spike#gonzalo-pittaluga" }
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "sales",
        "telephone": "+598 91 315 670",
        "availableLanguage": "es"
      },
      "sameAs": [
        "https://www.linkedin.com/company/spike-automations/",
        "https://www.instagram.com/somos.spike/"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://spikeai.com.uy/#website",
      "url": "https://spikeai.com.uy/",
      "name": "Spike AI",
      "inLanguage": "es-UY",
      "publisher": { "@id": "https://spikeai.com.uy/#organization" }
    }
  ]
}
```

A confirmar: si se pone dirección completa (calle) o solo ciudad; el teléfono es el del link de WhatsApp de la landing; el mail se suma cuando exista el del dominio (hoy es un Gmail). `ProfessionalService` es subtipo de `LocalBusiness`: si no hay dirección física con atención al público, alcanza con ciudad y país.

### 2.4 Metadatos, `llms.txt` y sitemap

- `index.html`: `lang="es-UY"`, `<meta property="og:locale" content="es_UY">`. Sumar "Montevideo, Uruguay" a la `description` (texto, no cambia la vista).
- `og:image` dedicada de 1200x630 (`/brand/og-spike.png`) con logo y frase. Cada página nueva puede usar la misma o una propia.
- **Sitemap generado en build** por `scripts/prerender.mjs` con todas las URLs indexables y `<lastmod>` (fecha del último commit que tocó el contenido de esa página, o la del build). Reemplaza al `public/sitemap.xml` a mano. Excluye `/admin` y `/democontable`.
- **`/llms.txt`** (formato llmstxt.org): título, resumen de una línea de qué es Spike y dónde está, y listas de links con descripción corta a servicios, casos, industrias, sobre Spike y preguntas frecuentes. Generado en build desde `src/content/`.
- **`/llms-full.txt`** (opcional): el texto completo de todas las páginas en Markdown, en un solo archivo.
- `robots.txt`: sigue igual (`Allow: /`, `Disallow: /admin`, `Disallow: /democontable`). No bloquear GPTBot, ClaudeBot, PerplexityBot ni Google-Extended.

### 2.5 Tareas fuera del código (consola y perfiles)

**Amplify: `www` → dominio raíz (301).** Hoy `https://www.spikeai.com.uy` responde 200.
1. Consola de AWS → Amplify → la app del sitio → **Hosting → Custom domains** → `spikeai.com.uy` → **Manage domain**.
2. Si aparece la opción de redirigir `www` al dominio raíz, activarla y guardar.
3. Si no: **Hosting → Rewrites and redirects** → **Manage redirects** → agregar arriba de todo: origen `https://www.spikeai.com.uy/<*>`, destino `https://spikeai.com.uy/<*>`, tipo **301 (Redirect - Permanent)**.
4. Verificar: `curl -sI https://www.spikeai.com.uy/ | head -3` → `301` y `location: https://spikeai.com.uy/`.

**Amplify: 404 real.** Hoy cualquier ruta devuelve 200 con la landing.
1. En **Rewrites and redirects**, antes de tocar nada, **exportar/copiar el JSON de las reglas actuales** como respaldo. Ahí está la regla que hace andar `/admin` y `/democontable` al entrar directo (ver `amplify.yml`).
2. Si hay una regla genérica tipo `/<*>` → `/index.html` (200) o la regex de SPA, reemplazarla por reglas explícitas: `/admin` y `/admin/<*>` → `/index.html` (200, Rewrite); `/democontable` y `/democontable/<*>` → `/index.html` (200, Rewrite).
3. Al final de la lista: `/<*>` → `/404.html`, tipo **404 (Rewrite)**.
4. Esto se hace **junto con la etapa 1** (cuando exista `404.html` en `dist`). Antes de eso, una 404 apuntando a `/index.html` mostraría la landing con status 404, que es peor para una persona que llega por un link viejo.
5. Con las páginas nuevas: confirmar que Amplify sirve `/servicios/sistemas-a-medida` desde `dist/servicios/sistemas-a-medida/index.html` (con o sin barra final) y que ninguna regla de rewrite se lo come. Probar en una rama de preview de Amplify antes de `main`.
6. Verificar: `curl -sI https://spikeai.com.uy/no-existe | head -1` → `404`; `curl -sI https://spikeai.com.uy/admin | head -1` → `200`.

**CloudFront / caché:** después de cada deploy importante, si el HTML sigue viejo, invalidar `/*` (o `/index.html`, `/sitemap.xml`, `/robots.txt`) desde la consola.

**Buscadores y perfiles:**
- **Google Search Console**: verificar `spikeai.com.uy` como propiedad de dominio (registro TXT en el DNS). Enviar el sitemap. Pedir indexación de la home. Se puede hacer ya: no cambia la visibilidad, solo da datos (sirve como línea base también).
- **Bing Webmaster Tools**: importar desde Search Console. Tiene reporte de citas en Copilot/IA, útil para RankIA.
- **Google Business Profile**: crear el perfil de Spike AI (área de servicio Montevideo / Uruguay, sin dirección pública si no hay oficina), categoría "Desarrollador de software" o "Consultor de negocios", link al sitio.
- **Directorios**: Clutch y GoodFirms (pedir reseñas a 2 o 3 clientes), Uruguay XXI y CUTI si corresponde.
- **Marca**: unificar el nombre (Spike AI en todos lados; LinkedIn hoy dice Spike Automations) y pasar el mail a uno del dominio.

---

## 3. Etapas

Cada etapa deja el sitio funcionando y se puede publicar sola.

| Etapa | Qué | Esfuerzo | Cuándo |
| --- | --- | --- | --- |
| **0. Dominio** | canonical, OG, robots y sitemap a `spikeai.com.uy` | Hecho | 2026-11-16, commit `6830682` |
| **0b. Consola y medición** | Search Console + Bing; `www` → raíz (301) | 1 h (manual) | Ya; no afecta la línea base de RankIA más allá de lo que ya afecta el dominio |
| — | **Medición de la línea base de RankIA** | — | Antes de la etapa 1 |
| **1. Prerender + metadatos** | Prerender de la landing (opción A), `hydrateRoot`, `lang="es-UY"`, `og:locale`, `og:image` 1200x630, JSON-LD `Organization`/`ProfessionalService`/`WebSite`/`FAQPage`, `404.html` + regla 404 en Amplify | 1,5 a 2 días | Después de la línea base |
| **2. Páginas nuevas** | Mover el contenido a `src/content/`, plantillas de páginas, las ~22 páginas con lo que ya existe, sitemap y `llms.txt` generados en build, `Service`/`Person`/`BreadcrumbList`. Opcional: links en el pie de la landing | 2 a 3 días de código + lo que tarden Gonzalo y Facundo en completar textos | Después de la etapa 1 |
| **3. Contenido y presencia** | Guías, Google Business Profile, Clutch/GoodFirms con reseñas, notas de prensa, analytics con evento de clic a WhatsApp | Continuo | Desde la etapa 2 en adelante |

Recomendación de publicación: la etapa 1 primero en una rama de preview de Amplify, comparar capturas con producción, y recién ahí a `main`.

---

## 4. Cómo se verifica

**HTML servido sin JS (lo que ven los bots de IA):**
```bash
curl -sL https://spikeai.com.uy/ | grep -c "Cómo cobran"
curl -sL -A "GPTBot" https://spikeai.com.uy/ | grep -o "<h1[^>]*>.*</h1>" | head -1
curl -sL https://spikeai.com.uy/ | grep -o 'rel="canonical" href="[^"]*"'
curl -sL https://spikeai.com.uy/servicios/sistemas-a-medida | grep -o "<title>.*</title>"
```
Tienen que aparecer el texto de las FAQ, el `<h1>` y la canonical correcta. El HTML con `-A "GPTBot"` tiene que ser **idéntico** al de sin user-agent (`diff` de los dos): si difiere, es cloaking.

**Status y redirecciones:**
```bash
curl -sI https://www.spikeai.com.uy/ | head -3
curl -sI https://spikeai.com.uy/no-existe | head -1
curl -sI https://spikeai.com.uy/admin | head -1
```
Esperado: `301` a la raíz, `404`, `200`.

**La landing se ve idéntica:** capturas antes/después en escritorio y celular (Playwright o el navegador), comparadas píxel a píxel con tolerancia. Consola del navegador sin errores de hidratación (`Hydration failed`, `Text content does not match`).

**Datos estructurados:** [Rich Results Test](https://search.google.com/test/rich-results) y [Schema Markup Validator](https://validator.schema.org/) sobre la home, `/sobre-spike`, un servicio y `/preguntas-frecuentes`. Cero errores.

**Sitemap y llms.txt:** `xmllint --noout dist/sitemap.xml` (válido); cada URL del sitemap responde 200; enviar el sitemap en Search Console y ver que lo lee sin errores. `curl -s https://spikeai.com.uy/llms.txt` devuelve texto plano con los links.

**Indexación (semanas):** Search Console → Páginas indexadas; `site:spikeai.com.uy` en Google; y la medición de RankIA después de cada etapa.

---

## 5. Riesgos

| Riesgo | Cómo se cuida |
| --- | --- |
| Que la landing deje de verse igual (errores de hidratación, animaciones que arrancan distinto) | Preview de Amplify + comparación de capturas antes de `main`. Revisar `BlurFade` y `SuccessCasesSection` (ver 2.1). |
| Parecer cloaking | Mismo HTML para todos los user-agents, sin texto oculto. El `diff` con `-A GPTBot` es parte de la verificación. |
| Romper `/admin` o `/democontable` al cambiar las reglas de Amplify | Respaldar las reglas antes; reglas explícitas para esas rutas; probar las dos entrando directo con la URL. |
| Contenido duplicado entre la landing y las páginas | Las páginas amplían, no copian; canonical propia en cada una; `www` redirigido. |
| Publicar cifras o nombres sin respaldo | Regla de contenido de 2.2: sin estadísticas, bloques "[a completar]" que frenan la publicación, permiso explícito para nombrar clientes. |
| Caché de CloudFront mostrando HTML viejo | Invalidar desde la consola después de deploys importantes. |
| Mantener dos fuentes de contenido | Una sola: `src/content/`, que usan la landing y las páginas. |
| Medir mal el impacto | Línea base de RankIA antes de la etapa 1 y medición después de cada etapa. |

---

## 6. Decisiones pendientes para Gonzalo y Facundo

1. ¿Links discretos a las páginas en el pie de la landing (único cambio visible), o solo sitemap y enlaces entre páginas?
2. ¿Qué clientes se pueden nombrar en páginas propias de casos (además de HIKE y Lunar Vintage, que ya están nombrados)?
3. Dirección para los datos estructurados: ¿solo "Montevideo, Uruguay" o dirección completa?
4. Nombre de marca único (Spike AI) y mail del dominio.
5. Completar los bloques **[a completar]** de la sección 2.2.

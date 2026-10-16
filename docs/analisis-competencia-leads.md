# Análisis de competencia y plan de adquisición — Spike AI

> Relevamiento hecho el 15/10/2026 sobre atomlabsai.com, marvik.ai y minificando.ai, más auditoría de la landing propia (`src/App.tsx` en `main`, y la branch `diseño-nuevo-tatu`).
> Objetivo: entender cómo consiguen clientes y armar un plan concreto para generar leads.

---

## TL;DR — las 7 cosas que importan

1. **Ninguno de los tres vende "IA". Los tres venden un problema resuelto con nombre y apellido.** Nosotros vendemos miedo ("tu competencia ya usa IA") y categorías abstractas. Ese es el problema #1 de copy.
2. **Los tres tienen casos con cliente real, nombre, captura/métrica y página propia.** Nosotros tenemos 8 casos anónimos, sin cliente, sin número, sin página. Nuestra prueba social es la más débil de las cuatro, de lejos.
3. **Nuestra landing no mide nada.** Cero analytics, cero pixel, cero eventos. Minificando tiene Meta Pixel + Umami, Marvik tiene HubSpot + GA4. Hoy no sabemos ni cuánta gente entra ni dónde se cae.
4. **Un único canal de conversión (WhatsApp) y sin agenda.** AtomLabs manda todo a Calendly, Marvik a un form de HubSpot con campo "¿cómo nos conociste?", Minificando a WhatsApp pero con 20+ puntos de contacto y FAQ que preacuerda expectativas. Nosotros: un botón de WhatsApp repetido, sin ningún paso intermedio.
5. **La landing no es el problema principal — el outbound inexistente lo es.** Con 7 clientes y cero tráfico, SEO/contenido no te va a salvar este trimestre. Lo que mueve la aguja a 90 días es **outbound con demo pre-construida**.
6. **Sí: mandar demos. Es la ventaja asimétrica más grande que tenemos hoy.** Una demo funcional cuesta ~1h de trabajo y es imposible de ignorar. Ninguno de los tres competidores lo hace a escala.
7. **Tenemos links rotos y un Gmail en el footer.** Detalles que matan credibilidad en un negocio donde el ticket es de miles de dólares.

---

# PARTE 1 — Análisis de los competidores

## 1.1 AtomLabs (atomlabsai.com) — el más parecido a nosotros, y el que mejor ejecuta

**Posicionamiento:** "Software factory de IA para LATAM". Mid-market y enterprise. Uruguay + Miami.
**Stack web:** Next.js, Cloudflare, bilingüe ES/EN con rutas `/es` y `/en`.

### Estructura de la home (en orden)

| # | Sección | Qué hace |
|---|---|---|
| 1 | Hero | Claim: "Construimos sistemas de IA que **operan** tu negocio". 2 CTAs: *Agendar llamada* (Calendly) + *Ver casos* |
| 2 | Logos | "Equipos de toda América que ya confían en nosotros" |
| 3 | Servicios | Dos bloques: **Agentes de IA** (listos) y **A medida**. 6 productos numerados 01–06 |
| 4 | Cómo trabajamos | 5 pasos con **semanas concretas** (Sem 1 / 1–2 / 2–6 / lanzamiento / continuo) |
| 5 | Integraciones | 15 logos: WhatsApp Business API, n8n, Supabase, Bitrix24, HubSpot, Retell, ElevenLabs… |
| 6 | Casos | 3 casos con cliente real, país, año, 2 métricas animadas y badge **IN PRODUCTION** |
| 7 | En números | 4 métricas de empresa (sistemas en producción, 24/7, % producción, horas de respuesta) |
| 8 | Equipo | **6 personas con foto, rol, bio de una línea y LinkedIn propio** |
| 9 | Podcast | *The Atom Voice* — episodios en YouTube con invitados |
| 10 | FAQ | 6 preguntas, incluida "¿Cómo cobran?" |
| 11 | Footer | EN/ES, legales, Instagram + LinkedIn de empresa |

### Lo que hacen muy bien

- **Mockups animados en vez de iconos.** Cada servicio tiene una simulación visual: una conversación de WhatsApp real ("¿Cuánto vendimos ayer?" → "Ayer: $12.450 en 87 órdenes. +14% vs semana pasada"), una llamada de voz transcribiéndose, un Excel transformándose en reporte. **Esto es una demo encubierta dentro de la landing.** Vende infinitamente más que un ícono de Lucide.
- **Casos con narrativa de 4 actos.** Cada `/es/cases/<cliente>` tiene: El desafío → La solución → Resultados (2 métricas grandes) → Stack tecnológico → CTA a Calendly. Son cortos (~400 palabras) y específicos. El de Pixel Art incluso dice *"Habla rioplatense, como el resto del equipo"* — un detalle de posicionamiento regional brillante.
- **"Despliegues en producción, no pilotos"** repetido 3 veces. Es su diferencial declarado y ataca el miedo real del comprador (que la IA quede en un POC).
- **Sección de equipo como arma comercial.** Cada persona linkea a su LinkedIn. El CEO está descrito como *"Tu primer contacto"*. El cierre es: *"Sin gerentes de cuenta ni intermediarios: hablás directo con quienes construyen tu proyecto."* Esto hace dos cosas: (a) te humaniza frente a una consultora, (b) **habilita el outbound desde los perfiles personales de LinkedIn**, que es donde está la conversión real.
- **Cero formularios. Todo a Calendly.** Un único paso: `calendly.com/contact-atomlabsai/discovery-call`. Sin fricción, sin "te respondemos en 24h".
- **Podcast como motor de red, no de audiencia.** *The Atom Voice* entrevista a empresarios y operadores de LATAM. Esto no es content marketing — es **una excusa para meter en una llamada de 1h a alguien que podría comprarte o referirte**. Es outbound disfrazado de contenido. Genialmente barato y efectivo.

### Lo que les falta (nuestra oportunidad)

- Sin blog ni SEO de contenido. Capturan muy poca demanda orgánica.
- Sin pricing ni rangos de inversión en ningún lado.
- Sin lead magnet ni captura de email: si no estás listo para agendar, te vas y no te vuelven a tocar nunca.
- Las métricas de los casos son flojas (24/7, 100%, 0 dobles reservas). Son más "features" que resultados de negocio.

### Qué les copiamos

1. ✅ **Mockups animados de producto** en cada servicio (WhatsApp, voz, Excel→reporte).
2. ✅ **Páginas de caso individuales** con estructura desafío/solución/resultados/stack/CTA.
3. ✅ **Sección de equipo con foto + LinkedIn** y el mensaje "hablás directo con quien construye".
4. ✅ **Calendly con slots reales**, además del WhatsApp.
5. ✅ **Grilla de integraciones** (es prueba técnica barata y muy convincente).
6. ✅ **El podcast/entrevistas como vehículo de prospección** — ver Parte 3.
7. ✅ **"Producción, no pilotos"** como ancla de diferenciación.

---

## 1.2 Marvik (marvik.ai) — otra liga, otro comprador

**Posicionamiento:** "IA diseñada para moverse más rápido, hoy". Enterprise, multinacional, mayormente en inglés.
**Stack web:** Webflow + **HubSpot CRM** + GA4 + reCAPTCHA + GSAP. Tres idiomas (EN/ES/PT).

### Lo que son

No son nuestro competidor directo — juegan en enterprise/US con casos de Stanford, Rappi y una telco global. Pero su **máquina de marketing** es exactamente el modelo a largo plazo, y hay piezas copiables hoy.

### Arquitectura de contenido (lo importante)

```
/services/*       4 páginas    (oportunidades, data→producción, talento, liderazgo)
/expertise/*      6 páginas    (agentes y LLM, genAI, CV, predictivo, data eng, robótica)
/industries/*    13 páginas    ← retail, ecommerce, logística, fintech, salud, educación...
/cases/*         10+ páginas   con métricas duras
/blog            ~130 posts    (11 páginas de paginación)
/ebooks           3 lead magnets gated
/events                        presencia en Oracle AI World, NVIDIA
```

**Eso son ~165 páginas indexables.** Es una máquina de SEO. El cruce servicio × industria es el truco: la misma solución escrita 13 veces para 13 verticales distintas, cada una rankeando para "IA para logística", "IA para fintech", etc.

### Lo que hacen muy bien

- **Banner de evento arriba de todo**: *"We're attending Oracle AI World 2026, October 25–28, Las Vegas"*. Señal de estatus permanente y renovable.
- **17 testimonios con nombre, cargo y empresa**, muchos de C-level (CEO, CTO, Head of Technology). Uno de ellos describe el proceso: *"Trabajan en sprints: dos semanas de desarrollo, nos entregaban el MVP para probar y dar feedback"*. Un testimonio que explica tu metodología vale por tres que dicen "muy buenos".
- **Partnerships como prueba social**: OpenAI Select Partner, NVIDIA, Oracle. Es el atajo de credibilidad más barato que existe para una agencia chica.
- **El campo "¿Cómo nos conociste?" del formulario es oro puro — nos revela su mix de canales:**
  - Te conocí en un evento
  - Alguien me recomendó
  - A través de un partner (Oracle, NVIDIA…)
  - Vi un post en **LinkedIn**
  - Los encontré en **Google**
  - Los vi en **ChatGPT, Claude u otro asistente de IA** ← esto es nuevo y relevante
  - Leí su blog
- **Ebooks gated** ("Construir con LLMs", "Dominar Stable Diffusion", "Agentes de compras con IA") → capturan email de gente que todavía no compra.
- **Blog mitad técnico, mitad impacto de negocio.** El técnico trae developers y señal de autoridad a Google y a los LLMs; el de negocio convierte.

### Qué les copiamos (adaptado a nuestra escala)

1. ✅ **Páginas por industria.** No 13 — arrancá con 4: inmobiliarias, estudios contables, salud/clínicas, retail. Son las verticales donde ya tenemos casos.
2. ✅ **Un lead magnet gated.** Algo tipo *"Las 12 automatizaciones que implementamos en estudios contables uruguayos (y cuánto tiempo ahorra cada una)"*.
3. ✅ **El campo "¿cómo nos conociste?"** en todo punto de contacto, desde el día 1. Sin eso no sabés dónde invertir.
4. ✅ **Testimonios con nombre, cargo y empresa.** Pedilos esta semana a los 7 clientes actuales.
5. ✅ **Partnerships/badges**: n8n partner, Supabase, OpenAI/Anthropic for Startups, Make. Aunque sean de bajo umbral, suben credibilidad y son gratis.
6. ⚠️ **AEO (optimización para ChatGPT/Claude).** Ya es un canal declarado en su formulario. Contenido estructurado, FAQ con schema, menciones en directorios — hoy es barato porque casi nadie lo trabaja.

### Qué NO copiamos

El blog de 130 posts y el SEO masivo. Eso es un juego de 18 meses y de presupuesto. No es nuestra pelea ahora.

---

## 1.3 Minificando.ai (minificando.ai) — el más copiable y el mejor modelo para nosotros

**Posicionamiento:** "Sistemas a medida para ordenar tu negocio. Menos planillas. Más control." PyMEs argentinas.
**Stack web:** Astro + **Meta Pixel** (= corren ads en Facebook/Instagram) + Umami + Cloudflare. WhatsApp argentino.

### Lo decisivo: no dicen la palabra "IA" casi nunca

Su `.ai` es solo el dominio. El copy entero habla de **planillas, stock, cuentas corrientes, cotizaciones, quién te debe y desde cuándo**. Para una PyME, "IA" es abstracto y caro; "seis planillas y poca visibilidad del stock" es un dolor que reconocés al instante.

**Este es el aprendizaje más importante de todo el análisis.** Nosotros vendemos "automatización e inteligencia artificial". Ellos venden "dejá de perder las mañanas en tareas administrativas". Y les está funcionando.

### Estructura de la home

| # | Sección | Qué hace |
|---|---|---|
| 1 | Hero | "Tu operación, conectada. Tu negocio, bajo control." |
| 2 | **Por dónde empezar** | 3 dolores → 3 soluciones → **cada uno linkea a un caso real con el nombre del cliente** ("En uso en Tarascón" / "En uso en OMP" / "En uso en Palladino") |
| 3 | ¿Tu caso es distinto? | Válvula de escape para quien no encaja |
| 4 | **Hecho con Minificando** | Carrusel de 6 casos con **capturas reales del sistema** (etiquetadas "datos ficticios") |
| 5 | **Video testimonial de 2:51** | El equipo de una fábrica de pizzas congeladas contando el antes/después |
| 6 | Qué recibís | 4 entregables concretos (circuito funcionando, datos migrados, equipo capacitado, revisiones mensuales) |
| 7 | 7 testimonios | Con nombre, empresa, foto/iniciales y **la etapa** ("Primeras semanas de uso", "Reunión exploratoria") |
| 8 | **Equipo** | "Somos Juan y Franco" — nombres reales, sin corporativismo |
| 9 | FAQ (7) | Incluye cuánto cuesta, qué pasa con tus datos, cómo aprende tu equipo |
| 10 | CTA final | WhatsApp. "Primera conversación gratuita." |

### Lo que hacen brillante

- **Capturas de pantalla de los sistemas reales, con datos ficticios.** Resuelven el problema de confidencialidad sin perder el impacto visual. Ves la pantalla, entendés qué comprás. Esto es la cosa más fácil de copiar y la de mayor ROI que encontré en todo el análisis — nosotros tenemos sistemas corriendo y no mostramos **ni una sola pantalla**.
- **El video testimonial.** 2:51 de clientes reales hablando. Imbatible como prueba social, y lo grabás con un celular.
- **Testimonios etiquetados por etapa del proyecto.** Tienen un testimonio de alguien que solo tuvo *una reunión exploratoria*: *"Gracias por la reunión, espero que lo podamos hacer juntos, estoy muy conforme con cómo laburan."* **Es un testimonio de la llamada de venta, no del proyecto.** Baja el miedo a agendar. Esto es un truco de conversión que nadie más usa y es gratis — lo podemos tener mañana.
- **FAQ que pre-negocia.** La pregunta 02 es *"¿La primera conversación incluye un diagnóstico o una demo?"* y la respuesta es: *"La primera conversación sirve para entender el problema y evaluar si podemos ayudarte. Si hace falta un diagnóstico más profundo o una demo, acordamos qué incluye, qué información necesitamos, las condiciones y los tiempos antes de prepararlos."* → se protegen de regalar trabajo. La 06 (cuánto cuesta) no da número pero explica el proceso de propuesta: *"alcance, entregables, precio y tiempos. Las nuevas necesidades se evalúan como cambios de alcance."* Están calificando y educando antes de la llamada.
- **Meta Pixel instalado** = están corriendo ads de Meta a PyMEs. Validación de que el canal funciona para este producto en esta región.
- **Páginas de caso ultra-detalladas** (`/project/1`): 4 capturas en carrusel, el antes/después en 4 actos, **3 módulos del sistema explicados uno por uno**, testimonio del fundador, duración real del proyecto ("6 meses de desarrollo integral"). Decir la duración real es un gesto de honestidad que compra confianza.

### Lo que les falta

- Sin blog, sin SEO, sin lead magnet.
- Sin Calendly (solo WhatsApp).
- Sin equipo visible más allá de "Juan y Franco".

### Qué les copiamos

1. ✅ **El lenguaje.** Sacar "IA/automatización/transformación digital" del hero y poner el dolor operativo concreto.
2. ✅ **Capturas de los sistemas reales con datos ficticios.** Prioridad máxima.
3. ✅ **Video testimonial** de 2–3 min con un cliente.
4. ✅ **Testimonios de la etapa de reunión exploratoria.**
5. ✅ **FAQ que pre-negocia** alcance, precio y demo.
6. ✅ **Dolor → solución → "en uso en [Cliente]"** como estructura del bloque de servicios.
7. ✅ **Meta Pixel + ads a PyMEs** — canal validado por ellos.

---

## 1.4 Comparativa cruzada

| | **AtomLabs** | **Marvik** | **Minificando** | **Spike AI (hoy)** |
|---|---|---|---|---|
| Comprador | Mid-market/enterprise | Enterprise/US | PyME | Indefinido |
| Promesa | Sistemas de IA en producción | IA que escala | Ordenar la operación | "No te quedes atrás" |
| Palabra "IA" en hero | Sí | Sí | **No** | Sí |
| Casos con cliente nombrado | 3 | 10+ | 6 | **0** |
| Páginas de caso propias | ✅ | ✅ | ✅ | ❌ |
| Capturas del producto | Mockups animados | Parcial | **Capturas reales** | ❌ |
| Testimonios | ❌ | 17 | 7 + video | **0** |
| Equipo visible | 6 con LinkedIn | ✅ | "Juan y Franco" | ❌ |
| Métricas de resultado | ✅ | ✅ | Cualitativas | ❌ |
| FAQ | 6 | — | 7 | ❌ |
| Formulario | ❌ | HubSpot + "¿cómo nos conociste?" | ❌ | ❌ |
| Calendly/agenda | ✅ | — | ❌ | ❌ |
| WhatsApp | ❌ | ❌ | ✅ | ✅ (único canal) |
| Blog / SEO | ❌ | **~130 posts, 165 pág.** | ❌ | ❌ |
| Lead magnet | ❌ | 3 ebooks | ❌ | ❌ |
| Analytics / pixel | Cloudflare | HubSpot + GA4 | **Meta Pixel + Umami** | **Nada** |
| Multi-idioma | ES/EN | ES/EN/PT | ES | ES |
| Contenido propio | Podcast | Blog + ebooks + eventos | Video | ❌ |
| Integraciones mostradas | 15 logos | Partners (OpenAI, NVIDIA, Oracle) | ML, contabilidad | ❌ |

**Lectura:** somos los últimos en **todas** las filas que impactan conversión. No es un problema de diseño — nuestra landing se ve bien. Es un problema de **contenido de prueba**: no mostramos ni un cliente, ni una pantalla, ni un número, ni una cara.

---

# PARTE 2 — Auditoría crítica de nuestra landing

**Archivo:** `src/App.tsx` (1237 líneas, componente único) en `main`.
**Nota sobre `diseño-nuevo-tatu`:** la branch tiene el commit `df025d1` sin pushear, pero está **detrás** de `main` — le faltan los assets de marca (`spike-favicon.png`, `spike-mark.svg`, apple-touch-icon) y los links del favicon en `index.html`. Sus aportes propios son menores (auto-rotación del carrusel de casos cada 5s, nodos visuales en vez de un ícono gigante, ícono `Bot`, saca "Lunar Vintage" de clientes). **Recomendación: rescatar la auto-rotación y los nodos visuales como cherry-pick a `main`, y archivar la branch.** No vale la pena mergearla entera: haría perder el favicon y la marca.

## 2.1 Inventario de lo que tenemos

1. Header — nav (Servicios / Método / Contacto) + CTA "Agendar" → WhatsApp
2. Hero — "Spike AI" gigante + "Tu competencia ya está usando IA. No te quedes atrás." + 2 CTAs
3. Marquee de 8 clientes (**solo texto, sin logos**)
4. Bloque de urgencia/miedo — 3 cards
5. Método — 4 pasos con sticky stacking
6. Casos de éxito — carrusel de 8, **anónimos**
7. Antes / Después
8. CTA intermedio
9. Contacto — WhatsApp + email + "Base: Uruguay" + footer

## 2.2 Qué sobra

| Sobra | Por qué |
|---|---|
| **Todo el bloque de miedo** ("El verdadero peligro para tu empresa no es la IA, es que tus competidores la adopten antes que tú") | Es el cliché #1 de las agencias de IA de 2023. Suena a vendedor de humo, no construye confianza, y es exactamente el copy que un CEO de 50 años ya leyó 40 veces. Ocupa un scroll entero sin aportar nada. **Reemplazar por los casos.** |
| **El hero con "Spike AI" en 9rem** | Tu nombre no vende. Nadie busca "Spike AI". Ese espacio premium tiene que decir **qué problema resolvés**. |
| **"Tu competencia ya está usando IA"** | Mismo problema: miedo genérico. Minificando logra más con "seis planillas y poca visibilidad del stock". |
| **El caso #8: "Y si tu problema es otro, también lo podemos resolver con IA"** | Como caso de éxito es relleno y diluye los 7 reales. Como sección aparte (tipo "¿Tu caso es distinto?" de Minificando) está bien. |
| **El Antes/Después genérico** | Tres bullets vagos ("tu equipo pierde tiempo en tareas repetitivas"). Si no tiene números ni contexto, no convence. O lo llenás con datos de un cliente real, o se va. |
| **4 CTAs idénticos a WhatsApp** | Repetir el mismo botón no aumenta conversión; da la sensación de que no hay nada más que ofrecer. |

## 2.3 Qué falta (ordenado por impacto)

| Falta | Impacto | Esfuerzo |
|---|---|---|
| **Capturas de los sistemas reales** (con datos ficticios) | 🔴 Altísimo | Bajo — ya existen |
| **Casos con nombre de cliente + métrica** | 🔴 Altísimo | Bajo-medio (pedir permiso) |
| **Testimonios** (texto y video) | 🔴 Altísimo | Bajo — 7 clientes a mano |
| **Analytics + pixel + eventos de conversión** | 🔴 Alto | 1 hora |
| **Agenda (Cal.com/Calendly)** | 🔴 Alto | 1 hora |
| **Sección de equipo con foto + LinkedIn** | 🟠 Alto | Bajo |
| **FAQ (6–8 preguntas, incluida precio)** | 🟠 Alto | Bajo |
| **Páginas de caso individuales** | 🟠 Alto | Medio |
| **SEO básico**: OG tags, title real, schema, sitemap | 🟠 Medio-alto | 2 horas |
| **Logos reales de clientes** (hoy son strings) | 🟠 Medio | Bajo |
| **Grilla de integraciones** | 🟡 Medio | Bajo |
| **Rango de inversión / modelo de precios** | 🟡 Medio | Bajo |
| **Páginas por industria** | 🟡 Medio | Medio |
| **Lead magnet + captura de email** | 🟡 Medio | Medio |
| **Versión en inglés** | 🟡 Medio | Medio |

## 2.4 Bugs y detalles que están costando credibilidad **hoy**

| Problema | Ubicación | Arreglo |
|---|---|---|
| 🔴 **Los links de LinkedIn e Instagram del footer apuntan a `https://www.linkedin.com` y `https://www.instagram.com`** — a la home de las redes, no a nuestros perfiles | `src/App.tsx:508`, `:519` | Poner las URLs reales. Si no existen los perfiles, crearlos hoy. |
| 🔴 **El email de contacto es `spike.automations@gmail.com`** | `src/App.tsx:1163` | Google Workspace con `hola@spikeai.com`. Un Gmail en una empresa que vende sistemas a medida contradice todo el pitch. ~6 USD/mes. |
| 🟠 **Cero acentos y eñes en todo el copy** ("Diagnostico", "Metodo", "operacion", "manana", "tu" por "tú") | Todo `App.tsx` | Para un público uruguayo/argentino lee como descuidado o como traducción automática. Arreglar todo. |
| 🟠 **`<title>` es solo "Spike AI"** | `index.html:14` | `Spike AI — Automatización e IA para empresas en Uruguay`. Sin esto no rankeás ni por marca. |
| 🟠 **Sin OG/Twitter tags** | `index.html` | Cada vez que compartís el link por WhatsApp o LinkedIn aparece sin imagen ni descripción. Mata el CTR en el canal que más usamos. |
| 🟠 **Clientes como texto plano, no logos** | `src/App.tsx:255-264` | Pedir logos. Un marquee de nombres en texto parece inventado. |
| 🟡 **Sin `robots.txt`, `sitemap.xml`, canonical** | `public/` | Básico. |
| 🟡 **`package.json` se llama `landing-redesign`** | — | Cosmético, pero si alguna vez se publica el repo… |
| 🟡 **Todo el sitio es una sola ruta** | `src/App.tsx` | Sin router no podés tener páginas de caso ni de industria. Es el blocker técnico de media docena de recomendaciones. |

## 2.5 Lo que SÍ está bien y hay que conservar

- El diseño es sobrio y moderno — **no es el cuello de botella**. No gastes otro mes rediseñando.
- El método de 4 pasos con el ángulo "micro-implementaciones, sin big bang" es un buen diferencial frente a consultoras caras. Hay que reforzarlo, no cambiarlo.
- "Diagnóstico sin costo (30–60 min)" es la oferta de entrada correcta.
- Los 8 casos cubren verticales reales (inmobiliaria, contable, forestal, finanzas, retail) — la materia prima está, solo falta nombrarla y mostrarla.
- WhatsApp como canal primario es **acertado** para Uruguay/Argentina. Mantenerlo; agregar agenda, no reemplazar.

---

# PARTE 3 — Plan de adquisición

## 3.0 El diagnóstico honesto

Tenemos 7 clientes, un equipo de 2, y cero tráfico. En ese escenario:

- **SEO/blog** → 12–18 meses para ver algo. No es la pelea de este trimestre.
- **Ads** → quema plata sin landing que convierta ni sin medición.
- **Outbound con demo pre-construida** → resultados en 2–4 semanas. **Acá está todo.**

La landing no genera demanda; la **convierte**. Hoy no hay demanda que convertir. Entonces el orden es: *(1) arreglar la landing lo justo para que no mate conversiones → (2) generar demanda con outbound → (3) recién después construir la máquina de inbound.*

---

## 3.1 La jugada principal: outbound con demo construida

> **Sí, mandá demos. Es la decisión de mayor impacto de todo este documento.**

Si una demo muy buena se hace en un rato, tenemos una ventaja que ningún competidor del relevamiento está explotando. AtomLabs te manda a Calendly. Marvik te manda a un form. Minificando te manda a WhatsApp. **Nadie te manda la cosa funcionando.**

### Por qué funciona

1. **Rompe el patrón.** Un CEO recibe 20 mensajes de "hagamos una llamada de 15 minutos" por semana. Recibe cero videos de su propio proceso ya automatizado.
2. **Invierte la carga de la prueba.** No tiene que imaginarse si funciona. Lo ve.
3. **Es un regalo, no un pedido.** El principio de reciprocidad hace el resto.
4. **Colapsa el ciclo de venta.** Saltás diagnóstico, propuesta y "lo vamos a evaluar". La primera llamada ya es sobre implementación.
5. **Nos defiende del único riesgo**: que nos pidan trabajo gratis. Acá *elegimos nosotros* qué regalar, a quién y cuándo.

### El riesgo y cómo mitigarlo

El riesgo es que la demo se vea como "ya está hecho, ¿por qué te pago?". Se mitiga así:
- La demo muestra **una** pieza del circuito, no el sistema entero.
- Siempre termina en un límite visible: *"esto corre con datos de ejemplo; conectado a tu Bitrix/planilla/ERP real es donde empieza el trabajo"*.
- Nunca se entrega el código ni el acceso. Es un video o un link con fecha de expiración.

### El proceso operativo (replicable, ~45 min por prospecto)

```
1. Elegir vertical de la semana (lunes)
     └─ inmobiliarias / estudios contables / clínicas / retail / logística

2. Armar lista de 25 empresas          (~1h, una sola vez por vertical)
     └─ LinkedIn Sales Navigator, Cámara de Comercio, Google Maps,
        directorios de la cámara inmobiliaria / colegio de contadores

3. Investigar 10 min cada una
     └─ ¿qué publican? ¿cómo atienden en WhatsApp/IG? ¿cómo cotizan?
     └─ detectar UN dolor visible y nombrable

4. Construir la demo (30-45 min)
     └─ un agente de WhatsApp que responde con SU catálogo
     └─ un dashboard con SUS KPIs (datos de ejemplo, su marca)
     └─ un bot que lee SUS PDFs públicos y responde preguntas

5. Grabar Loom de 90 segundos
     └─ "Hola [Nombre], soy Gonza de Spike AI.
         Vi que [observación específica de su operación].
         Me puse a probar algo con la info pública de ustedes — mirá:"
         [demo funcionando 45 seg]
         "Esto está con datos de ejemplo. Si te interesa verlo con
          los datos reales de [empresa], agendá acá: [link]"

6. Enviar por el canal correcto
     └─ LinkedIn DM (dueño/gerente) > Email > WhatsApp si es número comercial

7. Seguimiento: día 4 y día 11. Dos toques, no más.
```

**Volumen objetivo: 10 demos por semana** (≈8h de trabajo). A tasas conservadoras de outbound con demo (15–25% de respuesta, 30–40% de las respuestas agendan): **2–4 reuniones por semana**. Con un ticket promedio de agencia en la región, con cerrar 1 de cada 6 reuniones ya se paga el esfuerzo con creces.

### Verticales por las que empezar

Priorizar donde **ya tenemos caso**, porque la demo se parece a algo que ya construiste y el pitch tiene prueba:

| Vertical | Por qué | Demo tipo | Caso que respalda |
|---|---|---|---|
| **Inmobiliarias** | Ya tenemos 2 casos | Agente de WhatsApp que responde por propiedades de su web + alerta de vencimientos | Sistema de alquileres, IA sobre base inmobiliaria |
| **Estudios contables** | Ya tenemos caso + Estudio G Pittaluga | Asistente que responde sobre normativa + conciliación bancaria | Asistente contable, conciliación |
| **Clínicas / estética / salud** | AtomLabs ya validó (Magnolias) | Bot de agendamiento por WhatsApp con recordatorios | — (construir el primero) |
| **Retail / ecommerce** | HIKE, Lunar Vintage | Bot de catálogo + cotizador + reserva | Landings con IA |

---

## 3.2 LinkedIn personal — el segundo canal, y es gratis

AtomLabs linkea los 6 perfiles personales desde la landing. No es decorativo: **las agencias B2B en LATAM se venden desde los perfiles de los fundadores, no desde la página de empresa.** Las páginas de empresa tienen ~2% del alcance orgánico de un perfil personal.

**Lo que hay que hacer:**

- Perfiles de Facu y Gonza optimizados: titular que diga el problema que resolvés (no "Co-founder @ Spike AI" sino "Automatizamos la operación de PyMEs uruguayas | Spike AI"), banner, destacados con casos.
- **3 posts por semana cada uno.** Nada de "¡Emocionados de anunciar!". Formato que funciona:
  - **"Así automatizamos X"** — captura/video de 30s de algo que construiste esta semana.
  - **"Un cliente nos pidió Y"** — mini caso con el número al final.
  - **Opinión con filo** — "La mayoría de las PyMEs no necesita IA, necesita dejar de usar 6 planillas." Genera comentarios, y los comentarios son el algoritmo.
  - **Demo en video** — las mismas demos del outbound, anonimizadas. Doble uso del mismo trabajo.
- Comentar 5 posts al día de dueños de PyMEs y gente de las verticales objetivo. Es la forma más barata de entrar en el radar antes del DM.
- **El contenido y el outbound se retroalimentan**: el prospecto recibe tu DM, entra a tu perfil, ve que posteás cosas reales todas las semanas, y la respuesta sube.

---

## 3.3 El podcast / las entrevistas (copiado de AtomLabs, mejorado)

AtomLabs hace *The Atom Voice*. Es la excusa perfecta para conseguir una hora de la atención de alguien que no te atendería como vendedor.

**Versión Spike AI, más barata y más directa:** no un podcast de IA (saturado), sino **"Cómo opera [industria] en Uruguay"**. Entrevistás a dueños de inmobiliarias, estudios contables, clínicas.

Qué conseguís de cada episodio:
1. Una hora con un comprador potencial, posicionado como periodista y no como vendedor.
2. Entendimiento profundísimo de sus dolores → mejor copy, mejores demos.
3. Contenido para LinkedIn (1 episodio = 8 clips).
4. Reciprocidad: le diste exposición. El 100% te atiende la segunda llamada.
5. Red de referidos: los invitados te presentan a sus pares.

Costo real: 2h por episodio, 1 episodio cada 2 semanas. No hace falta producción — audio decente y clips verticales.

---

## 3.4 Referidos — el canal más barato y el más desatendido

Con 7 clientes satisfechos, hay 7 fuentes de referidos que probablemente no estemos pidiendo.

- **Pedir explícitamente**, no esperar. Mensaje concreto: *"¿Conocés a alguien que esté con el mismo problema de [X]? Si me lo presentás y cierra, te descuento un mes de soporte / te sumo [módulo]."*
- **Programa formal**: 10% del primer proyecto, o crédito en horas.
- **Aliados de canal** (estos sí escalan):
  - **Contadores y estudios contables** → le venden a todas las PyMEs del país y les ven los problemas operativos de adentro. Un estudio contable aliado vale por 50 posts de LinkedIn. Ya tenemos a Estudio G Pittaluga de cliente: **convertirlo en canal**.
  - **Agencias de marketing** → tienen clientes PyME y no saben hacer automatización. Partnership de referidos cruzados.
  - **Consultores de gestión / ERP** → se topan con la necesidad en cada implementación.
  - **Desarrolladores freelance** → derivan lo que les queda grande.

---

## 3.5 Cómo armar las propuestas

Hoy el punto de entrada es "diagnóstico gratuito" → y después, el vacío. Falta el puente entre la llamada y el proyecto grande.

### Productizar la oferta (3 escalones)

| | **1. Diagnóstico Express** | **2. Primera Automatización** | **3. Sistema a Medida** |
|---|---|---|---|
| Qué es | Mapa de la operación, 5 oportunidades priorizadas por ROI, demo de la #1 | Un circuito completo funcionando en producción | Plataforma a medida + agentes + integraciones |
| Duración | 1 semana | 2–4 semanas | 2–6 meses |
| Precio | **Pago, bajo** (y se descuenta íntegro si avanzan al paso 2) | Precio fijo, cerrado | Por alcance + fee mensual |
| Para qué sirve | Califica, cubre tu tiempo, y el que paga algo compra 10× más que el que no | Prueba el valor con riesgo bajo para los dos | Donde está el margen |

**Por qué cobrar el diagnóstico:** filtra curiosos, convierte un prospecto en cliente desde la semana 1 (psicológicamente ya te compró), y como se descuenta del siguiente paso, la objeción desaparece. Es el movimiento comercial que más rápido cambia la calidad del pipeline.

### Estructura de la propuesta escrita

Nunca mandar un PDF genérico. Siempre:

1. **"Esto es lo que entendimos de tu operación"** — en sus palabras, de la llamada. Si acertás acá, el resto se lee con predisposición.
2. **"Esto es lo que te está costando"** — en horas/mes o pesos/mes. Un número, aunque sea estimado y declarado como tal.
3. **"Esto es lo que proponemos"** — alcance exacto, qué entra y **qué NO entra** (copiado de Minificando: "las nuevas necesidades se evalúan como cambios de alcance").
4. **"Así se ve"** — capturas, mockup o la demo que ya les mandaste.
5. **Cronograma con fechas reales**, no "4-6 semanas".
6. **Precio único y claro**, con las 3 opciones si aplica. Nunca "a partir de".
7. **Qué necesitamos de ustedes** — accesos, un referente, horas de su equipo. Esto baja el riesgo percibido y señala profesionalismo.
8. **Validez de 15 días.** Urgencia honesta.

Mandarla **dentro de las 24h** de la llamada. La velocidad de respuesta es el diferencial más barato que existe — AtomLabs lo pone como métrica en su home.

---

## 3.6 Otros canales (ordenados por relación impacto/esfuerzo)

| Canal | Impacto | Esfuerzo | Cuándo |
|---|---|---|---|
| **Outbound con demo** | 🔴🔴🔴 | Alto pero repetible | **Ya** |
| **LinkedIn personal** | 🔴🔴 | Medio, constante | **Ya** |
| **Pedir referidos a los 7 clientes** | 🔴🔴 | Muy bajo | **Esta semana** |
| **Alianza con estudios contables** | 🔴🔴 | Bajo | **Este mes** |
| **Testimonios + casos en la landing** | 🔴🔴 | Bajo | **Este mes** |
| **Google Ads de alta intención** (`"automatizar whatsapp empresa uruguay"`, `"sistema de gestión a medida"`) | 🟠 | Bajo (USD 300–500/mes) | Mes 2, cuando la landing convierta |
| **Meta Ads a PyMEs** (validado por Minificando) | 🟠 | Medio | Mes 2–3 |
| **Podcast / entrevistas** | 🟠 | Medio | Mes 2 |
| **Google Business Profile + directorios locales** | 🟠 | Muy bajo | **Ya** (1h) |
| **Charlas en cámaras empresariales** (Cámara de Comercio, cámara inmobiliaria, colegio de contadores) | 🟠 | Medio | Mes 2–3 |
| **Comunidades**: Endeavor UY, ANDE, ANII, incubadoras, Sinergia, grupos de WhatsApp de dueños | 🟠 | Bajo | Continuo |
| **Páginas por industria en la web** | 🟡 | Medio | Mes 3 |
| **Lead magnet + email** | 🟡 | Medio | Mes 3 |
| **Blog / SEO de contenido** | 🟡 largo plazo | Alto | Mes 4+ |
| **AEO (aparecer en ChatGPT/Claude)** | 🟡 | Bajo | Mes 3 — barato hoy, caro mañana |
| **Partnerships de tech** (n8n, Supabase, Make, OpenAI/Anthropic startups) | 🟡 | Bajo | Mes 2 |

---

# PARTE 4 — Plan de ejecución priorizado

## Semana 1 — Lo que no cuesta nada y está roto

- [ ] Arreglar los links de LinkedIn e Instagram del footer (`App.tsx:508`, `:519`). Si no hay perfiles, crearlos.
- [ ] Google Workspace → `hola@spikeai.com`. Sacar el Gmail.
- [ ] Instalar **analytics** (Plausible o Umami, ~9 USD/mes) + **Meta Pixel** + eventos en cada click de WhatsApp. *Sin esto, todo lo demás es a ciegas.*
- [ ] Título real + meta description + **OG tags con imagen** en `index.html`.
- [ ] Mandar un mensaje a los 7 clientes pidiendo: (a) testimonio de 3 líneas, (b) permiso para nombrarlos, (c) logo, (d) un referido.
- [ ] Crear cuenta de **Cal.com** (gratis) con slots de 30 min para el diagnóstico.
- [ ] Corregir acentos y eñes en todo el copy.
- [ ] Optimizar los perfiles de LinkedIn de Facu y Gonza.
- [ ] Crear Google Business Profile.

## Semanas 2–3 — Que la landing deje de ser el eslabón débil

- [ ] **Capturas de 4–5 sistemas reales con datos ficticios** → reemplazar los iconos del carrusel de casos. *Mayor ROI de toda la lista.*
- [ ] Nombrar a los clientes en los casos (los que autoricen) + una métrica por caso.
- [ ] Sumar sección de **testimonios** con nombre, empresa, cargo. Incluir uno de etapa "reunión exploratoria".
- [ ] Sumar sección de **equipo**: foto, rol, LinkedIn, y el mensaje "hablás directo con quien construye".
- [ ] Sumar **FAQ de 7 preguntas**, con precio y con la de "¿incluye demo?" (copiar la lógica de Minificando).
- [ ] **Eliminar el bloque de miedo.** Poner los casos ahí.
- [ ] Reescribir el hero: sacar "Spike AI" de 9rem, poner el problema. Dirección: *"Tu operación, en un solo sistema"* / *"Menos planillas, menos WhatsApp suelto, más control"* — probar 2 variantes.
- [ ] Agregar **Cal.com** como CTA secundario junto al WhatsApp.
- [ ] Grilla de **integraciones** (n8n, Supabase, WhatsApp Business API, HubSpot, Bitrix, Mercado Libre, Odoo…).
- [ ] Logos reales en el marquee.
- [ ] Decidir sobre `diseño-nuevo-tatu`: cherry-pick de la auto-rotación y los nodos visuales a `main`, archivar la branch.

## Semanas 2–8 — La máquina de outbound (en paralelo, no después)

- [ ] Elegir la vertical #1 (sugerencia: **estudios contables** — ya tenemos caso, cliente y es canal de referidos a la vez).
- [ ] Armar lista de 50 empresas de esa vertical.
- [ ] Construir **3 demos template** reutilizables (agente de WhatsApp de catálogo, asistente de documentos, dashboard operativo) que se personalicen en 30 min.
- [ ] **10 demos personalizadas + Loom por semana.** Sostenido.
- [ ] Secuencia de seguimiento: día 4 y día 11.
- [ ] Planilla/CRM de tracking: prospecto, canal, demo enviada, respuesta, reunión, propuesta, cierre.
- [ ] **3 posts de LinkedIn por semana cada uno.** Reutilizar las demos.
- [ ] Reunión con Estudio G Pittaluga para armar el acuerdo de referidos.

## Mes 2–3 — Escalar lo que funcionó

- [ ] Páginas de caso individuales (requiere meter un router — hoy es un blocker técnico).
- [ ] 4 páginas por industria.
- [ ] Video testimonial de 2–3 min con el cliente más contento.
- [ ] Productizar los 3 escalones de oferta con precios definidos.
- [ ] Google Ads de alta intención, presupuesto chico, con conversiones ya medidas.
- [ ] Primeros 2 episodios del podcast/entrevistas.
- [ ] Lead magnet gated por vertical.
- [ ] Versión en inglés (AtomLabs y Marvik ya la tienen; abre Miami/US, que es donde están los tickets grandes).

---

## Las 5 que yo haría primero, si solo pudiera hacer 5

1. **Analytics + pixel + eventos.** Una hora. Sin medición todo lo demás es fe.
2. **Capturas de los sistemas reales en la landing.** Es la diferencia entre "dicen que hacen" y "mirá lo que hacen". Ya existen; solo hay que sacarles screenshot con datos ficticios.
3. **Testimonios y nombres de los 7 clientes.** Un mensaje de WhatsApp. Gratis. Es la pieza donde estamos peor contra los tres.
4. **10 demos outbound por semana.** Esto es lo que trae los clientes de los próximos 60 días. Todo lo demás es infraestructura.
5. **Arreglar los links rotos y el Gmail.** Porque hoy cada visitante que llega al footer ve que algo no cierra.

---

## Fuentes

- https://www.atomlabsai.com/es — home, `/es/cases/pixelart`
- https://www.marvik.ai/es — home, `/es/contact`, `/es/blog`, `/es/ebooks`
- https://minificando.ai/ — home, `/project/1`
- `src/App.tsx`, `index.html`, `legacy-landing/spike-ai-company-info.md` (repo FLOWLY, branch `main`)
- Branch `diseño-nuevo-tatu` (commit `df025d1`, sin pushear)

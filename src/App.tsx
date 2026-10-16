import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Building2,
  CircleCheckBig,
  Clock3,
  Database,
  Landmark,
  LayoutTemplate,
  Network,
  RefreshCw,
  Search,
  TreePine,
  Workflow,
} from "lucide-react"
import { type CSSProperties, useEffect, useRef, useState } from "react"

import { Ellipse, Flower, Moon, Polygon, Star, Triangle } from "coolshapes-react"

import {
  AssistantVisual,
  DashboardVisual,
  DataVisual,
  DatabaseVisual,
  ReconciliationVisual,
  RentalsVisual,
  SalesVisual,
} from "@/components/case-visuals"
import { HeroMacbook } from "@/components/hero-macbook"
import { Badge } from "@/components/ui/badge"
import { BlurFade } from "@/components/ui/blur-fade"
import { DotPattern } from "@/components/ui/dot-pattern"

const navigation = [
  { label: "Cómo empezar", href: "#servicios" },
  { label: "Método", href: "#metodo" },
  { label: "Qué recibís", href: "#equipo" },
  { label: "Contacto", href: "#contacto" },
]

const caseStudies = [
  {
    title: "Sistema de gestión de alquileres para inmobiliarias",
    eyebrow: "Operación centralizada",
    description:
      "Unificamos seguimiento comercial, contratos, vencimientos, estado de propiedades y tareas operativas en un solo sistema conectado con automatizaciones reales.",
    icon: Building2,
    visual: RentalsVisual,
    result: "Menos seguimiento manual y más control operativo",
    bullets: [
      "Propiedades, contratos y vencimientos en un solo flujo",
      "Alertas y automatizaciones para tareas repetitivas",
      "Visibilidad completa para equipo comercial y operativo",
    ],
    visualLabel: "Inmobiliarias",
    visualTitle: "Alquileres, seguimiento y operación en un sistema vivo.",
    visualNodes: ["Leads", "Contratos", "Cobros", "Alertas"],
  },
  {
    title: "IA para conciliación bancaria y control financiero",
    eyebrow: "Finanzas automatizadas",
    description:
      "Implementamos flujos con IA y reglas operativas para conciliar movimientos, detectar inconsistencias y acelerar cierres sin depender de revisiones eternas.",
    icon: Landmark,
    visual: ReconciliationVisual,
    result: "Menos horas administrativas y más precisión financiera",
    bullets: [
      "Cruce de extractos, facturas y movimientos",
      "Detección automática de diferencias",
      "Base lista para reporting y decisión",
    ],
    visualLabel: "Banca y administración",
    visualTitle: "Conciliar ya no debería consumir a tu equipo.",
    visualNodes: ["Bancos", "Facturas", "Validación IA", "Reportes"],
  },
  {
    title: "Asistente de IA contable con contexto y procesos definidos",
    eyebrow: "IA interna para equipos",
    description:
      "Creamos asistentes conectados a documentación, criterios contables y procedimientos internos para ayudar al equipo en consultas, tareas y validaciones.",
    icon: Workflow,
    visual: AssistantVisual,
    result: "Conocimiento operativo disponible en segundos",
    bullets: [
      "Responde sobre normativa y procesos internos",
      "Asiste en tareas repetitivas con contexto real",
      "Reduce dependencia de pocas personas clave",
    ],
    visualLabel: "Estudios y empresas",
    visualTitle: "Un asistente que entiende cómo trabaja tu empresa.",
    visualNodes: ["Contexto", "Procesos", "Consultas", "Tareas"],
  },
  {
    title: "IA conectada a la base de una inmobiliaria para automatizar y asistir",
    eyebrow: "Acceso inteligente a la información",
    description:
      "Conectamos la IA a la base operativa de la inmobiliaria para responder consultas internas, disparar acciones y asistir al equipo con información confiable.",
    icon: Database,
    visual: DatabaseVisual,
    result: "La información correcta disponible al instante",
    bullets: [
      "Consultas internas con acceso a datos reales",
      "Automatizaciones disparadas desde la propia base",
      "Asistencia para empleados sin cambiar el flujo diario",
    ],
    visualLabel: "Base conectada",
    visualTitle: "Datos operativos convertidos en acciones útiles.",
    visualNodes: ["Base", "Consultas", "Automatizaciones", "Equipo"],
  },
  {
    title: "Dashboards de rendimiento automatizados para operaciones complejas",
    eyebrow: "BI accionable",
    description:
      "Desarrollamos dashboards vivos para salones de eventos, depósitos, barracas, inmobiliarias y empresas de limpieza, con reporting automático y lectura simple.",
    icon: BarChart3,
    visual: DashboardVisual,
    result: "KPIs claros sin perseguir planillas",
    bullets: [
      "Reportes automáticos para múltiples áreas",
      "KPIs actualizados sin carga manual",
      "Lectura ejecutiva y operativa en el mismo sistema",
    ],
    visualLabel: "Performance",
    visualTitle: "Tu negocio medido sin fricción operativa.",
    visualNodes: ["Ventas", "Ocupación", "Margen", "Alertas"],
  },
  {
    title: "Reestructuración de base de datos y reporting para una forestal",
    eyebrow: "Infraestructura de datos",
    description:
      "Ordenamos una base compleja, redefinimos estructura, limpiamos criterios y montamos reporting automatizado para que la operación deje de depender de parches.",
    icon: TreePine,
    visual: DataVisual,
    result: "Datos ordenados, trazables y útiles para decidir",
    bullets: [
      "Limpieza y rediseño de estructura de datos",
      "Reporting automático sobre una base confiable",
      "Menos dependencia de procesos manuales y archivos rotos",
    ],
    visualLabel: "Forestal",
    visualTitle: "Cuando la base se ordena, la operación cambia.",
    visualNodes: ["Base nueva", "Criterios", "Reporting", "Decisión"],
  },
  {
    title: "Sistema completo de ventas para marcas con varios canales",
    eyebrow: "Retail y ecommerce",
    client: "HIKE y Lunar Vintage",
    description:
      "Construimos un software propio que centraliza toda la venta en un solo lugar: pedidos de la tienda online, de Instagram y WhatsApp, y del local, con el stock sincronizado y la información de clientes unificada.",
    icon: LayoutTemplate,
    visual: SalesVisual,
    result: "Toda la venta en un solo lugar, sin planillas paralelas",
    bullets: [
      "Pedidos de todos los canales en una sola bandeja",
      "Stock y precios sincronizados entre canales",
      "Historial de cliente e información comercial centralizada",
    ],
    visualLabel: "Retail multicanal",
    visualTitle: "Vender por todos lados sin perder el control de nada.",
    visualNodes: ["Canales", "Pedidos", "Stock", "Clientes"],
  },
]

const startingPoints = [
  {
    step: "01",
    title: "Agente de WhatsApp",
    text: "Atiende, responde y deriva solo lo que necesita una persona.",
  },
  {
    step: "02",
    title: "Panel de operación",
    text: "Lo que hoy vive en planillas, en una sola pantalla.",
  },
  {
    step: "03",
    title: "Cierre automático",
    text: "Conciliación y reportes sin abrir un Excel.",
  },
  {
    step: "04",
    title: "Asistente interno",
    text: "Responde sobre tus procesos y documentos al instante.",
  },
  {
    step: "05",
    title: "Sistemas conectados",
    text: "Tus herramientas hablando entre sí, sin carga doble.",
  },
  {
    step: "06",
    title: "Migración de datos",
    text: "Años de planillas sueltas en una base ordenada.",
  },
]

const team = [
  {
    name: "Facundo Etcheverry",
    role: "Sistemas y automatización",
    photo: "/equipo/facundo.jpeg",
    linkedin: "https://www.linkedin.com/in/facundo-etcheverry-castells-87517531a/",
  },
  {
    name: "Gonzalo Pittaluga",
    role: "Datos y estrategia",
    photo: "/equipo/gonzalo.jpeg",
    linkedin: "https://www.linkedin.com/in/gonzalopittaluga/",
  },
]

const deliverables = [
  {
    title: "El circuito funcionando",
    text: "En producción, con tus datos. No un prototipo.",
  },
  {
    title: "Tus datos migrados",
    text: "Lo que vive en planillas entra ordenado y sin duplicados.",
  },
  {
    title: "Tu equipo capacitado",
    text: "Los entrenamos hasta que lo manejen sin nosotros.",
  },
  {
    title: "Alguien del otro lado",
    text: "Nos escribís y te contestamos nosotros, no un ticket.",
  },
]

const faqs = [
  {
    q: "¿Cómo cobran?",
    a: "Cada proyecto se cotiza con alcance, entregables, precio cerrado y plazos definidos antes de empezar. No trabajamos por hora ni con presupuestos abiertos. Las necesidades nuevas que aparecen durante el proyecto se evalúan como cambios de alcance.",
  },
  {
    q: "¿La primera conversación incluye un diagnóstico o una demo?",
    a: "La primera conversación sirve para entender cómo trabajan hoy y evaluar si podemos ayudar. Si hace falta un diagnóstico más profundo o una demo, acordamos antes qué incluye, qué información necesitamos y en cuánto tiempo.",
  },
  {
    q: "¿Cuánto tarda en estar funcionando?",
    a: "La primera automatización suele estar corriendo entre dos y cuatro semanas. Los sistemas completos llevan más, pero entregamos por partes para que veas resultados antes de terminar.",
  },
  {
    q: "¿Tengo que cambiar las herramientas que uso hoy?",
    a: "Casi nunca. Trabajamos sobre lo que ya tenés y conectamos lo que haga falta. Si algo conviene reemplazar, te lo decimos con el motivo.",
  },
  {
    q: "¿Qué pasa con nuestros datos?",
    a: "Los datos son tuyos y quedan en infraestructura tuya o en servicios que vos controlás. Firmamos acuerdo de confidencialidad si lo necesitás.",
  },
  {
    q: "¿Qué pasa si mi equipo no es técnico?",
    a: "Es el caso más común. Capacitamos al equipo y dejamos el sistema funcionando con la gente que ya trabaja ahí. Si nadie lo usa, no sirvió.",
  },
  {
    q: "¿Trabajan fuera de Uruguay?",
    a: "Sí. Estamos en Uruguay y trabajamos con empresas de toda la región de forma remota.",
  },
]

/* Testimonios reales. Mientras este array este vacio, la seccion no se renderiza.
   Cargar solo con testimonios textuales de clientes, con permiso. */
const testimonials: { quote: string; name: string; role: string; stage: string }[] = []

const process = [
  {
    step: "01",
    title: "Diagnóstico sin costo",
    headline: "Te escuchamos antes de proponer.",
    timing: "30-60 min",
    description:
      "Nos sentamos a charlar sobre tu día a día. Analizamos dónde estás perdiendo tiempo y dinero, y te proponemos mejoras lógicas. Sin compromisos.",
    icon: Search,
    bullets: [
      "Detectamos cuellos de botella concretos",
      "Priorizamos oportunidades reales",
      "Definimos por dónde conviene empezar",
    ],
    outcome: "Claridad sobre el primer paso",
  },
  {
    step: "02",
    title: "Micro-implementaciones rápidas",
    headline: "Arrancamos por lo que más duele.",
    timing: "Resultados en semanas",
    description:
      "No cambiamos toda tu estructura de golpe. Empezamos automatizando una sola tarea crítica o mejorando tu web para captar clientes.",
    icon: Workflow,
    bullets: [
      "Automatizamos una tarea crítica",
      "Entregamos algo usable rápido",
      "Mostramos impacto sin fricción interna",
    ],
    outcome: "Primer ROI visible",
  },
  {
    step: "03",
    title: "Evolución continua",
    headline: "Escalamos cuando ves resultados.",
    timing: "Escala modular",
    description:
      "A medida que ves los resultados y tu equipo se adapta de forma natural, seguimos escalando. Tu inversión acompaña el crecimiento real del negocio.",
    icon: RefreshCw,
    bullets: [
      "Sumamos módulos solo cuando tiene sentido",
      "El equipo se adapta sin choque brusco",
      "La inversión acompaña el crecimiento real",
    ],
    outcome: "Adopción natural",
  },
  {
    step: "04",
    title: "Ecosistema robusto",
    headline: "Tu empresa corre con IA propia.",
    timing: "Sistema de élite",
    description:
      "Cuando tu empresa está lista, conectamos todos los puntos. Lo que empieza como herramientas aisladas se unifica en un motor centralizado de IA robusto y seguro.",
    icon: Network,
    bullets: [
      "Unificamos herramientas y datos",
      "Centralizamos la operación inteligente",
      "Construimos una base lista para escalar",
    ],
    outcome: "Infraestructura conectada",
  },
]

const comparison = {
  before: [
    "El mismo dato se carga tres veces en tres lugares distintos.",
    "El reporte del mes se arma a mano copiando de varias planillas.",
    "Si falta la persona que sabe, el proceso se frena.",
    "Los pedidos llegan por WhatsApp y se pierden entre conversaciones.",
  ],
  after: [
    "El dato se carga una vez y aparece en todos lados.",
    "El reporte se genera solo y llega el día que tiene que llegar.",
    "El proceso corre igual, esté quien esté.",
    "Cada pedido entra al sistema con su estado y su responsable.",
  ],
}

const clients = [
  "Castells",
  "Blanco & Etcheverry",
  "Match Carrasco",
  "Kopel Sánchez",
  "Estudio G Pittaluga",
  "HIKE",
  "Proz Recovery",
  "Lunar Vintage",
]

const methodShapes = [
  { Shape: Star, index: 0 },
  { Shape: Moon, index: 1 },
  { Shape: Polygon, index: 2 },
  { Shape: Flower, index: 3 },
]

const caseShapes = [
  { Shape: Ellipse, index: 0 },
  { Shape: Star, index: 2 },
  { Shape: Flower, index: 1 },
  { Shape: Moon, index: 3 },
  { Shape: Triangle, index: 2 },
  { Shape: Star, index: 5 },
  { Shape: Ellipse, index: 4 },
]

const whatsappHref =
  "https://wa.me/59891315670?text=Hola%20Spike%20AI%2C%20quiero%20automatizar%20mi%20negocio"

/* ─────────────────────────────────────────────
   Method Section — CSS-Tricks sticky stacking
   Each card is position:sticky with incremental top.
   No wrappers, no JS transforms, no negative margins.
   Cards flow naturally; sticky + z-index does the rest.
   Ref: css-tricks.com/stacked-cards-with-sticky-positioning
   ───────────────────────────────────────────── */

const cardColors = [
  "bg-[#edf8f0] border-[#c4e2cc]",          // 1: soft green
  "bg-white border-border",                   // 2: white (page default)
  "bg-[#f7faf8] border-[#d0ddd4]",           // 3: very subtle green-white
  "bg-[#f1f6f2] border-[#c0d5c6]",           // 4: light sage
]

function MethodSection() {
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const [activeStep, setActiveStep] = useState(0)
  const total = process.length
  void total

  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth < 1024) return

      /* Track which card is "on top" (latest one to reach its sticky top) */
      let next = 0
      cardRefs.current.forEach((ref, i) => {
        if (!ref) return
        const rect = ref.getBoundingClientRect()
        const stickyTop = 128 + i * 24 // matches the inline top values
        // Card is stuck when its top equals its sticky top (± 2px tolerance)
        if (rect.top <= stickyTop + 2) next = i
      })
      setActiveStep((prev) => (prev !== next ? next : prev))
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <section id="metodo" className="mx-auto max-w-7xl py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)] lg:items-start">

        {/* ── LEFT: sticky labels ── */}
        <div className="lg:sticky lg:top-32 lg:self-start lg:py-4">
          <BlurFade inView>
            <div className="space-y-12 lg:space-y-16">
              {process.map((step, i) => {
                const isActive = activeStep === i
                return (
                  <div key={step.step}>
                    <Badge
                      variant="outline"
                      className={[
                        "px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em] transition-all duration-700",
                        isActive
                          ? "border-[var(--brand-border)] bg-[var(--brand-soft)] text-[var(--brand-strong)]"
                          : "border-transparent bg-transparent text-muted-foreground/25",
                      ].join(" ")}
                    >
                      {step.timing}
                    </Badge>
                    <h3
                      className={[
                        "mt-3 text-[1.7rem] font-medium leading-[1.15] tracking-[-0.06em]",
                        "transition-all duration-700 ease-out",
                        isActive ? "text-foreground" : "text-foreground/15",
                      ].join(" ")}
                    >
                      {step.headline}
                    </h3>
                  </div>
                )
              })}
            </div>
          </BlurFade>
        </div>

        {/* ── RIGHT: sticky stacking cards (CSS-Tricks pattern) ── */}
        <div>
          {process.map((step, i) => {
            const Icon = step.icon
            return (
              <article
                key={step.step}
                ref={(el) => { cardRefs.current[i] = el }}
                className={`method-card relative overflow-hidden rounded-[1.4rem] ${cardColors[i]} p-8 lg:p-10 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.07)] lg:mb-0 mb-5`}
                style={{
                  top: `calc(8rem + ${i * 24}px)`,
                  height: "28rem",
                }}
              >
                {/* Green accent strip at top */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--brand)] via-[var(--brand-strong)] to-[var(--brand)]/30" />

                {/* Decorative bg step number */}
                <span className="absolute right-5 -top-2 text-[11rem] font-bold leading-none text-[var(--brand)]/[0.05] select-none pointer-events-none">
                  {step.step}
                </span>

                {/* Decorative gradient orb */}
                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br from-[var(--brand)]/8 to-transparent blur-3xl pointer-events-none" />

                {/* Top row: icon + step label */}
                <div className="relative flex items-center justify-between mt-1">
                  <div className="flex items-center gap-3.5">
                    <div className="flex size-11 items-center justify-center rounded-xl border-[var(--brand-border)] bg-[var(--brand-soft)] border">
                      <Icon className="size-5 text-[var(--brand-strong)]" />
                    </div>
                    <span className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--brand-strong)]/60">
                      Paso {step.step}
                    </span>
                  </div>
                  <span className="inline-flex items-center rounded-full border border-border bg-white/60 px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.18em] text-foreground/40">
                    {step.timing}
                  </span>
                </div>

                {/* Title */}
                <h3 className="relative mt-8 text-[1.65rem] font-medium tracking-[-0.04em] text-foreground leading-tight">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="relative mt-4 max-w-lg text-[0.98rem] leading-7 text-foreground/55">
                  {step.description}
                </p>

                {/* Bottom accent line */}
                <div className="absolute inset-x-8 bottom-8 lg:inset-x-10 lg:bottom-10">
                  <div className="h-px w-full bg-gradient-to-r from-[var(--brand)]/20 via-[var(--brand)]/8 to-transparent" />
                </div>
              </article>
            )
          })}
        </div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Section intro (generic reusable)
   ───────────────────────────────────────────── */
void MethodSection

const methodStackCardColors = [
  "bg-[#edf8f0] border-[#c4e2cc]",
  "bg-white border-border",
  "bg-[#f7faf8] border-[#d0ddd4]",
  "bg-[#f1f6f2] border-[#c0d5c6]",
]

function MethodSectionV2() {
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth < 1024) return

      let next = 0
      cardRefs.current.forEach((ref, i) => {
        if (!ref) return
        const rect = ref.getBoundingClientRect()
        const stickyTop = 112 + i * 24
        if (rect.top <= stickyTop + 4) next = i
      })
      setActiveStep((prev) => (prev !== next ? next : prev))
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <section id="metodo" className="mx-auto max-w-7xl py-16 sm:py-20">
      <BlurFade inView>
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="border-border bg-white px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground"
          >
            Nuestro método
          </Badge>
          <h2 className="mt-6 text-3xl font-medium tracking-[-0.07em] text-balance text-foreground sm:text-4xl lg:text-[3.05rem] lg:leading-[0.97]">
            La IA como un proceso, no como un salto al vacío.
          </h2>
          <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
            Empezamos por una mejora concreta, la hacemos funcionar rápido y
            después escalamos. Así tu empresa adopta IA sin trauma y con
            resultados visibles desde etapas tempranas.
          </p>
        </div>
      </BlurFade>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:items-start">
        <div className="lg:sticky lg:top-28 lg:self-start lg:py-4">
          <BlurFade inView delay={0.06}>
            <div className="flex min-h-[62vh] flex-col justify-between lg:min-h-[72vh]">
              {process.map((step, i) => {
                const isActive = activeStep === i
                return (
                  <div
                    key={step.step}
                    className={[
                      "transition-all duration-500",
                      isActive ? "opacity-100" : "opacity-70",
                    ].join(" ")}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={[
                          "inline-flex min-w-10 items-center justify-center text-[0.82rem] font-medium uppercase tracking-[0.14em] transition-colors duration-500",
                          isActive
                            ? "text-[var(--brand-strong)]"
                            : "text-muted-foreground/42",
                        ].join(" ")}
                      >
                        {step.step}
                      </span>
                      <div>
                        <p
                          className={[
                            "text-[0.74rem] uppercase tracking-[0.22em] transition-colors duration-500",
                            isActive ? "text-[var(--brand-strong)]" : "text-muted-foreground/45",
                          ].join(" ")}
                        >
                          {step.timing}
                        </p>
                        <h3
                          className={[
                            "mt-1 max-w-[18rem] text-[1.5rem] font-medium leading-[1.05] tracking-[-0.06em] transition-colors duration-500 sm:text-[1.7rem] lg:text-[2rem]",
                            isActive ? "text-foreground" : "text-foreground/24",
                          ].join(" ")}
                        >
                          {step.headline}
                        </h3>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </BlurFade>
        </div>

        <div
          className="method-stack pb-12 lg:pb-28"
          style={{ ["--numcards" as string]: process.length } as CSSProperties}
        >
          {process.map((step, i) => {
            const MethodShape = methodShapes[i].Shape

            return (
              <article
                key={step.step}
                ref={(el) => {
                  cardRefs.current[i] = el
                }}
                className="method-stack-card relative mb-6 lg:mb-8"
                style={
                  {
                    ["--index" as string]: i + 1,
                    top: `calc(6.75rem + ${i * 24}px)`,
                    zIndex: i + 1,
                  } as CSSProperties
                }
              >
                <div
                  className={`method-stack-card__inner relative overflow-hidden rounded-[1.9rem] border ${methodStackCardColors[i]} p-7 shadow-[0_24px_60px_-46px_rgba(15,23,42,0.25)] lg:min-h-[82vh] lg:p-10`}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--brand)] via-[var(--brand-strong)] to-[var(--brand)]/30" />
                  <span className="pointer-events-none absolute right-5 top-2 select-none text-[10rem] font-bold leading-none text-[var(--brand)]/[0.05]">
                    {step.step}
                  </span>
                  <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-gradient-to-br from-[var(--brand)]/8 to-transparent blur-3xl" />

                  <div className="relative flex min-h-[calc(82vh-5rem)] items-center">
                    <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
                      <div className="max-w-2xl">
                        <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--brand-strong)]/65">
                          Paso {step.step} · {step.timing}
                        </p>
                        <h3 className="mt-4 text-[1.9rem] font-medium leading-[1] tracking-[-0.07em] text-foreground sm:text-[2.2rem] lg:text-[2.9rem]">
                          {step.title}
                        </h3>
                        <p className="mt-5 max-w-xl text-[0.98rem] leading-7 text-foreground/58 lg:text-[1.04rem] lg:leading-8">
                          {step.description}
                        </p>
                      </div>

                      <MethodShape
                        index={methodShapes[i].index}
                        size={320}
                        noise
                        aria-hidden
                        className="hidden h-auto w-[200px] justify-self-end drop-shadow-[0_26px_50px_rgba(15,23,42,0.16)] lg:block lg:w-[250px]"
                      />
                    </div>
                  </div>

                  <div className="absolute inset-x-7 bottom-7 lg:inset-x-10 lg:bottom-9">
                    <div className="h-px w-full bg-gradient-to-r from-[var(--brand)]/20 via-[var(--brand)]/8 to-transparent" />
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function SectionIntro({
  label,
  title,
  description,
}: {
  label: string
  title: string
  description: string
}) {
  return (
    <BlurFade inView className="max-w-3xl space-y-4">
      <Badge
        variant="outline"
        className="border-border bg-white px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground"
      >
        {label}
      </Badge>
      <h2 className="max-w-3xl text-3xl font-medium tracking-[-0.07em] text-balance text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
        {description}
      </p>
    </BlurFade>
  )
}

function SuccessCasesSection() {
  const loopStart = caseStudies.length
  const [caseIndex, setCaseIndex] = useState(loopStart)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [transitionsEnabled, setTransitionsEnabled] = useState(true)
  const [viewportWidth, setViewportWidth] = useState(0)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const dragStartXRef = useRef(0)
  const dragMovedRef = useRef(false)

  const slideGap = 24
  const dragThreshold = 70
  const loopedCaseStudies = [...caseStudies, ...caseStudies, ...caseStudies]
  const normalizedIndex =
    ((caseIndex % caseStudies.length) + caseStudies.length) % caseStudies.length
  const slideWidth =
    viewportWidth > 1024
      ? Math.max(680, viewportWidth / 2 - slideGap)
      : Math.max(360, viewportWidth - 40)

  useEffect(() => {
    const updateViewportWidth = () => {
      setViewportWidth(viewportRef.current?.offsetWidth ?? 0)
    }

    updateViewportWidth()
    window.addEventListener("resize", updateViewportWidth)
    return () => window.removeEventListener("resize", updateViewportWidth)
  }, [])

  const goToIndex = (nextIndex: number) => {
    setCaseIndex((prev) => {
      const options = [
        nextIndex,
        nextIndex + caseStudies.length,
        nextIndex + caseStudies.length * 2,
      ]

      return options.reduce((closest, option) =>
        Math.abs(option - prev) < Math.abs(closest - prev) ? option : closest
      )
    })
  }

  const goPrev = () => {
    setCaseIndex((prev) => prev - 1)
  }

  const goNext = () => {
    setCaseIndex((prev) => prev + 1)
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragStartXRef.current = event.clientX
    dragMovedRef.current = false
    setIsDragging(true)
    setDragOffset(0)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const delta = event.clientX - dragStartXRef.current
    if (Math.abs(delta) > 4) dragMovedRef.current = true
    setDragOffset(delta)
  }

  const finishDrag = (pointerId?: number, currentTarget?: HTMLDivElement | null) => {
    if (!isDragging) return

    const delta = dragOffset
    setIsDragging(false)
    setDragOffset(0)

    if (currentTarget && pointerId !== undefined && currentTarget.hasPointerCapture(pointerId)) {
      currentTarget.releasePointerCapture(pointerId)
    }

    if (Math.abs(delta) >= dragThreshold) {
      setCaseIndex((prev) =>
        delta < 0 ? prev + 1 : prev - 1
      )
    }
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    finishDrag(event.pointerId, event.currentTarget)
  }

  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return
    finishDrag(event.pointerId, event.currentTarget)
  }

  const handleTrackTransitionEnd = () => {
    if (caseIndex >= caseStudies.length * 2 || caseIndex < caseStudies.length) {
      setTransitionsEnabled(false)
      setCaseIndex((prev) => {
        if (prev >= caseStudies.length * 2) return prev - caseStudies.length
        if (prev < caseStudies.length) return prev + caseStudies.length
        return prev
      })
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setTransitionsEnabled(true)
        })
      })
    }
  }

  const centerIndex = caseIndex
  const baseTranslate =
    viewportWidth > 0
      ? viewportWidth / 2 - slideWidth / 2 - centerIndex * (slideWidth + slideGap)
      : 0

  return (
    <section
      id="servicios"
      className="relative left-1/2 min-h-[118vh] w-screen -translate-x-1/2 overflow-hidden bg-[#f4f4f1] py-18 sm:min-h-[126vh] sm:py-20"
    >
      <div className="flex min-h-[118vh] flex-col justify-start sm:min-h-[126vh]">
        <div className="mx-auto w-full max-w-4xl px-4 pt-8 text-center sm:px-6 sm:pt-10 lg:px-8 lg:pt-12">
          <BlurFade inView className="space-y-4">
            <Badge
              variant="outline"
              className="border-border bg-white px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground"
            >
              Casos de éxito
            </Badge>
            <h2 className="mx-auto max-w-4xl text-3xl font-medium tracking-[-0.07em] text-balance text-foreground sm:text-4xl md:text-5xl">
              Implementaciones reales de IA aplicadas a problemas concretos.
            </h2>
            <p className="mx-auto max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
              Un slider interactivo para recorrer algunos de los sistemas,
              asistentes y automatizaciones que ya construimos para distintos
              tipos de operación.
            </p>
          </BlurFade>
        </div>

        <BlurFade inView delay={0.08}>
        <div className="mt-6 flex flex-1 flex-col justify-start pb-12 sm:mt-8 sm:pb-14">
          <div
            ref={viewportRef}
            className="overflow-x-hidden overflow-y-visible py-6 sm:py-8"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerLeave={handlePointerLeave}
          >
            <div
              className={[
                "flex gap-6",
                isDragging || !transitionsEnabled
                  ? "cursor-grabbing transition-none"
                  : "cursor-grab transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
              ].join(" ")}
              onTransitionEnd={handleTrackTransitionEnd}
              style={{
                transform: `translateX(${baseTranslate + dragOffset}px)`,
              }}
            >
              {loopedCaseStudies.map((item, loopIndex) => {
                const Visual = item.visual
                const { Shape, index: shapeIndex } =
                  caseShapes[caseStudies.indexOf(item) % caseShapes.length]
                const isActive = loopIndex === centerIndex

                return (
                  <article
                    key={`${item.title}-${loopIndex}`}
                    className={[
                      "relative w-[920px] flex-shrink-0 overflow-hidden rounded-[2rem] border border-border/70 bg-white p-6 text-slate-900 shadow-[0_30px_90px_-70px_rgba(15,23,42,0.25)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] select-none lg:min-h-[35rem] lg:p-7",
                      isActive
                        ? "scale-[1.08] opacity-100"
                        : "scale-[0.84] opacity-100",
                    ].join(" ")}
                    style={{ width: `${slideWidth}px` }}
                  >
                    <Shape
                      index={shapeIndex}
                      size={170}
                      noise
                      aria-hidden
                      className="pointer-events-none absolute -right-8 -top-8 h-auto w-[150px] opacity-80"
                    />

                    <div className="relative flex h-full flex-col gap-6">
                      <div className="grid gap-x-10 gap-y-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
                        <div>
                          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-slate-500">
                            {item.eyebrow}
                            {"client" in item && item.client ? (
                              <span className="text-[var(--brand-strong)]">
                                {" "}
                                &middot; {item.client}
                              </span>
                            ) : null}
                          </p>
                          <h3 className="mt-3 text-[1.75rem] font-medium leading-[1] tracking-[-0.06em] text-slate-900 lg:text-[2.1rem]">
                            {item.title}
                          </h3>
                        </div>

                        <p className="text-[0.95rem] leading-7 text-slate-600">
                          {item.description}
                        </p>
                      </div>

                      <div className="min-h-0 flex-1">
                        <Visual />
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>

          <div className="mx-auto mt-8 flex max-w-7xl items-center justify-between gap-10 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              {caseStudies.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => goToIndex(index)}
                  aria-label={`Mostrar caso ${index + 1}`}
                  className={[
                    "size-2.5 rounded-full transition-all duration-300",
                    index === normalizedIndex
                      ? "bg-slate-800"
                      : "bg-slate-300 hover:bg-slate-400",
                  ].join(" ")}
                />
              ))}
            </div>

            <div className="ml-10 flex items-center gap-3 sm:ml-16 lg:ml-24">
              <button
                id="prevBtn"
                type="button"
                onClick={goPrev}
                className="inline-flex size-12 items-center justify-center text-slate-950 transition-all duration-300 hover:-translate-y-0.5 hover:text-black"
                aria-label="Caso anterior"
              >
                <ArrowLeft className="size-5" />
              </button>
              <button
                id="nextBtn"
                type="button"
                onClick={goNext}
                className="inline-flex size-12 items-center justify-center text-slate-950 transition-all duration-300 hover:-translate-y-0.5 hover:text-black"
                aria-label="Caso siguiente"
              >
                <ArrowRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </BlurFade>
      </div>
    </section>
  )
}

function App() {
  return (
    <main className="relative text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-20">
        <DotPattern
          width={24}
          height={24}
          interactive
          interactionRadius={170}
          maxScale={2.8}
          maxOffset={8}
          className="absolute inset-0 opacity-90"
        />
      </div>

      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
        <header className="fixed inset-x-0 top-0 z-50 py-4">
          <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border-2 border-neutral-300/85 bg-white/55 px-4 py-3 shadow-[0_20px_60px_-42px_rgba(15,23,42,0.22)] backdrop-blur-2xl sm:px-5">
            <a
              href="#"
              className="text-lg font-light tracking-[-0.12em] text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:tracking-[-0.14em] hover:text-neutral-950 sm:text-2xl"
            >
              Spike AI
            </a>

            <nav className="hidden items-center gap-3 lg:flex">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group relative rounded-full px-2.5 py-2 text-sm text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-foreground hover:shadow-[0_12px_28px_-20px_rgba(15,23,42,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-border)]"
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-[var(--brand)] transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              ))}
            </nav>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center justify-center rounded-full border border-neutral-950 bg-neutral-950 px-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-neutral-800 hover:shadow-[0_18px_30px_-18px_rgba(15,23,42,0.65)]"
              style={{ color: "#ffffff" }}
            >
              <span style={{ color: "#ffffff" }}>Agendar</span>
            </a>
          </div>
        </header>

        <section className="relative mx-auto flex max-w-7xl items-center pt-24 pb-12 sm:pt-28 sm:pb-16 lg:min-h-[calc(100vh-5.5rem)] lg:pb-16 lg:pt-24">
          <div className="grid w-full gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.85fr)] lg:items-center lg:gap-16">
            {/* todo el texto, a la izquierda */}
            <div className="flex max-w-xl flex-col">
              <BlurFade inView delay={0.05}>
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                  Software y automatización a medida
                </p>
                <h1 className="mt-4 text-[clamp(2.5rem,11vw,3.4rem)] font-light leading-[0.96] tracking-[-0.085em] text-balance text-foreground sm:text-[4.2rem] sm:leading-[0.94] sm:tracking-[-0.1em] lg:text-[4.6rem] xl:text-[5.2rem] xl:leading-[0.92]">
                  Sistemas
                  <br />
                  diseñados para
                  <br />
                  <span className="text-[var(--brand-strong)]">tu negocio.</span>
                </h1>
              </BlurFade>

              <BlurFade inView delay={0.14}>
                <p className="mt-6 max-w-lg text-base leading-8 text-muted-foreground sm:text-lg">
                  Ordenamos cómo trabaja tu empresa y automatizamos lo que hoy
                  se hace a mano.
                </p>
              </BlurFade>

              <BlurFade inView delay={0.2}>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-neutral-950 bg-neutral-950 px-6 text-sm font-medium text-white shadow-none transition-transform hover:-translate-y-0.5 hover:bg-neutral-800"
                    style={{ color: "#ffffff" }}
                  >
                    <span style={{ color: "#ffffff" }}>Hablemos de tu negocio</span>
                    <ArrowUpRight className="size-4 text-white" />
                  </a>
                  <a
                    href="#servicios"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[var(--brand-border)] bg-white px-6 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5 hover:border-[var(--brand-strong)]"
                  >
                    Ver casos
                    <ArrowRight className="size-4 text-[var(--brand-strong)]" />
                  </a>
                </div>
              </BlurFade>

              <BlurFade inView delay={0.26}>
                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.78rem] text-muted-foreground/80">
                  <span>Primera conversación sin costo</span>
                  <span className="size-1 rounded-full bg-border" />
                  <span>Respondemos en menos de 24 h</span>
                  <span className="size-1 rounded-full bg-border" />
                  <span>Proyectos en toda la región</span>
                </div>
              </BlurFade>
            </div>

            {/* solo la MacBook, a la derecha */}
            <BlurFade inView delay={0.16}>
              <div className="mx-auto w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[440px]">
                <HeroMacbook />
              </div>
            </BlurFade>
          </div>
        </section>

        <section className="relative left-1/2 w-screen -translate-x-1/2 border-y border-border/70 bg-white py-10 sm:py-12">
          <BlurFade inView>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <p className="text-center text-[0.66rem] uppercase tracking-[0.26em] text-muted-foreground/70">
                Empresas que ya usan nuestros sistemas
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14 lg:gap-x-16">
                {clients.map((client) => (
                  <span
                    key={client}
                    className="text-[0.95rem] font-semibold tracking-[-0.01em] text-slate-400 transition-colors duration-300 hover:text-slate-600 sm:text-[1.05rem]"
                  >
                    {client}
                  </span>
                ))}
              </div>
            </div>
          </BlurFade>
        </section>

        <section className="mx-auto max-w-7xl py-16 sm:py-20">
          <SectionIntro
            label="Por dónde empezar"
            title="Ejemplos de lo que construimos."
            description="No hace falta tener claro qué automatizar. Casi siempre arranca por una de estas."
          />

          <div className="mt-10 grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
            {startingPoints.map((item, index) => (
              <BlurFade key={item.step} inView delay={0.05 * index}>
                <div className="flex items-baseline gap-4 border-t border-border/70 py-6">
                  <span className="font-mono text-[0.72rem] text-muted-foreground/60">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-[1.08rem] font-medium tracking-[-0.03em] text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>

          <BlurFade inView delay={0.32}>
            <p className="mt-8 text-sm leading-7 text-muted-foreground">
              Y si tu caso es otro, también. Partimos del problema, no de la
              herramienta.
            </p>
          </BlurFade>
        </section>

        <MethodSectionV2 />

        <SuccessCasesSection />

        <section className="relative left-1/2 w-screen -translate-x-1/2 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <SectionIntro
              label="Antes / Después"
              title="Menos horas perdidas. Más foco en lo que realmente mueve el negocio."
              description="No es solo tecnología. Cambia la forma en la que se trabaja todos los días."
            />
          </div>

          <div className="mt-10 overflow-hidden border-y border-border/80">
            <div className="grid lg:grid-cols-2">
              <BlurFade inView>
                <div className="flex h-full flex-col items-center justify-center bg-[#eef2e8] px-7 py-12 text-center sm:px-10 sm:py-16 lg:min-h-[32rem] lg:px-14">
                  <div className="w-fit rounded-md bg-neutral-950 px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-white">
                    Sin Spike AI
                  </div>
                  <h3 className="mt-6 max-w-md text-3xl font-medium tracking-[-0.07em] text-balance text-foreground sm:text-[2.6rem] lg:text-[2.85rem] lg:leading-[0.98]">
                    La operación se vuelve más pesada de lo que debería.
                  </h3>
                  <p className="mt-6 max-w-lg text-base leading-8 text-foreground/68 sm:text-lg">
                    Todo depende de tareas manuales, seguimiento y desgaste operativo.
                  </p>

                  <ul className="mt-10 max-w-lg space-y-5 text-left">
                    {comparison.before.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-7 text-foreground/72 sm:text-base">
                        <Clock3 className="mt-1 size-4 shrink-0 text-foreground/42" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </BlurFade>

              <BlurFade inView delay={0.08}>
                <div className="flex h-full flex-col items-center justify-center bg-neutral-950 px-7 py-12 text-center text-white sm:px-10 sm:py-16 lg:min-h-[32rem] lg:px-14">
                  <div className="w-fit rounded-md bg-white/12 px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-white">
                    Con Spike AI
                  </div>
                  <h3 className="mt-6 max-w-md text-3xl font-medium tracking-[-0.07em] text-balance text-white sm:text-[2.6rem] lg:text-[2.85rem] lg:leading-[0.98]">
                    El equipo recupera tiempo para lo que realmente importa.
                  </h3>
                  <p className="mt-6 max-w-lg text-base leading-8 text-white/72 sm:text-lg">
                    El sistema sostiene la operación y el equipo decide sobre información confiable.
                  </p>

                  <ul className="mt-10 max-w-lg space-y-5 text-left">
                    {comparison.after.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-7 text-white/76 sm:text-base">
                        <CircleCheckBig className="mt-1 size-4 shrink-0 text-[var(--brand)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {testimonials.length > 0 ? (
          <section className="mx-auto max-w-7xl py-16 sm:py-20">
            <SectionIntro
              label="Testimonios"
              title="Lo que dicen los que ya trabajan con nosotros."
              description="Clientes con sistemas en producción."
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

        <section
          id="equipo"
          className="relative left-1/2 w-screen -translate-x-1/2 border-y border-border/70 bg-[linear-gradient(180deg,#ffffff_0%,#f4f7f5_100%)] py-20 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-20">
              {/* quienes somos */}
              <BlurFade inView>
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.26em] text-muted-foreground">
                    Quiénes somos
                  </p>

                  <h2 className="mt-5 text-[2.3rem] font-medium leading-[1.02] tracking-[-0.07em] text-balance text-foreground sm:text-[2.9rem]">
                    Somos Facundo{" "}
                    <br />
                    y Gonzalo.
                  </h2>

                  <div className="mt-7 flex items-center gap-4">
                    {team.map((person) => (
                      <a
                        key={person.name}
                        href={person.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-3"
                      >
                        <img
                          src={person.photo}
                          alt={person.name}
                          loading="lazy"
                          className="size-[72px] rounded-full object-cover shadow-[0_18px_40px_-26px_rgba(15,23,42,0.6)] transition-transform duration-300 group-hover:-translate-y-0.5 sm:size-[84px]"
                        />
                        <span className="hidden sm:block">
                          <span className="block text-[0.92rem] font-medium tracking-[-0.02em] text-foreground">
                            {person.name.split(" ")[0]}
                          </span>
                          <span className="block text-[0.76rem] text-muted-foreground">
                            {person.role}
                          </span>
                        </span>
                      </a>
                    ))}
                  </div>

                  <div className="mt-8 max-w-lg space-y-4 text-[1rem] leading-8 text-muted-foreground">
                    <p>
                      Somos dos y trabajamos juntos en cada proyecto. El que te
                      atiende en la primera reunión es el mismo que después
                      escribe el código, así que no hay teléfono descompuesto
                      entre lo que contás y lo que se construye.
                    </p>
                    <p>
                      Nos sentamos con la gente que va a usar el sistema todos
                      los días y los acompañamos hasta que lo manejen sin
                      nosotros. Si tu equipo no lo usa, no sirvió de nada.
                    </p>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-neutral-950 bg-neutral-950 px-6 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 hover:bg-neutral-800"
                      style={{ color: "#ffffff" }}
                    >
                      <span style={{ color: "#ffffff" }}>Hablemos de tu negocio</span>
                      <ArrowUpRight className="size-4 text-white" />
                    </a>
                  </div>
                </div>
              </BlurFade>

              {/* que recibis */}
              <BlurFade inView delay={0.12}>
                <div className="rounded-[2rem] border border-border/80 bg-white p-6 shadow-[0_34px_90px_-70px_rgba(15,23,42,0.4)] sm:p-8">
                  <p className="text-[0.68rem] uppercase tracking-[0.26em] text-muted-foreground">
                    Qué recibís
                  </p>
                  <h3 className="mt-4 text-[1.5rem] font-medium tracking-[-0.05em] text-foreground sm:text-[1.7rem]">
                    Lo mismo en todos los proyectos.
                  </h3>

                  <div className="mt-7 flex flex-col">
                    {deliverables.map((item) => (
                      <div
                        key={item.title}
                        className="flex items-start gap-3.5 border-t border-border/70 py-5 first:border-t-0 first:pt-0"
                      >
                        <CircleCheckBig className="mt-[3px] size-[18px] shrink-0 text-[var(--brand-strong)]" />
                        <div>
                          <h4 className="text-[1rem] font-medium tracking-[-0.03em] text-foreground">
                            {item.title}
                          </h4>
                          <p className="mt-1 text-[0.92rem] leading-7 text-muted-foreground">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
            <SectionIntro
              label="Preguntas frecuentes"
              title="Lo que nos preguntan antes de empezar."
              description="Si algo no está acá, escribinos y te lo contestamos sin vueltas."
            />

            <div className="space-y-2.5">
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
          </div>
        </section>

        <section className="mx-auto max-w-7xl py-16 sm:py-20">
          <BlurFade inView>
            <div className="overflow-hidden rounded-[2.4rem] bg-[var(--brand)] px-6 py-10 text-neutral-950 shadow-[0_30px_90px_-56px_rgba(19,196,85,0.32)] sm:px-10 sm:py-12">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-medium tracking-[-0.07em] text-balance sm:text-5xl">
                  No hace falta empezar con un cambio enorme para empezar a usar IA bien.
                </h2>
                <p className="mt-5 text-base leading-8 text-neutral-950/72 sm:text-lg">
                  A veces alcanza una charla para detectar dónde tiene más sentido automatizar, asistir a tu equipo o empezar a mejorar procesos paso a paso.
                </p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-full border border-neutral-950 bg-neutral-950 px-6 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 hover:bg-neutral-900"
                  style={{ color: "#ffffff" }}
                >
                  <span style={{ color: "#ffffff" }}>Escribirnos</span>
                  <ArrowUpRight className="size-4 text-white" />
                </a>
              </div>
            </div>
          </BlurFade>
        </section>

        <section
          id="contacto"
          className="relative left-1/2 w-screen -translate-x-1/2 border-t border-border/70 bg-white py-10"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <span className="text-[1.05rem] font-semibold tracking-[-0.03em] text-foreground">
                Spike AI
              </span>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                +598 91 315 670
              </a>
              <a
                href="mailto:spike.automations@gmail.com"
                className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                spike.automations@gmail.com
              </a>
              <span className="text-sm text-muted-foreground">Uruguay</span>

              <div className="flex flex-1 items-center justify-start gap-4 sm:justify-end">
                <a
                  href="https://www.linkedin.com/company/spike-automations/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  <svg viewBox="0 0 24 24" className="size-[18px] fill-current" aria-hidden="true">
                    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5ZM.5 8h4V24h-4V8Zm7 0h3.83v2.19h.05c.53-1.01 1.84-2.19 3.79-2.19 4.05 0 4.8 2.67 4.8 6.14V24h-4v-7.08c0-1.69-.03-3.86-2.35-3.86-2.35 0-2.71 1.84-2.71 3.73V24h-4V8Z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/somos.spike/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  <svg viewBox="0 0 24 24" className="size-[18px] fill-current" aria-hidden="true">
                    <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5Zm0 1.8h8.5c2.19 0 3.95 1.76 3.95 3.95v8.5c0 2.19-1.76 3.95-3.95 3.95h-8.5A3.94 3.94 0 0 1 3.8 16.25v-8.5c0-2.19 1.76-3.95 3.95-3.95Zm9.05 1.35a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2ZM12 6.86A5.14 5.14 0 1 0 17.14 12 5.15 5.15 0 0 0 12 6.86Zm0 1.8A3.34 3.34 0 1 1 8.66 12 3.35 3.35 0 0 1 12 8.66Z" />
                  </svg>
                </a>
              </div>
            </div>

            <p className="mt-6 text-[0.78rem] text-muted-foreground/70">
              Sistemas a medida y automatización para empresas que necesitan
              ordenar su operación.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App

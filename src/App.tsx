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
  Sparkles,
  TreePine,
  Workflow,
} from "lucide-react"
import { type CSSProperties, useEffect, useRef, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { BlurFade } from "@/components/ui/blur-fade"
import { DotPattern } from "@/components/ui/dot-pattern"
import { Marquee } from "@/components/ui/marquee"

const navigation = [
  { label: "Servicios", href: "#servicios" },
  { label: "Metodo", href: "#metodo" },
  { label: "Contacto", href: "#contacto" },
]

const caseStudies = [
  {
    title: "Sistema de gestion de alquileres para inmobiliarias",
    eyebrow: "Operacion centralizada",
    description:
      "Unificamos seguimiento comercial, contratos, vencimientos, estado de propiedades y tareas operativas en un solo sistema conectado con automatizaciones reales.",
    icon: Building2,
    result: "Menos seguimiento manual y mas control operativo",
    bullets: [
      "Propiedades, contratos y vencimientos en un solo flujo",
      "Alertas y automatizaciones para tareas repetitivas",
      "Visibilidad completa para equipo comercial y operativo",
    ],
    visualLabel: "Inmobiliarias",
    visualTitle: "Alquileres, seguimiento y operacion en un sistema vivo.",
    visualNodes: ["Leads", "Contratos", "Cobros", "Alertas"],
  },
  {
    title: "IA para conciliacion bancaria y control financiero",
    eyebrow: "Finanzas automatizadas",
    description:
      "Implementamos flujos con IA y reglas operativas para conciliar movimientos, detectar inconsistencias y acelerar cierres sin depender de revisiones eternas.",
    icon: Landmark,
    result: "Menos horas administrativas y mas precision financiera",
    bullets: [
      "Cruce de extractos, facturas y movimientos",
      "Deteccion automatica de diferencias",
      "Base lista para reporting y decision",
    ],
    visualLabel: "Banca y administracion",
    visualTitle: "Conciliar ya no deberia consumir a tu equipo.",
    visualNodes: ["Bancos", "Facturas", "Validacion IA", "Reportes"],
  },
  {
    title: "Asistente de IA contable con contexto y procesos definidos",
    eyebrow: "IA interna para equipos",
    description:
      "Creamos asistentes conectados a documentacion, criterios contables y procedimientos internos para ayudar al equipo en consultas, tareas y validaciones.",
    icon: Workflow,
    result: "Conocimiento operativo disponible en segundos",
    bullets: [
      "Responde sobre normativa y procesos internos",
      "Asiste en tareas repetitivas con contexto real",
      "Reduce dependencia de pocas personas clave",
    ],
    visualLabel: "Estudios y empresas",
    visualTitle: "Un asistente que entiende como trabaja tu empresa.",
    visualNodes: ["Contexto", "Procesos", "Consultas", "Tareas"],
  },
  {
    title: "IA conectada a la base de una inmobiliaria para automatizar y asistir",
    eyebrow: "Acceso inteligente a la informacion",
    description:
      "Conectamos la IA a la base operativa de la inmobiliaria para responder consultas internas, disparar acciones y asistir al equipo con informacion confiable.",
    icon: Database,
    result: "La informacion correcta disponible al instante",
    bullets: [
      "Consultas internas con acceso a datos reales",
      "Automatizaciones disparadas desde la propia base",
      "Asistencia para empleados sin cambiar el flujo diario",
    ],
    visualLabel: "Base conectada",
    visualTitle: "Datos operativos convertidos en acciones utiles.",
    visualNodes: ["Base", "Consultas", "Automatizaciones", "Equipo"],
  },
  {
    title: "Dashboards de rendimiento automatizados para operaciones complejas",
    eyebrow: "BI accionable",
    description:
      "Desarrollamos dashboards vivos para salones de eventos, depositos, barracas, inmobiliarias y empresas de limpieza, con reporting automatico y lectura simple.",
    icon: BarChart3,
    result: "KPIs claros sin perseguir planillas",
    bullets: [
      "Reportes automaticos para multiples areas",
      "KPIs actualizados sin carga manual",
      "Lectura ejecutiva y operativa en el mismo sistema",
    ],
    visualLabel: "Performance",
    visualTitle: "Tu negocio medido sin friccion operativa.",
    visualNodes: ["Ventas", "Ocupacion", "Margen", "Alertas"],
  },
  {
    title: "Reestructuracion de base de datos y reporting para una forestal",
    eyebrow: "Infraestructura de datos",
    description:
      "Ordenamos una base compleja, redefinimos estructura, limpiamos criterios y montamos reporting automatizado para que la operacion deje de depender de parches.",
    icon: TreePine,
    result: "Datos ordenados, trazables y utiles para decidir",
    bullets: [
      "Limpieza y rediseno de estructura de datos",
      "Reporting automatico sobre una base confiable",
      "Menos dependencia de procesos manuales y archivos rotos",
    ],
    visualLabel: "Forestal",
    visualTitle: "Cuando la base se ordena, la operacion cambia.",
    visualNodes: ["Base nueva", "Criterios", "Reporting", "Decision"],
  },
  {
    title: "Landing pages con IA para captar y calificar clientes",
    eyebrow: "Captacion inteligente",
    description:
      "Disenamos landings para marcas de moda y termos con sistemas de IA que responden, filtran y ordenan oportunidades comerciales desde el primer contacto.",
    icon: LayoutTemplate,
    result: "Mas leads utiles y menos tiempo perdido",
    bullets: [
      "Captacion con mejor experiencia de entrada",
      "IA para respuesta y pre-calificacion inicial",
      "Integracion con seguimiento comercial posterior",
    ],
    visualLabel: "Marketing + IA",
    visualTitle: "No solo captar mas. Captar mejor desde el inicio.",
    visualNodes: ["Landing", "Asistente IA", "Leads", "Seguimiento"],
  },
  {
    title: "Y si tu problema es otro, tambien lo podemos resolver con IA",
    eyebrow: "Soluciones a medida",
    description:
      "Si hay un cuello de botella, una operacion trabada o demasiadas tareas que dependen de personas, probablemente haya una forma inteligente de redisenarlo.",
    icon: Sparkles,
    result: "La IA aplicada al problema real de tu empresa",
    bullets: [
      "Partimos del problema, no de la herramienta",
      "Disenamos una solucion modular y escalable",
      "Implementamos segun tu contexto operativo real",
    ],
    visualLabel: "Custom AI",
    visualTitle: "No hace falta que el caso ya exista para resolverlo bien.",
    visualNodes: ["Diagnostico", "Diseno", "Implementacion", "Escala"],
  },
]

const process = [
  {
    step: "01",
    title: "Diagnostico sin costo",
    headline: "Te escuchamos antes de proponer.",
    timing: "30-60 min",
    description:
      "Nos sentamos a charlar sobre tu dia a dia. Analizamos donde estas perdiendo tiempo y dinero, y te proponemos mejoras logicas. Sin compromisos.",
    icon: Search,
    bullets: [
      "Detectamos cuellos de botella concretos",
      "Priorizamos oportunidades reales",
      "Definimos por donde conviene empezar",
    ],
    outcome: "Claridad sobre el primer paso",
  },
  {
    step: "02",
    title: "Micro-implementaciones rapidas",
    headline: "Arrancamos por lo que mas duele.",
    timing: "Resultados en semanas",
    description:
      "No cambiamos toda tu estructura de golpe. Empezamos automatizando una sola tarea critica o mejorando tu web para captar clientes.",
    icon: Workflow,
    bullets: [
      "Automatizamos una tarea critica",
      "Entregamos algo usable rapido",
      "Mostramos impacto sin friccion interna",
    ],
    outcome: "Primer ROI visible",
  },
  {
    step: "03",
    title: "Evolucion continua",
    headline: "Escalamos cuando ves resultados.",
    timing: "Escala modular",
    description:
      "A medida que ves los resultados y tu equipo se adapta de forma natural, seguimos escalando. Tu inversion acompana el crecimiento real del negocio.",
    icon: RefreshCw,
    bullets: [
      "Sumamos modulos solo cuando tiene sentido",
      "El equipo se adapta sin choque brusco",
      "La inversion acompana el crecimiento real",
    ],
    outcome: "Adopcion natural",
  },
  {
    step: "04",
    title: "Ecosistema robusto",
    headline: "Tu empresa corre con IA propia.",
    timing: "Sistema de elite",
    description:
      "Cuando tu empresa esta lista, conectamos todos los puntos. Lo que empieza como herramientas aisladas se unifica en un motor centralizado de IA robusto y seguro.",
    icon: Network,
    bullets: [
      "Unificamos herramientas y datos",
      "Centralizamos la operacion inteligente",
      "Construimos una base lista para escalar",
    ],
    outcome: "Infraestructura conectada",
  },
]

const urgencyCards = [
  {
    title: "Velocidad de respuesta",
    description:
      "Mientras vos seguis filtrando, derivando y respondiendo manualmente, otros ya atienden clientes en segundos.",
  },
  {
    title: "Costo operativo",
    description:
      "Tu competencia ya recorta tareas administrativas repetitivas y libera horas que vos seguis pagando todos los meses.",
  },
  {
    title: "Capacidad para escalar",
    description:
      "Ellos multiplican productividad con la misma estructura. Vos seguis creciendo sobre procesos que no escalan.",
  },
]

const comparison = {
  before: [
    "Tu equipo pierde tiempo en tareas repetitivas.",
    "La operacion se mueve mas lento de lo que deberia.",
    "Tu competencia gana ventaja mientras vos sostienes friccion.",
  ],
  after: [
    "Tu equipo recupera tiempo para pensar y decidir mejor.",
    "La operacion gana velocidad, orden y claridad.",
    "Te adelantas con una estructura mas inteligente.",
  ],
}

const clients = [
  "Castells",
  "Blanco & Etcheverry",
  "Match Carrasco",
  "Kopel Sanchez",
  "Estudio G Pittaluga",
  "HIKE",
  "Proz Recovery",
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
            Nuestro metodo
          </Badge>
          <h2 className="mt-6 text-3xl font-medium tracking-[-0.07em] text-balance text-foreground sm:text-4xl lg:text-[3.05rem] lg:leading-[0.97]">
            La IA como un proceso, no como un salto al vacio.
          </h2>
          <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
            Empezamos por una mejora concreta, la hacemos funcionar rapido y
            despues escalamos. Asi tu empresa adopta IA sin trauma y con
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
                    <div className="max-w-3xl">
                      <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--brand-strong)]/65">
                        Paso {step.step} · {step.timing}
                      </p>
                      <h3 className="mt-5 text-[2.35rem] font-medium leading-[0.95] tracking-[-0.09em] text-foreground sm:text-[2.8rem] lg:text-[4.5rem]">
                        {step.title}
                      </h3>
                      <p className="mt-6 max-w-2xl text-[1rem] leading-8 text-foreground/58 sm:text-[1.08rem] lg:text-[1.18rem] lg:leading-9">
                        {step.description}
                      </p>
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
              Casos de exito
            </Badge>
            <h2 className="mx-auto max-w-4xl text-3xl font-medium tracking-[-0.07em] text-balance text-foreground sm:text-4xl md:text-5xl">
              Implementaciones reales de IA aplicadas a problemas concretos.
            </h2>
            <p className="mx-auto max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
              Un slider interactivo para recorrer algunos de los sistemas,
              asistentes y automatizaciones que ya construimos para distintos
              tipos de operacion.
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
                const Icon = item.icon
                const isActive = loopIndex === centerIndex

                return (
                  <article
                    key={`${item.title}-${loopIndex}`}
                    className={[
                      "w-[920px] flex-shrink-0 rounded-[2rem] border border-border/70 bg-white p-6 text-slate-900 shadow-[0_30px_90px_-70px_rgba(15,23,42,0.25)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] select-none lg:min-h-[35rem] lg:p-7",
                      isActive
                        ? "scale-[1.08] opacity-100"
                        : "scale-[0.84] opacity-100",
                    ].join(" ")}
                    style={{ width: `${slideWidth}px` }}
                  >
                    <div className="grid h-full gap-6 lg:grid-cols-[minmax(0,0.88fr)_minmax(340px,1.12fr)] lg:items-stretch">
                      <div className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-200/70 bg-[radial-gradient(circle_at_top_left,rgba(99,226,143,0.18),transparent_36%),linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)] p-5 lg:p-6">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full border border-white/70 bg-white/80 px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em] text-slate-500">
                            {item.visualLabel}
                          </div>
                        </div>

                        <div className="relative mt-5 flex flex-1 items-center justify-center">
                          <Icon className="size-28 text-slate-400 lg:size-36" />
                        </div>
                      </div>

                      <div className="flex h-full flex-col justify-between py-1">
                        <div>
                          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-slate-500">
                            {item.eyebrow}
                          </p>
                          <h3 className="mt-3 text-[2rem] font-medium leading-[0.98] tracking-[-0.07em] text-slate-900 lg:text-[2.35rem]">
                            {item.title}
                          </h3>
                          <p className="mt-4 text-[1rem] leading-7 text-slate-600 lg:text-[1.02rem]">
                            {item.description}
                          </p>
                        </div>

                        <div className="mt-8 space-y-3">
                          {item.bullets.slice(0, 3).map((bullet) => (
                            <div key={`${item.title}-${loopIndex}-${bullet}`} className="flex items-start gap-2.5 text-sm leading-6 text-slate-700 lg:text-[0.96rem]">
                              <CircleCheckBig className="mt-1 size-4 shrink-0 text-[var(--brand-strong)]" />
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-8 border-t border-slate-200/80 pt-4">
                          <p className="text-sm leading-6 text-slate-500 lg:text-[0.96rem]">
                            {item.result}
                          </p>
                        </div>
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

        <section className="relative mx-auto flex min-h-[calc(100vh-5.5rem)] max-w-7xl items-center pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
          <div className="grid w-full gap-14 lg:grid-cols-[minmax(0,0.88fr)_minmax(340px,0.92fr)] lg:items-center">
            <BlurFade inView delay={0.05}>
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                  Uruguay - AI automation studio
                </p>
                <h1 className="mt-5 text-6xl font-light tracking-[-0.12em] text-foreground sm:text-7xl md:text-8xl xl:text-[9rem] xl:leading-[0.9]">
                  Spike AI
                </h1>
              </div>
            </BlurFade>

            <div className="space-y-8 lg:pl-4">
              <div className="max-w-xl">
                <BlurFade inView delay={0.14}>
                  <h2 className="text-4xl font-medium tracking-[-0.1em] text-balance text-foreground sm:text-5xl lg:text-[3.4rem] lg:leading-[0.96]">
                    Tu competencia ya esta usando{" "}
                    <span className="text-[var(--brand-strong)]">IA.</span> No te
                    quedes atras.
                  </h2>
                </BlurFade>

                <BlurFade inView delay={0.2}>
                  <p className="mt-4 text-base leading-8 text-muted-foreground sm:text-lg">
                    El mundo empresarial se automatiza a velocidad record. En Spike
                    AI te ayudamos a dar el paso sin complicaciones, sin presupuestos
                    millonarios y a traves de un proceso de adaptacion constante.
                  </p>
                </BlurFade>

                <BlurFade inView delay={0.26}>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-neutral-950 bg-neutral-950 px-6 text-sm font-medium text-white shadow-none transition-transform hover:-translate-y-0.5 hover:bg-neutral-800"
                      style={{ color: "#ffffff" }}
                    >
                      <span style={{ color: "#ffffff" }}>Diagnostico gratuito</span>
                      <ArrowUpRight className="size-4 text-white" />
                    </a>
                    <a
                      href="#servicios"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[var(--brand-border)] bg-white px-6 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5 hover:border-[var(--brand-strong)]"
                    >
                      Ver servicios
                      <ArrowRight className="size-4 text-[var(--brand-strong)]" />
                    </a>
                  </div>
                </BlurFade>

              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl py-8 sm:py-10">
          <BlurFade inView>
            <div className="overflow-hidden rounded-[1.8rem] border border-border/80 bg-white/80 py-4">
              <div className="px-5 text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground sm:px-6">
                Empresas que ya confiaron
              </div>
              <Marquee pauseOnHover className="[--duration:28s] mt-3">
                {clients.map((client) => (
                  <div
                    key={client}
                    className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground/80"
                  >
                    {client}
                  </div>
                ))}
              </Marquee>
            </div>
          </BlurFade>
        </section>

        <section className="mx-auto max-w-7xl py-16 sm:py-20">
          <BlurFade inView>
            <div className="rounded-[2.5rem] border border-neutral-300/85 bg-neutral-100/72 backdrop-blur-xl px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="mt-6 text-3xl font-medium tracking-[-0.08em] text-balance text-foreground sm:text-5xl lg:text-[3.45rem] lg:leading-[0.95]">
                  El verdadero peligro para tu empresa
                  <br className="hidden sm:block" />
                  no es la Inteligencia Artificial.{" "}
                  <span className="text-[var(--brand-strong)]">
                    <br className="hidden sm:block" />
                    Es que tus competidores la adopten antes que tu.
                  </span>
                </h2>
                <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                  Reducir costos, responder a clientes en segundos y multiplicar la
                  productividad ya no es opcional. Quienes no empiecen la
                  transicion hoy, manana van a jugar con desventaja.
                </p>
              </div>

              <div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-3 sm:gap-4 lg:mt-12">
                {urgencyCards.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.5rem] border border-white/90 bg-white/92 px-5 py-5 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.22)] transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="text-[0.76rem] font-bold uppercase tracking-[0.18em] text-foreground">
                      {item.title}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-foreground/82 sm:text-[0.95rem]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </BlurFade>
        </section>

        <MethodSectionV2 />

        <SuccessCasesSection />

        <section className="relative left-1/2 w-screen -translate-x-1/2 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <SectionIntro
              label="Antes / Despues"
              title="Menos horas perdidas. Mas foco en lo que realmente mueve el negocio."
              description="La diferencia no es tecnologica solamente. Cambia la forma en la que opera tu empresa."
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
                    La operacion se vuelve mas pesada de lo que deberia.
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
                    La IA libera capacidad para decidir mejor y ejecutar con mas claridad.
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

        <section className="mx-auto max-w-7xl py-16 sm:py-20">
          <BlurFade inView>
            <div className="overflow-hidden rounded-[2.4rem] bg-[var(--brand)] px-6 py-10 text-neutral-950 shadow-[0_30px_90px_-56px_rgba(19,196,85,0.32)] sm:px-10 sm:py-12">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-medium tracking-[-0.07em] text-balance sm:text-5xl">
                  No hace falta empezar con un cambio enorme para empezar a usar IA bien.
                </h2>
                <p className="mt-5 text-base leading-8 text-neutral-950/72 sm:text-lg">
                  A veces alcanza una charla para detectar donde tiene mas sentido automatizar, asistir a tu equipo o empezar a mejorar procesos paso a paso.
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
          className="relative left-1/2 w-screen -translate-x-1/2 bg-neutral-950 py-14 text-white sm:py-16"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
              <div>
                <div className="text-[0.68rem] uppercase tracking-[0.22em] text-white/46">
                  Contacto
                </div>
                <h2 className="mt-4 max-w-xl text-3xl font-medium tracking-[-0.07em] text-balance text-white sm:text-5xl">
                  Hablemos de tu operacion.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
                  Si ves friccion, tareas manuales o procesos que ya no escalan, escribinos y vemos por donde conviene empezar.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  {
                    label: "WhatsApp",
                    value: "+598 91 315 670",
                    href: whatsappHref,
                  },
                  {
                    label: "Email",
                    value: "eyp.automation@gmail.com",
                    href: "mailto:eyp.automation@gmail.com",
                  },
                  {
                    label: "Base",
                    value: "Uruguay - proyectos en toda la region",
                    href: undefined,
                  },
                ].map((item) => {
                  const content = (
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/6 px-4 py-4 transition-colors duration-300 hover:bg-white/9">
                      <div className="text-[0.68rem] uppercase tracking-[0.2em] text-white/46">
                        {item.label}
                      </div>
                      <div className="mt-2 text-sm font-medium leading-6 text-white/88">
                        {item.value}
                      </div>
                    </div>
                  )

                  return item.href ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={item.label}>{content}</div>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col gap-5 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-white/46">
                <p>Spike AI</p>
                <p className="mt-1">Automatizacion inteligente para empresas que quieren moverse antes.</p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/72 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5ZM.5 8h4V24h-4V8Zm7 0h3.83v2.19h.05c.53-1.01 1.84-2.19 3.79-2.19 4.05 0 4.8 2.67 4.8 6.14V24h-4v-7.08c0-1.69-.03-3.86-2.35-3.86-2.35 0-2.71 1.84-2.71 3.73V24h-4V8Z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/72 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                    <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5Zm0 1.8h8.5c2.19 0 3.95 1.76 3.95 3.95v8.5c0 2.19-1.76 3.95-3.95 3.95h-8.5A3.94 3.94 0 0 1 3.8 16.25v-8.5c0-2.19 1.76-3.95 3.95-3.95Zm9.05 1.35a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2ZM12 6.86A5.14 5.14 0 1 0 17.14 12 5.15 5.15 0 0 0 12 6.86Zm0 1.8A3.34 3.34 0 1 1 8.66 12 3.35 3.35 0 0 1 12 8.66Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App

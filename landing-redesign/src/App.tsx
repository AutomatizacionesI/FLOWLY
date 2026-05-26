import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CircleCheckBig,
  Clock3,
  Layers3,
  MapPinned,
  MessageSquareMore,
  Network,
  RefreshCw,
  Search,
  Workflow,
} from "lucide-react"

import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
import { Badge } from "@/components/ui/badge"
import { BlurFade } from "@/components/ui/blur-fade"
import { DotPattern } from "@/components/ui/dot-pattern"
import { MagicCard } from "@/components/ui/magic-card"
import { Marquee } from "@/components/ui/marquee"
import { Separator } from "@/components/ui/separator"

const navigation = [
  { label: "Servicios", href: "#servicios" },
  { label: "Soluciones", href: "#soluciones" },
  { label: "Metodo", href: "#metodo" },
  { label: "Equipo", href: "#equipo" },
  { label: "Contacto", href: "#contacto" },
]

const services = [
  {
    title: "Automatizacion RPA",
    eyebrow: "Tu equipo, sin tareas repetitivas",
    description:
      "Bots para carga de datos, reportes, facturacion y monitoreo continuo conectados con los sistemas que tu empresa ya usa.",
    icon: Workflow,
    accent: "text-[var(--brand-strong)]",
    bullets: [
      "Migracion y carga de datos",
      "Reportes y facturacion automatizados",
      "Conexion con software existente",
      "Alertas y monitoreo en tiempo real",
    ],
  },
  {
    title: "Inteligencia artificial",
    eyebrow: "IA que trabaja con tus datos",
    description:
      "Agentes, chatbots, lectura documental y modelos predictivos entrenados sobre la operacion concreta de cada negocio.",
    icon: Bot,
    accent: "text-[var(--brand-strong)]",
    bullets: [
      "Agentes con IA generativa",
      "Prediccion de tendencias",
      "Lectura automatica de PDFs y contratos",
      "BI con insights automaticos",
    ],
  },
  {
    title: "Desarrollo a medida",
    eyebrow: "La herramienta exacta para tu negocio",
    description:
      "Plataformas web, dashboards e integraciones hechas para resolver cuellos de botella reales con entregas visibles.",
    icon: Layers3,
    accent: "text-[var(--brand-strong)]",
    bullets: [
      "Plataformas y dashboards personalizados",
      "Integraciones via APIs y webhooks",
      "Automatizaciones sin codigo",
      "Resultados visibles semana a semana",
    ],
  },
]

const solutions = [
  {
    title: "Finanzas automaticas",
    description:
      "Conciliacion bancaria, facturas, seguimiento de pagos y reportes financieros sin pasos manuales.",
  },
  {
    title: "Data & Business Intelligence",
    description:
      "Dashboards en tiempo real con KPIs, alertas y reportes distribuidos sin friccion operativa.",
  },
  {
    title: "Ecosistemas de gestion",
    description:
      "Herramientas conectadas en un solo flujo para evitar duplicados, retrasos y datos inconsistentes.",
  },
  {
    title: "Asistentes cognitivos",
    description:
      "Agentes que atienden consultas, califican leads y procesan solicitudes las 24 horas.",
  },
]

const process = [
  {
    step: "01",
    title: "Diagnostico sin costo",
    timing: "30-60 min",
    description:
      "Nos sentamos a charlar sobre tu dia a dia. Analizamos donde estas perdiendo tiempo y dinero, y te proponemos mejoras logicas. Sin compromisos.",
    icon: Search,
  },
  {
    step: "02",
    title: "Micro-implementaciones rapidas",
    timing: "Resultados en semanas",
    description:
      "No cambiamos toda tu estructura de golpe. Empezamos automatizando una sola tarea critica o mejorando tu web para captar clientes.",
    icon: Workflow,
  },
  {
    step: "03",
    title: "Evolucion continua",
    timing: "Escala modular",
    description:
      "A medida que ves los resultados y tu equipo se adapta de forma natural, seguimos escalando. Tu inversion acompana el crecimiento real del negocio.",
    icon: RefreshCw,
  },
  {
    step: "04",
    title: "Ecosistema robusto",
    timing: "Sistema de elite",
    description:
      "Cuando tu empresa esta lista, conectamos todos los puntos. Lo que empieza como herramientas aisladas se unifica en un motor centralizado de IA robusto y seguro.",
    icon: Network,
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
    "Horas perdidas cada semana en tareas manuales.",
    "Errores costosos por intervencion humana repetitiva.",
    "Informacion dispersa entre planillas, correos y sistemas.",
    "Crecimiento frenado por capacidad operativa limitada.",
  ],
  after: [
    "82% menos tiempo operativo para enfocarse en decisiones estrategicas.",
    "94% de precision en ejecucion automatizada.",
    "Reportes automaticos en menos de 60 segundos.",
    "3.1x mas capacidad sin sumar estructura operativa extra.",
  ],
}

const industries = [
  "Inmobiliarias",
  "Contabilidad",
  "Finanzas",
  "Retail",
  "Salud",
  "Legal",
]

const clients = [
  "Castells",
  "Blanco & Etcheverry",
  "Match Carrasco",
  "Kopel Sanchez",
  "Estudio G Pittaluga",
  "HIKE",
  "Proz Recovery",
]

const founders = [
  {
    name: "Facundo Etcheverry",
    role: "Co-founder - Sistemas & Automatizacion",
    description:
      "Arquitectura de automatizaciones RPA, integraciones complejas y desarrollo de agentes de IA.",
  },
  {
    name: "Gonzalo Pittaluga",
    role: "Co-founder - Datos & Estrategia",
    description:
      "Inteligencia de negocios, dashboards estrategicos y modelos predictivos orientados a operacion.",
  },
]

const implementationStack = [
  "Agentes con IA",
  "Integraciones API",
  "BI en tiempo real",
  "Automatizacion RPA",
]

const whatsappHref =
  "https://wa.me/59891315670?text=Hola%20Spike%20AI%2C%20quiero%20automatizar%20mi%20negocio"

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

function App() {
  return (
    <main className="relative overflow-x-hidden text-foreground">
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

        <section id="metodo" className="mx-auto max-w-7xl py-16 sm:py-20">
          <SectionIntro
            label="Nuestro Metodo"
            title="La IA como un proceso, no como un salto al vacio."
            description="Empezamos por lo obvio, entregamos mejoras visibles rapido y recien despues escalamos. Asi la adopcion de IA deja de ser una apuesta y pasa a ser un proceso."
          />

          <div className="relative mt-12">
            <div className="absolute left-8 right-8 top-8 hidden h-px bg-border lg:block" />
            <div className="grid gap-5 lg:grid-cols-4">
            {process.map((step, index) => (
              <BlurFade key={step.step} inView delay={0.08 * index}>
                <MagicCard
                  className="h-full rounded-[1.8rem]"
                  gradientColor="#f8fafc"
                  gradientFrom="#e5e7eb"
                  gradientTo="#dbeafe"
                >
                  <article className="relative rounded-[1.75rem] bg-white p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex size-10 items-center justify-center rounded-full border border-[var(--brand-border)] bg-white text-[var(--brand-strong)]">
                        <step.icon className="size-4.5" />
                      </div>
                      <span className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                        Paso {step.step}
                      </span>
                    </div>
                    <div className="mt-6">
                      <Badge
                        variant="outline"
                        className="border-border bg-secondary px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground"
                      >
                        {step.timing}
                      </Badge>
                    </div>
                    <h3 className="mt-5 text-2xl font-medium tracking-[-0.06em]">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-muted-foreground">
                      {step.description}
                    </p>
                  </article>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
          </div>
        </section>

        <section id="servicios" className="mx-auto max-w-7xl py-16 sm:py-20">
          <SectionIntro
            label="Servicios"
            title="Una capa operativa nueva para negocios que ya no quieren crecer con friccion."
            description="Disenamos sistemas que absorben trabajo manual, conectan herramientas y convierten datos dispersos en capacidad operativa real."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon

              return (
                <BlurFade key={service.title} inView delay={0.08 * index}>
                  <MagicCard
                    className="h-full rounded-[2rem]"
                    gradientColor="#eff6ff"
                    gradientFrom="#e5e7eb"
                    gradientTo="#dbeafe"
                  >
                    <article className="group rounded-[1.95rem] bg-white p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-4">
                          <Badge
                            variant="outline"
                            className="border-border bg-secondary px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground"
                          >
                            {service.eyebrow}
                          </Badge>
                          <h3 className="text-2xl font-medium tracking-[-0.06em]">
                            {service.title}
                          </h3>
                        </div>
                        <div className="rounded-2xl border border-border bg-white p-3 transition-transform duration-300 group-hover:-translate-y-1 group-hover:border-[var(--brand-strong)]">
                          <Icon className={`size-5 ${service.accent}`} />
                        </div>
                      </div>

                      <p className="mt-5 text-base leading-7 text-muted-foreground">
                        {service.description}
                      </p>

                      <ul className="mt-7 space-y-3">
                        {service.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3 text-sm leading-6">
                            <CircleCheckBig className="mt-0.5 size-4 shrink-0 text-[var(--brand-strong)]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </MagicCard>
                </BlurFade>
              )
            })}
          </div>
        </section>

        <section id="soluciones" className="mx-auto max-w-7xl py-16 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
            <BlurFade inView className="h-full">
              <div className="relative h-full overflow-hidden rounded-[2.2rem] border border-neutral-900 bg-neutral-950 px-7 py-8 text-white sm:px-9 sm:py-10">
                <AnimatedGridPattern
                  numSquares={18}
                  maxOpacity={0.16}
                  duration={5}
                  repeatDelay={0.8}
                  className="absolute inset-0 h-full w-full text-white/20 [mask-image:radial-gradient(420px_circle_at_top,white,transparent)]"
                />
                <div className="relative z-10">
                  <Badge className="rounded-full border-white/15 bg-white/10 px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em] text-white/80">
                    Casos de uso
                  </Badge>
                  <h2 className="mt-6 max-w-lg text-3xl font-medium tracking-[-0.06em] text-balance sm:text-4xl">
                    Soluciones de alto impacto para equipos que necesitan operar mas rapido.
                  </h2>
                  <p className="mt-5 max-w-lg text-base leading-7 text-white/72">
                    No vendemos piezas sueltas. Disenamos sistemas donde automatizacion,
                    IA e integraciones trabajan juntas sobre el cuello de botella real.
                  </p>

                  <div className="mt-9 grid gap-3 sm:grid-cols-2">
                    {implementationStack.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white/78"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </BlurFade>

            <div className="grid gap-4">
              {solutions.map((solution, index) => (
                <BlurFade key={solution.title} inView delay={0.08 * index}>
                  <MagicCard
                    className="rounded-[1.7rem]"
                    gradientColor="#eff6ff"
                    gradientFrom="#e5e7eb"
                    gradientTo="#bae6fd"
                  >
                    <article className="group rounded-[1.65rem] bg-white p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
                            Solucion {index + 1}
                          </div>
                          <h3 className="mt-3 text-xl font-medium tracking-[-0.05em]">
                            {solution.title}
                          </h3>
                        </div>
                        <ArrowUpRight className="mt-1 size-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                      <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                        {solution.description}
                      </p>
                    </article>
                  </MagicCard>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl py-16 sm:py-20">
          <SectionIntro
            label="Antes / Despues"
            title="Menos horas perdidas. Mas visibilidad. Mas foco en decisiones."
            description="La diferencia no es solo tecnologica: cambia el ritmo operativo completo del negocio."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <BlurFade inView>
              <div className="rounded-[2rem] border border-border bg-white p-6">
                <div className="w-fit rounded-full border border-border bg-secondary px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Sin Spike AI
                </div>
                <ul className="mt-6 space-y-4">
                  {comparison.before.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-7 text-muted-foreground sm:text-base">
                      <Clock3 className="mt-1 size-4 shrink-0 text-foreground/45" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </BlurFade>

            <BlurFade inView delay={0.1}>
              <div className="rounded-[2rem] border border-neutral-900 bg-neutral-950 p-6 text-white">
                <div className="w-fit rounded-full border border-white/14 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/78">
                  Con Spike AI
                </div>
                <ul className="mt-6 space-y-4">
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
        </section>

        <section id="industrias" className="mx-auto max-w-7xl py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <SectionIntro
              label="Industrias"
              title="Experiencia en operaciones con mucha repeticion, coordinacion y volumen de datos."
              description="Trabajamos con organizaciones que sienten la friccion en procesos, seguimiento, documentacion y reporting."
            />

            <BlurFade inView>
              <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-5">
                <DotPattern className="[mask-image:radial-gradient(340px_circle_at_center,white,transparent)] opacity-50" />
                <div className="relative z-10 grid gap-4 sm:grid-cols-2">
                  {industries.map((industry) => (
                    <div
                      key={industry}
                      className="rounded-[1.4rem] border border-border bg-white px-5 py-5 text-base font-medium tracking-[-0.03em] transition-transform duration-300 hover:-translate-y-1"
                    >
                      {industry}
                    </div>
                  ))}
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        <section id="equipo" className="mx-auto max-w-7xl py-16 sm:py-20">
          <SectionIntro
            label="Equipo"
            title="Dos perfiles complementarios para disenar automatizacion con criterio tecnico y de negocio."
            description="Spike AI combina arquitectura de sistemas, integraciones, datos y estrategia para construir soluciones con impacto medible."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {founders.map((founder, index) => (
              <BlurFade key={founder.name} inView delay={0.08 * index}>
                <MagicCard
                  className="h-full rounded-[2rem]"
                  gradientColor="#f8fafc"
                  gradientFrom="#e5e7eb"
                  gradientTo="#dbeafe"
                >
                  <article className="rounded-[1.95rem] bg-white p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-medium tracking-[-0.06em]">
                          {founder.name}
                        </h3>
                        <p className="mt-2 text-sm uppercase tracking-[0.18em] text-muted-foreground">
                          {founder.role}
                        </p>
                      </div>
                      <div className="rounded-full border border-border bg-white p-3">
                        <MapPinned className="size-5 text-[var(--brand-strong)]" />
                      </div>
                    </div>
                    <p className="mt-6 text-base leading-7 text-muted-foreground">
                      {founder.description}
                    </p>
                  </article>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        </section>

        <section id="contacto" className="mx-auto max-w-7xl py-16 sm:py-20">
          <BlurFade inView>
            <div className="relative overflow-hidden rounded-[2.4rem] border border-neutral-900 bg-neutral-950 px-6 py-8 text-white shadow-[0_34px_100px_-52px_rgba(15,23,42,0.58)] sm:px-10 sm:py-10">
              <AnimatedGridPattern
                numSquares={22}
                maxOpacity={0.14}
                duration={5}
                repeatDelay={1}
                className="absolute inset-0 h-full w-full text-white/20 [mask-image:radial-gradient(580px_circle_at_top,white,transparent)]"
              />
              <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-end">
                <div>
                  <Badge className="rounded-full border-white/14 bg-white/10 px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em] text-white/78">
                    Contacto
                  </Badge>
                  <h2 className="mt-6 max-w-3xl text-3xl font-medium tracking-[-0.06em] text-balance sm:text-5xl">
                    Si hoy tu operacion depende de tareas manuales, ahi ya hay una oportunidad.
                  </h2>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
                    Agenda una reunion de diagnostico gratuita de 30 minutos y detectemos
                    juntos donde ganar tiempo, precision y capacidad.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white bg-white px-6 text-sm font-medium text-neutral-950 transition-transform hover:-translate-y-0.5 hover:bg-white/90"
                    >
                      Hablar por WhatsApp
                      <MessageSquareMore className="size-4" />
                    </a>
                    <a
                      href="mailto:eyp.automation@gmail.com"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/16 bg-white/8 px-6 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 hover:bg-white/12"
                    >
                      Escribir por email
                      <ArrowRight className="size-4" />
                    </a>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/8 p-5">
                  <AnimatedGridPattern
                    numSquares={10}
                    maxOpacity={0.12}
                    duration={4}
                    repeatDelay={0.6}
                    className="absolute inset-0 h-full w-full text-white/20 [mask-image:radial-gradient(260px_circle_at_center,white,transparent)]"
                  />
                  <div className="relative z-10 space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-4 text-sm">
                      <div className="text-white/56">WhatsApp</div>
                      <div className="mt-1 font-medium text-white">+598 91 315 670</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-4 text-sm">
                      <div className="text-white/56">Email</div>
                      <div className="mt-1 font-medium text-white">eyp.automation@gmail.com</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-4 text-sm">
                      <div className="text-white/56">Base</div>
                      <div className="mt-1 font-medium text-white">Uruguay - proyectos en toda la region</div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-8 bg-white/10" />

              <div className="relative z-10 flex flex-col gap-3 text-sm text-white/58 sm:flex-row sm:items-center sm:justify-between">
                <p>Spike AI - Automatizacion inteligente para empresas que escalan.</p>
                <p>Diagnostico sin costo - respuesta en menos de 24 hs</p>
              </div>
            </div>
          </BlurFade>
        </section>
      </div>
    </main>
  )
}

export default App

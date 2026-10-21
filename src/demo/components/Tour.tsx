import { ArrowRight, X } from "lucide-react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { CONTACT_LABEL, whatsappHref } from "../config"
import { isBuilt } from "../screens"
import { useDemo } from "../state/DemoContext"

/**
 * Recorrido guiado: lineal, se puede saltar en cualquier momento y se repite
 * desde "Ver recorrido". Cada paso lleva a su pantalla y explica qué mirar.
 *
 * Si alguna vez una ruta deja de existir, su paso se saltea solo: así el
 * recorrido nunca lleva a una pantalla que no está.
 */

type Step = {
  /** Pantalla a la que lleva el paso. */
  to: string
  title: string
  body: string
}

const allSteps: Step[] = [
  {
    to: "resumen",
    title: "El estado del estudio",
    body: "Acá ves el estado del estudio de un vistazo: clientes, tareas, horas y vencimientos.",
  },
  {
    to: "resumen",
    title: "Socio o contador",
    body: "Arriba está el interruptor de vista. Cambialo cuando quieras, en cualquier pantalla, y mirá cómo cambian los datos, los botones y hasta el menú.",
  },
  {
    to: "conciliacion",
    title: "Conciliación bancaria",
    body: "Probá correr una conciliación con los archivos de ejemplo. El sistema empareja solo y te deja revisar lo dudoso.",
  },
  {
    to: "facturas",
    title: "Facturas con IA",
    body: "Elegí una factura y dejá que la IA la lea. Vos solo revisás y confirmás.",
  },
  {
    to: "asistente",
    title: "El asistente del estudio",
    body: "Preguntale lo que quieras sobre el estudio. Responde con la información de la empresa: datos, documentos y procedimientos.",
  },
]

export function Tour() {
  const { tourStep, setTourStep, para } = useDemo()
  const navigate = useNavigate()

  const steps = allSteps.filter((step) => isBuilt(step.to))
  const last = steps.length // el paso de cierre va después del último

  const active = tourStep !== null && tourStep >= 0 && tourStep <= last
  const step = tourStep !== null && tourStep < last ? steps[tourStep] : null

  // Cada paso lleva a su pantalla.
  useEffect(() => {
    if (step) navigate(step.to)
  }, [step, navigate])

  useEffect(() => {
    if (!active) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setTourStep(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [active, setTourStep])

  if (!active) return null

  /* ── Cierre ───────────────────────────────────────────────────── */
  if (tourStep === last) {
    return (
      <div className="d-tour" role="dialog" aria-label="Fin del recorrido">
        <div className="d-tour__head">
          <span className="d-tour__count">Fin del recorrido</span>
          <button
            type="button"
            className="d-tour__close"
            onClick={() => setTourStep(null)}
            aria-label="Cerrar el recorrido"
          >
            <X size={14} />
          </button>
        </div>

        <h3 className="d-tour__title">Eso fue un adelanto… y hay mucho más</h3>
        <p className="d-tour__body">
          Quedaron sin recorrer los extractos, los asientos desde CFE, el reporte de horas, el
          tablero de socios y las herramientas. Y acordate: el interruptor Socio / Contador de
          arriba funciona en todas las pantallas, probá cambiarlo mientras mirás.
        </p>
        <p className="d-tour__body" style={{ marginTop: 9 }}>
          ¿Cómo se vería esto en tu estudio?
        </p>

        <div className="d-tour__actions">
          <a
            className="d-btn d-btn--cta d-btn--sm"
            href={whatsappHref(para)}
            target="_blank"
            rel="noreferrer"
            onClick={() => setTourStep(null)}
          >
            {CONTACT_LABEL}
          </a>
          <button
            type="button"
            className="d-btn d-btn--sm"
            style={{ background: "rgba(255,255,255,.14)", color: "#fff" }}
            onClick={() => setTourStep(null)}
          >
            Seguir explorando
          </button>
        </div>
      </div>
    )
  }

  if (!step) return null

  return (
    <div className="d-tour" role="dialog" aria-label={`Paso ${tourStep! + 1} del recorrido`}>
      <div className="d-tour__head">
        <span className="d-tour__count">
          Paso {tourStep! + 1} de {steps.length}
        </span>
        <button
          type="button"
          className="d-tour__close"
          onClick={() => setTourStep(null)}
          aria-label="Saltar el recorrido"
        >
          <X size={14} />
        </button>
      </div>

      <h3 className="d-tour__title">{step.title}</h3>
      <p className="d-tour__body">{step.body}</p>

      <div className="d-tour__actions">
        <button
          type="button"
          className="d-btn d-btn--sm"
          style={{ background: "#fff", color: "var(--d-ink)" }}
          onClick={() => setTourStep(tourStep! + 1)}
        >
          {tourStep! + 1 === steps.length ? "Terminar" : "Siguiente"}
          <ArrowRight size={13} />
        </button>
        <button
          type="button"
          className="d-btn d-btn--sm"
          style={{ color: "rgba(255,255,255,.72)" }}
          onClick={() => setTourStep(null)}
        >
          Saltar
        </button>
      </div>
    </div>
  )
}

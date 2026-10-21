import { ArrowRight, Check } from "lucide-react"
import { Link } from "react-router-dom"

import { CONTACT_LABEL, texts, whatsappHref } from "../config"
import { useDemo } from "../state/DemoContext"

/*
 * Página corta a propósito: se lee en menos de un minuto.
 * La prueba va en el titular, no escondida en una tarjeta al pie.
 * Los tres pasos usan la redacción de la landing de Spike.
 */

const steps = [
  {
    step: "01",
    title: "Diagnóstico sin costo",
    timing: "30 a 60 minutos",
    body: "Te escuchamos antes de proponer. Sin compromisos.",
  },
  {
    step: "02",
    title: "Prototipo",
    timing: "Resultados en semanas",
    body: "Arrancamos por lo que más duele y lo ves andando con tus datos.",
  },
  {
    step: "03",
    title: "Implementación",
    timing: "Escala modular",
    body: "Sumamos módulos a medida que el equipo se adapta.",
  },
]

const blocks = [
  ["Escuchamos cómo trabajan hoy", "Entendemos tu proceso antes de proponer nada."],
  ["Lo adaptamos a tu estudio", "Tu banco, tu sistema contable, tus roles. Un módulo a la vez."],
  ["Y si necesitás otra cosa, la armamos", "Cualquier automatización que te saque trabajo repetitivo."],
]

const questions = [
  "¿Qué sistema contable usan?",
  "¿Con qué bancos concilian?",
  "¿Cómo llevan hoy las horas y las tareas?",
  "¿Qué tarea del mes les consume más tiempo?",
]

const faq = [
  ["¿Estos datos son reales?", "No: todo lo que viste es de ejemplo."],
  ["¿Dónde viven mis datos?", "Lo definimos juntos: dónde se alojan y quién accede."],
  ["¿Tengo que cambiar todo de una vez?", "No: se arranca por el módulo que más te duele."],
]

export function TrabajemosJuntos() {
  const { para } = useDemo()

  return (
    <>
      {/* ── Titular: la prueba va acá ────────────────────────────── */}
      <div className="d-card d-card--green" style={{ padding: "30px 28px" }}>
        <span className="d-chip">Esto no es una maqueta</span>
        <h1
          style={{
            marginTop: 14,
            maxWidth: 740,
            fontSize: 27,
            fontWeight: 700,
            letterSpacing: "-0.035em",
            lineHeight: 1.22,
          }}
        >
          {texts.proof}
        </h1>
        <p
          style={{
            marginTop: 12,
            maxWidth: 580,
            fontSize: 14,
            lineHeight: 1.6,
            color: "rgba(255,255,255,.8)",
          }}
        >
          Lo que recorriste es un ejemplo con datos inventados. Tu estudio tiene sus propios
          problemas: contanos cuáles.
        </p>

        <a
          className="d-btn d-btn--cta"
          style={{ marginTop: 20 }}
          href={whatsappHref(para)}
          target="_blank"
          rel="noreferrer"
        >
          {CONTACT_LABEL}
          <ArrowRight size={14} />
        </a>
      </div>

      {/* ── Qué hacemos ──────────────────────────────────────────── */}
      <div className="d-grid d-grid--3">
        {blocks.map(([title, body]) => (
          <div key={title} className="d-card">
            <div className="d-card__title">{title}</div>
            <p className="d-muted" style={{ marginTop: 7, fontSize: 12.5, lineHeight: 1.6 }}>
              {body}
            </p>
          </div>
        ))}
      </div>

      {/* ── Cómo trabajamos + para la llamada ────────────────────── */}
      <div className="d-grid d-grid--main">
        <div className="d-card">
          <div className="d-card__head">
            <div className="d-card__title">Cómo trabajamos</div>
          </div>

          <div
            className="d-grid"
            style={{ marginTop: 0, gridTemplateColumns: "repeat(auto-fit, minmax(168px, 1fr))" }}
          >
            {steps.map((item) => (
              <div key={item.step} className="d-card d-card--flat">
                <div className="d-row">
                  <span
                    className="d-num"
                    style={{
                      display: "grid",
                      width: 26,
                      height: 26,
                      placeItems: "center",
                      borderRadius: 8,
                      background: "var(--d-green)",
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {item.step}
                  </span>
                  <span className="d-chip">{item.timing}</span>
                </div>
                <div style={{ marginTop: 11, fontSize: 13.5, fontWeight: 600 }}>{item.title}</div>
                <p className="d-muted" style={{ marginTop: 5, fontSize: 12.5, lineHeight: 1.55 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="d-card" style={{ alignSelf: "start" }}>
          <div className="d-card__head">
            <div>
              <div className="d-card__title">Para la llamada</div>
              <div className="d-card__sub">Cuatro respuestas, sin formulario</div>
            </div>
          </div>

          <ul style={{ display: "grid", gap: 10 }}>
            {questions.map((question) => (
              <li key={question} className="d-row" style={{ alignItems: "flex-start", gap: 9 }}>
                <span
                  style={{
                    display: "grid",
                    width: 19,
                    height: 19,
                    flexShrink: 0,
                    placeItems: "center",
                    borderRadius: 999,
                    background: "var(--d-green-soft)",
                    color: "var(--d-green)",
                  }}
                >
                  <Check size={11} />
                </span>
                <span style={{ fontSize: 13 }}>{question}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Preguntas frecuentes ─────────────────────────────────── */}
      <div className="d-grid d-grid--3">
        {faq.map(([question, answer]) => (
          <div key={question} className="d-card d-card--flat">
            <div style={{ fontSize: 13, fontWeight: 600 }}>{question}</div>
            <p className="d-muted" style={{ marginTop: 6, fontSize: 12.5, lineHeight: 1.55 }}>
              {answer}
            </p>
          </div>
        ))}
      </div>

      {/* ── Cierre ───────────────────────────────────────────────── */}
      <div
        className="d-card"
        style={{ marginTop: 13, display: "grid", justifyItems: "center", padding: 28, textAlign: "center" }}
      >
        <h2 style={{ fontSize: 19, fontWeight: 700, letterSpacing: "-0.03em" }}>
          ¿Cómo se vería esto en tu estudio?
        </h2>

        <div
          className="d-row"
          style={{ marginTop: 16, gap: 10, flexWrap: "wrap", justifyContent: "center" }}
        >
          <a
            className="d-btn d-btn--cta"
            href={whatsappHref(para)}
            target="_blank"
            rel="noreferrer"
          >
            {CONTACT_LABEL}
            <ArrowRight size={14} />
          </a>
          <Link to="../resumen" className="d-btn d-btn--ghost">
            Seguir explorando la demo
          </Link>
        </div>

        <div className="d-muted" style={{ marginTop: 18, fontSize: 11.5 }}>
          Hecho por <strong style={{ fontWeight: 600 }}>Spike</strong>
        </div>
      </div>
    </>
  )
}

import { ArrowRight, Check } from "lucide-react"
import { Link } from "react-router-dom"

import { CONTACT_LABEL, texts, whatsappHref } from "../config"
import { PageHead } from "../components/Screen"
import { useDemo } from "../state/DemoContext"

/*
 * Los tres pasos están escritos con la redacción de la landing de Spike
 * (diagnóstico sin costo, arrancar por lo que más duele, escalar cuando se ven
 * resultados), resumidos a tres como pidió Tatu.
 */
const steps = [
  {
    step: "01",
    title: "Diagnóstico sin costo",
    headline: "Te escuchamos antes de proponer.",
    timing: "30 a 60 minutos",
    body: "Nos sentamos a charlar sobre el día a día del estudio. Analizamos dónde están perdiendo tiempo y te proponemos mejoras lógicas. Sin compromisos.",
  },
  {
    step: "02",
    title: "Prototipo",
    headline: "Arrancamos por lo que más duele.",
    timing: "Resultados en semanas",
    body: "No cambiamos toda la estructura de golpe. Empezamos por un módulo, el que más trabajo repetitivo te saca, y lo ves funcionando con tus datos.",
  },
  {
    step: "03",
    title: "Implementación",
    headline: "Escalamos cuando ves resultados.",
    timing: "Escala modular",
    body: "A medida que el equipo se adapta de forma natural, sumamos módulos. La inversión acompaña el crecimiento real del estudio.",
  },
]

const blocks = [
  {
    title: "Escuchamos cómo trabajan hoy",
    body: "Entendemos tu proceso antes de proponer nada. Cada estudio tiene su forma de llevar clientes, horas y cierres.",
  },
  {
    title: "Lo adaptamos a tu estudio",
    body: "Tu banco, el formato de tu sistema contable, tus roles y los módulos que necesites. Se empieza por un módulo a la vez.",
  },
  {
    title: "Y si necesitás otra cosa, la armamos a medida",
    body: "Cualquier sistema interno o automatización que te saque trabajo repetitivo, aunque no esté en esta demo.",
  },
]

const questions = [
  "¿Qué sistema contable usan?",
  "¿Con qué bancos concilian?",
  "¿Cómo llevan hoy las horas y las tareas?",
  "¿Qué tarea del mes les consume más tiempo?",
]

const faq = [
  {
    q: "¿Estos datos son reales?",
    a: "No: todo lo que viste es de ejemplo.",
  },
  {
    q: "¿Dónde viven mis datos?",
    a: "Lo definimos juntos al armar el sistema: dónde se alojan y quién accede.",
  },
  {
    q: "¿Tengo que cambiar todo de una vez?",
    a: "No: se arranca por el módulo que más te duele.",
  },
]

export function TrabajemosJuntos() {
  const { para } = useDemo()

  return (
    <>
      <PageHead
        title="Esto es una demo. Tu estudio tiene sus propios problemas: contanos cuáles."
        sub="Lo que viste es un ejemplo. Lo que sigue es lo que podemos armar con vos."
      />

      <div className="d-grid d-grid--3" style={{ marginTop: 0 }}>
        {blocks.map((block) => (
          <div key={block.title} className="d-card">
            <div className="d-card__title">{block.title}</div>
            <p className="d-muted" style={{ marginTop: 8, fontSize: 13, lineHeight: 1.6 }}>
              {block.body}
            </p>
          </div>
        ))}
      </div>

      {/* ── Cómo trabajamos ──────────────────────────────────────── */}
      <div className="d-card" style={{ marginTop: 13 }}>
        <div className="d-card__head">
          <div>
            <div className="d-card__title">Cómo trabajamos</div>
            <div className="d-card__sub">Los mismos tres pasos de siempre</div>
          </div>
        </div>

        <div className="d-grid d-grid--3" style={{ marginTop: 0 }}>
          {steps.map((item) => (
            <div key={item.step} className="d-card d-card--flat">
              <div className="d-row">
                <span
                  className="d-num"
                  style={{
                    display: "grid",
                    width: 28,
                    height: 28,
                    placeItems: "center",
                    borderRadius: 9,
                    background: "var(--d-green)",
                    color: "#fff",
                    fontSize: 11.5,
                    fontWeight: 700,
                  }}
                >
                  {item.step}
                </span>
                <span className="d-chip">{item.timing}</span>
              </div>

              <div style={{ marginTop: 13, fontSize: 14, fontWeight: 600 }}>{item.title}</div>
              <div style={{ marginTop: 3, fontSize: 13, fontWeight: 500 }}>{item.headline}</div>
              <p className="d-muted" style={{ marginTop: 8, fontSize: 12.5, lineHeight: 1.6 }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Para la llamada + prueba ─────────────────────────────── */}
      <div className="d-grid d-grid--main">
        <div className="d-card">
          <div className="d-card__head">
            <div>
              <div className="d-card__title">Para la llamada, tené a mano cuatro respuestas</div>
              <div className="d-card__sub">No hace falta que llenes ningún formulario</div>
            </div>
          </div>

          <ul style={{ display: "grid", gap: 11 }}>
            {questions.map((question) => (
              <li key={question} className="d-row" style={{ alignItems: "flex-start", gap: 9 }}>
                <span
                  style={{
                    display: "grid",
                    width: 20,
                    height: 20,
                    flexShrink: 0,
                    placeItems: "center",
                    borderRadius: 999,
                    background: "var(--d-green-soft)",
                    color: "var(--d-green)",
                  }}
                >
                  <Check size={12} />
                </span>
                <span style={{ fontSize: 13.5 }}>{question}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="d-card d-card--green" style={{ alignSelf: "start" }}>
          <span className="d-chip" style={{ marginBottom: 12 }}>
            Esto no es una maqueta
          </span>
          <div className="d-card__title" style={{ fontSize: 15, lineHeight: 1.5 }}>
            {texts.proof}
          </div>
          <p style={{ marginTop: 10, fontSize: 12.5, lineHeight: 1.6, color: "rgba(255,255,255,.78)" }}>
            Lo que acabás de recorrer es un ejemplo con datos inventados, pero el sistema del que
            salió está funcionando todos los días, con clientes, horas y cierres reales. Tu estudio
            tiene sus propios problemas: eso es lo que queremos escuchar.
          </p>
        </div>
      </div>

      {/* ── Preguntas frecuentes ─────────────────────────────────── */}
      <div className="d-grid d-grid--3">
        {faq.map((item) => (
          <div key={item.q} className="d-card d-card--flat">
            <div style={{ fontSize: 13.5, fontWeight: 600 }}>{item.q}</div>
            <p className="d-muted" style={{ marginTop: 7, fontSize: 12.5, lineHeight: 1.6 }}>
              {item.a}
            </p>
          </div>
        ))}
      </div>

      {/* ── Llamado a la acción ──────────────────────────────────── */}
      <div
        className="d-card"
        style={{ marginTop: 13, display: "grid", justifyItems: "center", padding: 30, textAlign: "center" }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.03em", maxWidth: 520 }}>
          ¿Cómo se vería esto en tu estudio?
        </h2>
        <p className="d-muted" style={{ marginTop: 9, maxWidth: 480, fontSize: 13.5, lineHeight: 1.6 }}>
          Escribinos y lo charlamos. El diagnóstico no tiene costo y no te compromete a nada.
        </p>

        <div className="d-row" style={{ marginTop: 20, gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
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

        <div className="d-muted" style={{ marginTop: 20, fontSize: 11.5 }}>
          Hecho por <strong style={{ fontWeight: 600 }}>Spike</strong>
        </div>
      </div>
    </>
  )
}

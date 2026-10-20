import { ArrowRight, Send, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"

import { answer, suggestions, type Answer } from "../assistant/answers"
import { PageHead } from "../components/Screen"
import { useDemo } from "../state/DemoContext"

type Message =
  | { id: number; from: "persona"; text: string }
  | { id: number; from: "asistente"; answer: Answer; typed: boolean }

export function Asistente() {
  const { role, user, tasks, hours, invoices, movements } = useDemo()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [thinking, setThinking] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(1)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages, thinking])

  const ask = (question: string) => {
    const text = question.trim()
    if (!text || thinking) return

    setMessages((list) => [...list, { id: nextId.current++, from: "persona", text }])
    setInput("")
    setThinking(true)

    // Una pausa corta, para que se note que "piensa".
    window.setTimeout(() => {
      const result = answer(text, {
        role,
        personId: user.id,
        tasks,
        hours,
        invoices,
        movements,
      })
      setMessages((list) => [
        ...list,
        { id: nextId.current++, from: "asistente", answer: result, typed: false },
      ])
      setThinking(false)
    }, 620)
  }

  return (
    <>
      <PageHead
        title="Asistente del estudio"
        sub="Preguntale por datos, documentos, plantillas o cómo se hace algo"
      />

      <div className="d-chat">
        <div className="d-chat__notice">
          <Sparkles size={14} style={{ flexShrink: 0 }} />
          <span>
            En esta demo responde sobre datos de ejemplo. En tu estudio responde sobre tu
            información, con los permisos de cada persona.
          </span>
        </div>

        <div className="d-chat__log">
          {messages.length === 0 ? (
            <Welcome onPick={ask} />
          ) : (
            messages.map((message) =>
              message.from === "persona" ? (
                <div key={message.id} className="d-msg d-msg--mine">
                  {message.text}
                </div>
              ) : (
                <AssistantMessage key={message.id} answer={message.answer} />
              ),
            )
          )}

          {thinking ? (
            <div className="d-msg d-msg--bot d-muted" aria-live="polite">
              Buscando en la información del estudio…
            </div>
          ) : null}

          <div ref={endRef} />
        </div>

        {messages.length > 0 ? (
          <div className="d-chat__chips">
            {suggestions.slice(0, 4).map((item) => (
              <button
                key={item}
                type="button"
                className="d-btn d-btn--ghost d-btn--sm"
                onClick={() => ask(item)}
              >
                {item}
              </button>
            ))}
          </div>
        ) : null}

        <form
          className="d-chat__composer"
          onSubmit={(event) => {
            event.preventDefault()
            ask(input)
          }}
        >
          <input
            className="d-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Preguntale algo sobre el estudio…"
            aria-label="Escribí tu pregunta"
          />
          <button
            type="submit"
            className="d-btn d-btn--ai"
            disabled={thinking}
            aria-label="Enviar"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </>
  )
}

/* ── Estado inicial, con las sugerencias agrupadas ─────────────────── */

function Welcome({ onPick }: { onPick: (question: string) => void }) {
  const groups: Array<[string, string[]]> = [
    ["Sobre el trabajo del estudio", suggestions.slice(0, 4)],
    ["Sobre plata y conciliación", suggestions.slice(4, 6)],
    ["Buscar documentos y procedimientos", suggestions.slice(7, 10)],
    ["Armar un reporte", suggestions.slice(10)],
  ]

  return (
    <div style={{ display: "grid", gap: 18, padding: "10px 2px" }}>
      <div>
        <h2 style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.03em" }}>
          Preguntale lo que necesites del estudio
        </h2>
        <p className="d-muted" style={{ marginTop: 5, fontSize: 13, lineHeight: 1.6 }}>
          Conoce los clientes, las tareas, las horas, la conciliación, los documentos de cada
          carpeta, las plantillas y los procedimientos internos. Y arma reportes.
        </p>
      </div>

      {groups.map(([title, list]) => (
        <div key={title}>
          <div
            className="d-muted"
            style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}
          >
            {title}
          </div>
          <div className="d-chat__chips" style={{ padding: "9px 0 0" }}>
            {list.map((item) => (
              <button
                key={item}
                type="button"
                className="d-btn d-btn--ghost d-btn--sm"
                onClick={() => onPick(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Respuesta, con efecto de escritura ────────────────────────────── */

function AssistantMessage({ answer: result }: { answer: Answer }) {
  const [shown, setShown] = useState("")
  const done = shown.length >= result.text.length

  useEffect(() => {
    // Escribe de a pocos caracteres para que se vea como un chat de verdad.
    let index = 0
    const timer = window.setInterval(() => {
      index = Math.min(result.text.length, index + 3)
      setShown(result.text.slice(0, index))
      if (index >= result.text.length) window.clearInterval(timer)
    }, 16)
    return () => window.clearInterval(timer)
  }, [result.text])

  return (
    <div className={`d-msg d-msg--bot${result.denied ? " d-msg--denied" : ""}`}>
      <div style={{ lineHeight: 1.6 }}>{shown}</div>

      {done && result.bullets ? (
        <ol className="d-msg__steps">
          {result.bullets.map((step, index) => (
            <li key={step}>
              <span className="d-msg__num">{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      ) : null}

      {done && result.table ? (
        <div style={{ marginTop: 12, overflowX: "auto" }}>
          <table className="d-table">
            <thead>
              <tr>
                {result.table.head.map((cell) => (
                  <th key={cell}>{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.table.rows.map((row) => (
                <tr key={row.join("|")}>
                  {row.map((cell, index) => (
                    <td key={cell + index} className={index > 0 ? "is-num" : undefined}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {done && result.link ? (
        <Link
          to={result.link.to}
          className="d-btn d-btn--ghost d-btn--sm"
          style={{ marginTop: 12 }}
        >
          {result.link.label}
          <ArrowRight size={12} />
        </Link>
      ) : null}
    </div>
  )
}

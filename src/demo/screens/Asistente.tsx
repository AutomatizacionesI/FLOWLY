import { ArrowRight, Send, Sparkles } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
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
  const logRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(1)

  /*
   * "Seguirlo abajo" es una marca, no una medición: la tabla de una respuesta
   * aparece recién cuando termina de escribirse, y medir la distancia en ese
   * momento daba un salto grande y cancelaba el seguimiento.
   * La marca solo se apaga cuando el usuario sube a releer algo.
   */
  const stick = useRef(true)

  const onLogScroll = useCallback(() => {
    const log = logRef.current
    if (!log) return
    stick.current = log.scrollHeight - log.scrollTop - log.clientHeight < 60
  }, [])

  const followEnd = useCallback(() => {
    const log = logRef.current
    if (log && stick.current) log.scrollTop = log.scrollHeight
  }, [])

  useEffect(() => {
    if (messages.length === 0) return
    followEnd()
  }, [messages, thinking, followEnd])

  const ask = (question: string) => {
    const text = question.trim()
    if (!text || thinking) return

    // Preguntar algo es pedir ver la respuesta, aunque estuvieras leyendo arriba.
    stick.current = true

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

      <div className={`d-chat${messages.length > 0 ? " is-live" : ""}`}>
        <div className="d-chat__notice">
          <Sparkles size={14} style={{ flexShrink: 0 }} />
          <span>
            En esta demo responde sobre datos de ejemplo. En tu estudio responde sobre tu
            información, con los permisos de cada persona.
          </span>
        </div>

        <div className="d-chat__log" ref={logRef} onScroll={onLogScroll}>
          {messages.length === 0 ? (
            <Welcome onPick={ask} />
          ) : (
            messages.map((message) =>
              message.from === "persona" ? (
                <div key={message.id} className="d-msg d-msg--mine">
                  {message.text}
                </div>
              ) : (
                <AssistantMessage key={message.id} answer={message.answer} onGrow={followEnd} />
              ),
            )
          )}

          {thinking ? (
            <div className="d-msg d-msg--bot d-muted" aria-live="polite">
              Buscando en la información del estudio…
            </div>
          ) : null}
        </div>

        {messages.length > 0 ? (
          <div className="d-chat__chips">
            {suggestions.slice(0, 3).map((item) => (
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
  return (
    <div style={{ display: "grid", gap: 16, padding: "22px 2px", placeContent: "center" }}>
      <div style={{ maxWidth: 560, textAlign: "center", justifySelf: "center" }}>
        <span
          style={{
            display: "grid",
            width: 40,
            height: 40,
            margin: "0 auto 14px",
            placeItems: "center",
            borderRadius: 13,
            background: "var(--d-ai)",
            color: "#fff",
          }}
        >
          <Sparkles size={19} />
        </span>
        <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.03em" }}>
          ¿Qué necesitás saber del estudio?
        </h2>
        <p className="d-muted" style={{ marginTop: 6, fontSize: 13, lineHeight: 1.6 }}>
          Clientes, tareas, horas y conciliación. También busca documentos de cada carpeta,
          plantillas y procedimientos internos, y arma reportes.
        </p>
      </div>

      <div
        className="d-chat__chips"
        style={{ padding: 0, justifyContent: "center", maxWidth: 620, justifySelf: "center" }}
      >
        {suggestions.map((item) => (
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
  )
}

/* ── Respuesta, con efecto de escritura ────────────────────────────── */

function AssistantMessage({
  answer: result,
  onGrow,
}: {
  answer: Answer
  /** Se llama en cada tecleo, para que el chat siga al texto que crece. */
  onGrow: () => void
}) {
  const [shown, setShown] = useState("")
  const done = shown.length >= result.text.length

  useEffect(() => {
    if (done) onGrow()
  }, [done, onGrow])

  useEffect(() => {
    // Escribe de a pocos caracteres para que se vea como un chat de verdad.
    let index = 0
    const timer = window.setInterval(() => {
      index = Math.min(result.text.length, index + 3)
      setShown(result.text.slice(0, index))
      onGrow()
      if (index >= result.text.length) window.clearInterval(timer)
    }, 16)
    return () => window.clearInterval(timer)
  }, [result.text, onGrow])

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

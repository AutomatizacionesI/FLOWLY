import { texts } from "../config"
import { useDemo } from "../state/DemoContext"

/**
 * Modal de bienvenida. En la Fase 1 "Empezar recorrido" todavía no arranca el
 * recorrido guiado: eso se suma en la Fase 2.
 */
export function WelcomeModal() {
  const { welcomeOpen, setWelcomeOpen, setTourStep, para } = useDemo()

  if (!welcomeOpen) return null

  return (
    <div className="d-overlay">
      <div className="d-modal" role="dialog" aria-modal="true" aria-label={texts.welcomeTitle}>
        <div className="d-chip d-chip--ok">Datos de ejemplo</div>
        <h2 className="d-modal__title" style={{ marginTop: 12 }}>
          {para ? `${texts.welcomeTitle}, ${para}` : texts.welcomeTitle}
        </h2>
        <p className="d-modal__body">{texts.welcomeBody}</p>

        <div className="d-modal__actions">
          <button
            type="button"
            className="d-btn d-btn--primary"
            onClick={() => {
              setWelcomeOpen(false)
              setTourStep(0)
            }}
          >
            {texts.welcomeStart}
          </button>
          <button
            type="button"
            className="d-btn d-btn--ghost"
            onClick={() => setWelcomeOpen(false)}
          >
            {texts.welcomeExplore}
          </button>
        </div>
      </div>
    </div>
  )
}

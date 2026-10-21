import { Lock, Menu, Search, X } from "lucide-react"
import { useCallback, useEffect, useState, type ReactNode } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { CONTACT_LABEL, texts, whatsappHref } from "../config"
import { navGroups } from "../nav"
import { useDemo } from "../state/DemoContext"

import { RoleSwitch } from "./RoleSwitch"
import { TopbarExtras } from "./TopbarExtras"
import { useEscape } from "./useEscape"

/* ── Cinta de aviso permanente ─────────────────────────────────────── */

function Banner() {
  const { para } = useDemo()
  const [open, setOpen] = useState(true)
  const text = para ? texts.bannerPara(para) : texts.banner

  if (!open) {
    return (
      <button type="button" className="d-banner d-banner--mini" onClick={() => setOpen(true)}>
        Demo con datos de ejemplo — mostrar aviso
      </button>
    )
  }

  return (
    <div className="d-banner" role="status">
      <span>{text}</span>
      <button
        type="button"
        className="d-banner__close"
        onClick={() => setOpen(false)}
        aria-label="Minimizar el aviso"
      >
        <X size={14} />
      </button>
    </div>
  )
}

/* ── Barra lateral ─────────────────────────────────────────────────── */

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { role, para } = useDemo()
  const { pathname } = useLocation()

  return (
    <aside className={`d-side${open ? " is-open" : ""}`}>
      <div className="d-side__brand">
        <div className="d-side__mark" aria-hidden="true">
          ED
        </div>
        <div>
          <div className="d-side__name">{texts.studioName}</div>
          <div className="d-side__tag">{texts.studioTag}</div>
        </div>
      </div>

      <nav className="d-side__nav" aria-label="Secciones del sistema">
        {navGroups.map((group) => (
          <div key={group.title ?? group.items[0].path}>
            {group.title ? <div className="d-side__group">{group.title}</div> : null}
            {group.items.map((item) => {
              const locked = item.partnersOnly && role === "contador"
              const active = pathname.endsWith(`/${item.path}`)
              const Icon = item.icon

              if (locked) {
                return (
                  <span
                    key={item.path}
                    className="d-side__link is-locked"
                    title={texts.lockedTooltip}
                  >
                    <Icon size={16} />
                    {item.label}
                    <Lock size={13} className="d-side__lock" aria-label={texts.lockedTooltip} />
                  </span>
                )
              }

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`d-side__link${active ? " is-active" : ""}${
                    item.highlight ? " is-cta" : ""
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="d-side__cta">
        <h4>{texts.sidebarCtaTitle}</h4>
        <p>{texts.sidebarCtaBody}</p>
        <a
          className="d-btn d-btn--cta d-btn--sm d-btn--block"
          style={{ marginTop: 12 }}
          href={whatsappHref(para)}
          target="_blank"
          rel="noreferrer"
        >
          {CONTACT_LABEL}
        </a>
      </div>
    </aside>
  )
}

/* ── Avisos flotantes ──────────────────────────────────────────────── */

function Toasts() {
  const { toasts } = useDemo()
  if (toasts.length === 0) return null

  return (
    <div className="d-toasts" aria-live="polite">
      {toasts.map((item) => (
        <div key={item.id} className="d-toast">
          {item.text}
        </div>
      ))}
    </div>
  )
}

/* ── Esqueleto completo ────────────────────────────────────────────── */

export function Shell({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState("")

  useEscape(useCallback(() => setMenuOpen(false), []))

  // Al cambiar de pantalla, arriba de todo y cerrar el cajón.
  useEffect(() => {
    setMenuOpen(false)
    document.querySelector(".demo-root")?.scrollTo({ top: 0 })
  }, [pathname])

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault()
    const term = query.trim().toLowerCase()
    if (!term) return
    const hit = navGroups
      .flatMap((group) => group.items)
      .find((item) => item.label.toLowerCase().includes(term))
    if (hit) navigate(hit.path)
    setQuery("")
  }

  return (
    <>
      <Banner />
      <div className="d-shell">
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
        {menuOpen ? (
          <div
            className="d-overlay"
            style={{ zIndex: 65 }}
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        ) : null}

        <div className="d-main">
          <header className="d-top">
            <button
              type="button"
              className="d-icon-btn d-side__toggle"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir el menú"
            >
              <Menu size={16} />
            </button>

            <form className="d-search" onSubmit={onSearch} role="search">
              <Search size={15} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar pantalla o cliente"
                aria-label="Buscar"
              />
            </form>

            <div className="d-top__spacer" />
            <RoleSwitch />
            <TopbarExtras />
          </header>

          <main className="d-content">{children}</main>

          <footer className="d-foot">
            <span>{texts.footer}</span>
            <span className="d-foot__by">
              Hecho por <strong style={{ fontWeight: 600 }}>Spike</strong>
            </span>
          </footer>
        </div>
      </div>
      <Toasts />
    </>
  )
}

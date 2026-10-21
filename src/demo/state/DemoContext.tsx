import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

import {
  bankMovements as seedMovements,
  currentUser,
  hourEntries as seedHours,
  invoices as seedInvoices,
  tasks as seedTasks,
  type BankMovement,
  type HourEntry,
  type Invoice,
  type Person,
  type Role,
  type Task,
} from "../data/demoData"

/**
 * Estado de la demo: vive en memoria, se puede modificar de verdad durante la
 * sesión (completar una tarea, cargar una hora, confirmar una factura) y se
 * vuelve a cero con "Reiniciar demo". No se guarda nada en ningún lado.
 */

type Toast = { id: number; text: string }

type DemoState = {
  role: Role
  setRole: (role: Role) => void
  user: Person

  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  hours: HourEntry[]
  setHours: React.Dispatch<React.SetStateAction<HourEntry[]>>
  invoices: Invoice[]
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>
  movements: BankMovement[]
  setMovements: React.Dispatch<React.SetStateAction<BankMovement[]>>
  reconciled: boolean
  setReconciled: (value: boolean) => void

  /** Nombre que vino por ?para=, ya recortado a 40 caracteres. */
  para: string | null

  /** Modal de bienvenida: se vuelve a abrir desde "Ver recorrido". */
  welcomeOpen: boolean
  setWelcomeOpen: (value: boolean) => void

  /** Paso del recorrido guiado, o null si no está corriendo. */
  tourStep: number | null
  setTourStep: (value: number | null) => void

  toasts: Toast[]
  toast: (text: string) => void

  resetDemo: () => void
}

const Context = createContext<DemoState | null>(null)

export function useDemo(): DemoState {
  const value = useContext(Context)
  if (!value) throw new Error("useDemo() se usó fuera de <DemoProvider>")
  return value
}

/** Lee ?para= y lo deja en texto plano, corto y sin HTML. */
function readPara(): string | null {
  const raw = new URLSearchParams(window.location.search).get("para")
  if (!raw) return null
  const clean = raw.trim().slice(0, 40)
  return clean.length > 0 ? clean : null
}

function readRole(): Role {
  return new URLSearchParams(window.location.search).get("rol") === "contador"
    ? "contador"
    : "socio"
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(readRole)
  const [tasks, setTasks] = useState<Task[]>(seedTasks)
  const [hours, setHours] = useState<HourEntry[]>(seedHours)
  const [invoices, setInvoices] = useState<Invoice[]>(seedInvoices)
  const [movements, setMovements] = useState<BankMovement[]>(seedMovements)
  const [reconciled, setReconciled] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])

  const para = useMemo(readPara, [])

  // Con ?tour=0 la demo abre directo, sin el modal de bienvenida.
  const [welcomeOpen, setWelcomeOpen] = useState(
    () => new URLSearchParams(window.location.search).get("tour") !== "0",
  )
  const [tourStep, setTourStep] = useState<number | null>(null)

  const toast = useCallback((text: string) => {
    const id = Date.now() + Math.random()
    setToasts((list) => [...list, { id, text }])
    window.setTimeout(() => {
      setToasts((list) => list.filter((item) => item.id !== id))
    }, 4200)
  }, [])

  const resetDemo = useCallback(() => {
    setTasks(seedTasks)
    setHours(seedHours)
    setInvoices(seedInvoices)
    setMovements(seedMovements)
    setReconciled(false)
  }, [])

  const value = useMemo<DemoState>(
    () => ({
      role,
      setRole,
      user: currentUser[role],
      tasks,
      setTasks,
      hours,
      setHours,
      invoices,
      setInvoices,
      movements,
      setMovements,
      reconciled,
      setReconciled,
      para,
      welcomeOpen,
      setWelcomeOpen,
      tourStep,
      setTourStep,
      toasts,
      toast,
      resetDemo,
    }),
    [
      role,
      tasks,
      hours,
      invoices,
      movements,
      reconciled,
      para,
      welcomeOpen,
      tourStep,
      toasts,
      toast,
      resetDemo,
    ],
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

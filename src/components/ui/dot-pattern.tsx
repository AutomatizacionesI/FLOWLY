"use client"

import React, {
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
} from "react"

import { cn } from "@/lib/utils"

interface DotPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number
  height?: number
  x?: number
  y?: number
  cx?: number
  cy?: number
  cr?: number
  className?: string
  glow?: boolean
  interactive?: boolean
  interactionRadius?: number
  maxScale?: number
  maxOffset?: number
  dotColor?: string
}

type Dot = {
  x: number
  y: number
}

export function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  glow = false,
  interactive = false,
  interactionRadius = 140,
  maxScale = 2.4,
  maxOffset = 6,
  dotColor = "#0f172a",
  style,
  ...props
}: DotPatternProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<Dot[]>([])
  const animationFrameRef = useRef<number | null>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  })
  const smoothPointerRef = useRef({ x: 0, y: 0 })

  const mergedStyle = useMemo(
    () =>
      ({
        ...style,
      }) as CSSProperties,
    [style],
  )

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current

    if (!container || !canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    const dpr = window.devicePixelRatio || 1

    const rebuildDots = (canvasWidth: number, canvasHeight: number) => {
      const cols = Math.ceil(canvasWidth / width)
      const rows = Math.ceil(canvasHeight / height)
      const nextDots: Dot[] = []

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          nextDots.push({
            x: col * width + cx + x,
            y: row * height + cy + y,
          })
        }
      }

      dotsRef.current = nextDots
    }

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      rebuildDots(rect.width, rect.height)
    }

    const draw = () => {
      const rect = container.getBoundingClientRect()
      context.clearRect(0, 0, rect.width, rect.height)

      if (interactive && pointerRef.current.active) {
        smoothPointerRef.current.x +=
          (pointerRef.current.x - smoothPointerRef.current.x) * 0.14
        smoothPointerRef.current.y +=
          (pointerRef.current.y - smoothPointerRef.current.y) * 0.14
      }

      if (!pointerRef.current.active) {
        smoothPointerRef.current.x +=
          (pointerRef.current.x - smoothPointerRef.current.x) * 0.08
        smoothPointerRef.current.y +=
          (pointerRef.current.y - smoothPointerRef.current.y) * 0.08
      }

      for (const dot of dotsRef.current) {
        const dx = smoothPointerRef.current.x - dot.x
        const dy = smoothPointerRef.current.y - dot.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const strength =
          interactive && pointerRef.current.active && distance < interactionRadius
            ? 1 - distance / interactionRadius
            : 0

        const offsetX = strength ? (-dx / interactionRadius) * maxOffset : 0
        const offsetY = strength ? (-dy / interactionRadius) * maxOffset : 0
        const radius = cr * (1 + strength * (maxScale - 1))
        const alpha = glow
          ? 0.22 + strength * 0.4
          : 0.18 + strength * 0.55

        context.beginPath()
        context.arc(dot.x + offsetX, dot.y + offsetY, radius, 0, Math.PI * 2)
        if (dotColor.startsWith("#") && dotColor.length === 7) {
          const red = Number.parseInt(dotColor.slice(1, 3), 16)
          const green = Number.parseInt(dotColor.slice(3, 5), 16)
          const blue = Number.parseInt(dotColor.slice(5, 7), 16)
          context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`
        } else {
          context.fillStyle = `rgba(15, 23, 42, ${alpha})`
        }
        context.fill()
      }

      animationFrameRef.current = window.requestAnimationFrame(draw)
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      pointerRef.current.x = event.clientX - rect.left
      pointerRef.current.y = event.clientY - rect.top
      pointerRef.current.active = true
    }

    const handlePointerLeave = () => {
      pointerRef.current.active = false
      pointerRef.current.x = container.clientWidth / 2
      pointerRef.current.y = container.clientHeight / 2
    }

    resizeCanvas()
    handlePointerLeave()
    draw()

    if (interactive) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true })
      window.addEventListener("pointerleave", handlePointerLeave, {
        passive: true,
      })
    }

    resizeObserverRef.current = new ResizeObserver(() => {
      resizeCanvas()
    })
    resizeObserverRef.current.observe(container)

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
      }
      if (interactive) {
        window.removeEventListener("pointermove", handlePointerMove)
        window.removeEventListener("pointerleave", handlePointerLeave)
      }
    }
  }, [
    width,
    height,
    x,
    y,
    cx,
    cy,
    cr,
    glow,
    interactive,
    interactionRadius,
    maxScale,
    maxOffset,
    dotColor,
  ])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={mergedStyle}
      {...props}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}

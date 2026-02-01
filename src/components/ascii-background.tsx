"use client"

import { useEffect, useRef } from "react"

export function ASCIIBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const chars = ["/", "5", "7", "/"]
    const weights = [0.7, 0.1, 0.1, 0.1] // Mostly slashes like Active Theory

    const generateGrid = () => {
      const cols = Math.floor(window.innerWidth / 20)
      const rows = Math.floor(window.innerHeight / 24)
      let grid = ""

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const random = Math.random()
          let cumulative = 0
          let char = "/"

          for (let i = 0; i < weights.length; i++) {
            cumulative += weights[i]
            if (random < cumulative) {
              char = chars[i]
              break
            }
          }
          grid += char
        }
        grid += "\n"
      }
      return grid
    }

    const updateGrid = () => {
      if (container) {
        container.textContent = generateGrid()
      }
    }

    updateGrid()

    // Subtle animation - update random characters periodically
    const interval = setInterval(() => {
      updateGrid()
    }, 3000)

    window.addEventListener("resize", updateGrid)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", updateGrid)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 text-[14px] leading-[24px] font-mono text-foreground/[0.07] whitespace-pre overflow-hidden select-none pointer-events-none"
      aria-hidden="true"
    />
  )
}

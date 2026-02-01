"use client"

import { useEffect, useRef } from "react"
import { useUIStore } from "@/store/useUIStore"

export function ParticleCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { visionMode } = useUIStore() // Disable if in Vision Mode to avoid clutter? Or Overlay?

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationId: number
        let particles: Particle[] = []
        let mouseX = 0
        let mouseY = 0
        let lastX = 0
        let lastY = 0
        let velocity = 0

        interface Particle {
            x: number
            y: number
            vx: number
            vy: number
            life: number
            size: number
            color: string
        }

        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY

            // Velocity Calc
            const dx = mouseX - lastX
            const dy = mouseY - lastY
            velocity = Math.sqrt(dx * dx + dy * dy)

            lastX = mouseX
            lastY = mouseY

            // Spawn Particles on Move
            if (Math.random() > 0.5) { // Throttle
                const angle = Math.atan2(dy, dx) + Math.PI // Opposite direction
                const spread = (Math.random() - 0.5) * 0.5

                particles.push({
                    x: mouseX,
                    y: mouseY,
                    vx: Math.cos(angle + spread) * (Math.random() * 2),
                    vy: Math.sin(angle + spread) * (Math.random() * 2),
                    life: 1.0,
                    size: Math.random() * 2 + 1,
                    color: velocity > 50 ? "#8800FF" : "#00E5FF" // Purple if fast
                })
            }
        }

        const handleClick = (e: MouseEvent) => {
            // Burst
            for (let i = 0; i < 20; i++) {
                const angle = Math.random() * Math.PI * 2
                const speed = Math.random() * 4 + 2
                particles.push({
                    x: e.clientX,
                    y: e.clientY,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: 1.0,
                    size: Math.random() * 3 + 2,
                    color: "#FFFFFF"
                })
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Render Particles
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i]

                p.x += p.vx
                p.y += p.vy
                p.life -= 0.02
                p.size *= 0.95 // Shrink

                if (p.life <= 0) {
                    particles.splice(i, 1)
                    continue
                }

                ctx.globalAlpha = p.life
                ctx.fillStyle = p.color
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fill()
            }
            ctx.globalAlpha = 1.0

            animationId = requestAnimationFrame(animate)
        }

        window.addEventListener("resize", handleResize)
        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mousedown", handleClick)

        handleResize()
        animate()

        return () => {
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mousedown", handleClick)
            cancelAnimationFrame(animationId)
        }
    }, [visionMode])

    // If Vision Mode is ON, maybe we hide this? Or show both?
    // User likes "Contrast", so let's keep it but maybe subtler?
    // For now, render always. It looks cool.

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[9999]" // Topmost
        />
    )
}

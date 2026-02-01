"use client"

import { useEffect, useRef } from "react"

export function GenerativeSandbox() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        canvas.width = 600
        canvas.height = 400

        type Particle = { x: number, y: number, vx: number, vy: number, life: number, color: string }
        let particles: Particle[] = []

        const colors = ["#00E5FF", "#BD00FF", "#FFFFFF"]

        const addParticle = (x: number, y: number) => {
            particles.push({
                x, y,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: 1.0,
                color: colors[Math.floor(Math.random() * colors.length)]
            })
        }

        let animationId: number
        const animate = () => {
            ctx.fillStyle = "rgba(0,0,0,0.1)" // Trail effect
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            particles.forEach((p, i) => {
                p.x += p.vx
                p.y += p.vy
                p.vx *= 0.99
                p.vy *= 0.99
                p.life -= 0.01

                ctx.fillStyle = p.color
                ctx.globalAlpha = p.life
                ctx.beginPath()
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
                ctx.fill()

                if (p.life <= 0) particles.splice(i, 1)
            })

            animationId = requestAnimationFrame(animate)
        }

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            for (let i = 0; i < 5; i++) addParticle(x, y)
        }

        canvas.addEventListener("mousemove", handleMouseMove)
        animate()

        return () => {
            canvas.removeEventListener("mousemove", handleMouseMove)
            cancelAnimationFrame(animationId)
        }
    }, [])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md pointer-events-auto">
            <div className="relative border border-primary/20 bg-black/50 p-2 rounded">
                <div className="text-xs text-primary mb-2 tracking-widest uppercase">Generative Sandbox // Draw to Create</div>
                <canvas ref={canvasRef} className="cursor-crosshair border border-white/5 bg-black" />
                <button className="absolute top-4 right-4 text-white hover:text-primary">X</button>
            </div>
        </div>
    )
}

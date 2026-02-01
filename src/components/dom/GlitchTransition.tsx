"use client"

import { useEffect, useRef, useState } from "react"
import { useUIStore } from "@/store/useUIStore"

export function GlitchTransition() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { view } = useUIStore()
    const [isActive, setIsActive] = useState(false)

    // Trigger on View Change
    useEffect(() => {
        setIsActive(true)
        const t = setTimeout(() => setIsActive(false), 600) // 0.6s duration
        return () => clearTimeout(t)
    }, [view])

    useEffect(() => {
        if (!isActive) return

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        let animationId: number

        const animate = () => {
            // Clear randomly
            if (Math.random() > 0.5) ctx.clearRect(0, 0, canvas.width, canvas.height)

            // 1. Digital Artifacts (Blocks)
            const count = 10
            for (let i = 0; i < count; i++) {
                const x = Math.random() * canvas.width
                const y = Math.random() * canvas.height
                const w = Math.random() * 200
                const h = Math.random() * 50

                // Tech Colors
                const colors = ['#00E5FF', '#bd00ff', '#FFFFFF', '#000000']
                ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
                ctx.globalAlpha = Math.random() * 0.3
                ctx.fillRect(x, y, w, h)
            }

            // 2. RGB Split Scanlines
            ctx.fillStyle = "rgba(0, 229, 255, 0.1)"
            const y = Math.random() * canvas.height
            ctx.fillRect(0, y, canvas.width, 2)

            // 3. White Flash (Feed Reset)
            if (Math.random() > 0.95) {
                ctx.fillStyle = "white"
                ctx.globalAlpha = 0.1
                ctx.fillRect(0, 0, canvas.width, canvas.height)
            }

            if (isActive) animationId = requestAnimationFrame(animate)
        }

        animationId = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationId)
    }, [isActive])

    if (!isActive) return null

    return (
        <>
            {/* CANVAS GLITCH */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 z-[100] pointer-events-none mix-blend-hard-light"
            />
            {/* WIPE OVERLAY */}
            <div className="fixed inset-0 z-[99] pointer-events-none bg-black animate-wipe" />
            <style jsx global>{`
                @keyframes wipe {
                    0% { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
                    50% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
                    100% { clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%); }
                }
                .animate-wipe {
                    animation: wipe 0.6s cubic-bezier(0.7, 0, 0.3, 1) forwards;
                }
            `}</style>
        </>
    )
}

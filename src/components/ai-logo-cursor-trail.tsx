"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface Particle {
    id: number
    x: number
    y: number
    type: "gemini" | "chatgpt" | "claude"
    life: number
    velocity: { x: number; y: number }
    rotation: number
    scale: number
}

export function AILogoCursorTrail() {
    const [particles, setParticles] = useState<Particle[]>([])
    const lastPos = useRef({ x: 0, y: 0 })
    const frameRef = useRef<number>(0)
    const particleIdCounter = useRef(0)

    // Logos as simple SVGs or colored shapes for now if assets aren't available
    // Using SVGs for better visual
    const Logos = {
        gemini: (
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
            </svg>
        ),
        chatgpt: (
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]">
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
                <path d="M12 6V18M6 12H18" stroke="currentColor" strokeWidth="2" />
            </svg>
        ),
        claude: (
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]">
                <rect x="6" y="6" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="2" />
                <path d="M9 12H15" stroke="currentColor" strokeWidth="2" />
            </svg>
        )
    }

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e
            const dist = Math.hypot(clientX - lastPos.current.x, clientY - lastPos.current.y)

            // Spawn particle if moved enough distance
            if (dist > 10) {
                const types: ("gemini" | "chatgpt" | "claude")[] = ["gemini", "chatgpt", "claude"]
                const randomType = types[Math.floor(Math.random() * types.length)]

                const newParticle: Particle = {
                    id: particleIdCounter.current++,
                    x: clientX,
                    y: clientY,
                    type: randomType,
                    life: 1.0,
                    velocity: {
                        x: (Math.random() - 0.5) * 2, // Random drift
                        y: (Math.random() - 0.5) * 2 + 1 // Mild gravity/fall
                    },
                    rotation: Math.random() * 360,
                    scale: 0.5 + Math.random() * 0.5
                }

                setParticles(prev => [...prev.slice(-40), newParticle]) // Limit to 50 particles
                lastPos.current = { x: clientX, y: clientY }
            }
        }

        const updateParticles = () => {
            setParticles(prev => prev
                .map(p => ({
                    ...p,
                    x: p.x + p.velocity.x,
                    y: p.y + p.velocity.y,
                    life: p.life - 0.02,
                    rotation: p.rotation + 2
                }))
                .filter(p => p.life > 0)
            )
            frameRef.current = requestAnimationFrame(updateParticles)
        }

        window.addEventListener("mousemove", handleMouseMove)
        frameRef.current = requestAnimationFrame(updateParticles)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            cancelAnimationFrame(frameRef.current)
        }
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
            {particles.map(p => (
                <div
                    key={p.id}
                    className="absolute w-6 h-6 will-change-transform"
                    style={{
                        transform: `translate3d(${p.x - 12}px, ${p.y - 12}px, 0) scale(${p.scale}) rotate(${p.rotation}deg)`,
                        opacity: p.life
                    }}
                >
                    {Logos[p.type]}
                </div>
            ))}
        </div>
    )
}

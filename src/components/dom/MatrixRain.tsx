"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const KONAMI_CODE = [
    "ArrowUp", "ArrowUp",
    "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight",
    "ArrowLeft", "ArrowRight",
    "b", "a"
]

export function MatrixRain() {
    const [isActive, setIsActive] = useState(false)
    const [inputSequence, setInputSequence] = useState<string[]>([])
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // KONAMI CODE LISTENER
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isActive && e.key === "Escape") {
                setIsActive(false)
                return
            }

            if (!isActive) {
                const newSequence = [...inputSequence, e.key]
                if (newSequence.length > KONAMI_CODE.length) {
                    newSequence.shift()
                }
                setInputSequence(newSequence)

                // Check Match
                if (JSON.stringify(newSequence) === JSON.stringify(KONAMI_CODE)) {
                    setIsActive(true)
                    setInputSequence([])
                }
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [inputSequence, isActive])

    // ANIMATION LOOP
    useEffect(() => {
        if (!isActive) return

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationId: number

        // Config
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        const fontSize = 16
        const columns = canvas.width / fontSize
        const drops: number[] = []

        for (let x = 0; x < columns; x++) {
            drops[x] = 1
        }

        const chars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

        const draw = () => {
            // Semi-transparent black to create trail effect
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            ctx.fillStyle = "#0F0" // Green text
            ctx.font = fontSize + "px monospace"

            for (let i = 0; i < drops.length; i++) {
                const text = chars.charAt(Math.floor(Math.random() * chars.length))
                ctx.fillText(text, i * fontSize, drops[i] * fontSize)

                // Send drop back to top randomly after it has crossed the screen
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0
                }

                drops[i]++
            }
            animationId = requestAnimationFrame(draw)
        }

        draw()

        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        window.addEventListener("resize", handleResize)

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener("resize", handleResize)
        }
    }, [isActive])

    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[99999] bg-black"
                >
                    <canvas ref={canvasRef} className="block" />
                    <div className="absolute top-4 right-4 text-green-500 font-mono text-xs animate-pulse">
                        PRESS ESC TO EXIT SIMULATION
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

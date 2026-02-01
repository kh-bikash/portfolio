"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function GlitchText({ text, className }: { text: string, className?: string }) {
    const [glitched, setGlitched] = useState(text)

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.95) { // 5% chance to glitch per interval
                const chars = "!@#$%^&*()_+-=[]{}|;':,./<>?"
                const glitchChars = text.split('').map(char =>
                    Math.random() > 0.5 ? chars[Math.floor(Math.random() * chars.length)] : char
                ).join('')

                setGlitched(glitchChars)
                setTimeout(() => setGlitched(text), 100)
            }
        }, 1000)
        return () => clearInterval(interval)
    }, [text])

    return (
        <span className={`${className} relative`}>
            {glitched}
            {glitched !== text && (
                <span className="absolute inset-0 text-cyan-500 opacity-50 translate-x-[2px]">
                    {glitched}
                </span>
            )}
        </span>
    )
}

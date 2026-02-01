"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Palette, Zap, Code, Leaf } from "lucide-react"

type Theme = "default" | "cyberpunk" | "matrix" | "zen"

export function ThemeMutator() {
    const [theme, setTheme] = useState<Theme>("default")
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        // Remove old theme classes
        document.documentElement.classList.remove("theme-cyberpunk", "theme-matrix", "theme-zen")

        // Add new if not default
        if (theme !== "default") {
            document.documentElement.classList.add(`theme-${theme}`)
        }
    }, [theme])

    const themes = [
        { id: "default", icon: Palette, color: "bg-white border-zinc-200 text-zinc-900" },
        { id: "cyberpunk", icon: Zap, color: "bg-zinc-900 border-pink-500 text-pink-500" },
        { id: "matrix", icon: Code, color: "bg-black border-green-500 text-green-500" },
        { id: "zen", icon: Leaf, color: "bg-[#f5f0e1] border-[#d8d3c4] text-[#4a4a4a]" },
    ]

    return (
        <div className="fixed top-8 right-8 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="absolute right-12 top-0 flex gap-2"
                    >
                        {themes.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => setTheme(t.id as Theme)}
                                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all hover:scale-110 ${t.color} ${theme === t.id ? 'ring-2 ring-offset-2 ring-cyan-500' : ''}`}
                            >
                                <t.icon className="w-4 h-4" />
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-8 h-8 bg-white/10 backdrop-blur border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
                <Palette className="w-4 h-4 text-zinc-500" />
            </button>
        </div>
    )
}

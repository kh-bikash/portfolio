"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Cpu, Grid, User, Mail, Sparkles, Sun, Moon } from "lucide-react"

import { useLiquidRoute } from "@/components/dom/TransitionOverlay"

export function PrismNav() {
    const [hovered, setHovered] = useState<string | null>(null)
    const [isDark, setIsDark] = useState(true)
    const transition = useLiquidRoute()

    // Initialize Theme
    useEffect(() => {
        const root = document.documentElement
        const savedTheme = localStorage.getItem("theme")
        if (savedTheme === "light") {
            setIsDark(false)
            root.classList.remove("dark")
        } else {
            setIsDark(true)
            root.classList.add("dark")
        }
    }, [])

    const toggleTheme = () => {
        const root = document.documentElement
        if (isDark) {
            root.classList.remove("dark")
            localStorage.setItem("theme", "light")
            setIsDark(false)
        } else {
            root.classList.add("dark")
            localStorage.setItem("theme", "dark")
            setIsDark(true)
        }
    }

    const navItems = [
        { id: "nexus", label: "Home", icon: Cpu, action: () => document.getElementById('nexus')?.scrollIntoView({ behavior: 'smooth' }) },
        { id: "works", label: "Projects", icon: Grid, action: () => transition('/work') },
        { id: "about", label: "About", icon: User, action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
        { id: "contact", label: "Contact", icon: Mail, action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
    ]

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-6 left-0 w-full flex justify-center z-50 px-4 font-sans pointer-events-none"
        >
            <div className="pointer-events-auto flex items-center p-2 bg-white/40 dark:bg-black/40 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(255,255,255,0.03)] transition-all overflow-hidden relative group">
                
                {/* Subtle Siri Glow inside the pill */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/10 via-purple-300/10 to-blue-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="flex items-center gap-2 px-4 border-r border-zinc-300/40 dark:border-zinc-700/40 mr-2 relative z-10">
                    <Sparkles className="w-4 h-4 text-zinc-900 dark:text-white" />
                    <span className="font-semibold text-sm tracking-tight text-zinc-900 dark:text-white">BIKASH</span>
                </div>

                <div className="flex items-center gap-1 relative z-10">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={item.action}
                            onMouseEnter={() => setHovered(item.id)}
                            onMouseLeave={() => setHovered(null)}
                            className="relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                        >
                            {/* Hover Pill Background */}
                            {hovered === item.id && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="absolute inset-0 bg-white/60 dark:bg-white/10 rounded-full shadow-sm"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            
                            <span className={`relative z-10 flex items-center gap-2 ${hovered === item.id ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-zinc-400"}`}>
                                <item.icon className="w-4 h-4" />
                                <span className="hidden md:inline-block">{item.label}</span>
                            </span>
                        </button>
                    ))}

                    <div className="w-px h-6 bg-zinc-300/40 dark:bg-zinc-700/40 mx-2" />

                    <button
                        onClick={toggleTheme}
                        className="relative p-2 rounded-full bg-zinc-100 dark:bg-white/10 border border-zinc-200 dark:border-white/5 hover:bg-zinc-200 dark:hover:bg-white/20 transition-all overflow-hidden flex items-center justify-center"
                    >
                        <motion.div
                            initial={false}
                            animate={{ rotate: isDark ? 180 : 0, scale: isDark ? 0 : 1, opacity: isDark ? 0 : 1 }}
                            transition={{ duration: 0.4, ease: "backOut" }}
                            className="absolute"
                        >
                            <Sun className="w-4 h-4 text-orange-500" />
                        </motion.div>
                        <motion.div
                            initial={false}
                            animate={{ rotate: isDark ? 0 : -180, scale: isDark ? 1 : 0, opacity: isDark ? 1 : 0 }}
                            transition={{ duration: 0.4, ease: "backOut" }}
                            className="absolute"
                        >
                            <Moon className="w-4 h-4 text-cyan-400" />
                        </motion.div>
                        <div className="w-4 h-4" /> {/* Spacer for absolute icons */}
                    </button>
                </div>
            </div>
        </motion.nav>
    )
}

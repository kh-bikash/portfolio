"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Sparkles, Sun, Moon, Volume2, VolumeX } from "lucide-react"
import { useLenis } from "@studio-freight/react-lenis"
import { useAmbientAudio } from "@/lib/ambient-audio"

const NAV_ITEMS = [
    { id: "home", label: "Home" },
    { id: "roles", label: "Roles" },
    { id: "about", label: "About" },
    { id: "experience", label: "Journey" },
    { id: "work", label: "Work" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
]

export function FilmNav() {
    const [hidden, setHidden] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isDark, setIsDark] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const [hovered, setHovered] = useState<string | null>(null)

    const { scrollY } = useScroll()
    const navOpacity = useTransform(scrollY, [0, 200], [0, 1])

    const { toggleMute, setVolume } = useAmbientAudio()

    // Hide on scroll down, show on scroll up
    useEffect(() => {
        const handleScroll = () => {
            const current = window.scrollY
            setHidden(current > lastScrollY && current > 300)
            setLastScrollY(current)
        }
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [lastScrollY])

    // Theme toggle
    useEffect(() => {
        const saved = localStorage.getItem("theme")
        if (saved === "dark") {
            setIsDark(true)
            document.documentElement.classList.add("dark")
        }
    }, [])

    const handleToggleTheme = () => {
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

    const handleToggleAudio = () => {
        const muted = toggleMute()
        setIsMuted(muted)
        if (!muted) {
            setVolume(0.4)
        }
    }

    const lenis = useLenis()
    
    const scrollTo = (id: string) => {
        if (lenis) {
            lenis.scrollTo(`#${id}`, { offset: 0, duration: 2 })
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: hidden ? -100 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-5 left-0 w-full flex justify-center z-50 px-4 pointer-events-none"
        >
            <motion.div
                style={{ opacity: navOpacity }}
                className="pointer-events-auto flex items-center p-1.5 bg-[var(--paper)]/80 backdrop-blur-xl border border-[var(--border)] rounded-full shadow-paper transition-colors"
            >
                {/* Logo */}
                <div className="flex items-center gap-2 px-4 border-r border-[var(--border)] mr-1">
                    <Sparkles className="w-3.5 h-3.5 text-[var(--brush-warm)]" />
                    <span className="font-serif text-sm text-[var(--ink)] font-medium">BM</span>
                </div>

                {/* Nav items — hide on mobile */}
                <div className="hidden md:flex items-center gap-0.5">
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollTo(item.id)}
                            onMouseEnter={() => setHovered(item.id)}
                            onMouseLeave={() => setHovered(null)}
                            className="relative px-3 py-2 rounded-full text-xs font-sans font-medium transition-colors"
                        >
                            {hovered === item.id && (
                                <motion.div
                                    layoutId="nav-hover"
                                    className="absolute inset-0 bg-[var(--paper-warm)] rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                />
                            )}
                            <span className={`relative z-10 ${hovered === item.id ? "text-[var(--ink)]" : "text-[var(--ink-faded)]"}`}>
                                {item.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Divider */}
                <div className="w-px h-5 bg-[var(--border)] mx-1.5" />

                {/* Audio toggle */}
                <button
                    onClick={handleToggleAudio}
                    className="p-2 rounded-full hover:bg-[var(--paper-warm)] transition-colors"
                    title={isMuted ? "Enable ambient audio" : "Mute audio"}
                >
                    <AnimatePresence mode="wait">
                        {isMuted ? (
                            <motion.div key="off" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
                                <VolumeX className="w-3.5 h-3.5 text-[var(--ink-ghost)]" />
                            </motion.div>
                        ) : (
                            <motion.div key="on" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
                                <Volume2 className="w-3.5 h-3.5 text-[var(--brush-warm)]" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>

                {/* Theme toggle */}
                <button
                    onClick={handleToggleTheme}
                    className="p-2 rounded-full hover:bg-[var(--paper-warm)] transition-colors"
                >
                    <AnimatePresence mode="wait">
                        {isDark ? (
                            <motion.div
                                key="moon"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Moon className="w-3.5 h-3.5 text-[var(--ink-faded)]" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="sun"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Sun className="w-3.5 h-3.5 text-[var(--brush-warm)]" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </motion.div>
        </motion.nav>
    )
}

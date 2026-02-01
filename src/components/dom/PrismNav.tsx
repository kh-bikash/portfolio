"use client"

import { motion } from "framer-motion"
import { useState } from "react"

import { useLiquidRoute } from "@/components/dom/TransitionOverlay" // Ensure export is available

export function PrismNav({ onWorkClick }: { onWorkClick?: () => void }) {
    const [hovered, setHovered] = useState<string | null>(null)
    const transition = useLiquidRoute()

    const navItems = [
        { label: "Profile", id: "nexus", active: true, onClick: () => document.getElementById('nexus')?.scrollIntoView({ behavior: 'smooth' }) },
        { label: "ABOUT", id: "about", onClick: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
        { label: "CONTACT", id: "contact", onClick: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
    ]
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
        >
            <div className="px-8 py-4 bg-background/70 backdrop-blur-xl border border-border rounded-full shadow-lg shadow-black/5 flex items-center gap-8">
                <span className="font-bold text-sm tracking-widest text-foreground">BIKASH</span>
                <div className="h-4 w-px bg-border" />
                <div className="flex gap-6 text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    {navItems.map((item) => {
                        if (item.label === "Profile") {
                            return (
                                <motion.button
                                    key={item.id}
                                    onClick={item.onClick}
                                    className={`relative px-4 py-2 text-sm font-mono tracking-widest transition-colors ${item.active ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"
                                        }`}
                                >
                                    {item.label}
                                </motion.button>
                            )
                        }
                        return null; // Render nothing for other items in this loop
                    })}

                    {/* Replaced Link with Transition Button */}
                    <button
                        onClick={() => transition('/work')}
                        onMouseEnter={() => setHovered('WORKS')}
                        onMouseLeave={() => setHovered(null)}
                        className="relative group px-4 py-2"
                    >
                        <span className={`text-xs font-bold tracking-[0.2em] transition-colors duration-300 ${hovered === 'WORKS' ? 'text-cyan-400' : 'text-zinc-500'}`}>
                            WORKS
                        </span>
                        {/* Hover Line */}
                        <motion.div
                            className="absolute bottom-0 left-0 h-[1px] bg-cyan-500"
                            initial={{ width: 0 }}
                            animate={{ width: hovered === 'WORKS' ? "100%" : 0 }}
                        />
                    </button>

                    {navItems.map((item) => {
                        if (item.label !== "Profile") {
                            return (
                                <motion.button
                                    key={item.id}
                                    onClick={item.onClick}
                                    className={`relative px-4 py-2 text-sm font-mono tracking-widest transition-colors ${item.active ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"
                                        }`}
                                >
                                    {item.label}
                                </motion.button>
                            )
                        }
                        return null; // Render nothing for NEXUS in this loop
                    })}
                </div>
            </div>
        </motion.nav>
    )
}

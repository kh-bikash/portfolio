"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import React, { useState, useEffect } from "react"
import { GlitchText } from "@/components/dom/GlitchText"

function DataStream() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden opacity-[0.03] pointer-events-none">
            {Array.from({ length: 10 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute top-0 text-[10px] font-mono text-zinc-900 whitespace-nowrap animate-marquee"
                    style={{
                        left: `${i * 10}%`,
                        animationDuration: `${10 + Math.random() * 20}s`,
                        animationDelay: `-${Math.random() * 10}s`,
                        writingMode: 'vertical-rl'
                    }}
                >
                    {Array.from({ length: 50 }).map(() => Math.random() > 0.5 ? '1' : '0').join(' ')}
                </div>
            ))}
        </div>
    )
}

function Typewriter({ text, delay }: { text: string, delay: number }) {
    const [displayed, setDisplayed] = useState("")

    useEffect(() => {
        let i = 0
        const timer = setTimeout(() => {
            const interval = setInterval(() => {
                setDisplayed(text.slice(0, i + 1))
                i++
                if (i >= text.length) clearInterval(interval)
            }, 30)
            return () => clearInterval(interval)
        }, delay * 1000)
        return () => clearTimeout(timer)
    }, [text, delay])

    return <span>{displayed}<span className="animate-pulse text-cyan-500">_</span></span>
}

export function PortalLanding({ onEnter }: { onEnter: () => void }) {
    return (
        <section className="relative w-full h-screen flex flex-col items-center justify-center bg-zinc-50 overflow-hidden">

            {/* Background ambience */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
                <DataStream />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center space-y-8 p-6 select-none cursor-default">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <h2 className="text-xs md:text-sm font-mono text-zinc-500 tracking-[0.2em] uppercase">
                            <GlitchText text="System Online" />
                        </h2>
                    </div>

                    <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-zinc-900 mb-4 mix-blend-darken">
                        BIKASH
                    </h1>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-xl md:text-2xl font-light text-zinc-500 tracking-tight">
                        <span className="font-mono text-cyan-600 font-bold">&lt;AI Engineer /&gt;</span>
                        <span className="hidden md:block w-px h-6 bg-zinc-300" />
                        <span>Creative Developer</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="max-w-xl mx-auto h-12" // Height reserved for typewriter
                >
                    <p className="text-sm md:text-base text-zinc-600 leading-relaxed font-mono">
                        <Typewriter text="Architecting neural networks and immersive digital experiences. Welcome to my digital cortex." delay={0.8} />
                    </p>
                </motion.div>

                <motion.button
                    onClick={onEnter}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ delay: 2.5 }}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 mt-12 overflow-hidden rounded-full hover:bg-zinc-800 transition-all ring-1 ring-zinc-900/5 shadow-2xl shadow-zinc-500/20 active:scale-95"
                >
                    {/* Cyber Glass Shine */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />

                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-50">Enter System</span>
                    <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </motion.button>

            </div>

            {/* Footer info */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-12 text-[10px] font-mono text-zinc-400 tracking-widest uppercase"
            >
                System v2.0 // Neural Link Ready
            </motion.div>

        </section>
    )
}

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function LiveStats() {
    // Generate simulated contribution data (last 365 days)
    const [weeks, setWeeks] = useState<number[][]>([])

    useEffect(() => {
        const data = []
        for (let i = 0; i < 52; i++) {
            const week: number[] = []
            for (let j = 0; j < 7; j++) {
                // Random intensity 0-4
                // Biased towards 0 (empty) and 1-2 (moderate)
                const rand = Math.random()
                let level = 0
                if (rand > 0.85) level = 4 // High
                else if (rand > 0.6) level = 3
                else if (rand > 0.4) level = 2
                else if (rand > 0.2) level = 1
                week.push(level)
            }
            data.push(week)
        }
        setWeeks(data)
    }, [])

    const getColor = (level: number) => {
        switch (level) {
            case 1: return "bg-cyan-900/40"
            case 2: return "bg-cyan-700/60"
            case 3: return "bg-cyan-500/80"
            case 4: return "bg-cyan-300"
            default: return "bg-zinc-200" // Empty
        }
    }

    return (
        <section className="relative w-full py-24 px-4 md:px-12 bg-zinc-50 border-t border-zinc-200 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">

                {/* Text Content */}
                <div className="w-full md:w-1/3 space-y-4">
                    <h2 className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-cyan-600 uppercase">Live Telemetry</h2>
                    <h3 className="text-3xl font-light text-zinc-800">Code <span className="font-serif italic text-zinc-400">Frequency</span></h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                        Visualizing neural output over the last circadian cycle. High-density coding bursts detected in the late-night sectors.
                    </p>
                    <div className="flex gap-4 text-xs font-mono text-zinc-400 pt-4">
                        <div>
                            <span className="block text-zinc-900 font-bold text-lg">1,248</span>
                            <span>COMMITS</span>
                        </div>
                        <div>
                            <span className="block text-zinc-900 font-bold text-lg">342</span>
                            <span>PRS</span>
                        </div>
                        <div>
                            <span className="block text-zinc-900 font-bold text-lg">98%</span>
                            <span>UPTIME</span>
                        </div>
                    </div>
                </div>

                {/* The Grid */}
                <div className="w-full md:w-2/3 overflow-x-auto pb-4">
                    <div className="flex gap-[3px] min-w-max">
                        {weeks.map((week, i) => (
                            <div key={i} className="flex flex-col gap-[3px]">
                                {week.map((level, j) => (
                                    <motion.div
                                        key={j}
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.01 + j * 0.005, duration: 0.2 }}
                                        className={`w-3 h-3 rounded-[2px] ${getColor(level)}`}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-2 w-full max-w-[700px]">
                        <span>Jan</span>
                        <span>Mar</span>
                        <span>May</span>
                        <span>Jul</span>
                        <span>Sep</span>
                        <span>Nov</span>
                        <span>Dec</span>
                    </div>
                </div>

            </div>
        </section>
    )
}

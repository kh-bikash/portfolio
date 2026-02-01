"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, Calendar, Hash, ChevronRight } from "lucide-react"

const ENTRIES = [
    {
        id: "001",
        date: "2025-12-20",
        title: "The Singularity Transition",
        tags: ["philosophy", "ai"],
        content: "We are approaching a point where the distinction between human and machine interface becomes negligible. This portfolio is an attempt to visualize that bridge. The neural networks we build are reflections of our own cognitive architecture."
    },
    {
        id: "002",
        date: "2025-12-18",
        title: "Optimizing Neural Pathways",
        tags: ["code", "performance"],
        content: "Reduced inference latency by 40% using quantization. It's fascinating how similar memory management in silicon is to human short-term memory constraints. We must always optimize for the bottleneck."
    },
    {
        id: "003",
        date: "2025-12-15",
        title: "Digital Garden",
        tags: ["meta"],
        content: "Planting seeds of code. Some will grow into massive applications, others will wither as deprecated libraries. The garden must be tended to daily."
    }
]

export function ThoughtLog() {
    const [activeEntry, setActiveEntry] = useState<string | null>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    return (
        <div className="w-full max-w-4xl mx-auto h-[600px] bg-black/80 border border-white/10 rounded-xl overflow-hidden flex flex-col backdrop-blur-md shadow-2xl">
            {/* HEADER */}
            <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2 bg-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <div className="ml-4 flex items-center gap-2 text-xs font-mono text-gray-400">
                    <Terminal className="w-3 h-3" />
                    <span>bikash@cortex:~/thoughts</span>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* SIDEBAR LIST */}
                <div className="w-1/3 border-r border-white/10 overflow-y-auto p-4 space-y-2">
                    {ENTRIES.map(entry => (
                        <button
                            key={entry.id}
                            onClick={() => setActiveEntry(entry.id)}
                            className={`w-full text-left p-3 rounded-lg border transition-all group ${activeEntry === entry.id
                                    ? "bg-primary/10 border-primary/50 text-white"
                                    : "bg-transparent border-transparent hover:bg-white/5 text-gray-400"
                                }`}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-mono text-[10px] opacity-50">#{entry.id}</span>
                                <span className="font-mono text-[10px] opacity-50">{entry.date}</span>
                            </div>
                            <div className="font-bold text-xs truncate group-hover:text-primary transition-colors">{entry.title}</div>
                        </button>
                    ))}
                </div>

                {/* CONTENT AREA */}
                <div className="flex-1 p-8 overflow-y-auto font-mono relative">
                    <AnimatePresence mode="wait">
                        {activeEntry ? (
                            <motion.div
                                key={activeEntry}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-6"
                            >
                                {ENTRIES.filter(e => e.id === activeEntry).map(entry => (
                                    <div key={entry.id}>
                                        <h1 className="text-2xl font-bold text-primary mb-2 tracking-tight">{entry.title}</h1>
                                        <div className="flex gap-4 text-xs text-gray-500 mb-8 border-b border-white/10 pb-4">
                                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {entry.date}</span>
                                            <span className="flex items-center gap-1"><Hash className="w-3 h-3" /> {entry.tags.join(", ")}</span>
                                        </div>
                                        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{entry.content}</p>

                                        <div className="mt-12 pt-8 border-t border-white/5 text-[10px] text-gray-600 animate-pulse">
                                            _ END_OF_FILE
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-600 space-y-4">
                                <Terminal className="w-12 h-12 opacity-20" />
                                <p className="text-xs tracking-widest">SELECT_MEMORY_LOG</p>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* SCANLINE OVERLAY */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none opacity-50" />
                </div>
            </div>
        </div>
    )
}

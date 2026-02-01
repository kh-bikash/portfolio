"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function NeuralLoader() {
    const [loading, setLoading] = useState(true)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        // Simulate Loading
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setTimeout(() => setLoading(false), 500) // Brief pause at 100%
                    return 100
                }
                return prev + Math.random() * 5 // Random increments
            })
        }, 50)

        return () => clearInterval(interval)
    }, [])

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100000] bg-black flex flex-col items-center justify-center text-primary font-mono"
                >
                    {/* OPTIC SCANNER */}
                    <div className="relative w-64 h-64 border border-primary/20 rounded-full flex items-center justify-center mb-12 overflow-hidden">
                        <div className="absolute inset-0 border-t-2 border-primary/50 animate-[spin_3s_linear_infinite]" />
                        <div className="absolute inset-2 border-r-2 border-primary/30 animate-[spin_2s_linear_infinite_reverse]" />

                        {/* Scanning Line */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-[scan_2s_ease-in-out_infinite] h-full" style={{ backgroundSize: "100% 10px" }} />

                        <div className="text-4xl font-black tracking-tighter animate-pulse">
                            {Math.round(progress)}%
                        </div>
                    </div>

                    {/* STATUS TEXT */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="text-xs tracking-[0.5em] text-primary/70 uppercase">
                            {progress < 30 ? "Initializing Core..." :
                                progress < 70 ? "Loading Neural Weights..." :
                                    progress < 100 ? "Syncing Interface..." : "Access Granted"}
                        </div>

                        {/* LOADING BAR */}
                        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-primary"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* DECORATIVE CORNERS */}
                    <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-primary/50" />
                    <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-primary/50" />

                </motion.div>
            )}
        </AnimatePresence>
    )
}

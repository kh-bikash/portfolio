"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function AIDreamMode() {
    const [isDreaming, setIsDreaming] = useState(false)

    useEffect(() => {
        let timeout: NodeJS.Timeout

        const resetTimer = () => {
            setIsDreaming(false)
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                setIsDreaming(true)
            }, 30000) // 30 seconds idle time
        }

        // Listeners for activity
        window.addEventListener("mousemove", resetTimer)
        window.addEventListener("keydown", resetTimer)
        window.addEventListener("scroll", resetTimer)
        window.addEventListener("click", resetTimer)

        resetTimer() // Init

        return () => {
            clearTimeout(timeout)
            window.removeEventListener("mousemove", resetTimer)
            window.removeEventListener("keydown", resetTimer)
            window.removeEventListener("scroll", resetTimer)
            window.removeEventListener("click", resetTimer)
        }
    }, [])

    return (
        <AnimatePresence>
            {isDreaming && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="fixed inset-0 z-[100] bg-black cursor-none overflow-hidden flex items-center justify-center"
                >
                    {/* Background Noise */}
                    <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                    {/* Generative Blobs */}
                    <motion.div
                        animate={{
                            scale: [1, 1.5, 1],
                            rotate: [0, 180, 360],
                            filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[800px] h-[800px] bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-[100px]"
                    />

                    <motion.div
                        animate={{
                            scale: [1.5, 1, 1.5],
                            x: [-100, 100, -100],
                            y: [-100, 100, -100],
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-[600px] h-[600px] bg-gradient-to-bl from-blue-600/20 via-green-500/20 to-yellow-500/20 rounded-full blur-[80px]"
                    />

                    {/* Text Overlay */}
                    <div className="relative z-10 text-center mix-blend-difference">
                        <motion.h2
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="text-white text-xs font-mono tracking-[0.5em] mb-4"
                        >
                            SYSTEM IDLE
                        </motion.h2>
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-4xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-400 to-zinc-800"
                        >
                            DREAMING
                        </motion.h1>
                        <p className="text-white/30 text-[10px] mt-4 font-mono">
                            PROCESSING NEURAL PATHWAYS...
                        </p>
                    </div>

                    {/* Wake Up Hint */}
                    <div className="absolute bottom-12 left-0 w-full text-center">
                        <motion.p
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-white/20 text-[10px] tracking-widest uppercase"
                        >
                            Move cursor to wake
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

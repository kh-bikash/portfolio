"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useUIStore } from "@/store/useUIStore"

const LOADING_LOGS = [
    "INITIALIZING_NEURAL_CORE...",
    "LOADING_WEIGHTS_V4.5...",
    "CONNECTING_TO_SATELLITE_UPLINK...",
    "ESTABLISHING_HANDSHAKE...",
    "DECRYPTING_SECURE_CHANNEL...",
    "SYSTEM_READY."
]

export function IntroSequence() {
    const { isLoaded, setLoaded, setView } = useUIStore()
    const [logIndex, setLogIndex] = useState(0)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (isLoaded) return

        // Simulate Loading
        const timer = setInterval(() => {
            setProgress(prev => {
                const next = prev + Math.random() * 5
                if (next >= 100) {
                    clearInterval(timer)
                    setTimeout(() => setLoaded(true), 1000) // Delay before exit
                    return 100
                }
                return next
            })
        }, 100)

        const logTimer = setInterval(() => {
            setLogIndex(prev => (prev < LOADING_LOGS.length - 1 ? prev + 1 : prev))
        }, 800)

        return () => {
            clearInterval(timer)
            clearInterval(logTimer)
        }
    }, [isLoaded, setLoaded])

    return (
        <AnimatePresence>
            {!isLoaded && (
                <motion.div
                    className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono text-primary"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
                >
                    {/* Central Logo / Loader */}
                    <div className="w-64 mb-8 relative">
                        <div className="h-1 w-full bg-primary/20 overflow-hidden">
                            <motion.div
                                className="h-full bg-primary"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-[10px] mt-2 opacity-50">
                            <span>LOADING</span>
                            <span>{Math.floor(progress)}%</span>
                        </div>
                    </div>

                    {/* Terminal Logs */}
                    <div className="h-8 overflow-hidden text-xs tracking-widest text-center">
                        <motion.span
                            key={logIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            {`> ${LOADING_LOGS[logIndex]}`}
                        </motion.span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

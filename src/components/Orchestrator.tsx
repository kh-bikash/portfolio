"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { PortalLanding } from "@/components/PortalLanding"
import { NexusEntry } from "@/components/NexusEntry"

export function Orchestrator({ initialMode = "portal" }: { initialMode?: "portal" | "transition" | "brain" }) {
    const [mode, setMode] = useState<"portal" | "transition" | "brain">(initialMode)

    const handleEnter = () => {
        setMode("transition")
        window.history.pushState({}, "", "/brain")
        // The zoom transition takes about 1.2s in PortalLanding, so we map the mode change
        setTimeout(() => setMode("brain"), 1000)
    }

    return (
        <div className={`relative w-full ${mode === "portal" ? "h-screen overflow-hidden" : "min-h-screen"}`}>

            {/* Traveling through the AI network flash */}
            <AnimatePresence>
                {mode === "transition" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="fixed inset-0 z-[100] bg-white dark:bg-black pointer-events-none mix-blend-normal"
                    >
                        {/* Rapid zoom particles simulation */}
                        <motion.div 
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 10, opacity: 0 }}
                            transition={{ duration: 1, ease: 'easeIn' }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-[40px] border-cyan-500/10 rounded-full blur-2xl"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {(mode === "portal" || mode === "transition") && (
                    <motion.div
                        key="portal"
                        className="absolute inset-0 z-20 origin-center"
                        exit={{ opacity: 0 }}
                    >
                        <PortalLanding onEnter={handleEnter} isTransitioning={mode === "transition"} />
                    </motion.div>
                )}

                {mode === "brain" && (
                    <motion.div
                        key="brain"
                        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative z-10 w-full min-h-screen"
                    >
                        <NexusEntry />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

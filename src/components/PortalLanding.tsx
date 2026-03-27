"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

function AmbientIntelligence() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none mix-blend-screen">
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                    rotate: [0, 90, 180, 270, 360]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-cyan-400/20 rounded-full blur-[120px]"
            />
            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.5, 0.2],
                    rotate: [360, 270, 180, 90, 0]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-blue-500/20 rounded-full blur-[140px]"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.4, 0.7, 0.4],
                    x: [0, 100, 0],
                    y: [0, -100, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[20%] left-[30%] w-[40vw] h-[40vw] bg-purple-500/10 rounded-full blur-[100px]"
            />
        </div>
    )
}

export function PortalLanding({ onEnter, isTransitioning }: { onEnter: () => void, isTransitioning?: boolean }) {
    return (
        <section className="relative w-full h-screen flex flex-col items-center justify-center bg-[#fdfdfd] dark:bg-black overflow-hidden font-sans">
            
            {/* Apple Intelligence Style Ambient Background */}
            <AmbientIntelligence />

            {/* Content */}
            <motion.div 
                className="relative z-10 text-center px-6 md:px-12 flex flex-col items-center"
                animate={isTransitioning ? { scale: 5, opacity: 0, filter: "blur(20px)" } : { scale: 1, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center"
                >
                    <h2 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 tracking-[0.2em] uppercase mb-8">
                        Neural Interface Online
                    </h2>
                    
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-zinc-900 dark:text-white mb-6 leading-none">
                        Bikash<span className="text-cyan-500">.</span>
                    </h1>
                    
                    <div className="flex flex-col md:flex-row items-center gap-4 text-xl md:text-2xl text-zinc-500 font-light tracking-tight">
                        <span className="text-zinc-900 dark:text-white font-medium">AI Engineer</span>
                        <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                        <span>System Architect</span>
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-8 max-w-lg text-lg text-zinc-500 dark:text-zinc-400 font-light leading-relaxed"
                >
                    Step into my intelligence engine. Architecting elegant neural networks and seamless digital experiences.
                </motion.p>

                <motion.button
                    onClick={onEnter}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ 
                        opacity: { duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] },
                        y: { duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] },
                        scale: { duration: 0.2 }
                    }}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white dark:bg-white dark:text-black mt-16 rounded-full font-medium transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.16)] dark:shadow-none"
                >
                    <span>Initialize System</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
            </motion.div>
            
            <motion.div
                initial={{ opacity: 0 }}
                animate={isTransitioning ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-12 text-sm text-zinc-400 dark:text-zinc-600 font-medium"
            >
                2026 © Kh Bikash
            </motion.div>
        </section>
    )
}

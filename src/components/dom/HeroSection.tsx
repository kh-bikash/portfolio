"use client"

import { motion } from "framer-motion"

export function HeroSection() {
    return (
        <section id="nexus" className="relative w-full h-[90vh] flex flex-col items-center justify-center bg-[#fafafa] dark:bg-black font-sans overflow-hidden">
            
            {/* Massive Parallax Visualizer */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-40 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen mask-radial-faded">
                <motion.div
                    animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                    transition={{ rotate: { duration: 150, repeat: Infinity, ease: "linear" }, scale: { duration: 20, repeat: Infinity, ease: "easeInOut" } }}
                    className="absolute w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] border-[1px] border-zinc-300 dark:border-white/10 rounded-full"
                />
                <motion.div
                    animate={{ rotate: -360, scale: [1, 1.1, 1] }}
                    transition={{ rotate: { duration: 200, repeat: Infinity, ease: "linear" }, scale: { duration: 15, repeat: Infinity, ease: "easeInOut" } }}
                    className="absolute w-[60vw] h-[60vw] md:w-[45vw] md:h-[45vw] border-[1px] border-zinc-300 dark:border-white/10 rounded-full border-dashed"
                />
                <motion.div
                    animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                    transition={{ rotate: { duration: 100, repeat: Infinity, ease: "linear" }, scale: { duration: 25, repeat: Infinity, ease: "easeInOut" } }}
                    className="absolute w-[40vw] h-[40vw] md:w-[30vw] md:h-[30vw] border-[1px] border-cyan-500/30 dark:border-cyan-400/20 rounded-full"
                />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center px-6 mt-16">
                
                {/* Floating Apple-Widget Status Pill */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-2 mb-10 px-5 py-2.5 bg-white/40 dark:bg-white/5 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none"
                >
                    <div className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                    </div>
                    <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 tracking-widest uppercase">
                        Systems Optimal
                    </span>
                </motion.div>

                {/* Hero Title */}
                <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-6xl md:text-8xl lg:text-[8rem] font-semibold tracking-tighter text-zinc-900 dark:text-white leading-[0.9] mb-8"
                >
                    Intelligence <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600 dark:from-zinc-400 dark:to-zinc-600 font-light italic text-5xl md:text-7xl lg:text-[7rem]">Core.</span>
                </motion.h1>

                <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg md:text-2xl text-zinc-500 dark:text-zinc-400 font-light max-w-2xl leading-relaxed"
                >
                    The absolute nexus of my digital consciousness. Scroll to interface with the network logic.
                </motion.p>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-12 flex flex-col items-center gap-3 text-zinc-400 dark:text-zinc-500"
            >
                <span className="text-xs font-semibold tracking-widest uppercase">Scroll</span>
                <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-px h-12 bg-gradient-to-b from-zinc-300 dark:from-white/20 to-transparent"
                />
            </motion.div>

        </section>
    )
}

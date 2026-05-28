"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function ShojiDoorPush() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const leftX = useTransform(scrollYProgress, [0.2, 0.7], ["0%", "-100%"])
    const rightX = useTransform(scrollYProgress, [0.2, 0.7], ["0%", "100%"])
    const lightOpacity = useTransform(scrollYProgress, [0.15, 0.5], [0, 0.6])
    const contentOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1])

    return (
        <div ref={ref} className="relative w-full h-[300vh]">
            <div className="sticky top-0 w-full h-screen overflow-hidden bg-[var(--paper)]">

                {/* Light leaking through gap */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ opacity: lightOpacity }}
                >
                    <div className="w-[2px] h-[80vh] bg-gradient-to-b from-transparent via-[#E8A87C]/60 to-transparent blur-sm" />
                    <div className="absolute w-[100px] h-[80vh] bg-[#E8A87C]/5 blur-[40px]" />
                </motion.div>

                {/* Left shōji panel */}
                <motion.div
                    className="absolute top-0 left-0 w-1/2 h-full z-10"
                    style={{ x: leftX }}
                >
                    <div className="w-full h-full bg-[#F0E8DA] border-r border-[#C5B8A0] relative overflow-hidden">
                        {/* Paper texture */}
                        <div className="absolute inset-0 opacity-[0.04]"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                            }}
                        />
                        {/* Wood frame grid */}
                        <div className="absolute inset-4 border border-[#B8A888]/40">
                            {/* Horizontal dividers */}
                            <div className="absolute left-0 right-0 top-1/3 h-[2px] bg-[#B8A888]/30" />
                            <div className="absolute left-0 right-0 top-2/3 h-[2px] bg-[#B8A888]/30" />
                            {/* Vertical divider */}
                            <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-[#B8A888]/30" />
                        </div>
                        {/* Handle */}
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-2 h-16 rounded-full bg-[#8B7355]/40" />
                    </div>
                </motion.div>

                {/* Right shōji panel */}
                <motion.div
                    className="absolute top-0 right-0 w-1/2 h-full z-10"
                    style={{ x: rightX }}
                >
                    <div className="w-full h-full bg-[#F0E8DA] border-l border-[#C5B8A0] relative overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.04]"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                            }}
                        />
                        <div className="absolute inset-4 border border-[#B8A888]/40">
                            <div className="absolute left-0 right-0 top-1/3 h-[2px] bg-[#B8A888]/30" />
                            <div className="absolute left-0 right-0 top-2/3 h-[2px] bg-[#B8A888]/30" />
                            <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-[#B8A888]/30" />
                        </div>
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 w-2 h-16 rounded-full bg-[#8B7355]/40" />
                    </div>
                </motion.div>

                {/* Content revealed behind doors */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
                    style={{ opacity: contentOpacity }}
                >
                    <p className="text-[var(--ink-faded)] text-sm tracking-[0.4em] uppercase font-sans">
                        selected works
                    </p>
                </motion.div>
            </div>
        </div>
    )
}

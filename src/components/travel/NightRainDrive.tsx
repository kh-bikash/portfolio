"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { NightDrive } from "@/components/three/NightDrive"

export function NightRainDrive() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0, 1, 1, 0])

    // Streaking light positions driven by scroll
    const streak1X = useTransform(scrollYProgress, [0, 0.5], ["100%", "-100%"])
    const streak2X = useTransform(scrollYProgress, [0.1, 0.6], ["100%", "-100%"])
    const streak3X = useTransform(scrollYProgress, [0.2, 0.7], ["100%", "-100%"])
    const streak4X = useTransform(scrollYProgress, [0.3, 0.8], ["100%", "-100%"])
    const streak5X = useTransform(scrollYProgress, [0.15, 0.65], ["100%", "-100%"])

    return (
        <motion.div
            ref={ref}
            className="relative w-full h-[350vh]"
            style={{ opacity }}
        >
            <div className="sticky top-0 w-full h-screen overflow-hidden" style={{ background: "linear-gradient(to bottom, #2B1B35 0%, #512752 35%, #8E3A5A 65%, #C85C5E 85%, #E89E78 100%)" }}>
                {/* 3D Rain + Bokeh */}
                <NightDrive />

                {/* CSS Streaking lights (supplementary) */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[streak1X, streak2X, streak3X, streak4X, streak5X].map((x, i) => (
                        <motion.div
                            key={i}
                            className="absolute h-[2px] rounded-full"
                            style={{
                                x,
                                top: `${20 + i * 15}%`,
                                width: `${100 + i * 40}px`,
                                background: i % 2 === 0
                                    ? "linear-gradient(90deg, transparent, #FFB84D, transparent)"
                                    : "linear-gradient(90deg, transparent, #E5989B, transparent)",
                                opacity: 0.2 + (i % 3) * 0.1,
                                filter: `blur(${1 + i * 0.5}px)`,
                            }}
                        />
                    ))}
                </div>

                {/* Road reflection */}
                <div className="absolute bottom-0 left-0 right-0 h-[25vh]"
                    style={{
                        background: "linear-gradient(180deg, transparent 0%, rgba(255,184,77,0.03) 50%, rgba(255,184,77,0.06) 100%)"
                    }}
                />

                {/* Windshield frame hint */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse 90% 80% at center 55%, transparent 50%, #2B1B35 100%)"
                    }}
                />

                {/* Dashboard glow */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                    <div className="w-[200px] h-[2px] bg-gradient-to-r from-transparent via-[#FFB84D]/30 to-transparent" />
                </div>

                {/* Subtitle hint */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                    <p className="text-[#E8D5C4]/60 text-sm md:text-base tracking-[0.5em] uppercase font-sans font-bold">
                        twilight descends
                    </p>
                </div>
            </div>
        </motion.div>
    )
}

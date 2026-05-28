"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { PaperCorridorCanvas, setCorridorScroll } from "@/components/three/PaperCorridor"

export function CorridorWalk() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const progress = useTransform(scrollYProgress, [0.15, 0.85], [0, 1])
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0, 1, 1, 0])

    // Push scroll progress to the 3D scene via shared ref
    useMotionValueEvent(progress, "change", (v) => {
        setCorridorScroll(Math.max(0, Math.min(1, v)))
    })

    return (
        <motion.div
            ref={ref}
            className="relative w-full h-[350vh]"
            style={{ opacity }}
        >
            <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#1A1918]">
                {/* 3D Corridor */}
                <div className="absolute inset-0">
                    <PaperCorridorCanvas />
                </div>

                {/* Warm light at end of corridor */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[200px] h-[300px] bg-[#E8A87C]/10 rounded-full blur-[80px]" />
                </div>

                {/* Vignette */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse at center, transparent 40%, rgba(26,25,24,0.6) 100%)"
                    }}
                />

                {/* Progress hint */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none">
                    <p className="text-[#8B8680]/30 text-[10px] tracking-[0.5em] uppercase font-sans">
                        keep scrolling
                    </p>
                </div>
            </div>
        </motion.div>
    )
}

"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxLayerProps {
    speed?: number
    direction?: "vertical" | "horizontal"
    className?: string
    children: React.ReactNode
}

export function ParallaxLayer({ speed = 0.5, direction = "vertical", className = "", children }: ParallaxLayerProps) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const range = 200 * (1 - speed)
    const y = useTransform(scrollYProgress, [0, 1], [-range, range])
    const x = useTransform(scrollYProgress, [0, 1], [-range, range])

    return (
        <motion.div
            ref={ref}
            style={direction === "vertical" ? { y } : { x }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

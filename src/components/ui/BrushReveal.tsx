"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface BrushRevealProps {
    children: string
    as?: "h1" | "h2" | "h3" | "p" | "span"
    className?: string
    delay?: number
    stagger?: number
    mode?: "word" | "letter" | "line"
}

export function BrushReveal({
    children,
    as: Tag = "h2",
    className = "",
    delay = 0,
    stagger = 0.05,
    mode = "word"
}: BrushRevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-80px" })

    const units = mode === "letter"
        ? children.split("")
        : mode === "word"
            ? children.split(" ")
            : [children]

    return (
        <Tag ref={ref as any} className={`${className} overflow-hidden`}>
            {units.map((unit, i) => (
                <motion.span
                    key={i}
                    initial={{ y: "110%", opacity: 0, rotateX: 40, filter: "blur(4px)" }}
                    animate={isInView ? { y: "0%", opacity: 1, rotateX: 0, filter: "blur(0px)" } : {}}
                    transition={{
                        duration: 0.8,
                        delay: delay + i * stagger,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    className="inline-block origin-bottom"
                    style={{ perspective: "400px" }}
                >
                    {unit}
                    {mode === "word" && i < units.length - 1 ? "\u00A0" : ""}
                </motion.span>
            ))}
        </Tag>
    )
}

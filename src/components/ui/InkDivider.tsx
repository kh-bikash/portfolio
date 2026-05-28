"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface InkDividerProps {
    className?: string
    color?: string
    width?: number
}

export function InkDivider({ className = "", color = "var(--ink-ghost)", width = 200 }: InkDividerProps) {
    const ref = useRef<SVGSVGElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-40px" })

    return (
        <div className={`flex justify-center py-8 ${className}`}>
            <svg
                ref={ref}
                width={width}
                height="12"
                viewBox={`0 0 ${width} 12`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <motion.path
                    d={`M0 6 Q${width * 0.15} 2, ${width * 0.3} 5 T${width * 0.6} 7 T${width} 6`}
                    stroke={color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 0.4 } : {}}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
            </svg>
        </div>
    )
}

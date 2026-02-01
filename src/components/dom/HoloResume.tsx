"use client"

import { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Download, FileText } from "lucide-react"

export function HoloResume() {
    const ref = useRef<HTMLDivElement>(null)
    const [hover, setHover] = useState(false)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"])
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"])

    const sheenGradient = useTransform(
        mouseX,
        [-0.5, 0.5],
        ["linear-gradient(to right, transparent 0%, rgba(255,255,255,0) 0%, transparent 100%)", "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)"]
    )

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()

        const width = rect.width
        const height = rect.height

        const mouseXVal = e.clientX - rect.left - width / 2
        const mouseYVal = e.clientY - rect.top - height / 2

        x.set(mouseXVal / width)
        y.set(mouseYVal / height)
    }

    const handleMouseLeave = () => {
        setHover(false)
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative w-64 h-80 rounded-xl bg-zinc-900 border border-zinc-800 cursor-pointer group perspective-1000"
        >
            {/* Holographic Sheen */}
            <div className={`absolute inset-0 rounded-xl z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-transparent via-cyan-500/10 to-transparent`} />

            {/* Content Depth 1 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ transform: "translateZ(20px)" }}>
                <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center mb-6 border border-zinc-700 group-hover:border-cyan-500/50 transition-colors">
                    <FileText className="w-8 h-8 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-zinc-100 tracking-widest">RESUME</h3>
                <p className="text-xs text-zinc-500 font-mono mt-2">NEURAL_RECORD_V2.PDF</p>
            </div>

            {/* Content Depth 2 (Button) */}
            <div className="absolute bottom-8 left-0 w-full flex justify-center" style={{ transform: "translateZ(40px)" }}>
                <a
                    href="/resume.pdf"
                    download
                    className="px-6 py-2 bg-white text-zinc-900 rounded-full text-xs font-bold tracking-wider hover:bg-cyan-400 transition-colors flex items-center gap-2 pointer-events-auto"
                >
                    <Download className="w-3 h-3" />
                    DOWNLOAD
                </a>
            </div>

            {/* Border Glow */}
            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-cyan-500/30 transition-colors" style={{ transform: "translateZ(10px)" }} />
        </motion.div>
    )
}

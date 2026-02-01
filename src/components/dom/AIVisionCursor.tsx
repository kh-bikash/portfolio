"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function AIVisionCursor() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [targetData, setTargetData] = useState<{ tag: string, width: number, height: number, text: string } | null>(null)
    const [isHovering, setIsHovering] = useState(false)
    const cursorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY })

            // Analyze Target
            const target = e.target as HTMLElement
            // Robust check for interactive ancestor
            const interactiveElement = target.closest('button') || target.closest('a') || target.closest('.card-interactive')

            if (interactiveElement) {
                const rect = interactiveElement.getBoundingClientRect()
                setIsHovering(true)
                setTargetData({
                    tag: interactiveElement.tagName,
                    width: Math.round(rect.width),
                    height: Math.round(rect.height),
                    text: (interactiveElement.textContent || "").trim().slice(0, 15)
                })
            } else {
                setIsHovering(false)
                setTargetData(null)
            }
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    return (
        <div
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-[100] mix-blend-difference"
            style={{
                // Hide default cursor via CSS in globals if needed, simpler to just overlay
            }}
        >
            {/* Main Reticle */}
            <motion.div
                className={cn(
                    "absolute w-8 h-8 border border-primary/50 rounded-full flex items-center justify-center transition-all duration-100",
                    isHovering ? "w-12 h-12 border-primary border-2 bg-primary/10" : ""
                )}
                style={{
                    x: mousePos.x - (isHovering ? 24 : 16),
                    y: mousePos.y - (isHovering ? 24 : 16)
                }}
            >
                <div className="w-1 h-1 bg-primary rounded-full" />

                {/* Crosshairs */}
                <div className="absolute top-0 w-[1px] h-2 bg-primary/50" />
                <div className="absolute bottom-0 w-[1px] h-2 bg-primary/50" />
                <div className="absolute left-0 h-[1px] w-2 bg-primary/50" />
                <div className="absolute right-0 h-[1px] w-2 bg-primary/50" />
            </motion.div>

            {/* Analysis HUD */}
            <AnimatePresence>
                {isHovering && targetData && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 40 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="absolute top-0 left-0 flex flex-col gap-1"
                        style={{ x: mousePos.x, y: mousePos.y }}
                    >
                        {/* Bracket Line */}
                        <div className="h-[1px] w-8 bg-primary mb-1" />

                        <div className="bg-black/80 border border-primary/30 p-2 rounded-sm backdrop-blur-sm text-[8px] font-mono text-primary leading-tight uppercase tracking-widest shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                            <div className="flex justify-between gap-4">
                                <span className="text-white/50">TARGET:</span>
                                <span>{targetData.tag}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                                <span className="text-white/50">DIM:</span>
                                <span>{targetData.width}x{targetData.height}</span>
                            </div>
                            {targetData.text && (
                                <div className="text-xs text-white mt-1 border-t border-white/10 pt-1">
                                    "{targetData.text}"
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

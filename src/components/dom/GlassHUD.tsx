"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function GlassHUD() {
    const [time, setTime] = useState("")
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            setTime(now.toLocaleTimeString([], { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }))
        }
        const interval = setInterval(updateTime, 1000)
        updateTime()

        let frameId: number
        const handleScroll = () => {
            cancelAnimationFrame(frameId)
            frameId = requestAnimationFrame(() => {
                const total = document.body.scrollHeight - window.innerHeight
                const progress = window.scrollY / total
                setScrollProgress(progress)
            })
        }
        window.addEventListener("scroll", handleScroll)

        return () => {
            clearInterval(interval)
            window.removeEventListener("scroll", handleScroll)
            cancelAnimationFrame(frameId)
        }
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none z-50 text-cyan-900/40 mix-blend-difference">
            {/* Top Left: Coordinates */}
            <div className="absolute top-8 left-8 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-current animate-pulse" />
                    <span className="text-[10px] font-mono tracking-widest uppercase">SYS.ONLINE</span>
                </div>
                <span className="text-[10px] font-mono tracking-widest">{time}</span>
            </div>

            {/* Top Right: Location */}
            <div className="absolute top-8 right-8 text-right hidden md:block">
                <span className="text-[10px] font-mono tracking-widest uppercase block">SECTOR: CORTEX</span>
                <span className="text-[10px] font-mono tracking-widest uppercase block text-xs opacity-50">40.7128° N, 74.0060° W</span>
            </div>

            {/* Bottom Left: Status */}
            <div className="absolute bottom-8 left-8 hidden md:block">
                <div className="flex gap-4">
                    <div className="flex flex-col">
                        <span className="text-[8px] uppercase tracking-widest opacity-50">CPU</span>
                        <span className="text-[10px] font-mono">NORMAL</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[8px] uppercase tracking-widest opacity-50">MEM</span>
                        <span className="text-[10px] font-mono">OPTIMAL</span>
                    </div>
                </div>
            </div>

            {/* Right: Scroll Indicator / Altitude */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 h-64 w-px bg-current/20 hidden md:block">
                <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-1 h-4 bg-current"
                    style={{ top: `${scrollProgress * 100}%` }}
                />
                <div className="absolute top-0 right-2 text-[8px]">000</div>
                <div className="absolute bottom-0 right-2 text-[8px]">100</div>
            </div>

            {/* Center Crosshair (Very subtle) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 opacity-20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-current" />
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-px bg-current" />
            </div>

            {/* Corner Frames */}
            <svg className="absolute inset-0 w-full h-full p-4 pointer-events-none opacity-30">
                <path d="M 20 50 V 20 H 50" fill="none" stroke="currentColor" />
                <path d="M calc(100% - 20px) 50 V 20 H calc(100% - 50px)" fill="none" stroke="currentColor" />
                <path d="M 20 calc(100% - 50px) V calc(100% - 20px) H 50" fill="none" stroke="currentColor" />
                <path d="M calc(100% - 20px) calc(100% - 50px) V calc(100% - 20px) H calc(100% - 50px)" fill="none" stroke="currentColor" />
            </svg>
        </div>
    )
}

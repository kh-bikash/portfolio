"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useBiomeStore } from "@/lib/biome-store"

export function EngineersHUD() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [time, setTime] = useState("")
    const [stats, setStats] = useState({ cpu: 12, ram: 45, net: 24 })

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        let frameId: number
        const handleMouseMove = (e: MouseEvent) => {
            cancelAnimationFrame(frameId)
            frameId = requestAnimationFrame(() => {
                setMousePos({ x: e.clientX, y: e.clientY })
            })
        }
        window.addEventListener("mousemove", handleMouseMove)
        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            cancelAnimationFrame(frameId)
        }
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date()
            setTime(now.toISOString().split('T')[1].split('.')[0] + "Z")

            setStats({
                cpu: Math.floor(Math.random() * 30) + 10,
                ram: Math.floor(Math.random() * 20) + 40,
                net: Math.floor(Math.random() * 50) + 20
            })
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none z-40 select-none overflow-hidden font-mono text-[10px] text-cyan-500/60 uppercase tracking-widest">
            {/* Corner Brackets */}
            <svg className="absolute top-8 left-8 w-16 h-16 opacity-50" viewBox="0 0 100 100">
                <path d="M0 0 L30 0 L30 2 M0 2 L0 30 L2 30 L2 2" fill="currentColor" />
            </svg>
            <svg className="absolute top-8 right-8 w-16 h-16 opacity-50 rotate-90" viewBox="0 0 100 100">
                <path d="M0 0 L30 0 L30 2 M0 2 L0 30 L2 30 L2 2" fill="currentColor" />
            </svg>
            <svg className="absolute bottom-8 left-8 w-16 h-16 opacity-50 -rotate-90" viewBox="0 0 100 100">
                <path d="M0 0 L30 0 L30 2 M0 2 L0 30 L2 30 L2 2" fill="currentColor" />
            </svg>
            <svg className="absolute bottom-8 right-8 w-16 h-16 opacity-50 rotate-180" viewBox="0 0 100 100">
                <path d="M0 0 L30 0 L30 2 M0 2 L0 30 L2 30 L2 2" fill="currentColor" />
            </svg>

            {/* Top Center: System Status */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-8 border-t border-cyan-500/30 pt-2">
                <div>SYS.OP: NORMAL</div>
                <div>SEC.LVL: 3</div>
                <div>NET.LAT: {stats.net}ms</div>
            </div>

            {/* Bottom Left: Coordinates */}
            <div className="absolute bottom-8 left-12 flex flex-col gap-1">
                <div className="flex gap-4">
                    <span>X: {mousePos.x.toString().padStart(4, '0')}</span>
                    <span>Y: {mousePos.y.toString().padStart(4, '0')}</span>
                </div>
                <div className="text-[8px] opacity-70">
                    TARGETING_VECTOR_CALC...
                </div>
            </div>

            {/* Bottom Right: Resources */}
            <div className="absolute bottom-8 right-12 text-right flex flex-col gap-1">
                <div>CPU: {stats.cpu}%</div>
                <div>RAM: {stats.ram}%</div>
                <div>UPTIME: {time}</div>
            </div>

            {/* Right Side: Vertical Meter */}
            <div className="absolute top-1/2 right-6 -translate-y-1/2 flex flex-col gap-1 w-1">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-full bg-cyan-500"
                        animate={{
                            opacity: [0.1, 0.6, 0.1],
                            height: [2, 10, 2]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            {/* Center Crosshair (Subtle) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 opacity-20">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-500" />
                <div className="absolute left-1/2 top-0 h-full w-[1px] bg-cyan-500" />
            </div>

            {/* Biome Switcher (Dev Tools) */}
            <div className="flex gap-1">
                {(['cyber', 'organic', 'industrial'] as const).map(biome => (
                    <button
                        key={biome}
                        onClick={() => useBiomeStore.getState().setBiome(biome)}
                        className="bg-black/50 border border-white/10 px-2 py-1 text-[7px] uppercase hover:bg-white/10 transition-colors text-white/50 hover:text-white"
                    >
                        {biome}
                    </button>
                ))}
            </div>
        </div>
    )
}

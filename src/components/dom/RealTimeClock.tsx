"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export function RealTimeClock() {
    const [time, setTime] = useState("")
    const requestRef = useRef<number>()

    const updateTime = () => {
        const now = new Date()
        const h = now.getHours().toString().padStart(2, '0')
        const m = now.getMinutes().toString().padStart(2, '0')
        const s = now.getSeconds().toString().padStart(2, '0')
        const ms = now.getMilliseconds().toString().padStart(3, '0')

        setTime(`${h}:${m}:${s}:${ms}`)
        requestRef.current = requestAnimationFrame(updateTime)
    }

    useEffect(() => {
        requestRef.current = requestAnimationFrame(updateTime)
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current)
        }
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed top-8 right-8 z-40 flex flex-col items-end pointer-events-none hidden md:flex"
        >
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <h1 className="text-2xl font-bold font-mono text-white tracking-widest tabular-nums leading-none">
                    {time}
                </h1>
            </div>
            <div className="flex gap-4 mt-1">
                <span className="text-[10px] text-primary/50 font-mono tracking-widest">LOC: INDIA</span>
                <span className="text-[10px] text-primary/50 font-mono tracking-widest">SYS: ONLINE</span>
            </div>
        </motion.div>
    )
}

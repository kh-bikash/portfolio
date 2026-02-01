"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

import { MagneticButton } from "@/components/dom/MagneticButton"

export function MassiveFooter() {
    const [time, setTime] = useState<string>("")

    useEffect(() => {
        const updateTime = () => {
            setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
        }
        updateTime()
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <footer className="relative w-full h-[80vh] bg-foreground text-background flex flex-col justify-between p-6 md:p-12 overflow-hidden">

            {/* Top Section */}
            <div className="flex justify-between items-start z-10">
                <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Connect</span>
                    <MagneticButton href="https://www.linkedin.com/in/bikash-kh-5544ba298/">LinkedIn</MagneticButton>
                    <MagneticButton href="https://github.com/kh-bikash">GitHub</MagneticButton>
                </div>

                <div className="flex flex-col gap-2 text-right">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Location</span>
                    <span className="text-lg">India</span>
                    <span className="text-lg">Local Time: {time}</span>
                </div>
            </div>

            {/* Massive Text */}
            <div className="relative z-10 flex flex-col items-center justify-center flex-grow">
                <motion.h1
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[12vw] leading-none font-bold tracking-tighter text-center mix-blend-difference"
                >
                    LET'S BUILD
                </motion.h1>
                <motion.h1
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[12vw] leading-none font-bold tracking-tighter text-center text-zinc-800"
                >
                    THE FUTURE
                </motion.h1>
            </div>

            {/* Bottom Bar */}
            <div className="flex justify-between items-end z-10 border-t border-border pt-6">
                <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} Bikash. All Rights Reserved.</span>
                <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-12 h-12 bg-background rounded-full flex items-center justify-center text-foreground font-bold cursor-pointer hover:scale-110 transition-transform">
                    Up
                </div>
            </div>

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-black pointer-events-none -z-0 opacity-10" />
        </footer>
    )
}

"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"

export function CreditsFooter() {
    const [time, setTime] = useState("")

    useEffect(() => {
        const update = () => setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
        update()
        const interval = setInterval(update, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <footer className="relative w-full bg-[#1A1918] text-[#E8E0D4] overflow-hidden">
            {/* Main content */}
            <div className="max-w-5xl mx-auto px-6 md:px-12 py-24">
                {/* Large closing text */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight leading-[1.1] mb-6">
                        Thank you for
                        <br />
                        <span className="text-[#C4956A]">watching.</span>
                    </h2>
                    <p className="text-sm font-sans text-[#8B8680] max-w-md mx-auto">
                        Every scroll was a step in the journey. If this resonated with you, let's create something beautiful together.
                    </p>
                </motion.div>

                {/* 🗺️ STATION STAMP RALLY BOOK (駅スタンプ帳) */}
                <div className="max-w-lg mx-auto bg-[#FAF7F2] border-[3px] border-[#3A352F] rounded-xl p-6 mb-20 text-[var(--ink)] shadow-paper paper-texture">
                    <h3 className="text-sm font-mono font-bold tracking-[0.2em] text-[var(--ink-faded)] uppercase text-center mb-5 border-b border-[#3A352F]/10 pb-3">
                        Station Stamp Rally
                    </h3>
                    <div className="flex justify-around items-center gap-4">
                        {/* Stamp 1: Platform Station */}
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full border-2 border-dashed border-red-500/80 flex flex-col items-center justify-center text-red-500/80 font-bold font-serif rotate-[-12deg] select-none text-xs leading-tight text-center relative p-1">
                                <div className="absolute inset-0.5 rounded-full border border-red-500/30" />
                                <span>BIKASH</span>
                                <span className="text-[7px] font-mono tracking-wider">PLATFORM</span>
                            </div>
                            <span className="text-xs font-sans text-[var(--ink-faded)] mt-2 font-bold">01. Boarded</span>
                        </div>
 
                        {/* Stamp 2: Loop Line Station */}
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full border-2 border-dashed border-emerald-500/80 flex flex-col items-center justify-center text-emerald-500/80 font-bold font-serif rotate-[8deg] select-none text-xs leading-tight text-center relative p-1">
                                <div className="absolute inset-0.5 rounded-full border border-emerald-500/30" />
                                <span>ROUTE</span>
                                <span className="text-[7px] font-mono tracking-wider">LOOP</span>
                            </div>
                            <span className="text-xs font-sans text-[var(--ink-faded)] mt-2 font-bold">02. Transit</span>
                        </div>
 
                        {/* Stamp 3: Water Station */}
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full border-2 border-dashed border-blue-500/80 flex flex-col items-center justify-center text-blue-500/80 font-bold font-serif rotate-[-6deg] select-none text-xs leading-tight text-center relative p-1">
                                <div className="absolute inset-0.5 rounded-full border border-blue-500/30" />
                                <span>WATER</span>
                                <span className="text-[7px] font-mono tracking-wider">HORIZON</span>
                            </div>
                            <span className="text-xs font-sans text-[var(--ink-faded)] mt-2 font-bold">03. Horizon</span>
                        </div>
                    </div>
                </div>

                {/* Credits */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-center space-y-3 mb-20"
                >
                    <div className="text-xs font-mono tracking-widest text-[#5A5550] uppercase font-bold">
                        Designed & Built by
                    </div>
                    <div className="text-2xl font-serif text-[#E8E0D4] font-bold">
                        Khundrakpam Bikash Meitei
                    </div>
                    <div className="text-xs font-mono tracking-wider text-[#5A5550] font-bold">
                        React · Three.js · Framer Motion
                    </div>
                </motion.div>

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#2A2928] gap-4">
                    <div className="flex items-center gap-6">
                        <span className="text-sm font-sans text-[#5A5550] font-bold">
                            © {new Date().getFullYear()} Bikash Meitei
                        </span>
                        <span className="text-sm font-mono text-[#5A5550] font-bold">
                            India · {time}
                        </span>
                    </div>
 
                    <div className="flex items-center gap-6">
                        {["LinkedIn", "GitHub", "CodeChef"].map((link) => (
                            <a
                                key={link}
                                href={
                                    link === "LinkedIn" ? "https://www.linkedin.com/in/khundrakpam-bikash-meitei-5544ba298/"
                                    : link === "GitHub" ? "https://github.com/kh-bikash"
                                    : "https://www.codechef.com/users/kh_bikash22"
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-sans text-[#5A5550] hover:text-[#C4956A] transition-colors font-bold"
                            >
                                {link}
                            </a>
                        ))}
                    </div>

                    {/* Scroll to top */}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="w-10 h-10 rounded-full border border-[#3A3835] flex items-center justify-center text-[#5A5550] hover:text-[#C4956A] hover:border-[#C4956A]/30 transition-all"
                    >
                        <ArrowUp className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </footer>
    )
}

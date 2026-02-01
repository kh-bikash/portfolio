"use client"

import { motion } from "framer-motion"
import { Send, Copy, Check } from "lucide-react"
import { useState } from "react"

export function HoloContact() {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText("contact@bikash.ai")
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <section id="contact" className="relative w-full py-40 px-6 flex items-center justify-center bg-zinc-50 overflow-hidden">

            <div className="relative z-10 w-full max-w-2xl">

                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold tracking-[0.3em] text-cyan-600 uppercase mb-4">Transmission</h2>
                    <p className="text-5xl md:text-6xl font-light text-zinc-900 tracking-tight">
                        Initialize <span className="font-serif italic text-zinc-400">Connection</span>
                    </p>
                </div>

                {/* Holographic Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl p-8 md:p-12 shadow-2xl shadow-cyan-500/5 ring-1 ring-cyan-100"
                >
                    {/* Decorative Corner Makers */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-300 rounded-tl-xl" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-300 rounded-tr-xl" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cyan-300 rounded-bl-xl" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-300 rounded-br-xl" />

                    <form className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider pl-2">Client ID</label>
                                <input
                                    type="text"
                                    placeholder="NAME"
                                    className="w-full bg-white/80 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-mono text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider pl-2">Access Key</label>
                                <input
                                    type="email"
                                    placeholder="EMAIL"
                                    className="w-full bg-white/80 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-mono text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider pl-2">Payload</label>
                            <textarea
                                rows={4}
                                placeholder="ENTER MESSAGE PROTOCOL..."
                                className="w-full bg-white/80 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-mono text-sm resize-none"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 pt-4">
                            <button
                                type="button"
                                className="flex-1 bg-zinc-900 text-white font-bold tracking-widest text-xs uppercase py-4 rounded-xl hover:bg-cyan-600 transition-colors flex items-center justify-center gap-2 group"
                            >
                                <span>Transmit Data</span>
                                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button
                                type="button"
                                onClick={handleCopy}
                                className="px-6 py-4 bg-white border border-zinc-200 text-zinc-600 font-bold text-xs uppercase rounded-xl hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2"
                            >
                                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                <span>{copied ? "COPIED" : "COPY EMAIL"}</span>
                            </button>
                        </div>

                        <div className="flex justify-center pt-4">
                            <a href="/resume.pdf" download className="text-xs font-mono text-zinc-400 hover:text-cyan-600 transition-colors uppercase tracking-widest border-b border-transparent hover:border-cyan-600 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-zinc-300"></span>
                                Download Neural Record (Resume)
                            </a>
                        </div>
                    </form>

                </motion.div>

            </div>

            {/* Background Grid */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.15]" />

        </section>
    )
}

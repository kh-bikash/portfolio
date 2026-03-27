"use client"

import { motion } from "framer-motion"
import { Send, Copy, Check } from "lucide-react"
import { useState } from "react"

export function HoloContact() {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText("khbikash17@gmail.com")
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <section id="contact" className="relative w-full py-40 px-6 flex items-center justify-center overflow-hidden bg-[#fafafa] dark:bg-black">
            
            {/* Apple Intelligence Ambient Backdrop */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none mix-blend-multiply dark:mix-blend-screen opacity-50 dark:opacity-30">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                        rotate: [0, 90, 180, 270, 360]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] bg-blue-400/30 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.4, 0.7, 0.4],
                        x: [0, -100, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[10%] left-[20%] w-[30vw] h-[30vw] bg-purple-400/30 rounded-full blur-[120px]"
                />
            </div>

            <div className="relative z-10 w-full max-w-2xl">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-semibold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase mb-4">Transmission</h2>
                    <p className="text-5xl md:text-7xl font-semibold text-zinc-900 dark:text-white tracking-tight leading-tight">
                        Initialize <br className="hidden md:block" />
                        <span className="text-zinc-400 dark:text-zinc-600 font-light italic">Connection.</span>
                    </p>
                </div>

                {/* VisionOS Style Frosted Glass Pane */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative bg-white/40 dark:bg-black/40 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-[2rem] p-8 md:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_40px_rgba(255,255,255,0.02)]"
                >
                    <form action="https://formsubmit.co/khbikash17@gmail.com" method="POST" className="flex flex-col gap-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest pl-2">Client ID</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Name"
                                    className="w-full bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-2xl px-5 py-4 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-white/20 transition-all text-sm placeholder:text-zinc-400 font-medium"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest pl-2">Access Key</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="Email Address"
                                    className="w-full bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-2xl px-5 py-4 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-white/20 transition-all text-sm placeholder:text-zinc-400 font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest pl-2">Payload</label>
                            <textarea
                                name="message"
                                required
                                rows={4}
                                placeholder="Message Content..."
                                className="w-full bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-2xl px-5 py-4 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-white/20 transition-all text-sm placeholder:text-zinc-400 font-medium resize-none"
                            />
                        </div>

                        <input type="hidden" name="_subject" value="New transmission from Portfolio!" />
                        <input type="hidden" name="_captcha" value="false" />

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                type="submit"
                                className="flex-1 bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold text-sm py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2 group shadow-sm"
                            >
                                <span>Transmit Protocol</span>
                                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                            </button>

                            <button
                                type="button"
                                onClick={handleCopy}
                                className="px-8 py-4 bg-white/50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white font-semibold text-sm rounded-xl hover:bg-white/80 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                            >
                                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                <span>{copied ? "Copied" : "Copy Email"}</span>
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    )
}

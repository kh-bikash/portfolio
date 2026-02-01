"use client"

import { motion } from "framer-motion"
import { Send } from "lucide-react"

export function ContactPaper() {
    return (
        <section className="relative w-full py-32 flex justify-center items-center bg-zinc-100 overflow-hidden">

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

            <div className="relative w-full max-w-2xl px-6">
                <motion.div
                    initial={{ rotate: 2, y: 50, opacity: 0 }}
                    whileInView={{ rotate: 0, y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "backOut" }}
                    className="bg-[#fdfbf7] p-12 md:p-16 shadow-2xl shadow-black/5 rotate-1"
                    style={{
                        boxShadow: "0 20px 40px -5px rgba(0,0,0,0.1), 0 10px 20px -5px rgba(0,0,0,0.05)",
                        backgroundImage: "linear-gradient(#e5e5f7 1px, transparent 1px), linear-gradient(90deg, #e5e5f7 1px, transparent 1px)",
                        backgroundSize: "40px 40px"
                    }}
                >
                    {/* Tape Element */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-200/80 rotate-2 backdrop-blur-sm shadow-sm" />

                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-serif italic text-zinc-800 mb-2">Let's create something timeless.</h2>
                        <p className="text-zinc-500 text-sm uppercase tracking-widest">Inquiries & Collaborations</p>
                    </div>

                    <form className="space-y-8 relative z-10">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Name</label>
                            <input type="text" className="w-full bg-transparent border-b border-zinc-300 py-2 text-xl font-serif focus:outline-none focus:border-black transition-colors placeholder:text-zinc-200" placeholder="John Doe" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Email</label>
                            <input type="email" className="w-full bg-transparent border-b border-zinc-300 py-2 text-xl font-serif focus:outline-none focus:border-black transition-colors placeholder:text-zinc-200" placeholder="john@example.com" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Message</label>
                            <textarea className="w-full bg-transparent border-b border-zinc-300 py-2 text-xl font-serif focus:outline-none focus:border-black transition-colors min-h-[100px] resize-none placeholder:text-zinc-200" placeholder="Tell me about your vision..." />
                        </div>

                        <button className="w-full bg-black text-white py-4 rounded-full flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors group">
                            <span className="uppercase tracking-widest text-xs font-bold">Send Owl</span>
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>

                    </form>

                    {/* Stamp */}
                    <div className="absolute bottom-8 right-8 w-24 h-24 border-2 border-red-800/20 rounded-full flex items-center justify-center rotate-[-12deg] pointer-events-none opacity-50">
                        <span className="text-red-900/40 text-[10px] uppercase font-bold tracking-widest text-center leading-tight">Approved<br />By<br />Bikash</span>
                    </div>

                </motion.div>
            </div>
        </section>
    )
}

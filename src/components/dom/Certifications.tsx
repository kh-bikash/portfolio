"use client"

import { motion } from "framer-motion"
import { Shield, Award, Terminal } from "lucide-react"

const CERTS = [
    { title: "Generative AI Professional", issuer: "Oracle", date: "Oct 2025 - Oct 2027", icon: Shield, color: "text-red-500" },
    { title: "Multicloud Network Associate", issuer: "Aviatrix", date: "Oct 2025 - Oct 2028", icon: Award, color: "text-orange-500" },
    { title: "Software Engineer Intern", issuer: "HackerRank", date: "Jul 2025", icon: Terminal, color: "text-green-500" },
    { title: "Certified AI Associate", issuer: "Salesforce", date: "Oct 2024", icon: Shield, color: "text-blue-500" },
    { title: "NEC '24 Basic Track - Top 20", issuer: "E-Cell, IIT Bombay", date: "Mar 2021", icon: Award, color: "text-yellow-500" }
]

export function Certifications() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                {CERTS.map((cert, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative bg-black/40 border border-white/10 p-6 rounded-xl overflow-hidden hover:bg-white/5 transition-colors group cursor-default"
                    >
                        {/* HOLOGRAPHIC SHINE */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />

                        <div className="flex items-center gap-4">
                            <div className={`p-4 rounded-full bg-white/5 border border-white/10 ${cert.color}`}>
                                <cert.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{cert.title}</h3>
                                <p className="text-xs text-gray-400 font-mono mt-1">{cert.issuer} // {cert.date}</p>
                            </div>
                        </div>

                        {/* CORNER ACCENTS */}
                        <div className="absolute top-0 right-0 p-2 opacity-50">
                            <div className="w-2 h-2 border-t border-r border-primary" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="absolute bottom-10 text-center w-full pointer-events-none">
                <h2 className="text-white/20 text-xs font-mono mb-1">CREDENTIALS_DATABASE</h2>
                <p className="text-[8px] text-primary/50 tracking-[0.5em]">VERIFIED_BLOCKCHAIN</p>
            </div>
        </div>
    )
}

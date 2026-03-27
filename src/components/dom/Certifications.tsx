import { motion } from "framer-motion"
import { Shield, Award, Terminal, Database, Cloud, Zap } from "lucide-react"

const CERTS = [
    { title: "Generative AI Developer", issuer: "SAP", date: "Oct 2025", icon: Database, gradient: "radial-gradient(circle at 100% 100%, rgba(6, 182, 212, 0.4) 0%, transparent 60%)" },
    { title: "Generative AI Professional", issuer: "Oracle", date: "Oct 2025 - Oct 2027", icon: Shield, gradient: "radial-gradient(circle at 100% 100%, rgba(249, 115, 22, 0.4) 0%, transparent 60%)" },
    { title: "Multicloud Network Associate", issuer: "Aviatrix", date: "Oct 2025 - Oct 2028", icon: Cloud, gradient: "radial-gradient(circle at 100% 100%, rgba(168, 85, 247, 0.4) 0%, transparent 60%)" },
    { title: "Software Engineer Intern", issuer: "HackerRank", date: "Jul 2025", icon: Terminal, gradient: "radial-gradient(circle at 100% 100%, rgba(16, 185, 129, 0.4) 0%, transparent 60%)" },
    { title: "Certified AI Associate", issuer: "Salesforce", date: "Oct 2024", icon: Zap, gradient: "radial-gradient(circle at 100% 100%, rgba(236, 72, 153, 0.4) 0%, transparent 60%)" },
    { title: "NEC '24 Basic Track - Top 20", issuer: "E-Cell, IIT Bombay", date: "Mar 2021", icon: Award, gradient: "radial-gradient(circle at 100% 100%, rgba(99, 102, 241, 0.4) 0%, transparent 60%)" }
]

export function Certifications() {
    return (
        <div className="w-full flex flex-col items-center justify-center py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1400px]">
                {CERTS.map((cert, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative overflow-hidden bg-white/40 dark:bg-black/30 backdrop-blur-3xl border border-black/5 dark:border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_50px_rgba(0,0,0,0.08)] transition-all flex flex-col min-h-[250px]"
                    >
                        {/* Huge Ambient Graphic Background */}
                        <div 
                            className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                            style={{ background: cert.gradient }}
                        />

                        {/* Colossal Watermark Icon */}
                        <motion.div 
                            className="absolute -right-8 -bottom-8 md:-right-4 md:-bottom-4 z-0 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-10 dark:group-hover:opacity-20 pointer-events-none text-zinc-900 dark:text-white"
                            animate={{ rotate: [-2, 2, -2] }}
                            transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <cert.icon className="w-56 h-56 md:w-64 md:h-64" />
                        </motion.div>

                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="flex justify-between items-start mb-12">
                                <div className="p-4 rounded-2xl bg-white/80 dark:bg-white/10 border border-white dark:border-white/5 shadow-sm">
                                    <cert.icon className="w-8 h-8 text-zinc-800 dark:text-white" />
                                </div>
                                <span className="inline-flex items-center px-4 py-2 bg-black/5 dark:bg-black/40 rounded-full text-xs font-bold tracking-widest uppercase text-zinc-600 dark:text-zinc-300 border border-black/5 dark:border-white/5 backdrop-blur-md shadow-sm">
                                    {cert.date}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2 leading-tight">
                                    {cert.title}
                                </h3>
                                <p className="text-lg font-medium text-zinc-500 dark:text-zinc-400">
                                    {cert.issuer}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

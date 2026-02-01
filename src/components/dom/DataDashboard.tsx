"use client"

import { motion } from "framer-motion"
import { Activity, GitBranch, Database, Clock, Zap, Server } from "lucide-react"
import { PROJECTS } from "@/lib/project-data"

const STATS = [
    { label: "TOTAL COMMITS", value: "1,248", icon: GitBranch, color: "text-blue-400" },
    { label: "UPTIME", value: "99.9%", icon: Activity, color: "text-green-400" },
    { label: "DATA PROCESSED", value: "84 TB", icon: Database, color: "text-purple-400" },
    { label: "CODING HOURS", value: "8,432", icon: Clock, color: "text-yellow-400" },
    { label: "DEPLOYMENTS", value: PROJECTS.length.toString(), icon: Server, color: "text-cyan-400" },
    { label: "VELOCITY", value: "A+", icon: Zap, color: "text-red-400" },
]

export function DataDashboard() {
    return (
        <div className="w-full h-full p-8 md:p-20 overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-2"
                >
                    <h2 className="text-primary tracking-[0.5em] text-xs font-bold uppercase">QUANTIFIED SELF</h2>
                    <h1 className="text-4xl md:text-6xl font-black text-white/90">SYSTEM METRICS</h1>
                </motion.div>

                {/* BENTO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {STATS.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-black/40 border border-white/10 p-6 rounded-xl backdrop-blur-sm group hover:border-primary/50 hover:bg-black/60 transition-all cursor-crosshair relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                            </div>

                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">{stat.label}</span>
                                <span className="text-4xl font-bold text-white font-mono">{stat.value}</span>
                            </div>

                            {/* DECORATIVE LINES */}
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                        </motion.div>
                    ))}
                </div>

                {/* BIG GRAPH AREA placeholder */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="w-full h-64 bg-black/40 border border-white/10 rounded-xl relative overflow-hidden flex items-center justify-center group"
                >
                    <div className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "20px 20px" }}
                    />
                    <div className="text-zinc-600 font-mono text-xs uppercase tracking-widest text-center">
                        [ CLOUD ARCHITECTURE TOPOLOGY VISUALIZATION ]
                        <br />
                        <span className="text-primary/50 animate-pulse">LIVE DATA STREAM CONNECTING...</span>
                    </div>
                </motion.div>

            </div>
        </div>
    )
}

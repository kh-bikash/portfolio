"use client"

import { motion } from "framer-motion"
import { Disc, Music } from "lucide-react"

export function SpotifyWidget() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="fixed bottom-8 right-8 z-40 hidden md:flex items-center gap-4 group"
        >
            {/* VISUALIZER BARS */}
            <div className="flex items-end gap-[2px] h-4">
                {[1, 2, 3, 4].map(i => (
                    <div
                        key={i}
                        className="w-1 bg-green-500/80 rounded-t-sm animate-[music-bar_0.8s_ease-in-out_infinite]"
                        style={{ animationDelay: `${i * 0.1}s` }}
                    />
                ))}
            </div>

            {/* GLASS CARD */}
            <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 p-2 pr-4 rounded-full hover:bg-black/60 transition-colors cursor-pointer">
                {/* ALBUM ART ROTATING */}
                <div className="relative w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center overflow-hidden animate-[spin_4s_linear_infinite]">
                    <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-20" />
                    <Disc className="w-6 h-6 text-zinc-500" />
                </div>

                <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Listening Now
                    </span>
                    <div className="flex flex-col leading-none">
                        <span className="text-xs font-bold text-white group-hover:text-green-400 transition-colors">Technologic</span>
                        <span className="text-[10px] text-zinc-500">Daft Punk</span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

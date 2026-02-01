"use client"

import { motion } from "framer-motion"
import { Home, User, Briefcase, Mail } from "lucide-react"

const NAV_ITEMS = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'work', icon: Briefcase, label: 'Work' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'contact', icon: Mail, label: 'Contact' },
]

export function FloatingNavbar() {
    return (
        <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        >
            <div className="flex items-center gap-2 p-2 bg-white/80 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl shadow-black/5">
                {NAV_ITEMS.map((item) => (
                    <button
                        key={item.id}
                        className="relative px-6 py-3 rounded-full hover:bg-black/5 transition-colors group"
                    >
                        <span className="sr-only">{item.label}</span>
                        <item.icon className="w-5 h-5 text-zinc-600 group-hover:text-black transition-colors" />

                        {/* Tooltip */}
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>
        </motion.div>
    )
}

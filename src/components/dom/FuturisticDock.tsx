"use client"

import { useUIStore } from "@/store/useUIStore"
import { useAudioSystem } from "@/hooks/useAudioSystem" // Import
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"
import { Monitor, Cpu, Eye, Terminal, PenTool, Volume2, Home, Briefcase, User, Mail, Database } from "lucide-react"

// Dock Item Component
function DockItem({ icon: Icon, label, onClick, onHover, active, mouseX }: { icon: any, label: string, onClick: () => void, onHover?: () => void, active?: boolean, mouseX: any }) {
    const ref = useRef<HTMLDivElement>(null)

    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
        return val - bounds.x - bounds.width / 2
    })

    const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40])
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 })

    return (
        <motion.div
            ref={ref}
            style={{ width }}
            className="aspect-square rounded-full bg-black/50 border border-white/10 backdrop-blur-md flex items-center justify-center relative group cursor-pointer hover:border-primary/50 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] transition-colors"
            onClick={onClick}
            onMouseEnter={onHover} // Play audio on hover
        >
            <Icon className={`w-1/2 h-1/2 ${active ? "text-primary" : "text-white/60 group-hover:text-white"}`} />

            {/* Active Indicator */}
            {active && <div className="absolute -bottom-2 w-1 h-1 bg-primary rounded-full shadow-[0_0_10px_var(--primary)]" />}

            {/* Tooltip */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 border border-white/20 rounded text-[10px] uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {label}
            </div>
        </motion.div>
    )
}

export function FuturisticDock() {
    const {
        view, setView,
        toggleConsole, consoleOpen,
        toggleVision, visionMode,
        toggleAudio, audioEnabled,
        toggleSandbox, sandboxOpen,
        toggleContact
    } = useUIStore()

    const { playHover, playClick } = useAudioSystem() // Import Hook

    const mouseX = useMotionValue(Infinity)

    return (
        <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] flex items-end gap-4 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-lg"
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, type: "spring" }}
        >
            {/* NAVIGATION */}
            <DockItem mouseX={mouseX} icon={Home} label="Home" onClick={() => { playClick(); setView('HOME') }} onHover={playHover} active={view === 'HOME'} />
            <DockItem mouseX={mouseX} icon={Briefcase} label="Work" onClick={() => { playClick(); setView('WORK') }} onHover={playHover} active={view === 'WORK'} />
            <DockItem mouseX={mouseX} icon={User} label="About" onClick={() => { playClick(); setView('ABOUT') }} onHover={playHover} active={view === 'ABOUT'} />
            <DockItem mouseX={mouseX} icon={Database} label="Data" onClick={() => { playClick(); setView('DATA') }} onHover={playHover} active={view === 'DATA'} />
            <DockItem mouseX={mouseX} icon={Monitor} label="Setup" onClick={() => { playClick(); setView('HARDWARE') }} onHover={playHover} active={view === 'HARDWARE'} />
            <DockItem mouseX={mouseX} icon={Terminal} label="Log" onClick={() => { playClick(); setView('THOUGHTS') }} onHover={playHover} active={view === 'THOUGHTS'} />
            <DockItem mouseX={mouseX} icon={Cpu} label="Skills" onClick={() => { playClick(); setView('SKILLS') }} onHover={playHover} active={view === 'SKILLS'} />

            {/* DIVIDER */}
            <div className="w-[1px] h-8 bg-white/10 mx-2" />

            {/* TOOLS */}
            <DockItem mouseX={mouseX} icon={Terminal} label="Terminal" onClick={() => { playClick(); toggleConsole() }} onHover={playHover} active={consoleOpen} />
            <DockItem mouseX={mouseX} icon={Eye} label="Vision" onClick={() => { playClick(); toggleVision() }} onHover={playHover} active={visionMode} />
            <DockItem mouseX={mouseX} icon={PenTool} label="Draw" onClick={() => { playClick(); toggleSandbox() }} onHover={playHover} active={sandboxOpen} />
            <DockItem mouseX={mouseX} icon={Volume2} label="Audio" onClick={() => { playClick(); toggleAudio() }} onHover={playHover} active={audioEnabled} />

            {/* DIVIDER */}
            <div className="w-[1px] h-8 bg-white/10 mx-2" />

            <DockItem mouseX={mouseX} icon={Mail} label="Contact" onClick={() => { playClick(); toggleContact() }} onHover={playHover} />

        </motion.div>
    )
}

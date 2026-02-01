"use client"

import { useState, useEffect, useRef } from "react"
import { useUIStore } from "@/store/useUIStore"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Command, ArrowRight, Terminal, Eye, PenTool, Volume2, Home, Briefcase, Cpu } from "lucide-react"

type CommandItem = {
    id: string
    label: string
    icon: any
    action: () => void
    group: string
}

export function CommandPalette() {
    const { setView, toggleConsole, toggleVision, toggleAudio, toggleSandbox } = useUIStore()
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState("")
    const [selectedIndex, setSelectedIndex] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)

    // COMMAND LIST
    const commands: CommandItem[] = [
        { id: 'home', label: 'Go Home', icon: Home, group: 'Navigation', action: () => setView('HOME') },
        { id: 'work', label: 'View Projects', icon: Briefcase, group: 'Navigation', action: () => setView('WORK') },
        { id: 'skills', label: 'View Skills', icon: Cpu, group: 'Navigation', action: () => setView('SKILLS') },
        { id: 'terminal', label: 'Toggle Terminal', icon: Terminal, group: 'Tools', action: toggleConsole },
        { id: 'vision', label: 'Toggle Vision Mode', icon: Eye, group: 'Tools', action: toggleVision },
        { id: 'draw', label: 'Open Sandbox', icon: PenTool, group: 'Tools', action: toggleSandbox },
        { id: 'audio', label: 'Toggle Audio', icon: Volume2, group: 'Tools', action: toggleAudio },
    ]

    const filteredCommands = commands.filter(cmd =>
        cmd.label.toLowerCase().includes(query.toLowerCase())
    )

    // HOTKEY LISTENER
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setIsOpen(prev => !prev)
            }
            if (e.key === 'Escape') {
                setIsOpen(false)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    // Input Focus
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100)
        } else {
            setQuery("")
            setSelectedIndex(0)
        }
    }, [isOpen])

    const handleSelect = (index: number) => {
        if (filteredCommands[index]) {
            filteredCommands[index].action()
            setIsOpen(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">

                    {/* BACKDROP */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* PALETTE */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.1 }}
                        className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/20 rounded-xl shadow-2xl overflow-hidden"
                    >
                        {/* SEARCH BAR */}
                        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
                            <Search className="w-5 h-5 text-zinc-500" />
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSelect(selectedIndex)
                                    if (e.key === 'ArrowDown') setSelectedIndex(i => Math.min(i + 1, filteredCommands.length - 1))
                                    if (e.key === 'ArrowUp') setSelectedIndex(i => Math.max(i - 1, 0))
                                }}
                                placeholder="Type a command..."
                                className="flex-1 bg-transparent border-none outline-none text-white placeholder-zinc-500 text-sm"
                            />
                            <div className="flex items-center gap-1">
                                <span className="text-[10px] text-zinc-600 border border-zinc-800 rounded px-1.5 py-0.5">ESC</span>
                            </div>
                        </div>

                        {/* RESULTS */}
                        <div className="max-h-[300px] overflow-y-auto py-2">
                            {filteredCommands.length === 0 ? (
                                <div className="px-4 py-8 text-center text-zinc-500 text-sm">
                                    No results found.
                                </div>
                            ) : (
                                filteredCommands.map((cmd, index) => (
                                    <div
                                        key={cmd.id}
                                        onClick={() => handleSelect(index)}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                        className={`px-4 py-2 mx-2 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${index === selectedIndex ? 'bg-primary/20 text-primary' : 'text-zinc-400 hover:text-zinc-200'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <cmd.icon className="w-4 h-4" />
                                            <span className="text-sm">{cmd.label}</span>
                                        </div>
                                        {index === selectedIndex && (
                                            <ArrowRight className="w-4 h-4 opacity-50" />
                                        )}
                                    </div>
                                ))
                            )}
                        </div>

                        {/* FOOTER */}
                        <div className="px-4 py-2 bg-white/5 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-500">
                            <span>Portfolio v2.0</span>
                            <div className="flex items-center gap-2">
                                <Command className="w-3 h-3" />
                                <span>+ K to toggle</span>
                            </div>
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

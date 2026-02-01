"use client"

import { useState, useEffect, useRef } from "react"
import { useUIStore } from "@/store/useUIStore"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const INITIAL_LOGS = [
    { type: "system", text: "Initializing BIKASH_AI_V1.0..." },
    { type: "system", text: "Memory Banks: ONLINE" },
    { type: "system", text: "Neural Interface: READY" },
    { type: "bot", text: "Greetings. I am the digital construct of Bikash. Ask me anything or type 'help' for commands." }
]

export function DeveloperConsole() {
    const { consoleOpen, toggleConsole } = useUIStore()
    const [input, setInput] = useState("")
    const [logs, setLogs] = useState(INITIAL_LOGS)
    const inputRef = useRef<HTMLInputElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [logs, consoleOpen])

    // Focus on open
    useEffect(() => {
        if (consoleOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [consoleOpen])

    // Keyboard Toggle (~)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "`" || e.key === "~") {
                e.preventDefault()
                toggleConsole()
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [toggleConsole])

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        const cmd = input.trim().toLowerCase()
        const newLogs = [...logs, { type: "user", text: input }]
        setLogs(newLogs)
        setInput("")

        // PROCESS COMMANDS
        setTimeout(() => {
            let response = "Command not recognized. Type 'help'."

            if (cmd === "help") {
                response = "Available Commands: [about], [skills], [contact], [clear], [exit]"
            } else if (cmd === "about") {
                response = "I am a Full Stack AI Engineer specializing in React, Next.js, and Neural Networks."
            } else if (cmd === "contact") {
                response = "Email: bikash@example.com // LinkedIn: /in/bikash-kh"
            } else if (cmd === "skills") {
                response = "Core Systems: TypeScript, Python, TensorFlow, PyTorch, React Three Fiber."
            } else if (cmd === "clear") {
                setLogs([])
                return
            } else if (cmd === "exit") {
                toggleConsole()
                return
            } else if (cmd.includes("hello") || cmd.includes("hi")) {
                response = "Hello traveler. Welcome to the singularity."
            }

            setLogs(prev => [...prev, { type: "bot", text: response }])
        }, 500)
    }

    return (
        <AnimatePresence>
            {consoleOpen && (
                <motion.div
                    initial={{ y: "-100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="fixed top-0 left-0 w-full h-[50vh] bg-black/95 border-b-2 border-primary z-[200] shadow-[0_10px_50px_rgba(0,0,0,0.8)] flex flex-col font-mono text-sm"
                >
                    {/* Header */}
                    <div className="bg-primary/10 p-2 border-b border-white/10 flex justify-between items-center text-primary/70 text-xs uppercase tracking-widest">
                        <span>// DEVELOPER_CONSOLE_ACCESS</span>
                        <button onClick={toggleConsole} className="hover:text-white">[CLOSE]</button>
                    </div>

                    {/* Logs */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-2">
                        {logs.map((log, i) => (
                            <div key={i} className={cn(
                                "break-words",
                                log.type === "user" ? "text-white/70" : log.type === "system" ? "text-yellow-500/50" : "text-primary"
                            )}>
                                <span className="opacity-30 mr-2">
                                    {log.type === "user" ? ">" : log.type === "system" ? "SYS:" : "AI:"}
                                </span>
                                {log.text}
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleCommand} className="p-4 bg-white/5 flex items-center gap-2">
                        <span className="text-primary animate-pulse">{">"}</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="bg-transparent text-white w-full outline-none font-bold"
                            placeholder="Type command..."
                            autoFocus
                        />
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

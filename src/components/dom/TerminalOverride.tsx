"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Log = {
    id: string
    content: string
    type: "info" | "success" | "error" | "warning"
}

export function TerminalOverride() {
    const [isOpen, setIsOpen] = useState(false)
    const [input, setInput] = useState("")
    const [logs, setLogs] = useState<Log[]>([
        { id: "init", content: "CORTEX TERMINAL OVERRIDE v.2.0.4", type: "info" },
        { id: "help", content: "Type 'help' for available commands.", type: "warning" }
    ])
    const inputRef = useRef<HTMLInputElement>(null)
    const bottomRef = useRef<HTMLDivElement>(null)

    // Toggle on Tilde/Backtick
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "`" || e.key === "~") {
                e.preventDefault()
                setIsOpen(prev => !prev)
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    // Focus input on open
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100)
        }
    }, [isOpen])

    // Auto-scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [logs])

    const handleCommand = (cmd: string) => {
        const cleanCmd = cmd.trim().toLowerCase()
        const args = cleanCmd.split(" ").slice(1)
        const root = cleanCmd.split(" ")[0]

        // Add user command to log
        addLog(`> ${cmd}`, "info")

        switch (root) {
            case "help":
                addLog("AVAILABLE COMMANDS:", "info")
                addLog("  theme [cyberpunk|matrix|zen] - Switch global theme", "info")
                addLog("  clear - Clear terminal", "info")
                addLog("  whoami - Identify user", "info")
                addLog("  exit - Close terminal", "info")
                break

            case "clear":
                setLogs([])
                break

            case "exit":
                setIsOpen(false)
                break

            case "whoami":
                addLog("User: Guest / Observer", "success")
                addLog("Permissions: Read-Only", "warning")
                break

            case "theme":
                if (!args[0]) {
                    addLog("Usage: theme [cyberpunk|matrix|zen]", "error")
                    break
                }
                const themeId = args[0]
                if (["cyberpunk", "matrix", "zen", "default"].includes(themeId)) {
                    document.documentElement.className = `theme-${themeId}`
                    addLog(`Theme set to: ${themeId}`, "success")
                } else {
                    addLog(`Unknown theme: ${themeId}`, "error")
                }
                break

            case "sudo":
                addLog("Access Denied. Nice try.", "error")
                break

            default:
                addLog(`Command not found: ${root}`, "error")
        }
    }

    const addLog = (content: string, type: Log["type"]) => {
        setLogs(prev => [...prev, { id: Date.now().toString() + Math.random(), content, type }])
    }

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleCommand(input)
            setInput("")
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-12 font-mono"
                    onClick={() => inputRef.current?.focus()}
                >
                    <div className="w-full h-full max-w-4xl border border-green-500/30 rounded-lg bg-black/50 overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,255,0,0.1)]">
                        {/* Header */}
                        <div className="h-8 bg-green-500/10 border-b border-green-500/30 flex items-center px-4 justify-between">
                            <span className="text-green-500 text-xs tracking-widest">TERMINAL_OVERRIDE // ROOT</span>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                <div className="w-3 h-3 rounded-full bg-green-500/20" />
                            </div>
                        </div>

                        {/* Logs */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-1 font-mono text-sm">
                            {logs.map((log) => (
                                <div key={log.id} className={`${log.type === 'error' ? 'text-red-500' :
                                        log.type === 'success' ? 'text-green-400' :
                                            log.type === 'warning' ? 'text-yellow-400' :
                                                'text-green-600'
                                    }`}>
                                    {log.content}
                                </div>
                            ))}
                            <div ref={bottomRef} />
                        </div>

                        {/* Input */}
                        <div className="h-12 border-t border-green-500/30 flex items-center px-4 gap-2 bg-black">
                            <span className="text-green-500 text-lg">›</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={onKeyDown}
                                className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono text-sm"
                                autoFocus
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

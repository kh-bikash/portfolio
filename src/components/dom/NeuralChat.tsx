"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Send, Cpu, X, Terminal } from "lucide-react"

type Message = {
    id: string
    role: "user" | "system" | "ai"
    content: string
    timestamp: number
}

const KNOWLEDGE_BASE = [
    { keywords: ["projects", "work", "built"], response: "Accessing Project Database... I have deployed several key systems: The Neural Interface (AI/BCI), Quantum Dash (Data Vis), and Ethereal Commerce (Web3). Which module would you like to analyze?" },
    { keywords: ["skills", "stack", "tech"], response: "Scanning tech stack... Core competencies identified: React/Next.js (Frontend), PyTorch/TensorFlow (AI), and Three.js/WebGL (Spatial Computing)." },
    { keywords: ["contact", "email", "reach"], response: "Communication channels open. You can reach the operator via encrypted frequency: bikash@example.com, or through the holographic links in the footer." },
    { keywords: ["about", "who", "bikash"], response: "Identity confirmed: Bikash. A specialized AI Engineer and Full Stack Architect building the bridge between biological and digital intelligence." },
    { keywords: ["hello", "hi", "hey"], response: "System Online. Greetings, traveler. I am the Neural Assistant for this portfolio. Query me." },
]

export function NeuralChat() {
    const [isOpen, setIsOpen] = useState(false)
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState<Message[]>([
        { id: "init", role: "system", content: "NEURAL_LINK_ESTABLISHED. READY FOR INPUT.", timestamp: Date.now() }
    ])
    const [isTyping, setIsTyping] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = async () => {
        if (!input.trim()) return

        const userMsg: Message = { id: Date.now().toString(), role: "user", content: input, timestamp: Date.now() }
        setMessages(prev => [...prev, userMsg])
        setInput("")
        setIsTyping(true)

        // Simulate AI processing
        setTimeout(() => {
            const lowerInput = userMsg.content.toLowerCase()
            let response = "Input not recognized. Query parameters unclear. Try asking about 'projects', 'skills', or 'contact'."

            // Simple keyword matching (Simulated RAG)
            const match = KNOWLEDGE_BASE.find(k => k.keywords.some(w => lowerInput.includes(w)))
            if (match) response = match.response

            const aiMsg: Message = { id: (Date.now() + 1).toString(), role: "ai", content: response, timestamp: Date.now() }
            setMessages(prev => [...prev, aiMsg])
            setIsTyping(false)
        }, 1200)
    }

    return (
        <>
            {/* Trigger Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-8 left-8 z-50 w-12 h-12 bg-white/10 backdrop-blur border border-white/20 rounded-full flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-500 transition-all group ${isOpen ? "invisible" : "visible"}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <MessageSquare className="w-5 h-5 text-zinc-400 group-hover:text-cyan-400" />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-8 left-8 z-50 w-80 md:w-96 h-[500px] bg-zinc-950/90 backdrop-blur-xl border border-zinc-800 rounded-lg shadow-2xl flex flex-col overflow-hidden font-mono text-xs"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-3 border-b border-zinc-800 bg-zinc-900/50">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-zinc-400 font-bold tracking-wider">NEURAL_ASSISTANT_V1</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user'
                                            ? 'bg-cyan-900/30 border border-cyan-800/50 text-cyan-100'
                                            : msg.role === 'system'
                                                ? 'w-full bg-zinc-900/50 border border-zinc-800 text-zinc-500 text-center italic'
                                                : 'bg-zinc-900 border border-zinc-800 text-zinc-300'
                                        }`}>
                                        {msg.role === 'ai' && <Cpu className="w-3 h-3 text-cyan-500 mb-2" />}
                                        {msg.content}
                                    </div>
                                    <span className="text-[10px] text-zinc-600 mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex items-center gap-1 text-zinc-500 p-2">
                                    <Terminal className="w-3 h-3 animate-spin" />
                                    <span>PROCESSING...</span>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-3 border-t border-zinc-800 bg-zinc-900/50 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type command..."
                                className="flex-1 bg-transparent border border-zinc-700 rounded px-3 py-2 text-zinc-200 focus:outline-none focus:border-cyan-500 transition-colors"
                            />
                            <button
                                onClick={handleSend}
                                className="p-2 bg-cyan-900/20 border border-cyan-900/50 rounded hover:bg-cyan-500/20 hover:border-cyan-500 text-cyan-500 transition-all"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

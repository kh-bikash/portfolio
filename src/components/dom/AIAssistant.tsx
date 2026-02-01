"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, Sparkles } from "lucide-react"

export function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<{ role: 'ai' | 'user', text: string }[]>([
        { role: 'ai', text: "Systems online. innovative neural networks detected. How can I assist you with Bikash's architecture?" }
    ])
    const [input, setInput] = useState("")
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = () => {
        if (!input.trim()) return

        setMessages(prev => [...prev, { role: 'user', text: input }])
        setInput("")

        // Simulate AI response
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'ai', text: "Accessing database... (This is a demo response. Full LLM integration pending.)" }])
        }, 1000)
    }

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-24 right-8 w-80 md:w-96 bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl shadow-cyan-500/10 rounded-2xl overflow-hidden z-50 ring-1 ring-cyan-100"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-zinc-50 to-white p-4 border-b border-zinc-100 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                                <span className="text-xs font-bold tracking-widest uppercase text-zinc-600">Cortana v2</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-zinc-900 transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div ref={scrollRef} className="h-64 overflow-y-auto p-4 space-y-3 bg-zinc-50/50">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-xl text-xs md:text-sm ${m.role === 'user'
                                            ? 'bg-zinc-900 text-white rounded-tr-none'
                                            : 'bg-white border border-zinc-200 text-zinc-600 rounded-tl-none shadow-sm'
                                        }`}>
                                        {m.role === 'ai' && <Sparkles className="w-3 h-3 text-cyan-500 mb-1" />}
                                        {m.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-white border-t border-zinc-100 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Query the system..."
                                className="flex-1 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                            />
                            <button
                                onClick={handleSend}
                                className="p-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/20"
                            >
                                <Send className="w-3 h-3" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 ${isOpen
                        ? 'bg-zinc-200 text-zinc-500 rotate-90 scale-0 opacity-0'
                        : 'bg-zinc-900 text-white shadow-cyan-500/20 ring-4 ring-zinc-50'
                    }`}
            >
                <MessageSquare className="w-5 h-5" />
            </motion.button>
        </>
    )
}

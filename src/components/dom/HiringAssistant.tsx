"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, Sparkles, Bot, User } from "lucide-react"

type Message = {
    id: string
    role: "user" | "ai"
    content: string
}

const generateId = () => Math.random().toString(36).substr(2, 9)

const INITIAL_MESSAGE: Message = {
    id: "init",
    role: "ai",
    content: "Greetings. I am Bikash-AI, a simulated intelligence trained on Khundrakpam Bikash Meitei's professional data. Ask me about his skills, AWS experience, or projects."
}

// Advanced NLP Scoring Heuristic Engine
const getAIResponse = (query: string): string => {
    const q = query.toLowerCase()

    // Intent Matrix with mathematical priority weights
    const intents = {
        greetings: { score: 0, keywords: ['hi', 'hello', 'hey', 'greetings', 'morning', 'afternoon', 'sup'], response: "Hello! How can I assist you in learning more about Bikash's engineering background?" },
        aws: { score: 0, keywords: ['aws', 'amazon'], response: "Bikash interned at Amazon Web Services (AWS) as a Software Engineer in 2025. He engineered scalable backend services handling over 100K+ API requests daily with perfect reliability (Python, SQL), and built automated data validation pipelines for ML workflows." },
        sap: { score: 0, keywords: ['sap'], response: "At SAP, Bikash was a Technical Consulting Intern (2025). He optimized enterprise datasets of 50,000+ records, improving dataset consistency and accuracy by 30% for downstream analytics." },
        skills: { score: 0, keywords: ['skill', 'skills', 'tech', 'stack', 'language', 'languages', 'python', 'react', 'typescript', 'node', 'favorite', 'best', 'tool', 'tools'], response: "Bikash specializes in Machine Intelligence (PyTorch, TensorFlow, HuggingFace), Core Backend (Python, TypeScript, SQL), and Cloud Native Architecture (AWS, Docker, CI/CD). He is deeply focused on building scalable, performant systems." },
        screener: { score: 0, keywords: ['screener', 'resume screener', 'hiring assistant', 'assistant'], response: "Ah, the Resume Screener! Bikash built a powerful, automated AI-driven MVP that uses Google Gemini & Groq to evaluate multiple resumes against a job description. It showcases his ability to integrate Large Language Models into production software." },
        cloudpulse: { score: 0, keywords: ['cloudpulse', 'cloud pulse', 'pulse', 'cloud'], response: "CloudPulse is his sophisticated cloud optimization engine that detects waste, predicts spend, and auto-optimizes resources across multi-cloud environments. It's written in Python." },
        projects: { score: 0, keywords: ['project', 'projects', 'portfolio', 'github', 'repo', 'code', 'build', 'built', 'made', 'created'], response: "You can view all 18+ of his open-source engineering works directly on his GitHub (kh-bikash), or by visiting the 'Projects' page here which live-syncs with his repositories." },
        education: { score: 0, keywords: ['education', 'university', 'college', 'study', 'degree', 'certification', 'cert', 'certified'], response: "Bikash has a robust academic background with certifications spanning Generative AI Developer (SAP), Multicloud Network Associate (Aviatrix), and Certified AI Associate (Salesforce)." },
        contact: { score: 0, keywords: ['contact', 'email', 'reach', 'call', 'phone', 'connect', 'hire', 'message'], response: "You can reach Bikash directly at khbikash17@gmail.com, or connect with him on LinkedIn. You can also use the 'Contact' button in the navigation bar above to send a secure transmission right now." },
        strengths: { score: 0, keywords: ['strength', 'strengths', 'weakness', 'why', 'advantage', 'unique', 'greatest', 'stand out', 'different'], response: "Bikash's greatest strength is his rare intersection of skills: he can train Machine Learning models, engineer AWS backend architectures to support them, and build stunning user interfaces (like this portfolio) to deliver them. He is an end-to-end product architect." },
        experience: { score: 0, keywords: ['experience', 'work', 'internship', 'job', 'career', 'past', 'history', 'role', 'roles'], response: "He has top-tier professional experience as a Software Engineering Intern at Amazon Web Services (AWS) and a Technical Consulting Intern at SAP. He consistently builds highly reliable, large-scale systems." },
        about: { score: 0, keywords: ['about', 'everything', 'who', 'tell', 'background', 'overview', 'summary', 'profile', 'him', 'bikash', 'story'], response: "Khundrakpam Bikash Meitei is a highly driven AI Engineer and Software Architect. He specializes in bridging the gap between cutting-edge Artificial Intelligence models (LLMs) and deeply scalable Full-Stack production environments. He previously engineered enterprise-grade solutions as an intern at AWS and SAP." },
        identity: { score: 0, keywords: ['bot', 'ai', 'robot', 'system', 'artificial', 'intelligence'], response: "I am a simulated AI Assistant built specifically for this portfolio. My purpose is to synthesize Khundrakpam Bikash Meitei's engineering background and provide instantaneous answers to recruiters using a heuristic scoring algorithm." }
    }

    // Tokenizer: break user sentence into individual words (cleaning punctuation)
    const words = q.split(/[\s,.'?!]+/)
    
    // Mathematical Scoring Core
    for (const word of words) {
        if (!word) continue
        for (const [key, intent] of Object.entries(intents)) {
            if (intent.keywords.includes(word)) {
                // Highly Specific Entity = Tier 1 Priority (Wins immediately)
                if (['aws', 'sap', 'screener', 'cloudpulse'].includes(key)) {
                    intent.score += 100 
                } 
                // Primary Subjects = Tier 2 Priority (Overrides general requests)
                else if (['projects', 'skills', 'contact', 'strengths', 'education', 'identity'].includes(key)) {
                    intent.score += 50
                } 
                // General/Broad Intents = Tier 3 Priority (Used if no specifics mentioned)
                else {
                    intent.score += 10
                }
            }
        }
    }

    // Find the winning intent pathway
    let bestIntent = ''
    let highestScore = 0

    for (const [key, intent] of Object.entries(intents)) {
        if (intent.score > highestScore) {
            highestScore = intent.score
            bestIntent = key
        }
    }

    // Return the perfectly selected response
    if (highestScore > 0) {
        return intents[bestIntent as keyof typeof intents].response
    }

    // Ultimate Fallback Matrix
    return "That's an insightful question. While my neural simulation matrix doesn't have a specific pre-programmed answer for that exact phrasing, I highly recommend checking out his 'Projects' or 'About' sections, or reaching out directly at khbikash17@gmail.com for the source truth!"
}

export function HiringAssistant() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        if (isOpen) {
            scrollToBottom()
        }
    }, [messages, isOpen, isTyping])

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        const userMsg: Message = { id: generateId(), role: "user", content: input.trim() }
        setMessages(prev => [...prev, userMsg])
        setInput("")
        setIsTyping(true)

        // Simulate AI thinking delay
        setTimeout(() => {
            const aiMsg: Message = { id: generateId(), role: "ai", content: getAIResponse(userMsg.content) }
            setMessages(prev => [...prev, aiMsg])
            setIsTyping(false)
        }, 1200 + Math.random() * 800) // 1.2s to 2s delay
    }

    return (
        <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[100] font-sans">
            
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(4px)" }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute bottom-20 right-0 w-[90vw] md:w-[400px] h-[550px] max-h-[70vh] flex flex-col bg-white/70 dark:bg-black/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.05)] backdrop-blur-3xl border border-black/10 dark:border-white/10 rounded-3xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-5 border-b border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full shadow-lg">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Bikash-AI</h3>
                                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1 uppercase tracking-widest">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Online
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-zinc-500 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Chat History */}
                        <div className="flex-1 overflow-y-auto p-5 pb-2 flex flex-col gap-6 hide-scrollbar">
                            {messages.map((msg) => (
                                <motion.div 
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                                >
                                    <div className="flex-shrink-0 mt-1">
                                        {msg.role === 'ai' ? (
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                                                <Sparkles className="w-3 h-3 text-white" />
                                            </div>
                                        ) : (
                                            <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                                                <User className="w-3 h-3 text-zinc-600 dark:text-zinc-400" />
                                            </div>
                                        )}
                                    </div>
                                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-black text-white dark:bg-white dark:text-black rounded-tr-sm' : 'bg-black/5 dark:bg-white/10 text-zinc-800 dark:text-zinc-200 rounded-tl-sm border border-black/5 dark:border-white/5'}`}>
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                            
                            {isTyping && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex gap-3 max-w-[85%] mr-auto"
                                >
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                                            <Sparkles className="w-3 h-3 text-white" />
                                        </div>
                                    </div>
                                    <div className="px-4 py-4 rounded-2xl bg-black/5 dark:bg-white/10 rounded-tl-sm border border-black/5 dark:border-white/5 flex items-center gap-1.5">
                                        <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full" />
                                        <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full" />
                                        <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full" />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white/50 dark:bg-black/50 border-t border-black/5 dark:border-white/10">
                            <form onSubmit={handleSend} className="relative flex items-center">
                                <input 
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Message Bikash-AI..."
                                    className="w-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 rounded-full py-3 px-5 pr-12 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-shadow"
                                />
                                <button 
                                    type="submit"
                                    disabled={!input.trim() || isTyping}
                                    className="absolute right-2 p-2 bg-black text-white dark:bg-white dark:text-black rounded-full disabled:opacity-50 transition-opacity hover:scale-105 active:scale-95"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                            <p className="text-[9px] text-center text-zinc-400 mt-2 uppercase tracking-widest font-semibold">Simulated Artificial Intelligence System</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className="flex justify-center items-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full shadow-[0_10px_30px_rgba(6,182,212,0.5)] text-white hover:shadow-[0_10px_40px_rgba(6,182,212,0.8)] transition-shadow"
                >
                    <MessageSquare className="w-6 h-6 md:w-7 md:h-7" />
                </motion.button>
            )}

            <style dangerouslySetInnerHTML={{__html: `
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}} />
        </div>
    )
}

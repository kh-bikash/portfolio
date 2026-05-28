"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { BrushReveal } from "@/components/ui/BrushReveal"

interface DrinkToast {
    id: number
    name: string
    effect: string
}

const VENDING_DRINKS = [
    {
        id: "react",
        name: "React Green Tea",
        color: "#1C2022",
        accentColor: "#61DAFB",
        effect: "+35% Frontend Performance",
        desc: "Brewed with pure functional components, hooks, and virtual DOM streams.",
        logo: (
            <svg viewBox="0 0 100 100" className="w-5 h-5 text-[#61DAFB] animate-[spin_12s_linear_infinite]">
                <ellipse cx="50" cy="50" rx="8" ry="20" fill="none" stroke="currentColor" strokeWidth="2.5" transform="rotate(0 50 50)"/>
                <ellipse cx="50" cy="50" rx="8" ry="20" fill="none" stroke="currentColor" strokeWidth="2.5" transform="rotate(60 50 50)"/>
                <ellipse cx="50" cy="50" rx="8" ry="20" fill="none" stroke="currentColor" strokeWidth="2.5" transform="rotate(120 50 50)"/>
                <circle cx="50" cy="50" r="4" fill="currentColor"/>
            </svg>
        )
    },
    {
        id: "fastapi",
        name: "FastAPI Cola",
        color: "#051D1A",
        accentColor: "#009688",
        effect: "+40% Backend Throughput",
        desc: "Carbonated with asynchronous routers, type safety, and OpenAPI schemas.",
        logo: (
            <svg viewBox="0 0 100 100" className="w-5 h-5 text-[#009688]">
                <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="3"/>
                <path d="M52 25 L35 55 H48 L44 75 L65 45 H52 Z" fill="currentColor"/>
            </svg>
        )
    },
    {
        id: "python",
        name: "Python Nectar",
        color: "#1E2A38",
        accentColor: "#3776AB",
        effect: "+50% Core Intelligence",
        desc: "Squeezed from pure numpy arrays, pandas dataframes, and semantic RAG systems.",
        logo: (
            <svg viewBox="0 0 100 100" className="w-5 h-5">
                <path d="M50 15 C33.4 15 35 25.5 35 25.5 L39.4 25.5 C39.4 25.5 39.4 20.3 50 20.3 C60.6 20.3 60.6 25.5 60.6 25.5 L60.6 34.3 H43.8 C43.8 34.3 35 34.3 35 47.5 C35 60.7 41.6 60.7 41.6 60.7 H46 L46 56.3 C46 56.3 46 47.5 54.8 47.5 C63.6 47.5 70.2 47.5 70.2 47.5 C70.2 47.5 78.8 47.5 78.8 34.3 C78.8 21.1 70.2 15 50 15 Z" fill="#3776AB"/>
                <path d="M50 85 C66.6 85 65 74.5 65 74.5 L60.6 74.5 C60.6 74.5 60.6 79.7 50 79.7 C39.4 79.7 39.4 74.5 39.4 74.5 L39.4 65.7 H56.2 C56.2 65.7 65 65.7 65 52.5 C65 39.3 58.4 39.3 58.4 39.3 H54 L54 43.7 C54 43.7 54 52.5 45.2 52.5 C36.4 52.5 29.8 52.5 29.8 52.5 C29.8 52.5 21.2 52.5 21.2 65.7 C21.2 78.9 29.8 85 50 85 Z" fill="#FFD43B"/>
            </svg>
        )
    },
    {
        id: "docker",
        name: "Docker Elixir",
        color: "#0F2535",
        accentColor: "#2496ED",
        effect: "+30% Container Security",
        desc: "Fortified with isolated base layers, microservices, and environment consistency.",
        logo: (
            <svg viewBox="0 0 100 100" className="w-5 h-5 text-[#2496ED]">
                <path d="M15,55 C15,68 25,72 40,72 C55,72 70,68 80,55 C82,50 85,45 88,45 C86,43 83,43 81,45 C78,40 70,38 65,38 C65,42 62,45 58,45 H25 C18,45 15,50 15,55 Z" fill="currentColor"/>
                <rect x="25" y="38" width="6" height="5" fill="currentColor" stroke="#0F2535" strokeWidth="0.5"/>
                <rect x="33" y="38" width="6" height="5" fill="currentColor" stroke="#0F2535" strokeWidth="0.5"/>
                <rect x="41" y="38" width="6" height="5" fill="currentColor" stroke="#0F2535" strokeWidth="0.5"/>
                <rect x="49" y="38" width="6" height="5" fill="currentColor" stroke="#0F2535" strokeWidth="0.5"/>
                <rect x="29" y="32" width="6" height="5" fill="currentColor" stroke="#0F2535" strokeWidth="0.5"/>
                <rect x="37" y="32" width="6" height="5" fill="currentColor" stroke="#0F2535" strokeWidth="0.5"/>
                <rect x="45" y="32" width="6" height="5" fill="currentColor" stroke="#0F2535" strokeWidth="0.5"/>
                <rect x="33" y="26" width="6" height="5" fill="currentColor" stroke="#0F2535" strokeWidth="0.5"/>
                <rect x="41" y="26" width="6" height="5" fill="currentColor" stroke="#0F2535" strokeWidth="0.5"/>
            </svg>
        )
    },
    {
        id: "postgres",
        name: "Postgres Tonic",
        color: "#182633",
        accentColor: "#336791",
        effect: "+25% Query Optimization",
        desc: "Filtered through relational indexing, ACID compliance, and connection pools.",
        logo: (
            <svg viewBox="0 0 100 100" className="w-5 h-5 text-[#336791]">
                <path d="M50,20 C32,20 25,30 25,45 C25,60 30,70 38,70 C38,62 42,58 48,58 C45,54 44,48 44,42 C44,28 56,26 56,26 C56,26 62,32 62,42 C62,48 61,54 58,58 C64,58 68,62 68,70 C76,70 81,60 81,45 C81,30 74,20 56,20 Z" fill="currentColor"/>
                <path d="M48,58 L48,78 C48,82 52,82 52,78 L52,58" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </svg>
        )
    },
    {
        id: "pytorch",
        name: "PyTorch Soda",
        color: "#2C1D1A",
        accentColor: "#EE4C2C",
        effect: "+45% Gradient Acceleration",
        desc: "Sparkling tensor operations, autograd backpropagation, and neural architecture.",
        logo: (
            <svg viewBox="0 0 100 100" className="w-5 h-5 text-[#EE4C2C]">
                <path d="M50 15 L22 45 L50 75 L78 45 Z" fill="none" stroke="currentColor" strokeWidth="2.5"/>
                <path d="M50 25 L32 45 L50 65 L68 45 Z" fill="currentColor"/>
            </svg>
        )
    }
]

export function DawnHero() {
    // Clock State
    const [time, setTime] = useState("")
    // Vending machine state
    const [dispensedDrinks, setDispensedDrinks] = useState<DrinkToast[]>([])
    const [isInsertingTicket, setIsInsertingTicket] = useState(false)
    const [dispensingCan, setDispensingCan] = useState<string | null>(null)
    const [slotCan, setSlotCan] = useState<any | null>(null)
    const [activeModal, setActiveModal] = useState<any | null>(null)
    const [isVendingActive, setIsVendingActive] = useState(false)

    useEffect(() => {
        const update = () => {
            const d = new Date()
            setTime(d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
        }
        update()
        const interval = setInterval(update, 1000)
        return () => clearInterval(interval)
    }, [])

    // 3D Tilt motion values for the ticket
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const rotateX = useTransform(y, [-100, 100], [15, -15])
    const rotateY = useTransform(x, [-100, 100], [-15, 15])

    const handleMouse = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (isInsertingTicket) return
        const rect = event.currentTarget.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = event.clientX - rect.left - width / 2
        const mouseY = event.clientY - rect.top - height / 2
        x.set(mouseX)
        y.set(mouseY)
    }

    const handleMouseLeave = () => {
        if (isInsertingTicket) return
        x.set(0)
        y.set(0)
    }

    const playGateSound = () => {
        try {
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
            const osc = ctx.createOscillator()
            const gainNode = ctx.createGain()
            
            // Retro ticket gate beep
            osc.type = "sine"
            osc.frequency.setValueAtTime(2000, ctx.currentTime)
            osc.frequency.setValueAtTime(2500, ctx.currentTime + 0.08)
            
            gainNode.gain.setValueAtTime(0.06, ctx.currentTime)
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25)
            
            osc.connect(gainNode)
            gainNode.connect(ctx.destination)
            osc.start()
            osc.stop(ctx.currentTime + 0.25)
        } catch {}
    }

    const handleTicketClick = () => {
        if (isInsertingTicket) return
        setIsInsertingTicket(true)
        playGateSound()
        
        x.set(0)
        y.set(0)
        
        setTimeout(() => {
            const el = document.getElementById("roles")
            if (el) {
                el.scrollIntoView({ behavior: "smooth" })
            }
            setTimeout(() => setIsInsertingTicket(false), 1500)
        }, 800)
    }

    // Procedural Wind Chime Sound
    const playChimeSound = () => {
        try {
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
            const osc1 = ctx.createOscillator()
            const osc2 = ctx.createOscillator()
            const gainNode = ctx.createGain()

            osc1.type = "sine"
            osc1.frequency.setValueAtTime(1046.50, ctx.currentTime) // C6 ring
            osc2.type = "sine"
            osc2.frequency.setValueAtTime(1567.98, ctx.currentTime) // G6 chime

            gainNode.gain.setValueAtTime(0.08, ctx.currentTime)
            gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2)

            osc1.connect(gainNode)
            osc2.connect(gainNode)
            gainNode.connect(ctx.destination)

            osc1.start()
            osc2.start()
            osc1.stop(ctx.currentTime + 1.2)
            osc2.stop(ctx.currentTime + 1.2)
        } catch {}
    }

    // Procedural Soda Can Clink Sound
    const playVendingSound = () => {
        try {
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
            const osc = ctx.createOscillator()
            const noise = ctx.createOscillator()
            const gain = ctx.createGain()

            osc.type = "triangle"
            osc.frequency.setValueAtTime(587.33, ctx.currentTime) // D5 metal clink
            osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.12)

            noise.type = "sawtooth"
            noise.frequency.setValueAtTime(80, ctx.currentTime)
            noise.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.2)

            gain.gain.setValueAtTime(0.12, ctx.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35)

            osc.connect(gain)
            noise.connect(gain)
            gain.connect(ctx.destination)

            osc.start()
            noise.start()
            osc.stop(ctx.currentTime + 0.35)
            noise.stop(ctx.currentTime + 0.35)
        } catch {}
    }

    const handleDispenseDrink = (name: string, effect: string) => {
        playVendingSound()
        const id = Date.now()
        setDispensedDrinks((prev) => [...prev, { id, name, effect }])
        setTimeout(() => {
            setDispensedDrinks((prev) => prev.filter((d) => d.id !== id))
        }, 3200)
    }

    return (
        <section
            id="home"
            className="relative w-full h-screen flex flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-[#87CEEB] to-[#E0F7FA] pb-0"
        >
            {/* 🌸 CHERRY BLOSSOM EMITTER (SAKURA DRIFT) */}
            <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => {
                    const startX = Math.random() * 110
                    const delay = Math.random() * 15
                    const duration = 12 + Math.random() * 12
                    const scale = 0.6 + Math.random() * 0.6
                    return (
                        <motion.div
                            key={i}
                            className="absolute bg-gradient-to-tr from-[#FFB7B2] to-[#FFC0CB] pointer-events-none opacity-70 rounded-tr-[50%] rounded-bl-[50%]"
                            style={{
                                left: `${startX}%`,
                                top: `-5%`,
                                width: `${10 * scale}px`,
                                height: `${6 * scale}px`,
                            }}
                            animate={{
                                y: ["0vh", "105vh"],
                                x: ["0vw", "-25vw"],
                                rotate: [0, 480],
                            }}
                            transition={{
                                duration,
                                delay,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    )
                })}
            </div>

            {/* Sky Background Parallax */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex flex-col justify-end">
                {/* Huge Sun / Lens Flare */}
                <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-white rounded-full opacity-60 blur-[100px] mix-blend-overlay" />
                
                {/* Slow drifting background clouds */}
                <motion.div
                    className="absolute top-[25%] left-0 h-[35%] flex w-[300%]"
                    animate={{ x: ["0%", "-33.33%"] }}
                    transition={{ duration: 65, ease: "linear", repeat: Infinity }}
                >
                    {[0, 1, 2].map((i) => (
                        <svg key={i} viewBox="0 0 1000 200" className="h-full w-full flex-shrink-0" preserveAspectRatio="none">
                            <path fill="#FFFFFF" opacity="0.4" d="M0,200 L0,150 Q50,130 100,160 T250,120 T400,150 T550,110 T700,160 T850,130 T1000,150 L1000,200 Z" />
                        </svg>
                    ))}
                </motion.div>

                {/* Faster drifting foreground clouds */}
                <motion.div
                    className="absolute bottom-[10%] left-0 h-[40%] flex w-[300%]"
                    animate={{ x: ["0%", "-33.33%"] }}
                    transition={{ duration: 45, ease: "linear", repeat: Infinity }}
                >
                    {[0, 1, 2].map((i) => (
                        <svg key={i} viewBox="0 0 1000 200" className="h-full w-full flex-shrink-0" preserveAspectRatio="none">
                            <path fill="#FFFFFF" opacity="0.75" d="M0,200 L0,130 Q100,80 200,140 T450,100 T650,150 T850,90 T1000,130 L1000,200 Z" />
                        </svg>
                    ))}
                </motion.div>
            </div>

            {/* Station Columns */}
            <div className="absolute inset-y-0 left-6 md:left-16 w-[8px] bg-gradient-to-r from-[#3A352F] to-[#5C564D] z-10 border-r border-[#1C1A17] pointer-events-none" />
            <div className="absolute inset-y-0 right-6 md:right-16 w-[8px] bg-gradient-to-r from-[#5C564D] to-[#3A352F] z-10 border-l border-[#1C1A17] pointer-events-none" />
            
            {/* Awning Beam */}
            <div className="absolute top-24 left-6 right-6 md:left-16 md:right-16 h-[8px] bg-[#3A352F] z-10 shadow-sm pointer-events-none" />

            {/* 🎐 INTERACTIVE GLASS WIND CHIME (FŪRIN) */}
            <div className="absolute top-24 left-[12%] md:left-[22%] z-20 flex flex-col items-center origin-top">
                <motion.div
                    className="relative flex flex-col items-center"
                    animate={{ rotate: [-2, 2, -2] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="w-[1.5px] h-6 bg-[#3A352F]" />
                    <div className="w-7 h-6 rounded-t-full bg-white/20 backdrop-blur-sm border border-[#3A352F] relative flex justify-center items-end shadow-sm">
                        <div className="w-1.5 h-1.5 bg-[#C4956A] rounded-full -mb-0.5" />
                    </div>
                    <div className="w-[1px] h-4 bg-[#3A352F]" />
                    <motion.div
                        whileHover={{ rotate: [0, 8, -6, 4, 0], scale: 1.05 }}
                        onHoverStart={playChimeSound}
                        className="w-5 h-14 bg-[#FAF7F2] border-[2px] border-[#3A352F] rounded-sm text-[9px] font-serif font-bold text-[var(--ink)] flex items-center justify-center cursor-pointer shadow-sm select-none"
                        style={{ writingMode: "vertical-rl" }}
                    >
                        WIND
                    </motion.div>
                </motion.div>
            </div>

            {/* 🥫 INTERACTIVE VENDING MACHINE (自動販売機) */}
            <div className="absolute bottom-[10vh] left-10 md:left-24 z-20 flex flex-col items-center">
                <div className="w-28 h-56 bg-gradient-to-b from-[#C0392B] to-[#962D22] border-[3px] border-[#3A352F] rounded-xl p-2.5 shadow-paper flex flex-col justify-between relative group hover:shadow-paper-hover transition-shadow duration-300">
                    
                    {/* Glowing display window */}
                    <div className="h-24 bg-[#121212] border-2 border-[#3A352F] rounded-sm p-1.5 flex flex-col justify-between">
                        <div className="flex justify-around items-center h-10 border-b border-zinc-800">
                            <div className="w-4 h-6 bg-[#7D8C6E] rounded-sm border border-[#3A352F] shadow-sm" />
                            <div className="w-4 h-6 bg-[#C4956A] rounded-sm border border-[#3A352F] shadow-sm" />
                            <div className="w-4 h-6 bg-[#4A5568] rounded-sm border border-[#3A352F] shadow-sm" />
                        </div>
                        <div className="flex justify-around items-center h-10">
                            <div className="w-4 h-6 bg-[#87CEEB] rounded-sm border border-[#3A352F] shadow-sm" />
                            <div className="w-4 h-6 bg-[#FFB7B2] rounded-sm border border-[#3A352F] shadow-sm" />
                        </div>
                    </div>

                    {/* Vending buttons */}
                    <div className="grid grid-cols-3 gap-1.5 px-1 mt-2.5">
                        <button onClick={() => handleDispenseDrink("FastAPI Cola", "+30% Backend Speed")} className="h-5 w-full bg-zinc-700 hover:bg-zinc-600 rounded border border-[#3A352F] flex items-center justify-center shadow-inner">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        </button>
                        <button onClick={() => handleDispenseDrink("React Green Tea", "+25% Frontend Architecture")} className="h-5 w-full bg-zinc-700 hover:bg-zinc-600 rounded border border-[#3A352F] flex items-center justify-center shadow-inner">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        </button>
                        <button onClick={() => handleDispenseDrink("ML Soda", "+40% AI System Logic")} className="h-5 w-full bg-zinc-700 hover:bg-zinc-600 rounded border border-[#3A352F] flex items-center justify-center shadow-inner">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        </button>
                    </div>

                    {/* Dispenser Slot */}
                    <div className="h-10 bg-[#1A1918] border-2 border-[#3A352F] rounded-sm mt-3 relative flex items-center justify-center">
                        <div className="w-14 h-5 bg-black/75 rounded-t-sm" />
                    </div>
                </div>

                {/* Enlarged Dispense Button */}
                <button 
                    onClick={() => handleDispenseDrink("Lucky Drink", "Surprise Skill Boost!")}
                    className="text-xs font-sans font-bold text-[var(--ink)] tracking-wider mt-3 bg-[#FAF7F2] px-4 py-2 border-2 border-[#3A352F] rounded-full shadow-paper hover:bg-[#FAF7F2]/90 active:scale-95 transition-transform"
                >
                    DISPENSE SKILLS ◄
                </button>
            </div>

            {/* Drink Toasts */}
            <div className="absolute bottom-[26vh] left-10 md:left-24 z-30 flex flex-col gap-2 pointer-events-none">
                <AnimatePresence>
                    {dispensedDrinks.map((drink) => (
                        <motion.div
                            key={drink.id}
                            initial={{ opacity: 0, y: 15, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.9 }}
                            className="bg-[#FAF7F2] border-[3px] border-[#3A352F] rounded-lg px-4 py-3 text-xs shadow-paper flex flex-col font-serif"
                        >
                            <span className="font-bold text-[var(--ink)]">{drink.name} Dispensed!</span>
                            <span className="text-[var(--brush-warm)] font-mono text-[10px] font-bold mt-1">{drink.effect}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Platform Station Sign Board */}
            <div className="relative z-10 flex flex-col items-center mt-28">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex flex-col items-center bg-[#FAF7F2] border-[4px] border-[#3A352F] rounded-md px-12 py-7 shadow-paper min-w-[300px] md:min-w-[460px]"
                >
                    {/* Hanger wires */}
                    <div className="absolute -top-8 left-1/4 w-[2px] h-8 bg-[#3A352F]" />
                    <div className="absolute -top-8 right-1/4 w-[2px] h-8 bg-[#3A352F]" />

                    {/* Pre-station label & Clock */}
                    <div className="flex items-center gap-4 text-xs font-mono text-[var(--ink-faded)] tracking-wider mb-3">
                        <span className="font-bold">Platform 1 — Departure</span>
                        <span>|</span>
                        <span className="text-[var(--ink-light)] font-bold">TIME: {time}</span>
                    </div>

                    {/* Station Name (Enlarged) */}
                    <div className="mb-3 text-center">
                        <BrushReveal
                            as="h1"
                            className="text-5xl md:text-7xl font-serif font-bold text-[var(--ink)] tracking-widest leading-none"
                            delay={0.4}
                            stagger={0.12}
                        >
                            BIKASH
                        </BrushReveal>
                    </div>

                    {/* Subtitle */}
                    <h2 className="text-sm md:text-base font-serif font-bold tracking-[0.25em] text-[var(--ink-light)] uppercase border-t-2 border-[#3A352F] pt-3.5 w-full text-center">
                        Bikash Meitei Station
                    </h2>

                    {/* Stops Indicators */}
                    <div className="flex justify-between w-full mt-5 text-[10px] font-serif text-[var(--ink-faded)] tracking-wider font-bold">
                        <div className="flex flex-col items-start">
                            <span>◄ Start</span>
                            <span className="font-sans uppercase text-[8px] mt-0.5">Platform</span>
                        </div>
                        <div className="flex flex-col items-center text-[var(--brush-warm)]">
                            <span>● STOP</span>
                            <span className="font-sans uppercase text-[8px] mt-0.5">Meitei</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span>Explore ►</span>
                            <span className="font-sans uppercase text-[8px] mt-0.5">Next Station</span>
                        </div>
                    </div>
                </motion.div>

                {/* 🎟️ TICKET & TICKET GATE VALIDATOR */}
                <div className="relative mt-10 flex flex-col items-center">
                    
                    {/* Ticket Validator Slot Frame */}
                    <div className="w-[320px] h-[16px] bg-[#222] border-[3px] border-[#3A352F] rounded-t-md flex items-center justify-center z-0 relative shadow-inner">
                        <div className="w-72 h-[5px] bg-black rounded shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] flex justify-between px-4">
                            <span className="text-[7px] text-emerald-400 animate-pulse font-mono font-bold">◄ INSERT BOARDING PASS</span>
                            {isInsertingTicket && <span className="w-1.5 h-1.5 bg-emerald-500 animate-ping rounded-full" />}
                        </div>
                    </div>

                    {/* Sliding Train Ticket */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                        animate={isInsertingTicket 
                            ? { y: 25, scale: 0.82, rotate: 0, opacity: 0.4 } 
                            : { opacity: 1, scale: 1 }
                        }
                        style={{ rotateX, rotateY, rotate: -3, transformStyle: "preserve-3d" }}
                        transition={isInsertingTicket 
                            ? { duration: 0.6, ease: "easeInOut" } 
                            : { duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }
                        }
                        onMouseMove={handleMouse}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleTicketClick}
                        className="relative cursor-pointer group w-[300px] h-[130px] bg-[#E2D4C5] border-[3px] border-[#3A352F] rounded-md shadow-paper p-4 flex flex-col justify-between select-none hover:shadow-paper-hover transition-shadow duration-300 z-10 -mt-[4px]"
                    >
                        {/* Punch Hole Notches */}
                        <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 bg-[#87CEEB] border-r-[3px] border-y-[3px] border-[#3A352F] rounded-full z-20" />
                        <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 bg-[#87CEEB] border-l-[3px] border-y-[3px] border-[#3A352F] rounded-full z-20" />

                        {/* Red circular Hanko Stamp */}
                        <div className="absolute right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-[2.5px] border-red-500/80 flex items-center justify-center text-[10px] text-red-500/80 font-bold uppercase rotate-12 pointer-events-none select-none">
                            AI PASS
                        </div>

                        {/* Ticket Header */}
                        <div className="flex justify-between items-start text-[9px] font-mono tracking-widest text-[var(--ink-faded)] font-bold">
                            <span>BM-2026</span>
                            <span>FARE: AI/SYSTEMS</span>
                        </div>

                        {/* Ticket Center */}
                        <div className="flex items-center justify-between px-2">
                            <div className="flex flex-col items-start">
                                <span className="text-xl font-serif font-bold text-[var(--ink)]">BIKASH</span>
                                <span className="text-[8px] font-mono uppercase text-[var(--ink-faded)]">Bikash Station</span>
                            </div>
                            <div className="flex flex-col items-center flex-grow px-2">
                                <span className="text-[8px] font-mono text-[var(--brush-sage)] font-bold">ONE-WAY PASS</span>
                                <div className="w-full h-[2px] bg-[#3A352F] relative my-1">
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#3A352F] rotate-45" />
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-xl font-serif font-bold text-[var(--ink)]">EXPLORE</span>
                                <span className="text-[8px] font-mono uppercase text-[var(--ink-faded)]">Explore Stn.</span>
                            </div>
                        </div>

                        {/* Ticket Footer */}
                        <div className="flex justify-between items-end border-t border-[#3A352F]/20 pt-2.5 text-[9px] font-mono text-[var(--ink-faded)] font-bold">
                            <span>ISSUED 2026.05.28</span>
                            <span className="text-[8px] font-sans font-bold text-[var(--brush-warm)] tracking-wide group-hover:animate-pulse">INSERT PASS IN GATE ◄</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Platform Floor & Tenji Blocks */}
            <div className="relative w-full z-10 flex flex-col items-center">
                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2.2 }}
                    className="flex flex-col items-center gap-1.5 mb-6"
                >
                    <span className="text-xs font-sans font-bold tracking-[0.3em] uppercase text-[#1A1918]/70">
                        board train (scroll)
                    </span>
                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-[1.5px] h-6 bg-gradient-to-b from-[#1A1918]/60 to-transparent"
                    />
                </motion.div>

                {/* Yellow Safety Line (点字ブロック) */}
                <div className="w-full h-4 bg-[#F2C94C] border-t border-b border-[#D4AF37] shadow-inner relative flex justify-around overflow-hidden pointer-events-none">
                    {Array.from({ length: 60 }).map((_, i) => (
                        <div key={i} className="w-[2px] h-full bg-[#D4AF37]/40 flex-shrink-0" />
                    ))}
                </div>

                {/* Grey Platform Floor */}
                <div className="w-full h-[10vh] bg-gradient-to-b from-[#8C8275] via-[#736A5E] to-[#5C564D] border-t-[4px] border-[#3A352F] shadow-2xl pointer-events-none" />
            </div>
        </section>
    )
}

"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion"

export function TrainWindow() {
    const ref = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    
    // Emergency brake states
    const [isBraking, setIsBraking] = useState(false)
    const [shadePulled, setShadePulled] = useState(false)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const opacity = useTransform(scrollYProgress, [0, 0.08, 0.85, 1], [0, 1, 1, 0])

    // Sky colors cross-fade as the user scrolls (Daytime blue ➔ Sunset gold)
    const daytimeSkyOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7], [1, 1, 0])
    const sunsetSkyOpacity = useTransform(scrollYProgress, [0.3, 0.6, 1], [0, 1, 1])

    // River appearance: only active during the middle of the scroll (crossing the bridge)
    const riverOpacity = useTransform(scrollYProgress, [0.2, 0.35, 0.65, 0.8], [0, 1, 1, 0])
    
    // Bridge truss structure appearance: overlaps the river crossing
    const bridgeOpacity = useTransform(scrollYProgress, [0.25, 0.35, 0.6, 0.7], [0, 1, 1, 0])

    // 🌫️ HTML5 Canvas Mist Emitter
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        
        const resizeCanvas = () => {
            canvas.width = canvas.parentElement?.clientWidth || 800
            canvas.height = canvas.parentElement?.clientHeight || 450
            
            const ctx = canvas.getContext("2d")
            if (!ctx) return
            
            // Render initial frosted glass mist
            ctx.fillStyle = "rgba(240, 248, 255, 0.55)" // Frost/Mist overlay
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.globalCompositeOperation = "destination-out" // Eraser mode
        }

        resizeCanvas()
        window.addEventListener("resize", resizeCanvas)

        const handleMouseMove = (e: MouseEvent) => {
            const ctx = canvas.getContext("2d")
            if (!ctx) return
            const rect = canvas.getBoundingClientRect()
            const mouseX = e.clientX - rect.left
            const mouseY = e.clientY - rect.top

            // Wipe path
            ctx.beginPath()
            ctx.arc(mouseX, mouseY, 32, 0, Math.PI * 2)
            ctx.fill()
        }

        canvas.addEventListener("mousemove", handleMouseMove)

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            canvas.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    // Procedural emergency brake screech synth (Web Audio API)
    const playBrakeSound = () => {
        try {
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
            const osc = ctx.createOscillator()
            const noise = ctx.createOscillator()
            const gainNode = ctx.createGain()

            osc.type = "sawtooth"
            osc.frequency.setValueAtTime(2500, ctx.currentTime)
            osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 1.4)

            noise.type = "triangle"
            noise.frequency.setValueAtTime(180, ctx.currentTime)
            noise.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 1.4)

            gainNode.gain.setValueAtTime(0.08, ctx.currentTime)
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5)

            osc.connect(gainNode)
            noise.connect(gainNode)
            gainNode.connect(ctx.destination)

            osc.start()
            noise.start()
            osc.stop(ctx.currentTime + 1.5)
            noise.stop(ctx.currentTime + 1.5)
        } catch {}
    }

    const handleBrakeClick = () => {
        if (isBraking) return
        setIsBraking(true)
        playBrakeSound()
        setTimeout(() => setIsBraking(false), 1600)
    }

    // Window shade drag limits
    const shadeY = useMotionValue(0)
    const shadePercent = useTransform(shadeY, [0, 220], [0, 1])

    return (
        <motion.div
            ref={ref}
            className="relative w-full h-[400vh]"
            style={{ opacity }}
        >
            <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#F5F0E8] flex items-center justify-center">

                {/* 🚨 INTERACTIVE EMERGENCY BRAKE HANDLE (非常ブレーキ) */}
                <div className="absolute left-[3%] md:left-[6%] top-[25vh] z-40 flex flex-col items-center select-none">
                    <div className="w-8 h-20 bg-zinc-800 border-[2px] border-[#3A352F] rounded flex flex-col items-center justify-between p-1 shadow-sm">
                        {/* Flashing alert lamp */}
                        <div className={`w-3 h-3 rounded-full border border-black ${isBraking ? "bg-red-500 animate-ping" : "bg-red-950"}`} />
                        {/* Red Brake lever */}
                        <motion.div
                            onClick={handleBrakeClick}
                            animate={isBraking ? { rotateX: 60 } : { rotateX: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className="w-4 h-10 bg-red-600 border border-[#3A352F] rounded-t-sm origin-bottom cursor-pointer hover:bg-red-500"
                        />
                    </div>
                    <span className="text-[7px] font-sans font-bold text-red-600 tracking-wider mt-2 uppercase bg-red-50 px-2 py-0.5 border border-red-200 rounded-full">
                        Brake Handle
                    </span>
                </div>

                {/* ─── SCENERY THROUGH TRAIN WINDOW ─── */}
                <motion.div 
                    animate={isBraking ? { x: [0, -12, 10, -8, 6, -3, 0] } : {}}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="relative w-[85vw] max-w-[950px] h-[55vh] overflow-hidden rounded-2xl border-[16px] border-[#E8D5C4] bg-white shadow-2xl"
                    style={{ boxShadow: "inset 0 0 80px rgba(0,0,0,0.15), 0 25px 50px rgba(0,0,0,0.08)" }}
                >
                    
                    {/* ─── SKY LAYERS (CROSS-FADING) ─── */}
                    <motion.div 
                        className="absolute inset-0 bg-gradient-to-b from-[#4CA1AF] via-[#87CEEB] to-[#C4E0E5]"
                        style={{ opacity: daytimeSkyOpacity }}
                    />
                    <motion.div 
                        className="absolute inset-0 bg-gradient-to-b from-[#392D4E] via-[#8E3A5A] to-[#E89E78]"
                        style={{ opacity: sunsetSkyOpacity }}
                    />

                    {/* Lens Flare */}
                    <div className="absolute top-[-10%] left-[10%] w-[350px] h-[350px] bg-white rounded-full opacity-40 blur-[80px] pointer-events-none mix-blend-screen" />

                    {/* ─── PARALLAX LAYER 1: DISTANT METROPOLIS (VERY SLOW) ─── */}
                    <motion.div
                        className="absolute bottom-[18%] left-0 h-[40%] flex w-[300%]"
                        animate={{ x: ["0%", "-33.33%"] }}
                        transition={{ duration: 75, ease: "linear", repeat: Infinity }}
                    >
                        {[0, 1, 2].map((i) => (
                            <svg key={i} viewBox="0 0 1000 200" className="h-full w-full flex-shrink-0" preserveAspectRatio="none">
                                <path fill="#7B8C9E" opacity="0.25" d="M0,200 L0,110 L25,110 L25,130 L45,130 L45,90 L75,90 L75,125 L95,125 L95,80 L115,80 L115,135 L145,135 L145,115 L165,115 L165,140 L195,140 L195,75 L225,75 L225,145 L255,145 L255,105 L285,105 L285,60 L305,60 L305,135 L335,135 L335,95 L365,95 L365,120 L385,120 L385,50 L405,50 L405,125 L425,125 L425,140 L455,140 L455,100 L475,100 L475,85 L505,85 L505,130 L535,130 L535,110 L565,110 L565,140 L585,140 L585,65 L615,65 L615,145 L635,145 L635,95 L665,95 L665,125 L685,125 L685,55 L705,55 L705,130 L735,130 L735,105 L765,105 L765,135 L785,135 L785,75 L815,75 L815,145 L845,145 L845,100 L875,100 L875,120 L895,120 L895,60 L915,60 L915,135 L945,135 L945,115 L975,115 L975,140 L1000,140 L1000,200 Z" />
                                <path fill="#C4956A" opacity="0.3" d="M 685,200 L 692,120 L 696,80 L 699,50 L 701,50 L 704,80 L 708,120 L 715,200 Z" />
                            </svg>
                        ))}
                    </motion.div>

                    {/* ─── PARALLAX LAYER 2: ROOFTOPS (MEDIUM) ─── */}
                    <motion.div
                        className="absolute bottom-[10%] left-0 h-[30%] flex w-[300%]"
                        animate={{ x: ["0%", "-33.33%"] }}
                        transition={{ duration: 35, ease: "linear", repeat: Infinity }}
                    >
                        {[0, 1, 2].map((i) => (
                            <svg key={i} viewBox="0 0 1000 200" className="h-full w-full flex-shrink-0" preserveAspectRatio="none">
                                <path fill="#5A6E7F" opacity="0.6" d="M0,200 L0,165 L20,150 L40,165 L50,165 L50,155 L65,145 L80,155 L80,170 L110,170 L110,160 L130,145 L150,160 L160,160 L160,150 L180,150 L195,140 L210,150 L210,175 L240,175 L240,160 L260,160 L270,152 L280,160 L285,160 L285,145 L305,135 L325,145 L325,168 L360,168 L360,158 L380,145 L400,158 L410,158 L410,150 L430,150 L445,140 L460,150 L460,175 L490,175 L490,162 L510,148 L530,162 L540,162 L540,155 L555,145 L570,155 L570,170 L600,170 L600,160 L620,145 L640,160 L650,160 L650,150 L670,150 L685,140 L700,150 L700,175 L730,175 L730,160 L750,160 L760,152 L770,160 T800,160 T820,145 T840,168 L880,168 L880,158 L900,145 L920,158 L930,158 L930,150 L950,150 L965,140 L980,150 L980,175 L1000,175 L1000,200 Z" />
                            </svg>
                        ))}
                    </motion.div>

                    {/* ─── PARALLAX LAYER 3: SHIMMERING RIVER ─── */}
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-[28%] overflow-hidden pointer-events-none"
                        style={{ opacity: riverOpacity }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-[#87CEEB]/40 to-[#4682B4]/60" />
                        <motion.div
                            className="absolute bottom-0 left-0 w-[300%] h-full flex"
                            animate={{ x: ["0%", "-33.33%"] }}
                            transition={{ duration: 4.5, ease: "linear", repeat: Infinity }}
                        >
                            {[0, 1, 2].map((i) => (
                                <svg key={i} viewBox="0 0 1000 100" className="h-full w-full flex-shrink-0" preserveAspectRatio="none">
                                    <path fill="#FFFFFF" opacity="0.3" d="M0,50 Q100,30 200,50 T400,50 T600,50 T800,50 T1000,50 L1000,100 L0,100 Z" />
                                </svg>
                            ))}
                        </motion.div>
                        <motion.div
                            className="absolute bottom-0 left-0 w-[300%] h-[75%] flex"
                            animate={{ x: ["-33.33%", "0%"] }}
                            transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                        >
                            {[0, 1, 2].map((i) => (
                                <svg key={i} viewBox="0 0 1000 100" className="h-full w-full flex-shrink-0" preserveAspectRatio="none">
                                    <path fill="#E0F7FA" opacity="0.4" d="M0,60 Q120,40 240,60 T480,60 T720,60 T960,60 T1000,60 L1000,100 L0,100 Z" />
                                </svg>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* ─── PARALLAX LAYER 4: IRON TRUSS BRIDGE ─── */}
                    <motion.div
                        className="absolute inset-y-0 left-0 h-full flex w-[300%] z-20 pointer-events-none"
                        style={{ opacity: bridgeOpacity }}
                        animate={{ x: ["0%", "-33.33%"] }}
                        transition={{ duration: 1.1, ease: "linear", repeat: Infinity }}
                    >
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="h-full w-full flex-shrink-0 flex items-stretch">
                                {Array.from({ length: 6 }).map((_, idx) => (
                                    <div key={idx} className="flex-1 relative border-r-[12px] border-[#C4956A]/60">
                                        <div className="absolute top-0 left-0 right-0 h-8 bg-[#C4956A]/60 border-b border-[#A07850]" />
                                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#C4956A]/60 border-t border-[#A07850]" />
                                        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="#C4956A" strokeWidth="8" opacity="0.6" />
                                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="#C4956A" strokeWidth="8" opacity="0.6" />
                                        </svg>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </motion.div>

                    {/* ─── PARALLAX LAYER 5: PASSING TRAIN SIGNAL LAMPS ─── */}
                    <motion.div
                        className="absolute top-0 bottom-0 w-[6px] bg-[#333] z-30 flex flex-col items-center justify-center pointer-events-none"
                        animate={{ x: ["110vw", "-30vw"] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "linear", repeatDelay: 2.2 }}
                    >
                        <div className="w-5 h-14 bg-[#1C1C1C] rounded border border-zinc-700 flex flex-col items-center justify-around py-1 shadow-md">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                            <div className="w-3 h-3 rounded-full bg-red-500/20" />
                        </div>
                    </motion.div>

                    {/* ─── PARALLAX LAYER 6: TELEPHONE POLES ─── */}
                    <motion.div
                        className="absolute top-0 left-0 h-full flex w-[300%] z-30 pointer-events-none"
                        animate={{ x: ["0%", "-33.33%"] }}
                        transition={{ duration: 2.6, ease: "linear", repeat: Infinity }}
                    >
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="h-full w-full flex-shrink-0 relative">
                                <div className="absolute left-[35%] top-[15%] bottom-0 w-[12px] bg-[#4E3629] blur-[0.5px]" />
                                <div className="absolute left-[20%] right-[40%] top-[30%] h-[10px] bg-[#3E2A20]" />
                                <div className="absolute left-0 right-0 top-[31%] h-[1.5px] bg-[#1C1C1C] opacity-50 blur-[0.5px]" style={{ transform: "rotate(1.5deg)" }} />
                                <div className="absolute left-0 right-0 top-[35%] h-[1.5px] bg-[#1C1C1C] opacity-50 blur-[0.5px]" style={{ transform: "rotate(-1deg)" }} />
                            </div>
                        ))}
                    </motion.div>

                    {/* Glass Reflection overlay */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/15 mix-blend-overlay z-40" />

                    {/* 🌫️ FROSTED GLASS MIST CANVAS (Wipeable layer) */}
                    <canvas 
                        ref={canvasRef} 
                        className="absolute inset-0 z-40 cursor-pointer pointer-events-auto"
                    />

                    {/* 🎋 INTERACTIVE BAMBOO WINDOW SHADE (ブラインド) */}
                    <motion.div
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 220 }}
                        dragElastic={0.2}
                        style={{ y: shadeY }}
                        className="absolute top-[-220px] left-0 right-0 h-[240px] bg-[#E2D4C5] border-b-[8px] border-[#3A352F] z-50 shadow-md flex flex-col justify-end p-4 pointer-events-auto"
                    >
                        {/* Shade Texture slats */}
                        <div className="absolute inset-0 flex flex-col justify-around opacity-10 pointer-events-none">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div key={i} className="h-[1px] bg-black w-full" />
                            ))}
                        </div>

                        {/* Custom System Logs inside shade (revealed when pulled down) */}
                        <motion.div 
                            style={{ opacity: shadePercent }}
                            className="w-full h-36 bg-black/90 rounded border border-zinc-700 p-2 font-mono text-[9px] text-green-400 overflow-y-auto leading-relaxed select-none"
                        >
                            <div>[SYSTEM] INITIALIZING TICKET VALIDATION...</div>
                            <div>[INFO] DEPARTURE STATION: BIKASH MEITEI</div>
                            <div>[INFO] IMPACT METRIC SYNCHRONIZED.</div>
                            <div>[SUCCESS] CORE MEMORY STREAMS LOADED.</div>
                            <div>[ALERT] ROUTE SET TO explore_stn.sh</div>
                        </motion.div>

                        {/* Pull string ring handle */}
                        <div className="w-full flex justify-center mt-2 relative z-10">
                            <div className="w-[2px] h-6 bg-[#3A352F]" />
                            <div className="w-5 h-5 rounded-full border-2 border-[#3A352F] bg-[#E2D4C5] -mt-1 hover:bg-[#FAF7F2] active:scale-95 cursor-grab active:cursor-grabbing flex items-center justify-center font-sans text-[7px] text-[#3A352F] font-bold">
                                ⇩
                            </div>
                        </div>
                    </motion.div>

                </motion.div>

                {/* Window Center Divider */}
                <div className="absolute w-[6px] h-[55vh] bg-[#E8D5C4] z-40 shadow-md" />
            </div>

            {/* Train interior light vignette */}
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse at center, transparent 45%, rgba(245, 240, 232, 0.75) 80%, #F5F0E8 100%)"
                }}
            />

            {/* Scroll Hint */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                <p className="text-[#8B8680]/40 text-xs tracking-[0.5em] uppercase font-sans">
                    crossing the grid
                </p>
            </div>
        </motion.div>
    )
}

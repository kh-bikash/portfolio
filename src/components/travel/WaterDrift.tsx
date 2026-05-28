"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface Ripple {
    id: number
    x: number
    y: number
}

export function WaterDrift() {
    const ref = useRef<HTMLDivElement>(null)
    const [ripples, setRipples] = useState<Ripple[]>([])

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const opacity = useTransform(scrollYProgress, [0, 0.08, 0.85, 1], [0, 1, 1, 0])

    // Floating elements move across
    const leaf1X = useTransform(scrollYProgress, [0, 1], ["-5%", "70%"])
    const leaf2X = useTransform(scrollYProgress, [0, 1], ["85%", "25%"])
    const leaf1Rotate = useTransform(scrollYProgress, [0, 1], [0, 45])
    const leaf2Rotate = useTransform(scrollYProgress, [0, 1], [10, -30])

    // Stars appearing
    const starsOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 0.7])

    // Lantern glow
    const lanternGlow = useTransform(scrollYProgress, [0.3, 0.7], [0.3, 0.8])

    const handleWaterClickOrMove = (e: React.MouseEvent<HTMLDivElement>) => {
        // Prevent creating too many ripples at once (throttling)
        if (ripples.length > 8) return
        
        const rect = e.currentTarget.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const clickY = e.clientY - rect.top
        const id = Date.now() + Math.random()

        setRipples((prev) => [...prev, { id, x: clickX, y: clickY }])
        
        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== id))
        }, 1600)
    }

    return (
        <motion.div
            ref={ref}
            className="relative w-full h-[350vh]"
            style={{ opacity }}
        >
            <div className="sticky top-0 w-full h-screen overflow-hidden">
                {/* ─── SKY HALF ─── */}
                <motion.div
                    className="absolute top-0 left-0 right-0 h-1/2"
                    style={{
                        background: "linear-gradient(180deg, #1E1C2E 0%, #2D2B3D 20%, #5A4870 40%, #8B6878 60%, #C4956A 82%, #E0C8AA 100%)"
                    }}
                >
                    {/* Stars */}
                    <motion.div className="absolute inset-0" style={{ opacity: starsOpacity }}>
                        {Array.from({ length: 50 }, (_, i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full bg-white"
                                animate={{ opacity: [0.3, 0.8, 0.3] }}
                                transition={{
                                    duration: 3 + Math.random() * 4,
                                    repeat: Infinity,
                                    delay: Math.random() * 3,
                                }}
                                style={{
                                    width: `${1 + Math.random() * 1.5}px`,
                                    height: `${1 + Math.random() * 1.5}px`,
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 55}%`,
                                }}
                            />
                        ))}
                    </motion.div>

                    {/* Moon */}
                    <motion.div
                        className="absolute top-[15%] right-[20%]"
                        style={{ opacity: starsOpacity }}
                    >
                        <div className="w-8 h-8 rounded-full bg-[#F0E8D8] shadow-[0_0_20px_rgba(240,232,216,0.3)]" />
                    </motion.div>

                    {/* Distant tree silhouettes on horizon */}
                    <svg className="absolute bottom-0 left-0 right-0 h-[40px]" viewBox="0 0 1440 40" preserveAspectRatio="none">
                        <path fill="#1E1C2E" opacity="0.4" d="M0,30L20,25L30,15L40,25L60,28L80,18L90,10L100,20L120,26L150,22L160,12L170,22L200,28L230,20L240,14L250,22L280,28L320,24L330,16L340,24L370,28L400,22L410,8L420,22L450,30L500,25L510,12L520,25L560,30L600,22L610,10L620,22L660,30L700,25L720,15L730,25L770,30L800,22L810,14L820,24L860,28L900,22L910,8L920,22L960,28L1000,24L1020,16L1030,24L1060,28L1100,22L1110,10L1120,22L1160,30L1200,25L1220,15L1230,25L1280,28L1320,22L1340,12L1350,24L1400,28L1440,25L1440,40L0,40Z" />
                    </svg>

                    {/* Lantern */}
                    <motion.div
                        className="absolute bottom-[8%] left-[62%]"
                        style={{ opacity: lanternGlow }}
                    >
                        <div className="relative">
                            <div className="w-2 h-3 bg-[#E8A87C] rounded-sm" />
                            <div className="absolute -inset-3 bg-[#E8A87C]/15 rounded-full blur-[8px]" />
                            <div className="absolute -inset-6 bg-[#E8A87C]/5 rounded-full blur-[16px]" />
                        </div>
                    </motion.div>
                </motion.div>

                {/* ─── WATER HALF (Reflection) ─── */}
                <div 
                    className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden cursor-crosshair pointer-events-auto select-none"
                    onMouseMove={handleWaterClickOrMove}
                    onClick={handleWaterClickOrMove}
                >
                    {/* Reflected sky (flipped) */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: "linear-gradient(0deg, #1E1C2E 0%, #2D2B3D 20%, #5A4870 40%, #8B6878 60%, #C4956A 82%, #E0C8AA 100%)",
                            filter: "blur(2px) brightness(0.6) saturate(0.8)",
                        }}
                    />

                    {/* Water ripple lines */}
                    <div className="absolute inset-0">
                        {Array.from({ length: 15 }, (_, i) => (
                            <motion.div
                                key={i}
                                className="absolute left-0 right-0 h-[1px] bg-white/[0.06]"
                                style={{ top: `${6 + i * 6.5}%` }}
                                animate={{ 
                                    scaleX: [1, 1.02, 0.98, 1],
                                    opacity: [0.06, 0.1, 0.04, 0.06],
                                }}
                                transition={{
                                    duration: 4 + i * 0.3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.2,
                                }}
                            />
                        ))}
                    </div>

                    {/* Concentric Water Ripple Click Effects */}
                    {ripples.map((r) => (
                        <motion.div
                            key={r.id}
                            initial={{ scale: 0, opacity: 0.65 }}
                            animate={{ scale: 3.5, opacity: 0 }}
                            transition={{ duration: 1.4, ease: "easeOut" }}
                            className="absolute rounded-full border-2 border-white/20 pointer-events-none"
                            style={{
                                left: r.x - 20,
                                top: r.y - 20,
                                width: 40,
                                height: 40,
                            }}
                        />
                    ))}

                    {/* Lantern reflection streak */}
                    <motion.div
                        className="absolute left-[62%] top-[5%] w-[2px] h-[60%]"
                        style={{ opacity: lanternGlow }}
                    >
                        <div className="w-full h-full bg-gradient-to-b from-[#E8A87C]/25 via-[#E8A87C]/10 to-transparent" 
                            style={{ filter: "blur(1px)" }}
                        />
                    </motion.div>

                    {/* Moon reflection */}
                    <motion.div
                        className="absolute top-[10%] right-[20%]"
                        style={{ opacity: starsOpacity }}
                    >
                        <div className="w-4 h-12 bg-gradient-to-b from-[#F0E8D8]/15 to-transparent rounded-full"
                            style={{ filter: "blur(2px)" }}
                        />
                    </motion.div>
                </div>

                {/* ─── HORIZON LINE ─── */}
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#C4956A]/15" />

                {/* ─── FLOATING LEAVES ─── */}
                <motion.div
                    className="absolute z-10"
                    style={{ x: leaf1X, top: "46%", rotate: leaf1Rotate }}
                >
                    <svg width="18" height="10" viewBox="0 0 18 10">
                        <ellipse cx="9" cy="5" rx="9" ry="4" fill="#7D8C6E" opacity="0.5" />
                        <line x1="2" y1="5" x2="16" y2="5" stroke="#5A6B50" strokeWidth="0.5" opacity="0.4" />
                    </svg>
                </motion.div>
                <motion.div
                    className="absolute z-10"
                    style={{ x: leaf2X, top: "49%", rotate: leaf2Rotate }}
                >
                    <svg width="14" height="8" viewBox="0 0 14 8">
                        <ellipse cx="7" cy="4" rx="7" ry="3.5" fill="#C4956A" opacity="0.4" />
                        <line x1="2" y1="4" x2="12" y2="4" stroke="#A07850" strokeWidth="0.4" opacity="0.3" />
                    </svg>
                </motion.div>

                {/* Hint text */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none">
                    <p className="text-white/15 text-[10px] tracking-[0.5em] uppercase font-sans">
                        almost there
                    </p>
                </div>
            </div>
        </motion.div>
    )
}

"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { useAudioSystem } from "@/hooks/useAudioSystem"
import { useUIStore } from "@/store/useUIStore"

interface DNAItem {
    id: number | string
    title: string
    subtitle: string
    image?: string
    video?: string
    link?: string
    action?: () => void
    highlight?: boolean
}

interface DNAHelixCardSystemProps {
    items: DNAItem[]
    onCardClick?: (item: DNAItem) => void
}

export function DNAHelixCardSystem({ items, onCardClick }: DNAHelixCardSystemProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const warpCanvasRef = useRef<HTMLCanvasElement>(null)

    const { playHover, playClick } = useAudioSystem()
    const { setActiveProjectImage } = useUIStore()

    const [scrollY, setScrollY] = useState(0)
    const [activeIndex, setActiveIndex] = useState(0)

    // Physics State
    const currentScrollY = useRef(0)
    const velocity = useRef(0)
    const isDragging = useRef(false)
    const lastY = useRef(0)
    const snapCooldown = useRef(0)

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    // CONFIG: "The Crystal Pillar" settings
    const ITEM_HEIGHT = 280 // Larger spacing for vertical clarity
    const MAX_VISIBLE_DEPTH = 3000
    const CURVE_STRENGTH = 1.5

    // Resize Handler
    useEffect(() => {
        // (Could add dynamic sizing here if needed, but keeping simple for now)
    }, [])

    const handleHover = useCallback((index: number, item: DNAItem) => {
        if (hoveredIndex !== index) {
            playHover()
            setHoveredIndex(index)
            setActiveProjectImage(item.image || null)
        }
    }, [hoveredIndex, playHover, setActiveProjectImage])

    const handleLeave = useCallback(() => {
        setHoveredIndex(null)
        setActiveProjectImage(null)
    }, [setActiveProjectImage])

    // Physics Loop
    useEffect(() => {
        let frame: number
        const update = () => {
            if (!isDragging.current) {
                // Friction
                velocity.current *= 0.90

                // HEAVY MAGNETIC SNAP
                if (Math.abs(velocity.current) < 5) { // Strong snap threshold
                    const idx = Math.round(currentScrollY.current / ITEM_HEIGHT)
                    const snapTarget = idx * ITEM_HEIGHT
                    const dist = snapTarget - currentScrollY.current

                    // Spring pull
                    velocity.current += dist * 0.08

                    if (idx !== activeIndex) {
                        setActiveIndex(idx)
                    }
                }
            }

            currentScrollY.current += velocity.current
            setScrollY(currentScrollY.current)
            frame = requestAnimationFrame(update)
        }
        frame = requestAnimationFrame(update)
        return () => cancelAnimationFrame(frame)
    }, [activeIndex])

    // ... (Keep Warp Effect Loop for background ambiance)
    useEffect(() => {
        // (Minimal version of warp loop to save space - functionally same as before or simplified)
        // Keeping simpler for this focused refactor
        const canvas = warpCanvasRef.current; if (!canvas) return
        const ctx = canvas.getContext("2d"); if (!ctx) return
        canvas.width = window.innerWidth; canvas.height = window.innerHeight

        const particles = Array.from({ length: 50 }, () => ({
            x: Math.random() * canvas.width, y: Math.random() * canvas.height, speed: Math.random() * 2
        }))

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = "rgba(0, 255, 255, 0.1)"
            const warp = velocity.current * 0.5
            particles.forEach(p => {
                p.y += p.speed + warp
                if (p.y > canvas.height) p.y = 0
                if (p.y < 0) p.y = canvas.height
                ctx.fillRect(p.x, p.y, 1, 10 + Math.abs(warp) * 2)
            })
            requestAnimationFrame(animate)
        }
        animate()
    }, [])

    // Event Handlers
    const handleWheel = (e: WheelEvent) => {
        e.preventDefault()
        velocity.current += e.deltaY * 0.2 // More sensitive
        isDragging.current = false
    }
    const handleTouchStart = (e: TouchEvent) => { isDragging.current = true; lastY.current = e.touches[0].clientY; velocity.current = 0 }
    const handleTouchMove = (e: TouchEvent) => { if (!isDragging.current) return; velocity.current = (lastY.current - e.touches[0].clientY) * 1.5; lastY.current = e.touches[0].clientY }
    const handleTouchEnd = () => { isDragging.current = false }

    useEffect(() => {
        const container = containerRef.current; if (!container) return
        container.addEventListener("wheel", handleWheel, { passive: false }); container.addEventListener("touchstart", handleTouchStart); container.addEventListener("touchmove", handleTouchMove); container.addEventListener("touchend", handleTouchEnd)
        return () => { container.removeEventListener("wheel", handleWheel); container.removeEventListener("touchstart", handleTouchStart); container.removeEventListener("touchmove", handleTouchMove); container.removeEventListener("touchend", handleTouchEnd) }
    }, [])

    return (
        <div ref={containerRef} className="fixed inset-0 w-full h-full perspective-[1000px] overflow-hidden cursor-grab active:cursor-grabbing z-40 bg-black">
            {/* AMBIANCE */}
            <canvas ref={warpCanvasRef} className="absolute inset-0 opacity-30 pointer-events-none" />

            {/* GOD RAY CENTER */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[600px] h-full bg-gradient-to-r from-transparent via-cyan-900/10 to-transparent blur-3xl opacity-50" />
            </div>

            <div className="absolute inset-0 flex items-center justify-center transform-style-3d">
                {items.map((item, index) => {
                    const i = index
                    const itemY = i * ITEM_HEIGHT
                    let relativePos = (itemY - scrollY)

                    // infinite loop logic (optional, but let's stick to infinite scroll via mod)
                    const totalLen = items.length * ITEM_HEIGHT
                    const offset = totalLen * Math.floor((relativePos + totalLen / 2) / totalLen)
                    relativePos -= offset

                    // PARABOLIC MATH
                    // y = actual vertical pos
                    // z = curve away from camera based on distance from center
                    const distRatio = relativePos / 500 // Normalize
                    const z = -1 * Math.pow(Math.abs(distRatio), CURVE_STRENGTH) * 200
                    const scale = 1.0 - (Math.abs(relativePos) / 2000)
                    const opacity = Math.max(0, 1 - Math.abs(relativePos) / 800)

                    // Active State
                    const isCenter = Math.abs(relativePos) < ITEM_HEIGHT / 2
                    const isHovered = hoveredIndex === index

                    if (opacity < 0.05) return null

                    return (
                        <div
                            key={index}
                            className={cn(
                                "absolute left-1/2 top-1/2 transform-style-3d",
                                "w-[500px] h-[300px] -ml-[250px] -mt-[150px]",
                                "transition-all duration-300",
                                isCenter ? "z-50" : "z-0"
                            )}
                            style={{
                                transform: `translate3d(0px, ${relativePos}px, ${z}px) scale(${scale})`,
                                opacity,
                                zIndex: Math.floor(z + 5000),
                            }}
                            onMouseEnter={() => handleHover(index, item)}
                            onMouseLeave={handleLeave}
                            onClick={() => {
                                if (Math.abs(velocity.current) < 2 && onCardClick) {
                                    playClick()
                                    onCardClick(item)
                                    if (item.action) item.action()
                                    if (item.link) window.open(item.link, "_blank")
                                }
                            }}
                        >
                            {/* GLASS FRAME */}
                            <div className={cn(
                                "absolute inset-0 backdrop-blur-xl transition-all duration-500 rounded-xl overflow-hidden border",
                                isCenter || isHovered ? "border-cyan-500/50 bg-cyan-900/10 shadow-[0_0_100px_rgba(0,255,255,0.2)]" : "border-white/5 bg-black/60 grayscale"
                            )}>
                                {item.image && (
                                    <div className="absolute inset-0 transition-transform duration-500" style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}>
                                        <img src={item.image} className="w-full h-full object-cover opacity-60" />
                                    </div>
                                )}
                                {item.video && isCenter && (
                                    <video src={item.video} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-80" />
                                )}
                            </div>

                            {/* HOVER POP-OUT CONTENT */}
                            <div
                                className="absolute inset-0 flex flex-col justify-end p-10 pointer-events-none transition-transform duration-300"
                                style={{ transform: isHovered ? "translateZ(50px)" : "translateZ(0px)" }}
                            >
                                <div className="border-l-4 border-cyan-500 pl-4">
                                    <h2 className={cn(
                                        "text-4xl font-black uppercase tracking-tighter transition-colors duration-300",
                                        isCenter || isHovered ? "text-white drop-shadow-[0_0_20px_rgba(0,255,255,0.8)]" : "text-gray-500"
                                    )}>
                                        {item.title}
                                    </h2>
                                    <p className="text-sm text-cyan-400 font-mono tracking-widest mt-2 uppercase">
                                        {item.subtitle} // {isCenter ? "ACTIVE" : "STANDBY"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* STATIC HUD */}
            <div className="absolute bottom-12 inset-x-0 text-center pointer-events-none z-50">
                <p className="text-[10px] text-cyan-500/50 tracking-[1em] uppercase">
                    CRYSTAL_PILLAR_V2 // {items.length} ITEMS
                </p>
            </div>
        </div>
    )
}

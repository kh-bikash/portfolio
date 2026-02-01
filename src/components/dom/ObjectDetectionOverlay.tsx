"use client"

import { useEffect, useRef, useState } from "react"
import { useUIStore } from "@/store/useUIStore"

interface Detection {
    id: string
    rect: DOMRect
    label: string
    confidence: number
}

export function ObjectDetectionOverlay() {
    const { visionMode } = useUIStore()
    const [detections, setDetections] = useState<Detection[]>([])
    const frameRef = useRef(0)

    useEffect(() => {
        if (!visionMode) {
            setDetections([])
            return
        }

        const scan = () => {
            const elements = document.querySelectorAll('h1, h2, a, button, .card, img')
            const newDetections: Detection[] = []

            elements.forEach((el, i) => {
                const rect = el.getBoundingClientRect()
                // Simple Viewport Check
                if (rect.width > 0 && rect.height > 0 && rect.top < window.innerHeight && rect.bottom > 0) {
                    newDetections.push({
                        id: `det-${i}`,
                        rect,
                        label: el.tagName,
                        confidence: 0.85 + (Math.sin(Date.now() * 0.005 + i) * 0.14) // Fluctuating confidence
                    })
                }
            })

            setDetections(newDetections)
            frameRef.current = requestAnimationFrame(scan)
        }

        scan()

        return () => cancelAnimationFrame(frameRef.current)
    }, [visionMode])

    if (!visionMode) return null

    return (
        <div className="fixed inset-0 z-[140] pointer-events-none overflow-hidden">
            {/* HUD OVERLAY */}
            <div className="absolute inset-0 border-[20px] border-red-500/20 shadow-[inset_0_0_100px_rgba(255,0,0,0.2)]" />

            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-600 text-black px-4 py-1 font-bold text-xs animate-pulse">
                SYSTEM_VISION: ACTIVE
            </div>

            {detections.map((det) => (
                <div
                    key={det.id}
                    className="absolute border border-red-500/80 bg-red-500/5 transition-all duration-75"
                    style={{
                        left: det.rect.left,
                        top: det.rect.top,
                        width: det.rect.width,
                        height: det.rect.height
                    }}
                >
                    <div className="absolute -top-4 left-0 bg-red-500 text-black text-[8px] font-bold px-1 whitespace-nowrap">
                        {det.label} : {(det.confidence * 100).toFixed(1)}%
                    </div>
                    {/* Corners */}
                    <div className="absolute top-0 left-0 w-1 h-1 bg-red-500" />
                    <div className="absolute top-0 right-0 w-1 h-1 bg-red-500" />
                    <div className="absolute bottom-0 left-0 w-1 h-1 bg-red-500" />
                    <div className="absolute bottom-0 right-0 w-1 h-1 bg-red-500" />
                </div>
            ))}
        </div>
    )
}

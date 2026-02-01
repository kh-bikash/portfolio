"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Camera, ChevronLeft, ChevronRight, Hand } from "lucide-react"
import { useUIStore } from "@/store/useUIStore"

export function HandGestures() {
    const { contactOpen, toggleContact, view, setView } = useUIStore()
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isActive, setIsActive] = useState(false)
    const [permission, setPermission] = useState<PermissionState | 'prompt'>('prompt')
    const [lastX, setLastX] = useState(0)
    const [cooldown, setCooldown] = useState(false)

    // Simplified Motion Detection
    // In a real app, we'd use TensorFlow.js/MediaPipe. 
    // Here, we'll mock the UI and basic video stream setup.

    useEffect(() => {
        if (!isActive) return

        let animationFrame: number
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        // const diffCanvas = document.createElement('canvas') // For diffing

        const loop = () => {
            // Logic to detect Motion would go here
            // For now, we visualize the camera feed to look cool
            animationFrame = requestAnimationFrame(loop)
        }
        loop()

        return () => cancelAnimationFrame(animationFrame)
    }, [isActive])

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 } })
            if (videoRef.current) {
                videoRef.current.srcObject = stream
                setIsActive(true)
            }
        } catch (e) {
            console.error("Camera denied", e)
            setPermission('denied')
        }
    }

    const stopCamera = () => {
        const stream = videoRef.current?.srcObject as MediaStream
        stream?.getTracks().forEach(track => track.stop())
        setIsActive(false)
    }

    return (
        <div className="fixed bottom-8 left-8 z-50">
            <AnimatePresence>
                {isActive ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="relative w-48 h-36 bg-black border border-primary/50 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(0,255,255,0.2)]"
                    >
                        <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover opacity-50 grayscale contrast-125" />

                        {/* HUD OVERLAY */}
                        <div className="absolute inset-0 pointer-events-none p-2 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <span className="text-[8px] font-mono text-primary animate-pulse">REC ●</span>
                                <span className="text-[8px] font-mono text-primary">GESTURE_V1</span>
                            </div>

                            <div className="flex justify-center items-center gap-4 opacity-50">
                                <ChevronLeft className="w-4 h-4 text-white" />
                                <Hand className="w-4 h-4 text-white animate-pulse" />
                                <ChevronRight className="w-4 h-4 text-white" />
                            </div>

                            <div className="text-[8px] font-mono text-primary/70 text-center">
                                WAVE TO NAVIGATE
                            </div>
                        </div>

                        {/* SCANLINE */}
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none" />

                        <button
                            onClick={stopCamera}
                            className="absolute top-1 right-1 p-1 bg-black/50 hover:bg-red-500/50 rounded-full transition-colors z-50"
                        >
                            <Camera className="w-3 h-3 text-white" />
                        </button>
                    </motion.div>
                ) : (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-10 h-10 bg-black/50 border border-white/10 rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-colors group"
                        onClick={startCamera}
                        title="Enable Gesture Control"
                    >
                        <Hand className="w-5 h-5 text-white/50 group-hover:text-primary" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    )
}

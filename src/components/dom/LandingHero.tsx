"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei"
import { useRef, useState } from "react"
import { useUIStore } from "@/store/useUIStore"
import { motion } from "framer-motion"
import * as THREE from "three"

// Brain Particles Component (Now with warp logic)
function BrainParticles({ warping }: { warping: boolean }) {
    const ref = useRef<THREE.Points>(null)
    const particleCount = 2000 // More stars for warp

    // Initial Positions
    const [positions] = useState(() => {
        const pos = new Float32Array(particleCount * 3)
        for (let i = 0; i < particleCount; i++) {
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(Math.random() * 2 - 1)
            const r = 2.5 + Math.random() * 0.5

            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
            pos[i * 3 + 2] = r * Math.cos(phi)
        }
        return pos
    })

    // Warp Animation State
    useFrame((state, delta) => {
        if (!ref.current) return

        // Idle Rotation
        ref.current.rotation.y += delta * 0.1

        // WARP SPEED EFFECT
        if (warping) {
            // Expand stars outward rapidly
            ref.current.scale.x += delta * 5
            ref.current.scale.y += delta * 5
            ref.current.scale.z += delta * 20 // Stretch deep
            ref.current.rotation.z += delta * 2 // Spin violently
        }
    })

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                    args={[positions, 3]} // FIX: Required by R3F Types
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#00E5FF"
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    )
}

function HolographicHead() {
    return (
        <Sphere args={[2, 64, 64]}>
            <MeshDistortMaterial
                color="#222"
                emissive="#00E5FF"
                emissiveIntensity={0.2}
                roughness={0.1}
                metalness={1}
                distort={0.4}
                speed={2}
                wireframe
            />
        </Sphere>
    )
}

import { useAudioSystem } from "@/hooks/useAudioSystem"
import { GlitchText } from "@/components/dom/GlitchText" // Import

export function LandingHero() {
    const { setView, view } = useUIStore()
    const { playWarp, initAudio } = useAudioSystem() // Hook
    const [isWarping, setIsWarping] = useState(false)

    const handleEnter = () => {
        initAudio() // Ensure AudioContext is ready on user gesture
        playWarp()  // Play Sound
        setIsWarping(true)
        setTimeout(() => {
            setView('HOME')
        }, 1500)
    }

    if (view !== 'LANDING') return null

    return (
        <div className="absolute inset-0 z-[200] bg-black text-white flex flex-col items-center justify-center overflow-hidden">

            {/* 3D SCENE */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} color="#00E5FF" />
                    <BrainParticles warping={isWarping} />
                    {/* <HolographicHead /> */}
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                    {/* Camera Zoom Effect */}
                    {isWarping && <CameraZoom />}
                </Canvas>
            </div>

            {/* CONTENT (Fade Out on Warp) */}
            <motion.div
                className="relative z-10 flex flex-col items-center text-center space-y-8"
                animate={{ opacity: isWarping ? 0 : 1, scale: isWarping ? 2 : 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <h2 className="text-primary tracking-[0.5em] text-xs font-bold uppercase mb-2">System Initialized</h2>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-white select-none">
                        <GlitchText text="BIKASH AI" />
                    </h1>
                </motion.div>

                <motion.button
                    onClick={handleEnter}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05, textShadow: "0 0 20px #00E5FF" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ delay: 1.5, type: "spring" }}
                    className="group relative px-8 py-4 bg-transparent border border-primary/50 text-primary font-bold tracking-[0.2em] uppercase overflow-hidden cursor-pointer"
                >
                    <span className="relative z-10">See Through My Brain</span>
                    <div className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    <div className="absolute inset-0 border border-primary/50 blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
                </motion.button>
            </motion.div>

            {/* FOOTER */}
            <motion.div
                animate={{ opacity: isWarping ? 0 : 0.5 }}
                className="absolute bottom-10 text-[10px] tracking-widest text-white/40"
            >
                EST. 2025 // NEURAL INTERFACE V1.0
            </motion.div>
        </div>
    )
}

function CameraZoom() {
    useFrame((state) => {
        state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 0, 0.05)
    })
    return null
}

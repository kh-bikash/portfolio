"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Html, Float, PresentationControls } from "@react-three/drei"
import * as THREE from "three"
import { motion } from "framer-motion"

// Simplified Phone Model (Just a shiny box with rounded corners for now if no GLTF)
function DeviceFrame({ children }: { children: React.ReactNode }) {
    const group = useRef<THREE.Group>(null)

    // Floating animation
    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        if (group.current) {
            group.current.rotation.x = Math.cos(t / 4) / 8
            group.current.rotation.y = Math.sin(t / 4) / 8
            group.current.position.y = (1 + Math.sin(t / 1.5)) / 10
        }
    })

    return (
        <group ref={group}>
            {/* FRAME BODY */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[3.2, 6.5, 0.3]} />
                <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* SCREEN AREA */}
            <mesh position={[0, 0, 0.16]}>
                <planeGeometry args={[3, 6.3]} />
                <meshBasicMaterial color="black" />
            </mesh>

            {/* NOTCH / CAMERA */}
            <mesh position={[0, 3, 0.17]}>
                <capsuleGeometry args={[0.1, 0.4, 4, 8]} />
                <meshBasicMaterial color="#000" />
                <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <capsuleGeometry args={[0.1, 0.4, 4, 8]} />
                </mesh>
            </mesh>

            {/* HTML CONTENT INSIDE */}
            <Html
                transform
                position={[0, 0, 0.17]}
                occlude
                style={{ width: '300px', height: '630px', background: 'transparent' }}
            >
                <div className="w-full h-full overflow-hidden rounded-[20px] bg-black text-white relative group">
                    {children}
                    {/* Glossy Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-50 rounded-[20px]" />
                </div>
            </Html>
        </group>
    )
}

export function HolographicProjector({ image, title }: { image: string, title?: string }) {
    return (
        <div className="w-full h-[600px] relative">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00E5FF" />

                <PresentationControls global rotation={[0, 0.3, 0]} polar={[-0.4, 0.2]} azimuth={[-1, 1]} snap>
                    <Float rotationIntensity={0.4}>
                        <DeviceFrame>
                            <div className="w-full h-full flex flex-col">
                                {/* MOCK APP UI */}
                                <div className="h-12 bg-zinc-900 flex items-center justify-between px-4 border-b border-white/10">
                                    <span className="text-[10px] font-bold">9:41</span>
                                    <div className="flex gap-1">
                                        <div className="w-3 h-3 bg-white rounded-full opacity-20" />
                                        <div className="w-3 h-3 bg-white rounded-full opacity-20" />
                                    </div>
                                </div>
                                <div className="flex-1 relative overflow-hidden bg-zinc-950">
                                    <img src={image} alt="App Screen" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black to-transparent">
                                        <h3 className="text-xl font-bold">{title || "Mobile App"}</h3>
                                        <button className="mt-2 px-4 py-2 bg-primary text-black text-xs font-bold rounded-full w-full">
                                            OPEN APP
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </DeviceFrame>
                    </Float>
                </PresentationControls>
            </Canvas>

            {/* PROJECTOR BASE EFFECT */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        </div>
    )
}

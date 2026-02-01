"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Center, Float, Html, Text, Environment, ContactShadows } from "@react-three/drei"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import * as THREE from "three"

function Monitor({ position, rotation, specs }: any) {
    const [hovered, setHovered] = useState(false)
    return (
        <group position={position} rotation={rotation}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {/* Screen */}
            <mesh>
                <boxGeometry args={[1.6, 0.9, 0.05]} />
                <meshStandardMaterial color={hovered ? "#00E5FF" : "#111"} emissive={hovered ? "#00E5FF" : "#000"} emissiveIntensity={0.5} />
            </mesh>
            {/* Stand */}
            <mesh position={[0, -0.5, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 0.6]} />
                <meshStandardMaterial color="#333" />
            </mesh>
            <mesh position={[0, -0.8, 0]}>
                <boxGeometry args={[0.4, 0.05, 0.4]} />
                <meshStandardMaterial color="#333" />
            </mesh>

            {hovered && (
                <Html position={[0, 1, 0]} center distanceFactor={6}>
                    <div className="bg-black/80 border border-primary/50 p-2 rounded backdrop-blur-md text-xs font-mono text-primary w-32 text-center pointer-events-none">
                        {specs}
                    </div>
                </Html>
            )}
        </group>
    )
}

function PCTower({ position }: any) {
    const [hovered, setHovered] = useState(false)
    // RGB Pulse
    useFrame((state) => {
        // Animation logic could go here
    })

    return (
        <group position={position}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <mesh>
                <boxGeometry args={[0.5, 1.2, 1.2]} />
                <meshStandardMaterial color="#050505" roughness={0.2} metalness={0.8} />
            </mesh>
            {/* Glass Panel */}
            <mesh position={[0.26, 0, 0]}>
                <planeGeometry args={[0.1, 1]} />
                <meshBasicMaterial color="#00E5FF" transparent opacity={0.2} side={THREE.DoubleSide} />
            </mesh>
            {/* RGB Strip inside */}
            <mesh position={[0, 0, 0.5]}>
                <boxGeometry args={[0.4, 1, 0.05]} />
                <meshStandardMaterial color="#ff0055" emissive="#ff0055" emissiveIntensity={2} />
            </mesh>

            {hovered && (
                <Html position={[0, 1.5, 0]} center distanceFactor={8}>
                    <div className="bg-black/80 border border-primary/50 p-2 rounded backdrop-blur-md text-xs font-mono text-primary w-40 text-center pointer-events-none">
                        RYZEN 9 7950X<br />RTX 4090<br />64GB DDR5
                    </div>
                </Html>
            )}
        </group>
    )
}

function KeyboardMouse({ position }: any) {
    return (
        <group position={position}>
            {/* Keyboard */}
            <mesh position={[-0.3, 0, 0.2]}>
                <boxGeometry args={[1, 0.05, 0.4]} />
                <meshStandardMaterial color="#222" />
            </mesh>
            {/* Mouse */}
            <mesh position={[0.5, 0, 0.2]}>
                <capsuleGeometry args={[0.08, 0.1, 4, 8]} />
                <meshStandardMaterial color="#222" />
                <mesh position={[0, 0.05, -0.05]}>
                    <boxGeometry args={[0.02, 0.02, 0.05]} />
                    <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" />
                </mesh>
            </mesh>
            {/* Desk Mat */}
            <mesh position={[0, -0.04, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[2, 0.8]} />
                <meshStandardMaterial color="#111" />
            </mesh>
        </group>
    )
}

export function HardwareDesk() {
    return (
        <div className="w-full h-full min-h-[500px] relative">
            <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Environment preset="city" />

                <Center>
                    <Float rotationIntensity={0.2} floatIntensity={0.5}>
                        {/* Desk Surface */}
                        <mesh position={[0, -1, 0]}>
                            <boxGeometry args={[4, 0.1, 2]} />
                            <meshStandardMaterial color="#080808" roughness={0.5} metalness={0.5} />
                        </mesh>

                        {/* Setup */}
                        <Monitor position={[0, 0, -0.5]} rotation={[0, 0, 0]} specs="32' 4K 144Hz Main" />
                        <Monitor position={[-1.7, 0, -0.2]} rotation={[0, 0.3, 0]} specs="27' Vertical Code" />
                        <PCTower position={[1.5, -0.4, 0]} />
                        <KeyboardMouse position={[0, -0.9, 0.3]} />
                    </Float>
                </Center>

                <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
            </Canvas>

            <div className="absolute bottom-4 left-0 w-full text-center pointer-events-none">
                <h2 className="text-primary text-xs font-bold tracking-[0.5em]">HARDWARE_MANIFEST</h2>
                <p className="text-white/50 text-[10px]">HOVER FOR SPECS</p>
            </div>
        </div>
    )
}

"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Line, Float, OrbitControls } from "@react-three/drei"
import { useMemo, useRef, useState } from "react"
import * as THREE from "three"
import { motion } from "framer-motion"

const SKILLS = [
    "React", "Next.js", "TypeScript", "Three.js", "Node.js",
    "Python", "GLSL", "Solidity", "Tailwind", "Framer Motion",
    "PostgreSQL", "GraphQL", "Docker", "AWS", "PyTorch"
]

function SkillNode({ position, label }: { position: [number, number, number], label: string }) {
    const [hovered, setHovered] = useState(false)

    return (
        <group position={position}>
            <mesh
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <sphereGeometry args={[hovered ? 0.3 : 0.15, 16, 16]} />
                <meshStandardMaterial
                    color={hovered ? "#06b6d4" : "#a1a1aa"}
                    emissive={hovered ? "#06b6d4" : "#000000"}
                    emissiveIntensity={hovered ? 2 : 0}
                    toneMapped={false}
                />
            </mesh>
            <Text
                position={[0, hovered ? 0.5 : 0.3, 0]}
                fontSize={hovered ? 0.4 : 0.25}
                color={hovered ? "#06b6d4" : "#52525b"}
                anchorX="center"
                anchorY="bottom"
            >
                {label}
            </Text>
        </group>
    )
}

function Constellation() {
    // Generate random positions for skills
    const skillsData = useMemo(() => {
        return SKILLS.map((skill) => ({
            label: skill,
            position: [
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 4
            ] as [number, number, number]
        }))
    }, [])

    // Create connections (lines) between close nodes
    const connections = useMemo(() => {
        const lines = []
        for (let i = 0; i < skillsData.length; i++) {
            for (let j = i + 1; j < skillsData.length; j++) {
                const dist = new THREE.Vector3(...skillsData[i].position).distanceTo(new THREE.Vector3(...skillsData[j].position))
                if (dist < 4) { // Connect if close enough
                    lines.push([skillsData[i].position, skillsData[j].position])
                }
            }
        }
        return lines
    }, [skillsData])

    return (
        <group>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {skillsData.map((s, i) => (
                    <SkillNode key={i} position={s.position} label={s.label} />
                ))}

                {connections.map((line, i) => (
                    <Line
                        key={i}
                        points={line}
                        color="#e4e4e7"
                        transparent
                        opacity={0.3}
                        lineWidth={1}
                    />
                ))}
            </Float>
        </group>
    )
}

// Auto-rotation component to replace OrbitControls
function AutoRotate() {
    useFrame((state) => {
        state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 8
        state.camera.position.z = Math.cos(state.clock.elapsedTime * 0.1) * 8
        state.camera.lookAt(0, 0, 0)
    })
    return null
}

export function SkillsConstellation() {
    return (
        <section id="skills" className="relative w-full h-[80vh] bg-zinc-50 overflow-hidden border-t border-zinc-200">

            <div className="absolute top-12 left-0 w-full text-center z-20 pointer-events-none">
                <h2 className="text-sm font-bold tracking-[0.3em] text-cyan-600 uppercase mb-4">The Network</h2>
                <p className="text-4xl font-light text-zinc-400">Knowledge <span className="text-zinc-800 font-medium">Graph</span></p>
            </div>

            <div className="absolute inset-0 z-10">
                <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={1} gl={{ powerPreference: "high-performance" }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <Constellation />
                    <AutoRotate />
                </Canvas>
            </div>

            {/* Fade gradient at bottom */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-zinc-50 to-transparent z-20 pointer-events-none" />

        </section>
    )
}

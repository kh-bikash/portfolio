"use client"

import { useRef, useState, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Float } from "@react-three/drei"
import * as THREE from "three"
import { useBiomeStore } from "@/lib/biome-store"
import { motion } from "framer-motion-3d"

// Data: Skills mapped to "Elements"
const ELEMENTS = [
    { symbol: "Rc", name: "React", category: "frontend", mass: 16.04 },
    { symbol: "Nx", name: "Next.js", category: "frontend", mass: 14.01 },
    { symbol: "Ts", name: "TypeScript", category: "lang", mass: 28.09 },
    { symbol: "3js", name: "Three.js", category: "webgl", mass: 32.06 },
    { symbol: "Nd", name: "Node.js", category: "backend", mass: 12.01 },
    { symbol: "Py", name: "Python", category: "lang", mass: 19.00 },
    { symbol: "Gl", name: "GLSL", category: "webgl", mass: 39.95 },
    { symbol: "Sl", name: "Solidity", category: "web3", mass: 20.18 },
    { symbol: "Tw", name: "Tailwind", category: "css", mass: 10.81 },
    { symbol: "Fr", name: "Framer", category: "animation", mass: 55.85 },
    { symbol: "Pg", name: "Postgres", category: "db", mass: 35.45 },
    { symbol: "Aw", name: "AWS", category: "cloud", mass: 40.08 },
    { symbol: "Dk", name: "Docker", category: "devops", mass: 4.00 },
    { symbol: "Ql", name: "GraphQL", category: "api", mass: 47.87 },
    { symbol: "Pt", name: "PyTorch", category: "ai", mass: 58.93 },
]

function AtomTile({ position, rotation, data, index }: any) {
    const { colors } = useBiomeStore()
    const [hovered, setHovered] = useState(false)
    const mesh = useRef<THREE.Group>(null)

    // Smooth hover animation logic would go here, utilizing Framer Motion or springs
    // For now, simpler direct reactivity

    return (
        <group position={position} rotation={rotation}>
            <motion.group
                animate={{
                    z: hovered ? 0.5 : 0,
                    rotateX: hovered ? -0.2 : 0,
                    scale: hovered ? 1.1 : 1
                }}
                transition={{ duration: 0.2 }}
            >
                {/* Glass Plate */}
                <mesh
                    onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
                    onPointerOut={() => setHovered(false)}
                >
                    <boxGeometry args={[1.4, 1.4, 0.1]} />
                    {/* High-end Physical Glass Material */}
                    <meshPhysicalMaterial
                        color={hovered ? colors.accent : "#ffffff"}
                        transmission={0.9} // Glass-like
                        opacity={1}
                        metalness={0.1}
                        roughness={0.15}
                        thickness={0.5} // Refraction
                        envMapIntensity={2}
                        clearcoat={1}
                    />
                </mesh>

                {/* Glowing Edge/Border */}
                <mesh position={[0, 0, 0.06]}>
                    <ringGeometry args={[0.65, 0.7, 4]} />
                    <meshBasicMaterial color={hovered ? colors.accent : "#ffffff"} opacity={0.3} transparent />
                </mesh>

                {/* Content */}
                <group position={[0, 0, 0.06]}>
                    {/* Atomic Symbol */}
                    <Text
                        position={[-0.3, 0.2, 0]}
                        fontSize={0.5}
                        font="/fonts/Inter-Bold.woff" // Assuming font exists or fallback
                        color={hovered ? "#000000" : "#ffffff"}
                        anchorX="center"
                        anchorY="middle"
                    >
                        {data.symbol}
                    </Text>
                    {/* Mass Number */}
                    <Text
                        position={[0.4, 0.4, 0]}
                        fontSize={0.15}
                        color={hovered ? "#000000" : "rgba(255,255,255,0.6)"}
                    >
                        {data.mass}
                    </Text>
                    {/* Full Name */}
                    <Text
                        position={[0, -0.4, 0]}
                        fontSize={0.18}
                        color={hovered ? "#000000" : "#ffffff"}
                    >
                        {data.name}
                    </Text>
                </group>
            </motion.group>
        </group>
    )
}

function CurvedGrid() {
    const radius = 8
    const cols = 5
    // Calculate positions on a cylinder segment

    // Center logic
    const tileWidth = 1.6
    const tileHeight = 1.6

    const tiles = useMemo(() => {
        return ELEMENTS.map((el, i) => {
            const col = i % cols
            const row = Math.floor(i / cols)

            // Cylindrical coordinates
            // Angle range: -40deg to +40deg
            const angleStep = 0.2 // Radians
            const angleOffset = -((cols - 1) * angleStep) / 2
            const angle = angleOffset + col * angleStep

            const x = Math.sin(angle) * radius
            const z = Math.cos(angle) * radius - radius // Pull it back to center roughly
            const y = -(row * tileHeight) + 1.5 // Start higher

            const rotY = -angle // Face center

            return {
                data: el,
                position: [x, y, z] as [number, number, number],
                rotation: [0, rotY, 0] as [number, number, number]
            }
        })
    }, [])

    return (
        <group>
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
                {tiles.map((tile, i) => (
                    <AtomTile
                        key={i}
                        position={tile.position}
                        rotation={tile.rotation}
                        data={tile.data}
                        index={i}
                    />
                ))}
            </Float>
        </group>
    )
}

function MouseLight() {
    const light = useRef<THREE.PointLight>(null)
    useFrame(({ mouse, viewport }) => {
        if (!light.current) return
        const x = (mouse.x * viewport.width) / 2
        const y = (mouse.y * viewport.height) / 2
        light.current.position.set(x, y, 2)
    })
    return <pointLight ref={light} distance={6} intensity={2} color="white" decay={2} />
}

export function TechTable() {
    const { colors } = useBiomeStore()

    return (
        <section id="skills" className="relative w-full h-[80vh] bg-zinc-950 overflow-hidden border-t border-white/5">

            {/* Header Overlay */}
            <div className="absolute top-12 left-0 w-full text-center z-20 pointer-events-none mix-blend-difference text-white">
                <h2 className="text-sm font-bold tracking-[0.3em] uppercase mb-4 opacity-50">Discovery Protocol</h2>
                <p className="text-4xl font-light">Elemental <span className="font-medium">Mastery</span></p>
            </div>

            <div className="absolute inset-0 z-10 cursor-crosshair">
                <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]}>
                    <color attach="background" args={[colors.background]} />
                    <fog attach="fog" args={[colors.background, 5, 20]} />

                    {/* Lighting Environment */}
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color={colors.lightA} />
                    <pointLight position={[-10, -10, -10]} intensity={1} color={colors.lightB} />

                    {/* Interactive Mouse Light for "Flashlight" effect on glass */}
                    <MouseLight />

                    <CurvedGrid />
                </Canvas>
            </div>

            {/* Vignette */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-80 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 0%, black 100%)' }} />
        </section>
    )
}

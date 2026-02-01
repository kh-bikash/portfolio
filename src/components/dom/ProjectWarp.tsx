"use client"

import { useRef, useState, useEffect, Suspense } from "react"
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber"
import { Text, Image, Float, RoundedBox, useCursor } from "@react-three/drei"
import * as THREE from "three"
import { motion, AnimatePresence } from "framer-motion"

// Real Project Data with Found Images
const PROJECTS = [
    {
        id: 1,
        title: "NEURAL VISUALIZER",
        type: "AI PLATFORM",
        description: "Real-time node graph analysis tool.",
        image: "/dark-ai-neural-network-visualization-platform.jpg"
    },
    {
        id: 2,
        title: "QUANTUM INTERFACE",
        type: "WEB APP",
        description: "Next-gen computing dashboard.",
        image: "/dark-futuristic-web-interface-quantum-computing.jpg"
    },
    {
        id: 3,
        title: "CYBERPUNK HUD",
        type: "GAME UI",
        description: "Immersive gaming overlay system.",
        image: "/dark-cyberpunk-game-interface.jpg"
    },
    {
        id: 4,
        title: "SPACE ANALYTICS",
        type: "DASHBOARD",
        description: "Orbital data tracking suite.",
        image: "/dark-space-themed-analytics-dashboard.jpg"
    },
]

const CardFallback = ({ position }: { position: [number, number, number] }) => (
    <mesh position={position}>
        <boxGeometry args={[3.2, 4.2, 0.1]} />
        <meshBasicMaterial color="#333" wireframe />
    </mesh>
)

function Card({ project, position, index }: { project: any, position: [number, number, number], index: number }) {
    const group = useRef<THREE.Group>(null)
    const [hovered, setHover] = useState(false)
    const texture = useLoader(THREE.TextureLoader, project.image) as THREE.Texture // This suspends
    useCursor(hovered)

    // Animation Logic
    useFrame((state, delta) => {
        if (!group.current) return
        const targetScale = hovered ? 1.1 : 1
        const targetY = position[1] + (hovered ? 0.5 : 0)
        const targetRotY = hovered ? 0.2 : 0

        group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, targetScale, delta * 10))
        group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, delta * 10)
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotY, delta * 10)
    })

    return (
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
            <group
                ref={group}
                position={position}
                onClick={() => console.log("Clicked", project.title)}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                {/* 1. Glass Frame / Bezel */}
                <RoundedBox args={[3.2, 4.2, 0.1]} radius={0.1} smoothness={4}>
                    <meshPhysicalMaterial
                        color={hovered ? "#00ffff" : "#1a1a1a"}
                        metalness={0.8}
                        roughness={0.2}
                        transparent
                        opacity={0.8}
                        clearcoat={1}
                    />
                </RoundedBox>

                {/* 2. The Image (Screen) */}
                <group position={[0, 0, 0.06]}>
                    <mesh>
                        <planeGeometry args={[3, 2]} />
                        <meshBasicMaterial map={texture} />
                    </mesh>
                    {/* Scanline Overlay */}
                    <mesh position={[0, 0, 0.01]}>
                        <planeGeometry args={[3, 2]} />
                        <meshBasicMaterial color="black" transparent opacity={0.2} wireframe={true} wireframeLinewidth={1} />
                    </mesh>
                </group>

                {/* 3. Text Panel */}
                <group position={[0, -1.2, 0.1]}>
                    <Text
                        position={[0, 0.3, 0]}
                        fontSize={0.22}
                        color="white"
                        font="https://fonts.gstatic.com/s/saira/v13/GwWJOgyq1QoV-w5o_w.woff" // Techno font
                        anchorX="center"
                        anchorY="middle"
                    >
                        {project.title}
                    </Text>
                    <Text
                        position={[0, 0, 0]}
                        fontSize={0.12}
                        color="#888"
                        anchorX="center"
                        anchorY="middle"
                    >
                        {project.type} // {project.description}
                    </Text>
                </group>

                {/* 4. Glow Effect Behind */}
                <mesh position={[0, 0, -0.2]}>
                    <planeGeometry args={[3.5, 4.5]} />
                    <meshBasicMaterial color="#00ffff" transparent opacity={hovered ? 0.3 : 0} />
                </mesh>

            </group>
        </Float>
    )
}

export function ProjectWarp({ active, onClose }: { active: boolean, onClose: () => void }) {
    if (!active) return null

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md"
        >
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                <ambientLight intensity={1} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, 10, 10]} intensity={0.5} />

                <group position={[0, -0.5, 0]}>
                    {PROJECTS.map((p, i) => (
                        <Suspense key={p.id} fallback={<CardFallback position={[(i - 1.5) * 3.5, 0, 0]} />}>
                            <Card
                                project={p}
                                index={i}
                                position={[(i - 1.5) * 3.5, 0, 0]}
                            />
                        </Suspense>
                    ))}
                </group>
            </Canvas>

            {/* Close Button */}
            <div className="absolute top-8 right-8">
                <button
                    onClick={onClose}
                    className="group relative px-6 py-2 bg-transparent overflow-hidden rounded-full border border-white/20 hover:border-cyan-500 transition-colors"
                >
                    <span className="relative z-10 text-xs font-bold tracking-[0.2em] text-white group-hover:text-cyan-400">CLOSE SYSTEM</span>
                    <div className="absolute inset-0 bg-cyan-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </button>
            </div>

            <div className="absolute bottom-8 left-8 pointer-events-none">
                <h2 className="text-4xl text-white font-black tracking-tighter opacity-20">SELECTED WORKS</h2>
            </div>
        </motion.div>
    )
}

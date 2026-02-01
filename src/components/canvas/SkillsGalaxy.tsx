"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Float, OrbitControls, Stars, Line } from "@react-three/drei"
import * as THREE from "three"
import { useUIStore } from "@/store/useUIStore"

const SKILLS = [
    { name: "React", group: "Frontend", color: "#61dafb" },
    { name: "Next.js", group: "Frontend", color: "#ffffff" },
    { name: "TypeScript", group: "Lang", color: "#3178c6" },
    { name: "Node.js", group: "Backend", color: "#339933" },
    { name: "Python", group: "Lang", color: "#3776ab" },
    { name: "PyTorch", group: "AI", color: "#ee4c2c" },
    { name: "TensorFlow", group: "AI", color: "#ff6f00" },
    { name: "Three.js", group: "Creative", color: "#ffffff" },
    { name: "WebGL", group: "Creative", color: "#990000" },
    { name: "Tailwind", group: "Design", color: "#38b2ac" },
    { name: "PostgreSQL", group: "Backend", color: "#336791" },
    { name: "Docker", group: "DevOps", color: "#2496ed" },
    { name: "AWS", group: "DevOps", color: "#ff9900" },
    { name: "GraphQL", group: "Backend", color: "#e10098" },
    { name: "Rust", group: "Lang", color: "#dea584" },
]

function SkillNode({ position, name, color }: { position: [number, number, number], name: string, color: string }) {
    const ref = useRef<THREE.Group>(null)
    const [hovered, setHover] = useMemo(() => [false, () => { }], []) // Simplified for now

    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2
        }
    })

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <group ref={ref} position={position}>
                {/* Glowing Sphere */}
                <mesh>
                    <sphereGeometry args={[0.2, 32, 32]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
                </mesh>
                {/* Text Label */}
                <Text
                    position={[0, 0.4, 0]}
                    fontSize={0.3}
                    font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0Pn5.ttf" // Use a standard font url or local
                    color={color}
                    anchorX="center"
                    anchorY="middle"
                >
                    {name}
                </Text>
            </group>
        </Float>
    )
}

function Connections({ points }: { points: [number, number, number][] }) {
    // Determine connections (Naive: Connect if close)
    const lines = useMemo(() => {
        const l: [number, number, number][][] = []
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const dist = new THREE.Vector3(...points[i]).distanceTo(new THREE.Vector3(...points[j]))
                if (dist < 4) {
                    l.push([points[i], points[j]])
                }
            }
        }
        return l
    }, [points])

    return (
        <group>
            {lines.map((line, i) => (
                <Line
                    key={i}
                    points={line}
                    color="rgba(0, 255, 255, 0.1)"
                    lineWidth={1}
                    transparent
                    opacity={0.1}
                />
            ))}
        </group>
    )
}

export function SkillsGalaxy() {
    const { setView } = useUIStore()

    // Generate Random Positions using Spherical Distribution
    const nodes = useMemo(() => {
        return SKILLS.map((skill) => {
            const phi = Math.acos(-1 + (2 * Math.random()));
            const theta = Math.sqrt(Math.PI * 15) * phi;
            const r = 5 + Math.random() * 2;

            return {
                ...skill,
                pos: [
                    r * Math.cos(theta) * Math.sin(phi),
                    r * Math.sin(theta) * Math.sin(phi),
                    r * Math.cos(phi)
                ] as [number, number, number]
            }
        })
    }, [])

    return (
        <div className="absolute inset-0 z-20 animate-in fade-in duration-1000">
            {/* BACK BUTTON */}
            <button
                onClick={() => setView('HOME')}
                className="absolute top-8 left-8 z-50 text-primary border border-primary/50 px-6 py-2 text-xs hover:bg-primary/20 transition-all uppercase tracking-widest"
            >
                ← Return to Tunnel
            </button>

            <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                {/* Controls */}
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />

                {/* Content */}
                <group>
                    {nodes.map((node, i) => (
                        <SkillNode key={i} position={node.pos} name={node.name} color={node.color} />
                    ))}
                    <Connections points={nodes.map(n => n.pos)} />
                </group>

                {/* R3F Environment */}
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            </Canvas>
        </div>
    )
}

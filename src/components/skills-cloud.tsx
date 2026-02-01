"use client"

import { useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Float, Line, OrbitControls, Stars } from "@react-three/drei"
import * as THREE from "three"
import { useUIStore } from "@/store/useUIStore"

const SKILLS = [
    { name: "REACT", color: "#61DBFB" },
    { name: "NEXT.JS", color: "#FFFFFF" },
    { name: "TYPESCRIPT", color: "#3178C6" },
    { name: "THREE.JS", color: "#FFFFFF" },
    { name: "NODE.JS", color: "#339933" },
    { name: "PYTHON", color: "#3776AB" },
    { name: "WEBGL", color: "#990000" },
    { name: "TAILWIND", color: "#06B6D4" },
    { name: "AWS", color: "#FF9900" },
    { name: "DOCKER", color: "#2496ED" },
    { name: "FIGMA", color: "#F24E1E" },
    { name: "AI/ML", color: "#FF00FF" },
    { name: "GRAPHQL", color: "#E10098" },
    { name: "PRISMA", color: "#2D3748" },
    { name: "RUST", color: "#DEA584" },
    { name: "GO", color: "#00ADD8" },
    { name: "KUBERNETES", color: "#326CE5" },
    { name: "CI/CD", color: "#4B5563" },
    { name: "POSTGRES", color: "#336791" },
    { name: "MONGODB", color: "#47A248" }
]

function SkillNode({ position, text, color }: { position: [number, number, number], text: string, color: string }) {
    const [hovered, setHovered] = useState(false)
    const ref = useRef<THREE.Group>(null)

    useFrame(({ clock }) => {
        if (!ref.current) return
        if (hovered) {
            ref.current.scale.lerp(new THREE.Vector3(1.5, 1.5, 1.5), 0.1)
        } else {
            ref.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
        }
        ref.current.lookAt(0, 0, 10) // Always face camera
    })

    return (
        <group ref={ref} position={position}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Text
                    color={hovered ? "#00E5FF" : color}
                    fontSize={0.4}
                    font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0Pn5qRS8.woff2"
                    anchorX="center"
                    anchorY="middle"
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    outlineWidth={0.02}
                    outlineColor="#000000"
                >
                    {text}
                </Text>
            </Float>
        </group>
    )
}

function Constellation({ points }: { points: [number, number, number][] }) {
    // Determine connections based on distance
    const lines = useMemo(() => {
        const connections: [THREE.Vector3, THREE.Vector3][] = []
        points.forEach((p1, i) => {
            points.forEach((p2, j) => {
                if (i >= j) return // Avoid duplicates
                const v1 = new THREE.Vector3(...p1)
                const v2 = new THREE.Vector3(...p2)
                if (v1.distanceTo(v2) < 4) { // Connect if close
                    connections.push([v1, v2])
                }
            })
        })
        return connections
    }, [points])

    return (
        <group>
            {lines.map((line, i) => (
                <Line
                    key={i}
                    points={line}
                    color="#00E5FF"
                    transparent
                    opacity={0.15}
                    lineWidth={1}
                />
            ))}
        </group>
    )
}

function Cloud() {
    // Fibonacci Sphere Distribution
    const points = useMemo(() => {
        const p: [number, number, number][] = []
        const phi = Math.PI * (3 - Math.sqrt(5))
        const n = SKILLS.length
        const radius = 6

        for (let i = 0; i < n; i++) {
            const y = 1 - (i / (n - 1)) * 2
            const r = Math.sqrt(1 - y * y) * radius
            const theta = phi * i

            const x = Math.cos(theta) * r
            const z = Math.sin(theta) * r
            p.push([x, y * radius, z])
        }
        return p
    }, [])

    const groupRef = useRef<THREE.Group>(null)

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.05
        }
    })

    return (
        <group ref={groupRef}>
            {points.map((pos, i) => (
                <SkillNode key={i} position={pos} text={SKILLS[i].name} color={SKILLS[i].color} />
            ))}
            <Constellation points={points} />
        </group>
    )
}

export function SkillsCloud() {
    return (
        <div className="absolute inset-0 z-10 w-full h-full">
            <Canvas camera={{ position: [0, 0, 14], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Cloud />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    )
}

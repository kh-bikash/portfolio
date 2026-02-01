"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Physics, useSphere, usePlane } from "@react-three/cannon"
import { Text, Float } from "@react-three/drei"
import { useMemo, useState } from "react"
import * as THREE from "three"

// SKILL DATA
const SKILLS = [
    "React", "Next.js", "TypeScript", "Node.js", "Three.js", "WebGL", "Framer", "Tailwind", "Python", "AI/ML", "Design", "UI/UX", "Vercel", "Git"
]

function SkillBall({ word }: { word: string }) {
    const [ref, api] = useSphere(() => ({
        mass: 1,
        position: [(Math.random() - 0.5) * 4, 10 + Math.random() * 5, (Math.random() - 0.5) * 4],
        args: [0.8],
        restitution: 0.8, // Bouncy
    }))

    const [hovered, setHover] = useState(false)

    return (
        <mesh
            ref={ref as any}
            onPointerOver={() => { setHover(true); document.body.style.cursor = 'pointer' }}
            onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto' }}
            onClick={() => api.velocity.set(0, 5, 0)} // Jump on click
        >
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshStandardMaterial
                color={hovered ? "#2563eb" : "#ffffff"}
                emissive={hovered ? "#2563eb" : "#000000"}
                roughness={0.2}
                metalness={0.1}
            />

            <group position={[0, 0, 0.9]}>
                <Text
                    fontSize={0.25}
                    color={hovered ? "white" : "black"}
                    anchorX="center"
                    anchorY="middle"
                    font="https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2"
                >
                    {word}
                </Text>
            </group>
        </mesh>
    )
}

function Ground() {
    usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, -4, 0] }))
    return (
        <mesh position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial transparent opacity={0} /> {/* Invisible floor */}
        </mesh>
    )
}

function Walls() {
    usePlane(() => ({ position: [0, 0, -5], rotation: [0, 0, 0] })) // Back
    usePlane(() => ({ position: [0, 0, 5], rotation: [0, -Math.PI, 0] })) // Front
    usePlane(() => ({ position: [-5, 0, 0], rotation: [0, Math.PI / 2, 0] })) // Left
    usePlane(() => ({ position: [5, 0, 0], rotation: [0, -Math.PI / 2, 0] })) // Right
    return null
}

export function SkillOrchestra() {
    return (
        <section className="w-full h-screen bg-zinc-50 flex flex-col md:flex-row items-center border-t border-zinc-200">

            {/* TEXT SIDE */}
            <div className="w-full md:w-1/3 p-12 md:p-20 z-10 pointer-events-none">
                <h2 className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">The Toolkit</h2>
                <h3 className="text-5xl font-light text-foreground mb-6">
                    My <br /> Orchestral <br /> <span className="font-serif italic font-medium">Instruments</span>
                </h3>
                <p className="text-muted-foreground text-sm leading-loose">
                    I don't just use tools; I conduct them. From the physics of rendering to the logic of the backend, every technology interacts to create the final symphony.
                    <br /><br />
                    <span className="text-xs uppercase tracking-widest text-primary/60">Click a sphere to interact.</span>
                </p>
            </div>

            {/* 3D CANNON SIDE */}
            <div className="w-full md:w-2/3 h-full cursor-grab active:cursor-grabbing">
                <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }}>
                    <ambientLight intensity={0.8} />
                    <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={1} castShadow />
                    <Physics gravity={[0, -5, 0]}>
                        <Ground />
                        <Walls />
                        {SKILLS.map((skill, i) => <SkillBall key={i} word={skill} />)}
                    </Physics>
                </Canvas>
            </div>

        </section>
    )
}

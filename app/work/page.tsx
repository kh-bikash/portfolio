"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { Text, Image, Float, RoundedBox, useCursor, ScrollControls, Scroll, useScroll } from "@react-three/drei"
import * as THREE from "three"
import { EffectComposer, Bloom, Noise, ChromaticAberration, Vignette } from "@react-three/postprocessing"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { PROJECTS } from "@/lib/project-data"

function WorkCard({ project, index, position }: { project: any, index: number, position: [number, number, number] }) {
    const group = useRef<THREE.Group>(null)
    const [hovered, setHover] = useState(false)
    // Image loader removed as requested
    useCursor(hovered)
    const router = useRouter()

    useFrame((state, delta) => {
        if (!group.current) return

        // Hover Scale - subtle tilt
        const targetScale = hovered ? 1.05 : 1
        group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, targetScale, delta * 8))

        // Tilt effect
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, hovered ? 0.1 : 0, delta * 4)
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, hovered ? 0.1 : 0, delta * 4)
    })

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.05} floatIntensity={0.2}>
                <group
                    ref={group}
                    onPointerOver={() => setHover(true)}
                    onPointerOut={() => setHover(false)}
                    onClick={() => router.push(`/work/${project.id}`)}
                >
                    {/* 1. Credit Card Body */}
                    <RoundedBox args={[5.0, 3.15, 0.08]} radius={0.2} smoothness={4}>
                        <meshPhysicalMaterial
                            color={hovered ? "#111" : "#000"}
                            metalness={0.6}
                            roughness={0.3}
                            clearcoat={1}
                            clearcoatRoughness={0.1}
                            reflectivity={0.5}
                        />
                    </RoundedBox>

                    {/* 2. EMV Chip (Silver/Platinum) */}
                    <mesh position={[-2.0, 0.5, 0.05]}>
                        <planeGeometry args={[0.7, 0.5]} />
                        <meshStandardMaterial
                            color="#e0e0e0"
                            metalness={1}
                            roughness={0.2}
                        />
                    </mesh>

                    {/* 3. Text - Typography Focused */}
                    <group position={[0, -0.2, 0.06]}>
                        {/* Type/Category (Top Right) */}
                        <Text
                            position={[2.2, 1.2, 0]}
                            fontSize={0.15}
                            color="#666"
                            anchorX="right"
                            anchorY="top"
                            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                        >
                            {project.type}
                        </Text>

                        {/* Title (Center-Left, Large) */}
                        <Text
                            position={[-2.1, 0, 0]}
                            fontSize={0.45}
                            maxWidth={4.5}
                            lineHeight={1}
                            color={hovered ? "white" : "#ddd"}
                            anchorX="left"
                            anchorY="middle"
                            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                            fontWeight="800"
                        >
                            {project.title}
                        </Text>

                        {/* Footer Info */}
                        <Text
                            position={[-2.1, -1.1, 0]}
                            fontSize={0.12}
                            color="#444"
                            anchorX="left"
                            anchorY="bottom"
                            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                        >
                            **** **** **** {1000 + index}
                        </Text>

                        <Text
                            position={[2.2, -1.1, 0]}
                            fontSize={0.12}
                            color="#444"
                            anchorX="right"
                            anchorY="bottom"
                            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                        >
                            VALID THRU 12/30
                        </Text>
                    </group>
                </group>
            </Float>
        </group>
    )
}

function ExperienceScene() {
    // Dynamic page count based on projects
    const pages = Math.ceil(PROJECTS.length * 0.8)

    return (
        <ScrollControls pages={pages} damping={0.3} style={{ zIndex: 10 }}>
            {/* 3D Content */}
            <Scroll>
                <group position={[0, 0, 0]}>
                    {PROJECTS.map((p, i) => (
                        <Suspense key={p.id} fallback={null}>
                            <WorkCard
                                project={p}
                                index={i}
                                position={[
                                    (i % 2 === 0 ? -2.5 : 2.5),
                                    -i * 5,
                                    0
                                ]}
                            />
                        </Suspense>
                    ))}
                </group>
            </Scroll>

            {/* 
               IMPORTANT: We don't use <Scroll html> here because it might conflict with Lenis.
               Instead, R3F ScrollControls adds a div to the parent.
               However, if Lenis is active on 'root', it expects the body to scroll.
               ScrollControls creates a virtual scroll container.
               
               If user says "cant scroll", it means the virtual scroll isn't catching the events.
            */}
        </ScrollControls>
    )
}

import { useLenis } from "@studio-freight/react-lenis"

export default function WorkPage() {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [muted, setMuted] = useState(false)
    const [hasInteracted, setHasInteracted] = useState(false)

    // Stop global Lenis to allow R3F ScrollControls to handle scrolling
    // This resolves the conflict where wheel events were being hijacked
    const lenis = useLenis()
    useEffect(() => {
        if (lenis) {
            lenis.stop()
            // Make sure we allow the inner div to scroll
            // document.body.style.overflow = 'hidden' // Optional: prevent body scroll if needed, but we used override before
        }
        return () => {
            if (lenis) lenis.start()
        }
    }, [lenis])

    useEffect(() => {
        // Attempt auto-play
        if (audioRef.current) {
            audioRef.current.volume = 0.4
            const playPromise = audioRef.current.play()

            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Auto-play prevented (browser policy). User interaction needed.")
                })
            }
        }
    }, [])

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !audioRef.current.muted
            setMuted(!muted)
        }
    }

    return (
        <main className="w-full h-screen bg-black relative">
            <style jsx global>{`
                /* Disable Lenis on this page by forcing body to not scroll? 
                   Actually ScrollControls needs to capture the scroll.
                   We make the canvas fixed and let ScrollControls handle the DOM.
                */
                body {
                    overflow: visible !important; /* Allow ScrollControls to create height */
                }
            `}</style>
            {/* Audio */}
            <audio
                ref={audioRef}
                src="/downtown-binary-other-world.mp3"
                loop
            />

            <nav className="fixed top-8 left-12 z-50">
                <Link href="/?mode=brain">
                    <button className="text-white font-bold tracking-[0.2em] hover:text-cyan-400 transition-colors">
                        ← RETURN
                    </button>
                </Link>
            </nav>

            {/* Audio Controls */}
            <div className="fixed bottom-8 right-12 z-50">
                <button
                    onClick={toggleMute}
                    className="text-xs font-mono text-zinc-500 hover:text-white transition-colors uppercase tracking-widest"
                >
                    {muted ? "AUDIO [OFF]" : "AUDIO [ON] - DOWNTOWN BINARY"}
                </button>
            </div>

            {/* 3D Scene */}
            <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
                {/* Mood Lighting */}
                <ambientLight intensity={0.4} />
                <spotLight position={[5, 10, 10]} intensity={2} angle={0.5} penumbra={1} color="#ffffff" />
                <pointLight position={[-10, 0, -5]} intensity={1} color="#ffffff" />

                {/* Fog for depth */}
                <fog attach="fog" args={['black', 5, 20]} />

                <ExperienceScene />

                <EffectComposer>
                    {/* Removed Bloom, Noise, ChromaticAberration for clean look */}
                    <Vignette eskil={false} offset={0.1} darkness={0.8} />
                </EffectComposer>
            </Canvas>

            {/* Overlay Title */}
            <div className="fixed top-1/2 left-8 md:left-20 transform -translate-y-1/2 pointer-events-none z-10 mix-blend-difference">
                <h1 className="text-[12vw] leading-none font-black text-white opacity-5 select-none">
                    WORK
                </h1>
            </div>
        </main>
    )
}

"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Sphere, Line, OrbitControls, Environment } from "@react-three/drei"
import * as THREE from "three"

// 1. Data Ring Component
function DataRing({ radius, count, speed, color, tilt }: { radius: number, count: number, speed: number, color: string, tilt: number }) {
    const mesh = useRef<THREE.InstancedMesh>(null)
    const materialRef = useRef<THREE.MeshBasicMaterial>(null)
    const dummy = useMemo(() => new THREE.Object3D(), [])

    // Generate particles
    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2
            const spread = 0.5 // Random spread offset
            const x = Math.cos(angle) * radius + (Math.random() - 0.5) * spread
            const z = Math.sin(angle) * radius + (Math.random() - 0.5) * spread
            const y = (Math.random() - 0.5) * spread * 2
            temp.push({ x, y, z, angle, speed: Math.random() * 0.02 + 0.01 })
        }
        return temp
    }, [radius, count])


    useFrame((state, delta) => {
        if (!mesh.current) return
        const t = state.clock.getElapsedTime()

        // LERP COLOR
        if (materialRef.current) {
            const target = new THREE.Color(color)
            materialRef.current.color.lerp(target, delta * 2)
        }

        particles.forEach((p, i) => {
            // Orbit logic
            const currentAngle = p.angle + t * speed * 0.5

            // Re-calculate position based on new angle
            const x = Math.cos(currentAngle) * radius + (Math.sin(t * 2 + i) * 0.1)
            const z = Math.sin(currentAngle) * radius + (Math.cos(t * 1.5 + i) * 0.1)

            dummy.position.set(x, p.y + Math.sin(t + i) * 0.2, z)

            // Wave scale effect
            const scale = (Math.sin(t * 2 + i * 0.1) + 1.5) * 0.05
            dummy.scale.setScalar(scale)

            dummy.rotation.x += 0.01
            dummy.updateMatrix()
            mesh.current!.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true

        // Tilt the whole ring
        if (mesh.current) {
            mesh.current.rotation.x = tilt
            mesh.current.rotation.z = t * 0.05
        }
    })

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <icosahedronGeometry args={[1, 0]} />
            <meshBasicMaterial ref={materialRef} color={color} toneMapped={false} />
        </instancedMesh>
    )
}

// 2. Central Core
function Core() {
    const ref = useRef<THREE.Group>(null)
    useFrame((state) => {
        if (!ref.current) return
        const t = state.clock.getElapsedTime()
        ref.current.rotation.y = t * 0.2
        ref.current.rotation.x = Math.sin(t * 0.5) * 0.2
    })

    return (
        <group ref={ref}>
            {/* Core Sphere */}
            <Sphere args={[1.5, 32, 32]}>
                <meshStandardMaterial
                    color="#000000"
                    emissive="#4f46e5"
                    emissiveIntensity={2}
                    roughness={0.1}
                    metalness={1}
                    wireframe
                />
            </Sphere>
            {/* Inner Light */}
            <pointLight distance={10} intensity={5} color="#4f46e5" />
        </group>
    )
}

// 3. Grid Floor for context
function GridFloor() {
    return (
        <gridHelper args={[50, 50, 0x303030, 0x101010]} position={[0, -5, 0]} />
    )
}

import { useBiomeStore } from "@/lib/biome-store"
import { CityBuilder } from "./CityBuilder"

function BiomeListener() {
    const { colors } = useBiomeStore()
    const { scene } = useThree()

    // We need refs to the lights to animate them. 
    // However, since we are inside the scene, we can look them up or traverse.
    // Better: Helper object references.

    useFrame((state, delta) => {
        const t = delta * 2 // Transition speed

        // 1. Fog Color
        if (state.scene.fog instanceof THREE.FogExp2) {
            const currentFog = state.scene.fog.color
            const targetFog = new THREE.Color(colors.fog)
            currentFog.lerp(targetFog, t)
        }

        // 2. Background Color (if used)
        // state.scene.background = new THREE.Color(colors.background) // If we want to lerp this too
    })
    return null
}

function Scene() {
    const { colors } = useBiomeStore()
    const ambientRef = useRef<THREE.AmbientLight>(null)
    const coreLightRef = useRef<THREE.PointLight>(null)

    // Color refs for manual lerping
    useFrame((_, delta) => {
        const t = delta * 2

        // Lerp Ambient
        if (ambientRef.current) {
            // Intensity varies by biome?
            // ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, targetIntensity, t)
            // Just color for now if needed, or keeping it neutral
        }

        // Lerp Core Light
        if (coreLightRef.current) {
            const cur = coreLightRef.current.color
            const target = new THREE.Color(colors.lightA)
            cur.lerp(target, t)
        }
    })

    return (
        <>
            <BiomeListener />
            <ambientLight ref={ambientRef} intensity={0.1} />
            <fogExp2 attach="fog" args={[colors.fog, 0.03]} />

            {/* Central Intelligence */}
            <Core />

            <group>
                <pointLight ref={coreLightRef} position={[0, 0, 0]} distance={10} intensity={5} color={colors.lightA} />
            </group>

            {/* Data Rings (Neural Layers) */}
            {/* Pass dynamic colors or let them handle it? Let's pass them or create a smart material wrapper */}
            <SmartDataRing radius={4} count={100} speed={0.2} colorName="lightB" tilt={0.2} />
            <SmartDataRing radius={7} count={150} speed={-0.15} colorName="accent" tilt={-0.1} />
            <SmartDataRing radius={10} count={200} speed={0.1} colorName="lightA" tilt={0.3} />

            {/* Code City (Industrial Biome) */}
            <CityBuilder />
        </>
    )
}

// Wrapper to lerp ring colors
function SmartDataRing({ radius, count, speed, colorName, tilt }: any) {
    const { colors } = useBiomeStore()
    const colorTarget = (colors as any)[colorName]
    // We can't easily lerp properties passed as props to DataRing without re-instantiating.
    // So we'll modify DataRing to accept a ref or handle lerping internally.
    // For now, let's just make DataRing reactive internally.
    return <DataRing radius={radius} count={count} speed={speed} color={colorTarget} tilt={tilt} />
}

export function SystemArchitecture() {
    return (
        <section className="relative w-full h-screen bg-black overflow-hidden">
            <Canvas camera={{ position: [0, 4, 14], fov: 45 }}>
                <Scene />
                <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} autoRotate autoRotateSpeed={0.5} />
            </Canvas>

            {/* Professional Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                <div className="bg-black/20 backdrop-blur-[2px] p-8 rounded-2xl border border-white/5 border-t-white/10 shadow-2xl">
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-2 text-center drop-shadow-lg">
                        AI ENGINEER
                    </h1>
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50 mb-4" />
                    <div className="flex justify-center gap-6 text-xs md:text-sm font-mono text-indigo-300 tracking-[0.2em] relative z-20 pointer-events-auto">
                        <span>FULL STACK</span>
                        <span>•</span>
                        <span>SYSTEMS</span>
                        <span>•</span>
                        <span>ARCHITECTURE</span>
                    </div>
                </div>
            </div>

            {/* Vignette */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)' }} />
        </section>
    )
}

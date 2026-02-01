"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useMemo, useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { motion } from "framer-motion"

import { useBiomeStore } from "@/lib/biome-store"

function ReactiveLights() {
    const { colors } = useBiomeStore()
    const lightA = useRef<THREE.PointLight>(null)
    const lightB = useRef<THREE.PointLight>(null)

    useFrame((_, delta) => {
        if (lightA.current) lightA.current.color.lerp(new THREE.Color(colors.lightA), delta * 2)
        if (lightB.current) lightB.current.color.lerp(new THREE.Color(colors.lightB), delta * 2)
    })

    return (
        <>
            <pointLight ref={lightA} position={[10, 10, 10]} intensity={2} />
            <pointLight ref={lightB} position={[-10, -10, -10]} intensity={1} />
        </>
    )
}

function ParticleBrain() {
    const count = 4000
    const mesh = useRef<THREE.InstancedMesh>(null)
    const materialRef = useRef<THREE.MeshStandardMaterial>(null)
    const { colors } = useBiomeStore()

    // Generate particles in a sphere shape
    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const r = Math.random() * 2
            const phi = Math.acos(2 * Math.random() - 1)
            const theta = Math.random() * Math.PI * 2
            const pos = new THREE.Vector3().setFromSphericalCoords(r, phi, theta)
            temp.push({
                pos, originalPos: pos.clone(),
                speed: Math.random() * 0.2 + 0.1,
                time: Math.random() * 100
            })
        }
        return temp
    }, [])

    const dummy = useMemo(() => new THREE.Object3D(), [])

    useFrame((state, delta) => {
        if (!mesh.current) return
        const t = state.clock.getElapsedTime()

        // Sync Material Color
        if (materialRef.current) {
            materialRef.current.color.lerp(new THREE.Color(colors.accent), delta * 2)
            materialRef.current.emissive.lerp(new THREE.Color(colors.lightA), delta * 2)
        }

        const scrollY = window.scrollY
        const scrollRotation = scrollY * 0.0005

        particles.forEach((particle, i) => {
            const { pos, originalPos, speed, time } = particle
            const explosion = 1 - Math.exp(-t * 2)
            const breath = 1 + Math.sin(t * 0.5 + time) * 0.05
            pos.x = originalPos.x * breath * explosion + Math.sin(t * speed) * 0.05
            pos.y = originalPos.y * breath * explosion + Math.cos(t * speed) * 0.05
            pos.z = originalPos.z * breath * explosion
            dummy.position.copy(pos)
            dummy.lookAt(0, 0, 0)
            dummy.scale.setScalar(0.015 * explosion)
            dummy.updateMatrix()
            mesh.current!.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
        mesh.current.rotation.y = (t * 0.05) + scrollRotation
        mesh.current.rotation.x = scrollRotation * 0.5
    })

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <sphereGeometry args={[1, 4, 4]} />
            <meshStandardMaterial
                ref={materialRef}
                color={colors.accent} // Initial props are okay, lerp handles updates
                emissive={colors.lightA}
                emissiveIntensity={0.8}
                roughness={0.2}
                transparent
                opacity={0.8}
                toneMapped={false}
            />
        </instancedMesh>
    )
}

// MouseRig using Window listener instead of R3F mouse (to allow pointer-events-none)
function WindowMouseRig() {
    const { camera } = useThree()
    const mouse = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
        }
        window.addEventListener('mousemove', handleMove)
        return () => window.removeEventListener('mousemove', handleMove)
    }, [])

    useFrame(() => {
        camera.position.x += (mouse.current.x * 0.5 - camera.position.x) * 0.05
        camera.position.y += (mouse.current.y * 0.5 - camera.position.y) * 0.05
        camera.lookAt(0, 0, 0)
    })
    return null
}

export function NeuralMind() {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    return (
        <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-zinc-50">

            {/* Typography Overlay - DISABLED FOR NEXUS ENTRY */}
            {/* The NeuralGrid now handles the typography. We keep this empty or remove it. */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none select-none opacity-0">
                {/* Hidden content */}
            </div>

            {/* 3D Scene - POINTER EVENTS NONE */}
            <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
                <Canvas camera={{ position: [0, 0, 6], fov: 35 }} gl={{ alpha: true, antialias: false }} dpr={[1, 2]}>
                    <ambientLight intensity={0.5} />
                    <ReactiveLights />
                    <ParticleBrain />
                    {/* <WindowMouseRig /> - Disabled to prevent scroll confusion */}
                </Canvas>
            </div>

            {/* Background Gradients REMOVED */}
        </section>
    )
}

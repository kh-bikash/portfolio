"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function Fireflies({ count = 150 }: { count?: number }) {
    const meshRef = useRef<THREE.InstancedMesh>(null)
    const dummy = useMemo(() => new THREE.Object3D(), [])

    const particles = useMemo(() =>
        Array.from({ length: count }, () => ({
            x: (Math.random() - 0.5) * 16,
            y: (Math.random() - 0.5) * 8,
            z: (Math.random() - 0.5) * 16,
            speedY: 0.005 + Math.random() * 0.01,
            speedX: (Math.random() - 0.5) * 0.005,
            size: 0.015 + Math.random() * 0.035,
            phase: Math.random() * Math.PI * 2,
        }))
    , [count])

    useFrame((state) => {
        if (!meshRef.current) return
        const t = state.clock.elapsedTime
        particles.forEach((p, i) => {
            p.y += p.speedY
            p.x += p.speedX + Math.sin(t + p.phase) * 0.003
            if (p.y > 4) {
                p.y = -4
                p.x = (Math.random() - 0.5) * 16
            }
            const pulse = 0.5 + Math.sin(t * 3.5 + p.phase) * 0.5
            dummy.position.set(p.x, p.y, p.z)
            dummy.scale.setScalar(p.size * pulse)
            dummy.updateMatrix()
            meshRef.current!.setMatrixAt(i, dummy.matrix)
        })
        meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <sphereGeometry args={[1, 6, 6]} />
            <meshBasicMaterial color="#FFB84D" transparent opacity={0.65} />
        </instancedMesh>
    )
}

function Bokeh({ count = 35 }: { count?: number }) {
    const meshRef = useRef<THREE.InstancedMesh>(null)
    const dummy = useMemo(() => new THREE.Object3D(), [])

    const lights = useMemo(() =>
        Array.from({ length: count }, () => ({
            x: (Math.random() - 0.5) * 16,
            y: (Math.random() - 0.5) * 6,
            z: -2 - Math.random() * 8,
            speed: 0.008 + Math.random() * 0.02,
            size: 0.06 + Math.random() * 0.15,
            color: Math.random() > 0.6 ? "#E5989B" : Math.random() > 0.3 ? "#FFB84D" : "#FFCDD2",
            phase: Math.random() * Math.PI * 2,
        }))
    , [count])

    useFrame((state) => {
        if (!meshRef.current) return
        const t = state.clock.elapsedTime
        lights.forEach((l, i) => {
            l.x -= l.speed
            if (l.x < -8) l.x = 8
            const pulse = 0.7 + Math.sin(t * 2 + l.phase) * 0.3
            dummy.position.set(l.x, l.y + Math.sin(t * 0.5 + l.phase) * 0.1, l.z)
            dummy.scale.setScalar(l.size * pulse)
            dummy.updateMatrix()
            meshRef.current!.setMatrixAt(i, dummy.matrix)
        })
        meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color="#FFB84D" transparent opacity={0.35} />
        </instancedMesh>
    )
}

function CityScape({ count = 80 }: { count?: number }) {
    const meshRef = useRef<THREE.InstancedMesh>(null)
    const dummy = useMemo(() => new THREE.Object3D(), [])

    const buildings = useMemo(() =>
        Array.from({ length: count }, (_, i) => {
            const isLeft = i % 2 === 0
            const distance = 4 + Math.random() * 8 
            return {
                x: (isLeft ? -1 : 1) * distance,
                y: -2,
                z: -Math.random() * 120, // Spread far along Z
                scaleX: 2 + Math.random() * 4,
                scaleY: 4 + Math.random() * 15,
                scaleZ: 2 + Math.random() * 4,
                speed: 0.2 + Math.random() * 0.1,
            }
        })
    , [count])

    useFrame(() => {
        if (!meshRef.current) return
        buildings.forEach((b, i) => {
            b.z += b.speed
            if (b.z > 5) b.z = -115
            dummy.position.set(b.x, b.y + b.scaleY / 2, b.z)
            dummy.scale.set(b.scaleX, b.scaleY, b.scaleZ)
            dummy.updateMatrix()
            meshRef.current!.setMatrixAt(i, dummy.matrix)
        })
        meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#0F0A14" roughness={0.1} metalness={0.9} />
        </instancedMesh>
    )
}

function StreetLines() {
    const linesRef = useRef<THREE.InstancedMesh>(null)
    const dummy = useMemo(() => new THREE.Object3D(), [])

    const lines = useMemo(() => 
        Array.from({ length: 30 }, (_, i) => ({
            z: -i * 4,
            speed: 0.4
        }))
    , [])

    useFrame(() => {
        if (!linesRef.current) return
        lines.forEach((l, i) => {
            l.z += l.speed
            if (l.z > 5) l.z = -115
            dummy.position.set(0, -1.9, l.z)
            dummy.scale.set(0.15, 0.01, 1.5)
            dummy.updateMatrix()
            linesRef.current!.setMatrixAt(i, dummy.matrix)
        })
        linesRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={linesRef} args={[undefined, undefined, 30]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#FFB84D" />
        </instancedMesh>
    )
}

export function NightDrive() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 3], fov: 60 }}
                style={{ background: "transparent" }}
                gl={{ alpha: true, antialias: true }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 20, 5]} intensity={1.5} color="#E5989B" />
                <fog attach="fog" args={["#2B1B35", 5, 40]} />
                
                <CityScape />
                <StreetLines />
                <Fireflies />
                <Bokeh />
            </Canvas>
        </div>
    )
}

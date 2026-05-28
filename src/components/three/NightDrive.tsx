"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function Fireflies({ count = 150 }: { count?: number }) {
    const meshRef = useRef<THREE.InstancedMesh>(null)
    const dummy = useMemo(() => new THREE.Object3D(), [])

    const particles = useMemo(() =>
        Array.from({ length: count }, () => ({
            x: (Math.random() - 0.5) * 12,
            y: (Math.random() - 0.5) * 6,
            z: (Math.random() - 0.5) * 6,
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
            if (p.y > 3) {
                p.y = -3
                p.x = (Math.random() - 0.5) * 12
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
            x: (Math.random() - 0.5) * 12,
            y: (Math.random() - 0.5) * 4,
            z: -1 - Math.random() * 4,
            speed: 0.008 + Math.random() * 0.02,
            size: 0.06 + Math.random() * 0.12,
            color: Math.random() > 0.6 ? "#E5989B" : Math.random() > 0.3 ? "#FFB84D" : "#FFCDD2",
            phase: Math.random() * Math.PI * 2,
        }))
    , [count])

    useFrame((state) => {
        if (!meshRef.current) return
        const t = state.clock.elapsedTime
        lights.forEach((l, i) => {
            l.x -= l.speed
            if (l.x < -6) l.x = 6
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
            <meshBasicMaterial color="#FFB84D" transparent opacity={0.25} />
        </instancedMesh>
    )
}

export function NightDrive() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 3], fov: 50 }}
                style={{ background: "transparent" }}
                gl={{ alpha: true, antialias: true }}
            >
                <fog attach="fog" args={["#2B1B35", 2, 10]} />
                <Fireflies />
                <Bokeh />
            </Canvas>
        </div>
    )
}

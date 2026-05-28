"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere } from "@react-three/drei"
import * as THREE from "three"

function GlowingSun() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            // Gentle pulsation
            const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
            meshRef.current.scale.set(scale, scale, scale)
            meshRef.current.rotation.y += 0.005
            meshRef.current.rotation.x += 0.002
        }
    })

    return (
        <group position={[0, 0, 0]}>
            {/* Core */}
            <Sphere ref={meshRef} args={[0.8, 64, 64]}>
                <meshBasicMaterial color="#FFFFFF" />
            </Sphere>

            {/* Inner Glow */}
            <Sphere args={[0.9, 32, 32]}>
                <meshBasicMaterial color="#FFF1E0" transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
            </Sphere>

            {/* Outer Glow */}
            <Sphere args={[1.2, 32, 32]}>
                <meshBasicMaterial color="#E8D5C4" transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
            </Sphere>
            
            {/* Extended Aura */}
            <Sphere args={[2.5, 32, 32]}>
                <meshBasicMaterial color="#C4956A" transparent opacity={0.05} blending={THREE.AdditiveBlending} depthWrite={false} />
            </Sphere>
        </group>
    )
}

function DustParticles() {
    const count = 150
    const meshRef = useRef<THREE.InstancedMesh>(null)
    const dummy = new THREE.Object3D()

    const particles = useRef(
        Array.from({ length: count }, () => ({
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 10,
            z: (Math.random() - 0.5) * 10,
            speed: Math.random() * 0.02 + 0.01,
            offset: Math.random() * Math.PI * 2,
        }))
    )

    useFrame((state) => {
        if (!meshRef.current) return
        const t = state.clock.elapsedTime
        particles.current.forEach((p, i) => {
            dummy.position.set(
                p.x + Math.sin(t * p.speed + p.offset) * 2,
                p.y + Math.cos(t * p.speed * 1.5 + p.offset) * 2,
                p.z
            )
            dummy.updateMatrix()
            meshRef.current!.setMatrixAt(i, dummy.matrix)
        })
        meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="#FFF" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
        </instancedMesh>
    )
}

export function DawnSun() {
    return (
        <div className="absolute inset-0 pointer-events-auto">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                style={{ background: "transparent" }}
                gl={{ alpha: true, antialias: true }}
            >
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                <GlowingSun />
                <DustParticles />
            </Canvas>
        </div>
    )
}

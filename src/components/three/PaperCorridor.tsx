"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"

// Shared scroll ref - updated externally, read by useFrame
const scrollRef = { current: 0 }

export function setCorridorScroll(value: number) {
    scrollRef.current = value
}

function CorridorPanels() {
    const groupRef = useRef<THREE.Group>(null)

    const panels = useMemo(() => {
        const p: { x: number; z: number; side: "left" | "right" }[] = []
        for (let i = 0; i < 20; i++) {
            p.push({ x: -1.5, z: -i * 2, side: "left" })
            p.push({ x: 1.5, z: -i * 2, side: "right" })
        }
        return p
    }, [])

    const panelMat = useMemo(() => new THREE.MeshStandardMaterial({
        color: "#F0E8DA",
        roughness: 1,
        metalness: 0,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide,
    }), [])

    const frameMat = useMemo(() => new THREE.MeshStandardMaterial({
        color: "#8B7355",
        roughness: 0.6,
        metalness: 0.1,
    }), [])

    useFrame(() => {
        if (groupRef.current) {
            // Smoothly interpolate toward target
            const target = scrollRef.current * 38
            groupRef.current.position.z = THREE.MathUtils.lerp(
                groupRef.current.position.z,
                target,
                0.08
            )
        }
    })

    return (
        <group ref={groupRef}>
            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, -20]}>
                <planeGeometry args={[3, 44]} />
                <meshStandardMaterial color="#D4C4A8" roughness={0.9} />
            </mesh>
            {/* Ceiling */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 1.5, -20]}>
                <planeGeometry args={[3, 44]} />
                <meshStandardMaterial color="#E8E0D4" roughness={0.9} />
            </mesh>
            {/* Panels */}
            {panels.map((p, i) => (
                <group key={i} position={[p.x, 0, p.z]}>
                    <mesh
                        rotation={[0, p.side === "left" ? Math.PI / 2 : -Math.PI / 2, 0]}
                        material={panelMat}
                    >
                        <planeGeometry args={[1.8, 2.8]} />
                    </mesh>
                    {/* Vertical frame */}
                    <mesh
                        rotation={[0, p.side === "left" ? Math.PI / 2 : -Math.PI / 2, 0]}
                        position={[0, 0, 0.01]}
                        material={frameMat}
                    >
                        <planeGeometry args={[0.03, 2.8]} />
                    </mesh>
                    {/* Horizontal frame */}
                    <mesh
                        rotation={[0, p.side === "left" ? Math.PI / 2 : -Math.PI / 2, 0]}
                        position={[0, 0, 0.01]}
                        material={frameMat}
                    >
                        <planeGeometry args={[1.8, 0.03]} />
                    </mesh>
                </group>
            ))}
        </group>
    )
}

function Dust({ count = 50 }: { count?: number }) {
    const meshRef = useRef<THREE.InstancedMesh>(null)
    const dummy = useMemo(() => new THREE.Object3D(), [])

    const motes = useMemo(() =>
        Array.from({ length: count }, () => ({
            x: (Math.random() - 0.5) * 2.5,
            y: (Math.random() - 0.5) * 2.5,
            z: -Math.random() * 40,
            phase: Math.random() * Math.PI * 2,
        }))
    , [count])

    useFrame((state) => {
        if (!meshRef.current) return
        const t = state.clock.elapsedTime
        motes.forEach((m, i) => {
            dummy.position.set(
                m.x + Math.sin(t * 0.2 + m.phase) * 0.2,
                m.y + Math.cos(t * 0.3 + m.phase) * 0.15,
                m.z
            )
            dummy.scale.setScalar(0.008 + Math.sin(t + i) * 0.003)
            dummy.updateMatrix()
            meshRef.current!.setMatrixAt(i, dummy.matrix)
        })
        meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <sphereGeometry args={[1, 4, 4]} />
            <meshBasicMaterial color="#E8D5C4" transparent opacity={0.3} />
        </instancedMesh>
    )
}

export function PaperCorridorCanvas() {
    return (
        <Canvas
            camera={{ position: [0, 0, 2], fov: 60 }}
            style={{ background: "transparent", pointerEvents: "auto", touchAction: "none" }}
            gl={{ alpha: true, antialias: true }}
        >
            <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
            <ambientLight intensity={0.4} color="#F5F0E8" />
            <directionalLight position={[0, 2, -10]} intensity={0.6} color="#E8D5C4" />
            <pointLight position={[0, 0, -35]} intensity={2} color="#E8A87C" distance={20} />
            <CorridorPanels />
            <Dust />
        </Canvas>
    )
}

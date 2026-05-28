"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, OrbitControls } from "@react-three/drei"
import * as THREE from "three"

function Crane() {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (!groupRef.current) return
        // Gentle mouse-reactive tilt
        const mx = state.pointer.x * 0.08
        const my = state.pointer.y * 0.05
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mx + state.clock.elapsedTime * 0.1, 0.02)
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, my * 0.3, 0.02)
    })

    // Simple origami crane geometry from triangles
    const bodyGeom = useMemo(() => {
        const geo = new THREE.BufferGeometry()
        // Diamond body
        const vertices = new Float32Array([
            0, 0, 0.8,    -0.6, 0, 0,    0, 0.15, 0,
            0, 0, 0.8,     0, 0.15, 0,    0.6, 0, 0,
            0, 0, 0.8,     0.6, 0, 0,     0, -0.15, 0,
            0, 0, 0.8,     0, -0.15, 0,  -0.6, 0, 0,
            // Tail
            0, 0, -0.6,   -0.3, 0, 0,    0, 0.08, 0,
            0, 0, -0.6,    0, 0.08, 0,    0.3, 0, 0,
            0, 0, -0.6,    0.3, 0, 0,     0, -0.08, 0,
            0, 0, -0.6,    0, -0.08, 0,  -0.3, 0, 0,
        ])
        geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3))
        geo.computeVertexNormals()
        return geo
    }, [])

    // Wings
    const wingGeom = useMemo(() => {
        const geo = new THREE.BufferGeometry()
        const vertices = new Float32Array([
            // Left wing
            -0.15, 0.02, 0.3,   -1.2, 0.2, -0.1,   -0.15, 0.02, -0.2,
            // Right wing
            0.15, 0.02, 0.3,    0.15, 0.02, -0.2,    1.2, 0.2, -0.1,
        ])
        geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3))
        geo.computeVertexNormals()
        return geo
    }, [])

    const paperMat = useMemo(() => new THREE.MeshStandardMaterial({
        color: "#F0E8DA",
        roughness: 0.85,
        metalness: 0.0,
        side: THREE.DoubleSide,
        flatShading: true,
    }), [])

    return (
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
            <group ref={groupRef} scale={1.1}>
                <mesh geometry={bodyGeom} material={paperMat} />
                <mesh geometry={wingGeom} material={paperMat} />
            </group>
        </Float>
    )
}

// Small ambient particles (like dust motes in sunlight)
function DustMotes({ count = 30 }: { count?: number }) {
    const meshRef = useRef<THREE.InstancedMesh>(null)
    const dummy = useMemo(() => new THREE.Object3D(), [])

    const particles = useMemo(() =>
        Array.from({ length: count }, () => ({
            x: (Math.random() - 0.5) * 6,
            y: (Math.random() - 0.5) * 4,
            z: (Math.random() - 0.5) * 4,
            speed: 0.002 + Math.random() * 0.005,
            drift: Math.random() * Math.PI * 2,
        }))
    , [count])

    useFrame((state) => {
        if (!meshRef.current) return
        particles.forEach((p, i) => {
            p.y += p.speed
            if (p.y > 2.5) p.y = -2.5
            dummy.position.set(
                p.x + Math.sin(state.clock.elapsedTime * 0.3 + p.drift) * 0.3,
                p.y,
                p.z
            )
            dummy.scale.setScalar(0.008 + Math.sin(state.clock.elapsedTime + i) * 0.003)
            dummy.updateMatrix()
            meshRef.current!.setMatrixAt(i, dummy.matrix)
        })
        meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <sphereGeometry args={[1, 6, 6]} />
            <meshBasicMaterial color="#C4956A" transparent opacity={0.35} />
        </instancedMesh>
    )
}

export function OrigamiCrane() {
    return (
        <div className="absolute inset-0 pointer-events-auto">
            <Canvas
                camera={{ position: [0, 0.5, 4], fov: 35 }}
                style={{ background: "transparent" }}
                gl={{ alpha: true, antialias: true }}
            >
                <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
                <ambientLight intensity={0.6} color="#F5F0E8" />
                <directionalLight position={[5, 5, 3]} intensity={0.8} color="#E8D5C4" />
                <directionalLight position={[-3, 2, -2]} intensity={0.3} color="#B8C5C9" />
                <Crane />
                <DustMotes />
            </Canvas>
        </div>
    )
}

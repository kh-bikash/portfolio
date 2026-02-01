"use client"

import { useRef, useMemo, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { audioManager } from "@/lib/audio-manager"

type VisualState = "chaos" | "grid" | "network" | "code"

export function TechVisualizer({ state }: { state: VisualState }) {
    const meshRef = useRef<THREE.InstancedMesh>(null)
    const count = 200 // Number of particles
    const dummy = useMemo(() => new THREE.Object3D(), [])

    // Store target positions for each state
    const targets = useMemo(() => {
        const chaos = []
        const grid = []
        const network = []
        const code = []

        // Chaos: Random sphere
        for (let i = 0; i < count; i++) {
            chaos.push(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            )
        }

        // Grid: Flat plane
        const cols = 20
        const rows = 10
        for (let i = 0; i < count; i++) {
            const row = Math.floor(i / cols)
            const col = i % cols
            grid.push(
                (col - cols / 2) * 0.5,
                (row - rows / 2) * 0.5,
                0
            )
        }

        // Network: Nodes (Spheres)
        for (let i = 0; i < count; i++) {
            // Clustered
            const cluster = i % 5
            network.push(
                (Math.random() - 0.5) * 4 + (cluster === 0 ? 3 : -3),
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4
            )
        }

        // Code: Lines of text visual representation
        for (let i = 0; i < count; i++) {
            // Lines of "code"
            const line = Math.floor(i / 15)
            const char = i % 15
            code.push(
                (char - 7) * 0.4,
                (line - 6) * -0.6,
                0
            )
        }

        return { chaos, grid, network, code }
    }, [])

    // Colors
    const colors = useMemo(() => {
        const c = new Float32Array(count * 3)
        const col = new THREE.Color()
        for (let i = 0; i < count; i++) {
            col.setHSL(0.5 + Math.random() * 0.1, 0.8, 0.5) // Cyan-ish
            col.toArray(c, i * 3)
        }
        return c
    }, [])

    useFrame((stateThree, delta) => {
        if (!meshRef.current) return

        // Audio Reactivity
        const audioData = audioManager.getFrequencyData()
        let audioScale = 0
        if (audioData) {
            // Get average of lower frequencies (Bass)
            const bass = audioData.slice(0, 10).reduce((a, b) => a + b, 0) / 10
            audioScale = (bass / 255) // 0 to 1
        }

        const currentPositions = meshRef.current.geometry.attributes.position // Actually we use instanceMatrix

        // LERP factor
        const t = 1 - Math.pow(0.001, delta) // Smooth damping

        // Get active target array
        let activeTarget = targets.chaos
        if (state === "grid") activeTarget = targets.grid
        if (state === "network") activeTarget = targets.network
        if (state === "code") activeTarget = targets.code

        for (let i = 0; i < count; i++) {
            const x = activeTarget[i * 3]
            const y = activeTarget[i * 3 + 1]
            const z = activeTarget[i * 3 + 2]

            // Get current matrix
            meshRef.current.getMatrixAt(i, dummy.matrix)
            dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale)

            // Lerp position
            dummy.position.lerp(new THREE.Vector3(x, y, z), delta * 2) // Speed of transition

            // Add some noise/hover
            dummy.position.y += Math.sin(stateThree.clock.elapsedTime + i) * 0.002

            // Audio Pulse (Scale up on bass)
            // Stagger scale based on particle index for "wave" effect
            const pulse = audioScale * 2
            dummy.scale.setScalar(1 + pulse)

            // Rotate based on state
            if (state === "chaos") {
                dummy.rotation.x += delta
                dummy.rotation.y += delta
            } else {
                dummy.rotation.set(0, 0, 0)
            }

            dummy.updateMatrix()
            meshRef.current.setMatrixAt(i, dummy.matrix)
        }
        meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <boxGeometry args={[0.1, 0.1, 0.1]}>
                <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
            </boxGeometry>
            <meshStandardMaterial
                color="cyan"
                emissive="cyan"
                emissiveIntensity={0.5}
                toneMapped={false}
            />
        </instancedMesh>
    )
}

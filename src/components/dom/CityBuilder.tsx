"use client"

import { useMemo, useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useBiomeStore } from "@/lib/biome-store"

// Mock Data Generation
// 52 weeks * 7 days = 364 data points
const generateContributionData = () => {
    return Array.from({ length: 364 }).map(() => {
        // Skewed random to simulate real dev habits (some days busy, some quiet)
        return Math.random() > 0.3 ? Math.floor(Math.random() * 12) : 0
    })
}

export function CityBuilder() {
    const { currentBiome } = useBiomeStore()
    const mesh = useRef<THREE.InstancedMesh>(null)
    const dummy = useMemo(() => new THREE.Object3D(), [])

    // Data Preparation
    const data = useMemo(() => generateContributionData(), [])

    // Grid Layout
    const cols = 26 // 26 weeks wide
    const rows = 14 // 14 days (2 rows per real week for density)
    const spacing = 1.2

    useEffect(() => {
        if (!mesh.current) return

        let i = 0
        for (let x = 0; x < cols; x++) {
            for (let z = 0; z < rows; z++) {
                // Center the grid
                const xPos = (x - cols / 2) * spacing
                const zPos = (z - rows / 2) * spacing

                // Height based on commits
                // Ensure at least small height for non-zero days, flat for zero
                const commits = data[i] || 0
                const height = commits === 0 ? 0.1 : commits * 0.5

                dummy.position.set(xPos, height / 2, zPos)
                dummy.scale.set(1, height, 1)
                dummy.updateMatrix()

                mesh.current.setMatrixAt(i, dummy.matrix)

                // Color based on intensity (Heatmap)
                // Low = Dark Grey, High = Neon Orange (Industrial Theme) or Green (Cyber)
                const intensity = Math.min(commits / 10, 1) // 0 to 1
                const color = new THREE.Color().setHSL(0.08, 1, 0.5 * intensity) // Orange-ish
                if (commits === 0) color.setHex(0x111111) // Empty

                mesh.current.setColorAt(i, color)

                i++
            }
        }
        mesh.current.instanceMatrix.needsUpdate = true
        mesh.current.instanceColor!.needsUpdate = true
    }, [data, dummy])

    // Animation: Rise from ground when Industrial Mode activates
    useFrame((state, delta) => {
        if (!mesh.current) return

        // Target Y position: 0 if industrial, -20 (buried) if not
        const targetY = currentBiome === 'industrial' ? -2 : -50

        // Custom Lerp for smooth rising city
        mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, targetY, delta * 3)

        // Optimize: Hide if buried
        mesh.current.visible = mesh.current.position.y > -49
    })

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, data.length]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                color="#ffaa00"
                roughness={0.2}
                metalness={0.8}
            />
        </instancedMesh>
    )
}

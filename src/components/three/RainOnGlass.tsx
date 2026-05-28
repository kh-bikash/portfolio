"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function RainDrops({ count = 200 }: { count?: number }) {
    const meshRef = useRef<THREE.InstancedMesh>(null)
    const dummy = useMemo(() => new THREE.Object3D(), [])

    const drops = useMemo(() =>
        Array.from({ length: count }, () => ({
            x: (Math.random() - 0.5) * 4,
            y: Math.random() * 4 - 0.5,
            speed: 0.03 + Math.random() * 0.04,
            length: 0.04 + Math.random() * 0.08,
            delay: Math.random() * 3,
        }))
    , [count])

    useFrame((state) => {
        if (!meshRef.current) return
        const t = state.clock.elapsedTime
        drops.forEach((d, i) => {
            d.y -= d.speed
            if (d.y < -2.5) {
                d.y = 2.5
                d.x = (Math.random() - 0.5) * 4
            }
            dummy.position.set(d.x, d.y, 0)
            dummy.scale.set(0.003, d.length, 0.003)
            dummy.rotation.z = -0.15
            dummy.updateMatrix()
            meshRef.current!.setMatrixAt(i, dummy.matrix)
        })
        meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <cylinderGeometry args={[1, 1, 1, 4]} />
            <meshBasicMaterial color="#8BA5B0" transparent opacity={0.25} />
        </instancedMesh>
    )
}

// Water rivulets on glass surface
function Rivulets() {
    const points = useMemo(() => {
        const paths: THREE.Vector3[][] = []
        for (let i = 0; i < 8; i++) {
            const path: THREE.Vector3[] = []
            let x = (Math.random() - 0.5) * 3
            let y = 2
            for (let j = 0; j < 20; j++) {
                path.push(new THREE.Vector3(x, y, 0.01))
                x += (Math.random() - 0.5) * 0.15
                y -= 0.15 + Math.random() * 0.1
            }
            paths.push(path)
        }
        return paths
    }, [])

    return (
        <group>
            {points.map((path, i) => {
                const curve = new THREE.CatmullRomCurve3(path)
                const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.005, 4, false)
                return (
                    <mesh key={i} geometry={tubeGeo}>
                        <meshBasicMaterial color="#9BB5C0" transparent opacity={0.15} />
                    </mesh>
                )
            })}
        </group>
    )
}

export function RainOnGlass() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <Canvas
                camera={{ position: [0, 0, 3], fov: 40 }}
                style={{ background: "transparent" }}
                gl={{ alpha: true, antialias: true }}
            >
                <RainDrops />
                <Rivulets />
            </Canvas>
        </div>
    )
}

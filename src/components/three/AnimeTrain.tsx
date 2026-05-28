"use client"

import { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sparkles, useGLTF } from "@react-three/drei"
import * as THREE from "three"

// 3D Parallax Crossing Poles for the Foreground
function ForegroundCrossingPoles() {
    const groupRef = useRef<THREE.Group>(null)
    const light1Ref = useRef<THREE.MeshBasicMaterial>(null)
    const light2Ref = useRef<THREE.MeshBasicMaterial>(null)

    useFrame((state) => {
        // Parallax effect based on mouse movement
        const mouseX = (state.pointer.x * Math.PI) / 10
        const mouseY = (state.pointer.y * Math.PI) / 10
        
        if (groupRef.current) {
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.2, 0.1)
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY * 0.1, 0.1)
        }

        // Blinking lights
        const time = state.clock.elapsedTime
        if (light1Ref.current && light2Ref.current) {
            light1Ref.current.opacity = Math.sin(time * 6) > 0 ? 1 : 0.2
            light2Ref.current.opacity = Math.cos(time * 6) > 0 ? 1 : 0.2
        }
    })

    return (
        <group ref={groupRef} position={[6, -1, 3]} scale={[1.2, 1.2, 1.2]}>
            {/* Main Pole */}
            <mesh position={[0, 3, 0]}>
                <cylinderGeometry args={[0.15, 0.15, 10]} />
                <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
            </mesh>
            
            {/* Crossing Arms (Striped) */}
            <group position={[0, 1.5, 0.1]} rotation={[0, 0, Math.PI / 4]}>
                <mesh>
                    <boxGeometry args={[6, 0.3, 0.1]} />
                    <meshStandardMaterial color="#FFB800" />
                </mesh>
                <mesh position={[0, 0, 0.06]}>
                    <boxGeometry args={[1.5, 0.31, 0.01]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
                <mesh position={[2.5, 0, 0.06]}>
                    <boxGeometry args={[1.5, 0.31, 0.01]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
                <mesh position={[-2.5, 0, 0.06]}>
                    <boxGeometry args={[1.5, 0.31, 0.01]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
            </group>

            {/* Light Bar */}
            <mesh position={[0, 4.5, 0.1]}>
                <boxGeometry args={[2.5, 0.4, 0.2]} />
                <meshStandardMaterial color="#111" />
            </mesh>

            {/* Blinking Lights with intense glow */}
            <mesh position={[-0.8, 4.5, 0.21]}>
                <circleGeometry args={[0.25]} />
                <meshBasicMaterial ref={light1Ref} color="#FF1E1E" toneMapped={false} transparent blending={THREE.AdditiveBlending} />
            </mesh>
            <mesh position={[0.8, 4.5, 0.21]}>
                <circleGeometry args={[0.25]} />
                <meshBasicMaterial ref={light2Ref} color="#FF1E1E" toneMapped={false} transparent blending={THREE.AdditiveBlending} />
            </mesh>
        </group>
    )
}

function CinematicDust() {
    const ref = useRef<THREE.Group>(null)
    useFrame((state) => {
        if (!ref.current) return
        const mouseX = state.pointer.x
        const mouseY = state.pointer.y
        ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mouseX * 2, 0.05)
        ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, mouseY * 2, 0.05)
    })

    return (
        <group ref={ref}>
            <Sparkles count={200} scale={25} size={3} speed={0.2} color="#FFF1E0" opacity={0.6} />
            <Sparkles count={100} scale={30} size={5} speed={0.4} color="#FFC482" opacity={0.4} />
        </group>
    )
}

export function AnimeTrainScene() {
    return (
        <div className="absolute inset-0 pointer-events-auto">
            <Canvas camera={{ position: [0, 1.5, 8], fov: 60 }} gl={{ antialias: true, alpha: true }}>
                <ambientLight intensity={1} color="#FFC482" />
                <directionalLight position={[-5, 5, 5]} intensity={2} color="#FFA057" />
                
                {/* 3D Foreground Elements that parallax over the 2D HD image */}
                <ForegroundCrossingPoles />
                <CinematicDust />
            </Canvas>
        </div>
    )
}

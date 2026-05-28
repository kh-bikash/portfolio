"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Clouds, Cloud, Environment, Sparkles } from "@react-three/drei"
import * as THREE from "three"
import { useRef } from "react"

let globalScrollY = 0
export function setCloudScroll(y: number) {
    globalScrollY = y
}

function CloudScene() {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (!groupRef.current) return
        
        // To make the camera fly THROUGH the clouds, we move the clouds TOWARDS the camera (+Z)
        // Since camera is at Z=0 looking at -Z, we want clouds to move from negative to positive Z.
        groupRef.current.position.z = THREE.MathUtils.lerp(
            groupRef.current.position.z,
            globalScrollY * 60,
            0.1
        )
        
        // Very subtle camera rotation for cinematic feel
        state.camera.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.05
    })

    return (
        <group ref={groupRef}>
            <ambientLight intensity={1.5} color="#FFF1E0" />
            <directionalLight position={[10, 10, 5]} intensity={3} color="#FFC482" />
            
            <Clouds material={THREE.MeshBasicMaterial}>
                {/* 
                  Arranging massive 3D volumetric clouds along the Z axis
                  so the camera flies right through them.
                */}
                <Cloud position={[0, 2, -5]} speed={0.2} opacity={0.6} scale={2} color="#FFF1E0" />
                <Cloud position={[-5, 0, -10]} speed={0.3} opacity={0.5} scale={2.5} color="#FFD700" />
                <Cloud position={[5, -2, -15]} speed={0.2} opacity={0.4} scale={3} color="#E8D5C4" />
                <Cloud position={[0, 4, -20]} speed={0.4} opacity={0.6} scale={2} color="#FFFFFF" />
                <Cloud position={[-6, 1, -25]} speed={0.2} opacity={0.5} scale={2.5} color="#FFA057" />
                <Cloud position={[4, -3, -30]} speed={0.3} opacity={0.4} scale={3} color="#FFC482" />
                <Cloud position={[-2, 2, -35]} speed={0.2} opacity={0.6} scale={2} color="#FFF1E0" />
                <Cloud position={[0, 0, -45]} speed={0.1} opacity={0.8} scale={4} color="#FFFFFF" />
                <Cloud position={[3, 1, -55]} speed={0.2} opacity={0.5} scale={3} color="#FFD700" />
            </Clouds>

            {/* Glowing motes of light flying past */}
            <Sparkles count={200} scale={[20, 20, 40]} size={6} speed={0.2} color="#FFF" opacity={0.5} position={[0, 0, -20]} />
        </group>
    )
}

export function VolumetricCloudsCanvas() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 0], fov: 75 }} gl={{ antialias: true, alpha: true }}>
                <CloudScene />
                <Environment preset="sunset" />
                {/* Removed fog temporarily to guarantee visibility */}
            </Canvas>
        </div>
    )
}

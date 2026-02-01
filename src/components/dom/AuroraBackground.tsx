"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import React, { useMemo, useRef } from "react"
import * as THREE from "three"

function AuroraMesh() {
    const mesh = useRef<THREE.Mesh>(null)

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#ffdddd") }, // Pinkish
        uColor2: { value: new THREE.Color("#ddddff") }, // Blueish
        uColor3: { value: new THREE.Color("#eeffff") }, // Cyanish
    }), [])

    useFrame((state) => {
        if (mesh.current) {
            (mesh.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.getElapsedTime() * 0.5
        }
    })

    return (
        <mesh ref={mesh} scale={2} rotation={[0, 0, Math.PI / 4]}>
            <planeGeometry args={[10, 10, 64, 64]} />
            <shaderMaterial
                side={THREE.DoubleSide}
                uniforms={uniforms}
                vertexShader={`
          varying vec2 vUv;
          varying float vElevation;
          uniform float uTime;

          void main() {
            vUv = uv;
            vec3 pos = position;
            
            float elevation = sin(pos.x * 2.0 + uTime) * 0.2 
                            + sin(pos.y * 1.5 + uTime * 0.5) * 0.2;
            
            pos.z += elevation;
            vElevation = elevation;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
                fragmentShader={`
          varying vec2 vUv;
          varying float vElevation;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uColor3;

          void main() {
            vec3 color = mix(uColor1, uColor2, vUv.x + vElevation * 0.5);
            color = mix(color, uColor3, vUv.y + vElevation * 0.2);
            
            gl_FragColor = vec4(color, 0.4); // Subtle opacity
          }
        `}
                transparent
            />
        </mesh>
    )
}

export function AuroraBackground() {
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="fixed inset-0 -z-20 bg-white pointer-events-none">
            {/* Base Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-zinc-50 to-white" />

            {/* 3D Aurora Layer */}
            <div className="absolute inset-0 opacity-40 mix-blend-multiply">
                <Canvas camera={{ position: [0, 0, 2] }} gl={{ alpha: true }}>
                    <AuroraMesh />
                </Canvas>
            </div>
        </div>
    )
}

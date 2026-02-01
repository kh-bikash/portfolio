"use client"

import { useFrame, useThree } from "@react-three/fiber"
import { useMemo, useRef, useEffect } from "react"
import * as THREE from "three"
import { create } from "zustand"
import { useLocation, useNavigate } from "react-router-dom"

// 1. Transition Store to coordinate Router + WebGL
interface TransitionState {
    isTransitioning: boolean
    progress: number
    startTransition: (path: string, navigate: any) => void
    endTransition: () => void
}

export const useTransitionStore = create<TransitionState>((set) => ({
    isTransitioning: false,
    progress: 0,
    startTransition: async (path, navigate) => {
        set({ isTransitioning: true, progress: 0 })
        // Wait for half animation
        await new Promise(r => setTimeout(r, 600))
        navigate(path)
        // Wait for route change to settle (approx)
        await new Promise(r => setTimeout(r, 200))
        set({ isTransitioning: false }) // Cleanup handled by component
    },
    endTransition: () => set({ isTransitioning: false })
}))


// 2. The Liquid Shader Material
const LiquidShaderMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uResolution: { value: new THREE.Vector2(0, 0) },
        uColor: { value: new THREE.Color('#000000') }
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uTime;
        uniform float uProgress;
        uniform vec2 uResolution;
        uniform vec3 uColor;
        varying vec2 vUv;

        // Simplex 2D noise
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
        float snoise(vec2 v){
            const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                    -0.577350269189626, 0.024390243902439);
            vec2 i  = floor(v + dot(v, C.yy) );
            vec2 x0 = v -   i + dot(i, C.xx);
            vec2 i1;
            i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod(i, 289.0);
            vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                + i.x + vec3(0.0, i1.x, 1.0 ));
            vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
            m = m*m ;
            m = m*m ;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
            vec3 g;
            g.x  = a0.x  * x0.x  + h.x  * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
        }

        void main() {
            vec2 uv = vUv;
            
            // Create a "wipe" effect that distorts based on progress
            // Progress goes 0 -> 1 -> 0 or 0 -> 1 (Out) -> 0 (In)
            
            // Let's do a vertical wipe with noise liquid edge
            float noise = snoise(uv * 10.0 + uTime * 0.5);
            
            // Map progress 0-1 to value
            // Transition In: 0 to 0.5 (Fill screen)
            // Transition Out: 0.5 to 1.0 (Clear screen)
            
            float p = uProgress;
            
            // Liquid threshold
            float threshold = p * 2.5 - 0.5; // range: -0.5 to 2.0
            
            // Distort Y with noise
            float edge = uv.y + noise * 0.1;
            
            // Invert logic for opening vs closing?
            // Let's keep it simple: Progress 0 -> 1 = Fill black
            // We manage the fade out separately or reverse progress.
            // Actually, best feel: Fill Up -> Change Page -> Fill Up (leaving gap) or Wipe Down.
            
            // Implementation: uProgress 0->1 means purely filling up
            float alpha = smoothstep(threshold - 0.1, threshold, edge);
            
            // Inverse for "Curtain Fall" feel
            // If uProgress 0->1: Curtain falls down
            float curtain = 1.0 - smoothstep(threshold, threshold + 0.1, uv.y + noise * 0.2);
            
            gl_FragColor = vec4(uColor, curtain);
        }
    `
}


// 3. The R3F Component
export function TransitionOverlay() {
    const { isTransitioning } = useTransitionStore()
    const mesh = useRef<THREE.Mesh>(null)
    const { viewport } = useThree()

    // Shader Uniforms
    const location = useLocation()
    const pathname = location.pathname
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
        uColor: { value: new THREE.Color(0, 0, 0) }
    }), [])

    useFrame((state, delta) => {
        if (!mesh.current) return

        uniforms.uTime.value += delta

        // Animate Progress
        // IF transitioning: Go 0 -> 1
        // IF NOT transitioning: Go 1 -> 0 (or Stay 0 if already done)
        const target = isTransitioning ? 1.5 : -0.5

        // Simple Lerp
        uniforms.uProgress.value = THREE.MathUtils.lerp(uniforms.uProgress.value, target, delta * 3)

        // Disable rendering if completely clear to save draw calls
        mesh.current.visible = uniforms.uProgress.value > -0.4
    })

    return (
        <mesh ref={mesh} position={[0, 0, 10]}>
            <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={LiquidShaderMaterial.vertexShader}
                fragmentShader={LiquidShaderMaterial.fragmentShader}
                transparent
                depthTest={false}
                depthWrite={false}
            />
        </mesh>
    )
}

// 4. The Hook for Links
export function useLiquidRoute() {
    const navigate = useNavigate()
    const startTransition = useTransitionStore(s => s.startTransition)

    return (href: string) => {
        startTransition(href, navigate)
    }
}

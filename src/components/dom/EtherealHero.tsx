"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from "@react-three/drei"
import { motion } from "framer-motion"
import { Suspense } from "react"

function AICharacterBrain() {
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh scale={2.5}>
                <sphereGeometry args={[1, 32, 32]} />
                {/* Holographic Brain Material */}
                <MeshDistortMaterial
                    color="#2563eb"
                    envMapIntensity={1}
                    clearcoat={1}
                    clearcoatRoughness={0}
                    metalness={0.1}
                    distort={0.4}
                    speed={2}
                    transparent
                    opacity={0.6}
                />
            </mesh>

            {/* Inner Core */}
            <mesh scale={1.5}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.3} />
            </mesh>
        </Float>
    )
}

export function EtherealHero() {
    return (
        <section className="relative w-full h-screen flex flex-col md:flex-row items-center justify-center p-8 md:p-20 overflow-hidden">

            {/* LEFT: Typography */}
            <div className="w-full md:w-1/2 flex flex-col justify-center z-10 space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">
                        Creative Developer
                    </h2>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.9]">
                        BIKASH<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                            AI_AGENT
                        </span>
                    </h1>
                </motion.div>

                <motion.p
                    className="max-w-md text-muted-foreground text-lg leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    Bridging the gap between human creativity and artificial intelligence.
                    Designing proper digital experiences.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <button className="px-8 py-3 bg-foreground text-background font-bold rounded-full hover:scale-105 transition-transform">
                        EXPLORE BRAIN
                    </button>
                </motion.div>
            </div>

            {/* RIGHT: The Character (Brain Placeholder) */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-full relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-[100px] opacity-50" />

                <Canvas className="w-full h-full" camera={{ position: [0, 0, 5] }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} intensity={1} />
                    <pointLight position={[-5, -5, -5]} color="#2563eb" intensity={2} />

                    <Suspense fallback={null}>
                        <AICharacterBrain />
                    </Suspense>

                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>

                {/* Caption */}
                <div className="absolute bottom-10 right-10 text-right">
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                        AI_BRAIN_CORE // V1.0
                    </p>
                </div>
            </div>

            {/* Background Gradient */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/50 via-background to-background" />

        </section>
    )
}

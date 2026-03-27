import { ReactNode } from "react"
import { Canvas } from "@react-three/fiber"
import { TransitionOverlay } from "@/components/dom/TransitionOverlay"
import { HiringAssistant } from "@/components/dom/HiringAssistant"

export function GlobalUIWrapper({ children }: { children: ReactNode }) {
    return (
        <>
            {/* Global Transition Canvas (Always on top, pointer-events-none) */}
            <div className="fixed inset-0 z-[100] pointer-events-none">
                <Canvas
                    gl={{ alpha: true }}
                    orthographic
                    camera={{ zoom: 1 }}
                    style={{ pointerEvents: 'none' }}
                    events={undefined}
                >
                    <TransitionOverlay />
                </Canvas>
            </div>
            
            <HiringAssistant />
            
            {children}
        </>
    )
}

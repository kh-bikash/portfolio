import { useUIStore } from "@/lib/ui-store"
import { ResumeView } from "@/components/ResumeView"
import { AnimatePresence } from "framer-motion"

import { Canvas } from "@react-three/fiber"
import { TransitionOverlay } from "./dom/TransitionOverlay"

export function GlobalUIWrapper({ children }: { children: React.ReactNode }) {
    const isRecruiterMode = useUIStore((state) => state.isRecruiterMode)

    return (
        <>
            {/* Global Transition Canvas (Always on top, pointer-events-none) */}
            <div className="fixed inset-0 z-[100] pointer-events-none">
                <Canvas
                    gl={{ alpha: true }}
                    orthographic
                    camera={{ zoom: 1 }}
                    style={{ pointerEvents: 'none' }} // Explicitly disable pointer events on the canvas element
                    events={undefined} // Disable R3F event manager entirely for this canvas
                >
                    <TransitionOverlay />
                </Canvas>
            </div>

            {/* Main 3D App (Hidden but preserved or unmounted based on preference) 
          We'll just cover it for now to keep state alive 
      */}
            <div className={isRecruiterMode ? "hidden" : "block"}>
                {children}
            </div>

            <AnimatePresence>
                {isRecruiterMode && <ResumeView />}
            </AnimatePresence>
        </>
    )
}

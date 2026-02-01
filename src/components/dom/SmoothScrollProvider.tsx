"use client"

import { ReactLenis } from '@studio-freight/react-lenis'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis root options={{ duration: 0.6, smoothWheel: true, wheelMultiplier: 1.5, touchMultiplier: 2.5 }}>
            {children}
        </ReactLenis>
    )
}

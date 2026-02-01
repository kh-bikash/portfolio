"use client"

export function PostProcessingOverlay() {
    return (
        <div className="fixed inset-0 z-[150] pointer-events-none select-none">
            {/* NOISE */}
            <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {/* VIGNETTE */}
            <div
                className="absolute inset-0"
                style={{
                    background: "radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.6) 100%)"
                }}
            />

            {/* SCANLINE (Subtle) */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,1) 50%)",
                    backgroundSize: "100% 4px"
                }}
            />
        </div>
    )
}

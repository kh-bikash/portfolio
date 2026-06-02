/**
 * SVG-based cloud layer with pure CSS drift animation.
 * Creates atmospheric depth in the hero section.
 */
export function CloudLayer() {
  return (
    <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
      {/* Upper clouds — slow drift */}
      <div className="absolute top-[10%] left-0 w-[300%] h-[30%] animate-cloud-drift opacity-[0.04]">
        <svg viewBox="0 0 3000 200" className="w-full h-full" preserveAspectRatio="none">
          <path
            fill="#F5F0E8"
            d="M0,200 L0,140 Q100,100 200,130 T450,90 T700,140 T950,80 T1200,120 T1450,100 T1700,140 T1950,80 T2200,130 T2500,90 T2750,120 T3000,140 L3000,200 Z"
          />
        </svg>
      </div>

      {/* Lower clouds — faster, more opacity */}
      <div
        className="absolute top-[25%] left-0 w-[300%] h-[25%] opacity-[0.03]"
        style={{ animation: 'cloud-drift 45s linear infinite' }}
      >
        <svg viewBox="0 0 3000 200" className="w-full h-full" preserveAspectRatio="none">
          <path
            fill="#F5F0E8"
            d="M0,200 L0,120 Q150,60 300,110 T600,70 T900,130 T1200,60 T1500,100 T1800,70 T2100,120 T2400,60 T2700,110 T3000,120 L3000,200 Z"
          />
        </svg>
      </div>
    </div>
  )
}

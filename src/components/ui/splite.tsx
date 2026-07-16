'use client'

import { Suspense, lazy, useEffect, useState } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

function SplineLoader() {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const i = setInterval(() => {
      setDots((d) => (d.length >= 3 ? '' : d + '.'))
    }, 400)
    return () => clearInterval(i)
  }, [])

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-6"
      style={{ background: 'var(--color-walnut-shadow)' }}
    >
      {/* Animated ring loader — warm ember pulse */}
      <div className="relative w-16 h-16">
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: '1px solid var(--color-cork-border)' }}
        />
        <div
          className="absolute inset-0 rounded-full animate-spin"
          style={{
            borderTop: '2px solid var(--color-ember-accent)',
            borderRight: '2px solid transparent',
            borderBottom: '2px solid transparent',
            borderLeft: '2px solid transparent',
            animationDuration: '0.9s',
          }}
        />
        <div
          className="absolute inset-2 rounded-full animate-pulse"
          style={{ background: 'var(--color-bark-brown)', opacity: 0.6 }}
        />
      </div>
      <div className="flex flex-col items-center gap-1">
        <span
          className="text-[11px] uppercase font-medium tracking-wide text-[var(--color-warm-cream)] opacity-70"
          style={{ fontFamily: 'var(--font-halyard-display-variable)' }}
        >
          Initializing 3D{dots}
        </span>
        <span className="text-[9px] uppercase text-[var(--text-muted)]">
          Loading robot model
        </span>
      </div>
    </div>
  )
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense fallback={<SplineLoader />}>
      <Spline scene={scene} className={className} />
    </Suspense>
  )
}

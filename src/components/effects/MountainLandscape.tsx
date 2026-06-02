import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Multi-layered SVG mountain silhouettes with parallax scroll effect.
 * Creates depth through 4 layers moving at different speeds.
 */
export function MountainLandscape() {
  const { scrollYProgress } = useScroll()

  const y1 = useTransform(scrollYProgress, [0, 0.5], [0, 60])
  const y2 = useTransform(scrollYProgress, [0, 0.5], [0, 40])
  const y3 = useTransform(scrollYProgress, [0, 0.5], [0, 25])
  const y4 = useTransform(scrollYProgress, [0, 0.5], [0, 15])

  return (
    <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
      {/* Sky gradient fading into base background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white" />

      {/* Far mountains — lightest grey silhouette */}
      <motion.div style={{ y: y1 }} className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 400" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#E8E8EC"
            d="M0,400 L0,280 Q120,180 240,250 T480,200 T720,260 T960,190 T1200,240 T1440,220 L1440,400 Z"
          />
        </svg>
      </motion.div>

      {/* Mid-far mountains */}
      <motion.div style={{ y: y2 }} className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 350" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#F0F0F3"
            d="M0,350 L0,260 Q100,180 200,230 T400,170 T600,240 T800,190 T1000,230 T1200,180 T1440,250 L1440,350 Z"
          />
        </svg>
      </motion.div>

      {/* Mid mountains — soft warm grey gradient */}
      <motion.div style={{ y: y3 }} className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 300" className="w-full h-auto" preserveAspectRatio="none">
          <defs>
            <linearGradient id="mountain-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F3F3F5" />
              <stop offset="100%" stopColor="#EBEBEF" />
            </linearGradient>
          </defs>
          <path
            fill="url(#mountain-gradient)"
            d="M0,300 L0,220 Q80,150 160,200 T360,160 T540,210 T720,150 T900,200 T1080,160 T1260,220 T1440,190 L1440,300 Z"
          />
        </svg>
      </motion.div>

      {/* Foreground hills — blends directly into page white */}
      <motion.div style={{ y: y4 }} className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 200" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#FFFFFF"
            d="M0,200 L0,160 Q180,120 360,150 T720,130 T1080,155 T1440,140 L1440,200 Z"
          />
        </svg>
      </motion.div>

      {/* Luxury gold Sun glow */}
      <div className="absolute top-[15%] right-[20%] w-24 h-24 rounded-full bg-gradient-to-br from-[#E0CFA6] to-[#B8923F] opacity-[0.12] blur-[30px]" />
      <div className="absolute top-[18%] right-[22%] w-10 h-10 rounded-full bg-[#E0CFA6] opacity-[0.25] blur-[1px]" />
    </div>
  )
}

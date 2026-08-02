import { motion, useScroll, useTransform } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import ShaderBackground from './ShaderBackground'

// Warm porcelain backdrop: a WebGPU/TSL flowing gold sheen base + a faint
// parallax grid + grain. The shader runs only on the home page so it doesn't
// compete for a GPU context with the 3D cap viewer on product pages.
export default function Background() {
  const { scrollYProgress } = useScroll()
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const isHome = useLocation().pathname === '/'

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* CSS fallback base (shows if WebGPU/WebGL is unavailable) */}
      <div className="absolute inset-0 bg-paper" />

      {/* animated WebGPU/TSL sheen (home only) */}
      {isHome && <ShaderBackground />}

      {/* parallax grid */}
      <motion.div style={{ y: gridY }} className="absolute inset-0 opacity-[0.5]">
        <div
          className="h-[140%] w-full"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(120,113,108,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,113,108,0.07) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)',
          }}
        />
      </motion.div>

      {/* soft vignette to keep focus */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(120,113,108,0.10)_100%)]" />
    </div>
  )
}

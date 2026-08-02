import { useState } from 'react'
import { motion, useMotionValue, useSpring, useAnimationFrame } from 'framer-motion'
import { Rotate3d, Hand, Pause } from 'lucide-react'
import Cap from './Cap'

// Interactive cap "model" on a 3D turntable: drag to spin + tilt, or hit
// "360° view" for a continuous rotation that drifts across all three axes.
export default function CapViewer({ crown, accent, size = 320 }) {
  const rzRaw = useMotionValue(0)
  const rxRaw = useMotionValue(26)
  const ryRaw = useMotionValue(0)
  const rotate = useSpring(rzRaw, { stiffness: 90, damping: 16 })
  const rotateX = useSpring(rxRaw, { stiffness: 120, damping: 18 })
  const rotateY = useSpring(ryRaw, { stiffness: 120, damping: 18 })
  const [dragging, setDragging] = useState(false)
  const [auto, setAuto] = useState(false)

  useAnimationFrame((t, delta) => {
    if (auto && !dragging) {
      rzRaw.set(rzRaw.get() + delta * 0.05)
      // gentle drift on the other two axes so it feels fully 3D
      rxRaw.set(26 + Math.sin(t / 1400) * 10)
      ryRaw.set(Math.sin(t / 1100) * 10)
    }
  })

  const onPan = (_, info) => {
    setAuto(false)
    // free rotation: horizontal spins, vertical flips (any orientation)
    rzRaw.set(rzRaw.get() + info.delta.x * 0.6)
    rxRaw.set(Math.max(-180, Math.min(180, rxRaw.get() - info.delta.y * 0.5)))
  }

  const capPx = Math.round(size * 0.78)
  const grid =
    'linear-gradient(to right, rgba(184,134,11,0.28) 1px, transparent 1px), linear-gradient(to bottom, rgba(184,134,11,0.28) 1px, transparent 1px)'

  return (
    <div className="flex flex-col items-center gap-5">
      <div
        className="relative grid place-items-center overflow-hidden rounded-2xl"
        style={{ width: size, height: size, perspective: 900 }}
      >
        {/* 3D grid floor */}
        <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center" style={{ perspective: '600px' }}>
          <div
            style={{
              width: size * 1.05,
              height: size * 0.62,
              transform: 'rotateX(70deg)',
              transformOrigin: 'center bottom',
              backgroundImage: grid,
              backgroundSize: '26px 26px',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 25%, transparent 72%)',
              maskImage: 'radial-gradient(ellipse at center, black 25%, transparent 72%)',
              opacity: 0.55,
            }}
          />
        </div>

        {/* glow */}
        <div className="absolute inset-10 rounded-full bg-gradient-to-tr from-gold/15 to-transparent blur-3xl" />

        <motion.div
          onPanStart={() => setDragging(true)}
          onPanEnd={() => setDragging(false)}
          onPan={onPan}
          style={{ rotate, rotateX, rotateY, transformStyle: 'preserve-3d', cursor: dragging ? 'grabbing' : 'grab' }}
          className="relative touch-none"
        >
          <Cap crown={crown} accent={accent} style={{ width: capPx }} className="drop-shadow-[0_22px_30px_rgba(28,25,23,0.3)]" />
        </motion.div>

        <motion.div
          animate={{ opacity: dragging || auto ? 0 : 1 }}
          className="pointer-events-none absolute bottom-2 flex items-center gap-1.5 rounded-full bg-stone-900 px-3 py-1 text-xs text-paper"
        >
          <Hand size={12} /> Drag to rotate
        </motion.div>
      </div>

      <button
        onClick={() => setAuto((v) => !v)}
        className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
          auto
            ? 'border-stone-900 bg-stone-900 text-paper'
            : 'border-stone-300 bg-white text-stone-700 hover:border-gold/60 hover:text-gold-dark'
        }`}
      >
        {auto ? <><Pause size={15} /> Stop spinning</> : <><Rotate3d size={16} /> 360° view</>}
      </button>
    </div>
  )
}

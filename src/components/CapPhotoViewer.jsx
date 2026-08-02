import { useState } from 'react'
import { motion, useMotionValue, useSpring, useAnimationFrame } from 'framer-motion'
import { Rotate3d, Hand, Pause } from 'lucide-react'

// Improvised 360 from two real photos: a 3D flip-card. Front = the cap from
// above, back = the underside. Drag or hit "Spin" to turn it over.
export default function CapPhotoViewer({
  top = '/caps/cap-top.webp',
  under = '/caps/cap-under.webp',
  size = 360,
}) {
  const ryRaw = useMotionValue(-12)
  const rxRaw = useMotionValue(6)
  const rotateY = useSpring(ryRaw, { stiffness: 90, damping: 16 })
  const rotateX = useSpring(rxRaw, { stiffness: 120, damping: 18 })
  const [dragging, setDragging] = useState(false)
  const [auto, setAuto] = useState(false)

  useAnimationFrame((_, delta) => {
    if (auto && !dragging) ryRaw.set(ryRaw.get() + delta * 0.06)
  })

  const onPan = (_, info) => {
    setAuto(false)
    ryRaw.set(ryRaw.get() + info.delta.x * 0.7)
    rxRaw.set(Math.max(-40, Math.min(40, rxRaw.get() - info.delta.y * 0.3)))
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative grid place-items-center" style={{ width: size, height: size, perspective: 1100 }}>
        <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-gold/15 to-transparent blur-3xl" />
        <motion.div
          onPanStart={() => setDragging(true)}
          onPanEnd={() => setDragging(false)}
          onPan={onPan}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d', width: size * 0.86, height: size * 0.86, cursor: dragging ? 'grabbing' : 'grab' }}
          className="relative touch-none"
        >
          <img
            src={top}
            alt="Cap from above"
            className="absolute inset-0 h-full w-full rounded-3xl object-cover shadow-[0_30px_50px_rgba(28,25,23,0.35)]"
            style={{ backfaceVisibility: 'hidden' }}
            draggable={false}
          />
          <img
            src={under}
            alt="Cap underside"
            className="absolute inset-0 h-full w-full rounded-3xl object-cover shadow-[0_30px_50px_rgba(28,25,23,0.35)]"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            draggable={false}
          />
        </motion.div>

        <motion.div
          animate={{ opacity: dragging || auto ? 0 : 1 }}
          className="pointer-events-none absolute bottom-1 flex items-center gap-1.5 rounded-full bg-stone-900 px-3 py-1 text-xs text-paper"
        >
          <Hand size={12} /> Drag to turn it over
        </motion.div>
      </div>

      <button
        onClick={() => setAuto((v) => !v)}
        className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
          auto ? 'border-stone-900 bg-stone-900 text-paper' : 'border-stone-300 bg-white text-stone-700 hover:border-gold/60 hover:text-gold-dark'
        }`}
      >
        {auto ? <><Pause size={15} /> Stop spinning</> : <><Rotate3d size={16} /> 360° view</>}
      </button>
    </div>
  )
}

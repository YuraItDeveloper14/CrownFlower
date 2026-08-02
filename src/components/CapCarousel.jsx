import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Cap from './Cap'
import Cap3D from './Cap3D'

// Two-slide viewer: slide 1 = the flat front view (SVG), slide 2 = the
// interactive 3D cap. Arrows + dots to switch. Cap3D only mounts on its slide.
export default function CapCarousel({ crown, accent, size = 360 }) {
  const [i, setI] = useState(0)
  const go = (d) => setI((p) => (p + d + 2) % 2)

  return (
    <div className="relative w-full">
      <div className="relative mx-auto" style={{ height: size + 64, maxWidth: size + 40 }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 grid place-items-center"
          >
            {i === 0 ? (
              <div className="flex flex-col items-center gap-4">
                <div style={{ width: size * 0.78, perspective: 600 }}>
                  <div style={{ transform: 'rotateX(28deg)' }}>
                    <Cap crown={crown} accent={accent} className="w-full drop-shadow-[0_22px_30px_rgba(28,25,23,0.22)]" />
                  </div>
                </div>
                <p className="text-sm text-stone-500">Front view</p>
              </div>
            ) : (
              <Cap3D crown={crown} accent={accent} size={size} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* arrows */}
        <button
          onClick={() => go(-1)}
          aria-label="Previous"
          className="absolute left-0 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-sm transition-all hover:border-gold/50 hover:text-gold-dark"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next"
          className="absolute right-0 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-sm transition-all hover:border-gold/50 hover:text-gold-dark"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* dots */}
      <div className="mt-2 flex items-center justify-center gap-2">
        {[0, 1].map((d) => (
          <button
            key={d}
            onClick={() => setI(d)}
            aria-label={d === 0 ? 'Front view' : '3D view'}
            className={`h-2 rounded-full transition-all ${i === d ? 'w-6 bg-gold' : 'w-2 bg-stone-300 hover:bg-stone-400'}`}
          />
        ))}
      </div>
    </div>
  )
}

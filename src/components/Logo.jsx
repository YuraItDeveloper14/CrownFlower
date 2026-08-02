import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// CROWNFLOWER mark: a gold lotus with a crown nestled in its centre.
// On hover the bloom lifts, the wordmark turns gold, and a few sparkles pop.
const SPARKS = Array.from({ length: 10 }, (_, i) => {
  const a = (i / 10) * Math.PI * 2
  return { x: Math.cos(a) * (20 + Math.random() * 10), y: Math.sin(a) * (20 + Math.random() * 10) }
})

const petalOuter = 'M32 30 C22 22 22 8 32 0 C42 8 42 22 32 30 Z'
const petalInner = 'M32 30 C26 25 26 14 32 8 C38 14 38 25 32 30 Z'

export default function Logo({ className = '' }) {
  const [burst, setBurst] = useState(0)

  return (
    <motion.div
      whileHover="hover"
      onHoverStart={() => setBurst((b) => b + 1)}
      className={`group flex items-center gap-2.5 ${className}`}
    >
      <div className="relative grid h-10 w-10 place-items-center">
        <AnimatePresence>
          {burst > 0 && (
            <div key={burst} className="pointer-events-none absolute inset-0 grid place-items-center">
              {SPARKS.map((s, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], x: s.x, y: s.y, scale: [0, 1, 0.3] }}
                  transition={{ duration: 0.75, ease: 'easeOut' }}
                  className="absolute h-1.5 w-1.5 rounded-full bg-gold"
                  style={{ boxShadow: '0 0 6px rgba(184,134,11,0.9)' }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        <motion.svg
          viewBox="0 0 64 70"
          className="h-9 w-9"
          variants={{ hover: { scale: 1.1, y: -1 } }}
          transition={{ type: 'spring', stiffness: 300, damping: 12 }}
        >
          <defs>
            <linearGradient id="cfGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f0d98a" />
              <stop offset="55%" stopColor="#d6a85a" />
              <stop offset="100%" stopColor="#a87c2e" />
            </linearGradient>
          </defs>

          {/* stem */}
          <path d="M32 38 C32 50 28 56 31 66" stroke="#a87c2e" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M31 56 q9 -2 12 -9" stroke="#a87c2e" strokeWidth="2.4" fill="none" strokeLinecap="round" />

          {/* outer petals */}
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={`o${i}`}
              transform={`rotate(${i * 72} 32 30)`}
              d={petalOuter}
              fill="url(#cfGold)"
              stroke="#8a6508"
              strokeWidth="1.1"
              strokeLinejoin="round"
            />
          ))}
          {/* inner petals */}
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={`i${i}`}
              transform={`rotate(${36 + i * 72} 32 30)`}
              d={petalInner}
              fill="#ecca85"
              stroke="#8a6508"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
          ))}

          {/* crown nestled in the centre */}
          <path d="M23 33 L25 23 L29 29 L32 20 L35 29 L39 23 L41 33 Z" fill="url(#cfGold)" stroke="#8a6508" strokeWidth="1.1" strokeLinejoin="round" />
          <rect x="22" y="31" width="20" height="5" rx="1.6" fill="#c9a23e" stroke="#8a6508" strokeWidth="0.9" />
          <circle cx="32" cy="20" r="1.7" fill="#b3122f" />
        </motion.svg>
      </div>

      <span className="font-display text-sm font-extrabold leading-none tracking-[0.14em] sm:text-base">
        <motion.span variants={{ hover: { color: '#b8860b' } }} className="text-stone-900">CROWN</motion.span>
        <motion.span variants={{ hover: { color: '#e0b84d' } }} className="text-gold-dark">FLOWER</motion.span>
      </span>
    </motion.div>
  )
}

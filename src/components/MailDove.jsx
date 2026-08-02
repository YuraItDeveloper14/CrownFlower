import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail } from 'lucide-react'

// Contact flourish: a floating envelope with pulsing signal rings. Hover it and
// a little carrier dove flaps out and flies off — "we'll write back".
export default function MailDove() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative grid h-64 w-full place-items-center overflow-hidden rounded-3xl border border-stone-200 bg-white/50"
    >
      {/* pulsing signal rings */}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border border-gold/40"
          initial={{ width: 70, height: 70, opacity: 0.5 }}
          animate={{ width: 200, height: 200, opacity: 0 }}
          transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.85, ease: 'easeOut' }}
        />
      ))}

      {/* envelope */}
      <motion.span
        className="relative z-10 grid h-16 w-16 place-items-center rounded-2xl bg-stone-900 text-paper shadow-lg shadow-stone-400/40"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Mail size={26} />
      </motion.span>

      {/* carrier dove flies out on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.svg
            key="dove"
            viewBox="0 0 60 48"
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 w-14"
            initial={{ x: -28, y: -10, opacity: 0, rotate: 0, scale: 0.6 }}
            animate={{ x: [-28, 40, 150], y: [-10, -50, -110], opacity: [0, 1, 1, 0], rotate: [0, -12, -20], scale: [0.6, 1, 1] }}
            transition={{ duration: 1.7, ease: 'easeOut', times: [0, 0.35, 0.7, 1] }}
          >
            {/* tail */}
            <path d="M6 26 L18 22 L16 31 Z" fill="#fff" stroke="#d6d3d1" strokeWidth="1" strokeLinejoin="round" />
            {/* body */}
            <path d="M14 29 Q28 19 44 25 Q32 35 16 33 Z" fill="#fff" stroke="#d6d3d1" strokeWidth="1" strokeLinejoin="round" />
            {/* head */}
            <circle cx="43" cy="23" r="5.5" fill="#fff" stroke="#d6d3d1" strokeWidth="1" />
            <circle cx="45" cy="22" r="0.9" fill="#44403c" />
            {/* beak */}
            <path d="M48 22 L55 22 L49 26 Z" fill="#d6a85a" />
            {/* flapping wing */}
            <motion.path
              d="M22 27 Q30 8 46 16 Q34 28 22 27 Z"
              fill="#fff"
              stroke="#d6d3d1"
              strokeWidth="1"
              strokeLinejoin="round"
              style={{ transformOrigin: '24px 27px' }}
              animate={{ rotate: [0, -34, 0, -34, 0] }}
              transition={{ duration: 0.45, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.svg>
        )}
      </AnimatePresence>

      <p className="absolute bottom-4 font-display text-sm italic text-stone-500">
        A real human writes back — hover me 🕊️
      </p>
    </div>
  )
}

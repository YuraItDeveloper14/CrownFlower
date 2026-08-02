import { useState } from 'react'
import { motion } from 'framer-motion'
import Cap from './Cap'

// Shows the flower cap; on hover it cross-fades into a gold crown.
export default function HoverCrownCap({ crown = '#1b1a22', accent = '#e8c98a', className = '' }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`relative cursor-pointer ${className}`}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      style={{ perspective: 600 }}
    >
      {/* flower cap */}
      <motion.div
        animate={{ opacity: hovered ? 0 : 1, scale: hovered ? 0.85 : 1 }}
        transition={{ duration: 0.3 }}
        style={{ transform: 'rotateX(34deg)' }}
      >
        <Cap crown={crown} accent={accent} className="w-full drop-shadow-[0_20px_28px_rgba(28,25,23,0.22)]" />
      </motion.div>

      {/* crown reveal */}
      <motion.div
        className="absolute inset-0 grid place-items-center"
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8, y: hovered ? 0 : 16 }}
        transition={{ type: 'spring', stiffness: 240, damping: 18 }}
      >
        <svg viewBox="0 0 120 96" className="w-3/4 drop-shadow-[0_18px_26px_rgba(28,25,23,0.25)]">
          <path
            d="M14 84 L22 30 L46 58 L60 16 L74 58 L98 30 L106 84 Z"
            fill="#e0b84d"
            stroke="#8a6508"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <rect x="12" y="80" width="96" height="13" rx="4" fill="#c9a23e" stroke="#8a6508" strokeWidth="2.5" />
          <circle cx="22" cy="30" r="6" fill="#fff3cf" stroke="#8a6508" strokeWidth="2" />
          <circle cx="98" cy="30" r="6" fill="#fff3cf" stroke="#8a6508" strokeWidth="2" />
          <circle cx="60" cy="16" r="8" fill="#b3122f" stroke="#7a0c20" strokeWidth="2" />
        </svg>
      </motion.div>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

// A little character wearing a CROWNFLOWER cap. The head tilts and the eyes
// follow the cursor. Hover him and his cap turns into a golden crown.
export default function CursorMascot({ crown = '#1c1917', accent = '#b8860b', className = '' }) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)

  const dx = useMotionValue(0)
  const dy = useMotionValue(0)

  const tilt = useSpring(useTransform(dx, [-600, 600], [-14, 14]), { stiffness: 120, damping: 14 })
  const nodY = useSpring(useTransform(dy, [-400, 400], [-6, 8]), { stiffness: 120, damping: 14 })
  const pupilX = useSpring(useTransform(dx, [-600, 600], [-5, 5]), { stiffness: 200, damping: 18 })
  const pupilY = useSpring(useTransform(dy, [-400, 400], [-4, 5]), { stiffness: 200, damping: 18 })

  const blink = useMotionValue(1)
  useEffect(() => {
    let alive = true
    const loop = () => {
      if (!alive) return
      blink.set(0.1)
      setTimeout(() => blink.set(1), 130)
      setTimeout(loop, 2500 + Math.random() * 3500)
    }
    const t = setTimeout(loop, 2000)
    return () => { alive = false; clearTimeout(t) }
  }, [blink])

  useEffect(() => {
    const onMove = (e) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      dx.set(clamp(e.clientX - (r.left + r.width / 2), -600, 600))
      dy.set(clamp(e.clientY - (r.top + r.height / 2), -400, 400))
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [dx, dy])

  return (
    <div
      ref={ref}
      className={`cursor-pointer ${className}`}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <motion.svg
        viewBox="0 0 220 240"
        className="w-full"
        style={{ rotate: tilt, y: nodY }}
        animate={{ translateY: [0, -6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* shoulders */}
        <path d="M40 240 C40 196 78 176 110 176 C142 176 180 196 180 240 Z" fill={crown} opacity="0.92" />
        <path d="M110 176 c-10 0 -18 -6 -18 -6 l0 14 c0 6 8 10 18 10 s18 -4 18 -10 l0 -14 s-8 6 -18 6Z" fill="#e8c9a0" />

        {/* waving arm — waves a few times on appearance */}
        <motion.g
          style={{ transformOrigin: '170px 206px' }}
          initial={{ rotate: -6 }}
          animate={{ rotate: [-6, -30, -8, -30, -8, -22] }}
          transition={{ duration: 1.9, delay: 0.5, ease: 'easeInOut', times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
        >
          <path d="M168 206 L198 158" stroke={crown} strokeOpacity="0.92" strokeWidth="17" strokeLinecap="round" />
          <circle cx="201" cy="152" r="13" fill="#f0d2a8" />
        </motion.g>

        {/* head */}
        <ellipse cx="110" cy="118" rx="58" ry="60" fill="#f0d2a8" />
        <ellipse cx="110" cy="118" rx="58" ry="60" fill="url(#shade)" opacity="0.25" />
        <circle cx="52" cy="120" r="9" fill="#e8c298" />
        <circle cx="168" cy="120" r="9" fill="#e8c298" />

        {/* eyes */}
        <ellipse cx="88" cy="116" rx="13" ry="15" fill="#fff" />
        <ellipse cx="132" cy="116" rx="13" ry="15" fill="#fff" />
        <motion.g style={{ x: pupilX, y: pupilY }}>
          <circle cx="88" cy="118" r="6.5" fill="#1c1917" />
          <circle cx="132" cy="118" r="6.5" fill="#1c1917" />
          <circle cx="90" cy="115" r="2" fill="#fff" />
          <circle cx="134" cy="115" r="2" fill="#fff" />
        </motion.g>
        <motion.rect x="74" y="100" width="28" height="32" rx="13" fill="#f0d2a8" style={{ scaleY: blink, transformOrigin: '88px 116px' }} />
        <motion.rect x="118" y="100" width="28" height="32" rx="13" fill="#f0d2a8" style={{ scaleY: blink, transformOrigin: '132px 116px' }} />

        {/* nose + smile */}
        <path d="M110 124 q4 8 -2 12" stroke="#c98f63" strokeWidth="3" fill="none" strokeLinecap="round" />
        <motion.path
          d="M96 146 q14 14 28 0"
          animate={{ d: hovered ? 'M94 144 q16 20 32 0' : 'M96 146 q14 14 28 0' }}
          stroke="#a8674a" strokeWidth="3.5" fill="none" strokeLinecap="round"
        />

        {/* headwear: clean flower cap — 3 visors in front, 3 barely visible
            behind the crown, gold button on top. Cross-fades to a crown on hover */}
        <motion.g animate={{ opacity: hovered ? 0 : 1, y: hovered ? -6 : 0 }} transition={{ duration: 0.25 }}>
          {/* 3 front visors only (bigger, rounded — matching the viewer) */}
          <path d="M48 89 Q72 116 96 89 Q110 116 124 89 Q148 116 172 89 Q110 80 48 89 Z" fill={crown} />
          {/* crown dome */}
          <path d="M50 92 C50 50 78 36 110 36 C142 36 170 50 170 92 Z" fill={crown} />
          <path d="M110 36 C142 36 170 50 170 92 L140 92 C140 52 128 40 110 38 Z" fill="#000" opacity="0.18" />
          {/* gold button on top (clean — no emblem) */}
          <circle cx="110" cy="38" r="6.5" fill="#e0b84d" stroke="rgba(0,0,0,0.25)" />
          <circle cx="108" cy="36" r="2" fill="rgba(255,255,255,0.6)" />
        </motion.g>

        <motion.g
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -10, scale: hovered ? 1 : 0.85 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          style={{ transformOrigin: '110px 90px' }}
        >
          <path d="M58 94 L66 54 L88 80 L110 44 L132 80 L154 54 L162 94 Z" fill="#e0b84d" stroke="#8a6508" strokeWidth="2" strokeLinejoin="round" />
          <rect x="56" y="90" width="108" height="14" rx="4" fill="#c9a23e" stroke="#8a6508" strokeWidth="1.5" />
          <circle cx="66" cy="54" r="4.5" fill="#fff3cf" stroke="#8a6508" strokeWidth="1" />
          <circle cx="154" cy="54" r="4.5" fill="#fff3cf" stroke="#8a6508" strokeWidth="1" />
          <circle cx="110" cy="44" r="6" fill="#b3122f" stroke="#7a0c20" strokeWidth="1" />
          <circle cx="86" cy="97" r="2.5" fill="#fff3cf" />
          <circle cx="110" cy="97" r="2.5" fill="#b3122f" />
          <circle cx="134" cy="97" r="2.5" fill="#fff3cf" />
        </motion.g>

        <defs>
          <radialGradient id="shade" cx="0.35" cy="0.3" r="0.8">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
        </defs>
      </motion.svg>
    </div>
  )
}

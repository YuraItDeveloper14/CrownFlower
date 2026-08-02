import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Star, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import CursorMascot from './CursorMascot'

const fade = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 110])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <section ref={ref} id="top" className="relative px-5 pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        {/* Copy */}
        <motion.div style={{ y: textY }} className="text-center lg:text-left">
          <motion.p
            variants={fade}
            initial="hidden"
            animate="show"
            custom={0}
            className="mb-3 font-display text-sm uppercase tracking-[0.32em] text-gold-dark"
          >
            Wear Your Crown
          </motion.p>
          <motion.span
            variants={fade}
            initial="hidden"
            animate="show"
            custom={0}
            className="glass mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-stone-600 lg:mx-0"
          >
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} className="fill-gold text-gold" />
              ))}
            </span>
            4.9/5 from 3,200+ reviews
          </motion.span>

          <motion.h1
            variants={fade}
            initial="hidden"
            animate="show"
            custom={1}
            className="text-balance font-display text-5xl font-bold leading-[1.04] tracking-tight text-stone-900 sm:text-6xl md:text-7xl"
          >
            Caps crafted to{' '}
            <span className="relative whitespace-nowrap italic text-gold-dark ink-underline">
              outlast trends
            </span>
          </motion.h1>

          <motion.p
            variants={fade}
            initial="hidden"
            animate="show"
            custom={2}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-stone-600 lg:mx-0"
          >
            We make premium headwear in small, numbered runs — heavyweight cotton
            twill, hand-finished stitching, and a fit dialed in to the millimeter.
            Made to be worn for years, not seasons.
          </motion.p>

          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
          >
            <Link to="/shop" className="btn-primary w-full sm:w-auto">
              Shop the collection
              <ArrowRight size={18} />
            </Link>
            <Link to="/about" className="btn-ghost w-full sm:w-auto">
              Our craft
            </Link>
          </motion.div>

          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-7 flex items-center justify-center gap-2 text-sm text-stone-600 lg:justify-start"
          >
            <Truck size={16} className="text-gold" />
            Free worldwide shipping over $80 · 30-day returns
          </motion.div>
        </motion.div>

        {/* Mascot showcase */}
        <motion.div
          style={{ y: visualY }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          {/* glow so the cap sits in the page */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(214,168,90,0.18),transparent_65%)] blur-2xl" />

          {/* character — hover him and his cap turns into a crown */}
          <div className="relative mx-auto w-72 sm:w-80">
            <CursorMascot className="w-full drop-shadow-[0_24px_40px_rgba(28,25,23,0.18)]" />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="mt-3 text-center font-display text-sm italic text-stone-500"
            >
              psst — hover him, every head deserves a crown 👑
            </motion.p>
          </div>

          {/* floating tags */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute -right-2 top-4 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-left shadow-lg md:right-0"
          >
            <p className="text-xs text-stone-600">The Heritage 6-Panel</p>
            <p className="font-display text-xl font-bold text-stone-900">$64</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.15, duration: 0.6 }}
            className="absolute -left-2 bottom-16 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-left shadow-lg md:left-0"
          >
            <p className="text-xs text-stone-600">Limited run</p>
            <p className="font-display text-xl font-bold text-gold-dark">№ 250</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'
import SectionHeader from './SectionHeader'
import Cap from './Cap'
import CapModal from './CapModal'
import { products } from '../data/products'

// Editorial gallery — asymmetric tiles. Click any tile to open the
// rotatable cap modal.
const scenes = [
  { slug: 'heritage-6-panel', sub: 'City evenings', bg: 'from-stone-200 to-stone-100', span: 'sm:col-span-2 sm:row-span-2', h: 'h-full min-h-[22rem]' },
  { slug: 'dune-structured', sub: 'Coastal days', bg: 'from-amber-100 to-stone-100', span: '', h: 'h-44' },
  { slug: 'olive-field', sub: 'Off the trail', bg: 'from-lime-100 to-stone-100', span: '', h: 'h-44' },
  { slug: 'bordeaux-wool', sub: 'After hours', bg: 'from-rose-100 to-stone-100', span: 'sm:col-span-2', h: 'h-44' },
]

export default function Lookbook() {
  const [active, setActive] = useState(null)
  const tiles = scenes.map((s) => ({ ...s, product: products.find((p) => p.slug === s.slug) }))

  return (
    <section id="lookbook" className="relative px-5 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          title="One cap, every chapter of your day"
          subtitle="From morning commutes to late nights — tap a colorway to spin it around."
        />

        <div className="mt-14 grid auto-rows-[11rem] grid-cols-2 gap-4 sm:grid-cols-4">
          {tiles.map((t, i) => (
            <motion.button
              key={t.slug}
              onClick={() => setActive(t.product)}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className={`group relative overflow-hidden rounded-3xl border border-stone-200 bg-gradient-to-br text-left ${t.bg} ${t.span}`}
            >
              <div className={`relative flex ${t.h} items-center justify-center p-6`}>
                <motion.div
                  whileHover={{ scale: 1.12, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 14 }}
                  className="w-40"
                >
                  <Cap crown={t.product.crown} accent={t.product.accent} className="w-full drop-shadow-[0_16px_26px_rgba(28,25,23,0.22)]" />
                </motion.div>
              </div>
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-stone-900/55 to-transparent p-5">
                <span>
                  <span className="block font-display text-lg font-bold text-white">{t.product.color}</span>
                  <span className="block text-xs text-white/80">{t.sub}</span>
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-medium text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                  <Eye size={13} /> View
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <CapModal product={active} onClose={() => setActive(null)} />
    </section>
  )
}

import { motion } from 'framer-motion'
import { Scissors, Ruler, Leaf, ShieldCheck, Award, Recycle } from 'lucide-react'
import HoverCrownCap from './HoverCrownCap'

const features = [
  { icon: Scissors, title: 'Hand-finished stitching', text: 'Every panel is sewn and inspected by hand — no loose threads, no shortcuts.' },
  { icon: Ruler, title: 'Dialed-in fit', text: 'A refined crown profile and metal-clasp strap for a precise fit on any head.' },
  { icon: Leaf, title: 'Heavyweight materials', text: '12oz organic cotton twill and wool blends that hold shape and age beautifully.' },
  { icon: ShieldCheck, title: 'Built to last', text: 'Reinforced eyelets, structured brim, and colorfast dyes that survive everything.' },
  { icon: Award, title: 'Numbered runs', text: 'Small, numbered batches — when a run sells out, it’s gone for good.' },
  { icon: Recycle, title: 'Responsibly made', text: 'Low-impact dyes, recycled packaging, and a take-back program.' },
]

export default function Craft() {
  return (
    <section id="craft" className="relative px-5 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
        {/* left — sticky statement + cap */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-balance font-display text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
            Six obsessions, <span className="italic text-gold-dark">one</span> cap
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-stone-600">
            A great cap is the sum of small decisions. We sweat every one — from the
            weight of the twill to the click of the clasp — so the one you reach for
            is the one that lasts.
          </p>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-10 hidden w-80 lg:block"
          >
            <HoverCrownCap crown="#1b1a22" accent="#e8c98a" className="w-full" />
          </motion.div>
        </div>

        {/* right — numbered craft list */}
        <ol className="relative">
          {features.map((f, i) => (
            <motion.li
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
              className="flex gap-5 border-b border-stone-200 py-6 first:pt-0"
            >
              <span className="font-display text-sm font-bold text-gold-dark/70">
                0{i + 1}
              </span>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber-50 ring-1 ring-gold/20">
                <f.icon size={20} className="text-gold-dark" />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-stone-900">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-stone-600">{f.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

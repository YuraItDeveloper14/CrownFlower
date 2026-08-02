import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Craft from '../components/Craft'
import Newsletter from '../components/Newsletter'
import PageTransition from '../components/PageTransition'
import Cap3D from '../components/Cap3D'

const stats = [
  { value: '2019', label: 'Founded in Lviv' },
  { value: '40k', label: 'Caps shipped' },
  { value: '120', label: 'Smallest run' },
  { value: '4.9/5', label: 'Avg. rating' },
]

export default function About() {
  return (
    <PageTransition>
      <section className="relative px-5 pt-36 pb-16 md:pt-44">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow">Our story</span>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-stone-900 sm:text-5xl md:text-6xl">
              Headwear made the <span className="italic text-gold-dark">slow</span> way
            </h1>
            <p className="mt-6 leading-relaxed text-stone-600">
              CROWNFLOWER started with a simple frustration: caps that looked great for a
              month, then sagged, faded, or fell apart. So we set out to make the
              opposite — headwear built like heirlooms.
            </p>
            <p className="mt-4 leading-relaxed text-stone-600">
              We work in small, numbered runs with a tight circle of makers,
              choosing heavyweight fabrics and finishing every cap by hand. No fast
              fashion, no throwaway seasons — just caps you'll reach for year after
              year.
            </p>
            <Link to="/shop" className="btn-primary mt-8">
              Shop the collection <ArrowRight size={18} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative mx-auto w-full max-w-md"
          >
            <Cap3D crown="#4a1f29" accent="#e8c98a" size={360} />
          </motion.div>
        </div>

        {/* stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-6 rounded-2xl border border-stone-200 bg-white p-8 shadow-sm md:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-extrabold text-gold-dark">{s.value}</p>
              <p className="mt-1 text-xs text-stone-600">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      <Craft />

      {/* Founder's note — a human, hand-signed touch */}
      <section className="relative px-5 pb-8">
        <div className="mx-auto max-w-3xl">
          <motion.figure
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl border border-stone-200 bg-white p-8 shadow-sm md:p-12"
          >
            <span className="absolute left-8 top-4 font-display text-7xl leading-none text-gold/25">“</span>
            <blockquote className="relative font-display text-xl italic leading-relaxed text-stone-700 md:text-2xl">
              I still inspect the first cap of every run myself. If it isn't something
              I'd happily wear for the next five years, it doesn't ship. That's the
              whole promise — nothing more complicated than that.
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-stone-900 font-display text-lg font-bold text-paper">A</span>
              <div>
                <p className="font-display text-2xl italic text-stone-900" style={{ transform: 'rotate(-3deg)' }}>Andrii K.</p>
                <p className="text-sm text-stone-600">Founder &amp; head of make</p>
              </div>
            </figcaption>
          </motion.figure>
        </div>
      </section>

      <Newsletter />
    </PageTransition>
  )
}

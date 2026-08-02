import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import SectionHeader from './SectionHeader'

const testimonials = [
  { quote: 'Best cap I’ve ever owned, full stop. The fit is perfect and after a year of daily wear it still looks brand new.', name: 'Sarah Chen', role: 'Verified buyer · Midnight 6-Panel', initials: 'SC' },
  { quote: 'You can feel the quality the second you pick it up. Heavy, structured, and the stitching is flawless.', name: 'Marcus Reed', role: 'Verified buyer · Olive Field Cap', initials: 'MR' },
  { quote: 'I bought the Sand one and immediately ordered two more. The numbered tag is such a nice touch.', name: 'Priya Nair', role: 'Verified buyer · Dune Structured', initials: 'PN' },
  { quote: 'Shipping was fast and the packaging felt premium. This is how you do a brand right.', name: 'Daniel Okoye', role: 'Verified buyer · Bordeaux Wool', initials: 'DO' },
  { quote: 'Finally a cap that fits my head without looking bulky. The strap adjustment is so smooth.', name: 'Elena Rossi', role: 'Verified buyer · Ivory Minimal', initials: 'ER' },
  { quote: 'Wore it hiking, wore it to dinner. Holds its shape, never fades. Worth every penny.', name: 'Tom Häkkinen', role: 'Verified buyer · Slate Performance', initials: 'TH' },
]

const stats = [
  { value: '3,200+', label: 'Five-star reviews' },
  { value: '40k', label: 'Caps shipped worldwide' },
  { value: '4.9/5', label: 'Average rating' },
  { value: '30-day', label: 'Easy returns' },
]

export default function Testimonials() {
  return (
    <section id="reviews" className="relative px-5 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          title="Worn and loved everywhere"
          subtitle="Real words from people who reach for their CROWNFLOWER every single day."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-6 rounded-2xl border border-stone-200 bg-white p-8 shadow-sm md:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-extrabold text-gold-dark">{s.value}</p>
              <p className="mt-1 text-xs text-stone-600">{s.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="mt-12 columns-1 gap-6 md:columns-2 lg:columns-3 [&>*]:mb-6">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -6 }}
              className="relative break-inside-avoid rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg hover:shadow-stone-300/40"
            >
              <Quote size={28} className="text-gold/30" />
              <div className="mb-3 mt-1 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} size={15} className="fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed text-stone-700">“{t.quote}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-gold-light to-gold-dark text-sm font-bold text-white">
                  {t.initials}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-stone-900">{t.name}</span>
                  <span className="block text-xs text-stone-600">{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

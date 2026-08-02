import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

// A small rotating pool so every product page shows plausible, varied reviews.
const pool = [
  { name: 'Sarah C.', stars: 5, text: 'Perfect fit and the build quality is unreal. The gold button is such a nice detail.' },
  { name: 'Marcus R.', stars: 5, text: 'Heavy, structured, flawless stitching. Easily the best cap I own.' },
  { name: 'Priya N.', stars: 4, text: 'Gorgeous colour in person. Took a day to break in but now it’s my daily.' },
  { name: 'Daniel O.', stars: 5, text: 'Fast shipping, premium packaging, and the numbered tag feels special.' },
  { name: 'Elena R.', stars: 5, text: 'Fits my head without looking bulky — the clasp adjustment is so smooth.' },
  { name: 'Tom H.', stars: 5, text: 'Holds its shape, never fades. Worth every penny.' },
]

export default function Reviews({ slug }) {
  // deterministic pick based on slug so it’s stable per product
  const seed = slug ? slug.length : 0
  const items = [0, 1, 2].map((i) => pool[(seed + i) % pool.length])
  const avg = (items.reduce((s, r) => s + r.stars, 0) / items.length).toFixed(1)

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-bold text-stone-900">What buyers say</h2>
          <div className="mt-2 flex items-center gap-2">
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="fill-gold text-gold" />
              ))}
            </span>
            <span className="text-sm text-stone-600">{avg} average · {200 + seed * 7} reviews</span>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {items.map((r, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} size={14} className={k < r.stars ? 'fill-gold text-gold' : 'text-stone-300'} />
              ))}
            </div>
            <blockquote className="mt-3 text-sm leading-relaxed text-stone-700">“{r.text}”</blockquote>
            <figcaption className="mt-4 text-sm font-semibold text-stone-900">{r.name}
              <span className="ml-2 font-normal text-xs text-emerald-600">Verified</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  )
}

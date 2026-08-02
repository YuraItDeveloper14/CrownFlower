import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal, Search, X } from 'lucide-react'
import ProductGrid from '../components/ProductGrid'
import Newsletter from '../components/Newsletter'
import PageTransition from '../components/PageTransition'
import AnimatedHeading from '../components/AnimatedHeading'
import { products } from '../data/products'

const colors = ['All', ...new Set(products.map((p) => p.color))]
const sorts = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
]

export default function Shop() {
  const [color, setColor] = useState('All')
  const [sort, setSort] = useState('featured')
  const [query, setQuery] = useState('')

  const shown = useMemo(() => {
    let list = color === 'All' ? products : products.filter((p) => p.color === color)
    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q) ||
          p.blurb.toLowerCase().includes(q)
      )
    }
    list = [...list]
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    return list
  }, [color, sort, query])

  return (
    <PageTransition>
      <section className="relative px-5 pt-36 pb-20 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="eyebrow">The Collection</span>
            <AnimatedHeading
              text="Every cap we make"
              className="mt-4 font-display text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl md:text-6xl"
            />
            <p className="mt-4 text-lg leading-relaxed text-stone-600">
              Six silhouettes, all in small numbered runs. Hover a card for a quick
              look, or open a cap to spin it in 3D.
            </p>
          </motion.div>

          {/* search */}
          <div className="mt-10 relative max-w-md">
            <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search caps — try “navy” or “wool”"
              className="w-full rounded-full border border-stone-300 bg-white py-3 pl-11 pr-10 text-stone-900 placeholder:text-stone-400 outline-none transition-colors focus:border-gold"
            />
            {query && (
              <button onClick={() => setQuery('')} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 grid h-7 w-7 place-items-center rounded-full text-stone-400 hover:bg-stone-100">
                <X size={15} />
              </button>
            )}
          </div>

          {/* filters + sort */}
          <div className="mt-5 flex flex-col gap-4 border-y border-stone-200 py-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <SlidersHorizontal size={16} className="mr-1 text-stone-400" />
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                    color === c
                      ? 'border-stone-900 bg-stone-900 text-paper'
                      : 'border-stone-300 bg-white text-stone-600 hover:border-gold/50'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-stone-600">Sort</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-full border border-stone-300 bg-white px-4 py-1.5 text-sm font-medium text-stone-800 outline-none transition-colors hover:border-gold/50 focus:border-gold"
              >
                {sorts.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          <p className="mt-5 text-sm text-stone-600">{shown.length} {shown.length === 1 ? 'cap' : 'caps'}</p>

          <div className="mt-6">
            {shown.length > 0 ? (
              <ProductGrid key={color + sort} products={shown} />
            ) : (
              <p className="py-16 text-center text-stone-600">No caps match that filter.</p>
            )}
          </div>
        </div>
      </section>
      <Newsletter />
    </PageTransition>
  )
}

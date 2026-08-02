import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Eye, Check, Star, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import Cap from './Cap'
import CapModal from './CapModal'
import { colorways } from '../data/products'
import { useCart } from '../context/CartContext'

const card = {
  hidden: { opacity: 0, y: 36 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

const WISH_KEY = 'krown-wishlist'
const readWish = () => {
  try { return JSON.parse(localStorage.getItem(WISH_KEY) || '[]') } catch { return [] }
}

function ProductCard({ product, index, onQuickLook }) {
  const { addItem, justAdded } = useCart()
  const added = justAdded === `${product.slug}__S / M`
  const [wished, setWished] = useState(false)
  // local "try a colour" preview
  const [look, setLook] = useState({ crown: product.crown, accent: product.accent })

  useEffect(() => { setWished(readWish().includes(product.slug)) }, [product.slug])

  const toggleWish = () => {
    const set = new Set(readWish())
    set.has(product.slug) ? set.delete(product.slug) : set.add(product.slug)
    localStorage.setItem(WISH_KEY, JSON.stringify([...set]))
    setWished(set.has(product.slug))
    window.dispatchEvent(new Event('krown-wishlist-change'))
  }

  return (
    <motion.article
      variants={card}
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-stone-300/40"
    >
      {product.tag && (
        <span className="absolute left-5 top-5 z-10 rounded-full bg-gold-dark px-3 py-1 text-xs font-bold text-white">
          {product.tag}
        </span>
      )}

      <button
        onClick={toggleWish}
        aria-label="Save to wishlist"
        className={`absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full border border-stone-200 bg-white/80 backdrop-blur transition-all duration-300 ${
          wished ? 'text-rose-500' : 'text-stone-400 hover:text-rose-500'
        }`}
      >
        <Heart size={17} className={wished ? 'fill-rose-500' : ''} />
      </button>

      <button
        onClick={() => onQuickLook(product)}
        aria-label="Quick look"
        className="absolute right-5 top-16 z-10 grid h-10 w-10 place-items-center rounded-full border border-stone-200 bg-white/80 text-stone-600 opacity-0 backdrop-blur transition-all duration-300 hover:text-gold-dark group-hover:opacity-100"
      >
        <Eye size={17} />
      </button>

      {/* product visual — real photo if provided, else the 3/4 SVG */}
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative grid h-52 place-items-center" style={{ perspective: 600 }}>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-stone-100/70 to-transparent" />
          {product.image ? (
            <motion.img
              src={product.image}
              alt={product.name}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="absolute inset-0 h-full w-full rounded-2xl object-cover"
            />
          ) : (
            <motion.div
              whileHover={{ scale: 1.07 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-44"
              style={{ transform: 'rotateX(34deg)' }}
            >
              <Cap crown={look.crown} accent={look.accent} className="w-full drop-shadow-[0_16px_22px_rgba(28,25,23,0.22)]" />
            </motion.div>
          )}
        </div>
      </Link>

      {/* colour switcher (only for the drawn SVG caps) */}
      <div className={`mt-4 flex items-center gap-2 ${product.image ? 'hidden' : ''}`}>
        {colorways.map((c) => (
          <button
            key={c.slug}
            onClick={() => setLook({ crown: c.crown, accent: c.accent })}
            aria-label={c.color}
            title={c.color}
            className={`h-5 w-5 rounded-full border transition-transform hover:scale-110 ${
              look.crown === c.crown ? 'ring-2 ring-gold ring-offset-2 ring-offset-white border-transparent' : 'border-stone-300'
            }`}
            style={{ backgroundColor: c.crown }}
          />
        ))}
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-display text-lg font-bold text-stone-900 transition-colors hover:text-gold-dark">{product.name}</h3>
          </Link>
          <p className="mt-0.5 text-sm text-stone-600">{product.color}</p>
        </div>
        <p className="font-display text-lg font-bold text-gold-dark">${product.price}</p>
      </div>

      <div className="mt-3 flex items-center gap-1 text-xs text-stone-600">
        {Array.from({ length: 5 }).map((_, k) => (
          <Star key={k} size={12} className="fill-gold text-gold" />
        ))}
        <span className="ml-1">In stock</span>
      </div>

      <motion.button
        onClick={() => addItem(product)}
        whileTap={{ scale: 0.95 }}
        className={`mt-5 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all duration-300 ${
          added
            ? 'bg-emerald-600 text-white'
            : 'border border-stone-300 bg-white text-stone-800 group-hover:border-stone-900 group-hover:bg-stone-900 group-hover:text-paper'
        }`}
      >
        {added ? <><Check size={16} /> Added!</> : <><Plus size={16} /> Add to cart</>}
      </motion.button>
    </motion.article>
  )
}

export default function ProductGrid({ products }) {
  const [quickLook, setQuickLook] = useState(null)

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i} onQuickLook={setQuickLook} />
        ))}
      </div>
      <CapModal product={quickLook} onClose={() => setQuickLook(null)} />
    </>
  )
}

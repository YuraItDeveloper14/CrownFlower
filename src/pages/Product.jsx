import { useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { Check, Minus, Plus, ShoppingBag, Truck, RotateCcw, ShieldCheck, ArrowLeft } from 'lucide-react'
import CapCarousel from '../components/CapCarousel'
import ProductGrid from '../components/ProductGrid'
import SectionHeader from '../components/SectionHeader'
import PageTransition from '../components/PageTransition'
import SizeGuide from '../components/SizeGuide'
import Reviews from '../components/Reviews'
import { getProduct, products, sizes } from '../data/products'
import { useCart } from '../context/CartContext'

const perks = [
  { icon: Truck, text: 'Free shipping over $80' },
  { icon: RotateCcw, text: '30-day easy returns' },
  { icon: ShieldCheck, text: '2-year craftsmanship warranty' },
]

export default function Product() {
  const { slug } = useParams()
  const product = getProduct(slug)
  const { addItem } = useCart()
  const [size, setSize] = useState(sizes[0])
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [guideOpen, setGuideOpen] = useState(false)

  if (!product) {
    return (
      <PageTransition>
        <div className="grid min-h-[70vh] place-items-center px-5 text-center">
          <div>
            <h1 className="font-display text-3xl font-bold text-stone-900">Cap not found</h1>
            <Link to="/shop" className="btn-primary mt-6">Back to shop</Link>
          </div>
        </div>
      </PageTransition>
    )
  }

  const onAdd = () => {
    addItem(product, size, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3)

  return (
    <PageTransition>
      <section className="relative px-5 pt-32 pb-16 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <Link to="/shop" className="mb-8 inline-flex items-center gap-2 text-sm text-stone-600 transition-colors hover:text-stone-900">
            <ArrowLeft size={16} /> Back to collection
          </Link>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm"
            >
              <CapCarousel crown={product.crown} accent={product.accent} size={360} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {product.tag && <span className="eyebrow">{product.tag}</span>}
              <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
                {product.name}
              </h1>
              <p className="mt-2 text-stone-600">{product.color} · Limited run of {product.runOf}</p>
              <p className="mt-5 font-display text-3xl font-bold text-gold-dark">${product.price}</p>

              <p className="mt-6 leading-relaxed text-stone-600">{product.description}</p>

              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-stone-900">Size</p>
                  <button onClick={() => setGuideOpen(true)} className="text-sm font-medium text-gold-dark underline underline-offset-2 hover:text-gold">
                    Size guide
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-3">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
                        size === s
                          ? 'border-stone-900 bg-stone-900 text-paper'
                          : 'border-stone-300 bg-white text-stone-700 hover:border-gold/50'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="inline-flex items-center justify-between gap-4 rounded-full border border-stone-300 bg-white px-3 py-2.5">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-8 w-8 place-items-center rounded-full hover:bg-stone-100" aria-label="Decrease">
                    <Minus size={16} />
                  </button>
                  <span className="w-6 text-center font-semibold text-stone-900">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-stone-100" aria-label="Increase">
                    <Plus size={16} />
                  </button>
                </div>

                <button onClick={onAdd} className={`btn-primary flex-1 ${added ? '!bg-emerald-600' : ''}`}>
                  {added ? <><Check size={18} /> Added to cart</> : <><ShoppingBag size={18} /> Add to cart — ${product.price * qty}</>}
                </button>
              </div>

              <div className="mt-8 rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <p className="text-sm font-semibold text-stone-900">Materials & make</p>
                <ul className="mt-3 space-y-2">
                  {product.materials.map((m) => (
                    <li key={m} className="flex items-center gap-2 text-sm text-stone-600">
                      <Check size={14} className="text-gold-dark" /> {m}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {perks.map((p) => (
                  <div key={p.text} className="flex items-center gap-2 text-xs text-stone-600">
                    <p.icon size={16} className="shrink-0 text-gold-dark" />
                    {p.text}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* reviews */}
      <section className="relative px-5 py-12">
        <div className="mx-auto max-w-7xl">
          <Reviews slug={product.slug} />
        </div>
      </section>

      <section className="relative px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="You might also like" title="Complete the rotation" />
          <div className="mt-12">
            <ProductGrid products={related} />
          </div>
        </div>
      </section>

      <SizeGuide open={guideOpen} onClose={() => setGuideOpen(false)} />
    </PageTransition>
  )
}

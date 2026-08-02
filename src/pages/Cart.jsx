import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Check } from 'lucide-react'
import Cap from '../components/Cap'
import PageTransition from '../components/PageTransition'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, updateQty, removeItem, subtotal, clear } = useCart()
  const [placed, setPlaced] = useState(false)
  const shipping = subtotal >= 80 || subtotal === 0 ? 0 : 8
  const total = subtotal + shipping

  if (placed) {
    return (
      <PageTransition>
        <div className="grid min-h-[70vh] place-items-center px-5 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600 ring-1 ring-emerald-200">
              <Check size={30} />
            </span>
            <h1 className="mt-6 font-display text-3xl font-bold text-stone-900">Order placed!</h1>
            <p className="mt-3 text-stone-600">Thanks for your order — a confirmation is on its way.</p>
            <Link to="/shop" className="btn-primary mt-8">Keep shopping</Link>
          </motion.div>
        </div>
      </PageTransition>
    )
  }

  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="grid min-h-[70vh] place-items-center px-5 text-center">
          <div>
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-stone-200 bg-white text-stone-600">
              <ShoppingBag size={28} />
            </span>
            <h1 className="mt-6 font-display text-3xl font-bold text-stone-900">Your cart is empty</h1>
            <p className="mt-3 text-stone-600">Let's find you a crown worth keeping.</p>
            <Link to="/shop" className="btn-primary mt-8">Browse caps <ArrowRight size={18} /></Link>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <section className="relative px-5 pt-36 pb-24 md:pt-44">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-display text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">Your cart</h1>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={item.key}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
                  >
                    <div className="grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-stone-50">
                      <Cap crown={item.crown} accent={item.accent} className="w-16" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <Link to={`/product/${item.slug}`} className="font-display font-bold text-stone-900 hover:text-gold-dark">
                        {item.name}
                      </Link>
                      <p className="text-sm text-stone-600">{item.color} · {item.size}</p>
                      <p className="mt-1 font-semibold text-gold-dark">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-stone-300 bg-white px-2 py-1.5">
                      <button onClick={() => updateQty(item.key, item.qty - 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-stone-100" aria-label="Decrease">
                        <Minus size={14} />
                      </button>
                      <span className="w-5 text-center text-sm font-semibold text-stone-900">{item.qty}</span>
                      <button onClick={() => updateQty(item.key, item.qty + 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-stone-100" aria-label="Increase">
                        <Plus size={14} />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.key)} className="grid h-9 w-9 place-items-center rounded-full text-stone-600 transition-colors hover:bg-rose-50 hover:text-rose-500" aria-label="Remove">
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              <button onClick={clear} className="text-sm text-stone-600 transition-colors hover:text-stone-700">
                Clear cart
              </button>
            </div>

            <div className="h-fit rounded-2xl border border-stone-200 bg-white p-6 shadow-sm lg:sticky lg:top-28">
              <h2 className="font-display text-lg font-bold text-stone-900">Order summary</h2>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between text-stone-600">
                  <dt>Subtotal</dt>
                  <dd className="text-stone-900">${subtotal}</dd>
                </div>
                <div className="flex justify-between text-stone-600">
                  <dt>Shipping</dt>
                  <dd className="text-stone-900">{shipping === 0 ? 'Free' : `$${shipping}`}</dd>
                </div>
                {subtotal < 80 && (
                  <p className="text-xs text-gold-dark">Add ${80 - subtotal} more for free shipping</p>
                )}
                <div className="flex justify-between border-t border-stone-200 pt-3 text-base font-bold">
                  <dt className="text-stone-900">Total</dt>
                  <dd className="text-gold-dark">${total}</dd>
                </div>
              </dl>
              <button onClick={() => { clear(); setPlaced(true) }} className="btn-primary mt-6 w-full">
                Checkout <ArrowRight size={18} />
              </button>
              <p className="mt-3 text-center text-xs text-stone-600">Secure checkout · 30-day returns</p>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

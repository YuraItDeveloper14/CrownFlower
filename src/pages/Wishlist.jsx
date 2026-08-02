import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ArrowRight } from 'lucide-react'
import ProductGrid from '../components/ProductGrid'
import PageTransition from '../components/PageTransition'
import AnimatedHeading from '../components/AnimatedHeading'
import { products } from '../data/products'

const readWish = () => {
  try { return JSON.parse(localStorage.getItem('krown-wishlist') || '[]') } catch { return [] }
}

export default function Wishlist() {
  const [slugs, setSlugs] = useState(readWish)

  useEffect(() => {
    const refresh = () => setSlugs(readWish())
    window.addEventListener('krown-wishlist-change', refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener('krown-wishlist-change', refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [])

  const saved = products.filter((p) => slugs.includes(p.slug))

  return (
    <PageTransition>
      <section className="relative px-5 pt-36 pb-24 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <span className="eyebrow">Saved</span>
          <AnimatedHeading
            text="Your wishlist"
            className="mt-4 font-display text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl md:text-6xl"
          />

          {saved.length === 0 ? (
            <div className="mt-16 grid place-items-center text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full border border-stone-200 bg-white text-stone-400">
                <Heart size={28} />
              </span>
              <p className="mt-6 text-lg text-stone-600">Nothing saved yet.</p>
              <p className="mt-1 text-stone-600">Tap the heart on any cap to keep it here.</p>
              <Link to="/shop" className="btn-primary mt-8">Browse caps <ArrowRight size={18} /></Link>
            </div>
          ) : (
            <>
              <p className="mt-4 text-stone-600">{saved.length} saved {saved.length === 1 ? 'cap' : 'caps'}</p>
              <div className="mt-10">
                <ProductGrid products={saved} />
              </div>
            </>
          )}
        </div>
      </section>
    </PageTransition>
  )
}

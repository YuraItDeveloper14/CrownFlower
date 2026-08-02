import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag, Heart } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo'
import { useCart } from '../context/CartContext'

const links = [
  { label: 'Shop', to: '/shop' },
  { label: 'Lookbook', to: '/lookbook' },
  { label: 'Our Craft', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const readWishCount = () => {
  try { return JSON.parse(localStorage.getItem('krown-wishlist') || '[]').length } catch { return 0 }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [wishCount, setWishCount] = useState(0)
  const { count } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const refresh = () => setWishCount(readWishCount())
    refresh()
    window.addEventListener('krown-wishlist-change', refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener('krown-wishlist-change', refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}
    >
      <div className="mx-auto max-w-7xl px-5">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
            scrolled ? 'glass shadow-md shadow-stone-300/30' : 'bg-transparent'
          }`}
        >
          <Link to="/" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `group relative text-sm font-medium transition-colors hover:text-stone-900 ${
                    isActive ? 'text-stone-900' : 'text-stone-600'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-gold-light to-gold-dark transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative grid h-10 w-10 place-items-center rounded-xl text-stone-600 transition-colors hover:bg-stone-100 hover:text-rose-500"
            >
              <Heart size={19} />
              <AnimatePresence>
                {wishCount > 0 && (
                  <motion.span
                    key={wishCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white"
                  >
                    {wishCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative grid h-10 w-10 place-items-center rounded-xl text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
            >
              <ShoppingBag size={19} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold-dark px-1 text-[10px] font-bold text-white"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <Link to="/shop" className="hidden btn-primary !px-5 !py-2.5 text-sm md:inline-flex">
              Shop now
            </Link>

            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-xl text-stone-800 transition-colors hover:bg-stone-100 md:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="glass mt-2 overflow-hidden rounded-2xl md:hidden"
            >
              <div className="flex flex-col p-4">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-stone-700 transition-colors hover:bg-stone-100"
                  >
                    {l.label}
                  </Link>
                ))}
                <Link to="/shop" onClick={() => setOpen(false)} className="btn-primary mt-3 text-sm">
                  Shop now
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

import { motion } from 'framer-motion'
import { Instagram, Twitter, Youtube, Music2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

const columns = [
  {
    title: 'Shop',
    links: [
      { label: 'All caps', to: '/shop' },
      { label: 'Lookbook', to: '/lookbook' },
      { label: 'Wishlist', to: '/wishlist' },
      { label: 'Your cart', to: '/cart' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Size & fit', to: '/faq' },
      { label: 'Shipping', to: '/faq' },
      { label: 'Returns', to: '/faq' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Brand',
    links: [
      { label: 'Our craft', to: '/about' },
      { label: 'Sustainability', to: '/about' },
      { label: 'Lookbook', to: '/lookbook' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', to: '/legal' },
      { label: 'Terms', to: '/legal' },
      { label: 'Cookies', to: '/legal' },
    ],
  },
]

const socials = [Instagram, Twitter, Youtube, Music2]

export default function Footer() {
  return (
    <footer className="relative border-t border-stone-200 px-5 pb-10 pt-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link to="/"><Logo /></Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-600">
              Premium headwear, crafted in small numbered runs to outlast trends.
              Made to be worn for years, not seasons.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-stone-200 bg-white text-stone-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:text-gold-dark"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <h3 className="font-display text-sm font-bold text-stone-900">{c.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-stone-600 transition-colors hover:text-stone-900">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-stone-200 pt-7 text-sm text-stone-600 md:flex-row">
          <p>© {new Date().getFullYear()} CROWNFLOWER. All rights reserved.</p>
          <p className="font-display italic">Crafted with care · Shipped worldwide</p>
        </div>
      </div>
    </footer>
  )
}

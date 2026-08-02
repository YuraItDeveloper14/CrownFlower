import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import CapViewer from './CapViewer'
import { useCart } from '../context/CartContext'

// Quick-look modal: rotate the cap, then add to cart or open the full page.
export default function CapModal({ product, onClose }) {
  const { addItem } = useCart()

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] grid place-items-center bg-stone-900/40 p-5 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-stone-200 bg-paper p-6 shadow-2xl md:p-10"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-stone-200 bg-white text-stone-600 transition-colors hover:text-stone-900"
            >
              <X size={18} />
            </button>

            <div className="grid items-center gap-8 md:grid-cols-2">
              <CapViewer crown={product.crown} accent={product.accent} size={300} />

              <div className="text-center md:text-left">
                {product.tag && <span className="eyebrow">{product.tag}</span>}
                <h3 className="mt-2 font-display text-3xl font-bold text-stone-900">{product.name}</h3>
                <p className="mt-1 text-stone-600">{product.color} · Limited run of {product.runOf}</p>
                <p className="mt-4 text-sm leading-relaxed text-stone-600">{product.description}</p>
                <p className="mt-5 font-display text-2xl font-bold text-gold-dark">${product.price}</p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                  <button onClick={() => addItem(product)} className="btn-primary w-full">
                    Add to cart
                  </button>
                  <Link to={`/product/${product.slug}`} onClick={onClose} className="btn-ghost w-full">
                    Full details <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

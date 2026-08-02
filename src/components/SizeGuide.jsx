import { motion, AnimatePresence } from 'framer-motion'
import { X, Ruler } from 'lucide-react'

const rows = [
  ['S / M', '54 – 57 cm', '21¼ – 22½"'],
  ['L / XL', '57 – 60 cm', '22½ – 23⅝"'],
  ['XXL', '60 – 63 cm', '23⅝ – 24¾"'],
]

export default function SizeGuide({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] grid place-items-center bg-stone-900/40 p-5 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', stiffness: 240, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-stone-200 bg-paper p-7 shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-stone-200 bg-white text-stone-600 hover:text-stone-900"
            >
              <X size={17} />
            </button>

            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-50 ring-1 ring-gold/20">
              <Ruler size={20} className="text-gold-dark" />
            </span>
            <h3 className="mt-4 font-display text-2xl font-bold text-stone-900">Find your fit</h3>
            <p className="mt-2 text-sm text-stone-600">
              Measure around your head just above the ears. The metal-clasp strap
              fine-tunes the fit from there.
            </p>

            <table className="mt-6 w-full text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-left text-stone-600">
                  <th className="py-2 font-medium">Size</th>
                  <th className="py-2 font-medium">Head (cm)</th>
                  <th className="py-2 font-medium">Head (in)</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r[0]} className="border-b border-stone-100">
                    <td className="py-3 font-semibold text-stone-900">{r[0]}</td>
                    <td className="py-3 text-stone-600">{r[1]}</td>
                    <td className="py-3 text-stone-600">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

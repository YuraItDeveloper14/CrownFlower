import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import AnimatedHeading from '../components/AnimatedHeading'

const groups = [
  {
    title: 'Shipping',
    items: [
      ['When will my order ship?', 'Orders are packed within 1–2 business days. You’ll get a tracking link by email the moment it leaves our studio.'],
      ['How much is shipping?', 'Free worldwide on orders over $80. Below that it’s a flat $8, anywhere in the world.'],
      ['Do you ship internationally?', 'Yes — we ship to over 60 countries. Any duties are calculated at checkout so there are no surprises.'],
    ],
  },
  {
    title: 'Returns & exchanges',
    items: [
      ['What’s your return policy?', 'Unworn caps can be returned within 30 days for a full refund. Exchanges are free.'],
      ['How do I start a return?', 'Email hello@crownflower.com with your order number and we’ll send a prepaid label.'],
    ],
  },
  {
    title: 'Size & fit',
    items: [
      ['Which size should I pick?', 'S/M fits roughly 54–57cm, L/XL fits 57–60cm, and XXL fits 60–63cm. The metal clasp fine-tunes from there.'],
      ['Are the caps adjustable?', 'Every CROWNFLOWER has an antique-brass clasp strap, so the fit is dialed in to the millimetre.'],
    ],
  },
  {
    title: 'Care',
    items: [
      ['How do I clean my cap?', 'Spot clean with cold water and a soft brush. The colorfast dyes hold up, but skip the washing machine to keep the shape.'],
    ],
  },
]

function Item({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-stone-200">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between gap-4 py-5 text-left">
        <span className="font-medium text-stone-900">{q}</span>
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-stone-300 text-stone-600">
          {open ? <Minus size={15} /> : <Plus size={15} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-stone-600">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Faq() {
  return (
    <PageTransition>
      <section className="relative px-5 pt-36 pb-24 md:pt-44">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow">Help centre</span>
          <AnimatedHeading
            text="Frequently asked"
            className="mt-4 font-display text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl md:text-6xl"
          />
          <p className="mt-4 text-lg text-stone-600">Everything about shipping, returns, fit and care. Still stuck? <a href="/contact" className="text-gold-dark underline">Talk to us</a>.</p>

          <div className="mt-12 space-y-12">
            {groups.map((g) => (
              <div key={g.title}>
                <h2 className="font-display text-2xl font-bold text-stone-900">{g.title}</h2>
                <div className="mt-2">
                  {g.items.map(([q, a]) => <Item key={q} q={q} a={a} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

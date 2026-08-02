import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
  }

  return (
    <section className="relative px-5 pt-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-stone-900 p-10 text-center md:p-16"
        >
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/25 blur-[120px]" />
          <div className="relative">
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-paper sm:text-4xl md:text-5xl">
              Get early access to the next drop
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-paper/70">
              Numbered runs sell out fast. Join the list for first dibs, plus 10% off your first cap.
            </p>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-gold/20 px-6 py-3.5 font-semibold text-gold-light ring-1 ring-gold/40"
              >
                <Check size={18} />
                You’re on the list — check your inbox!
              </motion.div>
            ) : (
              <form onSubmit={submit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full rounded-full border border-white/15 bg-white/10 px-5 py-3.5 text-paper placeholder:text-paper/40 outline-none transition-colors focus:border-gold/60"
                />
                <button type="submit" className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-gold-dark px-7 py-3.5 font-semibold text-white transition-all hover:brightness-110 hover:-translate-y-0.5">
                  Subscribe
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

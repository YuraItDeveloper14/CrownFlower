import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Clock, Check, ArrowRight } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import MailDove from '../components/MailDove'

const info = [
  { icon: Mail, label: 'Email us', value: 'hello@crownflower.com' },
  { icon: MapPin, label: 'Studio', value: 'Lviv, Ukraine' },
  { icon: Clock, label: 'Reply time', value: 'Within 24 hours' },
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const submit = (e) => {
    e.preventDefault()
    if (form.name && form.email && form.message) setSent(true)
  }

  return (
    <PageTransition>
      <section className="relative px-5 pt-36 pb-24 md:pt-44">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          {/* left: intro + info + mascot */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="eyebrow">Say hello</span>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl md:text-6xl">
                We'd love to <span className="italic text-gold-dark">hear</span> from you
              </h1>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-stone-600">
                Questions about sizing, an order, or a wholesale enquiry? Drop us a
                line — a real human reads every message.
              </p>
            </motion.div>

            <div className="mt-10 space-y-4">
              {info.map((it, i) => (
                <motion.div
                  key={it.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-50 ring-1 ring-gold/20">
                    <it.icon size={18} className="text-gold-dark" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-stone-600">{it.label}</p>
                    <p className="font-medium text-stone-900">{it.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 hidden lg:block">
              <MailDove />
            </div>
          </div>

          {/* right: form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm md:p-10"
          >
            {sent ? (
              <div className="grid h-full min-h-[20rem] place-items-center text-center">
                <div>
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600 ring-1 ring-emerald-200">
                    <Check size={30} />
                  </span>
                  <h2 className="mt-6 font-display text-2xl font-bold text-stone-900">Message sent!</h2>
                  <p className="mt-2 text-stone-600">Thanks {form.name.split(' ')[0]} — we'll be in touch soon.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-stone-700">Your name</label>
                  <input
                    value={form.name}
                    onChange={update('name')}
                    required
                    placeholder="Jane Doe"
                    className="mt-2 w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition-colors focus:border-gold focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-stone-700">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    required
                    placeholder="jane@email.com"
                    className="mt-2 w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition-colors focus:border-gold focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-stone-700">Message</label>
                  <textarea
                    value={form.message}
                    onChange={update('message')}
                    required
                    rows={5}
                    placeholder="How can we help?"
                    className="mt-2 w-full resize-none rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition-colors focus:border-gold focus:bg-white"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Send message <ArrowRight size={18} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}

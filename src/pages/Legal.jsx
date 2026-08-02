import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import AnimatedHeading from '../components/AnimatedHeading'

const sections = [
  {
    id: 'privacy',
    title: 'Privacy',
    body: 'We collect only what we need to fulfil your order and improve your experience — your name, contact details, and order history. We never sell your data. You can request a copy or deletion of your data any time at hello@crownflower.com.',
  },
  {
    id: 'terms',
    title: 'Terms of service',
    body: 'By placing an order you agree to our pricing, shipping and returns policies as described across this site. Limited runs are sold on a first-come basis; once a numbered run sells out it will not be restocked.',
  },
  {
    id: 'cookies',
    title: 'Cookies',
    body: 'We use a small number of cookies to keep your cart and wishlist working and to understand how the site is used. You can clear or block cookies in your browser settings at any time.',
  },
]

export default function Legal() {
  return (
    <PageTransition>
      <section className="relative px-5 pt-36 pb-24 md:pt-44">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow">The fine print</span>
          <AnimatedHeading
            text="Legal"
            className="mt-4 font-display text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl"
          />

          <div className="mt-12 space-y-12">
            {sections.map((s, i) => (
              <motion.div
                key={s.id}
                id={s.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="scroll-mt-28"
              >
                <h2 className="font-display text-2xl font-bold text-stone-900">{s.title}</h2>
                <p className="mt-3 leading-relaxed text-stone-600">{s.body}</p>
              </motion.div>
            ))}
          </div>

          <p className="mt-14 text-sm text-stone-600">Last updated June 2026 · CROWNFLOWER</p>
        </div>
      </section>
    </PageTransition>
  )
}

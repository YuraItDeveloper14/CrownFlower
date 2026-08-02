import { motion } from 'framer-motion'
import Lookbook from '../components/Lookbook'
import Newsletter from '../components/Newsletter'
import PageTransition from '../components/PageTransition'
import AnimatedHeading from '../components/AnimatedHeading'

export default function LookbookPage() {
  return (
    <PageTransition>
      <section className="relative px-5 pt-36 pb-4 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="eyebrow">Lookbook</span>
            <AnimatedHeading
              text="The caps, in their element"
              className="mt-4 font-display text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl md:text-6xl"
            />
            <p className="mt-4 text-lg leading-relaxed text-stone-600">
              Every colorway has a mood. Tap a tile to spin the cap and see it up close.
            </p>
          </motion.div>
        </div>
      </section>
      <Lookbook />
      <Newsletter />
    </PageTransition>
  )
}

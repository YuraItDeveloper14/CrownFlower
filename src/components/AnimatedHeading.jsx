import { motion } from 'framer-motion'

// Reveals a heading word-by-word on scroll, and each word lifts to gold on
// hover — gives plain text pages a bit of life and interactivity.
export default function AnimatedHeading({ text, as = 'h1', className = '', delay = 0 }) {
  const words = text.split(' ')
  const MotionTag = motion[as] || motion.h1

  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
      className={className}
      aria-label={text}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 24, rotate: 2 },
            show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
          }}
          whileHover={{ y: -4, color: '#b8860b' }}
          className="inline-block cursor-default"
          style={{ marginRight: '0.25em' }}
        >
          {w}
        </motion.span>
      ))}
    </MotionTag>
  )
}

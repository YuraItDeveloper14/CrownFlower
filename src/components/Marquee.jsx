const items = [
  'Wear Your Crown',
  'Numbered Limited Runs',
  'Six-Visor Signature',
  'Hand-Finished Stitching',
  'Worn For Years, Not Seasons',
]

export default function Marquee() {
  const loop = [...items, ...items]

  return (
    <div className="relative border-y border-stone-200 bg-stone-900 py-5 text-paper">
      <div className="flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
          {loop.map((t, i) => (
            <div key={i} className="flex shrink-0 items-center gap-8">
              <span className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-paper/90">
                {t}
              </span>
              <span className="text-gold-light">✦</span>
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-stone-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-stone-900 to-transparent" />
    </div>
  )
}

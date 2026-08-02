// Single source of truth for the catalog. Used by Shop, Home preview,
// Product pages and the cart.
export const products = [
  {
    slug: 'heritage-6-panel',
    name: 'The Heritage 6-Panel',
    color: 'Midnight',
    price: 64,
    crown: '#15141b',
    accent: '#e8c98a',
    tag: 'Bestseller',
    runOf: 250,
    blurb: 'Our signature silhouette in deep midnight twill.',
    description:
      'The cap that started it all. A structured 6-panel crown in 12oz organic cotton twill, finished with a tonal metal clasp and our embroidered K emblem. Holds its shape from day one and only gets better with age.',
    materials: ['12oz organic cotton twill', 'Antique brass clasp', 'Cotton sweatband'],
  },
  {
    slug: 'dune-structured',
    name: 'Dune Structured Cap',
    color: 'Sand',
    price: 58,
    crown: '#c9b48d',
    accent: '#5b4a2e',
    tag: null,
    runOf: 300,
    blurb: 'Warm, sand-toned twill for brighter days.',
    description:
      'A softer, sun-bleached take on the classic. The Dune pairs a sand crown with a contrast emblem for an easy, coastal look that works with everything.',
    materials: ['12oz washed cotton twill', 'Antique brass clasp', 'Cotton sweatband'],
  },
  {
    slug: 'olive-field',
    name: 'Olive Field Cap',
    color: 'Olive',
    price: 60,
    crown: '#3f4a32',
    accent: '#e8c98a',
    tag: 'New',
    runOf: 200,
    blurb: 'Rugged olive green, built for the outdoors.',
    description:
      'Inspired by field jackets. A muted olive crown with reinforced eyelets and a slightly relaxed fit — at home on the trail or in the city.',
    materials: ['Heavyweight ripstop cotton', 'Matte gunmetal clasp', 'Moisture-wicking band'],
  },
  {
    slug: 'bordeaux-wool',
    name: 'Bordeaux Wool Blend',
    color: 'Bordeaux',
    price: 72,
    crown: '#4a1f29',
    accent: '#e8c98a',
    tag: null,
    runOf: 150,
    blurb: 'A rich wool blend for colder seasons.',
    description:
      'A premium cold-weather piece. Deep bordeaux wool blend with a felt-like hand and gold emblem — the most refined cap in the lineup.',
    materials: ['Wool-blend melton', 'Antique brass clasp', 'Satin lining'],
  },
  {
    slug: 'ivory-minimal',
    name: 'Ivory Minimal Cap',
    color: 'Ivory',
    price: 58,
    crown: '#e8e2d4',
    accent: '#9a7b3f',
    tag: null,
    runOf: 300,
    blurb: 'Clean ivory with a subtle tonal emblem.',
    description:
      'Understated and versatile. A bright ivory crown with a low-contrast emblem for a quiet, premium finish that goes with any fit.',
    materials: ['12oz organic cotton twill', 'Nickel clasp', 'Cotton sweatband'],
  },
  {
    slug: 'slate-performance',
    name: 'Slate Performance',
    color: 'Slate',
    price: 68,
    crown: '#2c3540',
    accent: '#d6a85a',
    tag: 'Limited',
    runOf: 120,
    blurb: 'Technical slate fabric, gold emblem.',
    description:
      'Our most technical cap. A water-resistant slate shell with laser-cut vents and a gold emblem — engineered to perform and made in our smallest run yet.',
    materials: ['Water-resistant tech shell', 'Laser-cut vents', 'Matte black clasp'],
  },
  {
    slug: 'navy-heritage',
    name: 'Navy Heritage',
    color: 'Navy',
    price: 64,
    crown: '#1c2a3a',
    accent: '#e8c98a',
    tag: null,
    runOf: 250,
    blurb: 'Deep navy twill, timeless and sharp.',
    description:
      'A deep, inky navy take on the Heritage silhouette. Pairs with everything and reads dressier than black — our most versatile colorway.',
    materials: ['12oz organic cotton twill', 'Antique brass clasp', 'Cotton sweatband'],
  },
  {
    slug: 'camel-suede',
    name: 'Camel Suede-Touch',
    color: 'Camel',
    price: 74,
    crown: '#a9794a',
    accent: '#3a2a18',
    tag: 'New',
    runOf: 150,
    blurb: 'Warm camel with a soft suede-like hand.',
    description:
      'A warm camel tone in a brushed, suede-touch cotton. The softest cap we make, with a contrast emblem for a quietly luxe finish.',
    materials: ['Brushed suede-touch cotton', 'Antique brass clasp', 'Satin lining'],
  },
]

export const sizes = ['S / M', 'L / XL', 'XXL']

// All available colorways, derived from the catalog — used by the on-card
// color switcher.
export const colorways = products.map((p) => ({
  slug: p.slug,
  color: p.color,
  crown: p.crown,
  accent: p.accent,
}))

export const getProduct = (slug) => products.find((p) => p.slug === slug)

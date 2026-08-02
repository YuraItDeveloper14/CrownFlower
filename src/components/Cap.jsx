// CROWNFLOWER's signature silhouette: a cap from above with SIX visors that
// join at the base but split into separate points (with a clear angle between
// them) toward the tips — a crown that reads as a flower. Radially symmetric,
// so it spins cleanly in 360°.
export default function Cap({
  crown = '#1b1a22',
  accent = '#d6a85a',
  button = '#e0b84d',
  className = '',
  style,
}) {
  const cx = 110
  const cy = 106
  const R = 100 // visor tip radius
  const Vr = 66 // valley radius between visors (higher = gentler, rounder petals)
  const N = 6 // visors

  const pt = (deg, r) => [
    cx + r * Math.cos((deg * Math.PI) / 180),
    cy + r * Math.sin((deg * Math.PI) / 180),
  ]

  // rounded petals: valleys are on-curve points, tips are quadratic controls →
  // soft, rounded visors (like the real flower cap) instead of sharp points
  const valleys = Array.from({ length: N }, (_, i) => pt(120 + i * (360 / N), Vr))
  const tips = Array.from({ length: N }, (_, i) => pt(150 + i * (360 / N), R))
  let brim = `M${valleys[0][0].toFixed(1)} ${valleys[0][1].toFixed(1)}`
  for (let i = 0; i < N; i++) {
    const [tx, ty] = tips[i]
    const [vx, vy] = valleys[(i + 1) % N]
    brim += ` Q${tx.toFixed(1)} ${ty.toFixed(1)} ${vx.toFixed(1)} ${vy.toFixed(1)}`
  }
  brim += ' Z'

  // seams from dome edge out to each visor tip
  const tipAngles = Array.from({ length: N }, (_, i) => 90 + i * (360 / N))
  const seams = tipAngles.map((a) => {
    const [sx, sy] = pt(a, 42)
    const [tx, ty] = pt(a, R - 6)
    return `M${sx.toFixed(1)} ${sy.toFixed(1)} L${tx.toFixed(1)} ${ty.toFixed(1)}`
  })

  return (
    <svg
      viewBox="0 0 220 210"
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="CROWNFLOWER six-visor cap"
    >
      {/* six-visor brim (joined at base, split toward tips) */}
      <path d={brim} fill={crown} stroke="rgba(0,0,0,0.22)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d={brim} fill="none" stroke={accent} strokeOpacity="0.22" strokeWidth="1.1" strokeLinejoin="round" />
      <g stroke="rgba(255,255,255,0.08)" strokeWidth="1.4">
        {seams.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      {/* crown dome (3/4 view → ellipse) */}
      <ellipse cx={cx} cy={cy} rx="46" ry="43" fill={crown} />
      <ellipse cx={cx - 14} cy={cy - 14} rx="22" ry="16" fill="rgba(255,255,255,0.10)" />
      <path d={`M${cx} ${cy - 43} A46 43 0 0 1 ${cx} ${cy + 43} A30 43 0 0 0 ${cx} ${cy - 43} Z`} fill="rgba(0,0,0,0.16)" />

      {/* gold "крона" button in the centre */}
      <circle cx={cx} cy={cy} r="11" fill={button} stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
      <circle cx={cx - 3} cy={cy - 3} r="3.4" fill="rgba(255,255,255,0.6)" />
    </svg>
  )
}

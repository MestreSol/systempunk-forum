import { cn } from '@/lib/utils'

/**
 * Three primary nodes (systems, consequences, worlds) and the smaller
 * systems orbiting them. Lines draw in when the diagram enters view.
 */
export function SystemDiagram({
  labels,
  className
}: {
  labels: string[]
  className?: string
}) {
  const primary = [
    { x: 160, y: 70 },
    { x: 60, y: 250 },
    { x: 260, y: 250 }
  ]
  const secondary = [
    { x: 40, y: 110, p: 0 },
    { x: 280, y: 110, p: 0 },
    { x: 160, y: 330, p: 1 },
    { x: 20, y: 330, p: 1 },
    { x: 300, y: 330, p: 2 },
    { x: 160, y: 190, p: 2 }
  ]
  return (
    <svg
      viewBox="-50 20 420 360"
      className={cn('w-full', className)}
      fill="none"
      aria-hidden
      data-draw=""
    >
      {/* Secondary links */}
      <g stroke="var(--color-line-strong)" strokeDasharray="0">
        {secondary.map((s, i) => (
          <line
            key={i}
            pathLength={1}
            x1={s.x}
            y1={s.y}
            x2={primary[s.p].x}
            y2={primary[s.p].y}
            style={{ ['--draw-delay' as string]: 600 + i * 90 }}
          />
        ))}
        <line
          pathLength={1}
          x1={160}
          y1={190}
          x2={160}
          y2={70}
          style={{ ['--draw-delay' as string]: 900 }}
        />
        <line
          pathLength={1}
          x1={160}
          y1={190}
          x2={60}
          y2={250}
          style={{ ['--draw-delay' as string]: 950 }}
        />
      </g>

      {/* Primary triangle */}
      <g stroke="var(--color-signal)" strokeWidth="1.25">
        <line pathLength={1} x1={160} y1={70} x2={60} y2={250} />
        <line
          pathLength={1}
          x1={60}
          y1={250}
          x2={260}
          y2={250}
          style={{ ['--draw-delay' as string]: 200 }}
        />
        <line
          pathLength={1}
          x1={260}
          y1={250}
          x2={160}
          y2={70}
          style={{ ['--draw-delay' as string]: 400 }}
        />
      </g>

      {secondary.map((s, i) => (
        <rect
          key={i}
          x={s.x - 3}
          y={s.y - 3}
          width={6}
          height={6}
          fill="var(--color-line-strong)"
        />
      ))}

      {primary.map((p, i) => (
        <g key={i}>
          <circle
            cx={p.x}
            cy={p.y}
            r={16}
            fill="var(--color-void)"
            stroke="var(--color-ink)"
          />
          <circle cx={p.x} cy={p.y} r={4} fill="var(--color-signal)" />
          <text
            x={p.x}
            y={i === 0 ? p.y - 28 : p.y + 38}
            textAnchor="middle"
            fill="var(--color-dim)"
            fontFamily="var(--font-mono), monospace"
            fontSize="10"
            letterSpacing="1.6"
          >
            {`0${i + 1} ${labels[i]?.toUpperCase() ?? ''}`}
          </text>
        </g>
      ))}
    </svg>
  )
}

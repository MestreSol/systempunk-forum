import { cn } from '@/lib/utils'

/**
 * Technical blueprint shown in place of footage that hasn't been cleared yet.
 * Modules and their dependencies echo what the game is about.
 */
export function ShipSchematic({ className }: { className?: string }) {
  const modules = [
    { id: 'BRIDGE', x: 1090, y: 390, w: 150, h: 120 },
    { id: 'CREW', x: 880, y: 300, w: 170, h: 110 },
    { id: 'LIFE SUPPORT', x: 880, y: 490, w: 170, h: 110 },
    { id: 'REACTOR', x: 640, y: 390, w: 190, h: 120 },
    { id: 'CARGO', x: 430, y: 300, w: 170, h: 110 },
    { id: 'COOLING', x: 430, y: 490, w: 170, h: 110 },
    { id: 'ENGINES', x: 250, y: 380, w: 140, h: 140 }
  ]
  const links: [string, string][] = [
    ['REACTOR', 'LIFE SUPPORT'],
    ['REACTOR', 'CREW'],
    ['REACTOR', 'ENGINES'],
    ['REACTOR', 'COOLING'],
    ['LIFE SUPPORT', 'CREW'],
    ['CREW', 'BRIDGE'],
    ['CARGO', 'REACTOR']
  ]
  const center = (id: string) => {
    const m = modules.find((mod) => mod.id === id)!
    return { x: m.x + m.w / 2, y: m.y + m.h / 2 }
  }

  return (
    <svg
      aria-hidden
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className={cn('h-full w-full', className)}
      fill="none"
    >
      <defs>
        <pattern
          id="bp-grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path d="M40 0H0V40" stroke="rgb(255 255 255 / 0.04)" />
        </pattern>
      </defs>
      <rect width="1600" height="900" fill="var(--color-hull)" />
      <rect width="1600" height="900" fill="url(#bp-grid)" />

      {/* Hull */}
      <path
        d="M210 450 L280 330 L420 270 L1060 270 L1180 330 L1300 420 L1340 450 L1300 480 L1180 570 L1060 630 L420 630 L280 570 Z"
        stroke="var(--color-line-strong)"
        strokeWidth="1.5"
      />
      <path
        d="M230 450 L292 345 L428 288 L1052 288 L1168 346 L1284 432 L1310 450 L1284 468 L1168 554 L1052 612 L428 612 L292 555 Z"
        stroke="var(--color-line)"
      />

      {/* Dependencies */}
      <g
        stroke="var(--color-signal)"
        strokeOpacity="0.55"
        strokeDasharray="4 6"
      >
        {links.map(([a, b]) => {
          const p = center(a)
          const q = center(b)
          return <line key={`${a}-${b}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} />
        })}
      </g>

      {/* Modules */}
      <g
        fontFamily="var(--font-mono), monospace"
        fontSize="13"
        letterSpacing="2"
      >
        {modules.map((m) => (
          <g key={m.id}>
            <rect
              x={m.x}
              y={m.y}
              width={m.w}
              height={m.h}
              fill="var(--color-void)"
              stroke={
                m.id === 'REACTOR'
                  ? 'var(--color-signal)'
                  : 'var(--color-line-strong)'
              }
            />
            <text x={m.x + 12} y={m.y + 24} fill="var(--color-dim)">
              {m.id}
            </text>
            <rect
              x={m.x + 12}
              y={m.y + m.h - 22}
              width={m.w - 24}
              height="4"
              fill="var(--color-line)"
            />
            <rect
              x={m.x + 12}
              y={m.y + m.h - 22}
              width={
                (m.w - 24) *
                (m.id === 'LIFE SUPPORT'
                  ? 0.34
                  : m.id === 'COOLING'
                    ? 0.58
                    : 0.82)
              }
              height="4"
              fill={
                m.id === 'LIFE SUPPORT'
                  ? 'var(--color-signal)'
                  : 'var(--color-dim)'
              }
            />
          </g>
        ))}
      </g>

      {/* Dimension lines */}
      <g
        stroke="var(--color-line-strong)"
        fontFamily="var(--font-mono), monospace"
        fontSize="12"
        letterSpacing="2"
      >
        <path d="M210 700V720M1340 700V720M210 710H1340" />
        <text x="740" y="740" fill="var(--color-faint)" stroke="none">
          L 1130 U
        </text>
        <path d="M1420 270H1440M1420 630H1440M1430 270V630" />
        <text x="1450" y="455" fill="var(--color-faint)" stroke="none">
          W 360 U
        </text>
      </g>

      {/* Header annotations */}
      <g
        fontFamily="var(--font-mono), monospace"
        fontSize="13"
        letterSpacing="2"
        fill="var(--color-faint)"
      >
        <text x="60" y="80">
          VESSEL SCHEMATIC / REV 0.7
        </text>
        <text x="60" y="104">
          CLASS: LONG-HAUL / CREW 4
        </text>
        <text x="1540" y="80" textAnchor="end">
          LIFE SUPPORT
        </text>
        <text x="1540" y="104" textAnchor="end" fill="var(--color-signal)">
          34% — DEGRADED
        </text>
      </g>
    </svg>
  )
}

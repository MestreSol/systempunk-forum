import { cn } from '@/lib/utils'

/**
 * Abstract orbital diagram used behind the hero. Pure SVG + CSS transforms,
 * so it costs nothing to load and never blocks the first paint.
 */
export function OrbitalField({ className }: { className?: string }) {
  const ticks = Array.from({ length: 72 }, (_, i) => i)
  return (
    <svg
      aria-hidden
      viewBox="0 0 800 800"
      className={cn('pointer-events-none select-none', className)}
      fill="none"
    >
      {/* Static rings */}
      <g stroke="var(--color-line-strong)" strokeWidth="1">
        <circle cx="400" cy="400" r="110" />
        <circle cx="400" cy="400" r="210" strokeDasharray="2 6" />
        <circle cx="400" cy="400" r="300" />
        <circle cx="400" cy="400" r="385" strokeOpacity="0.5" />
      </g>

      {/* Crosshair */}
      <g stroke="var(--color-line)" strokeWidth="1">
        <line x1="400" y1="0" x2="400" y2="800" />
        <line x1="0" y1="400" x2="800" y2="400" />
      </g>

      {/* Rotating tick ring */}
      <g
        style={{ transformOrigin: '400px 400px' }}
        className="motion-safe:animate-orbit"
      >
        {ticks.map((i) => (
          <line
            key={i}
            x1="400"
            y1={i % 6 === 0 ? 52 : 60}
            x2="400"
            y2="68"
            stroke={
              i % 18 === 0 ? 'var(--color-signal)' : 'var(--color-line-strong)'
            }
            strokeWidth="1"
            transform={`rotate(${i * 5} 400 400)`}
          />
        ))}
      </g>

      {/* Tilted orbit with a satellite */}
      <g transform="rotate(-24 400 400)">
        <ellipse
          cx="400"
          cy="400"
          rx="300"
          ry="112"
          stroke="var(--color-dim)"
          strokeOpacity="0.35"
        />
        {/* Squash first, rotate inside: the satellite follows the ellipse. */}
        <g transform="translate(400 400) scale(1 0.3733) translate(-400 -400)">
          <g
            style={{ transformOrigin: '400px 400px' }}
            className="motion-safe:animate-orbit-reverse"
          >
            <circle cx="700" cy="400" r="6" fill="var(--color-signal)" />
            <circle
              cx="700"
              cy="400"
              r="18"
              stroke="var(--color-signal)"
              strokeOpacity="0.4"
            />
          </g>
        </g>
      </g>

      {/* Inner body */}
      <circle
        cx="400"
        cy="400"
        r="46"
        fill="var(--color-hull)"
        stroke="var(--color-line-strong)"
      />
      <circle cx="400" cy="400" r="3" fill="var(--color-ink)" />

      {/* Annotations */}
      <g
        fill="var(--color-faint)"
        fontFamily="var(--font-mono), monospace"
        fontSize="11"
        letterSpacing="1.5"
      >
        <text x="412" y="286">
          R-300
        </text>
        <text x="412" y="186">
          R-210
        </text>
        <text x="16" y="392">
          000.00
        </text>
        <text x="708" y="392">
          180.00
        </text>
        <text x="412" y="780">
          SEC-04 / ORBITAL
        </text>
      </g>

      {/* Marker */}
      <g stroke="var(--color-signal)" strokeWidth="1">
        <path d="M596 208h14M603 201v14" />
        <circle cx="603" cy="208" r="18" strokeOpacity="0.5" />
      </g>
      <line
        x1="603"
        y1="208"
        x2="660"
        y2="150"
        stroke="var(--color-signal)"
        strokeOpacity="0.5"
      />
      <text
        x="664"
        y="146"
        fill="var(--color-signal)"
        fontFamily="var(--font-mono), monospace"
        fontSize="11"
        letterSpacing="1.5"
      >
        SIGNAL
      </text>
    </svg>
  )
}

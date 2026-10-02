'use client'

import { useEffect, useState } from 'react'

function formatUtc(date: Date) {
  return date.toISOString().slice(11, 19)
}

/**
 * Small, decorative telemetry readout. Values drift once per second; with
 * reduced motion they stay put. Hidden from assistive tech.
 */
export default function Telemetry({ className }: { className?: string }) {
  const [state, setState] = useState({
    time: '--:--:--',
    lat: -23.5505,
    lon: -46.6333,
    signal: 98.2
  })

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const tick = () =>
      setState((prev) => ({
        time: formatUtc(new Date()),
        lat: reduce ? prev.lat : prev.lat + (Math.random() - 0.5) * 0.004,
        lon: reduce ? prev.lon : prev.lon + (Math.random() - 0.5) * 0.004,
        signal: reduce
          ? prev.signal
          : Math.min(
              99.9,
              Math.max(94, prev.signal + (Math.random() - 0.5) * 0.6)
            )
      }))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <dl
      aria-hidden
      className={className}
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      <div className="flex gap-2">
        <dt className="text-faint">UTC</dt>
        <dd className="text-dim">{state.time}</dd>
      </div>
      <div className="flex gap-2">
        <dt className="text-faint">LAT</dt>
        <dd className="text-dim">{state.lat.toFixed(4)}</dd>
      </div>
      <div className="flex gap-2">
        <dt className="text-faint">LON</dt>
        <dd className="text-dim">{state.lon.toFixed(4)}</dd>
      </div>
      <div className="flex gap-2">
        <dt className="text-faint">SIG</dt>
        <dd className="text-dim">{state.signal.toFixed(1)}%</dd>
      </div>
    </dl>
  )
}

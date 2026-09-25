import type { Dictionary } from '@/i18n'
import { OrbitalField } from '../OrbitalField'
import Telemetry from '../Telemetry'
import { Arrow } from '../primitives'

export function Hero({ dict }: { dict: Dictionary }) {
  const t = dict.home.hero
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-16"
    >
      {/* Background: drifting grid + orbital diagram */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-grid grid-drift opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,transparent_0%,var(--color-void)_70%)]" />
        <OrbitalField className="absolute left-1/2 top-[38%] w-[150vw] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-45 sm:w-[110vw] lg:left-auto lg:right-[-14vw] lg:top-1/2 lg:w-[min(64vw,68rem)] lg:translate-x-0 lg:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent" />
      </div>

      {/* Top strip */}
      <div className="container-site label hidden justify-between pt-8 sm:flex">
        <span>SP / INDEX 000</span>
        <span className="flex items-center gap-2">
          <span
            className="size-1.5 rounded-full bg-online motion-safe:animate-pulse-dot"
            aria-hidden
          />
          Network: online
        </span>
      </div>

      <div className="container-site flex flex-1 flex-col justify-center py-16">
        <p
          className="boot-in label mb-6 flex items-center gap-3 text-ink sm:mb-8"
          style={{ ['--d' as string]: 0 }}
        >
          <span className="h-px w-8 bg-signal" aria-hidden />
          {t.label}
        </p>
        <h1
          id="hero-title"
          className="boot-in font-expanded max-w-[14ch] text-[clamp(2.75rem,10vw,8.5rem)] font-semibold uppercase leading-[0.9] text-ink"
          style={{ ['--d' as string]: 80 }}
        >
          {t.title}
        </h1>
        <p
          className="boot-in mt-8 max-w-xl text-lg leading-relaxed text-dim sm:mt-10 sm:text-xl"
          style={{ ['--d' as string]: 220 }}
        >
          {t.subtitle}
        </p>
        <div
          className="boot-in mt-10 sm:mt-12"
          style={{ ['--d' as string]: 360 }}
        >
          <a
            href="#current-project"
            className="group inline-flex min-h-12 items-center gap-4 bg-ink px-6 font-mono text-xs uppercase tracking-[0.18em] text-void transition-colors hover:bg-signal"
          >
            {t.cta}
            <Arrow className="rotate-90 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Bottom telemetry */}
      <div className="container-site flex items-end justify-between gap-6 pb-8">
        <Telemetry className="label grid grid-cols-2 gap-x-6 gap-y-1 sm:flex sm:gap-8" />
        <span
          aria-hidden
          className="hidden h-12 w-px bg-gradient-to-b from-transparent to-signal sm:block"
        />
      </div>
    </section>
  )
}

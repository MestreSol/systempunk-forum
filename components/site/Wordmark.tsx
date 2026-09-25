import { cn } from '@/lib/utils'

/** Typographic wordmark with a small system glyph. */
export function Wordmark({
  className,
  compact
}: {
  className?: string
  compact?: boolean
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        className="size-4 shrink-0"
        fill="none"
      >
        <rect x="0.5" y="0.5" width="19" height="19" stroke="currentColor" />
        <rect x="5" y="5" width="10" height="10" fill="var(--color-signal)" />
      </svg>
      {!compact && (
        <span className="font-expanded text-[0.85rem] font-bold uppercase tracking-[0.08em] max-[359px]:sr-only sm:text-[0.95rem]">
          Systempunk
        </span>
      )}
    </span>
  )
}

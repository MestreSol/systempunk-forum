'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/** Types its lines once it scrolls into view. Decorative. */
export default function Terminal({
  lines,
  className
}: {
  lines: string[]
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [typed, setTyped] = useState<string[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(lines)
      setDone(true)
      return
    }

    let timer: number | undefined
    let line = 0
    let char = 0
    const step = () => {
      if (line >= lines.length) {
        setDone(true)
        return
      }
      char++
      // Build the snapshot now: an updater function would read `line`/`char`
      // later, after they have already advanced past the last line.
      const next = lines.slice(0, line)
      next.push(lines[line].slice(0, char))
      setTyped(next)
      if (char >= lines[line].length) {
        line++
        char = 0
        timer = window.setTimeout(step, 380)
      } else {
        timer = window.setTimeout(step, 28 + Math.random() * 40)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        timer = window.setTimeout(step, 300)
      },
      { threshold: 0.4 }
    )
    observer.observe(node)
    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [lines])

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        'border border-line bg-hull font-mono text-xs sm:text-sm',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="label">sp://network</span>
        <span className="flex gap-1.5">
          <span className="size-1.5 bg-line-strong" />
          <span className="size-1.5 bg-line-strong" />
          <span className="size-1.5 bg-signal" />
        </span>
      </div>
      <div className="min-h-[7.5rem] space-y-1.5 p-4 sm:p-5">
        {lines.map((_, index) => {
          const text = typed[index]
          if (text === undefined) return null
          const isLast = index === typed.length - 1
          const online = done && index === lines.length - 1
          return (
            <p key={index} className="flex gap-3 text-dim">
              <span className="text-signal">&gt;</span>
              <span className={cn(online && 'text-online')}>
                {text}
                {isLast && (
                  <span className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-ink animate-blink" />
                )}
              </span>
            </p>
          )
        })}
      </div>
    </div>
  )
}

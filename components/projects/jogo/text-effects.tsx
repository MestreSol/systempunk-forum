'use client'

import { useEffect, useState, type ElementType } from 'react'
import { useReveal } from './hooks'

// Word-by-word entrance: each word fades, slides up and un-blurs in sequence
// once the element scrolls into view.
export function AnimatedText({
  text,
  as: Tag = 'span',
  className = '',
  stagger = 45,
  delay = 0
}: {
  text: string
  as?: ElementType
  className?: string
  stagger?: number
  delay?: number
}) {
  const { ref, shown } = useReveal<HTMLElement>(0.2)
  const words = text.split(' ')

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden
          style={{ transitionDelay: `${delay + i * stagger}ms` }}
          className={`inline-block whitespace-pre transition-all duration-700 ease-out motion-reduce:transition-none ${
            shown
              ? 'translate-y-0 opacity-100 blur-0'
              : 'translate-y-3 opacity-0 blur-sm motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:blur-0'
          }`}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}

// Types a phrase out, then cycles to the next one (or stops on a single one).
export function Typewriter({
  phrases,
  className = ''
}: {
  phrases: string[]
  className?: string
}) {
  const [index, setIndex] = useState(0)
  const [count, setCount] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const phrase = phrases[index % phrases.length]

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(phrase.length)
      return
    }
    const done = count === phrase.length
    if (done && phrases.length === 1) return

    const timer = setTimeout(
      () => {
        if (!deleting && done) setDeleting(true)
        else if (deleting && count === 0) {
          setDeleting(false)
          setIndex((i) => i + 1)
        } else setCount((c) => c + (deleting ? -1 : 1))
      },
      done && !deleting ? 1800 : deleting ? 30 : 70
    )
    return () => clearTimeout(timer)
  }, [count, deleting, phrase, phrases.length])

  return (
    <span className={className} aria-label={phrase}>
      <span aria-hidden>{phrase.slice(0, count)}</span>
      <span
        aria-hidden
        className="ml-0.5 inline-block w-[2px] h-[1em] -mb-[0.15em] bg-current animate-pulse"
      />
    </span>
  )
}

// Endless scrolling ticker; pauses on hover.
export function Marquee({
  items,
  className = ''
}: {
  items: string[]
  className?: string
}) {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden}
      className="flex shrink-0 items-center gap-8 pr-8 animate-marquee motion-reduce:animate-none"
    >
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-8 whitespace-nowrap">
          {item}
          <span className="text-lime-500">◆</span>
        </li>
      ))}
    </ul>
  )

  return (
    <div
      className={`group flex overflow-hidden border-y border-zinc-800 bg-zinc-900/60 py-3 font-mono text-sm uppercase tracking-widest text-zinc-400 [&:hover_ul]:[animation-play-state:paused] ${className}`}
    >
      {row(false)}
      {row(true)}
    </div>
  )
}

// Glitch effect: `auto` fires a short burst every few seconds, `hover` glitches
// while hovered. The layers are drawn in CSS from the data-text attribute.
export function GlitchText({
  text,
  as: Tag = 'span',
  mode = 'auto',
  className = ''
}: {
  text: string
  as?: ElementType
  mode?: 'auto' | 'hover'
  className?: string
}) {
  return (
    <Tag
      data-text={text}
      className={`glitch ${mode === 'auto' ? 'glitch-auto' : 'glitch-hover'} ${className}`}
    >
      {text}
    </Tag>
  )
}

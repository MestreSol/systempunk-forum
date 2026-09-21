'use client'

import { useEffect, useState } from 'react'
import { useReveal } from '../hooks'
import { AnimatedText } from '../text-effects'

// Plain <img> with a graceful fallback: some JSON-driven content references
// assets that don't exist in public/ yet, and that must not break the page.
export function SafeImage({
  src,
  alt,
  className
}: {
  src: string
  alt: string
  className?: string
}) {
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div
        className={`flex items-center justify-center bg-zinc-800 text-zinc-600 text-xs text-center p-2 ${className || ''}`}
      >
        {alt || 'Imagem indisponível'}
      </div>
    )
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
    />
  )
}

export function Reveal({
  children,
  delay = 0,
  className = ''
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, shown } = useReveal<HTMLDivElement>(0.1)
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}

export function SectionHeader({
  eyebrow,
  title
}: {
  eyebrow: string
  title: string
}) {
  return (
    <div className="mb-8">
      <span className="text-xs font-mono uppercase tracking-[0.25em] text-lime-400">
        {'// '}
        {eyebrow}
      </span>
      <AnimatedText
        as="h2"
        text={title}
        className="mt-2 block text-3xl md:text-4xl font-bold text-white"
      />
    </div>
  )
}

export function SectionTabs({
  sections
}: {
  sections: { id: string; label: string }[]
}) {
  const [active, setActive] = useState(sections[0]?.id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting)
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sections])

  return (
    <nav
      aria-label="Seções do jogo"
      className="sticky top-0 z-30 border-y border-zinc-800 bg-zinc-950/80 backdrop-blur"
    >
      <ul className="max-w-5xl mx-auto px-6 flex gap-1 overflow-x-auto">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`block px-4 py-3 text-sm whitespace-nowrap border-b-2 transition-colors ${
                active === id
                  ? 'border-lime-400 text-lime-300'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

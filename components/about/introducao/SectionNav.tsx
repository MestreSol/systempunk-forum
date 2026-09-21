'use client'

import { useEffect, useState } from 'react'
import { sectionLinks } from './data'

export function SectionNav() {
  const [active, setActive] = useState(sectionLinks[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    sectionLinks.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Seções da página"
      className="sticky top-0 z-30 border-y border-zinc-800 bg-zinc-950/80 backdrop-blur"
    >
      <ul className="max-w-6xl mx-auto px-6 flex gap-1 overflow-x-auto">
        {sectionLinks.map(({ id, label }) => (
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

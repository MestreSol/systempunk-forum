'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Single IntersectionObserver for the whole site. Server components opt in
 * with `data-reveal` / `data-draw`; this flips `data-visible` once in view.
 */
export default function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      '[data-reveal]:not([data-visible]), [data-draw]:not([data-visible])'
    )
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => (el.dataset.visible = 'true'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          ;(entry.target as HTMLElement).dataset.visible = 'true'
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  return null
}

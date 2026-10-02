'use client'

import { useEffect, useRef } from 'react'

/**
 * Muted loop that only downloads and plays while on screen, and never
 * autoplays for users who prefer reduced motion.
 */
export default function LazyVideo({
  src,
  poster,
  label
}: {
  src: string
  poster?: string
  label: string
}) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      video.src = src
      video.controls = true
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) video.src = src
          video.play().catch(() => (video.controls = true))
        } else {
          video.pause()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [src])

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      className="absolute inset-0 size-full object-cover"
    />
  )
}

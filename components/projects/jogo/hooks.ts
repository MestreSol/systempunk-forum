import { useEffect, useRef, useState } from 'react'

export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, shown }
}

export function useCountUp(target: number, start: boolean, duration = 1400) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    let frame = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1)
      setValue(target * (1 - Math.pow(1 - p, 3)))
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, start, duration])

  return value
}

export function parseDownloads(value: string) {
  const n = parseFloat(value)
  return /k/i.test(value) ? n * 1000 : n
}

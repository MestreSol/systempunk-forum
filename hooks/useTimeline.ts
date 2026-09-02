'use client'

import { useState, useEffect, useCallback } from 'react'
import { mapEras } from '../lib/timelineHelpers'
import { UniverseEra } from '../types/Timeline.type'

export default function useTimeline(rawEras: any[]) {
  const universeEras: UniverseEra[] = mapEras(rawEras)

  const [currentEra, setCurrentEra] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [loadingIconIndex, setLoadingIconIndex] = useState(0)
  const [loadingOpacity, setLoadingOpacity] = useState(1)

  const currentEraData = universeEras[currentEra]

  useEffect(() => {
    if (!isInitialLoad) return
    const interval = setInterval(() => {
      setLoadingIconIndex((prev) => (prev + 1) % Math.min(12, universeEras.length))
    }, 300)
    return () => clearInterval(interval)
  }, [isInitialLoad, universeEras.length])

  useEffect(() => {
    const fadeTimer = setTimeout(() => setLoadingOpacity(0), 3700)
    const hideTimer = setTimeout(() => setIsInitialLoad(false), 4000)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  // Was a lazy useState(() => ...) initializer reading currentEraData
  // directly — that only ran once at mount, which worked when rawEras was
  // available synchronously. Now that rawEras is fetched, universeEras is
  // still empty on that first render, so it always initialized to
  // undefined. Plain undefined here; the effect below (keyed on
  // universeEras.length, a stable primitive) sets it once era data
  // actually arrives.
  const [topBg, setTopBg] = useState<string | undefined>(undefined)
  const [bottomBg, setBottomBg] = useState<string | undefined>(undefined)
  const [showTop, setShowTop] = useState(true)

  // Sets the initial background as soon as era data actually loads —
  // separate from the crossfade effect below, which only reacts to
  // `currentEra` changing (era data arriving doesn't change currentEra, so
  // that effect alone would never fire for this case).
  useEffect(() => {
    if (universeEras.length === 0 || topBg || bottomBg) return
    const url = currentEraData?.backgroundImage ? `/${currentEraData.backgroundImage}` : undefined
    setTopBg(url)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [universeEras.length])

  useEffect(() => {
    const newUrl = currentEraData?.backgroundImage ? `/${currentEraData.backgroundImage}` : undefined
    if (!topBg && !bottomBg) {
      setTopBg(newUrl)
      return
    }
    if (showTop) {
      setBottomBg(newUrl)
      requestAnimationFrame(() => setShowTop(false))
    } else {
      setTopBg(newUrl)
      requestAnimationFrame(() => setShowTop(true))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEra])

  const nextEra = useCallback(() => {
    setIsLoading(true)
    setTimeout(() => {
      setCurrentEra((prev) => (prev + 1) % universeEras.length)
      setIsLoading(false)
    }, 300)
  }, [universeEras.length])

  const previousEra = useCallback(() => {
    setIsLoading(true)
    setTimeout(() => {
      setCurrentEra((prev) => (prev - 1 + universeEras.length) % universeEras.length)
      setIsLoading(false)
    }, 300)
  }, [universeEras.length])

  const goToEra = (eraIndex: number) => {
    if (eraIndex !== currentEra) {
      setIsLoading(true)
      setTimeout(() => {
        setCurrentEra(eraIndex)
        setIsLoading(false)
      }, 300)
    }
  }

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => setCurrentEra((prev) => (prev + 1) % universeEras.length), 8000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, universeEras.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          previousEra()
          break
        case 'ArrowRight':
          e.preventDefault()
          nextEra()
          break
        case ' ':
          e.preventDefault()
          setIsAutoPlaying((v) => !v)
          break
        case 'i':
          e.preventDefault()
          setShowDetails((v) => !v)
          break
        case 'Escape':
          setShowDetails(false)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextEra, previousEra])

  return {
    universeEras,
    currentEra,
    isAutoPlaying,
    showDetails,
    isLoading,
    isInitialLoad,
    loadingIconIndex,
    loadingOpacity,
    currentEraData,
    topBg,
    bottomBg,
    showTop,
    nextEra,
    previousEra,
    goToEra,
    setIsAutoPlaying,
    setShowDetails,
    setCurrentEra
  }
}

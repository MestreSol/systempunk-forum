'use client'

/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Info,
  ChevronDown,
  Cpu
} from 'lucide-react'
import * as Icons from 'lucide-react'
import eras from './eras.json'

interface UniverseEra {
  id: string
  name: string
  period: string
  motto: string
  description: string
  backgroundImage?: string
  backgroundGradient: string
  textColor: string
  accentColor: string
  icon: any
  details: {
    overview: string
    keyEvents: string[]
    technology: string[]
    culture: string
  }
}

const rawEras = eras as any[]

const universeEras: UniverseEra[] = rawEras.map((e) => ({
  ...e,
  icon: (Icons as any)[e.icon] || Cpu
}))

export default function UniverseTimelinePage() {
  const [currentEra, setCurrentEra] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [loadingIconIndex, setLoadingIconIndex] = useState(0)
  const [loadingOpacity, setLoadingOpacity] = useState(1)

  const currentEraData = universeEras[currentEra]

  // Cycle through icons during loading
  useEffect(() => {
    if (!isInitialLoad) return

    const interval = setInterval(() => {
      setLoadingIconIndex((prev) => (prev + 1) % Math.min(12, universeEras.length))
    }, 300)

    return () => clearInterval(interval)
  }, [isInitialLoad])

  // Simulate initial loading for heavy content
  useEffect(() => {
    // Start fade-out transition
    const fadeTimer = setTimeout(() => {
      setLoadingOpacity(0)
    }, 3700) // Start fade 300ms before end

    // Remove loading screen after fade completes
    const hideTimer = setTimeout(() => {
      setIsInitialLoad(false)
    }, 4000) // Total duration

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  const [topBg, setTopBg] = useState<string | undefined>(() => {
    return currentEraData?.backgroundImage
      ? `/${currentEraData.backgroundImage}`
      : undefined
  })
  const [bottomBg, setBottomBg] = useState<string | undefined>(undefined)
  const [showTop, setShowTop] = useState(true)

  useEffect(() => {
    const newUrl = currentEraData?.backgroundImage
      ? `/${currentEraData.backgroundImage}`
      : undefined

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
  }, [currentEra])

  const nextEra = useCallback(() => {
    setIsLoading(true)
    setTimeout(() => {
      setCurrentEra((prev) => (prev + 1) % universeEras.length)
      setIsLoading(false)
    }, 300)
  }, [])

  const previousEra = useCallback(() => {
    setIsLoading(true)
    setTimeout(() => {
      setCurrentEra((prev) => (prev - 1 + universeEras.length) % universeEras.length)
      setIsLoading(false)
    }, 300)
  }, [])

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

    const interval = setInterval(() => {
      setCurrentEra((prev) => (prev + 1) % universeEras.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

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
          setIsAutoPlaying(!isAutoPlaying)
          break
        case 'i':
          e.preventDefault()
          setShowDetails(!showDetails)
          break
        case 'Escape':
          setShowDetails(false)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentEra, isAutoPlaying, showDetails, nextEra, previousEra])

  // Loading Screen
  if (isInitialLoad) {
    const LoadingIcon = universeEras[loadingIconIndex]?.icon || Cpu
    const iconColor = loadingIconIndex % 3 === 0 
      ? 'text-lime-400' 
      : loadingIconIndex % 3 === 1 
      ? 'text-purple-400' 
      : 'text-cyan-400'
    
    const glowColor = loadingIconIndex % 3 === 0 
      ? 'bg-lime-500/20' 
      : loadingIconIndex % 3 === 1 
      ? 'bg-purple-500/20' 
      : 'bg-cyan-500/20'

    return (
      <div 
        className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative transition-opacity duration-300"
        style={{ opacity: loadingOpacity }}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-black animate-pulse" />
        
        {/* Central loading content */}
        <div className="relative z-10 flex flex-col items-center gap-8">
          {/* Morphing animated icon */}
          <div className="relative">
            <div className={`absolute inset-0 ${glowColor} blur-3xl transition-all duration-500`} />
            <div className="relative w-32 h-32 rounded-full border-4 border-lime-500/30 flex items-center justify-center overflow-hidden">
              {/* Icon with morph animation */}
              <div className="relative w-16 h-16 flex items-center justify-center">
                <LoadingIcon 
                  className={`absolute w-16 h-16 ${iconColor} transition-all duration-300 animate-icon-morph`}
                  style={{
                    animation: 'iconMorph 0.3s ease-in-out'
                  }}
                />
              </div>
              
              {/* Orbiting particles */}
              <div className="absolute inset-0">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-lime-400 rounded-full"
                    style={{
                      animation: `orbit 2s linear infinite`,
                      animationDelay: `${i * 0.5}s`,
                      left: '50%',
                      top: '50%',
                      marginLeft: '-4px',
                      marginTop: '-4px'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Loading text with era name */}
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Linha do Tempo
            </h2>
            <p className="text-zinc-400 text-sm md:text-base transition-all duration-300">
              {universeEras[loadingIconIndex]?.name || 'Carregando'}...
            </p>
            <p className="text-zinc-600 text-xs">
              Preparando {universeEras.length} eras
            </p>
          </div>

          {/* Progress indicator */}
          <div className="w-64 h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-lime-500 via-purple-500 to-cyan-500 rounded-full transition-all duration-300"
              style={{
                width: `${((loadingIconIndex + 1) / Math.min(12, universeEras.length)) * 100}%`
              }}
            />
          </div>

          {/* Mini icon previews */}
          <div className="flex gap-2 mt-4">
            {universeEras.slice(0, 8).map((era, idx) => {
              const MiniIcon = era.icon || Cpu
              return (
                <div
                  key={era.id}
                  className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-300 ${
                    idx === loadingIconIndex % 8
                      ? 'border-lime-500 bg-lime-500/10 scale-125'
                      : 'border-zinc-700 bg-zinc-900/50 opacity-50'
                  }`}
                >
                  <MiniIcon className="w-4 h-4 text-zinc-400" />
                </div>
              )
            })}
          </div>
        </div>

        {/* Corner decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-500/5 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 blur-3xl rounded-full animate-pulse" />
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden animate-in fade-in duration-500">"
      <div className="absolute inset-0">
        {/* Bottom layer */}
        <div
          className={`absolute inset-0 bg-center bg-cover transition-opacity duration-1000`}
          style={{
            backgroundImage: bottomBg ? `url('${bottomBg}')` : undefined,
            opacity: showTop ? 0 : 1
          }}
        />

        <div
          className={`absolute inset-0 bg-center bg-cover transition-opacity duration-1000`}
          style={{
            backgroundImage: topBg ? `url('${topBg}')` : undefined,
            opacity: showTop ? 1 : 0
          }}
        />

        <div
          className={`absolute inset-0 pointer-events-none`}
          style={{
            opacity: 0.6
          }}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${currentEraData?.backgroundGradient}`}
          />
        </div>

        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </div>

      <div className="absolute top-0 left-0 right-0 z-50 px-4 py-3 md:p-6">
        <div className="flex items-center justify-between">
          <Link
            href="/about/introducao"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </Link>

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar px-2">
            <div className="flex gap-2 items-center">
              {universeEras.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToEra(index)}
                  aria-label={`Ir para era ${index + 1}`}
                  className={`flex-shrink-0 w-3 h-3 md:w-3 md:h-3 rounded-full border-2 transition-all duration-300 touch-manipulation ${
                    index === currentEra
                      ? 'bg-white border-white scale-125'
                      : 'bg-transparent border-white/50 hover:border-white/80'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-white/80 hover:text-white hover:bg-white/10 p-2 md:p-3"
              aria-label={isAutoPlaying ? 'Pausar' : 'Reproduzir'}
            >
              {isAutoPlaying ? (
                <Pause className="w-4 h-4 md:w-5 md:h-5" />
              ) : (
                <Play className="w-4 h-4 md:w-5 md:h-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="text-white/80 hover:text-white hover:bg-white/10 p-2 md:p-3"
              aria-label="Detalhes"
            >
              <Info className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-6 md:p-6">
        <div
          className={`text-center max-w-3xl md:max-w-5xl mx-auto transition-all duration-700 ${
            isLoading
              ? 'opacity-0 transform scale-95'
              : 'opacity-100 transform scale-100'
          }`}
        >
          <div
            className={`inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 mb-6 md:mb-8 rounded-full border-4 ${currentEraData?.accentColor} border-current`}
          >
            <currentEraData.icon className="w-12 h-12" />
          </div>

          <div
            className={`text-sm font-mono tracking-wider mb-4 ${currentEraData?.accentColor}`}
          >
            {currentEraData?.period}
          </div>

          <h1
            className={`text-4xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 ${currentEraData?.textColor}`}
            style={{ lineHeight: 1.02 }}
          >
            {currentEraData?.name}
          </h1>

          <p
            className={`text-lg md:text-2xl md:text-3xl font-light italic mb-6 md:mb-8 ${currentEraData?.accentColor}`}
          >
            {currentEraData?.motto}
          </p>

          <p
            className={`text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed ${currentEraData?.textColor} opacity-90`}
            style={{ wordBreak: 'break-word' }}
          >
            {currentEraData?.description}
          </p>
        </div>
      </div>

      <button
        onClick={previousEra}
        disabled={currentEra === 0}
        className={`absolute left-6 top-1/2 transform -translate-y-1/2 z-20 p-4 rounded-full bg-black/30 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/50 transition-all ${
          currentEra === 0 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={nextEra}
        disabled={currentEra === universeEras.length - 1}
        className={`absolute right-6 top-1/2 transform -translate-y-1/2 z-20 p-4 rounded-full bg-black/30 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/50 transition-all ${
          currentEra === universeEras.length - 1
            ? 'opacity-50 cursor-not-allowed'
            : ''
        }`}
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {showDetails && (
        <div className="absolute bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm text-white p-8 transform transition-transform duration-500">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-lime-400">
                  Visão Geral
                </h3>
                <p className="text-sm leading-relaxed opacity-90">
                  {currentEraData?.details.overview}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-cyan-400">
                  Eventos-Chave
                </h3>
                <ul className="space-y-2">
                  {currentEraData?.details.keyEvents.map((event, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="opacity-90">{event}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-purple-400">
                    Tecnologias
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentEraData?.details.technology.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-orange-400">
                    Cultura
                  </h3>
                  <p className="text-sm leading-relaxed opacity-90">
                    {currentEraData?.details.culture}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30">
        <div className="bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 text-white/80 text-sm">
          {currentEra + 1} / {universeEras.length}
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-30 text-white/60 text-xs">
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3">
          <div>← → Navegar</div>
          <div>Espaço: Play/Pause</div>
          <div>I: Detalhes</div>
        </div>
      </div>
    </div>
  )
}

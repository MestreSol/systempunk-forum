 'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Pause, Play, Info } from 'lucide-react'
import { UniverseEra } from '../../types/Timeline.type'

interface Props {
  universeEras: UniverseEra[]
  currentEra: number
  goToEra: (index: number) => void
  isAutoPlaying: boolean
  setIsAutoPlaying: (v: boolean) => void
  setShowDetails: (v: boolean) => void
}

export default function TimelineHeader({ universeEras, currentEra, goToEra, isAutoPlaying, setIsAutoPlaying, setShowDetails }: Props) {
  return (
    <div className="absolute top-0 left-0 right-0 z-50 px-4 py-3 md:p-6">
      <div className="flex items-center justify-between">
        <Link href="/about/introducao" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
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
                  index === currentEra ? 'bg-white border-white scale-125' : 'bg-transparent border-white/50 hover:border-white/80'
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
            {isAutoPlaying ? <Pause className="w-4 h-4 md:w-5 md:h-5" /> : <Play className="w-4 h-4 md:w-5 md:h-5" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(true)}
            className="text-white/80 hover:text-white hover:bg-white/10 p-2 md:p-3"
            aria-label="Detalhes"
          >
            <Info className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

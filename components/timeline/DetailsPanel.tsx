 'use client'

import React from 'react'
import { ChevronDown, BookOpen, Sparkles } from 'lucide-react'
import { UniverseEra } from '../../types/Timeline.type'
import { useRouter } from 'next/navigation'

interface Props {
  showDetails: boolean
  setShowDetails: (v: boolean) => void
  currentEraData?: UniverseEra | null
}

export default function DetailsPanel({ showDetails, setShowDetails, currentEraData }: Props) {
  const router = useRouter()

  if (!showDetails) return null

  const handleReadMore = () => {
    if (currentEraData?.storyPath) {
      router.push(currentEraData.storyPath)
    }
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm text-white p-8 transform transition-transform duration-500">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-lime-400">Visão Geral</h3>
            <p className="text-sm leading-relaxed opacity-90">{currentEraData?.details.overview}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-cyan-400">Eventos-Chave</h3>
            <ul className="space-y-2">
              {currentEraData?.details.keyEvents.map((event: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="opacity-90">{event}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Tecnologias</h3>
              <div className="flex flex-wrap gap-2">
                {currentEraData?.details.technology.map((tech: string, idx: number) => (
                  <span key={idx} className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs">{tech}</span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-orange-400">Cultura</h3>
              <p className="text-sm leading-relaxed opacity-90">{currentEraData?.details.culture}</p>
            </div>
          </div>
        </div>

        {/* Botão Ler Mais - Chamativo */}
        {currentEraData?.storyPath && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleReadMore}
              className="group relative px-8 py-4 bg-gradient-to-r from-lime-500 via-cyan-500 to-purple-500 rounded-full font-bold text-lg text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-400 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative flex items-center gap-3">
                <BookOpen className="w-6 h-6" />
                <span>Ler História Completa</span>
                <Sparkles className="w-5 h-5 animate-spin group-hover:animate-pulse" />
              </div>
            </button>
          </div>
        )}

        <button onClick={() => setShowDetails(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors">
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

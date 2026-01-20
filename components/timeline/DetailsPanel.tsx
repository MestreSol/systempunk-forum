 'use client'

import React from 'react'
import { ChevronDown } from 'lucide-react'
import { UniverseEra } from '../../types/Timeline.type'

interface Props {
  showDetails: boolean
  setShowDetails: (v: boolean) => void
  currentEraData?: UniverseEra | null
}

export default function DetailsPanel({ showDetails, setShowDetails, currentEraData }: Props) {
  if (!showDetails) return null

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

        <button onClick={() => setShowDetails(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors">
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

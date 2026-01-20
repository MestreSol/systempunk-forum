 'use client'

import React from 'react'
import { Cpu } from 'lucide-react'
import { UniverseEra } from '../../types/Timeline.type'

interface Props {
  universeEras: UniverseEra[]
  loadingIconIndex: number
  loadingOpacity: number
}

export default function TimelineLoading({ universeEras, loadingIconIndex, loadingOpacity }: Props) {
  const LoadingIcon = universeEras[loadingIconIndex]?.icon || Cpu
  const iconColor = loadingIconIndex % 3 === 0 ? 'text-lime-400' : loadingIconIndex % 3 === 1 ? 'text-purple-400' : 'text-cyan-400'
  const glowColor = loadingIconIndex % 3 === 0 ? 'bg-lime-500/20' : loadingIconIndex % 3 === 1 ? 'bg-purple-500/20' : 'bg-cyan-500/20'

  return (
    <div
      className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative transition-opacity duration-300"
      style={{ opacity: loadingOpacity }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-black animate-pulse" />
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="relative">
          <div className={`absolute inset-0 ${glowColor} blur-3xl transition-all duration-500`} />
          <div className="relative w-32 h-32 rounded-full border-4 border-lime-500/30 flex items-center justify-center overflow-hidden">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <LoadingIcon className={`absolute w-16 h-16 ${iconColor} transition-all duration-300 animate-icon-morph`} style={{ animation: 'iconMorph 0.3s ease-in-out' }} />
            </div>
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

        <div className="flex flex-col items-center gap-3">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Linha do Tempo</h2>
          <p className="text-zinc-400 text-sm md:text-base transition-all duration-300">{universeEras[loadingIconIndex]?.name || 'Carregando'}...</p>
          <p className="text-zinc-600 text-xs">Preparando {universeEras.length} eras</p>
        </div>

        <div className="w-64 h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-lime-500 via-purple-500 to-cyan-500 rounded-full transition-all duration-300"
            style={{ width: `${((loadingIconIndex + 1) / Math.min(12, universeEras.length)) * 100}%` }}
          />
        </div>

        <div className="flex gap-2 mt-4">
          {universeEras.slice(0, 8).map((era, idx) => {
            const MiniIcon = era.icon || Cpu
            return (
              <div
                key={era.id}
                className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-300 ${
                  idx === loadingIconIndex % 8 ? 'border-lime-500 bg-lime-500/10 scale-125' : 'border-zinc-700 bg-zinc-900/50 opacity-50'
                }`}
              >
                <MiniIcon className="w-4 h-4 text-zinc-400" />
              </div>
            )
          })}
        </div>
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-lime-500/5 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 blur-3xl rounded-full animate-pulse" />
    </div>
  )
}

 'use client'

import React from 'react'
import { UniverseEra } from '../../types/Timeline.type'

interface Props {
  currentEraData?: UniverseEra | null
  isLoading: boolean
}

export default function TimelineMain({ currentEraData, isLoading }: Props) {
  return (
    <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-6 md:p-6">
      <div className={`text-center max-w-3xl md:max-w-5xl mx-auto transition-all duration-700 ${isLoading ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
        <div className={`inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 mb-6 md:mb-8 rounded-full border-4 ${currentEraData?.accentColor} border-current`}>
          <currentEraData.icon className="w-12 h-12" />
        </div>

        <div className={`text-sm font-mono tracking-wider mb-4 ${currentEraData?.accentColor}`}>{currentEraData?.period}</div>

        <h1 className={`text-4xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 ${currentEraData?.textColor}`} style={{ lineHeight: 1.02 }}>
          {currentEraData?.name}
        </h1>

        <p className={`text-lg md:text-2xl md:text-3xl font-light italic mb-6 md:mb-8 ${currentEraData?.accentColor}`}>{currentEraData?.motto}</p>

        <p className={`text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed ${currentEraData?.textColor} opacity-90`} style={{ wordBreak: 'break-word' }}>
          {currentEraData?.description}
        </p>
      </div>
    </div>
  )
}

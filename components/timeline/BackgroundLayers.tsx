 'use client'

import React from 'react'
import { UniverseEra } from '../../types/Timeline.type'

interface Props {
  bottomBg?: string | undefined
  topBg?: string | undefined
  showTop: boolean
  currentEraData?: UniverseEra | null
}

export default function BackgroundLayers({ bottomBg, topBg, showTop, currentEraData }: Props) {
  return (
    <div className="absolute inset-0">
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

      <div className={`absolute inset-0 pointer-events-none`} style={{ opacity: 0.6 }}>
        <div className={`absolute inset-0 bg-gradient-to-br ${currentEraData?.backgroundGradient}`} />
      </div>

      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
    </div>
  )
}

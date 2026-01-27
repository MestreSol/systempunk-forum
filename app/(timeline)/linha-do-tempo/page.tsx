 'use client'

import eras from './eras.json'
import TimelineLoading from '@/components/timeline/TimelineLoading'
import BackgroundLayers from '@/components/timeline/BackgroundLayers'
import TimelineHeader from '@/components/timeline/TimelineHeader'
import TimelineMain from '@/components/timeline/TimelineMain'
import DetailsPanel from '@/components/timeline/DetailsPanel'
import useTimeline from '@/hooks/useTimeline'

const rawEras = eras as any[]

export default function UniverseTimelinePage() {
  const {
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
    setShowDetails
  } = useTimeline(rawEras)

  if (isInitialLoad) {
    return <TimelineLoading universeEras={universeEras} loadingIconIndex={loadingIconIndex} loadingOpacity={loadingOpacity} />
  }

  return (
    <div className="min-h-screen relative overflow-hidden animate-in fade-in duration-500">
      <BackgroundLayers bottomBg={bottomBg} topBg={topBg} showTop={showTop} currentEraData={currentEraData} />

      <TimelineHeader
        universeEras={universeEras}
        currentEra={currentEra}
        goToEra={goToEra}
        isAutoPlaying={isAutoPlaying}
        setIsAutoPlaying={setIsAutoPlaying}
        setShowDetails={setShowDetails}
      />

      <TimelineMain currentEraData={currentEraData} isLoading={isLoading} />

      <button
        onClick={previousEra}
        disabled={currentEra === 0}
        className={`absolute left-6 top-1/2 transform -translate-y-1/2 z-20 p-4 rounded-full bg-black/30 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/50 transition-all ${
          currentEra === 0 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <span className="sr-only">Anterior</span>
      </button>

      <button
        onClick={nextEra}
        disabled={currentEra === universeEras.length - 1}
        className={`absolute right-6 top-1/2 transform -translate-y-1/2 z-20 p-4 rounded-full bg-black/30 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/50 transition-all ${
          currentEra === universeEras.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <span className="sr-only">Próximo</span>
      </button>

      <DetailsPanel showDetails={showDetails} setShowDetails={setShowDetails} currentEraData={currentEraData} />

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30">
        <div className="bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 text-white/80 text-sm">{currentEra + 1} / {universeEras.length}</div>
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

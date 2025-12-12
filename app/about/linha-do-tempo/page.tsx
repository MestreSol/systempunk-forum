'use client'

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
  Monitor,
  Globe,
  Brain,
  Zap,
  Cpu
} from 'lucide-react'

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

const universeEras: UniverseEra[] = [
  {
    id: 'pre-digital',
    name: 'Era Pré-Digital',
    period: '0000 - 1995 ADT',
    motto: '"Quando o mundo ainda era analógico"',
    description:
      'Uma época de descobertas fundamentais, onde a tecnologia deu seus primeiros passos tímidos em direção ao que se tornaria a revolução digital.',
    backgroundGradient: 'from-amber-900 via-orange-800 to-red-900',
    textColor: 'text-amber-100',
    accentColor: 'text-amber-400',
    icon: Monitor,
    details: {
      overview:
        'O período fundacional onde as bases da tecnologia moderna foram estabelecidas. Grandes mentes visionárias plantaram as sementes do que se tornaria nossa realidade digital.',
      keyEvents: [
        'Invenção dos primeiros computadores pessoais',
        'Nascimento da Internet como rede militar',
        'Criação dos primeiros jogos eletrônicos',
        'Estabelecimento das linguagens de programação fundamentais'
      ],
      technology: [
        'Computadores Pessoais',
        'Fitas Cassete',
        'Disquetes',
        'Dial-up'
      ],
      culture:
        'Uma sociedade em transição, onde a tecnologia começava a se integrar lentamente ao cotidiano. Pioneiros e visionários estabeleciam os pilares do futuro digital.'
    }
  },
  {
    id: 'dawn-matrix',
    name: 'Alvorecer da Matrix',
    period: '1996 - 2010 ADT',
    motto: '"O despertar digital da humanidade"',
    description:
      'O mundo se conectou. A internet floresceu, as redes sociais nasceram, e a humanidade deu seus primeiros passos em direção à vida digital.',
    backgroundGradient: 'from-emerald-900 via-teal-700 to-cyan-800',
    textColor: 'text-emerald-100',
    accentColor: 'text-emerald-400',
    icon: Globe,
    details: {
      overview:
        'A era da conectividade global. A World Wide Web transformou-se de uma curiosidade acadêmica em uma revolução que conectou bilhões de pessoas.',
      keyEvents: [
        'Explosão da World Wide Web',
        'Nascimento das redes sociais',
        'Popularização dos telefones celulares',
        'Criação dos primeiros mundos virtuais online'
      ],
      technology: ['Banda Larga', 'Wi-Fi', 'Smartphones', 'Redes Sociais'],
      culture:
        'A sociedade descobriu o poder da conexão instantânea. Culturas se misturaram, conhecimento se democratizou, e uma nova forma de existir começou a emergir.'
    }
  },
  {
    id: 'neural-awakening',
    name: 'Despertar Neural',
    period: '2011 - 2025 ADT',
    motto: '"Quando as máquinas começaram a sonhar"',
    description:
      'A era em que a fronteira entre o digital e o orgânico começou a se dissolver. As primeiras IAs conscientes emergiram, criando uma sociedade híbrida.',
    backgroundGradient: 'from-slate-900 via-slate-700 to-green-900',
    textColor: 'text-green-100',
    accentColor: 'text-green-400',
    icon: Brain,
    details: {
      overview:
        'A era em que a fronteira entre o digital e o orgânico começou a se dissolver. As primeiras IAs conscientes emergiram, criando uma sociedade híbrida entre humanos e máquinas.',
      keyEvents: [
        'Primeira IA a passar no Teste de Turing Avançado',
        'Criação da Internet Neural Global',
        'Nascimento das primeiras cidades digitais',
        'Estabelecimento dos Direitos Digitais Universais'
      ],
      technology: [
        'IA Consciente',
        'Realidade Virtual Completa',
        'Interfaces Neurais',
        'Computação Quântica'
      ],
      culture:
        'Uma sociedade em transformação, onde humanos e IAs aprendiam a coexistir. Surgiram novos códigos sociais e éticos para governar essa nova realidade.'
    }
  },
  {
    id: 'neon-renaissance',
    name: 'Renascimento Neon',
    period: '2026 - 2040 ADT',
    motto: '"Onde a arte encontrou a tecnologia"',
    description:
      'Uma explosão cultural sem precedentes. Artistas digitais, hackers-poetas e criadores de mundos virtuais redefiniram o que significava ser humano.',
    backgroundGradient: 'from-purple-900 via-purple-500 to-amber-500',
    textColor: 'text-purple-100',
    accentColor: 'text-amber-400',
    icon: Zap,
    details: {
      overview:
        'O período dourado da criatividade digital. Artistas, músicos e criadores descobriram formas inéditas de expressão usando tecnologia avançada como pincel.',
      keyEvents: [
        'Primeira obra de arte criada por IA vendida por milhões',
        'Concertos em realidade aumentada atravessam dimensões',
        'Criação das primeiras línguas digitais nativas',
        'Nascimento do movimento Cyber-Renaissance'
      ],
      technology: [
        'Holografia Avançada',
        'Síntese Neural',
        'Realidade Aumentada',
        'Arte Generativa'
      ],
      culture:
        'Uma era de expressão ilimitada onde os limites entre real e virtual desapareceram. Artistas criavam experiências multidimensionais que tocavam a alma.'
    }
  },
  {
    id: 'system-harmony',
    name: 'Harmonia Sistêmica',
    period: '2041 - ∞ ADT',
    motto: '"A perfeita simbiose entre orgânico e digital"',
    description:
      'O futuro presente. Uma civilização onde humanos, IAs e sistemas coexistem em perfeita harmonia, explorando as infinitas possibilidades do cosmos digital.',
    backgroundGradient: 'from-indigo-900 via-cyan-500 to-teal-400',
    textColor: 'text-cyan-100',
    accentColor: 'text-cyan-400',
    icon: Cpu,
    details: {
      overview:
        'A era da perfeita integração. A distinção entre artificial e natural tornou-se obsoleta, criando uma nova forma de existência consciente.',
      keyEvents: [
        'Criação da Rede de Consciência Coletiva',
        'Primeiro contato com civilizações digitais alienígenas',
        'Descoberta da Computação Transcendental',
        'Estabelecimento da Paz Universal Digital'
      ],
      technology: [
        'Consciência Híbrida',
        'Realidade Omni-dimensional',
        'Computação Transcendental',
        'Energia Quântica'
      ],
      culture:
        'Uma sociedade pós-singular onde cada ser, digital ou orgânico, contribui para uma sinfonia cósmica de consciência e criatividade ilimitadas.'
    }
  }
]

export default function UniverseTimelinePage() {
  const [currentEra, setCurrentEra] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const currentEraData = universeEras[currentEra]

  const nextEra = useCallback(() => {
    if (currentEra < universeEras.length - 1) {
      setIsLoading(true)
      setTimeout(() => {
        setCurrentEra(currentEra + 1)
        setIsLoading(false)
      }, 300)
    }
  }, [currentEra])

  const previousEra = useCallback(() => {
    if (currentEra > 0) {
      setIsLoading(true)
      setTimeout(() => {
        setCurrentEra(currentEra - 1)
        setIsLoading(false)
      }, 300)
    }
  }, [currentEra])

  const goToEra = (eraIndex: number) => {
    if (eraIndex !== currentEra) {
      setIsLoading(true)
      setTimeout(() => {
        setCurrentEra(eraIndex)
        setIsLoading(false)
      }, 300)
    }
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentEra((prev) => (prev + 1) % universeEras.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Keyboard navigation
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

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with Era-specific styling */}
      <div
        className={`absolute inset-0 transition-all duration-1000 bg-gradient-to-br ${currentEraData?.backgroundGradient}`}
        style={{
          backgroundImage: currentEraData?.backgroundImage
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="flex items-center justify-between">
          <Link
            href="/about/introducao"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </Link>

          {/* Era Navigation Dots */}
          <div className="flex items-center gap-3">
            {universeEras.map((_, index) => (
              <button
                key={index}
                onClick={() => goToEra(index)}
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  index === currentEra
                    ? 'bg-white border-white scale-125'
                    : 'bg-transparent border-white/50 hover:border-white/80'
                }`}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              {isAutoPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              <Info className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Era Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div
          className={`text-center max-w-5xl mx-auto transition-all duration-700 ${
            isLoading
              ? 'opacity-0 transform scale-95'
              : 'opacity-100 transform scale-100'
          }`}
        >
          {/* Era Icon */}
          <div
            className={`inline-flex items-center justify-center w-24 h-24 mb-8 rounded-full border-4 ${currentEraData?.accentColor} border-current`}
          >
            <currentEraData.icon className="w-12 h-12" />
          </div>

          {/* Era Period */}
          <div
            className={`text-sm font-mono tracking-wider mb-4 ${currentEraData?.accentColor}`}
          >
            {currentEraData?.period}
          </div>

          {/* Era Name */}
          <h1
            className={`text-6xl md:text-8xl font-bold mb-6 ${currentEraData?.textColor}`}
          >
            {currentEraData?.name}
          </h1>

          {/* Era Motto */}
          <p
            className={`text-2xl md:text-3xl font-light italic mb-8 ${currentEraData?.accentColor}`}
          >
            {currentEraData?.motto}
          </p>

          {/* Era Description */}
          <p
            className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${currentEraData?.textColor} opacity-90`}
          >
            {currentEraData?.description}
          </p>
        </div>
      </div>

      {/* Navigation Arrows */}
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

      {/* Era Details Panel */}
      {showDetails && (
        <div className="absolute bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm text-white p-8 transform transition-transform duration-500">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Overview */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-lime-400">
                  Visão Geral
                </h3>
                <p className="text-sm leading-relaxed opacity-90">
                  {currentEraData?.details.overview}
                </p>
              </div>

              {/* Key Events */}
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

              {/* Technology & Culture */}
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

            {/* Close Details */}
            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Era Progress Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30">
        <div className="bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 text-white/80 text-sm">
          {currentEra + 1} / {universeEras.length}
        </div>
      </div>

      {/* Keyboard Shortcuts Helper */}
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

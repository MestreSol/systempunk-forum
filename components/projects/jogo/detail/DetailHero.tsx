'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowDown, Download, PlayCircle, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { usePageVisibility } from '@/components/about/usePageVisibility'
import { SafeImage } from './common'
import { AnimatedText, GlitchText } from '../text-effects'

interface DetailHeroProps {
  image: string
  title: string
  subtitle: string
  status: string
  rating?: number
  downloads?: string
  platforms?: string[]
  tags: string[]
  trailer?: string
  onScrollDown: () => void
}

export function DetailHero({
  image,
  title,
  subtitle,
  status,
  rating,
  downloads,
  platforms,
  tags,
  trailer,
  onScrollDown
}: DetailHeroProps) {
  const isVisible = usePageVisibility()
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  return (
    <section
      className="relative min-h-[85vh] flex items-end overflow-hidden"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        setOffset({
          x: ((e.clientX - r.left) / r.width - 0.5) * 2,
          y: ((e.clientY - r.top) / r.height - 0.5) * 2
        })
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
    >
      <div
        className="absolute inset-[-4%] transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${offset.x * -16}px, ${offset.y * -10}px) scale(1.05)`
        }}
      >
        <SafeImage
          src={image}
          alt=""
          className="w-full h-full object-cover opacity-60"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-transparent" />
      <div className="absolute -bottom-32 -right-24 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />

      <Link
        href="/projects/jogo"
        className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-950/60 px-4 py-2 text-sm text-zinc-200 backdrop-blur transition-colors hover:border-lime-500 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4" />
        Todos os jogos
      </Link>

      <div
        className={`relative z-10 max-w-5xl mx-auto w-full px-6 pb-16 pt-32 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="flex flex-wrap gap-2 mb-5">
          <Badge className="bg-lime-600 text-white">{status}</Badge>
          {platforms?.map((p) => (
            <Badge
              key={p}
              variant="outline"
              className="border-zinc-500 text-zinc-200 bg-zinc-950/40"
            >
              {p}
            </Badge>
          ))}
        </div>

        <GlitchText
          as="h1"
          text={title}
          className="text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-lime-300 via-cyan-300 to-lime-300 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-shift"
        />
        <AnimatedText
          as="p"
          text={subtitle}
          delay={300}
          className="mt-4 block text-lg md:text-2xl text-zinc-300 max-w-3xl"
        />

        <div className="flex flex-wrap items-center gap-5 mt-6 text-sm text-zinc-300">
          {rating && (
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              {rating}
            </span>
          )}
          {downloads && (
            <span className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              {downloads}
            </span>
          )}
          {tags.map((t) => (
            <span key={t} className="text-zinc-400">
              #{t}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          {trailer && (
            <Button
              asChild
              size="lg"
              className="bg-lime-600 hover:bg-lime-500 px-8 shadow-lg shadow-lime-500/30 hover:scale-105 transition-transform"
            >
              <a href={trailer} target="_blank" rel="noopener noreferrer">
                <PlayCircle className="w-5 h-5 mr-2" />
                Assistir Trailer
              </a>
            </Button>
          )}
          <Button
            size="lg"
            variant="outline"
            className="border-zinc-600 bg-zinc-950/40 hover:bg-zinc-800 px-8"
            onClick={onScrollDown}
          >
            Explorar o jogo
            <ArrowDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, Download, Gamepad2, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { usePageVisibility } from '@/components/about/usePageVisibility'
import type { Project } from '@/types/Project.type'
import { AnimatedText, GlitchText, Typewriter } from './text-effects'

interface JogosHeroProps {
  featured: Project
  onBrowseClick: () => void
}

export function JogosHero({ featured, onBrowseClick }: JogosHeroProps) {
  const isVisible = usePageVisibility()
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setOffset({
      x: ((e.clientX - r.left) / r.width - 0.5) * 2,
      y: ((e.clientY - r.top) / r.height - 0.5) * 2
    })
  }

  return (
    <section
      className="relative min-h-[80vh] flex items-center overflow-hidden"
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
    >
      <div
        className="absolute inset-[-4%] transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${offset.x * -14}px, ${offset.y * -10}px) scale(1.05)`
        }}
      >
        <Image
          src={featured.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-transparent" />
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-lime-500/20 blur-3xl animate-pulse" />

      <div
        className={`relative z-10 max-w-6xl mx-auto w-full px-6 py-24 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="inline-flex items-center gap-2 text-lime-400 mb-4 font-mono text-xs uppercase tracking-[0.25em]">
          <Gamepad2 className="w-5 h-5" />
          <Typewriter
            phrases={[
              'Nossos jogos',
              'Em destaque',
              `${featured.status}`,
              'Jogue agora'
            ]}
          />
        </div>

        <GlitchText
          as="h1"
          text={featured.name}
          className="text-5xl md:text-7xl font-bold leading-tight max-w-3xl bg-gradient-to-r from-lime-300 via-cyan-300 to-lime-300 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-shift"
        />
        <AnimatedText
          as="p"
          text={featured.description}
          delay={300}
          className="mt-5 block text-lg md:text-xl text-zinc-300 max-w-2xl"
        />

        <div className="flex flex-wrap items-center gap-3 mt-6">
          <Badge className="bg-lime-600 text-white">{featured.status}</Badge>
          <span className="flex items-center gap-1 text-sm text-zinc-300">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            {featured.rating}
          </span>
          <span className="flex items-center gap-1 text-sm text-zinc-300">
            <Download className="w-4 h-4" />
            {featured.downloads}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button
            asChild
            size="lg"
            className="bg-lime-600 hover:bg-lime-500 px-8 shadow-lg shadow-lime-500/30 hover:scale-105 transition-transform"
          >
            <Link href={`/projects/jogo/${featured.id}`}>Ver Projeto</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-zinc-600 bg-zinc-950/40 hover:bg-zinc-800 px-8"
            onClick={onBrowseClick}
          >
            Ver todos os jogos
            <ArrowDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Download, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Project } from '@/types/Project.type'
import { useReveal } from './hooks'
import { GlitchText } from './text-effects'

interface GameCardProps {
  project: Project
  index: number
}

const REST = { rx: 0, ry: 0, gx: 50, gy: 50 }

export function GameCard({ project, index }: GameCardProps) {
  const { ref, shown } = useReveal<HTMLDivElement>()
  const [tilt, setTilt] = useState(REST)
  const [hovered, setHovered] = useState(false)

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    setTilt({
      rx: (0.5 - py) * 10,
      ry: (px - 0.5) * 12,
      gx: px * 100,
      gy: py * 100
    })
  }

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 120}ms` }}
      className={`transition-all duration-700 [perspective:1000px] ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
    >
      <Link
        href={`/projects/jogo/${project.id}`}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false)
          setTilt(REST)
        }}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${hovered ? 1.03 : 1})`
        }}
        className={`group relative block h-full overflow-hidden rounded-2xl border bg-zinc-900 transition-[transform,border-color,box-shadow] duration-200 motion-reduce:!transform-none ${
          project.featured
            ? 'border-lime-500/40 shadow-lg shadow-lime-500/10'
            : 'border-zinc-800'
        } hover:border-lime-400/70 hover:shadow-2xl hover:shadow-lime-500/20`}
      >
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.image}
            alt={`Arte de ${project.name}`}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
          {project.featured && (
            <Badge className="absolute top-3 left-3 bg-lime-600 text-white">
              ⭐ Em Destaque
            </Badge>
          )}
          <Badge
            variant="secondary"
            className="absolute top-3 right-3 bg-zinc-950/70 text-lime-300 backdrop-blur"
          >
            {project.status}
          </Badge>
        </div>

        <div className="relative p-6">
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:hidden"
            style={{
              background: `radial-gradient(240px circle at ${tilt.gx}% ${tilt.gy}%, rgba(163,230,53,0.12), transparent 70%)`
            }}
          />
          <div className="relative">
            <div className="flex items-start justify-between gap-3 mb-2">
              <GlitchText
                as="h3"
                mode="hover"
                text={project.name}
                className="text-xl font-bold text-lime-200"
              />
              <span className="flex items-center gap-1 text-xs text-zinc-400 shrink-0 pt-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                {project.rating}
              </span>
            </div>
            <p className="text-sm text-zinc-400 mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-1 mb-5">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs border-zinc-600 text-zinc-300"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1 text-zinc-500">
                <Download className="w-3 h-3" />
                {project.downloads}
              </span>
              <span className="flex items-center gap-1 font-medium text-lime-400 transition-all group-hover:gap-2">
                Ver Projeto
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

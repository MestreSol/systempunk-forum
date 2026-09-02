'use client'

import { Gamepad2 } from 'lucide-react'
import { projects } from '@/mocks/Projects'
import ProjectCard from '@/components/layout/home/ProjectCard'

export default function JogosPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-lime-400 mb-4">
            <Gamepad2 className="w-8 h-8" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Jogos
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-lime-200 mb-4">
            Nossos Jogos
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Experiências interativas únicas que estamos criando com paixão e
            dedicação no universo Systempunk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}

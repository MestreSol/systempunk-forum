'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import ProjectCard from './ProjectCard'
import { ArrowRight } from 'lucide-react'

type Project = any

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-lime-400 mb-4">
            Nossos Projetos
          </h2>
          <p className="text-xl text-primary-400 max-w-2xl mx-auto">
            Conheça os jogos que estamos desenvolvendo com paixão e dedicação.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects
            .filter((p) => p.featured)
            .map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/projects">
            <Button
              variant="outline"
              className="border-background-700 text-primary-300 hover:bg-background-800"
            >
              Ver Todos os Projetos
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

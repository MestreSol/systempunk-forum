'use client'

import { Download, Gamepad2, Star } from 'lucide-react'
import type { Project } from '@/types/Project.type'
import { parseDownloads, useCountUp, useReveal } from './hooks'

function Stat({
  icon: Icon,
  value,
  label,
  format
}: {
  icon: React.ComponentType<{ className?: string }>
  value: number
  label: string
  format: (n: number) => string
}) {
  const { ref, shown } = useReveal<HTMLDivElement>()
  const current = useCountUp(value, shown)

  return (
    <div ref={ref} className="bg-zinc-900 p-6 text-center">
      <Icon className="w-6 h-6 mx-auto mb-3 text-lime-400" />
      <div className="text-3xl font-bold text-white tabular-nums">
        {format(current)}
      </div>
      <div className="mt-1 text-sm text-zinc-400">{label}</div>
    </div>
  )
}

export function JogosStats({ projects }: { projects: Project[] }) {
  const total = projects.reduce((sum, p) => sum + parseDownloads(p.downloads), 0)
  const avg = projects.reduce((sum, p) => sum + p.rating, 0) / projects.length

  return (
    <section className="px-6 -mt-10 relative z-10">
      <div className="max-w-4xl mx-auto grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800 shadow-2xl shadow-black/40">
        <Stat
          icon={Gamepad2}
          value={projects.length}
          label="Jogos"
          format={(n) => Math.round(n).toString()}
        />
        <Stat
          icon={Star}
          value={avg}
          label="Avaliação média"
          format={(n) => n.toFixed(1)}
        />
        <Stat
          icon={Download}
          value={total}
          label="Downloads"
          format={(n) => `${(n / 1000).toFixed(1)}k+`}
        />
      </div>
    </section>
  )
}

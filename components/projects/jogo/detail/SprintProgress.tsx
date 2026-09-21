'use client'

import type {
  ProjectSprint,
  SprintActivityStatus
} from '@/types/ProjectDetail.type'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { useCountUp, useReveal } from '../hooks'

const statusLabel: Record<SprintActivityStatus, string> = {
  done: 'Concluído',
  ongoing: 'Em andamento',
  stopped: 'Parado',
  todo: 'A fazer'
}

const statusColor: Record<SprintActivityStatus, string> = {
  done: 'bg-lime-600/20 text-lime-300 border-lime-500/30',
  ongoing: 'bg-yellow-600/20 text-yellow-300 border-yellow-500/30',
  stopped: 'bg-red-600/20 text-red-300 border-red-500/30',
  todo: 'bg-zinc-700/40 text-zinc-400 border-zinc-600/30'
}

function Bar({ pct, shown }: { pct: number; shown: boolean }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
      <div
        className="h-full rounded-full bg-gradient-to-r from-lime-500 to-cyan-400 transition-[width] duration-1000 ease-out"
        style={{ width: shown ? `${pct}%` : '0%' }}
      />
    </div>
  )
}

export function SprintProgress({ sprints }: { sprints: ProjectSprint[] }) {
  const { ref, shown } = useReveal<HTMLDivElement>(0.2)
  const all = sprints.flatMap((s) => s.activities)
  const overall = all.length
    ? Math.round((all.filter((a) => a.status === 'done').length / all.length) * 100)
    : 0
  const counted = useCountUp(overall, shown)

  return (
    <div ref={ref} className="space-y-6">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="flex items-end justify-between mb-3">
          <span className="text-zinc-400">Progresso geral</span>
          <span className="text-4xl font-bold text-lime-300 tabular-nums">
            {Math.round(counted)}%
          </span>
        </div>
        <Bar pct={overall} shown={shown} />
      </div>

      <Accordion
        type="multiple"
        className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4"
      >
        {sprints.map((sprint) => {
          const total = sprint.activities.length
          const done = sprint.activities.filter((a) => a.status === 'done').length
          const pct = total > 0 ? Math.round((done / total) * 100) : 0

          return (
            <AccordionItem key={sprint.title} value={sprint.title}>
              <AccordionTrigger className="text-zinc-200">
                <div className="flex flex-col items-start gap-2 w-full pr-4">
                  <div className="flex w-full justify-between">
                    <span>{sprint.title}</span>
                    <span className="text-xs text-zinc-500">
                      {done}/{total}
                    </span>
                  </div>
                  <Bar pct={pct} shown={shown} />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {sprint.activities.map((activity) => (
                    <li
                      key={activity.name}
                      className="flex items-center justify-between gap-2 text-sm"
                    >
                      <span className="text-zinc-400">{activity.name}</span>
                      <Badge
                        variant="outline"
                        className={statusColor[activity.status]}
                      >
                        {statusLabel[activity.status]}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}

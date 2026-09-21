import type { ProjectRoadmapItem } from '@/types/ProjectDetail.type'
import { Reveal } from './common'

export function RoadmapTimeline({ items }: { items: ProjectRoadmapItem[] }) {
  return (
    <ol className="relative ml-3 border-l-2 border-lime-500/30 space-y-8 pl-8">
      {items.map((item, i) => (
        <li key={item.title} className="relative">
          <span className="absolute -left-[2.6rem] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-950 ring-2 ring-lime-500">
            <span className="h-2 w-2 rounded-full bg-lime-400 animate-pulse" />
          </span>
          <Reveal delay={i * 80}>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition-colors hover:border-lime-500/50">
              <span className="font-mono text-xs text-lime-400">{item.date}</span>
              <h3 className="mt-1 font-semibold text-lg text-white">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-400 mt-1">{item.description}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}

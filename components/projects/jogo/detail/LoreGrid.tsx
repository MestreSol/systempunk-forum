import type { ProjectLoreItem } from '@/types/ProjectDetail.type'
import { Reveal, SafeImage } from './common'

export function LoreGrid({ items }: { items: ProjectLoreItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, i) => (
        <Reveal key={item.title} delay={(i % 3) * 100}>
          <article className="group relative h-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-lime-500/60 hover:shadow-xl hover:shadow-lime-500/10">
            <div className="relative h-44 overflow-hidden">
              <SafeImage
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
              <span className="absolute bottom-3 left-4 font-mono text-xs text-lime-400">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg text-lime-100 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  )
}

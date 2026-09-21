import { Metric } from '@/types/Capability.type'

interface StatsSectionProps {
  stats: Metric[]
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="px-6 -mt-6 relative z-10">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800 shadow-2xl shadow-black/40">
        {stats.map((stat, index) => (
          <div key={index} className="bg-zinc-900 p-6 text-center">
            <stat.icon className="w-6 h-6 mx-auto mb-3 text-lime-400" />
            <div className="text-3xl font-bold text-white">
              {stat.current}
              {stat.unit}
            </div>
            <div className="mt-1 text-sm text-zinc-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

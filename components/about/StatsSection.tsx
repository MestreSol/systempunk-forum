interface StatsSectionProps {
  stats: {
    label: string
    value: string
    icon: React.ComponentType<{ className?: string }>
  }[]
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="py-16 px-6 bg-zinc-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-lime-500/20 rounded-full">
                <stat.icon className="w-8 h-8 text-lime-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-zinc-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface TimelineProps {
  milestones: {
    year: string
    title: string
    description: string
    icon: React.ComponentType<{ className?: string }>
  }[]
}

export function Timeline({ milestones }: TimelineProps) {
  return (
    <ol className="relative">
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-lime-400 via-zinc-700 to-cyan-400" />

      {milestones.map((milestone, index) => {
        const left = index % 2 === 0
        return (
          <li
            key={`${milestone.year}-${milestone.title}`}
            className="relative pl-16 md:pl-0 pb-12 last:pb-0 md:grid md:grid-cols-2 md:gap-16"
          >
            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-zinc-950 border-2 border-lime-400 flex items-center justify-center z-10">
              <milestone.icon className="w-5 h-5 text-lime-400" />
            </div>

            <div
              className={`rounded-xl border border-zinc-800 bg-zinc-900 p-6 ${
                left ? 'md:col-start-1 md:text-right' : 'md:col-start-2'
              }`}
            >
              <span className="font-mono text-sm text-lime-400">
                {milestone.year}
              </span>
              <h3 className="text-xl font-semibold text-white mt-1 mb-2">
                {milestone.title}
              </h3>
              <p className="text-zinc-400">{milestone.description}</p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

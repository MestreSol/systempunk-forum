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
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-lime-400 to-cyan-400"></div>

      <div className="space-y-12">
        {milestones.map((milestone, index) => (
          <div key={index} className="relative flex items-start">
            <div className="flex-shrink-0 w-16 h-16 bg-zinc-900 border-2 border-lime-400 rounded-full flex items-center justify-center relative z-10">
              <milestone.icon className="w-8 h-8 text-lime-400" />
            </div>
            <div className="ml-8">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-2xl font-bold text-lime-400">
                  {milestone.year}
                </span>
                <h3 className="text-xl font-semibold text-white">
                  {milestone.title}
                </h3>
              </div>
              <p className="text-zinc-300">{milestone.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

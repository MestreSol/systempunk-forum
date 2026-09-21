interface TechnologyCardProps {
  technologies: {
    name: string
    icon: React.ComponentType<{ className?: string }>
    category: string
  }[]
}

export function TechnologyCards({ technologies }: TechnologyCardProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {technologies.map((tech) => (
        <div
          key={tech.name}
          className="group flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition-all hover:-translate-y-0.5 hover:border-lime-500/50"
        >
          <div className="p-2.5 rounded-lg bg-lime-500/10 text-lime-400 group-hover:bg-lime-500/20">
            <tech.icon className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-white truncate">{tech.name}</h3>
            <p className="text-xs text-zinc-500">{tech.category}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

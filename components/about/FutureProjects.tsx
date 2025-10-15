import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Project } from '@/types/Project.type'
import { Calendar, Rocket } from 'lucide-react'

interface FutureProjectsProps {
  projects: Project[]
  icon?: React.ComponentType<{ className?: string }>
  title: string
}

export function FutureProjects({
  projects,
  icon: Icon = Rocket,
  title
}: FutureProjectsProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-lime-200 flex items-center gap-3">
          <Icon className="w-6 h-6" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="p-4 bg-zinc-800 rounded-lg">
            <h4 className="font-semibold text-white mb-2">{project.title}</h4>
            <p className="text-zinc-400 text-sm mb-3">{project.description}</p>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-zinc-400" />
              <span className="text-sm text-zinc-300">{project.timeline}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

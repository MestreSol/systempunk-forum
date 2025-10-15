import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import { FeaturedProject } from '@/types/Project.type'
import { Star, Download, Users } from 'lucide-react'

const featuredProjects: FeaturedProject[] = [
  {
    name: 'Neon Runners',
    description: 'Jogo de corrida cyberpunk com elementos de RPG',
    icon: ({ className }) => (
      <div
        className={`w-12 h-12 bg-lime-500/20 rounded-lg flex items-center justify-center ${className}`}
      >
        🎮
      </div>
    ),
    iconColor: 'text-lime-400',
    stats: { type: 'rating', value: '4.8/5 • 15K downloads' }
  },
  {
    name: 'DevTools Suite',
    description: 'Conjunto de ferramentas para desenvolvedores indie',
    icon: ({ className }) => (
      <div
        className={`w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center ${className}`}
      >
        💻
      </div>
    ),
    iconColor: 'text-cyan-400',
    stats: { type: 'downloads', value: '8.2K downloads' }
  },
  {
    name: 'Creative Hub',
    description: 'App mobile para colaboração criativa',
    icon: ({ className }) => (
      <div
        className={`w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center ${className}`}
      >
        📱
      </div>
    ),
    iconColor: 'text-purple-400',
    stats: { type: 'users', value: '2.1K usuários ativos' }
  }
]

function getStatIcon(type: string) {
  switch (type) {
    case 'rating':
      return <Star className="w-4 h-4 text-yellow-400" />
    case 'downloads':
      return <Download className="w-4 h-4 text-green-400" />
    case 'users':
      return <Users className="w-4 h-4 text-blue-400" />
    default:
      return null
  }
}

export function FeaturedProjects() {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-lime-200">Projetos em Destaque</CardTitle>
        <CardDescription>Nossos trabalhos mais significativos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <div
              key={index}
              className="bg-zinc-800 rounded-lg p-4 hover:bg-zinc-750 transition-colors"
            >
              <project.icon className="mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                {project.name}
              </h3>
              <p className="text-zinc-400 text-sm mb-4">
                {project.description}
              </p>
              <div className="flex items-center gap-2">
                {getStatIcon(project.stats.type)}
                <span className="text-sm text-zinc-300">
                  {project.stats.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

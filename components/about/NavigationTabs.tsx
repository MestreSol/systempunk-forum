import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart3, Gamepad2, Zap, Award, Rocket } from 'lucide-react'

interface NavigationTabsProps {
  className?: string
}

export function NavigationTabs({ className }: NavigationTabsProps) {
  return (
    <TabsList
      className={`grid w-full grid-cols-5 bg-zinc-900 border-zinc-800 ${className}`}
    >
      <TabsTrigger value="overview" className="data-[state=active]:bg-lime-600">
        <BarChart3 className="w-4 h-4 mr-2" />
        Resumo
      </TabsTrigger>
      <TabsTrigger value="projects" className="data-[state=active]:bg-lime-600">
        <Gamepad2 className="w-4 h-4 mr-2" />
        Projetos
      </TabsTrigger>
      <TabsTrigger
        value="capabilities"
        className="data-[state=active]:bg-lime-600"
      >
        <Zap className="w-4 h-4 mr-2" />
        Capacidades
      </TabsTrigger>
      <TabsTrigger
        value="achievements"
        className="data-[state=active]:bg-lime-600"
      >
        <Award className="w-4 h-4 mr-2" />
        Conquistas
      </TabsTrigger>
      <TabsTrigger value="future" className="data-[state=active]:bg-lime-600">
        <Rocket className="w-4 h-4 mr-2" />
        Futuro
      </TabsTrigger>
    </TabsList>
  )
}

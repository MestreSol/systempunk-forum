import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Rocket, Gamepad2, Users } from 'lucide-react'

interface HeroSectionProps {
  isVisible: boolean
  onExploreClick: () => void
  onTeamClick: () => void
}

export function HeroSection({
  isVisible,
  onExploreClick,
  onTeamClick
}: HeroSectionProps) {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-lime-500/10 via-transparent to-cyan-500/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(16,185,129,0.1),transparent_70%)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div
          className={`text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <Badge
            variant="outline"
            className="mb-6 text-lime-400 border-lime-400 bg-lime-400/10"
          >
            <Rocket className="w-4 h-4 mr-2" />
            Bem-vindo ao SystemPunk
          </Badge>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-lime-400 via-cyan-400 to-lime-400 bg-clip-text text-transparent">
            SystemPunk
          </h1>

          <p className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Onde <span className="text-lime-400 font-semibold">tecnologia</span>{' '}
            encontra{' '}
            <span className="text-cyan-400 font-semibold">criatividade</span>{' '}
            para criar{' '}
            <span className="text-lime-400 font-semibold">
              experiências digitais únicas
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-lime-600 hover:bg-lime-700 text-white px-8 py-3"
              onClick={onExploreClick}
            >
              <Gamepad2 className="w-5 h-5 mr-2" />
              Explorar Projetos
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-zinc-700 hover:bg-zinc-800 px-8 py-3"
              onClick={onTeamClick}
            >
              <Users className="w-5 h-5 mr-2" />
              Conhecer Equipe
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

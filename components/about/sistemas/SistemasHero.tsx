import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dices, MessageCircle } from 'lucide-react'

const DISCORD_URL = 'https://discord.gg/systempunk'

interface SistemasHeroProps {
  isVisible: boolean
  onPreviewClick: () => void
}

export function SistemasHero({ isVisible, onPreviewClick }: SistemasHeroProps) {
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
            <Dices className="w-4 h-4 mr-2" />
            Sistema de RPG SystemPunk
          </Badge>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-lime-400 via-cyan-400 to-lime-400 bg-clip-text text-transparent">
            Um Sistema Para Suas Lendas
          </h1>

          <p className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            O universo SystemPunk está ganhando{' '}
            <span className="text-lime-400 font-semibold">
              suas próprias regras de mesa
            </span>{' '}
            — um sistema de RPG homebrew,{' '}
            <span className="text-cyan-400 font-semibold">
              compatível com D&D 5e
            </span>
            , construído para dar vida às histórias, criaturas e artefatos que
            já existem no nosso universo compartilhado.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-lime-600 hover:bg-lime-700 text-white px-8 py-3"
              onClick={onPreviewClick}
            >
              <Dices className="w-5 h-5 mr-2" />
              Ver Prévia do Sistema
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-zinc-700 hover:bg-zinc-800 px-8 py-3"
              asChild
            >
              <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                Entrar no Discord
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

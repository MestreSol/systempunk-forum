import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MessageCircle, BookOpen } from 'lucide-react'

const DISCORD_URL = 'https://discord.gg/systempunk'

export function SistemasCTA() {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-lime-900/20 to-cyan-900/20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-lime-200 mb-6">
          Quer Ajudar a Moldar o Sistema?
        </h2>
        <p className="text-zinc-300 text-lg mb-8">
          O &quot;Tomo do Centauro&quot; é como a comunidade SystemPunk chama o
          material de RPG de mesa do universo. Ainda estamos escrevendo as
          regras — entre no nosso Discord para acompanhar o progresso, testar
          mecânicas e trocar ideias com quem também está construindo essas
          histórias.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-lime-600 hover:bg-lime-700 px-8" asChild>
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              Entrar no Discord
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-zinc-700 hover:bg-zinc-800 px-8"
            asChild
          >
            <Link href="/about/historias">
              <BookOpen className="w-5 h-5 mr-2" />
              Ver Histórias do Universo
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

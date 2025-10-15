import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Gamepad2, Monitor } from 'lucide-react'
import Link from 'next/link'

export function ProjectsTeaser() {
  return (
    <section id="projetos" className="py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-lime-200 mb-6">
          Explore Nossos Projetos
        </h2>
        <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
          Descubra os jogos, aplicações e experimentos que criamos com paixão e
          dedicação
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-zinc-900 border-zinc-800 hover:border-lime-500/50 transition-colors">
            <CardContent className="p-8">
              <Gamepad2 className="w-16 h-16 mx-auto mb-4 text-lime-400" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                Jogos Indie
              </h3>
              <p className="text-zinc-300 mb-6">
                Experiências únicas que misturam narrativa envolvente com
                mecânicas inovadoras
              </p>
              <Link href="/projects/jogo">
                <Button className="bg-lime-600 hover:bg-lime-700">
                  Ver Jogos
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 hover:border-lime-500/50 transition-colors">
            <CardContent className="p-8">
              <Monitor className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                Aplicações Web
              </h3>
              <p className="text-zinc-300 mb-6">
                Interfaces modernas e funcionais que redefinem a experiência
                digital
              </p>
              <Link href="/projects">
                <Button
                  variant="outline"
                  className="border-zinc-700 hover:bg-zinc-800"
                >
                  Ver Projetos
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

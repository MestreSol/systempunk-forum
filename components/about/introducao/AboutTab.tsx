import { Zap } from 'lucide-react'

export function AboutTab() {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-4xl font-bold text-lime-200 mb-6">Quem Somos</h2>
        <div className="space-y-4 text-zinc-300 leading-relaxed">
          <p>
            O <strong className="text-lime-400">SystemPunk</strong> é um
            coletivo criativo que nasceu da paixão por unir tecnologia de ponta
            com narrativas envolventes e design inovador.
          </p>
          <p>
            Somos desenvolvedores, designers, artistas e sonhadores que
            acreditam no poder da tecnologia para criar experiências que tocam o
            coração e expandem horizontes.
          </p>
          <p>
            Nosso trabalho abrange desde jogos indie revolucionários até
            aplicações web que redefinem a interação digital, sempre mantendo a{' '}
            <span className="text-cyan-400">criatividade</span> e a{' '}
            <span className="text-lime-400">inovação</span> no centro de tudo.
          </p>
        </div>
      </div>

      <div className="aspect-square bg-gradient-to-br from-lime-500/20 to-cyan-500/20 rounded-2xl p-8">
        <div className="w-full h-full bg-zinc-800 rounded-xl flex flex-col items-center justify-center gap-4">
          <Zap className="w-24 h-24 text-lime-400" />
          <p className="text-zinc-400">Imagem do estúdio</p>
        </div>
      </div>
    </div>
  )
}

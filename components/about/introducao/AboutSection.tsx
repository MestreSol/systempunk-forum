import { Zap } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { aboutHighlights } from './data'

export function AboutSection() {
  return (
    <section id="sobre" className="max-w-6xl mx-auto px-6 py-20 scroll-mt-14">
      <div className="grid md:grid-cols-5 gap-12 items-center">
        <div className="md:col-span-3">
          <SectionHeading eyebrow="quem somos" title="Um coletivo criativo" align="left" />
          <div className="space-y-4 text-zinc-300 leading-relaxed text-lg">
            <p>
              O <strong className="text-lime-400">SystemPunk</strong> nasceu da
              paixão por unir tecnologia de ponta com narrativas envolventes e
              design inovador.
            </p>
            <p>
              Somos desenvolvedores, designers, artistas e sonhadores que
              acreditam no poder da tecnologia para criar experiências que tocam
              o coração e expandem horizontes.
            </p>
            <p>
              Do jogo indie à aplicação web, mantemos a{' '}
              <span className="text-cyan-400">criatividade</span> e a{' '}
              <span className="text-lime-400">inovação</span> no centro de tudo.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-6">
            {aboutHighlights.map((item) => (
              <span
                key={item}
                className="px-3 py-1 text-sm rounded-full border border-zinc-700 bg-zinc-900 text-zinc-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="aspect-square rounded-2xl p-px bg-gradient-to-br from-lime-500/60 via-zinc-800 to-cyan-500/60">
            <div className="w-full h-full rounded-2xl bg-zinc-900 flex flex-col items-center justify-center gap-4">
              <Zap className="w-20 h-20 text-lime-400" />
              <p className="text-zinc-500 text-sm">Imagem do estúdio</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle, Dices } from 'lucide-react'
import { usePageVisibility } from '@/components/about/usePageVisibility'
import { SistemasHero } from '@/components/about/sistemas/SistemasHero'
import { PillarCard } from '@/components/about/sistemas/PillarCard'
import { PreviewCard } from '@/components/about/sistemas/PreviewCard'
import { SistemasCTA } from '@/components/about/sistemas/SistemasCTA'
import { pillars, previewItems } from '@/components/about/sistemas/data'

export default function SistemasPage() {
  const isVisible = usePageVisibility()

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SistemasHero
        isVisible={isVisible}
        onPreviewClick={() => scrollToSection('previa')}
      />

      {/* Disclaimer */}
      <div className="max-w-4xl mx-auto px-6 py-4">
        <Alert className="bg-amber-500/10 border-amber-500/30 text-amber-200 [&_svg]:text-amber-400">
          <AlertTriangle />
          <AlertTitle>Sistema em Desenvolvimento</AlertTitle>
          <AlertDescription className="text-amber-200/80">
            O material para o RPG de mesa do SystemPunk ainda não foi revisado,
            e o sistema ainda está em fase de desenvolvimento. Tudo que você vê
            abaixo é uma prévia — regras, números e mecânicas podem mudar antes
            do lançamento. Use por sua conta e risco em suas próprias mesas (e
            não nos responsabilizamos por TPKs).
          </AlertDescription>
        </Alert>
      </div>

      {/* Origem */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div
            className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <h2 className="text-4xl font-bold text-lime-200 mb-6">
              De Onde Vem o Sistema
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              Tudo começou em uma mesa de RPG entre amigos. Com o tempo,
              campanhas separadas foram se conectando até formar um único
              universo compartilhado, organizado em{' '}
              <span className="text-lime-400 font-semibold">Eras</span>. Dessas
              sessões nasceu a vontade de documentar um sistema de regras
              próprio — compatível com D&D 5e, mas com identidade própria:
              magia por pontos, artefatos com mecânicas exclusivas e um mundo
              vivo por trás de cada ficha de personagem.
            </p>
            <p className="text-zinc-300 leading-relaxed">
              O sistema ainda está sendo escrito — ao lado do{' '}
              <span className="text-cyan-400 font-semibold">
                Livro dos Monstros
              </span>{' '}
              e do{' '}
              <span className="text-cyan-400 font-semibold">
                Livro dos Jogadores
              </span>{' '}
              — mas parte do material já existe no universo SystemPunk. Abaixo,
              uma prévia do que está por vir.
            </p>
          </div>

          <div className="aspect-square bg-gradient-to-br from-lime-500/20 to-cyan-500/20 rounded-2xl flex flex-col items-center justify-center gap-4 border border-zinc-800">
            <Dices className="w-16 h-16 text-lime-400" />
            <span className="text-zinc-400 text-sm">
              Ficha de personagem em breve
            </span>
          </div>
        </div>
      </section>

      {/* Pilares */}
      <section id="pilares" className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-lime-200 mb-3">
            O Que Torna Esse Sistema Único
          </h2>
          <p className="text-zinc-400 text-lg">
            Mecânicas pensadas pra dar mais identidade às suas mesas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <PillarCard
              key={pillar.title}
              icon={pillar.icon}
              title={pillar.title}
              description={pillar.description}
            />
          ))}
        </div>
      </section>

      {/* Prévia de conteúdo */}
      <section id="previa" className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-lime-200 mb-3">
            Uma Espiada no Que Está Por Vir
          </h2>
          <p className="text-zinc-400 text-lg">
            Três peças do universo SystemPunk, adaptadas para o sistema em
            construção.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {previewItems.map((item) => (
            <PreviewCard
              key={item.title}
              icon={item.icon}
              category={item.category}
              title={item.title}
              teaser={item.teaser}
              stats={item.stats}
            />
          ))}
        </div>
      </section>

      <SistemasCTA />
    </div>
  )
}

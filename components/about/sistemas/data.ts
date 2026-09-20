import type { LucideIcon } from 'lucide-react'
import { Shield, Sparkles, Skull, Globe2, Flame, Swords, Zap } from 'lucide-react'

export interface Pillar {
  icon: LucideIcon
  title: string
  description: string
}

export const pillars: Pillar[] = [
  {
    icon: Shield,
    title: 'Compatível com D&D 5e',
    description:
      'Construído para funcionar lado a lado com fichas de D&D 5e, então grupos que já jogam podem migrar sem reaprender tudo do zero.'
  },
  {
    icon: Sparkles,
    title: 'Magia por Pontos',
    description:
      'Em vez de espaços de magia fixos, conjuradores gastam pontos por turno, trocando previsibilidade por flexibilidade tática.'
  },
  {
    icon: Skull,
    title: 'Sistema de Almas',
    description:
      "Certas armas e habilidades acumulam 'Almas' ao abater inimigos, um recurso que pode ser gasto em auras, curas e efeitos de batalha."
  },
  {
    icon: Globe2,
    title: 'Universo Compartilhado',
    description:
      'Cada personagem, item e ataque do sistema existe dentro da mesma continuidade das histórias, eras e lore do SystemPunk.'
  },
  {
    icon: Flame,
    title: 'Artefatos com Identidade',
    description:
      'Itens lendários carregam sua própria história, passivas únicas e uma habilidade ativa marcante — não são só bônus numéricos.'
  }
]

export interface PreviewItem {
  icon: LucideIcon
  category: 'Personagem' | 'Item' | 'Ataque'
  title: string
  teaser: string
  stats: string[]
}

export const previewItems: PreviewItem[] = [
  {
    icon: Skull,
    category: 'Personagem',
    title: 'Professor Thalassor Fallmora',
    teaser:
      'O Archimago da Corrupção guarda segredos que nem os deuses do universo SystemPunk ousam tocar. Enfrentá-lo é ver de perto o que acontece quando conhecimento supremo encontra corrupção mágica.',
    stats: ['PV 700', 'CA 22', 'INT 30', 'Magia por Pontos']
  },
  {
    icon: Swords,
    category: 'Item',
    title: 'Foice da Eternidade',
    teaser:
      'Forjada de um metal prateado-iridescente que ninguém sabe nomear, essa foice sussurra com as almas que já ceifou — e recompensa quem a empunha com poder a cada abate.',
    stats: ['Dano 3D4 Cortante', 'Tipo Artefato', 'Sistema de Almas']
  },
  {
    icon: Zap,
    category: 'Ataque',
    title: 'Raio da Escuridão',
    teaser:
      'Um pulso de energia sombria que arremessa o alvo para trás — ou, se o conjurador errar a mira, se transforma em uma explosão de escuridão que não perdoa quem está por perto.',
    stats: ['1D10 + Des', 'Ataque à Distância']
  }
]

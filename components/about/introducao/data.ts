import { Target, Star, Heart, type LucideIcon } from 'lucide-react'

export const sectionLinks = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'missao', label: 'Missão' },
  { id: 'stack', label: 'Stack' },
  { id: 'historia', label: 'História' },
  { id: 'equipe', label: 'Equipe' },
  { id: 'projetos', label: 'Projetos' }
]

export const aboutHighlights = ['Jogos indie', 'Aplicações web', 'Design', 'Narrativa']

export const missionCards: {
  icon: LucideIcon
  title: string
  accent: 'lime' | 'cyan' | 'rose'
  text?: string
  items?: string[]
}[] = [
  {
    icon: Target,
    title: 'Nossa Missão',
    accent: 'lime',
    text: 'Criar experiências digitais que inspirem, emocionem e conectem pessoas através da tecnologia e criatividade.'
  },
  {
    icon: Star,
    title: 'Nossa Visão',
    accent: 'cyan',
    text: 'Ser reconhecido como um estúdio que quebra barreiras entre arte e tecnologia, criando o futuro das mídias interativas.'
  },
  {
    icon: Heart,
    title: 'Nossos Valores',
    accent: 'rose',
    items: [
      'Criatividade sem limites',
      'Qualidade acima de tudo',
      'Colaboração e inclusão',
      'Inovação constante'
    ]
  }
]

export const accentClasses = {
  lime: {
    icon: 'text-lime-400 bg-lime-500/10 border-lime-500/30',
    bar: 'from-lime-400',
    dot: 'text-lime-400'
  },
  cyan: {
    icon: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    bar: 'from-cyan-400',
    dot: 'text-cyan-400'
  },
  rose: {
    icon: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    bar: 'from-rose-400',
    dot: 'text-rose-400'
  }
}

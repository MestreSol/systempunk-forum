import { Target, Star, Heart, Code, Clock, type LucideIcon } from 'lucide-react'

export const introTabs: { value: string; label: string; icon: LucideIcon }[] = [
  { value: 'sobre', label: 'Sobre Nós', icon: Target },
  { value: 'missao', label: 'Missão', icon: Heart },
  { value: 'tecnologias', label: 'Tech Stack', icon: Code },
  { value: 'historia', label: 'História', icon: Clock }
]

export const missionCards: {
  icon: LucideIcon
  title: string
  iconClass: string
  titleClass: string
  text?: string
  items?: string[]
}[] = [
  {
    icon: Target,
    title: 'Nossa Missão',
    iconClass: 'text-lime-400',
    titleClass: 'text-lime-200',
    text: 'Criar experiências digitais que inspirem, emocionem e conectem pessoas através da tecnologia e criatividade.'
  },
  {
    icon: Star,
    title: 'Nossa Visão',
    iconClass: 'text-cyan-400',
    titleClass: 'text-cyan-200',
    text: 'Ser reconhecido como um estúdio que quebra barreiras entre arte e tecnologia, criando o futuro das mídias interativas.'
  },
  {
    icon: Heart,
    title: 'Nossos Valores',
    iconClass: 'text-rose-400',
    titleClass: 'text-rose-200',
    items: [
      'Criatividade sem limites',
      'Qualidade acima de tudo',
      'Colaboração e inclusão',
      'Inovação constante'
    ]
  }
]

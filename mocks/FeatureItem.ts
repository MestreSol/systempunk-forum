import { FeatureItem } from '@/types/FeatureItem.type'
import { Code, Gamepad2, Globe, Zap } from 'lucide-react'

export const features: FeatureItem[] = [
  {
    icon: Gamepad2,
    title: 'Jogos Únicos',
    description:
      'Desenvolvemos jogos com mecânicas inovadoras e histórias envolventes.'
  },
  {
    icon: Code,
    title: 'Universo Aberto',
    description:
      'Nosso universo é expansivo e interconectado, permitindo exploração e interação contínuas.'
  },
  {
    icon: Zap,
    title: 'Atualizações Frequentes',
    description: 'Nossos jogos recebem updates regulares com novos conteúdos.'
  },
  {
    icon: Globe,
    title: 'Comunidade Global',
    description: 'Nossa meta é construir uma comunidade diversificada e engajada.'
  }
]

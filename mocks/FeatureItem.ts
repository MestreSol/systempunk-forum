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
    title: 'Código Aberto',
    description:
      'Contribuímos com a comunidade através de projetos open source.'
  },
  {
    icon: Zap,
    title: 'Atualizações Frequentes',
    description: 'Nossos jogos recebem updates regulares com novos conteúdos.'
  },
  {
    icon: Globe,
    title: 'Comunidade Global',
    description: 'Uma comunidade ativa de jogadores ao redor do mundo.'
  }
]

import { Achievement } from '@/types/Achievement.type'
import { Award, Code, Download, Globe, Rocket, Users } from 'lucide-react'

export const achievements: Achievement[] = [
  {
    title: 'Indie Game Festival Winner',
    description:
      "Primeiro lugar na categoria 'Melhor Narrativa' com 'Neon Runners'",
    date: '2024-11-15',
    category: 'Prêmio',
    icon: Award,
    status: 'completed'
  },
  {
    title: '50K Downloads Milestone',
    description: 'Nossos jogos alcançaram 50.000 downloads combinados',
    date: '2024-09-22',
    category: 'Marco',
    icon: Download,
    status: 'completed'
  },
  {
    title: 'Open Source Launch',
    description:
      'Lançamento da nossa biblioteca de componentes para a comunidade',
    date: '2024-06-10',
    category: 'Lançamento',
    icon: Code,
    status: 'completed'
  },
  {
    title: 'Team Expansion',
    description: 'Expansão da equipe para 8 membros especializados',
    date: '2024-03-01',
    category: 'Crescimento',
    icon: Users,
    status: 'completed'
  },
  {
    title: 'Next-Gen Project',
    description: 'Desenvolvimento do nosso maior projeto até agora',
    date: '2025-Q2',
    category: 'Desenvolvimento',
    icon: Rocket,
    status: 'in-progress'
  },
  {
    title: 'International Expansion',
    description: 'Planos para mercados internacionais e parcerias globais',
    date: '2025-Q4',
    category: 'Expansão',
    icon: Globe,
    status: 'planned'
  }
]

import { Capability, Metric } from '@/types/Capability.type'
import {
  Camera,
  Clock,
  Download,
  Gamepad2,
  Headphones,
  Monitor,
  Palette,
  Shield,
  Star,
  Users
} from 'lucide-react'

export const metrics: Metric[] = [
  {
    label: 'Downloads Totais',
    current: 52340,
    previous: 45230,
    unit: '',
    trend: 'up',
    icon: Download
  },
  {
    label: 'Usuários Ativos',
    current: 8920,
    previous: 7650,
    unit: '',
    trend: 'up',
    icon: Users
  },
  {
    label: 'Rating Médio',
    current: 4.6,
    previous: 4.4,
    unit: '/5',
    trend: 'up',
    icon: Star
  },
  {
    label: 'Tempo de Sessão',
    current: 12.5,
    previous: 11.8,
    unit: 'min',
    trend: 'up',
    icon: Clock
  }
]

export const capabilities: Capability[] = [
  {
    title: 'Game Development',
    description:
      'Criação de jogos indie com narrativas envolventes e mecânicas inovadoras',
    icon: Gamepad2,
    technologies: ['Unity', 'Unreal', 'Godot', 'C#', 'JavaScript'],
    strength: 95
  },
  {
    title: 'Web Development',
    description: 'Aplicações web modernas, responsivas e de alta performance',
    icon: Monitor,
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind'],
    strength: 90
  },
  {
    title: 'UI/UX Design',
    description: 'Interfaces intuitivas e experiências de usuário excepcionais',
    icon: Palette,
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Framer', 'Principle'],
    strength: 88
  },
  {
    title: 'Audio Design',
    description: 'Trilhas sonoras e efeitos que elevam a experiência',
    icon: Headphones,
    technologies: ['FMOD', 'Wwise', 'Logic Pro', 'Ableton', 'Pro Tools'],
    strength: 85
  },
  {
    title: 'DevOps & Infrastructure',
    description: 'Sistemas robustos, CI/CD e cloud computing',
    icon: Shield,
    technologies: [
      'AWS',
      'Docker',
      'Kubernetes',
      'GitHub Actions',
      'Terraform'
    ],
    strength: 82
  },
  {
    title: '3D & Animation',
    description: 'Modelagem 3D, animação e renderização de alta qualidade',
    icon: Camera,
    technologies: ['Blender', 'Maya', '3ds Max', 'Substance', 'Houdini'],
    strength: 78
  }
]

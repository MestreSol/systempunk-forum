import { FutureProject, Project, ProjectCategory } from '@/types/Project.type'
import { Code, Gamepad2, Lightbulb, Monitor, Smartphone } from 'lucide-react'
export const projectCategories: ProjectCategory[] = [
  {
    name: 'Jogos Indie',
    count: 8,
    percentage: 40,
    color: 'bg-lime-500',
    icon: Gamepad2,
    description: 'Experiências interativas únicas'
  },
  {
    name: 'Aplicações Web',
    count: 6,
    percentage: 30,
    color: 'bg-cyan-500',
    icon: Monitor,
    description: 'Soluções web modernas'
  },
  {
    name: 'Apps Mobile',
    count: 3,
    percentage: 15,
    color: 'bg-purple-500',
    icon: Smartphone,
    description: 'Experiências móveis'
  },
  {
    name: 'Ferramentas',
    count: 2,
    percentage: 10,
    color: 'bg-orange-500',
    icon: Code,
    description: 'Utilitários para desenvolvedores'
  },
  {
    name: 'Experimentos',
    count: 1,
    percentage: 5,
    color: 'bg-pink-500',
    icon: Lightbulb,
    description: 'Projetos experimentais'
  }
]
export const projects: Project[] = [
  {
    id: 'RR',
    name: 'Dawson Miller Supermarket Systems',
    description:
      'Gerencie seu próprio supermercado neste simulador de negócios realista e envolvente.',
    status: 'Beta 0.8',
    image: '/RR.png',
    tags: ['Simulação', 'Negócios', 'Estratégia'],
    downloads: '15k+',
    rating: 4.8,
    featured: true,
    title: undefined,
    timeline: undefined
  },
  {
    id: 'MON',
    name: 'Project MON',
    description:
      'Um projeto ambicioso que está sendo desenvolvido com muito carinho pela equipe.',
    status: 'Em Desenvolvimento',
    image: '/MON.png',
    tags: ['Aventura', 'RPG', 'Indie'],
    downloads: '2k+',
    rating: 4.5,
    featured: false,
    title: undefined,
    timeline: undefined
  },
  {
    id: 'A1',
    name: 'Project Alpha',
    description:
      'Novo projeto experimental com mecânicas inovadoras e gameplay único.',
    status: 'Alpha',
    image: '/A1.jpg',
    tags: ['Experimental', 'Inovação', 'Indie'],
    downloads: '500+',
    rating: 4.2,
    featured: false,
    title: undefined,
    timeline: undefined
  }
]

export const futureProjects: FutureProject[] = [
  {
    title: 'Project Aurora',
    description: 'Nosso maior jogo até agora - um RPG sci-fi com mundo aberto',
    status: 'In Development',
    expectedRelease: 'Q4 2025',
    technologies: ['Unity', 'C#', 'Blender']
  },
  {
    title: 'Creator Platform',
    description:
      'Plataforma para creators de conteúdo digital e desenvolvedores indie',
    status: 'Planned',
    expectedRelease: 'Beta: Q2 2025',
    technologies: []
  }
]

export const projectStats = {
  total: 20,
  completed: 15,
  inDevelopment: 4,
  planned: 1
}

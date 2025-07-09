import { Users, Download, Star, Trophy, Gamepad2, Code, Zap, Globe } from "lucide-react";

export interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  image: string;
  tags: string[];
  downloads: string;
  rating: number;
  featured: boolean;
}

import { LucideIcon } from "lucide-react";

export interface StatItem {
  label: string;
  value: string;
  icon: LucideIcon;
}

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const projects: Project[] = [
  {
    id: 'RR',
    name: 'Dawson Miller Supermarket Systems',
    description: 'Gerencie seu próprio supermercado neste simulador de negócios realista e envolvente.',
    status: 'Beta 0.8',
    image: '/RR.png',
    tags: ['Simulação', 'Negócios', 'Estratégia'],
    downloads: '15k+',
    rating: 4.8,
    featured: true
  },
  {
    id: 'MON',
    name: 'Project MON',
    description: 'Um projeto ambicioso que está sendo desenvolvido com muito carinho pela equipe.',
    status: 'Em Desenvolvimento',
    image: '/MON.png',
    tags: ['Aventura', 'RPG', 'Indie'],
    downloads: '2k+',
    rating: 4.5,
    featured: false
  },
  {
    id: 'A1',
    name: 'Project Alpha',
    description: 'Novo projeto experimental com mecânicas inovadoras e gameplay único.',
    status: 'Alpha',
    image: '/A1.jpg',
    tags: ['Experimental', 'Inovação', 'Indie'],
    downloads: '500+',
    rating: 4.2,
    featured: false
  }
];

export const stats: StatItem[] = [
  { label: 'Jogadores Ativos', value: '25,000+', icon: Users },
  { label: 'Downloads Totais', value: '100,000+', icon: Download },
  { label: 'Avaliação Média', value: '4.7/5', icon: Star },
  { label: 'Projetos Lançados', value: '8+', icon: Trophy }
];

export const features: FeatureItem[] = [
  {
    icon: Gamepad2,
    title: 'Jogos Únicos',
    description: 'Desenvolvemos jogos com mecânicas inovadoras e histórias envolventes.'
  },
  {
    icon: Code,
    title: 'Código Aberto',
    description: 'Contribuímos com a comunidade através de projetos open source.'
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
];

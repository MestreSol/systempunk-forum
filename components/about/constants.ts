// Constants and types for about pages
import { 
  Gamepad2, 
  Monitor, 
  Smartphone, 
  Code, 
  Lightbulb,
  Award,
  Download,
  Users,
  Rocket,
  Globe,
  Star,
  Clock,
  Headphones,
  Camera,
  Shield,
  Palette,
  Building2,
  Target,
  Database
} from "lucide-react";

export interface ProjectCategory {
  name: string;
  count: number;
  percentage: number;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export interface Achievement {
  title: string;
  description: string;
  date: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  status: "completed" | "in-progress" | "planned";
}

export interface Metric {
  label: string;
  current: number;
  previous: number;
  unit: string;
  trend: "up" | "down" | "stable";
  icon: React.ComponentType<{ className?: string }>;
}

export interface Capability {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  technologies: string[];
  strength: number;
}

export const projectCategories: ProjectCategory[] = [
  {
    name: "Jogos Indie",
    count: 8,
    percentage: 40,
    color: "bg-lime-500",
    icon: Gamepad2,
    description: "Experiências interativas únicas"
  },
  {
    name: "Aplicações Web",
    count: 6,
    percentage: 30,
    color: "bg-cyan-500",
    icon: Monitor,
    description: "Soluções web modernas"
  },
  {
    name: "Apps Mobile",
    count: 3,
    percentage: 15,
    color: "bg-purple-500",
    icon: Smartphone,
    description: "Experiências móveis"
  },
  {
    name: "Ferramentas",
    count: 2,
    percentage: 10,
    color: "bg-orange-500",
    icon: Code,
    description: "Utilitários para desenvolvedores"
  },
  {
    name: "Experimentos",
    count: 1,
    percentage: 5,
    color: "bg-pink-500",
    icon: Lightbulb,
    description: "Projetos experimentais"
  }
];

export const achievements: Achievement[] = [
  {
    title: "Indie Game Festival Winner",
    description: "Primeiro lugar na categoria 'Melhor Narrativa' com 'Neon Runners'",
    date: "2024-11-15",
    category: "Prêmio",
    icon: Award,
    status: "completed"
  },
  {
    title: "50K Downloads Milestone",
    description: "Nossos jogos alcançaram 50.000 downloads combinados",
    date: "2024-09-22",
    category: "Marco",
    icon: Download,
    status: "completed"
  },
  {
    title: "Open Source Launch",
    description: "Lançamento da nossa biblioteca de componentes para a comunidade",
    date: "2024-06-10",
    category: "Lançamento",
    icon: Code,
    status: "completed"
  },
  {
    title: "Team Expansion",
    description: "Expansão da equipe para 8 membros especializados",
    date: "2024-03-01",
    category: "Crescimento",
    icon: Users,
    status: "completed"
  },
  {
    title: "Next-Gen Project",
    description: "Desenvolvimento do nosso maior projeto até agora",
    date: "2025-Q2",
    category: "Desenvolvimento",
    icon: Rocket,
    status: "in-progress"
  },
  {
    title: "International Expansion",
    description: "Planos para mercados internacionais e parcerias globais",
    date: "2025-Q4",
    category: "Expansão",
    icon: Globe,
    status: "planned"
  }
];

export const metrics: Metric[] = [
  {
    label: "Downloads Totais",
    current: 52340,
    previous: 45230,
    unit: "",
    trend: "up",
    icon: Download
  },
  {
    label: "Usuários Ativos",
    current: 8920,
    previous: 7650,
    unit: "",
    trend: "up",
    icon: Users
  },
  {
    label: "Rating Médio",
    current: 4.6,
    previous: 4.4,
    unit: "/5",
    trend: "up",
    icon: Star
  },
  {
    label: "Tempo de Sessão",
    current: 12.5,
    previous: 11.8,
    unit: "min",
    trend: "up",
    icon: Clock
  }
];

export const capabilities: Capability[] = [
  {
    title: "Game Development",
    description: "Criação de jogos indie com narrativas envolventes e mecânicas inovadoras",
    icon: Gamepad2,
    technologies: ["Unity", "Unreal", "Godot", "C#", "JavaScript"],
    strength: 95
  },
  {
    title: "Web Development",
    description: "Aplicações web modernas, responsivas e de alta performance",
    icon: Monitor,
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind"],
    strength: 90
  },
  {
    title: "UI/UX Design",
    description: "Interfaces intuitivas e experiências de usuário excepcionais",
    icon: Palette,
    technologies: ["Figma", "Adobe XD", "Sketch", "Framer", "Principle"],
    strength: 88
  },
  {
    title: "Audio Design",
    description: "Trilhas sonoras e efeitos que elevam a experiência",
    icon: Headphones,
    technologies: ["FMOD", "Wwise", "Logic Pro", "Ableton", "Pro Tools"],
    strength: 85
  },
  {
    title: "DevOps & Infrastructure",
    description: "Sistemas robustos, CI/CD e cloud computing",
    icon: Shield,
    technologies: ["AWS", "Docker", "Kubernetes", "GitHub Actions", "Terraform"],
    strength: 82
  },
  {
    title: "3D & Animation",
    description: "Modelagem 3D, animação e renderização de alta qualidade",
    icon: Camera,
    technologies: ["Blender", "Maya", "3ds Max", "Substance", "Houdini"],
    strength: 78
  }
];

export const teamComposition = [
  { role: "Desenvolvedores", count: 2, color: "text-lime-400" },
  { role: "Designers", count: 2, color: "text-cyan-400" },
  { role: "Artistas", count: 2, color: "text-purple-400" },
  { role: "Especialistas", count: 2, color: "text-orange-400" }
];

export const futureProjects = [
  {
    title: "Project Aurora",
    description: "Nosso maior jogo até agora - um RPG sci-fi com mundo aberto",
    timeline: "Lançamento: Q4 2025"
  },
  {
    title: "Creator Platform",
    description: "Plataforma para creators de conteúdo digital e desenvolvedores indie",
    timeline: "Beta: Q2 2025"
  }
];

export const expansionItems = [
  {
    icon: Users,
    title: "Crescimento da Equipe",
    description: "Expansão para 15 membros até 2025",
    color: "text-cyan-400"
  },
  {
    icon: Globe,
    title: "Mercados Internacionais",
    description: "Parcerias na Europa e Ásia",
    color: "text-purple-400"
  },
  {
    icon: Building2,
    title: "Novo Estúdio",
    description: "Sede física para colaboração presencial",
    color: "text-orange-400"
  }
];

// Company information constants
export const companyMission = "Criar experiências digitais inovadoras que conectam tecnologia e criatividade, inspirando e engajando comunidades através de jogos e aplicações únicas.";

export const companyVision = "Ser reconhecido como um estúdio pioneiro na intersecção entre arte e tecnologia, criando o futuro das experiências interativas digitais.";

export const companyValues = [
  "Criatividade sem limites",
  "Qualidade excepcional", 
  "Colaboração inclusiva",
  "Inovação constante"
];

export const projectStats = {
  total: 20,
  completed: 15,
  inDevelopment: 4,
  planned: 1
};

// Introduction page constants
export interface TeamMember {
  name: string;
  role: string;
  specialties: string[];
  avatar: string;
  bio: string;
  socials: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Technology {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Alex Chen",
    role: "Founder & Lead Developer",
    specialties: ["Full-Stack", "Game Dev", "AI/ML"],
    avatar: "/api/placeholder/100/100",
    bio: "Apaixonado por criar experiências digitais únicas que unem tecnologia e criatividade.",
    socials: {
      github: "alexchen",
      twitter: "alexchen_dev",
      linkedin: "alexchen"
    }
  },
  {
    name: "Maya Rodriguez",
    role: "Creative Director",
    specialties: ["UI/UX", "Game Design", "Art Direction"],
    avatar: "/api/placeholder/100/100",
    bio: "Designer visionária com foco em narrativas visuais e experiências imersivas.",
    socials: {
      twitter: "maya_creates",
      linkedin: "mayarodriguez"
    }
  },
  {
    name: "Lucas Silva",
    role: "Tech Lead",
    specialties: ["Architecture", "DevOps", "Security"],
    avatar: "/api/placeholder/100/100",
    bio: "Especialista em sistemas robustos e escaláveis para projetos de grande impacto.",
    socials: {
      github: "lucas_silva",
      linkedin: "lucassilva"
    }
  },
  {
    name: "Sophie Kim",
    role: "Community Manager",
    specialties: ["Marketing", "Content", "Events"],
    avatar: "/api/placeholder/100/100",
    bio: "Conecta desenvolvedores e gamers, criando uma comunidade vibrante e inclusiva.",
    socials: {
      twitter: "sophie_community",
      instagram: "sophiekim_sm"
    }
  }
];

export const milestones: Milestone[] = [
  {
    year: "2020",
    title: "Fundação",
    description: "SystemPunk nasce da paixão por unir tecnologia e criatividade",
    icon: Rocket
  },
  {
    year: "2021",
    title: "Primeiro Projeto",
    description: "Lançamento do nosso primeiro jogo indie 'Neon Runners'",
    icon: Gamepad2
  },
  {
    year: "2022",
    title: "Expansão da Equipe",
    description: "Crescimento para uma equipe multidisciplinar de 8 pessoas",
    icon: Users
  },
  {
    year: "2023",
    title: "Open Source",
    description: "Abertura de ferramentas e frameworks para a comunidade",
    icon: Code
  },
  {
    year: "2024",
    title: "Reconhecimento",
    description: "Prêmios em festivais indie e reconhecimento da crítica",
    icon: Award
  },
  {
    year: "2025",
    title: "Futuro",
    description: "Novos projetos ambiciosos e expansão internacional",
    icon: Globe
  }
];

export const introStats: Stat[] = [
  { label: "Projetos Concluídos", value: "15+", icon: Target },
  { label: "Desenvolvedores", value: "8", icon: Users },
  { label: "Anos de Experiência", value: "5", icon: Clock },
  { label: "Downloads", value: "50K+", icon: Star }
];

export const technologies: Technology[] = [
  { name: "React/Next.js", icon: Monitor, category: "Frontend" },
  { name: "Node.js", icon: Code, category: "Backend" },
  { name: "PostgreSQL", icon: Database, category: "Database" },
  { name: "Unity", icon: Gamepad2, category: "Game Engine" },
  { name: "Blender", icon: Palette, category: "3D/Art" },
  { name: "FMOD", icon: Headphones, category: "Audio" },
];

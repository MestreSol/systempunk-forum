export interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  category: "games" | "books" | "tools" | "libraries";
  image: string;
  tags: string[];
  downloads?: string;
  rating?: number;
  featured: boolean;
  releaseDate?: string;
  version?: string;
  price?: "free" | "paid";
  platforms?: string[];
  author?: string;
  pages?: number;
  language?: string;
  repository?: string;
}

export const allProjects: Project[] = [
  // Games
  {
    id: 'RR',
    name: 'Dawson Miller Supermarket Systems',
    description: 'Gerencie seu próprio supermercado neste simulador de negócios realista e envolvente.',
    status: 'Beta 0.8',
    category: 'games',
    image: '/RR.png',
    tags: ['Simulação', 'Negócios', 'Estratégia'],
    downloads: '15k+',
    rating: 4.8,
    featured: true,
    releaseDate: '2024-01-15',
    version: '0.8.2',
    price: 'free',
    platforms: ['Windows', 'Mac', 'Linux']
  },
  {
    id: 'MON',
    name: 'Project MON',
    description: 'Um projeto ambicioso que está sendo desenvolvido com muito carinho pela equipe.',
    status: 'Em Desenvolvimento',
    category: 'games',
    image: '/MON.png',
    tags: ['Aventura', 'RPG', 'Indie'],
    downloads: '2k+',
    rating: 4.5,
    featured: false,
    version: '0.3.0',
    price: 'free',
    platforms: ['Windows', 'Mac']
  },
  {
    id: 'A1',
    name: 'Project Alpha',
    description: 'Novo projeto experimental com mecânicas inovadoras e gameplay único.',
    status: 'Alpha',
    category: 'games',
    image: '/A1.jpg',
    tags: ['Experimental', 'Inovação', 'Indie'],
    downloads: '500+',
    rating: 4.2,
    featured: false,
    version: '0.1.5',
    price: 'free',
    platforms: ['Windows']
  },
  
  // Books
  {
    id: 'guide-game-dev',
    name: 'Guia Completo de Desenvolvimento de Jogos Indie',
    description: 'Um livro abrangente sobre como criar jogos independentes do zero, cobrindo programação, design e marketing.',
    status: 'Released',
    category: 'books',
    image: '/book-gamedev.jpg',
    tags: ['Game Development', 'Programação', 'Design', 'Marketing'],
    downloads: '3k+',
    rating: 4.9,
    featured: true,
    releaseDate: '2023-11-20',
    price: 'free',
    author: 'Equipe SystemPunk',
    pages: 250,
    language: 'Português'
  },
  {
    id: 'unity-basics',
    name: 'Unity para Iniciantes: Primeiros Passos',
    description: 'Aprenda os fundamentos da Unity Engine com exemplos práticos e projetos simples.',
    status: 'Released',
    category: 'books',
    image: '/book-unity.jpg',
    tags: ['Unity', 'Tutorial', 'Iniciante', 'C#'],
    downloads: '5k+',
    rating: 4.7,
    featured: false,
    releaseDate: '2023-08-15',
    price: 'free',
    author: 'SystemPunk Team',
    pages: 180,
    language: 'Português'
  },
  {
    id: 'pixel-art-guide',
    name: 'Arte Pixel: Técnicas e Ferramentas',
    description: 'Domine a arte de criar pixel art para jogos, desde conceitos básicos até técnicas avançadas.',
    status: 'Beta',
    category: 'books',
    image: '/book-pixelart.jpg',
    tags: ['Pixel Art', 'Design', 'Arte', 'Jogos'],
    downloads: '1.2k+',
    rating: 4.6,
    featured: false,
    version: '0.9',
    price: 'free',
    author: 'Ana Silva',
    pages: 120,
    language: 'Português'
  },
  
  // Tools
  {
    id: 'level-editor',
    name: 'SystemPunk Level Editor',
    description: 'Editor de níveis visual e intuitivo para criação rápida de fases em jogos 2D.',
    status: 'Released',
    category: 'tools',
    image: '/tool-editor.jpg',
    tags: ['Editor', 'Level Design', '2D', 'Ferramentas'],
    downloads: '8k+',
    rating: 4.4,
    featured: true,
    releaseDate: '2024-02-10',
    version: '1.2.0',
    price: 'free',
    platforms: ['Windows', 'Mac', 'Linux'],
    repository: 'https://github.com/systempunk/level-editor'
  },
  {
    id: 'sprite-optimizer',
    name: 'Sprite Optimizer Pro',
    description: 'Ferramenta para otimização automática de sprites e texturas, reduzindo tamanho sem perder qualidade.',
    status: 'Released',
    category: 'tools',
    image: '/tool-optimizer.jpg',
    tags: ['Otimização', 'Sprites', 'Performance', 'Utilitário'],
    downloads: '12k+',
    rating: 4.8,
    featured: false,
    releaseDate: '2023-12-05',
    version: '2.1.3',
    price: 'free',
    platforms: ['Windows', 'Mac'],
    repository: 'https://github.com/systempunk/sprite-optimizer'
  },
  
  // Libraries
  {
    id: 'punk-ui',
    name: 'PunkUI Framework',
    description: 'Framework de UI moderno e responsivo para jogos Unity, com componentes pré-construídos.',
    status: 'Released',
    category: 'libraries',
    image: '/lib-punkui.jpg',
    tags: ['UI', 'Unity', 'Framework', 'Componentes'],
    downloads: '6k+',
    rating: 4.5,
    featured: true,
    releaseDate: '2024-01-30',
    version: '1.0.8',
    price: 'free',
    language: 'C#',
    repository: 'https://github.com/systempunk/punk-ui'
  },
  {
    id: 'audio-manager',
    name: 'SystemPunk Audio Manager',
    description: 'Biblioteca completa para gerenciamento de áudio em jogos Unity com suporte a pools e efeitos.',
    status: 'Beta',
    category: 'libraries',
    image: '/lib-audio.jpg',
    tags: ['Audio', 'Unity', 'Sound', 'Manager'],
    downloads: '2.8k+',
    rating: 4.3,
    featured: false,
    version: '0.8.1',
    price: 'free',
    language: 'C#',
    repository: 'https://github.com/systempunk/audio-manager'
  },
  {
    id: 'save-system',
    name: 'Universal Save System',
    description: 'Sistema de save/load universal para Unity com suporte a criptografia e compressão.',
    status: 'Alpha',
    category: 'libraries',
    image: '/lib-save.jpg',
    tags: ['Save System', 'Unity', 'Persistence', 'Security'],
    downloads: '900+',
    rating: 4.1,
    featured: false,
    version: '0.4.2',
    price: 'free',
    language: 'C#',
    repository: 'https://github.com/systempunk/save-system'
  }
];

// Export original projects for backward compatibility
export const projects = allProjects.filter(p => p.category === 'games');

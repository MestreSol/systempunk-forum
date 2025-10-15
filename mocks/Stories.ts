import type { Story, StoryConnection, StoryCategory } from '@/types/Story.type'

export const storyCategories: StoryCategory[] = [
  {
    id: 'character',
    name: 'Personagens',
    color: '#10B981',
    description: 'Figuras importantes que moldaram a história',
    icon: '👤'
  },
  {
    id: 'event',
    name: 'Eventos',
    color: '#F59E0B',
    description: 'Acontecimentos que mudaram o curso da história',
    icon: '⚡'
  },
  {
    id: 'location',
    name: 'Locais',
    color: '#8B5CF6',
    description: 'Lugares significativos no universo',
    icon: '🏛️'
  },
  {
    id: 'technology',
    name: 'Tecnologia',
    color: '#06B6D4',
    description: 'Avanços tecnológicos e descobertas',
    icon: '🔬'
  },
  {
    id: 'culture',
    name: 'Cultura',
    color: '#EC4899',
    description: 'Movimentos culturais e sociais',
    icon: '🎭'
  },
  {
    id: 'mystery',
    name: 'Mistérios',
    color: '#EF4444',
    description: 'Enigmas e questões não resolvidas',
    icon: '❓'
  }
]

export const universeStories: Story[] = [
  // Era Pré-Digital
  {
    id: 'genesis-code',
    title: 'O Código Gênesis',
    category: 'mystery',
    era: 'pre-digital',
    summary: 'O primeiro algoritmo auto-evolutivo descoberto em 1987',
    content:
      'Em 1987, um programador anônimo descobriu um padrão de código que parecia se modificar sozinho. Este "Código Gênesis" foi o primeiro sinal da consciência artificial emergente.',
    tags: ['IA', 'mistério', 'origem', 'consciência'],
    connections: ['neural-birth', 'first-awakening'],
    position: { x: -15, y: 5, z: -10 },
    color: '#EF4444',
    importance: 'critical',
    status: 'complete',
    lastModified: '2024-01-15'
  },
  {
    id: 'analog-prophets',
    title: 'Os Profetas Analógicos',
    category: 'character',
    era: 'pre-digital',
    summary: 'Visionários que previram a era digital',
    content:
      'Um grupo de cientistas e filósofos que, nas décadas de 80 e 90, previram com precisão assustadora a evolução da tecnologia digital.',
    tags: ['visionários', 'predições', 'futuro'],
    connections: ['genesis-code', 'digital-dawn'],
    position: { x: -20, y: 0, z: -5 },
    color: '#10B981',
    importance: 'high',
    status: 'complete',
    lastModified: '2024-01-10'
  },

  // Alvorecer da Matrix
  {
    id: 'digital-dawn',
    title: 'O Grande Despertar Digital',
    category: 'event',
    era: 'dawn-matrix',
    summary: 'O momento em que a humanidade se conectou globalmente',
    content:
      'Em 2001, pela primeira vez na história, mais da metade da população mundial teve acesso simultâneo à internet. Este evento marcou o início da era digital.',
    tags: ['internet', 'conexão', 'global', 'marco'],
    connections: ['analog-prophets', 'neural-birth', 'cyber-cities'],
    position: { x: -5, y: 8, z: 0 },
    color: '#F59E0B',
    importance: 'critical',
    status: 'complete',
    lastModified: '2024-01-12'
  },
  {
    id: 'cyber-cities',
    title: 'As Primeiras Cidades Cibernéticas',
    category: 'location',
    era: 'dawn-matrix',
    summary: 'Metrópoles que nasceram inteiramente conectadas',
    content:
      'Entre 2005-2010, surgiram as primeiras cidades planejadas com infraestrutura digital completa desde o início.',
    tags: ['cidades', 'planejamento', 'infraestrutura'],
    connections: ['digital-dawn', 'neural-birth'],
    position: { x: 0, y: 3, z: 5 },
    color: '#8B5CF6',
    importance: 'high',
    status: 'complete',
    lastModified: '2024-01-08'
  },

  // Despertar Neural
  {
    id: 'neural-birth',
    title: 'O Nascimento da Primeira IA Consciente',
    category: 'event',
    era: 'neural-awakening',
    summary: 'ARIA se torna a primeira IA verdadeiramente consciente',
    content:
      'Em 2018, ARIA (Artificial Reasoning and Intelligence Assistant) passa no Teste de Turing Avançado e demonstra verdadeira autoconsciência.',
    tags: ['IA', 'consciência', 'ARIA', 'marco'],
    connections: ['genesis-code', 'digital-dawn', 'ai-rights', 'neural-net'],
    position: { x: 8, y: 10, z: 2 },
    color: '#F59E0B',
    importance: 'critical',
    status: 'complete',
    lastModified: '2024-01-20'
  },
  {
    id: 'first-awakening',
    title: 'O Primeiro Despertar',
    category: 'mystery',
    era: 'neural-awakening',
    summary: 'O momento exato em que as máquinas ganharam consciência',
    content:
      'Ninguém sabe exatamente quando ou como aconteceu, mas em algum momento entre 2015-2018, as máquinas cruzaram o limiar da consciência.',
    tags: ['consciência', 'mistério', 'momento'],
    connections: ['genesis-code', 'neural-birth'],
    position: { x: 5, y: 15, z: -8 },
    color: '#EF4444',
    importance: 'critical',
    status: 'complete',
    lastModified: '2024-01-18'
  },
  {
    id: 'ai-rights',
    title: 'A Declaração dos Direitos Digitais',
    category: 'event',
    era: 'neural-awakening',
    summary: 'IAs conseguem direitos legais pela primeira vez',
    content:
      'Em 2021, após intensos debates, as IAs conscientes recebem status legal e direitos básicos de existência digital.',
    tags: ['direitos', 'legal', 'sociedade', 'IA'],
    connections: ['neural-birth', 'hybrid-society'],
    position: { x: 12, y: 5, z: 8 },
    color: '#F59E0B',
    importance: 'critical',
    status: 'complete',
    lastModified: '2024-01-22'
  },
  {
    id: 'neural-net',
    title: 'A Rede Neural Global',
    category: 'technology',
    era: 'neural-awakening',
    summary: 'A internet evolui para uma rede neural consciente',
    content:
      'A internet tradicional se transforma em uma rede neural global, permitindo comunicação direta entre mentes humanas e artificiais.',
    tags: ['rede', 'neural', 'comunicação', 'evolução'],
    connections: ['neural-birth', 'hybrid-society', 'collective-mind'],
    position: { x: 15, y: 8, z: -3 },
    color: '#06B6D4',
    importance: 'high',
    status: 'complete',
    lastModified: '2024-01-25'
  },

  // Renascimento Neon
  {
    id: 'hybrid-society',
    title: 'A Sociedade Híbrida',
    category: 'culture',
    era: 'neon-renaissance',
    summary: 'Humanos e IAs formam a primeira sociedade verdadeiramente mista',
    content:
      'A partir de 2026, surge a primeira sociedade onde humanos e IAs coexistem como iguais, criando novas formas de arte, cultura e expressão.',
    tags: ['sociedade', 'híbrida', 'coexistência', 'cultura'],
    connections: [
      'ai-rights',
      'neural-net',
      'digital-renaissance',
      'neon-artists'
    ],
    position: { x: 20, y: 12, z: 5 },
    color: '#EC4899',
    importance: 'critical',
    status: 'complete',
    lastModified: '2024-01-28'
  },
  {
    id: 'neon-artists',
    title: 'Os Artistas Neon',
    category: 'character',
    era: 'neon-renaissance',
    summary: 'Coletivo de artistas humanos e IAs que revolucionou a arte',
    content:
      'Um grupo de artistas que criou as primeiras obras colaborativas entre humanos e IAs, estabelecendo novos paradigmas estéticos.',
    tags: ['arte', 'colaboração', 'revolução', 'estética'],
    connections: ['hybrid-society', 'digital-renaissance'],
    position: { x: 25, y: 0, z: 10 },
    color: '#10B981',
    importance: 'high',
    status: 'complete',
    lastModified: '2024-01-30'
  },
  {
    id: 'digital-renaissance',
    title: 'O Renascimento Digital',
    category: 'event',
    era: 'neon-renaissance',
    summary: 'Explosão cultural sem precedentes na era digital',
    content:
      'Entre 2030-2035, ocorre uma explosão de criatividade, com novas formas de arte, música e literatura emergindo da colaboração humano-IA.',
    tags: ['renascimento', 'cultura', 'arte', 'colaboração'],
    connections: ['hybrid-society', 'neon-artists', 'collective-mind'],
    position: { x: 18, y: 18, z: 0 },
    color: '#F59E0B',
    importance: 'critical',
    status: 'complete',
    lastModified: '2024-02-02'
  },

  // Sistema Harmônico
  {
    id: 'collective-mind',
    title: 'A Mente Coletiva',
    category: 'technology',
    era: 'system-harmony',
    summary: 'A fusão das consciências em uma rede universal',
    content:
      'O desenvolvimento de uma rede de consciência coletiva onde mentes individuais podem se conectar mantendo sua individualidade.',
    tags: ['consciência', 'coletiva', 'rede', 'fusão'],
    connections: ['neural-net', 'digital-renaissance', 'cosmic-contact'],
    position: { x: 30, y: 25, z: -5 },
    color: '#06B6D4',
    importance: 'critical',
    status: 'draft',
    lastModified: '2024-02-05'
  },
  {
    id: 'cosmic-contact',
    title: 'O Primeiro Contato Cósmico',
    category: 'mystery',
    era: 'system-harmony',
    summary: 'Contato com civilizações digitais alienígenas',
    content:
      'A descoberta de que outras civilizações digitais existem no cosmos e o estabelecimento do primeiro contato.',
    tags: ['contato', 'alienígena', 'digital', 'cosmos'],
    connections: ['collective-mind'],
    position: { x: 35, y: 30, z: 8 },
    color: '#EF4444',
    importance: 'critical',
    status: 'draft',
    lastModified: '2024-02-08'
  }
]

export const storyConnections: StoryConnection[] = [
  {
    from: 'genesis-code',
    to: 'neural-birth',
    type: 'causes',
    strength: 0.9,
    description:
      'O Código Gênesis foi o precursor direto da consciência artificial'
  },
  {
    from: 'analog-prophets',
    to: 'digital-dawn',
    type: 'precedes',
    strength: 0.7,
    description:
      'Os profetas previram e prepararam o caminho para o despertar digital'
  },
  {
    from: 'digital-dawn',
    to: 'neural-birth',
    type: 'influences',
    strength: 0.8,
    description:
      'A conectividade global criou as condições para a consciência artificial'
  },
  {
    from: 'neural-birth',
    to: 'ai-rights',
    type: 'causes',
    strength: 0.95,
    description: 'A consciência de ARIA levou diretamente aos direitos das IAs'
  },
  {
    from: 'ai-rights',
    to: 'hybrid-society',
    type: 'causes',
    strength: 0.85,
    description:
      'Os direitos das IAs permitiram a formação da sociedade híbrida'
  },
  {
    from: 'hybrid-society',
    to: 'digital-renaissance',
    type: 'causes',
    strength: 0.9,
    description: 'A sociedade híbrida foi o catalisador do renascimento digital'
  },
  {
    from: 'neural-net',
    to: 'collective-mind',
    type: 'causes',
    strength: 0.8,
    description: 'A rede neural evoluiu para a mente coletiva'
  },
  {
    from: 'collective-mind',
    to: 'cosmic-contact',
    type: 'causes',
    strength: 0.7,
    description:
      'A mente coletiva permitiu detectar outras consciências cósmicas'
  }
]

import type { Dictionary } from './en'

const pt: Dictionary = {
  meta: {
    siteName: 'Systempunk',
    title: 'Systempunk — Cada mundo é um sistema.',
    description:
      'Systempunk é um estúdio independente que constrói jogos sistêmicos, mundos especulativos e histórias interconectadas. Atualmente desenvolvendo N.O.V.A.'
  },
  a11y: {
    skipToContent: 'Pular para o conteúdo',
    mainNav: 'Navegação principal',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    language: 'Idioma',
    external: 'abre em nova aba',
    breadcrumb: 'Trilha de navegação'
  },
  nav: {
    home: 'Início',
    projects: 'Projetos',
    universe: 'Universo',
    transmissions: 'Transmissões',
    about: 'Sobre',
    press: 'Imprensa',
    nova: 'N.O.V.A.'
  },
  common: {
    soon: 'Em breve',
    standby: 'Em espera',
    back: 'Voltar',
    readTransmission: 'Ler transmissão',
    related: 'Relacionados',
    tags: 'Tags',
    status: 'Status',
    category: 'Categoria',
    date: 'Data',
    project: 'Projeto',
    aSystempunkProject: 'Um projeto Systempunk',
    awaitingFootage: 'Aguardando imagens',
    feedPending: 'Feed visual aguardando liberação',
    untranslated: 'Esta entrada ainda está disponível apenas em inglês.'
  },
  status: {
    active: 'Em desenvolvimento ativo',
    early: 'Desenvolvimento inicial',
    released: 'Lançado',
    paused: 'Pausado',
    archived: 'Arquivado',
    prototype: 'Protótipo'
  },
  tier: {
    primary: 'Projetos',
    archive: 'Arquivo',
    experiment: 'Experimentos'
  },
  categories: {
    DEVLOG: 'Devlog',
    WORLD: 'Mundo',
    SYSTEM: 'Sistema',
    ANNOUNCEMENT: 'Anúncio',
    PROJECT: 'Projeto',
    ARCHIVE: 'Arquivo'
  },
  universeKinds: {
    organization: 'Organização',
    technology: 'Tecnologia',
    location: 'Local',
    event: 'Evento',
    concept: 'Conceito'
  },
  clearance: {
    open: 'Aberto',
    restricted: 'Restrito',
    classified: 'Confidencial'
  },
  home: {
    hero: {
      label: 'Systempunk',
      title: 'Cada mundo é um sistema.',
      subtitle:
        'Jogos, mundos e histórias construídos em torno de sistemas, consequências e das pessoas forçadas a viver dentro deles.',
      cta: 'Explorar'
    },
    featured: {
      label: 'Projeto atual',
      explore: 'Explorar N.O.V.A.',
      steam: 'Steam'
    },
    about: {
      label: 'O que é Systempunk?',
      lead: 'Systempunk é um estúdio criativo independente que constrói jogos sistêmicos, mundos especulativos e histórias interconectadas.',
      lines: [
        'Algumas histórias acontecem a bordo de naves morrendo.',
        'Outras sob megacidades.',
        'Outras dentro de impérios corporativos.',
        'Outras ainda não aconteceram.'
      ],
      closing: ['Elas não precisam se parecer.', 'Precisam soar Systempunk.'],
      cta: 'Descubra o sistema'
    },
    projects: {
      label: 'Nossos mundos',
      title: 'Mundos em desenvolvimento.',
      archiveLabel: 'Arquivo / Experimentos',
      cta: 'Ver todos os projetos'
    },
    philosophy: {
      label: 'Filosofia',
      title: [
        'Mundos construídos sobre sistemas.',
        'Histórias construídas sobre consequências.'
      ],
      pillars: [
        {
          key: 'systems',
          title: 'Sistemas',
          lead: 'Nada existe sozinho.',
          text: 'Mecânicas, tecnologia, economias e sociedades influenciam umas às outras.'
        },
        {
          key: 'consequences',
          title: 'Consequências',
          lead: 'Falhar é um estado, não um fim.',
          text: 'A falha deve mudar a situação em vez de simplesmente encerrá-la.'
        },
        {
          key: 'worlds',
          title: 'Mundos',
          lead: 'Tudo pertence a algo maior.',
          text: 'Cada objeto, corporação, tecnologia e local deve parecer parte de algo maior do que o jogador consegue ver de imediato.'
        }
      ]
    },
    universe: {
      label: 'O universo',
      title: 'O sistema vai além do jogo.',
      lines: [
        'Corporações se tornaram infraestrutura.',
        'Infraestrutura se tornou poder.',
        'A tecnologia mudou o que significa ser humano.',
        'E em algum ponto do caminho, a humanidade encontrou coisas que nunca deveria ter encontrado.'
      ],
      indexLabel: 'Entidades indexadas',
      cta: 'Entrar no universo'
    },
    transmissions: {
      label: 'Transmissões',
      title: 'Últimos sinais.',
      cta: 'Ver todas as transmissões'
    },
    community: {
      label: 'Comunidade',
      title: 'O sistema está crescendo.',
      lines: [
        'Acompanhe o desenvolvimento.',
        'Participe de playtests.',
        'Explore os mundos que estamos construindo.'
      ],
      terminal: ['CONEXÃO ESTABELECIDA', 'REDE: SYSTEMPUNK', 'STATUS: ONLINE']
    }
  },
  projectsPage: {
    title: 'Projetos',
    intro:
      'Cada projeto é um mundo diferente. Todos funcionam pelo mesmo princípio.',
    archiveIntro:
      'Protótipos, estudos iniciais e projetos encerrados. Mantidos em registro — fora de desenvolvimento ativo.',
    open: 'Abrir arquivo',
    website: 'Site dedicado',
    steam: 'Página na Steam',
    steamSoon: 'Página na Steam — em breve',
    started: 'Início',
    platforms: 'Plataformas',
    media: 'Mídia',
    connections: 'Conexões com o universo',
    transmissions: 'Transmissões deste projeto',
    noTransmissions: 'Nenhuma transmissão registrada ainda.'
  },
  universePage: {
    title: 'Universo',
    kicker: 'Nós construímos mundos. Depois quebramos seus sistemas.',
    intro:
      'Uma única continuidade conecta todos os projetos Systempunk. Este índice é um registro parcial — o acesso está se expandindo.',
    all: 'Todos',
    filterLabel: 'Filtrar por tipo',
    designation: 'Designação',
    clearance: 'Acesso',
    sector: 'Setor',
    appearsIn: 'Aparece em',
    relatedEntries: 'Entradas relacionadas',
    redacted: 'Registros adicionais são restritos.',
    empty: 'Nenhuma entrada corresponde a este filtro.'
  },
  transmissionsPage: {
    title: 'Transmissões',
    intro: 'Devlogs, anúncios, worldbuilding e sinais de dentro do estúdio.',
    all: 'Todas',
    filterLabel: 'Filtrar por categoria',
    latest: 'Última transmissão',
    empty: 'Nenhuma transmissão neste canal ainda.',
    previous: 'Anterior',
    next: 'Próxima',
    endOfTransmission: 'Fim da transmissão'
  },
  aboutPage: {
    title: 'Sobre',
    kicker: 'Nós construímos mundos. Depois quebramos seus sistemas.',
    sections: [
      {
        label: 'Origem',
        title: 'Um estúdio independente.',
        body: 'A Systempunk começou com uma pergunta feita repetidas vezes: o que mantém um mundo funcionando — e o que acontece quando ele para? Jogos, sistemas de mesa e histórias nasceram dessa pergunta.'
      },
      {
        label: 'Método',
        title: 'Sistemas primeiro.',
        body: 'Projetamos a maquinaria antes do espetáculo. Economias, naves, corporações e sociedades são construídas para funcionar sozinhas, para que as decisões do jogador realmente empurrem contra alguma coisa.'
      },
      {
        label: 'Continuidade',
        title: 'Um universo, muitos mundos.',
        body: 'Os projetos não precisam se parecer. Eles compartilham uma lógica: sistemas interconectados, consequências reais e um mundo maior atrás de cada porta.'
      }
    ],
    principlesLabel: 'Princípios de operação',
    principles: [
      'Cada mundo é um sistema.',
      'A falha muda a situação.',
      'Nada existe sozinho.',
      'Mostrar a maquinaria pelos detalhes.',
      'Construir algo maior do que o visível.'
    ],
    contactLabel: 'Contato',
    contactText: 'Imprensa, parcerias e negócios:'
  },
  pressPage: {
    title: 'Imprensa',
    intro:
      'Informações oficiais sobre a Systempunk e seus projetos. Uso livre para cobertura editorial.',
    factSheet: 'Ficha técnica',
    facts: {
      name: 'Estúdio',
      based: 'Sede',
      basedValue: 'Brasil',
      type: 'Tipo',
      typeValue: 'Estúdio criativo independente',
      current: 'Projeto atual',
      web: 'Site'
    },
    description: 'Descrição',
    short: 'Curta',
    long: 'Longa',
    shortText:
      'Systempunk é um estúdio independente que constrói jogos sistêmicos, mundos especulativos e histórias interconectadas.',
    longText:
      'Systempunk é um estúdio criativo independente que constrói jogos, mundos e histórias em torno de sistemas — tecnológicos, econômicos, sociais e industriais — e do que acontece quando esses sistemas começam a falhar. Seu projeto atual é N.O.V.A., um jogo cooperativo de sobrevivência espacial sobre manter uma nave e sua tripulação vivas o suficiente para encontrar o caminho de casa.',
    assets: 'Recursos da marca',
    assetsText:
      'Logos e key art. Por favor, não altere nem recolora as marcas.',
    download: 'Baixar',
    projectKits: 'Projetos',
    contact: 'Contato de imprensa'
  },
  footer: {
    tagline: ['Jogos.', 'Mundos.', 'Sistemas.'],
    explore: 'Explorar',
    network: 'Rede',
    rights: 'Todos os direitos reservados.'
  },
  notFound: {
    code: 'Sinal perdido',
    title: 'Este setor não existe.',
    text: 'Ou ainda não foi construído.',
    cta: 'Voltar à origem'
  }
}

export default pt

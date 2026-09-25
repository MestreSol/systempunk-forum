import type { Project } from './types'
import { site } from './site'

/**
 * Project registry. To add a project, append an entry — pages, sitemap,
 * metadata and the home page pick it up automatically.
 */
export const projects: Project[] = [
  {
    slug: 'nova',
    name: 'N.O.V.A.',
    index: 1,
    tier: 'primary',
    status: 'active',
    category: {
      en: 'Cooperative Space Survival',
      pt: 'Sobrevivência Espacial Cooperativa'
    },
    tagline: {
      en: ['Keep the ship alive.', 'Keep the crew alive.', 'Find a way home.'],
      pt: [
        'Mantenha a nave viva.',
        'Mantenha a tripulação viva.',
        'Encontre o caminho de casa.'
      ]
    },
    summary: {
      en: 'A cooperative space survival game about a failing ship, a crew that depends on each other and a long way home.',
      pt: 'Um jogo cooperativo de sobrevivência espacial sobre uma nave em colapso, uma tripulação que depende de si mesma e um longo caminho de volta.'
    },
    description: {
      en: `N.O.V.A. puts a small crew aboard a ship that was never meant to fly this far.

Every system on board is simulated and connected: power feeds life support, life support feeds the crew, the crew keeps everything else running. When one part fails, the rest feel it.

Nothing breaks cleanly. A hull breach changes the route. A dead reactor changes the plan. The question is never *if* something will fail — it is what the crew does next.

Full gameplay details, playtests and the community live on the dedicated N.O.V.A. site.`,
      pt: `N.O.V.A. coloca uma pequena tripulação a bordo de uma nave que nunca foi feita para ir tão longe.

Todos os sistemas a bordo são simulados e conectados: a energia alimenta o suporte de vida, o suporte de vida mantém a tripulação, a tripulação mantém todo o resto funcionando. Quando uma parte falha, as outras sentem.

Nada quebra de forma limpa. Uma brecha no casco muda a rota. Um reator morto muda o plano. A pergunta nunca é *se* algo vai falhar — é o que a tripulação faz em seguida.

Detalhes de gameplay, playtests e a comunidade ficam no site dedicado do N.O.V.A.`
    },
    // Add key art / footage here when cleared. The site renders a technical
    // placeholder until then.
    placeholderArt: 'schematic',
    screenshots: [],
    videos: [],
    website: site.novaUrl,
    steam: site.novaSteamUrl,
    links: [],
    date: '2025-01-05',
    platforms: ['PC'],
    tags: ['co-op', 'survival', 'space', 'simulation', 'systems'],
    universe: [
      'aurelia-systems-consortium',
      'solaris-energy',
      'atlas-industrial'
    ]
  },
  {
    slug: 'echo',
    name: 'Systempunk: ECHO',
    index: 2,
    tier: 'primary',
    status: 'early',
    category: {
      en: 'Tabletop RPG / World',
      pt: 'RPG de Mesa / Mundo'
    },
    tagline: {
      en: ['A world that remembers.', 'A system that answers back.'],
      pt: ['Um mundo que lembra.', 'Um sistema que responde.']
    },
    summary: {
      en: 'A tabletop roleplaying game and setting book — the first direct access point to the wider Systempunk universe.',
      pt: 'Um RPG de mesa e livro de cenário — o primeiro ponto de acesso direto ao universo Systempunk.'
    },
    description: {
      en: `ECHO is a tabletop roleplaying game set inside the Systempunk continuity.

Where the games focus on a single situation, ECHO opens the map: the corporations, the infrastructure they became and the people living in the gaps between them.

Rules are built around the same principle as everything else we make — systems that react, and failure that changes the story instead of ending it.`,
      pt: `ECHO é um RPG de mesa ambientado na continuidade Systempunk.

Enquanto os jogos focam em uma única situação, ECHO abre o mapa: as corporações, a infraestrutura em que se transformaram e as pessoas que vivem nos espaços entre elas.

As regras seguem o mesmo princípio de tudo o que fazemos — sistemas que reagem e falhas que mudam a história em vez de encerrá-la.`
    },
    screenshots: [],
    videos: [],
    links: [],
    date: '2025-06-01',
    tags: ['tabletop', 'rpg', 'worldbuilding'],
    universe: ['tyr-tech', 'helix-industries', 'flak-tech']
  },
  {
    slug: 'retail-rush',
    name: 'Retail Rush',
    index: 1,
    tier: 'archive',
    status: 'prototype',
    category: { en: 'Economic simulation', pt: 'Simulação econômica' },
    tagline: {
      en: ['A supermarket is a system too.'],
      pt: ['Um supermercado também é um sistema.']
    },
    summary: {
      en: 'An early systemic prototype: a supermarket inside an economy that inflates, votes and conspires.',
      pt: 'Um protótipo sistêmico inicial: um supermercado dentro de uma economia que inflaciona, vota e conspira.'
    },
    description: {
      en: `Retail Rush was one of our first experiments in interconnected systems: logistics, inflation, elections that change tax law, rival stores, espionage and customers with their own agendas.

It is kept here as a record. Much of what we learned from it shaped how later projects are built.`,
      pt: `Retail Rush foi um dos nossos primeiros experimentos com sistemas interconectados: logística, inflação, eleições que mudam impostos, lojas rivais, espionagem e clientes com agendas próprias.

Ele permanece aqui como registro. Muito do que aprendemos com ele moldou a forma como os projetos seguintes são construídos.`
    },
    heroImage: {
      kind: 'image',
      src: '/RR.webp',
      alt: { en: 'Retail Rush key art', pt: 'Arte principal de Retail Rush' }
    },
    screenshots: [],
    videos: [],
    links: [],
    date: '2024-03-01',
    tags: ['simulation', 'economy', 'prototype']
  },
  {
    slug: 'monocrom',
    name: 'Monocrom',
    index: 2,
    tier: 'archive',
    status: 'paused',
    category: { en: 'Narrative adventure', pt: 'Aventura narrativa' },
    tagline: {
      en: ['A world that lost its color.'],
      pt: ['Um mundo que perdeu suas cores.']
    },
    summary: {
      en: 'A post-cataclysm adventure about XK210, a forgotten machine in a world stripped of color.',
      pt: 'Uma aventura pós-cataclisma sobre XK210, uma máquina esquecida em um mundo sem cor.'
    },
    description: {
      en: `After the cataclysm, color disappeared from the world. XK210, an ancient robot with no memory, wakes in the ruins of a civilization split between rival factions.

Monocrom is paused. It remains on file.`,
      pt: `Após o cataclisma, a cor desapareceu do mundo. XK210, um robô ancestral sem memória, desperta nas ruínas de uma civilização dividida entre facções rivais.

Monocrom está pausado. Permanece em arquivo.`
    },
    heroImage: {
      kind: 'image',
      src: '/MON.webp',
      alt: { en: 'Monocrom key art', pt: 'Arte principal de Monocrom' }
    },
    screenshots: [],
    videos: [],
    links: [],
    date: '2024-08-01',
    tags: ['adventure', 'narrative']
  }
]

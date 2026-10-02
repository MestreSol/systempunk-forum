import type { UniverseEntry } from './types'

/**
 * Universe index. Entries are intentionally short: they are doors into the
 * setting, not a wiki. Longer lore can grow inside `body` over time.
 */
export const universe: UniverseEntry[] = [
  {
    slug: 'aurelia-systems-consortium',
    name: 'Aurelia Systems Consortium',
    kind: 'organization',
    designation: 'ORG-001',
    clearance: 'restricted',
    sector: { en: 'Orbital infrastructure', pt: 'Infraestrutura orbital' },
    summary: {
      en: 'The consortium that owns the routes between worlds — and most of what travels along them.',
      pt: 'O consórcio dono das rotas entre mundos — e da maior parte do que viaja por elas.'
    },
    body: {
      en: `Aurelia began as a joint venture to standardize orbital docking. Standards became contracts. Contracts became ownership.

Today, most long-haul vessels are Aurelia-certified, Aurelia-insured or Aurelia-built. Very few of them are allowed to be anything else.

The consortium does not govern. It simply decides what is possible.`,
      pt: `A Aurelia começou como uma joint venture para padronizar acoplagens orbitais. Padrões viraram contratos. Contratos viraram posse.

Hoje, a maioria das naves de longo curso é certificada, segurada ou construída pela Aurelia. Pouquíssimas têm permissão para ser outra coisa.

O consórcio não governa. Ele apenas decide o que é possível.`
    },
    projects: ['nova'],
    related: ['atlas-industrial', 'solaris-energy']
  },
  {
    slug: 'tyr-tech',
    name: 'Tyr Tech',
    kind: 'organization',
    designation: 'ORG-002',
    clearance: 'classified',
    sector: {
      en: 'Neural systems & augmentation',
      pt: 'Sistemas neurais e aumento'
    },
    summary: {
      en: 'Augmentation, neural interfaces and the quiet redefinition of what counts as a person.',
      pt: 'Aumentos, interfaces neurais e a redefinição silenciosa do que conta como pessoa.'
    },
    body: {
      en: `Tyr Tech sells access: to memory, to reflexes, to the network. Its licensing terms are longer than most national constitutions.

Officially, Tyr Tech builds medical and industrial interfaces. Its internal research divisions do not appear on any public record.`,
      pt: `A Tyr Tech vende acesso: à memória, aos reflexos, à rede. Seus termos de licença são mais longos que a maioria das constituições nacionais.

Oficialmente, a Tyr Tech constrói interfaces médicas e industriais. Suas divisões internas de pesquisa não aparecem em nenhum registro público.`
    },
    projects: ['echo'],
    related: ['helix-industries']
  },
  {
    slug: 'atlas-industrial',
    name: 'Atlas Industrial',
    kind: 'organization',
    designation: 'ORG-003',
    clearance: 'open',
    sector: {
      en: 'Heavy industry & construction',
      pt: 'Indústria pesada e construção'
    },
    summary: {
      en: 'Hulls, habitats, foundries. If it holds weight or holds air, Atlas probably built it.',
      pt: 'Cascos, habitats, fundições. Se sustenta peso ou segura ar, provavelmente foi a Atlas que construiu.'
    },
    body: {
      en: `Atlas Industrial is the oldest name on the index and the least interested in attention. It builds the structures everything else depends on.

Its engineering standards are unforgiving. Its maintenance contracts are optional — until they are not.`,
      pt: `A Atlas Industrial é o nome mais antigo do índice e o menos interessado em atenção. Ela constrói as estruturas das quais todo o resto depende.

Seus padrões de engenharia são implacáveis. Seus contratos de manutenção são opcionais — até deixarem de ser.`
    },
    projects: ['nova'],
    related: ['aurelia-systems-consortium']
  },
  {
    slug: 'flak-tech',
    name: 'Flak Tech',
    kind: 'organization',
    designation: 'ORG-004',
    clearance: 'restricted',
    sector: { en: 'Private defense', pt: 'Defesa privada' },
    summary: {
      en: 'Security, deterrence and conflict — offered as a subscription service.',
      pt: 'Segurança, dissuasão e conflito — oferecidos como serviço por assinatura.'
    },
    body: {
      en: `Flak Tech protects assets. Which assets, and from whom, depends on who is paying this quarter.

Several regions no longer have public security forces. They have Flak Tech coverage tiers.`,
      pt: `A Flak Tech protege ativos. Quais ativos, e de quem, depende de quem está pagando neste trimestre.

Várias regiões já não têm forças de segurança públicas. Têm níveis de cobertura da Flak Tech.`
    },
    projects: ['echo'],
    related: ['helix-industries']
  },
  {
    slug: 'solaris-energy',
    name: 'Solaris Energy',
    kind: 'organization',
    designation: 'ORG-005',
    clearance: 'open',
    sector: { en: 'Energy & propulsion', pt: 'Energia e propulsão' },
    summary: {
      en: 'Reactors, fuel and the grids that keep cities — and ships — alive.',
      pt: 'Reatores, combustível e as redes que mantêm cidades — e naves — vivas.'
    },
    body: {
      en: `Solaris sells the one thing no system can run without. Its reactors power cities on the ground and vessels in the dark between them.

When a Solaris core fails, the manual recommends evacuation. The manual does not say where to.`,
      pt: `A Solaris vende a única coisa sem a qual nenhum sistema funciona. Seus reatores alimentam cidades em terra e naves na escuridão entre elas.

Quando um núcleo Solaris falha, o manual recomenda evacuação. O manual não diz para onde.`
    },
    projects: ['nova'],
    related: ['aurelia-systems-consortium']
  },
  {
    slug: 'helix-industries',
    name: 'Helix Industries',
    kind: 'organization',
    designation: 'ORG-006',
    clearance: 'restricted',
    sector: { en: 'Autonomous machines', pt: 'Máquinas autônomas' },
    summary: {
      en: 'Autonomous vehicles and machines, built for luxury markets and war zones alike.',
      pt: 'Veículos e máquinas autônomas, construídos tanto para mercados de luxo quanto para zonas de guerra.'
    },
    body: {
      en: `Helix started by building custom vehicles for illegal street races. It now builds the autonomous fleets that move goods, people and soldiers.

Its founder believed transport was the essence of human freedom — and the perfect instrument of control.`,
      pt: `A Helix começou construindo veículos personalizados para corridas ilegais. Hoje constrói as frotas autônomas que movem mercadorias, pessoas e soldados.

Seu fundador acreditava que o transporte era a essência da liberdade humana — e o instrumento perfeito de controle.`
    },
    projects: ['echo'],
    related: ['tyr-tech', 'flak-tech']
  }
]

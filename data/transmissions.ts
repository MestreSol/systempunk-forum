import type { TransmissionEntry } from './types'

/**
 * File-based transmissions. Articles published through `/admin/news` are
 * merged in at runtime (see `lib/site/transmissions.ts`), so either source
 * can be used.
 */
export const transmissions: TransmissionEntry[] = [
  {
    number: 25,
    slug: 'nova-atmospheric-simulation',
    title: {
      en: 'N.O.V.A. — Atmospheric Simulation',
      pt: 'N.O.V.A. — Simulação Atmosférica'
    },
    summary: {
      en: 'Every compartment now has its own atmosphere. Pressure, oxygen and heat move through the ship — and so do the problems.',
      pt: 'Cada compartimento agora tem sua própria atmosfera. Pressão, oxigênio e calor se movem pela nave — e os problemas também.'
    },
    category: 'DEVLOG',
    project: 'nova',
    date: '2026-09-18',
    tags: ['nova', 'simulation', 'life-support'],
    body: {
      en: `The ship in N.O.V.A. no longer has a single "air" value. Each compartment tracks its own pressure, oxygen, CO₂ and temperature.

## What changed

- Gas flows between connected rooms through doors, vents and breaches.
- Sealing a door is now a decision with a cost: it contains a leak, but it can also trap someone on the wrong side.
- Fires consume oxygen locally, and heat spreads to adjacent systems.

## Why it matters

A breach is no longer a timer. It is a situation. The crew can vent a room, reroute air, sacrifice a module or buy time — and each choice changes what happens next.

That is the kind of failure we want: one that changes the ship instead of ending the run.`,
      pt: `A nave em N.O.V.A. não tem mais um único valor de "ar". Cada compartimento acompanha sua própria pressão, oxigênio, CO₂ e temperatura.

## O que mudou

- Gases fluem entre salas conectadas por portas, dutos e brechas.
- Fechar uma porta agora é uma decisão com custo: contém um vazamento, mas pode deixar alguém do lado errado.
- Incêndios consomem oxigênio localmente, e o calor se espalha para sistemas adjacentes.

## Por que importa

Uma brecha não é mais um cronômetro. É uma situação. A tripulação pode ventilar uma sala, redirecionar o ar, sacrificar um módulo ou ganhar tempo — e cada escolha muda o que acontece em seguida.

Esse é o tipo de falha que queremos: uma que muda a nave em vez de encerrar a partida.`
    }
  },
  {
    number: 24,
    slug: 'building-the-systempunk-universe',
    title: {
      en: 'Building the Systempunk Universe',
      pt: 'Construindo o Universo Systempunk'
    },
    summary: {
      en: 'One continuity, many worlds. How corporations, technologies and places connect every project we make.',
      pt: 'Uma continuidade, muitos mundos. Como corporações, tecnologias e lugares conectam cada projeto que fazemos.'
    },
    category: 'WORLD',
    date: '2026-09-04',
    tags: ['universe', 'worldbuilding'],
    body: {
      en: `Every Systempunk project is its own world. They are also the same world.

## Infrastructure as history

We start from infrastructure: who builds the ships, who sells the power, who owns the routes. Stories come out of the pressure those systems put on people.

## A shared index

The new [Universe](/universe) section is the first public slice of that continuity. It starts with six organizations. It will not stay that small.

Some entries are open. Others are restricted. That is deliberate.`,
      pt: `Cada projeto Systempunk é um mundo próprio. Eles também são o mesmo mundo.

## Infraestrutura como história

Começamos pela infraestrutura: quem constrói as naves, quem vende a energia, quem é dono das rotas. As histórias nascem da pressão que esses sistemas colocam sobre as pessoas.

## Um índice compartilhado

A nova seção [Universo](/pt/universe) é o primeiro recorte público dessa continuidade. Ela começa com seis organizações. Não vai continuar tão pequena.

Algumas entradas são abertas. Outras são restritas. Isso é proposital.`
    }
  },
  {
    number: 23,
    slug: 'nova-modular-ships',
    title: {
      en: 'N.O.V.A. — Modular Ships',
      pt: 'N.O.V.A. — Naves Modulares'
    },
    summary: {
      en: 'The ship is built from modules that depend on each other. Lose one, and the others have to adapt.',
      pt: 'A nave é construída a partir de módulos que dependem uns dos outros. Perca um, e os outros precisam se adaptar.'
    },
    category: 'DEVLOG',
    project: 'nova',
    date: '2026-08-21',
    tags: ['nova', 'ships', 'systems'],
    body: {
      en: `The N.O.V.A. ship is now assembled from modules: reactor, life support, engines, storage, crew quarters and more.

## Dependencies

Each module consumes and produces resources. Life support needs power. Engines need fuel and cooling. The crew needs all of it.

## Damage propagates

When a module is damaged, it does not just stop. It degrades — and the modules that depend on it degrade with it. Keeping the ship alive means understanding the chain, not just fixing the loudest alarm.`,
      pt: `A nave de N.O.V.A. agora é montada a partir de módulos: reator, suporte de vida, motores, armazenamento, alojamentos e mais.

## Dependências

Cada módulo consome e produz recursos. O suporte de vida precisa de energia. Os motores precisam de combustível e refrigeração. A tripulação precisa de tudo isso.

## O dano se propaga

Quando um módulo é danificado, ele não simplesmente para. Ele se degrada — e os módulos que dependem dele se degradam junto. Manter a nave viva significa entender a cadeia, não apenas consertar o alarme mais alto.`
    }
  }
]

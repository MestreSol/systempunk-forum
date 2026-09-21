'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import AnimatedTitle from '../ui/animated-title'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '../ui/navigation-menu'
import { Button } from '../ui/button'
import { Avatar } from '../ui/avatar'
import { ArrowRight, Gamepad2, Star } from 'lucide-react'
import ListItem from './toolbar/ListItem'
import { projects as realGames } from '@/mocks/Projects'

type User = {
  name: string
  avatarUrl?: string
} | null

export type Project = {
  id: string
  name: string
  description: string
  type: 'Jogo' | 'Livro' | 'Historia'
  link?: string
  image?: string
  status?: string
  rating?: number
  featured?: boolean
}

// Prefer passing `projects` and `user` as props. Defaults to the real games
// from mocks/Projects.ts (there's no real Livro/Historia content yet, so
// those columns in the dropdown have no cards besides the static "Todos os..." link).
const defaultProjects: Project[] = realGames.map((game) => ({
  id: game.id,
  name: game.name,
  description: game.description,
  type: 'Jogo',
  link: `/projects/jogo/${game.id}`,
  image: game.image,
  status: game.status,
  rating: game.rating,
  featured: game.featured
}))

type Props = {
  user?: User
  projects?: Project[]
}

export default function Toolbar({
  user = null,
  projects = defaultProjects
}: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const pathname = usePathname()
  const games = projects.filter((p) => p.type === 'Jogo')

  // Hide toolbar for timeline and historias interactive pages
  if (
    pathname?.startsWith('/linha-do-tempo') ||
    pathname?.startsWith('/about/historias') ||
    pathname?.startsWith('/about/linha-do-tempo')
  ) {
    return null
  }

  return (
    <nav className="relative z-50 flex items-center justify-between bg-zinc-950/95 pt-3 pb-2 pl-2 pr-2 backdrop-blur-sm">
      {/* Desktop/Tablet Menu */}
      <div className="hidden items-center gap-7 md:flex">
        <Link href="/" className="flex items-center" aria-label="Home">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <AnimatedTitle text="ystempunk" interval={1800} />
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/news">News</NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>About</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-5">
                    <NavigationMenuLink asChild>
                      <Link
                        className="from-muted/50 to-muted flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden focus:shadow-md"
                        href="/"
                        style={{
                          backgroundImage:
                            "linear-gradient(to bottom, var(--tw-gradient-from), var(--tw-gradient-to)), url('/systempunkBrand.webp')",
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat'
                        }}
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Systempunk
                        </div>
                        <p className="text-muted-foreground text-sm leading-tight">
                          Um universo, Muitas Historias.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>

                  <div className="row-span-2">
                    <ListItem href="/about/introducao" title="Introdução">
                      Descubra o que é Systempunk, um universo rico em histórias
                      e aventuras.
                    </ListItem>
                    <ListItem href="/about/visao-geral" title="Visão Geral">
                      Explore a visão geral do universo Systempunk, suas
                      principais características e temas.
                    </ListItem>
                    <ListItem href="/linha-do-tempo" title="Linha do Tempo">
                      Conheça a linha do tempo do universo Systempunk, desde sua
                      criação até os eventos mais recentes.
                    </ListItem>
                  </div>

                  <ListItem href="/about/historias" title="Histórias">
                    Mergulhe nas histórias fascinantes do universo Systempunk,
                    onde cada narrativa é única.
                  </ListItem>
                  <ListItem href="/about/sistemas" title="Sistemas">
                    Descubra os sistemas que governam o universo Systempunk,
                    desde suas regras até suas peculiaridades.
                  </ListItem>
                  <ListItem href="/about/a-criacao" title="A Criação">
                    Entenda como o universo Systempunk foi criado, suas origens
                    e influências.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="md:w-[520px] lg:w-[560px] p-1">
                  <div className="mb-3 flex items-center justify-between px-1">
                    <div className="flex items-center gap-2 font-semibold text-lime-300">
                      <Gamepad2 className="h-4 w-4" />
                      Jogos
                    </div>
                    <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                      {games.length} projetos
                    </span>
                  </div>

                  <ul className="grid grid-cols-2 gap-3">
                    {games.map((project, i) => {
                      const hero = i === 0
                      return (
                        <li key={project.id} className={hero ? 'col-span-2' : ''}>
                          <NavigationMenuLink
                            asChild
                            className={`group relative block w-full select-none overflow-hidden rounded-xl border border-zinc-800 p-4 no-underline outline-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-lime-500/70 hover:shadow-lg hover:shadow-lime-500/20 focus-visible:border-lime-400 ${
                                hero ? 'h-44' : 'h-40'
                              }`}
                          >
                            <a href={`/projects/jogo/${project.id}`}>
                              <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{
                                  backgroundImage: `url('${project.image || `/${project.id}.png`}')`
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/10" />

                              <div className="absolute left-3 top-3 z-10 flex items-center gap-2">
                                {project.status && (
                                  <span className="rounded-full bg-lime-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                                    {project.status}
                                  </span>
                                )}
                                {project.featured && (
                                  <span className="rounded-full border border-lime-400/60 bg-zinc-950/60 px-2 py-0.5 text-[10px] font-semibold text-lime-300 backdrop-blur">
                                    ⭐ Destaque
                                  </span>
                                )}
                              </div>
                              {project.rating && (
                                <span className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-zinc-950/60 px-2 py-0.5 text-xs text-zinc-200 backdrop-blur">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  {project.rating}
                                </span>
                              )}

                              <div className="absolute inset-x-0 bottom-0 z-10 p-4">
                                <div
                                  className={`font-bold leading-tight text-white ${
                                    hero ? 'text-lg' : 'text-base'
                                  }`}
                                >
                                  {project.name}
                                </div>
                                <p
                                  className={`mt-1 text-xs leading-snug text-zinc-300 ${
                                    hero ? 'line-clamp-2' : 'line-clamp-1'
                                  }`}
                                >
                                  {project.description}
                                </p>
                                <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-lime-400 transition-all group-hover:gap-2">
                                  Ver projeto
                                  <ArrowRight className="h-3 w-3" />
                                </span>
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      )
                    })}
                  </ul>

                  <NavigationMenuLink
                    asChild
                    className="group mt-3 block rounded-xl border border-lime-500/30 bg-gradient-to-r from-lime-500/10 to-cyan-500/10 px-4 py-3 no-underline outline-hidden transition-colors hover:border-lime-400 hover:from-lime-500/20 hover:to-cyan-500/20"
                  >
                    <a href="/projects/jogo">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-sm font-semibold text-white">
                            Todos os Jogos
                          </div>
                          <div className="text-xs text-zinc-400">
                            Explore o catálogo completo do universo Systempunk
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 shrink-0 text-lime-400 transition-transform group-hover:translate-x-1" />
                      </div>
                    </a>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="https://forum.systempunk.com.br"
                target="_blank"
              >
                Forum
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink href="/contribuicoes">
                Contribuições
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Header */}
      <div className="flex w-full items-center justify-between md:hidden">
        <Link href="/" className="flex items-center" aria-label="Home">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <span className="ml-2 text-lg font-bold">Systempunk</span>
        </Link>
        <button
          className="rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
          aria-label="Abrir menu"
          onClick={() => setMobileOpen(true)}
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 transition-all md:hidden">
          <button
            className="absolute right-4 top-4 rounded-full bg-zinc-900 p-2 text-lime-400"
            aria-label="Fechar menu"
            onClick={() => setMobileOpen(false)}
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                d="M6 6l12 12M6 18L18 6"
              />
            </svg>
          </button>

          <ul className="flex flex-col items-center gap-6">
            <li>
              <Link
                href="/news"
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-semibold text-lime-300"
              >
                News
              </Link>
            </li>
            <li>
              <Link
                href="/about/introducao"
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-semibold text-lime-300"
              >
                Sobre
              </Link>
            </li>
            <li>
              <Link
                href="/projects/jogo"
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-semibold text-lime-300"
              >
                Jogos
              </Link>
            </li>
            <li>
              <Link
                href="https://forum.systempunk.com.br"
                target="_blank"
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-semibold text-lime-300"
              >
                Forum
              </Link>
            </li>
            <li>
              <Link
                href="/contribuicoes"
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-semibold text-lime-300"
              >
                Contribuições
              </Link>
            </li>
            <li>
              <div className="mt-4 flex gap-3">
                {user ? (
                  <Avatar />
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setMobileOpen(false)}
                  >
                    Login
                  </Button>
                )}
              </div>
            </li>
          </ul>
        </div>
      )}

      {/* Desktop Right Side */}
      <div className="hidden items-center gap-2 md:flex">
        {user ? (
          <Avatar>{/* AvatarImage / AvatarFallback aqui */}</Avatar>
        ) : (
          <Button variant="outline">Login</Button>
        )}
      </div>
    </nav>
  )
}

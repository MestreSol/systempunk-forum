"use client"
import { useTheme } from 'next-themes'
import React from 'react'
import { Button } from '../ui/button'
import { Avatar } from '../ui/avatar'
import Image from "next/image"
import Link from 'next/link'
import AnimatedTitle from '../ui/animated-title'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '../ui/navigation-menu'

type User = {
  name: string
  avatarUrl?: string
} | null

// TODO: Implement user authentication
const user: User = null

type Project = {
  id: string
  name: string
  description: string
  type: "Jogo" | "Livro" | "Historia"
  link?: string
}

// Temporary sample data for projects used by the navigation menu.
// Replace with real data or fetch from an API / CMS when available.
const projects: Project[] = [
  {
    id: "sistema-001",
    name: "Sistema Alpha",
    description: "Um jogo de exploração e intriga.",
    type: "Jogo",
    link: "/projects/jogo/sistema-001",
  },
  {
    id: "livro-001",
    name: "Crônicas de Systempunk",
    description: "Uma coletânea de contos do universo Systempunk.",
    type: "Livro",
    link: "/projects/livro/livro-001",
  },
  {
    id: "historia-001",
    name: "A Primeira História",
    description: "A história que iniciou tudo.",
    type: "Historia",
    link: "/projects/historia/historia-001",
  },
]

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <span aria-hidden suppressHydrationWarning>
        {theme === 'dark' ? (
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path
              d="M12 3v1m0 16v1m8.66-13.66-.71.71M4.05 19.07l-.71.71m16.97 0-.71-.71M4.05 4.93l-.71-.71M21 12h-1M4 12H3m9-9a9 9 0 1 0 9 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="5"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95-7.07-1.41 1.41M6.05 17.95l-1.41 1.41m12.02 0-1.41-1.41M6.05 6.05 4.64 4.64"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </span>
    </Button>
  )
}
export default function Toolbar(){
    const [mobileOpen, setMobileOpen] = React.useState(false);
    return (
    <nav className="relative z-50 flex items-center justify-between bg-zinc-950/95 pt-3 pb-2 pl-2 pr-2 backdrop-blur-sm">
      {/* Desktop/Tablet Menu */}
      <div className="hidden items-center gap-7 md:flex">
        <Link href="/" className="flex items-center" aria-label="Home">
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="h-10 w-10" />
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
                            "linear-gradient(to bottom, var(--tw-gradient-from), var(--tw-gradient-to)), url('/systempunkBrand.png')",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">Systempunk</div>
                        <p className="text-muted-foreground text-sm leading-tight">
                          Um universo, Muitas Historias.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>

                  <div className="row-span-2">
                    <ListItem href="/about/introducao" title="Introdução">
                      Descubra o que é Systempunk, um universo rico em histórias e aventuras.
                    </ListItem>
                    <ListItem href="/about/visao-geral" title="Visão Geral">
                      Explore a visão geral do universo Systempunk, suas principais características e temas.
                    </ListItem>
                    <ListItem href="/about/linha-do-tempo" title="Linha do Tempo">
                      Conheça a linha do tempo do universo Systempunk, desde sua criação até os eventos mais recentes.
                    </ListItem>
                  </div>

                  <ListItem href="/about/historias" title="Histórias">
                    Mergulhe nas histórias fascinantes do universo Systempunk, onde cada narrativa é única.
                  </ListItem>
                  <ListItem href="/about/sistemas" title="Sistemas">
                    Descubra os sistemas que governam o universo Systempunk, desde suas regras até suas peculiaridades.
                  </ListItem>
                  <ListItem href="/about/a-criacao" title="A Criação">
                    Entenda como o universo Systempunk foi criado, suas origens e influências.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 md:w-[600px] lg:w-[700px] lg:grid-cols-3">
                  <li>
                    <div className="mb-2 font-semibold">Jogos</div>
                    <ul className="space-y-1">
                      {projects
                        .filter((p) => p.type === "Jogo")
                        .map((project) => (
                          <NavigationMenuLink asChild key={project.id}>
                            <a
                              className="from-muted/50 to-muted flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden focus:shadow-md"
                              href={`/projects/jogo/${project.id}`}
                              style={{
                                backgroundImage: `linear-gradient(to bottom, var(--tw-gradient-from), var(--tw-gradient-to)), url('/${project.id}.png')`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                              }}
                            >
                              <div className="mb-2 mt-4 text-lg font-medium">{project.name}</div>
                              <p className="text-muted-foreground text-sm leading-tight">{project.description}</p>
                            </a>
                          </NavigationMenuLink>
                        ))}
                      <ListItem href="/projects/jogo" title="Todos os Jogos">
                        Descubra todos os jogos do universo Systempunk, cada um com sua própria aventura e desafios.
                      </ListItem>

                    </ul>
                  </li>

                  <li>
                    <div className="mb-2 font-semibold">Livros</div>
                    <ul className="space-y-1">
                      {projects
                        .filter((p) => p.type === "Livro")
                        .map((project) => (
                          <NavigationMenuLink asChild key={project.id}>
                            <a
                              className="from-muted/50 to-muted flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden focus:shadow-md"
                              href={project.link ?? '#'}
                              style={{
                                backgroundImage: `linear-gradient(to bottom, var(--tw-gradient-from), var(--tw-gradient-to)), url('/${project.id}.png')`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                              }}
                            >
                              <div className="mb-2 mt-4 text-lg font-medium">{project.name}</div>
                              <p className="text-muted-foreground text-sm leading-tight">{project.description}</p>
                            </a>
                          </NavigationMenuLink>
                        ))}
                      <ListItem href="/projects/livro" title="Todos os Livros">
                        Explore todos os livros do universo Systempunk, cada um oferecendo uma nova perspectiva e história.
                      </ListItem>
                    </ul>
                  </li>

                  <li>
                    <div className="mb-2 font-semibold">Histórias</div>
                    <ul className="space-y-1">
                      {projects
                        .filter((p) => p.type === "Historia")
                        .map((project) => (
                          <ListItem key={project.id} href={project.link ?? '#'} title={project.name}>
                            {project.description}
                          </ListItem>
                        ))}
                    </ul>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink href="https://forum.systempunk.com.br" target="_blank">
                Forum
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink href="/contribuicoes">Contribuições</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Header */}
      <div className="flex w-full items-center justify-between md:hidden">
        <Link href="/" className="flex items-center" aria-label="Home">
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="h-10 w-10" />
          <span className="ml-2 text-lg font-bold">Systempunk</span>
        </Link>
        <button
          className="rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
          aria-label="Abrir menu"
          onClick={() => setMobileOpen(true)}
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
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
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>

          <ul className="flex flex-col items-center gap-6">
            <li>
              <Link href="/news" onClick={() => setMobileOpen(false)} className="text-2xl font-semibold text-lime-300">
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
                href="/projects/livro"
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-semibold text-lime-300"
              >
                Livros
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
                <ThemeToggle />
                {user ? <Avatar /> : <Button variant="outline" onClick={() => setMobileOpen(false)}>Login</Button>}
              </div>
            </li>
          </ul>
        </div>
      )}

      {/* Desktop Right Side */}
      <div className="hidden items-center gap-2 md:flex">
        <ThemeToggle />
        {user ? (
          <Avatar>{/* AvatarImage / AvatarFallback aqui */}</Avatar>
        ) : (
          <Button variant="outline">Login</Button>
        )}
      </div>
    </nav>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string; title: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

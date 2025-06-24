"use client";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "../ui/navigation-menu";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import { Project } from "../types/project";
import { useTheme } from "next-themes";
import * as React from "react";
import Image from "next/image";
import AnimatedTitle from "../ui/animated-title";
import Link from "next/link";

// Placeholder for user authentication state
type User = { name: string; avatarUrl?: string } | null;
const user: User = null; // Replace with your auth logic

function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    return (
        <Button
            variant="outline"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            {theme === "dark" ? (
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m8.66-13.66-.71.71M4.05 19.07l-.71.71m16.97 0-.71-.71M4.05 4.93l-.71-.71M21 12h-1M4 12H3m9-9a9 9 0 1 0 9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            ) : (
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95-7.07-1.41 1.41M6.05 17.95l-1.41 1.41m12.02 0-1.41-1.41M6.05 6.05 4.64 4.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            )}
        </Button>
    );
}
// Project Vector
// Example vector of projects
export const projects: Project[] = [
 
    {
        id: "MON",
        name: "Monocrom",
        type: "Jogo",
        description: "Um jogo de plataforma 2D ambientado no universo Systempunk, onde os jogadores exploram mundos monocromáticos.",
        link: "/projects/jogo/MON",
        createdAt: "",
        updatedAt: ""
    },
    {
        id: "NOV",
        name: "N.O.V.A.",
        type: "Jogo",
        description: "Um jogo de ação, exploração e aventura espacial ambientado no universo Systempunk, onde os jogadores assumem o papel de um explorador espacial.",
        link: "/projects/livro/NOVA",
        createdAt: "",
        updatedAt: ""
    },
    {
        id: "RR",
        name: "Retail Rush",
        type: "Jogo",
        description: "Um jogo de simulação de gerenciamento de loja ambientado no universo Systempunk, onde os jogadores assumem o papel de um gerente de loja.",
        link: "/projects/livro/projeto1",
        createdAt: "",
        updatedAt: ""
    },
    {
        id: "Sombras",
        name: "Sombras do Relogio",
        type: "Livro",
        description: "Um Romance ambientado no universo Systempunk, o objetivo dele é iniciar a construção do lore do universo.",
        link: "/projects/livro/projeto2",
        createdAt: "",
        updatedAt: ""
    },
    // {
    //     id: "historia-projeto3",
    //     name: "Projeto 3",
    //     type: "Historia",
    //     description: "Narrativas fascinantes do universo Systempunk.",
    //     link: "/projects/historia/projeto3",
    //     createdAt: "",
    //     updatedAt: ""
    // },
];

export default function Menu() {
    return (
        <nav className="flex items-center justify-between pt-3 pb-2 pl-2 pr-2">
            <div className="flex items-center gap-7">
                <a href="/" className="flex items-center" aria-label="Home">
                    <Image src="/logo.png" alt="Logo" width={40} height={40} className="h-10 w-10" />
                    <AnimatedTitle text="ystempunk" interval={1800} />
                </a>
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
                                            <a
                                                className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                                                href="/"
                                                style={{
                                                    backgroundImage: "linear-gradient(to bottom, var(--tw-gradient-from), var(--tw-gradient-to)), url('/systempunkBrand.png')",
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                    backgroundRepeat: "no-repeat",
                                                }}
                                            >
                                                <div className="mt-4 mb-2 text-lg font-medium">
                                                    Systempunk
                                                </div>
                                                <p className="text-muted-foreground text-sm leading-tight">
                                                    Um universo, Muitas Historias.
                                                </p>
                                            </a>
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
                                        <div className="font-semibold mb-2">Jogos</div>
                                        <ul className="space-y-1">
                                            {projects.filter(p => p.type === "Jogo").map(project => (
                                                <>
                                                <NavigationMenuLink asChild>
                                                    <a
                                                        className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                                                        href={`/projects/jogo/${project.id}`}
                                                        style={{
                                                            backgroundImage: `linear-gradient(to bottom, var(--tw-gradient-from), var(--tw-gradient-to)), url('/${project.id}.png')`,
                                                            backgroundSize: "cover",
                                                            backgroundPosition: "center",
                                                            backgroundRepeat: "no-repeat",
                                                        }}
                                                    >
                                                        <div className="mt-4 mb-2 text-lg font-medium">
                                                            {project.name}
                                                        </div>
                                                        <p className="text-muted-foreground text-sm leading-tight">
                                                            {project.description}
                                                        </p>
                                                    </a>
                                                </NavigationMenuLink>
                                                </>
                                            ))}
                                            <ListItem href="/projects/jogo" title="Todos os Jogos">
                                                Descubra todos os jogos do universo Systempunk, cada um com sua própria aventura e desafios.
                                            </ListItem>
                                        </ul>
                                    </li>
                                    <li>
                                        <div className="font-semibold mb-2">Livros</div>
                                        <ul className="space-y-1">
                                            {projects.filter(p => p.type === "Livro").map(project => (
                                                <NavigationMenuLink asChild>
                                                    <a
                                                        className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                                                        href={`/projects/jogo/${project.id}`}
                                                        style={{
                                                            backgroundImage: `linear-gradient(to bottom, var(--tw-gradient-from), var(--tw-gradient-to)), url('/${project.id}.png')`,
                                                            backgroundSize: "cover",
                                                            backgroundPosition: "center",
                                                            backgroundRepeat: "no-repeat",
                                                        }}
                                                    >
                                                        <div className="mt-4 mb-2 text-lg font-medium">
                                                            {project.name}
                                                        </div>
                                                        <p className="text-muted-foreground text-sm leading-tight">
                                                            {project.description}
                                                        </p>
                                                    </a>
                                                </NavigationMenuLink>
                                            ))}
                                            <ListItem href="/projects/livro" title="Todos os Livros">
                                                Explore todos os livros do universo Systempunk, cada um oferecendo uma nova perspectiva e história.
                                            </ListItem>
                                        </ul>
                                    </li>
                                    <li>
                                        <div className="font-semibold mb-2">Histórias</div>
                                        <ul className="space-y-1">
                                            {projects.filter(p => p.type === "Historia").map(project => (
                                                <ListItem key={project.id} href={project.link} title={project.name}>
                                                    {project.description}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="https://forum.systempunk.com.br" target="_blank">Forum</NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/contribuicoes">Contribuições</NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className="flex items-center gap-2">
                <ThemeToggle />
                {user ? (
                    <Avatar>
                        {/* You can add AvatarImage and AvatarFallback here */}
                    </Avatar>
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
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
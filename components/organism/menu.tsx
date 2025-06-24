"use client";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "../ui/navigation-menu";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import { useTheme } from "next-themes";
import * as React from "react";
import Image from "next/image";
import AnimatedTitle from "../ui/animated-title";

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

export default function Menu() {
    return (
        <nav className="flex items-center justify-between pt-3 pb-2 pl-2 pr-2">
            <div className="flex items-center gap-7">
                <a href="/" className="flex items-center" aria-label="Home">
                    <Image src="/logo.png" alt="Logo" width={40} height={40} className="h-10 w-10" />
                    <AnimatedTitle text="ystempunk" interval={1800} />
                </a>
                <NavigationMenu className="flex-1">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/news">News</NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>About</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="p-2 min-w-40">
                                    <li><NavigationMenuLink href="/about/universo">Universo</NavigationMenuLink></li>
                                    <li><NavigationMenuLink href="/about/linha-do-tempo">Linha do tempo</NavigationMenuLink></li>
                                    <li><NavigationMenuLink href="/about/historias">Historias</NavigationMenuLink></li>
                                    <li><NavigationMenuLink href="/about/sistemas">Sistemas</NavigationMenuLink></li>
                                    <li><NavigationMenuLink href="/about/a-criacao">A Criação</NavigationMenuLink></li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="p-2 min-w-40">
                                    <li className="font-semibold px-2 pt-1">Jogo</li>
                                    <li><NavigationMenuLink href="/projects/jogo/projeto1">Projeto 1</NavigationMenuLink></li>
                                    <li className="font-semibold px-2 pt-2">Livro</li>
                                    <li><NavigationMenuLink href="/projects/livro/projeto2">Projeto 2</NavigationMenuLink></li>
                                    <li className="font-semibold px-2 pt-2">Historia</li>
                                    <li><NavigationMenuLink href="/projects/historia/projeto3">Projeto 3</NavigationMenuLink></li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="https://forum.systempunk.com" target="_blank">Forum</NavigationMenuLink>
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
"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Mail, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      icon: Github, 
      href: "https://github.com/systempunk", 
      label: "GitHub",
      external: true 
    },
    { 
      icon: MessageCircle, 
      href: "https://discord.gg/systempunk", 
      label: "Discord",
      external: true 
    },
    { 
      icon: Twitter, 
      href: "https://twitter.com/systempunk", 
      label: "Twitter",
      external: true 
    },
    { 
      icon: Mail, 
      href: "mailto:contato@systempunk.com", 
      label: "Email",
      external: true 
    }
  ];

  const quickLinks = [
    { label: "Início", href: "/" },
    { label: "Sobre", href: "/about" },
    { label: "Projetos", href: "/projects" },
    { label: "Notícias", href: "/news" },
    { label: "Contribuições", href: "/contribuicoes" }
  ];

  const projects = [
    { label: "Dawson Miller Supermarket", href: "/projects/jogo/RR" },
    { label: "Project MON", href: "/projects/jogo/MON" },
    { label: "N.O.V.A.", href: "/projects/jogo/NOV" },
    { label: "Sombras do Relógio", href: "/projects/livro/Sombras" }
  ];

  const legal = [
    { label: "Política de Privacidade", href: "/privacy" },
    { label: "Termos de Uso", href: "/terms" },
    { label: "Licenças", href: "/licenses" },
    { label: "Contato", href: "/contact" }
  ];

  return (
    <footer className="bg-zinc-900 border-t border-zinc-800">
      <div className="container mx-auto px-6 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="SystemPunk Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="font-bold text-xl text-lime-400">SystemPunk</span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Desenvolvemos jogos únicos e experiências interativas que desafiam o convencional. 
              Criando o futuro dos jogos independentes.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noopener noreferrer" : undefined}
                  className="text-zinc-400 hover:text-lime-400 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lime-400 mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-zinc-300 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h3 className="font-semibold text-lime-400 mb-4">Nossos Projetos</h3>
            <ul className="space-y-2">
              {projects.map((project) => (
                <li key={project.href}>
                  <Link
                    href={project.href}
                    className="text-zinc-400 hover:text-zinc-300 transition-colors text-sm"
                  >
                    {project.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="font-semibold text-lime-400 mb-4">Suporte & Legal</h3>
            <ul className="space-y-2">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-zinc-400 hover:text-zinc-300 transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="border-t border-zinc-800 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="font-semibold text-lime-400 mb-2">Fique por dentro</h3>
            <p className="text-zinc-400 text-sm mb-4">
              Receba as últimas novidades sobre nossos projetos e lançamentos.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
              <Button size="sm" className="bg-lime-600 hover:bg-lime-700">
                Inscrever
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-zinc-800 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-zinc-400 text-sm">
              <span>© {currentYear} Systempunk. Todos os direitos reservados.</span>
            </div>
            
            <div className="flex items-center gap-1 text-zinc-400 text-sm">
              <span>Feito com</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>pela equipe Systempunk</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

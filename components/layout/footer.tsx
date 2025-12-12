'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Github, Twitter, Mail, Heart, MessageCircle } from 'lucide-react'
import SocialLinks from './footer/SocialLinks'
import LinksColumn from './footer/LinksColumn'
import NewsletterForm from './footer/NewsletterForm'

type LinkItem = { label: string; href: string }
type Social = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  href: string
  label: string
  external?: boolean
}

type Props = {
  socialLinks?: Social[]
  quickLinks?: LinkItem[]
  projects?: LinkItem[]
  legal?: LinkItem[]
  onSubscribe?: (email: string) => void
}

const defaultSocial: Social[] = [
  {
    icon: Github,
    href: 'https://github.com/systempunk',
    label: 'GitHub',
    external: true
  },
  {
    icon: MessageCircle,
    href: 'https://discord.gg/systempunk',
    label: 'Discord',
    external: true
  },
  {
    icon: Twitter,
    href: 'https://twitter.com/systempunk',
    label: 'Twitter',
    external: true
  },
  {
    icon: Mail,
    href: 'mailto:contato@systempunk.com',
    label: 'Email',
    external: true
  }
]

const defaultQuick: LinkItem[] = [
  { label: 'Início', href: '/' },
  { label: 'Sobre', href: '/about' },
  { label: 'Projetos', href: '/projects' },
  { label: 'Notícias', href: '/news' },
  { label: 'Contribuições', href: '/contribuicoes' }
]

const defaultProjects: LinkItem[] = [
  { label: 'Dawson Miller Supermarket', href: '/projects/jogo/RR' },
  { label: 'Project MON', href: '/projects/jogo/MON' },
  { label: 'N.O.V.A.', href: '/projects/jogo/NOV' },
  { label: 'Sombras do Relógio', href: '/projects/livro/Sombras' }
]

const defaultLegal: LinkItem[] = [
  { label: 'Política de Privacidade', href: '/privacy' },
  { label: 'Termos de Uso', href: '/terms' },
  { label: 'Licenças', href: '/licenses' },
  { label: 'Contato', href: '/contact' }
]

export default function Footer({
  socialLinks = defaultSocial,
  quickLinks = defaultQuick,
  projects = defaultProjects,
  legal = defaultLegal,
  onSubscribe
}: Props) {
  // hide footer for full-bleed interactive pages
  try {
    // dynamic import safe-guard: next/navigation hooks only work in client
    // but this file is client so usePathname is safe
  } catch {}

  // usePathname inside client component
  const pathname = usePathname()

  if (
    pathname?.startsWith('/linha-do-tempo') ||
    pathname?.startsWith('/about/historias') ||
    pathname?.startsWith('/about/linha-do-tempo')
  ) {
    return null
  }

  const currentYear = new Date().getFullYear()

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
              <span className="font-bold text-xl text-lime-400">
                SystemPunk
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Desenvolvemos jogos únicos e experiências interativas que desafiam
              o convencional. Criando o futuro dos jogos independentes.
            </p>
            <SocialLinks links={socialLinks} />
          </div>

          <LinksColumn title="Links Rápidos" items={quickLinks} />

          <LinksColumn title="Nossos Projetos" items={projects} />

          <LinksColumn title="Suporte & Legal" items={legal} />
        </div>

        {/* Newsletter signup */}
        <div className="border-t border-zinc-800 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="font-semibold text-lime-400 mb-2">
              Fique por dentro
            </h3>
            <p className="text-zinc-400 text-sm mb-4">
              Receba as últimas novidades sobre nossos projetos e lançamentos.
            </p>
            <NewsletterForm onSubscribe={onSubscribe} />
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-zinc-800 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-zinc-400 text-sm">
              <span>
                © {currentYear} Systempunk. Todos os direitos reservados.
              </span>
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
  )
}

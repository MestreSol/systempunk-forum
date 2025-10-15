import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notícias | SystemPunk',
  description:
    'Fique por dentro das últimas novidades, atualizações e lançamentos dos nossos jogos e projetos.',
  keywords: [
    'SystemPunk',
    'notícias',
    'jogos',
    'atualizações',
    'lançamentos',
    'dev blog'
  ],
  authors: [{ name: 'SystemPunk Team' }],
  openGraph: {
    title: 'Notícias SystemPunk',
    description: 'Últimas novidades e atualizações dos nossos projetos',
    type: 'website',
    locale: 'pt_BR'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notícias SystemPunk',
    description: 'Últimas novidades e atualizações dos nossos projetos'
  }
}

export default function NewsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return children
}

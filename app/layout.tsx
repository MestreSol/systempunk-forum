import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Systempunk - Desenvolvemos Jogos Únicos',
  description:
    'Systempunk é uma desenvolvedora independente de jogos que cria experiências únicas e inovadoras. Conheça nossos projetos, atualizações e faça parte da nossa comunidade.',
  keywords: [
    'Systempunk',
    'jogos indie',
    'desenvolvimento de jogos',
    'simulação',
    'RPG',
    'jogos únicos'
  ],
  authors: [{ name: 'Systempunk Team' }],
  openGraph: {
    title: 'Systempunk - Desenvolvemos Jogos Únicos',
    description: 'Desenvolvedora independente de jogos únicos e inovadores',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Systempunk'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Systempunk',
    description: 'Desenvolvemos jogos únicos e experiências interativas'
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="relative z-50"></div>
          <main className="relative z-10">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}

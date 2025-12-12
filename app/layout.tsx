import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import Toolbar from '@/components/layout/toolbar'
import Footer from '@/components/layout/footer'
import DevToolsGuard from '@/components/devtools/DevToolsGuard'

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
        {/* Inline guard: define minimal React DevTools hook early (server-rendered) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var w=window; if(!w.__REACT_DEVTOOLS_GLOBAL_HOOK__){w.__REACT_DEVTOOLS_GLOBAL_HOOK__={renderers:new Map(),rendererInterfaces:new Map(),supportsFiber:true,inject:function(){},on:function(){},off:function(){},emit:function(){}};} else { if(!w.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers) w.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers = new Map(); if(!w.__REACT_DEVTOOLS_GLOBAL_HOOK__.rendererInterfaces) w.__REACT_DEVTOOLS_GLOBAL_HOOK__.rendererInterfaces = new Map(); } var r = w.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers; if(r && typeof r.forEach === 'function'){ r.forEach(function(val){ try{ if(!val || !val.version) val.version = '0.0.0'; }catch(e){} }); } }catch(e){} })();`
          }}
        />
        <ThemeProvider>
          <div className="relative z-50">
            <Toolbar></Toolbar>
          </div>
          {/* DevTools guard prevents some React DevTools extension crashes */}
          <DevToolsGuard />
          <main className="relative z-10">{children}</main>
          <Footer></Footer>
        </ThemeProvider>
      </body>
    </html>
  )
}

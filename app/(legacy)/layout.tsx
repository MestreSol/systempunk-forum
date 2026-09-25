import type { Metadata } from 'next'
import { Archivo, Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import DevToolsGuard from '@/components/devtools/DevToolsGuard'
import { site } from '@/data/site'

/*
 * Root layout for routes that predate the brand site: the admin CMS and the
 * interactive lore tools (stories, timeline). They keep their own styling but
 * share the site's header/footer through the (lore) group.
 */

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo'
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: 'Systempunk',
  description: 'Systempunk — every world is a system.'
}

export default function LegacyRootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} antialiased`}
      >
        <ThemeProvider>
          <DevToolsGuard />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

import type { Metadata, Viewport } from 'next'
import { Archivo, JetBrains_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import './site.css'
import { getDictionary, isLocale, localeTags, locales } from '@/i18n'
import { site, socials } from '@/data/site'
import { pageMetadata, absoluteUrl } from '@/lib/site/seo'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import RevealObserver from '@/components/site/RevealObserver'
import { JsonLd } from '@/components/site/JsonLd'

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap'
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-face',
  display: 'swap'
})

export const viewport: Viewport = {
  themeColor: '#07080a',
  colorScheme: 'dark'
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return {
    ...pageMetadata({
      locale,
      path: '/',
      title: dict.meta.title,
      description: dict.meta.description,
      absoluteTitle: true
    }),
    metadataBase: new URL(site.url),
    title: { default: dict.meta.title, template: '%s — Systempunk' },
    applicationName: site.name,
    authors: [{ name: 'Systempunk' }],
    creator: 'Systempunk',
    publisher: 'Systempunk',
    robots: { index: true, follow: true }
  }
}

export default async function SiteLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)

  return (
    <html
      lang={localeTags[locale]}
      className={`${archivo.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')"
          }}
        />
      </head>
      <body className="min-h-dvh bg-void text-ink antialiased">
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                '@id': `${site.url}/#organization`,
                name: site.name,
                url: site.url,
                logo: absoluteUrl('/logo.png'),
                slogan: 'Every world is a system.',
                sameAs: socials.flatMap((channel) =>
                  channel.href ? [channel.href] : []
                )
              },
              {
                '@type': 'WebSite',
                '@id': `${site.url}/#website`,
                url: site.url,
                name: site.name,
                inLanguage: ['en', 'pt-BR'],
                publisher: { '@id': `${site.url}/#organization` }
              }
            ]
          }}
        />
        <SiteHeader
          locale={locale}
          novaUrl={site.novaUrl}
          labels={{ nav: dict.nav, a11y: dict.a11y }}
        />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter locale={locale} dict={dict} />
        <RevealObserver />
      </body>
    </html>
  )
}

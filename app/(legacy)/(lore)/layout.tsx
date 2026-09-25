import { getDictionary } from '@/i18n'
import { site } from '@/data/site'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'

// Lore tools are written in Portuguese, so they use the pt chrome.
const locale = 'pt' as const

export default function LoreLayout({
  children
}: {
  children: React.ReactNode
}) {
  const dict = getDictionary(locale)
  return (
    <>
      <SiteHeader
        locale={locale}
        novaUrl={site.novaUrl}
        labels={{ nav: dict.nav, a11y: dict.a11y }}
      />
      <div aria-hidden className="h-16" />
      <main id="main" className="relative z-10">
        {children}
      </main>
      <SiteFooter locale={locale} dict={dict} />
    </>
  )
}

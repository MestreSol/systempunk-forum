import Link from 'next/link'
import { localizePath, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n'
import { site, socials } from '@/data/site'
import { Arrow } from './primitives'
import { Wordmark } from './Wordmark'

export default function SiteFooter({
  locale,
  dict
}: {
  locale: Locale
  dict: Dictionary
}) {
  const explore = [
    { href: '/projects', label: dict.nav.projects },
    { href: '/universe', label: dict.nav.universe },
    { href: '/transmissions', label: dict.nav.transmissions },
    { href: '/about', label: dict.nav.about },
    { href: '/press', label: dict.nav.press }
  ]
  const network = [
    { href: site.novaUrl, label: dict.nav.nova },
    ...socials
      .filter((channel) => channel.key !== 'tiktok')
      .map((channel) => ({ href: channel.href, label: channel.label }))
  ]

  return (
    <footer className="relative border-t border-line bg-void">
      <div className="container-site grid gap-14 py-16 sm:py-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Wordmark className="text-ink" />
          <p className="font-expanded mt-8 text-2xl font-semibold uppercase leading-tight text-ink sm:text-3xl">
            {dict.footer.tagline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>

        <nav
          aria-label={dict.footer.explore}
          className="lg:col-span-3 lg:col-start-7"
        >
          <h2 className="label mb-5">{dict.footer.explore}</h2>
          <ul className="space-y-3">
            {explore.map((item) => (
              <li key={item.href}>
                <Link
                  href={localizePath(locale, item.href)}
                  className="text-sm text-dim transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={dict.footer.network} className="lg:col-span-3">
          <h2 className="label mb-5">{dict.footer.network}</h2>
          <ul className="space-y-3">
            {network.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-dim transition-colors hover:text-ink"
                  >
                    {item.label}
                    <Arrow external className="size-3" />
                    <span className="sr-only">({dict.a11y.external})</span>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm text-faint">
                    {item.label}
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em]">
                      [{dict.common.soon}]
                    </span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">
            © {new Date().getFullYear()} Systempunk. {dict.footer.rights}
          </p>
          <p className="label flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-online" aria-hidden />
            systempunk.space
          </p>
        </div>
      </div>
    </footer>
  )
}

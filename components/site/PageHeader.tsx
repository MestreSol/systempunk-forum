import Link from 'next/link'
import type { ReactNode } from 'react'
import { localizePath, type Locale } from '@/i18n/config'
import { cn } from '@/lib/utils'

export interface Crumb {
  label: string
  href?: string
}

/** Inner-page header: breadcrumb path, oversized title, short intro. */
export function PageHeader({
  locale,
  crumbs,
  breadcrumbLabel,
  title,
  kicker,
  intro,
  meta,
  children,
  className
}: {
  locale: Locale
  crumbs: Crumb[]
  breadcrumbLabel: string
  title: ReactNode
  kicker?: string
  intro?: ReactNode
  meta?: ReactNode
  children?: ReactNode
  className?: string
}) {
  return (
    <header
      className={cn(
        'relative overflow-hidden border-b border-line pb-14 pt-32 sm:pb-20 sm:pt-40',
        className
      )}
    >
      <div
        aria-hidden
        className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
      <div className="container-site relative">
        <nav aria-label={breadcrumbLabel}>
          <ol className="label flex flex-wrap items-center gap-2">
            <li>
              <Link
                href={localizePath(locale, '/')}
                className="transition-colors hover:text-ink"
              >
                SP
              </Link>
            </li>
            {crumbs.map((crumb, index) => (
              <li key={index} className="flex items-center gap-2">
                <span aria-hidden className="text-line-strong">
                  /
                </span>
                {crumb.href ? (
                  <Link
                    href={localizePath(locale, crumb.href)}
                    className="transition-colors hover:text-ink"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ink">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {kicker && <p className="label mt-10 text-signal">{kicker}</p>}
        <h1
          className={cn(
            'font-expanded text-[clamp(2.5rem,9vw,7rem)] font-semibold uppercase leading-[0.92] text-ink',
            kicker ? 'mt-4' : 'mt-10'
          )}
        >
          {title}
        </h1>
        {intro && (
          <div className="mt-8 max-w-2xl text-lg text-dim sm:text-xl">
            {intro}
          </div>
        )}
        {meta && <div className="mt-8">{meta}</div>}
        {children}
      </div>
    </header>
  )
}

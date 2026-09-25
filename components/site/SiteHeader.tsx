'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  localeNames,
  locales,
  localizePath,
  stripLocale,
  type Locale
} from '@/i18n/config'
import { Arrow } from './primitives'
import { Wordmark } from './Wordmark'

export interface HeaderLabels {
  nav: {
    projects: string
    universe: string
    transmissions: string
    about: string
    nova: string
  }
  a11y: {
    skipToContent: string
    mainNav: string
    openMenu: string
    closeMenu: string
    language: string
    external: string
  }
}

const NAV_ITEMS = ['projects', 'universe', 'transmissions', 'about'] as const

export default function SiteHeader({
  locale,
  labels,
  novaUrl
}: {
  locale: Locale
  labels: HeaderLabels
  novaUrl: string
}) {
  const pathname = usePathname() ?? '/'
  const neutralPath = stripLocale(pathname)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const isActive = (item: string) =>
    neutralPath === `/${item}` || neutralPath.startsWith(`/${item}/`)

  const solid = scrolled || open

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-signal focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:text-void"
      >
        {labels.a11y.skipToContent}
      </a>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300',
          solid
            ? 'border-line bg-void/85 backdrop-blur-md'
            : 'border-transparent bg-transparent'
        )}
      >
        <div className="container-site flex h-16 items-center justify-between gap-4">
          <Link
            href={localizePath(locale, '/')}
            className="relative z-10 -m-2 p-2 text-ink"
            aria-label="Systempunk"
          >
            <Wordmark />
          </Link>

          <nav aria-label={labels.a11y.mainNav} className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {NAV_ITEMS.map((item) => (
                <li key={item}>
                  <Link
                    href={localizePath(locale, `/${item}`)}
                    aria-current={isActive(item) ? 'page' : undefined}
                    className={cn(
                      'relative py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors',
                      'after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-signal after:transition-transform after:duration-300',
                      'hover:text-ink hover:after:scale-x-100',
                      isActive(item) ? 'text-ink after:scale-x-100' : 'text-dim'
                    )}
                  >
                    {labels.nav[item]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-10 flex shrink-0 items-center gap-2 sm:gap-5">
            <LocaleSwitch
              locale={locale}
              neutralPath={neutralPath}
              label={labels.a11y.language}
              className="hidden sm:flex"
            />
            <a
              href={novaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-9 items-center gap-2 border border-signal px-2.5 font-mono text-xs uppercase tracking-[0.1em] text-ink transition-colors hover:bg-signal hover:text-void sm:px-4 sm:tracking-[0.14em]"
            >
              <span
                className="size-1.5 bg-signal transition-colors group-hover:bg-void"
                aria-hidden
              />
              {labels.nav.nova}
              <Arrow external className="hidden size-3 sm:block" />
              <span className="sr-only">({labels.a11y.external})</span>
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="-mr-2 inline-flex size-11 items-center justify-center text-ink lg:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? labels.a11y.closeMenu : labels.a11y.openMenu}
              onClick={() => setOpen((value) => !value)}
            >
              <span aria-hidden className="relative block h-3 w-5">
                <span
                  className={cn(
                    'absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-300',
                    open && 'translate-y-1.5 rotate-45'
                  )}
                />
                <span
                  className={cn(
                    'absolute bottom-0 left-0 h-px w-5 bg-current transition-transform duration-300',
                    open && '-translate-y-1.5 -rotate-45'
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id={menuId}
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-void pt-16 lg:hidden"
      >
        <div
          className="bg-grid pointer-events-none absolute inset-0 opacity-60"
          aria-hidden
        />
        <nav
          aria-label={labels.a11y.mainNav}
          className="container-site relative flex min-h-full flex-col py-8"
        >
          <ul className="border-t border-line">
            {NAV_ITEMS.map((item, index) => (
              <li key={item} className="border-b border-line">
                <Link
                  href={localizePath(locale, `/${item}`)}
                  aria-current={isActive(item) ? 'page' : undefined}
                  className="flex items-baseline gap-5 py-5 text-ink"
                >
                  <span className="font-mono text-xs text-signal">
                    0{index + 1}
                  </span>
                  <span className="font-expanded text-3xl font-semibold uppercase">
                    {labels.nav[item]}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex items-center justify-between pt-10">
            <LocaleSwitch
              locale={locale}
              neutralPath={neutralPath}
              label={labels.a11y.language}
            />
            <span className="label flex items-center gap-2">
              <span
                className="size-1.5 rounded-full bg-online motion-safe:animate-pulse-dot"
                aria-hidden
              />
              Online
            </span>
          </div>
        </nav>
      </div>
    </>
  )
}

function LocaleSwitch({
  locale,
  neutralPath,
  label,
  className
}: {
  locale: Locale
  neutralPath: string
  label: string
  className?: string
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn('flex items-center gap-1 font-mono text-xs', className)}
    >
      {locales.map((code, index) => (
        <span key={code} className="flex items-center gap-1">
          {index > 0 && (
            <span className="text-line-strong" aria-hidden>
              /
            </span>
          )}
          <Link
            href={localizePath(code, neutralPath)}
            hrefLang={code === 'pt' ? 'pt-BR' : 'en'}
            lang={code === 'pt' ? 'pt-BR' : 'en'}
            aria-current={code === locale ? 'true' : undefined}
            aria-label={localeNames[code]}
            className={cn(
              'px-1 py-2 uppercase tracking-[0.14em] transition-colors',
              code === locale ? 'text-ink' : 'text-faint hover:text-ink'
            )}
          >
            {code}
          </Link>
        </span>
      ))}
    </div>
  )
}

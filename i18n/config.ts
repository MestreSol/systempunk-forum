export const locales = ['en', 'pt'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

/** BCP 47 tags used for <html lang>, hreflang and Open Graph. */
export const localeTags: Record<Locale, string> = {
  en: 'en',
  pt: 'pt-BR'
}

export const ogLocales: Record<Locale, string> = {
  en: 'en_US',
  pt: 'pt_BR'
}

export const localeNames: Record<Locale, string> = {
  en: 'English',
  pt: 'Português'
}

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value)
}

/**
 * The default locale lives at the root (`/projects`); every other locale is
 * prefixed (`/pt/projects`). The middleware rewrites unprefixed URLs to
 * `/en/...` internally, so pages only ever see an explicit locale param.
 */
export function localizePath(locale: Locale, path: string = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  if (locale === defaultLocale) return clean
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`
}

/** Removes a locale prefix, returning the locale-neutral path. */
export function stripLocale(pathname: string): string {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return '/'
    if (pathname.startsWith(`/${locale}/`))
      return pathname.slice(locale.length + 1)
  }
  return pathname
}

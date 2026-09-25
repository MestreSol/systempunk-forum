import type { Locale } from '@/i18n/config'
import type { Localized } from '@/data/types'

/** Resolves a localized value, falling back to English. */
export function tr<T>(value: Localized<T>, locale: Locale): T {
  return (value as Record<string, T | undefined>)[locale] ?? value.en
}

/** True when the value has a real translation for the locale. */
export function hasTranslation<T>(value: Localized<T>, locale: Locale) {
  return (value as Record<string, T | undefined>)[locale] !== undefined
}

export function formatDate(
  iso: string,
  locale: Locale,
  style: 'short' | 'long' = 'short'
) {
  const date = new Date(iso)
  if (style === 'long') {
    return date.toLocaleDateString(locale === 'pt' ? 'pt-BR' : 'en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC'
    })
  }
  // Technical, locale-neutral stamp: 2026.09.18
  return date.toISOString().slice(0, 10).replace(/-/g, '.')
}

export function pad(value: number, length = 3) {
  return String(value).padStart(length, '0')
}

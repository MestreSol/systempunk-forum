import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Combining diacritical marks (U+0300-U+036F), built via fromCharCode to
// avoid embedding raw combining characters in source.
const diacriticsPattern = new RegExp(
  `[${String.fromCharCode(0x0300)}-${String.fromCharCode(0x036f)}]`,
  'g'
)

export function slugify(text: string) {
  return text
    .toString()
    .normalize('NFD')
    .replace(diacriticsPattern, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE, verifySessionToken } from '@/lib/auth/session'
import { defaultLocale, locales } from '@/i18n/config'

export const config = {
  // Everything except Next internals and files with an extension.
  matcher: ['/((?!_next/|.*\\.[\\w]+$).*)']
}

const PUBLIC_ADMIN_PATHS = [
  '/admin/login',
  '/api/admin/login',
  '/api/admin/logout'
]

/** Routes that live outside the localized brand site. */
const PASSTHROUGH_PREFIXES = [
  '/api',
  '/admin',
  '/historias',
  '/linha-do-tempo',
  '/content'
]

function matchesPrefix(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`)
}

async function guardAdmin(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (PUBLIC_ADMIN_PATHS.includes(pathname)) return NextResponse.next()

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
  if (await verifySessionToken(token)) return NextResponse.next()

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }
  return NextResponse.redirect(new URL('/admin/login', request.url))
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    matchesPrefix(pathname, '/admin') ||
    matchesPrefix(pathname, '/api/admin')
  ) {
    return guardAdmin(request)
  }
  if (PASSTHROUGH_PREFIXES.some((prefix) => matchesPrefix(pathname, prefix))) {
    return NextResponse.next()
  }

  // `/en/...` is served unprefixed: send it to the canonical URL.
  if (matchesPrefix(pathname, `/${defaultLocale}`)) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(defaultLocale.length + 1) || '/'
    return NextResponse.redirect(url, 308)
  }

  // Other locales are already explicit.
  if (locales.some((locale) => matchesPrefix(pathname, `/${locale}`))) {
    return NextResponse.next()
  }

  // Unprefixed = default locale, rewritten internally.
  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

import { NextRequest, NextResponse } from 'next/server'
import {
  ADMIN_SESSION_COOKIE,
  checkPassword,
  createSessionToken
} from '@/lib/auth/session'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const password = typeof body?.password === 'string' ? body.password : ''

  if (!password || !checkPassword(password)) {
    return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 })
  }

  const token = await createSessionToken()
  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  })
  return response
}

import { NextRequest, NextResponse } from 'next/server'

export function GET(req: NextRequest) {
  return NextResponse.json({ status: 'OK' }, { status: 200 })
}

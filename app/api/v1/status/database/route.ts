import database from '@/infra/database'
import { NextResponse } from 'next/server'

export async function GET() {
  const result = await database.query('SELECT 1')
  console.log(result)
  return NextResponse.json({ status: 'OK' }, { status: 200 })
}

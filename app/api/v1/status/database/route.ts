import database from '@/infra/database'
import { NextResponse } from 'next/server'

export async function GET() {
  const result = await database.query('SELECT version();')
  const dbVersion = result.rows[0].version
  console.log(dbVersion)
  return NextResponse.json({ status: 'OK' }, { status: 200 })
}

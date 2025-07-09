import database from '@/infra/database'
import { NextResponse } from 'next/server'

export async function GET() {
  const updateAt = new Date().toISOString()

  const connectionAdditionalInformation = await database.getAdditionalInfo()
  const connectionCount = await database.getConnectionCount()

  return NextResponse.json(
    {
      status: {
        update_at: updateAt,
        version: await database.getVersion(),
        connectionCount,
        connectionAdditionalInformation
      }
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=1, stale-while-revalidate'
      }
    }
  )
}

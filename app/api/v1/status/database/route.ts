import database from '@/infra/database'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    update_at: new Date(),
    dependencies: {
      database: {
        version: await database.getServerVersion(),
        active_connections: Number.parseInt(
          await database.getActiveConnections()
        ),
        max_connections: Number.parseInt(await database.getMaxConnections()),
        timezone: await database.getTimezone()
      }
    }
  })
}

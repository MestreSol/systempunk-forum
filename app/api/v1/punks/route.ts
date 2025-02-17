import { NextRequest, NextResponse } from 'next/server'
import data from '../../../../db.json'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (id) {
    const punk = data.punks.find((punk) => punk.id === parseInt(id))
    if (punk) {
      return NextResponse.json(punk)
    } else {
      return NextResponse.json({ message: 'Not found' }, { status: 404 })
    }
  } else {
    return NextResponse.json(data.punks)
  }
}

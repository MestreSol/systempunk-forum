import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const MIME_MAP: Record<string, string> = {
  '.md': 'text/markdown; charset=utf-8',
  '.markdown': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8',
}

export async function GET(
  request: NextRequest,
  context: { params: any }
) {
  try {
    // Ensure params is resolved (in some Next.js setups params may be a Promise)
    let paramsObj = context.params
    if (paramsObj && typeof paramsObj.then === 'function') {
      paramsObj = await paramsObj
    }

    // Reconstruct the file path
    const pathSegments = paramsObj?.path || []
    const filePath = Array.isArray(pathSegments) ? pathSegments.join('/') : String(pathSegments)
    const fullPath = path.join(process.cwd(), 'content', filePath)

    // Security check: ensure the path is within content directory
    const contentDir = path.join(process.cwd(), 'content')
    const resolvedPath = path.resolve(fullPath)

    if (!resolvedPath.startsWith(contentDir)) {
      return NextResponse.json(
        { error: 'Invalid path' },
        { status: 403 }
      )
    }

    // Check if file exists
    if (!fs.existsSync(resolvedPath)) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      )
    }

    const ext = path.extname(resolvedPath).toLowerCase()

    // If it's markdown/text, read as utf-8 string
    if (ext === '.md' || ext === '.markdown' || ext === '.txt' || ext === '.json') {
      const content = fs.readFileSync(resolvedPath, 'utf-8')
      return new NextResponse(content, {
        status: 200,
        headers: {
          'Content-Type': MIME_MAP[ext] || 'text/plain; charset=utf-8',
          'Content-Disposition': `inline; filename="${path.basename(filePath)}"`,
          'Cache-Control': 'public, max-age=3600'
        }
      })
    }

    // For binary files (images, etc.) return raw bytes with the correct MIME type
    const fileBuffer = fs.readFileSync(resolvedPath)
    const mime = MIME_MAP[ext] || 'application/octet-stream'

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': mime,
        'Content-Disposition': `inline; filename="${path.basename(filePath)}"`,
        'Cache-Control': 'public, max-age=3600'
      }
    })
  } catch (error) {
    console.error('Error serving content file:', error)
    return NextResponse.json(
      { error: 'Failed to read file' },
      { status: 500 }
    )
  }
}

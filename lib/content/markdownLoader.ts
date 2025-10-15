import fs from 'fs'
import path from 'path'

import type { Story, StoryConnection } from '@/types/Story.type'

export type RawHeader = {
  id?: string
  name?: string
  category?: string
  tags?: string[]
  resumo?: string
  historia?: string
  context?: { title?: string; subtitle?: string }[]
  importancia?: string
  lastupdate?: string
  status?: string
  autor?: string
  author?: string
}

export type LoadedContent = {
  stories: Story[]
  connections: StoryConnection[]
}

const CATEGORY_MAP: Record<string, Story['category']> = {
  // Portuguese folder names -> canonical categories
  personagens: 'character',
  personagem: 'character',
  characters: 'character',
  eventos: 'event',
  evento: 'event',
  eras: 'event',
  era: 'event',
  locations: 'location',
  locais: 'location',
  local: 'location',
  dominios: 'location',
  domínio: 'location',
  dominios2: 'location',
  dominio: 'location',
  tecnologia: 'technology',
  tecnologias: 'technology',
  technology: 'technology',
  cultura: 'culture',
  culturas: 'culture',
  culture: 'culture',
  misterio: 'mystery',
  misterios: 'mystery',
  mistérios: 'mystery',
  mysteries: 'mystery'
}

const CATEGORY_COLORS: Record<Story['category'], string> = {
  character: '#10B981',
  event: '#F59E0B',
  location: '#8B5CF6',
  technology: '#06B6D4',
  culture: '#EC4899',
  mystery: '#EF4444'
}

function normalizeCategory(folderName: string): Story['category'] | null {
  const key = folderName.trim().toLowerCase()
  return CATEGORY_MAP[key] ?? null
}

function normalizeCategoryValue(value?: string | null): Story['category'] | null {
  if (!value) return null
  const key = value.trim().toLowerCase()
  const canonical: Story['category'][] = [
    'character',
    'event',
    'location',
    'technology',
    'culture',
    'mystery'
  ]
  if ((canonical as string[]).includes(key)) return key as Story['category']
  return CATEGORY_MAP[key] ?? null
}

function listMarkdownFiles(root: string): string[] {
  const out: string[] = []
  const stack: string[] = [root]
  while (stack.length) {
    const cur = stack.pop()!
    const entries = fs.readdirSync(cur, { withFileTypes: true })
    for (const e of entries) {
      const p = path.join(cur, e.name)
      if (e.isDirectory()) stack.push(p)
      else if (e.isFile() && p.toLowerCase().endsWith('.md')) out.push(p)
    }
  }
  return out
}

function seededRandom(seed: string) {
  // Simple xorshift32 seeded by string hash
  let h = 2166136261 >>> 0
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  let x = h || 123456789
  return () => {
    x ^= x << 13
    x ^= x >>> 17
    x ^= x << 5
    return ((x >>> 0) % 100000) / 100000
  }
}

function generatePositionFromId(id: string): { x: number; y: number; z: number } {
  const rnd = seededRandom(id)
  // Spread nodes in a sphere shell-ish volume
  const r = 10 + rnd() * 30
  const theta = rnd() * Math.PI * 2
  const phi = Math.acos(2 * rnd() - 1)
  const x = r * Math.sin(phi) * Math.cos(theta)
  const y = r * Math.sin(phi) * Math.sin(theta)
  const z = r * Math.cos(phi)
  return { x: Math.round(x), y: Math.round(y), z: Math.round(z) }
}

function normalizeJsonish(block: string): string {
  let t = block.trim()
  // Replace backticks with quotes
  t = t.replace(/`/g, '"')
  // Quote keys
  t = t.replace(/(\b[a-zA-Z_][a-zA-Z0-9_]*)\s*=/g, '"$1":')
  // Remove trailing commas before } or ]
  t = t.replace(/,\s*([}\]])/g, '$1')

    // Quote unquoted scalar values for ANY key at any depth\n  t = t.replace(/(\"[A-Za-z0-9_]+\"\s*:\s*)([^\s\"\[{][^,}\]]*)/g, (_m, p1, val) => {\n    const v = String(val).trim()\n    if (!v) return `${p1}\"\"`\n    if (/^-?\d+(\.\d+)?$|^(true|false|null)$/i.test(v)) return `${p1}${v}`\n    return `${p1}\"${v}\"`\n  })\n\n  // Quote bare items in arrays that do not contain objects/arrays
  t = t.replace(/\[(?![^\]]*[\{\[])([^\]]*)\]/gs, (m, inner) => {
    const parts = inner
      .split(',')
      .map((p) => {
        const q = p.trim()
        if (!q) return q
        if (/^\"|\{|\[|^-?\d+(\.\d+)?$|^(true|false|null)$/i.test(q)) return q
        return `"${q}"`
      })
    return `[${parts.join(', ')}]`
  })
  return t
}

function toJsonLikeHeader(block: string): RawHeader | null {
  try {
    const headerText = normalizeJsonish(block)
    const parsed = JSON.parse(headerText)
    return parsed
  } catch {
    try {
      // Fallback: aggressively quote any unquoted scalar property values at any depth
      let t2 = normalizeJsonish(block)
      t2 = t2.replace(/(\"[^\"]+\"\s*:\s*)([^\s\"\[{][^,}\]]*)/g, (_m, p1, val) => {
        const v = String(val).trim()
        if (!v) return `${p1}\"\"`
        if (/^-?\d+(\.\d+)?$|^(true|false|null)$/i.test(v)) return `${p1}${v}`
        return `${p1}\"${v}\"`
      })
      const parsed2 = JSON.parse(t2)
      return parsed2
    } catch {
      return null
    }
  }
}

function extractHeaderAndBody(fileContent: string): { header: RawHeader | null; body: string } {
  const trimmed = fileContent.trimStart()
  // Look for a leading JSON-like object that starts with {
  if (trimmed.startsWith('{')) {
    // Find matching closing brace for the first block
    let depth = 0
    let endIndex = -1
    for (let i = 0; i < trimmed.length; i++) {
      const ch = trimmed[i]
      if (ch === '{') depth++
      else if (ch === '}') {
        depth--
        if (depth === 0) {
          endIndex = i
          break
        }
      }
    }
    if (endIndex !== -1) {
      const headerRaw = trimmed.slice(0, endIndex + 1)
      const rest = trimmed.slice(endIndex + 1).trimStart()
      const header = toJsonLikeHeader(headerRaw)
      return { header, body: rest }
    }
  }
  // Fallback: no header found
  return { header: null, body: fileContent }
}

type IndexMaps = {
  byId: Map<string, string> // id -> storyId
  byName: Map<string, string> // lower(name) -> storyId
  byFile: Map<string, string> // lower(file base) -> storyId
}

function buildIndexMaps(entries: { id: string; name: string; fileBase: string }[]): IndexMaps {
  const byId = new Map<string, string>()
  const byName = new Map<string, string>()
  const byFile = new Map<string, string>()
  for (const e of entries) {
    byId.set(e.id, e.id)
    byName.set(e.name.toLowerCase(), e.id)
    byFile.set(e.fileBase.toLowerCase(), e.id)
  }
  return { byId, byName, byFile }
}

function parseWikiLinks(markdown: string): { linkText: string; targetKey: string; isEmbed: boolean }[] {
  const results: { linkText: string; targetKey: string; isEmbed: boolean }[] = []
  const re = /(!)?\[\[(.+?)\]\]/g
  let m: RegExpExecArray | null
  while ((m = re.exec(markdown)) !== null) {
    const isEmbed = Boolean(m[1])
    const inside = m[2].trim()
    const pipeIdx = inside.indexOf('|')
    let linkText = inside
    let key = inside
    if (pipeIdx >= 0) {
      linkText = inside.slice(0, pipeIdx).trim()
      key = inside.slice(pipeIdx + 1).trim()
    }
    // Strip extension if present
    key = key.replace(/\.[a-zA-Z0-9]+$/, '')
    results.push({ linkText, targetKey: key, isEmbed })
  }
  return results
}

function resolveLinkTarget(key: string, index: IndexMaps): string | null {
  // Try id, then name, then file base
  const direct = index.byId.get(key)
  if (direct) return direct
  const byName = index.byName.get(key.toLowerCase())
  if (byName) return byName
  const byFile = index.byFile.get(key.toLowerCase())
  if (byFile) return byFile
  return null
}

export async function loadStoriesFromMarkdown(contentRoot: string): Promise<LoadedContent> {
  const root = path.resolve(contentRoot)

  if (!fs.existsSync(root)) {
    return { stories: [], connections: [] }
  }

  const filesAll = listMarkdownFiles(root)

  type TempStory = {
    id: string
    title: string
    category: Story['category']
    filepath: string
    fileBase: string
    header: RawHeader | null
    body: string
  }

  const tempStories: TempStory[] = []

  for (const filePath of filesAll) {
    const rel = path.relative(root, filePath)
    const parts = rel.split(path.sep)
    const topFolder = parts.length > 1 ? parts[0] : ''
    const folderCategory = normalizeCategory(topFolder) // used only for analytics if needed

    const content = fs.readFileSync(filePath, 'utf8')
    const { header, body } = extractHeaderAndBody(content)

    const fileBase = path.parse(filePath).name
    const id = header?.id || fileBase
    const title = header?.name || fileBase
    const headerCat = normalizeCategoryValue(header?.category)
    const category = headerCat || 'mystery'

    tempStories.push({
      id,
      title,
      category,
      filepath: filePath,
      fileBase,
      header,
      body
    })
  }

  const index = buildIndexMaps(
    tempStories.map((t) => ({ id: t.id, name: t.title, fileBase: t.fileBase }))
  )

  const stories: Story[] = tempStories.map((t) => {
    const tags = t.header?.tags ?? []
    const summary = t.header?.resumo || ''
    const intro = t.header?.historia || ''
    const content = t.body || ''
    const importanceRaw = (t.header?.importancia || '').toLowerCase()
    const importanceMap: Record<string, Story['importance']> = {
      baixa: 'low',
      media: 'medium',
      média: 'medium',
      alta: 'high',
      critica: 'critical',
      crítica: 'critical'
    }
    const importance = importanceMap[importanceRaw] || 'medium'
    const lastModified = t.header?.lastupdate || new Date(fs.statSync(t.filepath).mtime).toISOString()
    const pos = generatePositionFromId(t.id)
    const color = CATEGORY_COLORS[t.category]
    const statusRaw = (t.header?.status || '').toLowerCase()
    const statusMap: Record<string, Story['status']> = {
      draft: 'draft',
      rascunho: 'draft',
      completo: 'complete',
      complete: 'complete',
      concluido: 'complete',
      concluído: 'complete',
      archived: 'archived',
      arquivado: 'archived'
    }
    const status = statusMap[statusRaw] || 'draft'
    const author = t.header?.autor || t.header?.author

    // Parse wikilinks for connections (non-embeds only)
    const links = parseWikiLinks(t.body).filter((l) => !l.isEmbed)
    const connections = links
      .map((l) => resolveLinkTarget(l.targetKey, index))
      .filter((id): id is string => Boolean(id) && id !== t.id)
    // Deduplicate
    const uniqueConnections = Array.from(new Set(connections))

    // Era not provided; default to a bucket for visualization
    const era: Story['era'] = 'neon-renaissance'

    const story: Story = {
      id: t.id,
      title: t.title,
      category: t.category,
      era,
      summary,
      content,
      tags: Array.isArray(tags) ? tags : [],
      connections: uniqueConnections,
      position: pos,
      color,
      importance,
      status,
      lastModified
    }

    if (intro) {
      ;(story as any).intro = intro
    }
    if (author) {
      ;(story as any).author = author
    }
    // mark if category came from fallback (no header category)
    if (!t.header?.category) {
      ;(story as any).categorySource = 'fallback'
    } else {
      ;(story as any).categorySource = 'header'
    }

    return story
  })

  // Build graph connections (mentions as undirected edges by default)
  const connections: StoryConnection[] = []
  const storyMap = new Map(stories.map((s) => [s.id, s]))
  for (const s of stories) {
    for (const toId of s.connections) {
      if (!storyMap.has(toId)) continue
      connections.push({
        from: s.id,
        to: toId,
        type: 'mentions',
        strength: 0.6
      })
    }
  }

  return { stories, connections }
}


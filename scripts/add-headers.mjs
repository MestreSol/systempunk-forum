import fs from 'fs'
import path from 'path'

const ROOT = process.env.CONTENT_ROOT || path.join(process.cwd(), 'content')

const CATEGORY_MAP = {
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
  dominio: 'location',
  dominio2: 'location',
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

function kebab(s) {
  return s
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

function listMarkdownFiles(dir) {
  const out = []
  const stack = [dir]
  while (stack.length) {
    const cur = stack.pop()
    const entries = fs.readdirSync(cur, { withFileTypes: true })
    for (const e of entries) {
      const p = path.join(cur, e.name)
      if (e.isDirectory()) stack.push(p)
      else if (e.isFile() && p.toLowerCase().endsWith('.md')) out.push(p)
    }
  }
  return out
}

function hasHeader(content) {
  return content.trimStart().startsWith('{')
}

function categoryFromPath(filePath) {
  const rel = path.relative(ROOT, filePath)
  const seg = rel.split(path.sep)[0] || ''
  const key = seg.toLowerCase()
  return CATEGORY_MAP[key] || 'mystery'
}

function buildHeader(filePath) {
  const base = path.parse(filePath).name
  const id = kebab(base)
  const name = base
  const category = categoryFromPath(filePath)
  return `{
"id": "${id}",
"name": "${name}",
"category": "${category}",
"tags": [],
"resumo": "",
"historia": "",
"context": [],
"importancia": "critica",
"status": "draft",
"autor": "",
"lastupdate": ""
}`
}

function main() {
  if (!fs.existsSync(ROOT)) {
    console.error('Content root not found:', ROOT)
    process.exit(1)
  }
  const files = listMarkdownFiles(ROOT)
  let updated = 0
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8')
    if (hasHeader(content)) continue
    const header = buildHeader(file)
    const next = header + '\n\n' + content
    fs.writeFileSync(file, next, 'utf8')
    updated++
    console.log('Prepended header to', path.relative(ROOT, file))
  }
  console.log('Done. Updated', updated, 'files of', files.length)
}

main()

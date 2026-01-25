'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import type { Story } from '@/types/Story.type'

export default function StoryViewerPage() {
  const params = useParams()
  const router = useRouter()
  const [story, setStory] = useState<Story | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // New states to hold transformed markdown (wiki links -> normal markdown)
  const [renderContent, setRenderContent] = useState<string | null>(null)
  const [renderSummary, setRenderSummary] = useState<string | null>(null)

  // Alert modal state
  const [alertVisible, setAlertVisible] = useState(false)
  const [alertType, setAlertType] = useState<string | null>(null)
  const [alertMessage, setAlertMessage] = useState<string | null>(null)
  const [contentBlocked, setContentBlocked] = useState(false) // when true, content is hidden until user confirms

  useEffect(() => {
    const loadStory = async () => {
      try {
        // Load the graph data
        const response = await fetch('/data/graph-data.json')
        const data = await response.json()

        // Find the story by ID
        const foundStory = data.stories.find((s: Story) => s.id === params.id)

        if (!foundStory) {
          setError('História não encontrada')
          return
        }

        setStory(foundStory)

        // After setting the story, preprocess its markdown content to handle wiki links
        const transformed = await transformWikiLinks(foundStory.content || '', data.stories)

        // extract alert block (if any) from the transformed markdown
        const { cleaned, alert } = extractAlertBlock(transformed)
        setRenderContent(cleaned)

        if (alert) {
          setAlertType(alert.type)
          setAlertMessage(alert.message)
          setAlertVisible(true)
          setContentBlocked(true)
        }

        if (foundStory.summary) {
          const transformedSummary = await transformWikiLinks(foundStory.summary, data.stories)
          setRenderSummary(transformedSummary)
        }
      } catch (err) {
        console.error('Error loading story:', err)
        setError('Erro ao carregar história')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      loadStory()
    }
  }, [params.id])

  // Finds an alert block like `[!info] ...` or `> [!info] ...` at the top of the content and extracts its text.
  // Returns { cleaned: string, alert: { type, message } | null }
  function extractAlertBlock(md: string) {
    if (!md) return { cleaned: md, alert: null }

    const lines = md.split(/\r?\n/)
    let startIdx = -1
    let type: string | null = null

    // Find a line that contains the marker. Prefer markers near the start (first 20 lines).
    const scanLimit = Math.min(lines.length, 20)
    for (let i = 0; i < scanLimit; i++) {
      const trimmed = lines[i].trim()
      const m = trimmed.match(/^>\s*\[!(\w+)\]\s*(.*)$/i) || trimmed.match(/^\[!(\w+)\]\s*(.*)$/i)
      if (m) {
        startIdx = i
        type = m[1].toLowerCase()
        // remove the marker from the line (keep the rest of the text)
        lines[i] = lines[i].replace(/^(>\s*)?\[!\w+\]\s*/i, '')
        break
      }
    }

    if (startIdx === -1 || !type) return { cleaned: md, alert: null }

    // collect subsequent lines part of the same block until an empty line or heading
    let endIdx = startIdx
    for (let j = startIdx + 1; j < lines.length; j++) {
      const isEmpty = lines[j].trim() === ''
      const looksLikeNewSection = /^#{1,6}\s+/.test(lines[j])
      if (isEmpty || looksLikeNewSection) break
      endIdx = j
    }

    const msgLines: string[] = []
    for (let k = startIdx; k <= endIdx; k++) {
      msgLines.push(lines[k].replace(/^>\s?/, ''))
    }
    const message = msgLines.join('\n').trim()

    // Remove the alert lines from the content
    const cleanedLines = [...lines.slice(0, startIdx), ...lines.slice(endIdx + 1)]
    const cleaned = cleanedLines.join('\n').trim()

    return { cleaned, alert: { type, message } }
  }

  // Handle modal confirmation
  function handleAlertConfirm(allow = false) {
    if (!allow && alertType === 'warning') {
      // for warnings, go back to list as per requirement
      router.push('/about/historias')
      return
    }

    if (!allow) {
      // user chose to close without enabling (treat as back)
      router.push('/about/historias')
      return
    }

    // allow access
    setAlertVisible(false)
    setContentBlocked(false)
  }

  // Resolves a filename (e.g. "Luminarion.png" or "Images/Luminarion.png") to a valid public URL by trying common folders
  async function resolveImageUrl(filename: string) {
    if (!filename) return `/content/Images/${filename}`

    const normalized = filename.replace(/^\/+/, '') // remove leading slashes

    // If the inner already contains a folder path, try it directly first
    const candidates = [] as string[]
    if (normalized.includes('/')) {
      candidates.push(`/content/${normalized}`)
      const base = normalized.replace(/\.[^/.]+$/, '')
      candidates.push(`/content/${base}.png`)
      candidates.push(`/content/${base}.webp`)
    } else {
      candidates.push(`/content/Images/${normalized}`)
      candidates.push(`/content/Material/${normalized}`)
      candidates.push(`/content/${normalized}`)
      const base = normalized.replace(/\.[^/.]+$/, '')
      candidates.push(`/content/Images/${base}.png`)
      candidates.push(`/content/Images/${base}.webp`)
      candidates.push(`/content/Material/${base}.png`)
    }

    for (const rawUrl of candidates) {
      // encode each path segment to be safe with spaces and special chars
      const parts = rawUrl.split('/').map((p) => encodeURIComponent(p)).join('/')
      const url = parts.replace(/%2F/g, '/') // keep slashes

      try {
        // Try HEAD first (faster when supported), fall back to GET if HEAD not allowed
        let res = null
        try {
          res = await fetch(url, { method: 'HEAD' })
        } catch (e) {
          // ignore
        }

        if (res && res.ok) return url

        // Some servers or Next route may not support HEAD; try GET but only read headers
        try {
          const resGet = await fetch(url, { method: 'GET' })
          if (resGet && resGet.ok) return url
        } catch (e) {
          // ignore and continue
        }
      } catch (e) {
        // ignore and try next candidate
      }
    }

    // fallback to images folder with the original filename (encoded)
    return `/content/Images/${normalized}`.split('/').map((p) => encodeURIComponent(p)).join('/').replace(/%2F/g, '/')
  }

  // Transform wiki-style links in the markdown text:
  // - ![[file.png]] or ![[Images/file.png|alt text]]  => standard markdown image with resolved URL
  // - [[Title]] or [[Title|label]]      => markdown link to the story page if a matching story title is found
  async function transformWikiLinks(text: string, allStories: Story[]) {
    if (!text) return text

    // Work on a mutable copy
    let replaced = text

    // 1) Handle image wiki-links: ![[...]]
    const imagePromises: Array<Promise<void>> = []
    const imageMap = new Map<string, string>()

    let idx = 0
    while ((idx = replaced.indexOf('![[', idx)) !== -1) {
      const start = idx
      const end = replaced.indexOf(']]', start)
      if (end === -1) break // malformed, stop

      const token = replaced.slice(start, end + 2) // includes closing ']]'
      const innerRaw = replaced.slice(start + 3, end).trim() // content inside [[...]] after '!'

      if (!imageMap.has(token)) {
        // parse possible alt text separated by '|'
        const [filePart, altPart] = innerRaw.split('|').map((s) => s.trim())
        // create a promise to resolve the image URL
        const p = (async () => {
          const url = await resolveImageUrl(filePart)
          const alt = altPart || ''
          // Use markdown image with alt text
          imageMap.set(token, `![${alt}](${url})`)
        })()
        imagePromises.push(p)
      }

      idx = end + 2
    }

    await Promise.all(imagePromises)

    for (const [token, replaceWith] of imageMap.entries()) {
      replaced = replaced.split(token).join(replaceWith)
    }

    // 2) Handle wiki-links to other stories: [[Title]] or [[Title|label]]
    // (skip ones already transformed because image replacement removed leading '!')
    const linkMap = new Map<string, string>()
    idx = 0
    while ((idx = replaced.indexOf('[[', idx)) !== -1) {
      const start = idx
      const end = replaced.indexOf(']]', start)
      if (end === -1) break

      const token = replaced.slice(start, end + 2)
      const innerRaw = replaced.slice(start + 2, end).trim()

      if (!linkMap.has(token)) {
        const [titlePart, labelPart] = innerRaw.split('|').map((s) => s.trim())
        const title = titlePart
        const found = allStories.find((s) => s.title && s.title.toLowerCase() === title.toLowerCase())
        if (found) {
          const label = labelPart || title
          linkMap.set(token, `[${label}](/historias/${found.id})`)
        } else {
          // if not found, just replace with label or title (no wiki syntax)
          linkMap.set(token, labelPart || title)
        }
      }

      idx = end + 2
    }

    for (const [token, replaceWith] of linkMap.entries()) {
      replaced = replaced.split(token).join(replaceWith)
    }

    return replaced
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-lime-200 text-lg">Carregando...</div>
      </div>
    )
  }

  if (error || !story) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-lg mb-4">{error || 'História não encontrada'}</div>
          <Button onClick={() => router.push('/about/historias')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Alert modal overlay - shown before content if an alert block was detected */}
      {alertVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="max-w-2xl w-full mx-4 bg-zinc-900 rounded-lg p-6 border border-zinc-800">
            <h3 className="text-xl font-bold text-lime-200 mb-2">{(alertType || 'Aviso').toUpperCase()}</h3>
            <div className="text-zinc-300 mb-6 whitespace-pre-line">{alertMessage}</div>
            <div className="flex justify-end gap-2">
              <Button variant="default" onClick={() => handleAlertConfirm(true)}>
                Prosseguir
              </Button>
              <Button variant="outline" onClick={() => handleAlertConfirm(false)}>
                {alertType === 'warning' ? 'Voltar' : 'Fechar'}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              onClick={() => router.push('/about/historias')}
              variant="outline"
              size="sm"
              className="text-zinc-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>

            {story.filePath && (
              <Button
                variant="outline"
                size="sm"
                className="text-zinc-400 hover:text-white"
                onClick={() => window.open(`/content/${story.filePath}`, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Ver Markdown
              </Button>
            )}
          </div>

          <h1 className="text-4xl font-bold text-lime-200 mb-4">
            {story.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{
                backgroundColor: story.color + '33',
                color: story.color
              }}
            >
              {story.category}
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-zinc-800 text-zinc-300">
              {story.importance}
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-zinc-800 text-zinc-300">
              {story.status}
            </span>
          </div>

          {story.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {story.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded text-xs bg-zinc-800 text-zinc-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        {renderSummary && (
          <div className="mb-8 p-4 bg-zinc-900 rounded-lg border border-zinc-800">
            <h2 className="text-xl font-semibold text-cyan-200 mb-2">Resumo</h2>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{renderSummary}</ReactMarkdown>
          </div>
        )}

        {/* Intro */}
        {story.intro && (
          <div className="mb-8 p-4 bg-zinc-900 rounded-lg border border-zinc-800">
            <h2 className="text-xl font-semibold text-cyan-200 mb-2">Introdução</h2>
            <p className="text-zinc-300 leading-relaxed">{story.intro}</p>
          </div>
        )}

        {/* Content */}
        {renderContent && !contentBlocked && (
          <div className="prose prose-invert prose-lime max-w-none">
            <div className="markdown-content bg-zinc-900/50 rounded-lg p-6 border border-zinc-800">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: (props) => <h1 className="text-3xl font-bold text-lime-200 mb-4 mt-6" {...props} />,
                  h2: (props) => <h2 className="text-2xl font-bold text-lime-200 mb-3 mt-5" {...props} />,
                  h3: (props) => <h3 className="text-xl font-bold text-cyan-200 mb-2 mt-4" {...props} />,
                  h4: (props) => <h4 className="text-lg font-bold text-cyan-200 mb-2 mt-3" {...props} />,
                  p: (props) => <p className="text-zinc-300 mb-4 leading-relaxed" {...props} />,
                  ul: (props) => <ul className="list-disc list-inside text-zinc-300 mb-4 space-y-2" {...props} />,
                  ol: (props) => <ol className="list-decimal list-inside text-zinc-300 mb-4 space-y-2" {...props} />,
                  li: (props) => <li className="text-zinc-300" {...props} />,
                  blockquote: (props) => (
                    <blockquote className="border-l-4 border-lime-500 pl-4 italic text-zinc-400 my-4" {...props} />
                  ),
                  code: (props) => {
                    const { node, className, children, ...rest } = props as any
                    const isInline = !className
                    return isInline ? (
                      <code className="bg-zinc-800 text-lime-300 px-1.5 py-0.5 rounded text-sm" {...rest}>
                        {children}
                      </code>
                    ) : (
                      <code className="block bg-zinc-800 text-lime-300 p-4 rounded-lg overflow-x-auto text-sm" {...rest}>
                        {children}
                      </code>
                    )
                  },
                  a: (props) => <a className="text-cyan-400 hover:text-cyan-300 underline" {...props} />,
                  img: (props) => (
                    <img className="rounded-lg max-w-full h-auto my-4" {...props} alt={props.alt || ''} />
                  ),
                  table: (props) => (
                    <div className="overflow-x-auto my-4">
                      <table className="min-w-full border-collapse" {...props} />
                    </div>
                  ),
                  th: (props) => (
                    <th className="border border-zinc-700 bg-zinc-800 px-4 py-2 text-left text-zinc-200" {...props} />
                  ),
                  td: (props) => (
                    <td className="border border-zinc-700 px-4 py-2 text-zinc-300" {...props} />
                  ),
                }}
              >
                {renderContent}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-zinc-800 text-zinc-500 text-sm">
          <div className="flex flex-wrap gap-4">
            {story.author && (
              <div>
                <span className="font-semibold">Autor:</span> {story.author}
              </div>
            )}
            <div>
              <span className="font-semibold">Última modificação:</span>{' '}
              {new Date(story.lastModified).toLocaleDateString('pt-BR')}
            </div>
            {story.connections.length > 0 && (
              <div>
                <span className="font-semibold">Conexões:</span> {story.connections.length}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

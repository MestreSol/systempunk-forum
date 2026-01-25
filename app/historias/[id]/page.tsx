'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import {
  ArrowLeft,
  ExternalLink,
  Share2,
  Copy,
  Clock,
  ArrowUp,
  BookOpen,
  Menu,
  ChevronRight
} from 'lucide-react'
import type { Story } from '@/types/Story.type'
import Image from 'next/image'

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

  // New states for modernization
  const [readingProgress, setReadingProgress] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')
  const [tableOfContents, setTableOfContents] = useState<Array<{ id: string; text: string; level: number }>>([])
  const [relatedStories, setRelatedStories] = useState<Story[]>([])
  const [reverseConnections, setReverseConnections] = useState<Story[]>([]) // Stories that reference this one
  const [copied, setCopied] = useState(false)
  const [readingTime, setReadingTime] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  // Helper: convert a string to Title Case while preserving separators (space, hyphen, underscore)
  function toTitleCase(input?: string | null) {
    if (!input) return ''
    return String(input)
      .split(/([\s-_])/)
      .map((seg) => {
        if (/^[\s-_]$/.test(seg)) return seg
        return seg.charAt(0).toUpperCase() + seg.slice(1).toLowerCase()
      })
      .join('')
  }

  // Calculate reading time (average 200 words per minute)
  function calculateReadingTime(text: string): number {
    const words = text.trim().split(/\s+/).length
    return Math.ceil(words / 200)
  }

  // Copy link to clipboard
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Scroll to top
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Share story
  async function shareStory() {
    if (navigator.share && story) {
      try {
        await navigator.share({
          title: story.title,
          text: story.summary,
          url: window.location.href,
        })
      } catch (err) {
        console.error('Share failed:', err)
      }
    } else {
      copyLink()
    }
  }

  // Generate consistent heading IDs for TOC and markdown rendering
  function generateHeadingId(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD') // Decompose accented characters
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/[^\w\s-]/g, '') // Remove special chars except word chars, spaces, hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
  }

  // Extract headings from markdown for table of contents
  function extractHeadings(markdown: string): Array<{ id: string; text: string; level: number }> {
    if (!markdown) return []

    const headings: Array<{ id: string; text: string; level: number }> = []
    const lines = markdown.split('\n')

    for (const line of lines) {
      // Match standard markdown headings: # ## ###
      const headingMatch = line.match(/^(#{1,3})\s+(.+)$/)
      if (headingMatch) {
        const level = headingMatch[1].length
        const text = headingMatch[2].trim()
        const id = generateHeadingId(text)
        headings.push({ id, text, level })
        continue
      }

      // ALSO match bold patterns like **Text:** (common in this content)
      const boldMatch = line.match(/^\*\*([^*]+):\*\*\s*$/)
      if (boldMatch) {
        const text = boldMatch[1].trim()
        const id = generateHeadingId(text)
        // Treat bold headings as level 2 (similar to ##)
        headings.push({ id, text, level: 2 })
        continue
      }
    }

    return headings
  }

  // Finds an alert block like `[!info] ...` or `> [!info] ...` at the top of the content
  function extractAlertBlock(md: string) {
    if (!md) return { cleaned: md, alert: null }

    const lines = md.split(/\r?\n/)
    let startIdx = -1
    let type: string | null = null

    const scanLimit = Math.min(lines.length, 20)
    for (let i = 0; i < scanLimit; i++) {
      const trimmed = lines[i].trim()
      const m = trimmed.match(/^>\s*\[!(\w+)\]\s*(.*)$/i) || trimmed.match(/^\[!(\w+)\]\s*(.*)$/i)
      if (m) {
        startIdx = i
        type = m[1].toLowerCase()
        lines[i] = lines[i].replace(/^(>\s*)?\[!\w+\]\s*/i, '')
        break
      }
    }

    if (startIdx === -1 || !type) return { cleaned: md, alert: null }

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

    const cleanedLines = [...lines.slice(0, startIdx), ...lines.slice(endIdx + 1)]
    const cleaned = cleanedLines.join('\n').trim()

    return { cleaned, alert: { type, message } }
  }

  useEffect(() => {
    const loadStory = async () => {
      try {
        // Load the graph data
        const response = await fetch('/data/graph-data.json')
        const data = await response.json()

        // Find the story by ID
        const paramId = String(params.id || '')

        // helper: tolerant matching between stored id/title and the URL param
        function tolerantEquals(a?: string | null, b?: string | null) {
          if (!a || !b) return false
          if (a === b) return true
          try {
            if (decodeURIComponent(b) === a) return true
          } catch (e) {
            // ignore
          }
          if (encodeURIComponent(a) === b) return true
          if (a.toLowerCase() === b.toLowerCase()) return true
          // compare after normalizing whitespace and hyphens
          const norm = (s: string) => s.replace(/[-_\s]+/g, '-').toLowerCase()
          return norm(a) === norm(b)
        }

        const foundStory = data.stories.find((s: Story) => {
          return tolerantEquals(s.id, paramId) || tolerantEquals(s.title, paramId) || tolerantEquals(s.title, decodeURIComponent(paramId))
        })
        if (!foundStory) {
          console.debug('Story lookup failed for paramId:', paramId, 'available ids (first 20):', data.stories.slice(0,20).map((x:any)=>x.id))
          setError('História não encontrada')
          setLoading(false)
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

        // Calculate reading time
        const fullText = [foundStory.summary, foundStory.intro, foundStory.content].filter(Boolean).join(' ')
        setReadingTime(calculateReadingTime(fullText))

        // Extract table of contents from markdown
        const headings = extractHeadings(cleaned)
        console.log('🔍 DEBUG TOC - Extracted headings:', headings)
        console.log('🔍 DEBUG TOC - Number of headings:', headings.length)
        console.log('🔍 DEBUG TOC - Content sample:', cleaned.substring(0, 500))
        console.log('🔍 DEBUG TOC - Full content length:', cleaned.length)
        setTableOfContents(headings)

        // Find related stories based on connections
        if (foundStory.connections && foundStory.connections.length > 0) {
          const related = data.stories.filter((s: Story) =>
            foundStory.connections.includes(s.id) && s.id !== foundStory.id
          ).slice(0, 6) // Limit to 6 related stories
          setRelatedStories(related)
        }

        // Find reverse connections (stories that reference this story)
        const reverseRefs = data.stories.filter((s: Story) =>
          s.connections && s.connections.includes(foundStory.id) && s.id !== foundStory.id
        )
        setReverseConnections(reverseRefs)
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

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrolled = window.scrollY
      const progress = (scrolled / documentHeight) * 100

      setReadingProgress(Math.min(progress, 100))
      setShowScrollTop(scrolled > 400)

      // Update active section based on scroll position
      if (tableOfContents.length > 0) {
        const headingElements = tableOfContents.map(h => document.getElementById(h.id)).filter(Boolean)
        for (let i = headingElements.length - 1; i >= 0; i--) {
          const element = headingElements[i]
          if (element && element.getBoundingClientRect().top <= 150) {
            setActiveSection(tableOfContents[i].id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [tableOfContents])


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
    // Also normalize explicit markdown links that point to /historias/... but may contain spaces
    // e.g. [Solar War](/historias/eras-menores-Solar War)
    replaced = replaced.replace(/\[([^\]]+)\]\((\/historias\/[^)]+)\)/g, (_: string, label: string, path: string) => {
      try {
        const pathNoLeading = path.replace(/^\//, '')
        const segments = pathNoLeading.split('/').map((s: string) => encodeURIComponent(s))
        const newPath = '/' + segments.join('/')
        return `[${label}](${newPath})`
      } catch (e) {
        return `[${label}](${path})`
      }
    })

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
      {/* Reading Progress Bar */}
      <div
        className="reading-progress"
        style={{ width: `${readingProgress}%` }}
      />

      {/* Alert modal overlay */}
      {alertVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-fade-in">
          <div className="max-w-2xl w-full mx-4 bg-zinc-900 rounded-lg p-6 border border-zinc-800 animate-scale-in">
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

      {/* Desktop: Left Sidebar TOC */}
      <aside className="hidden lg:block fixed left-4 top-24 w-64 max-h-[calc(100vh-8rem)] overflow-y-auto z-10">
        {(() => {
          console.log('🎯 DEBUG RENDER - TOC length:', tableOfContents.length)
          console.log('🎯 DEBUG RENDER - TOC data:', tableOfContents)
          return null
        })()}
        {tableOfContents.length > 0 && (
          <Card className="animate-slide-in-left">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Índice
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {tableOfContents.map((heading) => (
                <button
                  key={heading.id}
                  onClick={() => {
                    const element = document.getElementById(heading.id)
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }}
                  className={`w-full text-left text-sm py-1.5 px-2 rounded transition-colors ${
                    activeSection === heading.id
                      ? 'text-lime-400 bg-lime-500/10 font-medium'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                  } ${
                    heading.level === 1 ? '' : 
                    heading.level === 2 ? 'pl-4' : 
                    'pl-8'
                  }`}
                >
                  {heading.text}
                </button>
              ))}
            </CardContent>
          </Card>
        )}
      </aside>

      {/* Mobile: Bottom Sheet TOC */}
      {tableOfContents.length > 0 && (
        <div className="lg:hidden fixed bottom-4 right-4 z-20">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                className="h-12 w-12 rounded-full shadow-lg bg-lime-600 hover:bg-lime-500"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[70vh]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Índice
                </SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-full mt-4">
                <div className="space-y-1">
                  {tableOfContents.map((heading) => (
                    <button
                      key={heading.id}
                      onClick={() => {
                        const element = document.getElementById(heading.id)
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }
                      }}
                      className={`w-full text-left text-sm py-2 px-3 rounded transition-colors ${
                        activeSection === heading.id
                          ? 'text-lime-400 bg-lime-500/10 font-medium'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                      } ${
                        heading.level === 1 ? '' : 
                        heading.level === 2 ? 'pl-6' : 
                        'pl-12'
                      }`}
                    >
                      {heading.text}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-4 left-4 z-20 h-12 w-12 rounded-full shadow-lg animate-fade-in lg:hidden"
          variant="outline"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:ml-72">
        {/* Header with optional hero image */}
        {story.headerImage ? (
          <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-8 animate-fade-in">
            <Image
              src={story.headerImage}
              alt={story.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Button
                  onClick={() => router.push('/about/historias')}
                  variant="outline"
                  size="sm"
                  className="bg-zinc-900/80 backdrop-blur-sm"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
                {story.filePath && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-zinc-900/80 backdrop-blur-sm"
                    onClick={() => window.open(`/content/${story.filePath}`, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Ver Markdown
                  </Button>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-lime-200 mb-4">
                {story.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                <Badge style={{ backgroundColor: story.color + '33', color: story.color }}>
                  {toTitleCase(story.category)}
                </Badge>
                <Badge variant="secondary">{toTitleCase(story.importance)}</Badge>
                <Badge variant="secondary">{toTitleCase(story.status)}</Badge>
                {readingTime > 0 && (
                  <Badge variant="outline" className="gap-1">
                    <Clock className="w-3 h-3" />
                    {readingTime} min
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8 animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <Button
                onClick={() => router.push('/about/historias')}
                variant="outline"
                size="sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              {story.filePath && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`/content/${story.filePath}`, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Ver Markdown
                </Button>
              )}
              <div className="flex-1" />
              <Button
                onClick={copyLink}
                variant="ghost"
                size="sm"
                className="gap-2"
              >
                {copied ? 'Copiado!' : <><Copy className="w-4 h-4" /> Copiar Link</>}
              </Button>
              <Button
                onClick={shareStory}
                variant="ghost"
                size="sm"
                className="gap-2"
              >
                <Share2 className="w-4 h-4" /> Compartilhar
              </Button>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-lime-200 mb-4">
              {story.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge style={{ backgroundColor: story.color + '33', color: story.color }}>
                {toTitleCase(story.category)}
              </Badge>
              <Badge variant="secondary">{toTitleCase(story.importance)}</Badge>
              <Badge variant="secondary">{toTitleCase(story.status)}</Badge>
              {readingTime > 0 && (
                <Badge variant="outline" className="gap-1">
                  <Clock className="w-3 h-3" />
                  {readingTime} min
                </Badge>
              )}
            </div>

            {story.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {story.tags.map((tag, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    #{toTitleCase(tag)}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Content Tabs */}
        <Tabs defaultValue="story" className="mb-8 animate-slide-up delay-100">
          <TabsList>
            <TabsTrigger value="story">História</TabsTrigger>
            {relatedStories.length > 0 && (
              <TabsTrigger value="connections">
                Conexões ({relatedStories.length})
              </TabsTrigger>
            )}
            <TabsTrigger value="metadata">Metadados</TabsTrigger>
          </TabsList>

          <TabsContent value="story" className="space-y-6">
            {/* Summary */}
            {renderSummary && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-cyan-200">Resumo</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{renderSummary}</ReactMarkdown>
                </CardContent>
              </Card>
            )}

            {/* Intro */}
            {story.intro && (
              <Card className="animate-fade-in delay-100">
                <CardHeader>
                  <CardTitle className="text-cyan-200">Introdução</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300 leading-relaxed">{story.intro}</p>
                </CardContent>
              </Card>
            )}

            {/* Main Content */}
            {renderContent && !contentBlocked && (
              <div ref={contentRef} className="animate-fade-in delay-200">
                <Card>
                  <CardContent className="pt-6">
                    <div className="prose prose-invert prose-lime max-w-none story-content">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({node, ...props}) => {
                            const text = String(props.children)
                            const id = generateHeadingId(text)
                            return <h1 id={id} className="text-3xl font-bold text-lime-100 mb-6 mt-10 scroll-mt-24" {...props} />
                          },
                          h2: ({node, ...props}) => {
                            const text = String(props.children)
                            const id = generateHeadingId(text)
                            return <h2 id={id} className="text-2xl font-bold text-lime-200 mb-4 mt-8 scroll-mt-24" {...props} />
                          },
                          h3: ({node, ...props}) => {
                            const text = String(props.children)
                            const id = generateHeadingId(text)
                            return <h3 id={id} className="text-xl font-bold text-cyan-200 mb-3 mt-6 scroll-mt-24" {...props} />
                          },
                          h4: (props) => <h4 className="text-lg font-bold text-cyan-200 mb-2 mt-4" {...props} />,
                          strong: ({node, ...props}) => {
                            // Check if this is a heading-like bold (ends with :)
                            const text = String(props.children)
                            if (text.endsWith(':')) {
                              const id = generateHeadingId(text.replace(/:$/, ''))
                              return (
                                <strong
                                  id={id}
                                  className="block text-xl font-bold text-lime-200 mb-3 mt-6 scroll-mt-24"
                                  {...props}
                                />
                              )
                            }
                            // Regular bold text
                            return <strong {...props} />
                          },
                          p: (props) => <p className="text-zinc-300 mb-4 leading-relaxed" {...props} />,
                          ul: (props) => <ul className="list-disc list-inside text-zinc-300 mb-4 space-y-2" {...props} />,
                          ol: (props) => <ol className="list-decimal list-inside text-zinc-300 mb-4 space-y-2" {...props} />,
                          li: (props) => <li className="text-zinc-300" {...props} />,
                          blockquote: (props) => (
                            <blockquote className="border-l-4 border-lime-500 pl-4 py-2 italic text-zinc-400 my-4 bg-lime-500/5" {...props} />
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
                          a: (props) => <a className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/30 hover:decoration-cyan-300 transition-colors" {...props} />,
                          img: (props) => (
                            <img className="rounded-lg max-w-full h-auto my-6 shadow-lg" {...props} alt={props.alt || ''} />
                          ),
                          table: (props) => (
                            <div className="overflow-x-auto my-6 rounded-lg border border-zinc-800">
                              <table className="min-w-full border-collapse" {...props} />
                            </div>
                          ),
                          th: (props) => (
                            <th className="border border-zinc-700 bg-zinc-800 px-4 py-2 text-left text-zinc-200 font-semibold" {...props} />
                          ),
                          td: (props) => (
                            <td className="border border-zinc-700 px-4 py-2 text-zinc-300" {...props} />
                          ),
                        }}
                      >
                        {renderContent}
                      </ReactMarkdown>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="connections">
            {relatedStories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedStories.map((relatedStory) => (
                  <Card
                    key={relatedStory.id}
                    className="cursor-pointer hover:border-lime-500/50 transition-all hover:shadow-lg hover:shadow-lime-500/10 group animate-scale-in"
                    onClick={() => router.push(`/historias/${relatedStory.id}`)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg group-hover:text-lime-200 transition-colors">
                          {relatedStory.title}
                        </CardTitle>
                        <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-lime-400 transition-colors" />
                      </div>
                      <CardDescription className="line-clamp-2">
                        {relatedStory.summary}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant="secondary"
                          style={{ backgroundColor: relatedStory.color + '33', color: relatedStory.color }}
                        >
                          {toTitleCase(relatedStory.category)}
                        </Badge>
                        <Badge variant="outline">
                          {toTitleCase(relatedStory.era)}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center text-zinc-500">
                  Nenhuma história conectada
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="metadata">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Informações da História</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {story.author && (
                    <div>
                      <div className="text-sm text-zinc-500 mb-1">Autor</div>
                      <div className="text-zinc-200 font-medium">{story.author}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-sm text-zinc-500 mb-1">Era</div>
                    <div className="text-zinc-200 font-medium">{toTitleCase(story.era)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500 mb-1">Categoria</div>
                    <div className="text-zinc-200 font-medium">{toTitleCase(story.category)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500 mb-1">Status</div>
                    <div className="text-zinc-200 font-medium">{toTitleCase(story.status)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500 mb-1">Importância</div>
                    <div className="text-zinc-200 font-medium">{toTitleCase(story.importance)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500 mb-1">Última Modificação</div>
                    <div className="text-zinc-200 font-medium">
                      {new Date(story.lastModified).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500 mb-1">Conexões</div>
                    <div className="text-zinc-200 font-medium">{story.connections.length}</div>
                  </div>
                  {readingTime > 0 && (
                    <div>
                      <div className="text-sm text-zinc-500 mb-1">Tempo de Leitura</div>
                      <div className="text-zinc-200 font-medium">{readingTime} minutos</div>
                    </div>
                  )}
                </div>

                {story.tags.length > 0 && (
                  <div className="pt-4 border-t border-zinc-800">
                    <div className="text-sm text-zinc-500 mb-2">Tags</div>
                    <div className="flex flex-wrap gap-2">
                      {story.tags.map((tag, i) => (
                        <Badge key={i} variant="outline">
                          #{toTitleCase(tag)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Connections Section */}
                {(relatedStories.length > 0 || reverseConnections.length > 0) && (
                  <div className="pt-4 border-t border-zinc-800 space-y-4">
                    <h3 className="text-lg font-semibold text-lime-200">Conexões</h3>

                    {/* Outgoing Connections - What this story references */}
                    {relatedStories.length > 0 && (
                      <div>
                        <div className="text-sm text-zinc-400 mb-3 flex items-center gap-2">
                          <ChevronRight className="w-4 h-4" />
                          <span>Esta história referencia ({relatedStories.length}):</span>
                        </div>
                        <div className="space-y-2 pl-6">
                          {relatedStories.map((relatedStory) => (
                            <button
                              key={relatedStory.id}
                              onClick={() => router.push(`/historias/${relatedStory.id}`)}
                              className="w-full text-left p-3 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 transition-colors group flex items-center justify-between"
                            >
                              <div className="flex-1">
                                <div className="text-sm font-medium text-zinc-200 group-hover:text-lime-300 transition-colors">
                                  {relatedStory.title}
                                </div>
                                <div className="text-xs text-zinc-500 mt-1">
                                  {toTitleCase(relatedStory.category)} • {toTitleCase(relatedStory.era)}
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-lime-400 transition-colors" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Incoming Connections - What references this story */}
                    {reverseConnections.length > 0 && (
                      <div>
                        <div className="text-sm text-zinc-400 mb-3 flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 rotate-180" />
                          <span>Referenciada por ({reverseConnections.length}):</span>
                        </div>
                        <div className="space-y-2 pl-6">
                          {reverseConnections.map((reverseStory) => (
                            <button
                              key={reverseStory.id}
                              onClick={() => router.push(`/historias/${reverseStory.id}`)}
                              className="w-full text-left p-3 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 transition-colors group flex items-center justify-between"
                            >
                              <div className="flex-1">
                                <div className="text-sm font-medium text-zinc-200 group-hover:text-cyan-300 transition-colors">
                                  {reverseStory.title}
                                </div>
                                <div className="text-xs text-zinc-500 mt-1">
                                  {toTitleCase(reverseStory.category)} • {toTitleCase(reverseStory.era)}
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 rotate-180 text-zinc-600 group-hover:text-cyan-400 transition-colors" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

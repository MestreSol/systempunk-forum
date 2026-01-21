'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  Search,
  Filter,
  RotateCcw,
  Info,
  Maximize,
  BookOpen,
  Zap,
  Users,
  MapPin,
  Cpu,
  Palette,
  HelpCircle
} from 'lucide-react'
import type { Story, StoryConnection } from '@/types/Story.type'
import { storyCategories } from '@/mocks/Stories'

// Dynamically import ForceGraph2D to avoid SSR issues
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-zinc-950">
      <div className="text-zinc-400">Carregando grafo...</div>
    </div>
  )
})

const categoryIcons = {
  character: Users,
  event: Zap,
  location: MapPin,
  technology: Cpu,
  culture: Palette,
  mystery: HelpCircle
}

interface GraphNode {
  id: string
  name: string
  val: number
  color: string
  category: string
  story: Story
  x?: number
  y?: number
  vx?: number
  vy?: number
}

interface GraphLink {
  source: string
  target: string
  strength: number
}

type ViewMode = 'global' | 'local' | 'minimal'

export default function HistoriasPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [connections, setConnections] = useState<StoryConnection[]>([])
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [hoveredStory, setHoveredStory] = useState<Story | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [visibleCategories, setVisibleCategories] = useState<Set<string>>(
    new Set(storyCategories.map((c) => c.id))
  )
  const [showDetails, setShowDetails] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('global')
  const [localDepth, setLocalDepth] = useState(2)
  const graphRef = useRef<any>(null)

  // Helper function to get nodes within N hops from selected node
  const getLocalSubgraph = useCallback((centerStoryId: string, depth: number): Set<string> => {
    const visited = new Set<string>()
    const queue: Array<{ id: string; depth: number }> = [{ id: centerStoryId, depth: 0 }]
    
    while (queue.length > 0) {
      const { id, depth: currentDepth } = queue.shift()!
      
      if (visited.has(id) || currentDepth > depth) continue
      visited.add(id)
      
      // Find connected stories
      const story = stories.find(s => s.id === id)
      if (story && currentDepth < depth) {
        story.connections.forEach(connId => {
          if (!visited.has(connId)) {
            queue.push({ id: connId, depth: currentDepth + 1 })
          }
        })
      }
    }
    
    return visited
  }, [stories])

  const filteredStories = useMemo(() => {
    let filtered = stories.filter(
      (story) =>
        visibleCategories.has(story.category) &&
        (story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          story.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
          story.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          ))
    )

    // Apply view mode filtering
    if (viewMode === 'local' && selectedStory) {
      const localIds = getLocalSubgraph(selectedStory.id, localDepth)
      filtered = filtered.filter(s => localIds.has(s.id))
    } else if (viewMode === 'minimal') {
      // Show only high importance stories when minimal mode
      filtered = filtered.filter(s => 
        s.importance === 'critical' || s.importance === 'high'
      )
    }

    return filtered
  }, [searchTerm, stories, visibleCategories, viewMode, selectedStory, localDepth, getLocalSubgraph])

  // Transform data for force graph
  const graphData = useMemo(() => {
    const nodes: GraphNode[] = filteredStories.map((story) => ({
      id: story.id,
      name: story.title,
      val: story.importance === 'critical' ? 20 : story.importance === 'high' ? 15 : story.importance === 'medium' ? 10 : 5,
      color: story.color,
      category: story.category,
      story
    }))

    const visibleIds = new Set(filteredStories.map((s) => s.id))
    const links: GraphLink[] = connections
      .filter((c) => visibleIds.has(c.from) && visibleIds.has(c.to))
      .map((c) => ({
        source: c.from,
        target: c.to,
        strength: c.strength || 0.5
      }))

    return { nodes, links }
  }, [filteredStories, connections])

  const handleCategoryToggle = (categoryId: string) => {
    const newVisible = new Set(visibleCategories)
    if (newVisible.has(categoryId)) {
      newVisible.delete(categoryId)
    } else {
      newVisible.add(categoryId)
    }
    setVisibleCategories(newVisible)
  }

  const resetView = () => {
    setSelectedStory(null)
    setHoveredStory(null)
    setSearchTerm('')
    setVisibleCategories(new Set(storyCategories.map((c) => c.id)))
  }

  const fetchBatches = useCallback(async (reset = false) => {
    const pageSize = 50
    if (reset) {
      setStories([])
      setConnections([])
    }

    try {
      let offset = 0
      let hasMore = true

      while (hasMore) {
        const params = new URLSearchParams({
          offset: String(offset),
          limit: String(pageSize)
        })
        const res = await fetch(`/api/historias?${params.toString()}`, {
          cache: 'no-store'
        })

        if (!res.ok) break

        const data = await res.json()
        if (!data?.ok) break

        const newStories: Story[] = data.stories || []
        const newConnections: StoryConnection[] = data.connections || []

        setStories((prev) => {
          const byId = new Map(prev.map((s) => [s.id, s]))
          newStories.forEach((s) => byId.set(s.id, s))
          return Array.from(byId.values())
        })

        setConnections((prev) => {
          const key = (c: StoryConnection) => `${c.from}->${c.to}|${c.type}`
          const map = new Map(prev.map((c) => [key(c), c]))
          newConnections.forEach((c) => map.set(key(c), c))
          return Array.from(map.values())
        })

        offset += newStories.length
        hasMore = data.hasMore && newStories.length > 0

        if (hasMore) {
          await new Promise((r) => setTimeout(r, 100))
        }
      }
    } catch (e) {
      console.error('Failed to fetch historias', e)
    }
  }, [])

  useEffect(() => {
    fetchBatches(true)
  }, [fetchBatches])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showFilters) {
          setShowFilters(false)
        } else {
          setSelectedStory(null)
          setShowDetails(false)
        }
      }
      if (e.key === 'f' || e.key === 'F') {
        setIsFullscreen(!isFullscreen)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isFullscreen, showFilters])

  const handleNodeClick = useCallback((node: any) => {
    if (node && node.story) {
      setSelectedStory(node.story)
    }
  }, [])

  const handleNodeHover = useCallback((node: any) => {
    setHoveredStory(node?.story || null)
  }, [])

  const paintNodeCanvas = useCallback(
    (node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
      if (!node || typeof node.x !== 'number' || typeof node.y !== 'number') return

      const isSelected = selectedStory?.id === node.id
      const isHighlighted =
        hoveredStory?.id === node.id ||
        (selectedStory && selectedStory.connections.includes(node.id))

      // LOD: Simplify rendering based on zoom level
      const isDetailed = globalScale > 0.8
      const showLabels = globalScale > 0.5
      
      const size = isSelected ? node.val * 1.5 : isHighlighted ? node.val * 1.2 : node.val
      const opacity = isHighlighted || isSelected ? 1 : globalScale < 0.5 ? 0.6 : 0.8

      // Draw node circle
      ctx.beginPath()
      ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false)
      ctx.fillStyle = node.color + Math.floor(opacity * 255).toString(16).padStart(2, '0')
      ctx.fill()

      // Draw border for selected/highlighted (skip when zoomed out for performance)
      if ((isSelected || isHighlighted) && isDetailed) {
        ctx.strokeStyle = isSelected ? '#00ffff' : node.color
        ctx.lineWidth = isSelected ? 3 / globalScale : 2 / globalScale
        ctx.stroke()
      }

      // Draw label for selected or highlighted (only when zoomed in enough)
      if ((isSelected || isHighlighted) && showLabels) {
        const fontSize = Math.max(10, 14 / globalScale)
        ctx.font = `${fontSize}px Inter, sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        // Add text shadow for better readability
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)'
        ctx.shadowBlur = 4
        ctx.fillStyle = '#ffffff'
        ctx.fillText(node.name, node.x, node.y - size - 10 / globalScale)
        ctx.shadowBlur = 0
      }
    },
    [selectedStory, hoveredStory]
  )

  const paintLinkCanvas = useCallback(
    (link: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const connectsSelected =
        selectedStory &&
        (selectedStory.id === link.source.id || selectedStory.id === link.target.id)

      if (!connectsSelected && !hoveredStory) {
        ctx.strokeStyle = '#335566'
        ctx.lineWidth = (link.strength || 0.5) * 1 / globalScale
        ctx.globalAlpha = 0.2
      } else if (connectsSelected) {
        ctx.strokeStyle = '#00ffff'
        ctx.lineWidth = (link.strength || 0.5) * 3 / globalScale
        ctx.globalAlpha = 0.8
      } else {
        ctx.strokeStyle = '#335566'
        ctx.lineWidth = (link.strength || 0.5) * 1 / globalScale
        ctx.globalAlpha = 0.15
      }

      ctx.beginPath()
      ctx.moveTo(link.source.x, link.source.y)
      ctx.lineTo(link.target.x, link.target.y)
      ctx.stroke()
      ctx.globalAlpha = 1
    },
    [selectedStory, hoveredStory]
  )

  return (
    <div
      className={`${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'} bg-zinc-950 text-white`}
    >
      <div className="relative border-b border-zinc-800/50 p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/about/introducao"
              className="flex items-center gap-2 text-lime-400 hover:text-lime-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </Link>

            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-lime-400" />
              <div>
                <h1 className="text-3xl font-bold text-lime-200">
                  Histórias do Universo
                </h1>
                <p className="text-zinc-400">
                  Mapa mental interativo das narrativas do SystemPunk
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="text-white/80 hover:text-white"
            >
              <Filter className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="text-white/80 hover:text-white"
            >
              <Info className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="text-white/80 hover:text-white"
            >
              <Maximize className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 relative">
        {/* Painel de Filtros Lateral */}
        {showFilters && (
          <div className="fixed left-0 top-0 h-full w-80 bg-zinc-900/95 backdrop-blur-sm border-r border-zinc-700 z-50 shadow-2xl overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-lime-200">Filtros</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                  className="text-zinc-400 hover:text-white"
                >
                  ✕
                </Button>
              </div>

              <div>
                <h3 className="font-semibold text-purple-200 mb-3">Buscar</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Buscar histórias..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-lime-500"
                  />
                  {searchTerm && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchTerm('')}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 p-0 text-zinc-400 hover:text-white"
                      title="Limpar busca"
                    >
                      ✕
                    </Button>
                  )}
                </div>
                {searchTerm && (
                  <div className="mt-2 text-xs text-zinc-400">
                    Encontradas: {filteredStories.length} histórias
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-cyan-200">Categorias</h3>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setVisibleCategories(new Set(storyCategories.map((c) => c.id)))
                      }
                      className="text-xs text-zinc-400 hover:text-white px-2 py-1 h-auto"
                      title="Selecionar todas"
                    >
                      Todas
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setVisibleCategories(new Set())}
                      className="text-xs text-zinc-400 hover:text-white px-2 py-1 h-auto"
                      title="Desselecionar todas"
                    >
                      Nenhuma
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  {storyCategories.map((category) => {
                    const IconComponent =
                      categoryIcons[category.id as keyof typeof categoryIcons]
                    const isActive = visibleCategories.has(category.id)
                    return (
                      <Button
                        key={category.id}
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCategoryToggle(category.id)}
                        className={`w-full justify-start gap-3 p-3 h-auto ${
                          isActive
                            ? 'bg-opacity-20 text-white border border-opacity-50'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                        style={{
                          backgroundColor: isActive ? category.color + '15' : undefined,
                          borderColor: isActive ? category.color + '80' : undefined
                        }}
                      >
                        <IconComponent
                          className="w-5 h-5 flex-shrink-0"
                          style={{ color: category.color }}
                        />
                        <div className="flex-1 text-left">
                          <div className="font-medium">{category.name}</div>
                          <div className="text-xs text-zinc-500">
                            {
                              filteredStories.filter((s) => s.category === category.id)
                                .length
                            }{' '}
                            histórias
                          </div>
                        </div>
                      </Button>
                    )
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-amber-200">Modo de Visualização</h3>
                </div>
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode('global')}
                    className={`w-full justify-start gap-3 p-3 h-auto ${
                      viewMode === 'global'
                        ? 'bg-amber-500/20 text-white border border-amber-500/50'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <BookOpen className="w-5 h-5 flex-shrink-0" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">Global</div>
                      <div className="text-xs text-zinc-500">
                        Mostra todas as histórias ({stories.length} total)
                      </div>
                    </div>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setViewMode('local')
                      if (!selectedStory && filteredStories.length > 0) {
                        setSelectedStory(filteredStories[0])
                      }
                    }}
                    className={`w-full justify-start gap-3 p-3 h-auto ${
                      viewMode === 'local'
                        ? 'bg-cyan-500/20 text-white border border-cyan-500/50'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <MapPin className="w-5 h-5 flex-shrink-0" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">Local</div>
                      <div className="text-xs text-zinc-500">
                        Foco em história selecionada + vizinhos
                      </div>
                    </div>
                  </Button>

                  {viewMode === 'local' && (
                    <div className="pl-4 pr-2">
                      <label className="text-xs text-zinc-400 block mb-1">
                        Profundidade: {localDepth} hop{localDepth > 1 ? 's' : ''}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="4"
                        value={localDepth}
                        onChange={(e) => setLocalDepth(parseInt(e.target.value))}
                        className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                      />
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode('minimal')}
                    className={`w-full justify-start gap-3 p-3 h-auto ${
                      viewMode === 'minimal'
                        ? 'bg-purple-500/20 text-white border border-purple-500/50'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Zap className="w-5 h-5 flex-shrink-0" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">Minimal</div>
                      <div className="text-xs text-zinc-500">
                        Apenas histórias importantes
                      </div>
                    </div>
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-700 space-y-3">
                <Button
                  variant="outline"
                  onClick={resetView}
                  className="w-full text-zinc-400 hover:text-white border-zinc-600"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Filtros
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    setShowFilters(false)
                    setShowDetails(true)
                  }}
                  className="w-full text-zinc-400 hover:text-white border-zinc-600"
                >
                  <Info className="w-4 h-4 mr-2" />
                  Como Usar
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className={`grid ${selectedStory ? 'lg:grid-cols-3' : 'grid-cols-1'} h-[calc(100vh-140px)]`}>
          <div className={`${selectedStory ? 'lg:col-span-2' : 'col-span-1'} relative bg-zinc-950`}>
            {/* Stats overlay */}
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 z-10">
              <div className="text-sm text-white/80">
                <div className="font-semibold text-lime-400">
                  {filteredStories.length} Histórias
                  {viewMode !== 'global' && (
                    <span className="text-xs text-zinc-400 ml-2">
                      / {stories.length} total
                    </span>
                  )}
                </div>
                <div>{graphData.links.length} Conexões</div>
                <div>
                  {visibleCategories.size}/{storyCategories.length} Categorias
                </div>
                <div className="text-xs text-amber-400 mt-1">
                  Modo: {viewMode === 'global' ? 'Global' : viewMode === 'local' ? 'Local' : 'Minimal'}
                </div>
              </div>
            </div>

            {/* Force Graph */}
            <ForceGraph2D
              ref={graphRef}
              graphData={graphData}
              nodeId="id"
              nodeVal="val"
              nodeLabel="name"
              nodeColor="color"
              linkSource="source"
              linkTarget="target"
              linkWidth={(link: any) => link.strength * 2}
              onNodeClick={handleNodeClick}
              onNodeHover={handleNodeHover}
              nodeCanvasObject={paintNodeCanvas}
              linkCanvasObject={paintLinkCanvas}
              backgroundColor="#09090b"
              enableNodeDrag={true}
              enableZoomInteraction={true}
              enablePanInteraction={true}
              // Optimized physics for large graphs
              cooldownTime={filteredStories.length > 200 ? 1500 : filteredStories.length > 100 ? 2000 : 3000}
              d3VelocityDecay={0.4}
              d3AlphaDecay={filteredStories.length > 200 ? 0.05 : 0.02}
              warmupTicks={filteredStories.length > 200 ? 50 : 100}
              cooldownTicks={0}
            />
          </div>

          {selectedStory && (
            <div className="lg:col-span-1 bg-zinc-900 border-l border-zinc-800 overflow-y-auto">
              <div className="p-6 space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-lime-200 mb-2">
                      {selectedStory.title}
                    </h2>
                    <Badge
                      className="mb-4"
                      style={{
                        backgroundColor:
                          storyCategories.find((c) => c.id === selectedStory.category)
                            ?.color + '33',
                        color: storyCategories.find(
                          (c) => c.id === selectedStory.category
                        )?.color
                      }}
                    >
                      {storyCategories.find((c) => c.id === selectedStory.category)
                        ?.name}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedStory(null)}
                    className="text-zinc-400 hover:text-white"
                  >
                    ✕
                  </Button>
                </div>

                <div>
                  <h3 className="font-semibold text-cyan-200 mb-2">Resumo</h3>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {selectedStory.summary}
                  </p>
                </div>

                {(selectedStory as any).intro && (
                  <div>
                    <h3 className="font-semibold text-cyan-200 mb-2">História</h3>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {(selectedStory as any).intro}
                    </p>
                  </div>
                )}

                {selectedStory.tags.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-purple-200 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedStory.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedStory.connections.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-orange-200 mb-2">Conexões</h3>
                    <div className="space-y-2">
                      {selectedStory.connections.map((connectionId) => {
                        const connectedStory = stories.find((s) => s.id === connectionId)
                        if (!connectedStory) return null
                        return (
                          <Button
                            key={connectionId}
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedStory(connectedStory)}
                            className="w-full justify-start text-left h-auto p-3"
                          >
                            <div>
                              <div className="font-medium text-white">
                                {connectedStory.title}
                              </div>
                              <div className="text-xs text-zinc-400">
                                {connectedStory.summary}
                              </div>
                            </div>
                          </Button>
                        )
                      })}
                    </div>
                  </div>
                )}

                <div className="text-xs text-zinc-500 space-y-1">
                  <div>
                    Era:{' '}
                    {selectedStory.era
                      .replace('-', ' ')
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </div>
                  {(selectedStory as any).author && (
                    <div>Autor: {(selectedStory as any).author}</div>
                  )}
                  <div>Importância: {selectedStory.importance}</div>
                  <div>Status: {selectedStory.status}</div>
                  <div>Última modificação: {selectedStory.lastModified}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showDetails && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <Card className="bg-zinc-900 border-zinc-700 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-lime-200">
                  Como usar o Mapa Mental
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(false)}
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-cyan-200 mb-2">Navegação</h3>
                  <ul className="text-sm text-zinc-300 space-y-1">
                    <li>
                      • <strong>Zoom:</strong> Use a roda do mouse ou pinch no touchpad
                    </li>
                    <li>
                      • <strong>Mover:</strong> Clique e arraste o fundo
                    </li>
                    <li>
                      • <strong>Selecionar:</strong> Clique em um nó
                    </li>
                    <li>
                      • <strong>Mover nó:</strong> Arraste um nó para reposicioná-lo
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-amber-200 mb-2">Modos de Visualização</h3>
                  <ul className="text-sm text-zinc-300 space-y-2">
                    <li>
                      • <strong className="text-amber-300">Global:</strong> Mostra todas as histórias de uma vez. Ideal para visão geral, mas pode ficar lento com muitos nós (500+).
                    </li>
                    <li>
                      • <strong className="text-cyan-300">Local:</strong> Mostra apenas a história selecionada e seus vizinhos (1-4 hops). Perfeito para explorar relações específicas. Similar ao grafo local do Obsidian.
                    </li>
                    <li>
                      • <strong className="text-purple-300">Minimal:</strong> Mostra apenas histórias de alta importância (críticas e altas). Útil para focar no essencial em grandes datasets.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-purple-200 mb-2">Categorias</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {storyCategories.map((category) => {
                      const IconComponent =
                        categoryIcons[category.id as keyof typeof categoryIcons]
                      return (
                        <div key={category.id} className="flex items-center gap-2">
                          <IconComponent
                            className="w-4 h-4"
                            style={{ color: category.color }}
                          />
                          <span className="text-zinc-300">{category.name}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-orange-200 mb-2">Conexões</h3>
                  <p className="text-sm text-zinc-300">
                    Quando você seleciona uma história, as linhas cyan aparecem
                    conectando-a às histórias relacionadas. A espessura da linha
                    indica a força da conexão.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-red-200 mb-2">
                    Atalhos do Teclado
                  </h3>
                  <ul className="text-sm text-zinc-300 space-y-1">
                    <li>
                      • <strong>F:</strong> Alternar tela cheia
                    </li>
                    <li>
                      • <strong>ESC:</strong> Fechar detalhes/filtros
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lime-200 mb-2">Performance com Muitos Nós</h3>
                  <div className="text-sm text-zinc-300 space-y-2">
                    <p>
                      Este mapa usa renderização em canvas 2D para melhor performance.
                      O sistema se adapta automaticamente ao tamanho do dataset:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>Até 100 nós:</strong> Performance excelente (60 fps) no modo Global</li>
                      <li><strong>100-300 nós:</strong> Use modo Global com zoom. LOD simplifica nós distantes</li>
                      <li><strong>300-1000 nós:</strong> Recomendado usar modo Local ou Minimal</li>
                      <li><strong>1000+ nós:</strong> Use modo Local (mostra apenas subgrafo) para melhor UX</li>
                    </ul>
                    <p className="mt-2 text-cyan-300">
                      💡 Dica: Para datasets grandes, comece no modo Minimal para visão geral, 
                      depois mude para Local ao explorar histórias específicas.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

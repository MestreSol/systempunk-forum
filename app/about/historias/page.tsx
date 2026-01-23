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
  HelpCircle,
  Settings,
  Play,
  Pause,
  Sliders
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
  const [highlightNodes, setHighlightNodes] = useState<Set<string>>(new Set())
  const [highlightLinks, setHighlightLinks] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [visibleCategories, setVisibleCategories] = useState<Set<string>>(
    new Set(storyCategories.map((c) => c.id))
  )
  const [showDetails, setShowDetails] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('global')
  const [localDepth, setLocalDepth] = useState(2)

  // Control menu states
  const [chargeStrength, setChargeStrength] = useState(-120)
  const [linkDistance, setLinkDistance] = useState(30)
  const [showLabels, setShowLabels] = useState(true)
  const [nodeSize, setNodeSize] = useState(1)
  const [linkOpacity, setLinkOpacity] = useState(0.2)

  // Dynamic/Obsidian-like physics parameters
  const [dynamicsOpen, setDynamicsOpen] = useState(false)
  const [physicsPreset, setPhysicsPreset] = useState<'obsidian' | 'tight' | 'wide' | 'custom'>('obsidian')
  const [linkDistancePadding, setLinkDistancePadding] = useState(50)
  const [linkStrengthMultiplier, setLinkStrengthMultiplier] = useState(0.6)
  const [chargeStrengthFactor, setChargeStrengthFactor] = useState(3)
  const [collisionPadding, setCollisionPadding] = useState(8)
  const [centerForceStrength, setCenterForceStrength] = useState(0.1)
  const [enableCenterForce, setEnableCenterForce] = useState(true)
  const [enableGravity, setEnableGravity] = useState(true)
  const [gravityStrength, setGravityStrength] = useState(0.05)
  const [velocityDecay, setVelocityDecay] = useState(0.4)
  const [alphaDecay, setAlphaDecay] = useState(0.02)
  const [physicsActive, setPhysicsActive] = useState(true)
  const [dagMode, setDagMode] = useState<'td' | 'bu' | 'lr' | 'rl' | undefined>(undefined)
  const [enableParticles, setEnableParticles] = useState(true)
  const [enableGlow, setEnableGlow] = useState(true)

  const graphRef = useRef<any>(null)

  // Physics presets (Obsidian-like configurations)
  const physicsPresets = useMemo(() => ({
    obsidian: {
      linkDistancePadding: 50,
      linkStrengthMultiplier: 0.6,
      chargeStrengthFactor: 3,
      collisionPadding: 8,
      centerForceStrength: 0.1,
      enableCenterForce: true,
      enableGravity: true,
      gravityStrength: 0.05,
      velocityDecay: 0.4,
      alphaDecay: 0.02
    },
    tight: {
      linkDistancePadding: 20,
      linkStrengthMultiplier: 1.2,
      chargeStrengthFactor: 1.5,
      collisionPadding: 4,
      centerForceStrength: 0.2,
      enableCenterForce: true,
      enableGravity: true,
      gravityStrength: 0.08,
      velocityDecay: 0.5,
      alphaDecay: 0.03
    },
    wide: {
      linkDistancePadding: 100,
      linkStrengthMultiplier: 0.3,
      chargeStrengthFactor: 4,
      collisionPadding: 12,
      centerForceStrength: 0.05,
      enableCenterForce: true,
      enableGravity: true,
      gravityStrength: 0.03,
      velocityDecay: 0.3,
      alphaDecay: 0.015
    },
    custom: {
      linkDistancePadding,
      linkStrengthMultiplier,
      chargeStrengthFactor,
      collisionPadding,
      centerForceStrength,
      enableCenterForce,
      enableGravity,
      gravityStrength,
      velocityDecay,
      alphaDecay
    }
  }), [linkDistancePadding, linkStrengthMultiplier, chargeStrengthFactor, collisionPadding, centerForceStrength, enableCenterForce, enableGravity, gravityStrength, velocityDecay, alphaDecay])

  // Apply preset function
  const applyPreset = useCallback((preset: 'obsidian' | 'tight' | 'wide') => {
    const config = physicsPresets[preset]
    setLinkDistancePadding(config.linkDistancePadding)
    setLinkStrengthMultiplier(config.linkStrengthMultiplier)
    setChargeStrengthFactor(config.chargeStrengthFactor)
    setCollisionPadding(config.collisionPadding)
    setCenterForceStrength(config.centerForceStrength)
    setEnableCenterForce(config.enableCenterForce)
    setEnableGravity(config.enableGravity)
    setGravityStrength(config.gravityStrength)
    setVelocityDecay(config.velocityDecay)
    setAlphaDecay(config.alphaDecay)
    setPhysicsPreset(preset)
  }, [physicsPresets])

  // Save/Load physics settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('systempunk-graph-physics')
    if (saved) {
      try {
        const config = JSON.parse(saved)
        if (config.preset && config.preset !== 'custom') {
          applyPreset(config.preset)
        } else if (config.custom) {
          setLinkDistancePadding(config.custom.linkDistancePadding ?? 50)
          setLinkStrengthMultiplier(config.custom.linkStrengthMultiplier ?? 0.6)
          setChargeStrengthFactor(config.custom.chargeStrengthFactor ?? 3)
          setCollisionPadding(config.custom.collisionPadding ?? 8)
          setCenterForceStrength(config.custom.centerForceStrength ?? 0.1)
          setEnableCenterForce(config.custom.enableCenterForce ?? true)
          setEnableGravity(config.custom.enableGravity ?? true)
          setGravityStrength(config.custom.gravityStrength ?? 0.05)
          setVelocityDecay(config.custom.velocityDecay ?? 0.4)
          setAlphaDecay(config.custom.alphaDecay ?? 0.02)
          setPhysicsPreset('custom')
        }
      } catch (e) {
        console.warn('Failed to load physics settings', e)
      }
    }
  }, [applyPreset])

  useEffect(() => {
    const config = {
      preset: physicsPreset,
      custom: physicsPreset === 'custom' ? physicsPresets.custom : undefined
    }
    localStorage.setItem('systempunk-graph-physics', JSON.stringify(config))
  }, [physicsPreset, physicsPresets])

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

  // Apply simple force-directed physics
  useEffect(() => {
    const g = graphRef.current
    if (!g || typeof g.d3Force !== 'function') return

    const applyForces = async () => {
      try {
        const mod: any = await import('d3-force')
        const { forceManyBody, forceLink, forceCenter } = mod

        console.log('🔧 Aplicando física:', {
          chargeStrength,
          linkDistance,
          nodes: graphData.nodes.length,
          links: graphData.links.length
        })

        // Repulsive force (controllable) - valores negativos afastam
        const chargeForce = forceManyBody()
          .strength(chargeStrength)
          .distanceMax(500) // Limita alcance para melhor performance

        g.d3Force('charge', chargeForce)
        console.log('  ⚡ Charge force:', chargeStrength, '(valores negativos = repulsão)')

        // Link force (controllable) - precisa do .id() para funcionar
        const linkForce = forceLink()
          .id((d: any) => d.id) // CRUCIAL: define como identificar nós
          .distance(linkDistance) // Distância desejada
          .strength(1) // Força total (1 = força máxima)

        g.d3Force('link', linkForce)
        console.log('  🔗 Link force:', linkDistance, 'px')

        // Center force - mantém tudo centralizado
        g.d3Force('center', forceCenter(0, 0).strength(0.05))
        console.log('  🎯 Center force: 0.05')

        // IMPORTANTE: Reaquece a simulação para aplicar as mudanças
        if (typeof g.d3ReheatSimulation === 'function') {
          console.log('  🔥 Reaquecendo simulação...')
          g.d3ReheatSimulation()
        }

        console.log('✅ Física aplicada com sucesso!')

      } catch (e) {
        console.error('❌ Erro ao aplicar física:', e)
      }
    }

    applyForces()
  }, [graphData, chargeStrength, linkDistance])

  const handleCategoryToggle = (categoryId: string) => {
    const newVisible = new Set(visibleCategories)
    if (newVisible.has(categoryId)) {
      newVisible.delete(categoryId)
    } else {
      newVisible.add(categoryId)
    }
    setVisibleCategories(newVisible)
  }

  // Toggle physics simulation on/off
  const togglePhysics = useCallback(() => {
    setPhysicsActive(prev => !prev)
  }, [])

  // Reset node positions and restart physics
  const resetGraphLayout = useCallback(() => {
    const g = graphRef.current
    if (!g) return

    // Clear fixed positions and reset all position/velocity data
    graphData.nodes.forEach((node: any) => {
      // Remove fixed positions
      delete node.fx
      delete node.fy

      // Reset positions to undefined to force recalculation
      delete node.x
      delete node.y

      // Reset velocities
      delete node.vx
      delete node.vy
    })

    // Force the graph to reinitialize positions
    if (typeof g.refresh === 'function') {
      g.refresh()
    }

    // Restart simulation with full energy
    if (typeof g.d3ReheatSimulation === 'function') {
      g.d3ReheatSimulation()
    }

    setPhysicsActive(true)
  }, [graphData])

  // Shake graph - add random velocity to nodes to make physics more active
  const shakeGraph = useCallback(() => {
    const g = graphRef.current
    if (!g) return

    // Add random velocity to all nodes
    graphData.nodes.forEach((node: any) => {
      if (node.vx !== undefined) {
        node.vx += (Math.random() - 0.5) * 50
        node.vy += (Math.random() - 0.5) * 50
      }
    })

    // Reheat simulation
    if (typeof g.d3ReheatSimulation === 'function') {
      g.d3ReheatSimulation()
    }

    if (!physicsActive) {
      setPhysicsActive(true)
    }
  }, [graphData, physicsActive])

  // Mark preset as custom when any parameter changes manually
  const updatePhysicsParam = useCallback((setter: (val: any) => void, value: any) => {
    setter(value)
    if (physicsPreset !== 'custom') {
      setPhysicsPreset('custom')
    }
  }, [physicsPreset])

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

    // Highlight neighbors
    if (node) {
      const neighbors = new Set<string>()
      neighbors.add(node.id)

      const links = new Set<string>()
      graphData.links.forEach((link: any) => {
        if (link.source.id === node.id) {
          neighbors.add(link.target.id)
          links.add(`${link.source.id}-${link.target.id}`)
        }
        if (link.target.id === node.id) {
          neighbors.add(link.source.id)
          links.add(`${link.source.id}-${link.target.id}`)
        }
      })

      setHighlightNodes(neighbors)
      setHighlightLinks(links)
    } else {
      setHighlightNodes(new Set())
      setHighlightLinks(new Set())
    }
  }, [graphData])

  const paintNodeCanvas = useCallback(
    (node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
      if (!node || typeof node.x !== 'number' || typeof node.y !== 'number') return

      const isSelected = selectedStory?.id === node.id
      const isHighlighted = highlightNodes.has(node.id)
      const isDimmed = (hoveredStory || selectedStory) && !isHighlighted && !isSelected

      // Node size - adjustable via control
      const size = (node.val || 5) * nodeSize

      // Draw node circle - clean and simple
      ctx.beginPath()
      ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false)

      // Fill with slight transparency when dimmed
      if (isDimmed) {
        ctx.fillStyle = node.color + '40' // 25% opacity
      } else {
        ctx.fillStyle = node.color
      }
      ctx.fill()

      // Draw border for highlighted/selected nodes
      if (isSelected || isHighlighted) {
        ctx.strokeStyle = isSelected ? '#ffffff' : node.color
        ctx.lineWidth = isSelected ? 2.5 : 1.5
        ctx.stroke()
      }

      // Draw label only when enabled and zoomed in or selected
      if (showLabels && (globalScale > 1.2 || isSelected || isHighlighted)) {
        const fontSize = Math.max(10, 12 / globalScale)
        ctx.font = `${fontSize}px Sans-Serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        // Simple label without background
        ctx.fillStyle = isDimmed ? '#ffffff60' : '#ffffff'
        ctx.fillText(node.name, node.x, node.y + size + fontSize)
      }
    },
    [selectedStory, hoveredStory, highlightNodes, nodeSize, showLabels]
  )

  const paintLinkCanvas = useCallback(
    (link: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const linkId = `${link.source.id}-${link.target.id}`
      const isHighlighted = highlightLinks.has(linkId)
      const isDimmed = (hoveredStory || selectedStory) && !isHighlighted

      // Simple line rendering
      ctx.beginPath()
      ctx.moveTo(link.source.x, link.source.y)
      ctx.lineTo(link.target.x, link.target.y)

      // Line styling - clean and minimal with adjustable opacity
      if (isDimmed) {
        ctx.strokeStyle = `#ffffff${Math.floor(linkOpacity * 25).toString(16).padStart(2, '0')}`
        ctx.lineWidth = 0.5
      } else if (isHighlighted) {
        ctx.strokeStyle = link.source.color || '#ffffff'
        ctx.lineWidth = 2
        ctx.globalAlpha = 0.8
      } else {
        ctx.strokeStyle = `#ffffff${Math.floor(linkOpacity * 255).toString(16).padStart(2, '0')}`
        ctx.lineWidth = 1
        ctx.globalAlpha = linkOpacity * 2
      }

      ctx.stroke()
      ctx.globalAlpha = 1
    },
    [selectedStory, hoveredStory, highlightLinks, linkOpacity]
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
              onClick={() => setShowControls(!showControls)}
              className={`${showControls ? 'text-lime-400 bg-lime-400/10' : 'text-white/80'} hover:text-white`}
              title="Controles do Mapa"
            >
              <Sliders className="w-4 h-4" />
            </Button>
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

        {/* Painel de Controles Lateral */}
        {showControls && (
          <div className="fixed right-0 top-0 h-full w-80 bg-zinc-900/95 backdrop-blur-sm border-l border-zinc-700 z-50 shadow-2xl overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-lime-200">Controles</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowControls(false)}
                  className="text-zinc-400 hover:text-white"
                >
                  ✕
                </Button>
              </div>

              {/* Physics Controls */}
              <div>
                <h3 className="font-semibold text-cyan-200 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Física
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm text-zinc-300">Repulsão</label>
                      <span className="text-xs text-lime-400 font-mono">{Math.abs(chargeStrength)}</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="300"
                      value={Math.abs(chargeStrength)}
                      onChange={(e) => setChargeStrength(-parseInt(e.target.value))}
                      className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                    <div className="text-xs text-zinc-500 mt-1 flex justify-between">
                      <span>Fraca (20)</span>
                      <span>Forte (300)</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm text-zinc-300">Distância Links</label>
                      <span className="text-xs text-lime-400 font-mono">{linkDistance}px</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="150"
                      value={linkDistance}
                      onChange={(e) => setLinkDistance(parseInt(e.target.value))}
                      className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                    <div className="text-xs text-zinc-500 mt-1 flex justify-between">
                      <span>Curta (10px)</span>
                      <span>Longa (150px)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-zinc-700" />

              {/* Visual Controls */}
              <div>
                <h3 className="font-semibold text-purple-200 mb-3 flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Visual
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm text-zinc-300">Tamanho dos Nós</label>
                      <span className="text-xs text-lime-400 font-mono">{nodeSize.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={nodeSize}
                      onChange={(e) => setNodeSize(parseFloat(e.target.value))}
                      className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm text-zinc-300">Opacidade Links</label>
                      <span className="text-xs text-lime-400 font-mono">{Math.round(linkOpacity * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.05"
                      value={linkOpacity}
                      onChange={(e) => setLinkOpacity(parseFloat(e.target.value))}
                      className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm text-zinc-300">Mostrar Labels</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showLabels}
                        onChange={(e) => setShowLabels(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="h-px bg-zinc-700" />

              {/* Actions */}
              <div>
                <h3 className="font-semibold text-amber-200 mb-3 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Ações
                </h3>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetGraphLayout}
                    className="w-full text-amber-300 hover:bg-amber-900/20 border-amber-600/50"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reorganizar
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const g = graphRef.current
                      if (g && typeof g.zoomToFit === 'function') {
                        g.zoomToFit(400, 50)
                      }
                    }}
                    className="w-full text-cyan-300 hover:bg-cyan-900/20 border-cyan-600/50"
                  >
                    <Maximize className="w-4 h-4 mr-2" />
                    Ajustar à Tela
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setChargeStrength(-120)
                      setLinkDistance(30)
                      setNodeSize(1)
                      setLinkOpacity(0.2)
                      setShowLabels(true)
                    }}
                    className="w-full text-zinc-400 hover:bg-zinc-700/50 border-zinc-600"
                  >
                    Resetar Padrões
                  </Button>
                </div>
              </div>

              <div className="text-xs text-zinc-400 bg-zinc-800/50 p-3 rounded space-y-1">
                <div className="text-cyan-300 font-semibold mb-1">💡 Dicas:</div>
                <div>• Repulsão alta = nós mais espaçados</div>
                <div>• Distância maior = grafo mais largo</div>
                <div>• Arraste nós para posicionamento manual</div>
                <div>• Scroll para zoom, arraste para mover</div>
              </div>
            </div>
          </div>
        )}

        <div className={`grid ${selectedStory ? 'lg:grid-cols-3' : 'grid-cols-1'} h-[calc(100vh-140px)]`}>
          <div className={`${selectedStory ? 'lg:col-span-2' : 'col-span-1'} relative bg-zinc-950`}>
            {/* Stats overlay */}
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2 z-10">
              <div className="text-xs text-white/80 space-y-0.5">
                <div className="font-semibold text-white">
                  {filteredStories.length} nodes
                </div>
                <div>{graphData.links.length} links</div>
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
              onNodeClick={handleNodeClick}
              onNodeHover={handleNodeHover}
              nodeCanvasObject={paintNodeCanvas}
              linkCanvasObject={paintLinkCanvas}
              backgroundColor="#000000"
              enableNodeDrag={true}
              enableZoomInteraction={true}
              enablePanInteraction={true}
              cooldownTime={3000}
              warmupTicks={100}
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

      {/* Enhanced Dynamics Panel (Obsidian-like) */}
      {dynamicsOpen && (
        <div className="fixed right-6 top-24 z-50 bg-zinc-900/95 backdrop-blur-md border border-zinc-700 rounded-lg shadow-2xl w-80 max-h-[calc(100vh-120px)] overflow-y-auto">
          <div className="sticky top-0 bg-zinc-900/95 backdrop-blur-md p-4 border-b border-zinc-700 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-lime-200">⚙️ Física do Grafo</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDynamicsOpen(false)}
              className="h-6 w-6 p-0 text-zinc-400 hover:text-white"
            >
              ✕
            </Button>
          </div>

          <div className="p-4 space-y-4">
            {/* Physics Presets */}
            <div>
              <label className="text-xs font-semibold text-cyan-200 mb-2 block">Presets</label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  size="sm"
                  variant={physicsPreset === 'obsidian' ? 'default' : 'ghost'}
                  onClick={() => applyPreset('obsidian')}
                  className={`text-xs ${physicsPreset === 'obsidian' ? 'bg-lime-600 hover:bg-lime-700' : ''}`}
                >
                  🌌 Obsidian
                </Button>
                <Button
                  size="sm"
                  variant={physicsPreset === 'tight' ? 'default' : 'ghost'}
                  onClick={() => applyPreset('tight')}
                  className={`text-xs ${physicsPreset === 'tight' ? 'bg-lime-600 hover:bg-lime-700' : ''}`}
                >
                  🔗 Compact
                </Button>
                <Button
                  size="sm"
                  variant={physicsPreset === 'wide' ? 'default' : 'ghost'}
                  onClick={() => applyPreset('wide')}
                  className={`text-xs ${physicsPreset === 'wide' ? 'bg-lime-600 hover:bg-lime-700' : ''}`}
                >
                  🌐 Disperso
                </Button>
                <Button
                  size="sm"
                  variant={physicsPreset === 'custom' ? 'default' : 'ghost'}
                  disabled={physicsPreset !== 'custom'}
                  className={`text-xs ${physicsPreset === 'custom' ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
                >
                  🎨 Custom
                </Button>
              </div>
            </div>

            {/* DAG Layout Options */}
            <div>
              <label className="text-xs font-semibold text-pink-200 mb-2 block">Layout DAG</label>
              <div className="grid grid-cols-3 gap-2 mb-2">
                <Button
                  size="sm"
                  variant={dagMode === 'td' ? 'default' : 'ghost'}
                  onClick={() => setDagMode(dagMode === 'td' ? null : 'td')}
                  className={`text-xs ${dagMode === 'td' ? 'bg-pink-600 hover:bg-pink-700' : ''}`}
                  title="Top-Down"
                >
                  ↓ TD
                </Button>
                <Button
                  size="sm"
                  variant={dagMode === 'lr' ? 'default' : 'ghost'}
                  onClick={() => setDagMode(dagMode === 'lr' ? null : 'lr')}
                  className={`text-xs ${dagMode === 'lr' ? 'bg-pink-600 hover:bg-pink-700' : ''}`}
                  title="Left-Right"
                >
                  → LR
                </Button>
                <Button
                  size="sm"
                  variant={dagMode === null ? 'default' : 'ghost'}
                  onClick={() => setDagMode(null)}
                  className={`text-xs ${dagMode === null ? 'bg-zinc-600 hover:bg-zinc-700' : ''}`}
                  title="Força Normal"
                >
                  ⊚ Off
                </Button>
              </div>
              <p className="text-xs text-zinc-400">Layout hierárquico direcional</p>
            </div>

            {/* Physics Actions */}
            <div>
              <label className="text-xs font-semibold text-cyan-200 mb-2 block">Ações da Física</label>
              <div className="space-y-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={shakeGraph}
                  className="w-full text-xs text-amber-300 hover:bg-amber-900/20 border-amber-600/50"
                  title="Adiciona energia aleatória aos nós"
                >
                  ⚡ Agitar Grafo
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={resetGraphLayout}
                  className="w-full text-xs text-cyan-300 hover:bg-cyan-900/20 border-cyan-600/50"
                  title="Reinicia posições e física"
                >
                  🔄 Reset Completo
                </Button>
                <div className="text-xs text-zinc-400 bg-zinc-800/50 p-2 rounded">
                  💡 Arraste nós e solte para ativar a física automaticamente
                </div>
              </div>
            </div>

            {/* Visual Effects */}
            <div>
              <label className="text-xs font-semibold text-violet-200 mb-2 block">Efeitos Visuais</label>

              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-zinc-300">Partículas Animadas</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableParticles}
                    onChange={(e) => setEnableParticles(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-violet-600"></div>
                </label>
              </div>

              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-zinc-300">Efeito Glow</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableGlow}
                    onChange={(e) => setEnableGlow(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-violet-600"></div>
                </label>
              </div>

              <p className="text-xs text-zinc-400 mt-2">Desative para melhor performance em grafos grandes</p>
            </div>

            {/* Physics State Controls */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={physicsActive ? 'default' : 'outline'}
                onClick={togglePhysics}
                className={`flex-1 text-xs ${physicsActive ? 'bg-green-600 hover:bg-green-700' : 'bg-red-900/30 hover:bg-red-900/50'}`}
              >
                {physicsActive ? '⏸️ Pausar' : '▶️ Resumir'}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={resetGraphLayout}
                className="flex-1 text-xs"
              >
                🔄 Reset
              </Button>
            </div>

            <div className="h-px bg-zinc-700" />

            {/* Force Parameters */}
            <div>
              <label className="text-xs font-semibold text-amber-200 mb-3 block">Forças</label>

              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-zinc-300">Repulsão</span>
                  <span className="text-xs text-cyan-400 font-mono">{chargeStrengthFactor.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="6"
                  step="0.1"
                  value={chargeStrengthFactor}
                  onChange={(e) => updatePhysicsParam(setChargeStrengthFactor, parseFloat(e.target.value))}
                  className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-lime-500"
                />
              </div>

              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-zinc-300">Distância Links</span>
                  <span className="text-xs text-cyan-400 font-mono">{linkDistancePadding}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="150"
                  value={linkDistancePadding}
                  onChange={(e) => updatePhysicsParam(setLinkDistancePadding, parseInt(e.target.value))}
                  className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-lime-500"
                />
              </div>

              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-zinc-300">Força Links</span>
                  <span className="text-xs text-cyan-400 font-mono">{linkStrengthMultiplier.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="2"
                  step="0.05"
                  value={linkStrengthMultiplier}
                  onChange={(e) => updatePhysicsParam(setLinkStrengthMultiplier, parseFloat(e.target.value))}
                  className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-lime-500"
                />
              </div>

              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-zinc-300">Espaçamento Nós</span>
                  <span className="text-xs text-cyan-400 font-mono">{collisionPadding}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="32"
                  value={collisionPadding}
                  onChange={(e) => updatePhysicsParam(setCollisionPadding, parseInt(e.target.value))}
                  className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-lime-500"
                />
              </div>
            </div>

            <div className="h-px bg-zinc-700" />

            {/* Gravity & Center Forces */}
            <div>
              <label className="text-xs font-semibold text-purple-200 mb-3 block">Gravidade</label>

              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs text-zinc-300">Força Central</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableCenterForce}
                    onChange={(e) => updatePhysicsParam(setEnableCenterForce, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-lime-600"></div>
                </label>
              </div>

              {enableCenterForce && (
                <div className="mb-3 ml-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-zinc-400">Intensidade</span>
                    <span className="text-xs text-cyan-400 font-mono">{centerForceStrength.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="0.5"
                    step="0.01"
                    value={centerForceStrength}
                    onChange={(e) => updatePhysicsParam(setCenterForceStrength, parseFloat(e.target.value))}
                    className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>
              )}

              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs text-zinc-300">Gravidade (X/Y)</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableGravity}
                    onChange={(e) => updatePhysicsParam(setEnableGravity, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-lime-600"></div>
                </label>
              </div>

              {enableGravity && (
                <div className="mb-3 ml-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-zinc-400">Intensidade</span>
                    <span className="text-xs text-cyan-400 font-mono">{gravityStrength.toFixed(3)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="0.2"
                    step="0.005"
                    value={gravityStrength}
                    onChange={(e) => updatePhysicsParam(setGravityStrength, parseFloat(e.target.value))}
                    className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>
              )}
            </div>

            <div className="h-px bg-zinc-700" />

            {/* Simulation Parameters */}
            <div>
              <label className="text-xs font-semibold text-orange-200 mb-3 block">Simulação</label>

              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-zinc-300">Fricção</span>
                  <span className="text-xs text-cyan-400 font-mono">{velocityDecay.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.9"
                  step="0.05"
                  value={velocityDecay}
                  onChange={(e) => updatePhysicsParam(setVelocityDecay, parseFloat(e.target.value))}
                  className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>

              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-zinc-300">Resfriamento</span>
                  <span className="text-xs text-cyan-400 font-mono">{alphaDecay.toFixed(3)}</span>
                </div>
                <input
                  type="range"
                  min="0.005"
                  max="0.1"
                  step="0.005"
                  value={alphaDecay}
                  onChange={(e) => updatePhysicsParam(setAlphaDecay, parseFloat(e.target.value))}
                  className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>
            </div>

            {/* Help Text */}
            <div className="text-xs text-zinc-400 bg-zinc-800/50 p-3 rounded space-y-1">
              <div className="text-cyan-300 font-semibold mb-1">💡 Dicas:</div>
              <div>• Repulsão alta = nós mais espaçados</div>
              <div>• Gravidade puxa nós críticos ao centro</div>
              <div>• Fricção alta = estabiliza mais rápido</div>
              <div>• Pause para arrastar nós manualmente</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

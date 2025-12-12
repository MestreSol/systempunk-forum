'use client'

import { useState, useEffect, Suspense, useMemo, useRef } from 'react'
import Link from 'next/link'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Vector2, Vector3, Plane, Raycaster } from 'three'
import {
  OrbitControls,
  Html,
  Line,
  Sphere,
  PerspectiveCamera
} from '@react-three/drei'
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

interface StoryNodeProps {
  story: Story
  isSelected: boolean
  isHighlighted: boolean
  onClick: (story: Story) => void
  onHover: (story: Story | null) => void
  onDrag?: (id: string, pos: { x: number; y: number; z: number }) => void
  onDragStart?: (id: string) => void
  onDragEnd?: (id: string) => void
  justSpawned?: boolean
}

const categoryIcons = {
  character: Users,
  event: Zap,
  location: MapPin,
  technology: Cpu,
  culture: Palette,
  mystery: HelpCircle
}

function StoryNode({
  story,
  isSelected,
  isHighlighted,
  onClick,
  onHover,
  onDrag,
  onDragStart,
  onDragEnd,
  justSpawned
}: StoryNodeProps) {
  const nodeGroupRef = useRef<any>(null)
  const materialRef = useRef<any>(null)
  const spawn = useRef<{ active: boolean; t: number }>({ active: false, t: 0 })

  const IconComponent = categoryIcons[story.category]
  const category = storyCategories.find((c) => c.id === story.category)

  const scale = isSelected ? 1.5 : isHighlighted ? 1.2 : 1
  const opacity = isHighlighted || isSelected ? 1 : 0.8

  useEffect(() => {
    if (justSpawned) {
      spawn.current.active = true
      spawn.current.t = 0
    }
  }, [justSpawned])

  useFrame((_, delta) => {
    if (!nodeGroupRef.current) return
    let spawnScale = 1
    let spawnOpacity = 1
    if (spawn.current.active) {
      spawn.current.t += delta
      const dur = 0.18
      const k = Math.min(1, spawn.current.t / dur)
      const ease = 1 - Math.pow(1 - k, 2)
      spawnScale = 0.3 + ease * 0.7
      spawnOpacity = ease
      if (k >= 1) spawn.current.active = false
    }
    const s = (isSelected ? 1.5 : isHighlighted ? 1.2 : 1) * spawnScale
    nodeGroupRef.current.scale.set(s, s, s)
    if (materialRef.current) {
      materialRef.current.opacity =
        (isHighlighted || isSelected ? 1 : 0.8) * spawnOpacity
    }
  })

  return (
    <DraggableGroup
      story={story}
      onDrag={onDrag}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <group
        ref={nodeGroupRef}
        position={[story.position.x, story.position.y, story.position.z]}
      >
        <Sphere
          args={[0.8]}
          scale={scale}
          onClick={() => onClick(story)}
          onPointerOver={() => onHover(story)}
          onPointerOut={() => onHover(null)}
        >
          <meshStandardMaterial
            ref={materialRef}
            color={category?.color || '#ffffff'}
            transparent
            opacity={opacity}
            emissive={isSelected ? category?.color || '#ffffff' : '#000000'}
            emissiveIntensity={isSelected ? 0.3 : 0}
          />
        </Sphere>

        <Html center>
          <div
            className={`transform transition-all duration-300 pointer-events-none ${
              isSelected ? 'scale-150' : isHighlighted ? 'scale-120' : ''
            }`}
          >
            <IconComponent
              className="w-6 h-6 text-white drop-shadow-lg"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
            />
          </div>
        </Html>

        {(isSelected || isHighlighted) && (
          <Html position={[0, 2.4, 0]} center>
            <div className="pointer-events-none select-none text-sm font-semibold text-white text-center drop-shadow">
              <div className="bg-black/60 px-3 py-1 rounded-md max-w-[220px] w-max text-sm">
                {story.title}
              </div>
            </div>
          </Html>
        )}
      </group>
    </DraggableGroup>
  )
}

function DraggableGroup({
  story,
  children,
  onDrag,
  onDragStart,
  onDragEnd
}: any) {
  const { camera, gl } = useThree()
  const draggingRef = useRef(false)
  const planeRef = useRef(new Plane())
  const intersectPoint = useRef(new Vector3())
  const raycaster = useRef(new Raycaster())
  const mouse = useRef(new Vector2())

  const handlePointerDown = (e: any) => {
    e.stopPropagation()
    const target = e.target || e.currentTarget
    try {
      target.setPointerCapture(e.pointerId)
    } catch {}
    draggingRef.current = true
    if (onDragStart) onDragStart(story.id)

    const normal = camera.getWorldDirection(new Vector3()).negate()
    planeRef.current.setFromNormalAndCoplanarPoint(
      normal,
      new Vector3(story.position.x, story.position.y, story.position.z)
    )
  }

  const handlePointerMove = (e: any) => {
    if (!draggingRef.current) return
    e.stopPropagation()

    const rect = gl.domElement.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1

    raycaster.current.setFromCamera(mouse.current.set(x, y), camera)
    const intersect = raycaster.current.ray.intersectPlane(
      planeRef.current,
      intersectPoint.current
    )
    if (intersect) {
      const p = intersectPoint.current
      if (onDrag) onDrag(story.id, { x: p.x, y: p.y, z: p.z })
    }
  }

  const handlePointerUp = (e: any) => {
    if (!draggingRef.current) return
    e.stopPropagation()
    const target = e.target || e.currentTarget
    try {
      target.releasePointerCapture(e.pointerId)
    } catch {}
    draggingRef.current = false
    if (onDragEnd) onDragEnd(story.id)
  }

  return (
    <group
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {children}
    </group>
  )
}

function ConnectionLines({
  selectedStory,
  stories,
  connections: baseConnections
}: {
  selectedStory: Story | null
  stories: Story[]
  connections: StoryConnection[]
}) {
  const connections = useMemo(() => {
    const storyMap = new Map(stories.map((s) => [s.id, s]))

    return baseConnections
      .map((c) => {
        const from = storyMap.get(c.from)
        const to = storyMap.get(c.to)
        if (!from || !to) return null
        return {
          from: from.position,
          to: to.position,
          strength: c.strength || 0.5,
          type: c.type || 'mentions',
          fromId: c.from,
          toId: c.to
        }
      })
      .filter(Boolean)
  }, [stories, baseConnections])

  const seenRef = useRef<Set<string>>(new Set())
  const spawnMapRef = useRef<Map<string, number>>(new Map())

  return (
    <>
      {connections.map((connection, index) => {
        if (!connection) return null
        const key = `${connection.fromId}->${connection.toId}`
        if (!seenRef.current.has(key)) {
          seenRef.current.add(key)
          spawnMapRef.current.set(key, performance.now())
        }
        const connectsSelected = Boolean(
          selectedStory &&
            (selectedStory.id === connection.fromId ||
              selectedStory.id === connection.toId)
        )

        const lineColor = connectsSelected ? '#00ffff' : '#335566'
        const lineWidth = connectsSelected
          ? connection.strength * 6 + 1
          : connection.strength * 2
        let baseOpacity = connectsSelected ? 0.9 : 0.35
        const started = spawnMapRef.current.get(key) || 0
        const elapsed = (performance.now() - started) / 1000
        if (elapsed < 0.2) {
          const k = Math.min(1, elapsed / 0.2)
          const ease = 1 - Math.pow(1 - k, 2)
          baseOpacity *= ease
        }

        return (
          <Line
            key={index}
            points={[
              [connection.from.x, connection.from.y, connection.from.z],
              [connection.to.x, connection.to.y, connection.to.z]
            ]}
            color={lineColor}
            lineWidth={lineWidth}
            transparent
            opacity={baseOpacity}
          />
        )
      })}
    </>
  )
}

function Scene({
  stories,
  selectedStory,
  hoveredStory,
  onStoryClick,
  onStoryHover,
  visibleCategories,
  onNodeDrag,
  onNodeDragStart,
  onNodeDragEnd,
  isDragging,
  connections,
  spawnedIds
}: {
  stories: Story[]
  selectedStory: Story | null
  hoveredStory: Story | null
  onStoryClick: (story: Story) => void
  onStoryHover: (story: Story | null) => void
  visibleCategories: Set<string>
  onNodeDrag?: (id: string, pos: { x: number; y: number; z: number }) => void
  onNodeDragStart?: (id: string) => void
  onNodeDragEnd?: (id: string) => void
  isDragging?: boolean
  connections: StoryConnection[]
  spawnedIds: Set<string>
}) {
  const filteredStories = stories.filter((story) =>
    visibleCategories.has(story.category)
  )

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 50]} />
      <OrbitControls
        enablePan={!isDragging}
        enableZoom={!isDragging}
        enableRotate={!isDragging}
        minDistance={10}
        maxDistance={100}
        autoRotate={false}
      />

      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.4} />

      <color attach="background" args={[0.03, 0.03, 0.05]} />
      <mesh>
        <sphereGeometry args={[200, 64, 64]} />
        <meshBasicMaterial color="#000033" transparent opacity={0.06} />
      </mesh>

      {filteredStories.map((story) => (
        <StoryNode
          key={story.id}
          story={story}
          isSelected={selectedStory?.id === story.id}
          isHighlighted={Boolean(
            hoveredStory?.id === story.id ||
              (selectedStory && selectedStory.connections.includes(story.id))
          )}
          onClick={onStoryClick}
          onHover={onStoryHover}
          onDrag={onNodeDrag}
          onDragStart={onNodeDragStart}
          onDragEnd={onNodeDragEnd}
          justSpawned={spawnedIds.has(story.id)}
        />
      ))}

      <ConnectionLines
        selectedStory={selectedStory}
        stories={filteredStories}
        connections={connections}
      />
    </>
  )
}

export default function HistoriasPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [connections, setConnections] = useState<StoryConnection[]>([])
  const pageSize = 24
  const spawnedIdsRef = useRef<Set<string>>(new Set())
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [hoveredStory, setHoveredStory] = useState<Story | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [visibleCategories, setVisibleCategories] = useState<Set<string>>(
    new Set(storyCategories.map((c) => c.id))
  )
  const [showDetails, setShowDetails] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const filteredStories = useMemo(() => {
    return stories.filter(
      (story) =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
    )
  }, [searchTerm, stories])

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

  async function fetchBatches(reset = false) {
    let cancelled = false
    if (reset) {
      setStories([])
      setConnections([])
    }
    async function loadBatch(start: number) {
      const params = new URLSearchParams({
        offset: String(start),
        limit: String(pageSize),
        t: String(Date.now())
      })
      const res = await fetch(`/api/historias?${params.toString()}`, {
        cache: 'no-store'
      })
      if (!res.ok) return null
      const data = await res.json()
      return data
    }
    try {
      let cur = 0
      let more = true
      while (!cancelled && more) {
        const data = await loadBatch(cur)
        if (!data?.ok) break
        const newStories: Story[] = data.stories || []
        const newConnections: StoryConnection[] = data.connections || []

        const incomingIds = newStories.map((s) => s.id)
        incomingIds.forEach((id) => spawnedIdsRef.current.add(id))
        setTimeout(() => {
          incomingIds.forEach((id) => spawnedIdsRef.current.delete(id))
        }, 500)

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

        cur += newStories.length
        more = data.hasMore && newStories.length > 0

        if (more) await new Promise((r) => setTimeout(r, 120))
      }
    } catch (e) {
      console.error('Failed to progressively fetch historias', e)
    }
    return () => {
      cancelled = true
    }
  }

  useEffect(() => {
    fetchBatches(true)
  }, [])

  const hoverRef = useRef<{ raf?: number; lastId?: string | null }>({})
  const setHoveredDebounced = (story: Story | null) => {
    const newId = story ? story.id : null
    if (hoverRef.current.lastId === newId) return
    hoverRef.current.lastId = newId

    if (hoverRef.current.raf) cancelAnimationFrame(hoverRef.current.raf)
    hoverRef.current.raf = requestAnimationFrame(() => {
      setHoveredStory(story)
      hoverRef.current.raf = undefined
    })
  }

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
          <div className="fixed left-0 top-0 h-full w-80 md:w-80 sm:w-72 xs:w-64 bg-zinc-900/95 backdrop-blur-sm border-r border-zinc-700 z-50 shadow-2xl">
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
                      onClick={() => setVisibleCategories(new Set(storyCategories.map((c) => c.id)))}
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
                          backgroundColor: isActive
                            ? category.color + '15'
                            : undefined,
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
                              filteredStories.filter(
                                (s) => s.category === category.id
                              ).length
                            }{' '}
                            histórias
                          </div>
                        </div>
                      </Button>
                    )
                  })}
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
                  onClick={() => fetchBatches(true)}
                  className="w-full text-zinc-400 hover:text-white border-zinc-600"
                  title="Recarregar todas as histórias"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Recarregar Dados
                </Button>
              </div>

              <div className="text-xs text-zinc-500 space-y-1">
                <div>{filteredStories.length} histórias visíveis</div>
                <div>{connections.length} conexões ativas</div>
                <div>
                  {visibleCategories.size}/{storyCategories.length} categorias
                  selecionadas
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Overlay para fechar o painel */}
        {showFilters && (
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setShowFilters(false)}
          />
        )}

        <div
          className={`grid grid-cols-1 lg:grid-cols-4 h-screen transition-all duration-300 ${
            showFilters ? 'lg:ml-80 md:ml-80 sm:ml-72' : ''
          }`}
        >
          <div
            className={`${selectedStory ? 'lg:col-span-3' : 'lg:col-span-4'} relative`}
          >
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-lime-400 mx-auto mb-4"></div>
                    <p className="text-zinc-400">Carregando mapa mental...</p>
                  </div>
                </div>
              }
            >
              <Canvas
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
                className="bg-transparent"
                onCreated={({ gl }) => {
                  try {
                    const canvas = gl.domElement
                    const handleContextLost = (e: Event) => {
                      e.preventDefault()
                      console.warn('WebGL context lost, attempting to recover')
                    }
                    canvas.addEventListener(
                      'webglcontextlost',
                      handleContextLost,
                      false
                    )
                  } catch {
                    console.warn('Failed to set up WebGL context lost handler')
                  }
                }}
              >
                <Scene
                  stories={filteredStories}
                  selectedStory={selectedStory}
                  hoveredStory={hoveredStory}
                  onStoryClick={setSelectedStory}
                  onStoryHover={setHoveredDebounced}
                  visibleCategories={visibleCategories}
                  connections={connections}
                  spawnedIds={spawnedIdsRef.current}
                />
              </Canvas>
            </Suspense>

            {!selectedStory && !showFilters && (
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 z-10">
                <div className="text-sm text-white/80 space-y-1">
                  <div>🖱️ Clique e arraste para rotacionar</div>
                  <div>🔍 Scroll para zoom</div>
                  <div>👆 Clique nas esferas para detalhes</div>
                  <div>⌨️ F para tela cheia • ESC para sair</div>
                </div>
              </div>
            )}

            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 z-10">
              <div className="text-sm text-white/80">
                <div className="font-semibold text-lime-400">
                  {filteredStories.length} Histórias
                </div>
                <div>{connections.length} Conexões</div>
                <div>
                  {visibleCategories.size}/{storyCategories.length} Categorias
                </div>
              </div>
            </div>
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
                          storyCategories.find(
                            (c) => c.id === selectedStory.category
                          )?.color + '33',
                        color: storyCategories.find(
                          (c) => c.id === selectedStory.category
                        )?.color
                      }}
                    >
                      {selectedStory.categorySource === 'fallback'
                        ? '?'
                        : storyCategories.find((c) => c.id === selectedStory.category)?.name}
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

                <div>
                  <h3 className="font-semibold text-cyan-200 mb-2">História</h3>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {selectedStory.intro || ''}
                  </p>
                </div>

                {selectedStory.tags.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-purple-200 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedStory.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedStory.connections.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-orange-200 mb-2">
                      Conexões
                    </h3>
                    <div className="space-y-2">
                      {selectedStory.connections.map((connectionId) => {
                        const connectedStory = stories.find(
                          (s) => s.id === connectionId
                        )
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
                  {selectedStory.author && (
                    <div>Autor: {selectedStory.author}</div>
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
                  <h3 className="font-semibold text-cyan-200 mb-2">
                    Navegação 3D
                  </h3>
                  <ul className="text-sm text-zinc-300 space-y-1">
                    <li>
                      • <strong>Rotacionar:</strong> Clique e arraste com o
                      mouse
                    </li>
                    <li>
                      • <strong>Zoom:</strong> Use a roda do mouse
                    </li>
                    <li>
                      • <strong>Mover:</strong> Botão direito + arrastar
                    </li>
                    <li>
                      • <strong>Focar:</strong> Clique duplo em uma esfera
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-purple-200 mb-2">
                    Categorias
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {storyCategories.map((category) => {
                      const IconComponent =
                        categoryIcons[category.id as keyof typeof categoryIcons]
                      return (
                        <div
                          key={category.id}
                          className="flex items-center gap-2"
                        >
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
                  <h3 className="font-semibold text-orange-200 mb-2">
                    Conexões
                  </h3>
                  <p className="text-sm text-zinc-300">
                    Quando você seleciona uma história, linhas cyan aparecem
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
                      • <strong>ESC:</strong> Fechar detalhes/sair da tela cheia
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

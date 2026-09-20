'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove
} from '@dnd-kit/sortable'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ArticleMetadataForm,
  type ArticleMetadataValue
} from '@/components/admin/ArticleMetadataForm'
import { SortableBlockCard } from '@/components/admin/blocks/SortableBlockCard'
import { AddBlockMenu } from '@/components/admin/blocks/AddBlockMenu'
import { BlockEditSheet } from '@/components/admin/blocks/BlockEditSheet'
import { BlockRenderer } from '@/components/news/blocks/BlockRenderer'
import {
  BLOCK_TYPE_META,
  type BlockType,
  type EditorBlock,
  type NewsBlockRecord
} from '@/lib/news/blockTypes'

interface ArticleMeta {
  id: string
  title: string
  excerpt: string
  coverImage: string
  category: string
  tags: string[]
  author: string
  status: 'draft' | 'published'
  slug: string
}

interface InitialBlock {
  id: string
  order: number
  type: BlockType
  data: unknown
}

interface BlockEditorProps {
  article: ArticleMeta
  initialBlocks: InitialBlock[]
}

function toEditorBlocks(blocks: InitialBlock[]): EditorBlock[] {
  return [...blocks]
    .sort((a, b) => a.order - b.order)
    .map((block) => ({
      clientId: block.id,
      id: block.id,
      type: block.type,
      data: block.data
    })) as EditorBlock[]
}

function toPreviewBlocks(blocks: EditorBlock[]): NewsBlockRecord[] {
  return blocks.map((block, index) => ({
    id: block.clientId,
    order: index,
    type: block.type,
    data: block.data
  })) as NewsBlockRecord[]
}

export function BlockEditor({ article, initialBlocks }: BlockEditorProps) {
  const router = useRouter()
  const [meta, setMeta] = useState<ArticleMetadataValue>({
    title: article.title,
    excerpt: article.excerpt,
    coverImage: article.coverImage,
    category: article.category,
    tagsText: article.tags.join(', '),
    author: article.author
  })
  const [blocks, setBlocks] = useState<EditorBlock[]>(() =>
    toEditorBlocks(initialBlocks)
  )
  const [editingClientId, setEditingClientId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setBlocks((current) => {
      const oldIndex = current.findIndex((b) => b.clientId === active.id)
      const newIndex = current.findIndex((b) => b.clientId === over.id)
      if (oldIndex === -1 || newIndex === -1) return current
      return arrayMove(current, oldIndex, newIndex)
    })
  }

  function handleAddBlock(type: BlockType) {
    const newBlock = {
      clientId: crypto.randomUUID(),
      type,
      data: BLOCK_TYPE_META[type].defaultData()
    } as EditorBlock
    setBlocks((current) => [...current, newBlock])
    setEditingClientId(newBlock.clientId)
  }

  function handleDuplicateBlock(clientId: string) {
    setBlocks((current) => {
      const index = current.findIndex((b) => b.clientId === clientId)
      if (index === -1) return current
      const clone = {
        ...current[index],
        clientId: crypto.randomUUID(),
        id: undefined
      } as EditorBlock
      const next = [...current]
      next.splice(index + 1, 0, clone)
      return next
    })
  }

  function handleDeleteBlock(clientId: string) {
    setBlocks((current) => current.filter((b) => b.clientId !== clientId))
    if (editingClientId === clientId) setEditingClientId(null)
  }

  function handleUpdateBlockData(clientId: string, data: unknown) {
    setBlocks((current) =>
      current.map((b) =>
        b.clientId === clientId ? ({ ...b, data } as EditorBlock) : b
      )
    )
  }

  async function persist(status?: 'draft' | 'published') {
    setIsSaving(true)
    try {
      const metaResponse = await fetch(`/api/admin/news/${article.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: meta.title,
          excerpt: meta.excerpt,
          coverImage: meta.coverImage,
          category: meta.category,
          author: meta.author,
          tags: meta.tagsText
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean),
          ...(status ? { status } : {})
        })
      })

      const blocksResponse = await fetch(
        `/api/admin/news/${article.id}/blocks`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            blocks: blocks.map((block) => ({
              id: block.id,
              type: block.type,
              data: block.data
            }))
          })
        }
      )

      if (!metaResponse.ok || !blocksResponse.ok) {
        toast.error('Não foi possível salvar as alterações')
        return
      }

      const { blocks: savedBlocks } = (await blocksResponse.json()) as {
        blocks: InitialBlock[]
      }
      setBlocks(toEditorBlocks(savedBlocks))

      toast.success(
        status === 'published' ? 'Notícia publicada!' : 'Alterações salvas'
      )
      router.refresh()
    } finally {
      setIsSaving(false)
    }
  }

  const editingBlock = blocks.find((b) => b.clientId === editingClientId) ?? null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
      <div className="space-y-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-lg text-lime-400">Informações</CardTitle>
          </CardHeader>
          <CardContent>
            <ArticleMetadataForm
              value={meta}
              onChange={setMeta}
              disabled={isSaving}
            />
          </CardContent>
        </Card>

        <div className="flex flex-col gap-2">
          <Button
            onClick={() => persist()}
            disabled={isSaving}
            variant="outline"
            className="border-zinc-700 text-zinc-300"
          >
            {isSaving ? 'Salvando...' : 'Salvar rascunho'}
          </Button>
          <Button
            onClick={() => persist('published')}
            disabled={isSaving}
            className="bg-lime-600 hover:bg-lime-700"
          >
            {article.status === 'published'
              ? 'Salvar e republicar'
              : 'Publicar'}
          </Button>
        </div>
      </div>

      <div>
        <Tabs defaultValue="edit">
          <TabsList className="bg-zinc-900 border border-zinc-800">
            <TabsTrigger value="edit">Editar</TabsTrigger>
            <TabsTrigger value="preview">Pré-visualizar</TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="mt-4">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={blocks.map((b) => b.clientId)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {blocks.map((block) => (
                    <SortableBlockCard
                      key={block.clientId}
                      block={block}
                      onEdit={() => setEditingClientId(block.clientId)}
                      onDuplicate={() => handleDuplicateBlock(block.clientId)}
                      onDelete={() => handleDeleteBlock(block.clientId)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {blocks.length === 0 && (
              <div className="text-center py-12 text-zinc-500 border border-dashed border-zinc-800 rounded-xl mb-4">
                Nenhum bloco ainda. Adicione o primeiro abaixo.
              </div>
            )}

            <div className="mt-4">
              <AddBlockMenu onSelect={handleAddBlock} />
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-4">
            <div className="max-w-3xl bg-zinc-950 border border-zinc-800 rounded-xl p-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                {meta.title || 'Sem título'}
              </h1>
              <p className="text-zinc-400 mb-8">{meta.excerpt}</p>
              <BlockRenderer blocks={toPreviewBlocks(blocks)} />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <BlockEditSheet
        block={editingBlock}
        open={!!editingBlock}
        onOpenChange={(open) => !open && setEditingClientId(null)}
        onChange={(data) =>
          editingBlock && handleUpdateBlockData(editingBlock.clientId, data)
        }
      />
    </div>
  )
}

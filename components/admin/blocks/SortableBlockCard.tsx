'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Pencil, Copy, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { BLOCK_TYPE_META, type EditorBlock } from '@/lib/news/blockTypes'
import { summarizeBlock } from './summarizeBlock'

interface SortableBlockCardProps {
  block: EditorBlock
  onEdit: () => void
  onDuplicate: () => void
  onDelete: () => void
}

export function SortableBlockCard({
  block,
  onEdit,
  onDuplicate,
  onDelete
}: SortableBlockCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: block.clientId })

  const meta = BLOCK_TYPE_META[block.type]
  const Icon = meta.icon

  return (
    <Card
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`bg-zinc-900 border-zinc-800 py-0 ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex items-center gap-3 p-3">
        <button
          {...attributes}
          {...listeners}
          type="button"
          className="cursor-grab active:cursor-grabbing text-zinc-500 hover:text-zinc-300 touch-none"
          aria-label="Arrastar para reordenar"
        >
          <GripVertical className="w-4 h-4" />
        </button>

        <Icon className="w-4 h-4 text-lime-400 shrink-0" />

        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-white">{meta.label}</div>
          <div className="text-xs text-zinc-500 truncate">
            {summarizeBlock(block)}
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={onEdit}
            className="text-zinc-400 hover:text-white h-8 w-8"
          >
            <Pencil className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDuplicate}
            className="text-zinc-400 hover:text-white h-8 w-8"
          >
            <Copy className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="text-red-400 hover:text-red-300 h-8 w-8"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { BLOCK_TYPES, BLOCK_TYPE_META, type BlockType } from '@/lib/news/blockTypes'

export function AddBlockMenu({
  onSelect
}: {
  onSelect: (type: BlockType) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full border-dashed border-zinc-700 text-zinc-300 hover:bg-zinc-800"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar bloco
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-zinc-900 border-zinc-800 w-56">
        {BLOCK_TYPES.map((type) => {
          const meta = BLOCK_TYPE_META[type]
          const Icon = meta.icon
          return (
            <DropdownMenuItem
              key={type}
              onClick={() => onSelect(type)}
              className="text-zinc-300 focus:bg-zinc-800 focus:text-white gap-2"
            >
              <Icon className="w-4 h-4 text-lime-400" />
              {meta.label}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

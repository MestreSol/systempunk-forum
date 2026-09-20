'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import type { HeadingBlockData } from '@/lib/news/blockTypes'

interface Props {
  data: HeadingBlockData
  onChange: (data: HeadingBlockData) => void
}

export function HeadingBlockForm({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label>Texto</Label>
        <Input
          value={data.text}
          onChange={(event) => onChange({ ...data, text: event.target.value })}
          className="bg-zinc-900 border-zinc-800"
        />
      </div>
      <div className="space-y-1.5">
        <Label>Tamanho</Label>
        <Select
          value={String(data.level)}
          onValueChange={(next) =>
            onChange({ ...data, level: Number(next) as 2 | 3 })
          }
        >
          <SelectTrigger className="w-full bg-zinc-900 border-zinc-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800">
            <SelectItem value="2">Título (H2)</SelectItem>
            <SelectItem value="3">Subtítulo (H3)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

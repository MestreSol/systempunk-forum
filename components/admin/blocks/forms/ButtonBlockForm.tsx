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
import type { ButtonBlockData } from '@/lib/news/blockTypes'

interface Props {
  data: ButtonBlockData
  onChange: (data: ButtonBlockData) => void
}

export function ButtonBlockForm({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label>Rótulo</Label>
        <Input
          value={data.label}
          onChange={(event) => onChange({ ...data, label: event.target.value })}
          className="bg-zinc-900 border-zinc-800"
        />
      </div>
      <div className="space-y-1.5">
        <Label>Link</Label>
        <Input
          value={data.href}
          onChange={(event) => onChange({ ...data, href: event.target.value })}
          placeholder="https:// ou /caminho"
          className="bg-zinc-900 border-zinc-800"
        />
      </div>
      <div className="space-y-1.5">
        <Label>Estilo</Label>
        <Select
          value={data.variant ?? 'default'}
          onValueChange={(next) =>
            onChange({ ...data, variant: next as ButtonBlockData['variant'] })
          }
        >
          <SelectTrigger className="w-full bg-zinc-900 border-zinc-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800">
            <SelectItem value="default">Preenchido</SelectItem>
            <SelectItem value="outline">Contornado</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

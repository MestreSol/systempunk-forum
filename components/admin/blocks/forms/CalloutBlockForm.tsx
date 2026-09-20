'use client'

import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import type { CalloutBlockData } from '@/lib/news/blockTypes'

interface Props {
  data: CalloutBlockData
  onChange: (data: CalloutBlockData) => void
}

const STYLE_LABELS: Record<CalloutBlockData['style'], string> = {
  info: 'Informação',
  warning: 'Aviso',
  success: 'Sucesso'
}

export function CalloutBlockForm({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label>Estilo</Label>
        <Select
          value={data.style}
          onValueChange={(next) =>
            onChange({ ...data, style: next as CalloutBlockData['style'] })
          }
        >
          <SelectTrigger className="w-full bg-zinc-900 border-zinc-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800">
            {Object.entries(STYLE_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label>Texto</Label>
        <Textarea
          value={data.text}
          onChange={(event) => onChange({ ...data, text: event.target.value })}
          rows={3}
          className="bg-zinc-900 border-zinc-800"
        />
      </div>
    </div>
  )
}

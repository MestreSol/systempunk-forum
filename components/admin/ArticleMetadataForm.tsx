'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { categoryOptions } from '@/mocks/NewsArticles'

export interface ArticleMetadataValue {
  title: string
  excerpt: string
  coverImage: string
  category: string
  tagsText: string
  author: string
}

interface ArticleMetadataFormProps {
  value: ArticleMetadataValue
  onChange: (value: ArticleMetadataValue) => void
  disabled?: boolean
}

export function ArticleMetadataForm({
  value,
  onChange,
  disabled
}: ArticleMetadataFormProps) {
  function set<K extends keyof ArticleMetadataValue>(
    key: K,
    fieldValue: ArticleMetadataValue[K]
  ) {
    onChange({ ...value, [key]: fieldValue })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="article-title">Título</Label>
        <Input
          id="article-title"
          value={value.title}
          onChange={(event) => set('title', event.target.value)}
          disabled={disabled}
          className="bg-zinc-950 border-zinc-800"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="article-excerpt">Resumo</Label>
        <Textarea
          id="article-excerpt"
          value={value.excerpt}
          onChange={(event) => set('excerpt', event.target.value)}
          disabled={disabled}
          rows={3}
          className="bg-zinc-950 border-zinc-800"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="article-cover">Imagem de capa (URL)</Label>
        <Input
          id="article-cover"
          value={value.coverImage}
          onChange={(event) => set('coverImage', event.target.value)}
          placeholder="https://..."
          disabled={disabled}
          className="bg-zinc-950 border-zinc-800"
        />
      </div>

      <div className="space-y-1.5">
        <Label>Categoria</Label>
        <Select
          value={value.category}
          onValueChange={(next) => set('category', next)}
          disabled={disabled}
        >
          <SelectTrigger className="w-full bg-zinc-950 border-zinc-800">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800">
            {categoryOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="article-tags">Tags (separadas por vírgula)</Label>
        <Input
          id="article-tags"
          value={value.tagsText}
          onChange={(event) => set('tagsText', event.target.value)}
          placeholder="Beta, Update, Gameplay"
          disabled={disabled}
          className="bg-zinc-950 border-zinc-800"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="article-author">Autor</Label>
        <Input
          id="article-author"
          value={value.author}
          onChange={(event) => set('author', event.target.value)}
          disabled={disabled}
          className="bg-zinc-950 border-zinc-800"
        />
      </div>
    </div>
  )
}

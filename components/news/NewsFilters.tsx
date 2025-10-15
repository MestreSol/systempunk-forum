'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Search, Filter } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

type Props = {
  searchTerm: string
  onSearch: (value: string) => void
  selectedCategory: string
  onCategoryChange: (value: string) => void
  selectedStatus: string
  onStatusChange: (value: string) => void
  categoryOptions: { value: string; label: string }[]
  activeBadges: { label: string; variant?: string }[]
}

export default function NewsFilters({
  searchTerm,
  onSearch,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  categoryOptions,
  activeBadges
}: Props) {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
          <Input
            placeholder="Buscar por título, conteúdo ou tags..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10 bg-zinc-800 border-zinc-700 text-white"
          />
        </div>

        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full lg:w-48 bg-zinc-800 border-zinc-700 text-white">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-800 border-zinc-700">
            <SelectItem value="all">Todas as categorias</SelectItem>
            {categoryOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full lg:w-48 bg-zinc-800 border-zinc-700 text-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-800 border-zinc-700">
            <SelectItem value="published">Publicado</SelectItem>
            <SelectItem value="draft">Rascunho</SelectItem>
            <SelectItem value="archived">Arquivado</SelectItem>
            <SelectItem value="all">Todos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-zinc-400 text-sm">
          {/* results count managed by parent */}
        </div>

        <div className="flex gap-2">
          {activeBadges.map((b) => (
            <Badge
              key={b.label}
              variant="outline"
              className="border-lime-500 text-lime-400"
            >
              {b.label}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

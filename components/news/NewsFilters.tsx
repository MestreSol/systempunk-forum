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
    <div className="mb-12">
      {/* Filter Controls */}
      <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/50 p-6 mb-6">
        <div className="flex flex-col space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
            <Input
              placeholder="Buscar por título, conteúdo ou tags..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-12 h-12 bg-zinc-800/50 border-zinc-700/50 text-white placeholder:text-zinc-400 focus:border-lime-500/50 focus:ring-lime-500/20 rounded-lg"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="sm:w-56 h-11 bg-zinc-800/50 border-zinc-700/50 text-white hover:bg-zinc-800/70 transition-colors rounded-lg">
                <div className="flex items-center">
                  <Filter className="w-4 h-4 mr-2 text-zinc-400" />
                  <SelectValue placeholder="Categoria" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700 rounded-lg">
                <SelectItem value="all" className="text-zinc-300">
                  Todas as categorias
                </SelectItem>
                {categoryOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="text-zinc-300"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={onStatusChange}>
              <SelectTrigger className="sm:w-48 h-11 bg-zinc-800/50 border-zinc-700/50 text-white hover:bg-zinc-800/70 transition-colors rounded-lg">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700 rounded-lg">
                <SelectItem value="published" className="text-zinc-300">
                  Publicado
                </SelectItem>
                <SelectItem value="draft" className="text-zinc-300">
                  Rascunho
                </SelectItem>
                <SelectItem value="archived" className="text-zinc-300">
                  Arquivado
                </SelectItem>
                <SelectItem value="all" className="text-zinc-300">
                  Todos
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Active Filters & Results */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-zinc-400 text-sm font-medium">
          {/* results count managed by parent */}
        </div>

        {activeBadges.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activeBadges.map((b) => (
              <Badge
                key={b.label}
                variant="outline"
                className="border-lime-500/50 text-lime-400 bg-lime-500/10 hover:bg-lime-500/20 transition-colors px-3 py-1"
              >
                {b.label}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

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
import { Search, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

type Props = {
  searchTerm: string
  onSearch: (value: string) => void
  selectedCategory: string
  onCategoryChange: (value: string) => void
  selectedStatus: string
  onStatusChange: (value: string) => void
  sortBy: string
  onSortChange: (value: string) => void
  categoryOptions: { value: string; label: string }[]
  activeBadges: { label: string; variant?: string }[]
  resultsCount: number
  totalCount: number
  onClearFilters: () => void
}

export default function NewsFilters({
  searchTerm,
  onSearch,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange,
  categoryOptions,
  activeBadges,
  resultsCount,
  totalCount,
  onClearFilters
}: Props) {
  const hasActiveFilters =
    searchTerm !== '' ||
    selectedCategory !== 'all' ||
    selectedStatus !== 'published' ||
    sortBy !== 'newest'

  return (
    <div className="mb-10">
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-lime-500 transition-colors pointer-events-none" />
          <Input
            placeholder="Buscar por título, conteúdo ou tags..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-12 pr-12 h-12 bg-zinc-900/60 border-zinc-800 text-white placeholder:text-zinc-500 focus:bg-zinc-900 focus:border-lime-500/50 focus:ring-2 focus:ring-lime-500/10 rounded-xl transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => onSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-all"
              aria-label="Limpar busca"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-5">
        <div className="flex-1 grid grid-cols-2 sm:flex gap-2 sm:gap-3">
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="h-10 bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900 hover:border-zinc-700 transition-all rounded-xl text-sm">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800 rounded-xl shadow-xl">
              <SelectItem value="all" className="text-zinc-400 focus:bg-zinc-800 focus:text-white rounded-lg">
                Todas
              </SelectItem>
              {categoryOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-zinc-300 focus:bg-zinc-800 focus:text-white rounded-lg"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={onStatusChange}>
            <SelectTrigger className="h-10 bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900 hover:border-zinc-700 transition-all rounded-xl text-sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800 rounded-xl shadow-xl">
              <SelectItem value="published" className="text-zinc-300 focus:bg-zinc-800 focus:text-white rounded-lg">
                Publicados
              </SelectItem>
              <SelectItem value="draft" className="text-zinc-300 focus:bg-zinc-800 focus:text-white rounded-lg">
                Rascunhos
              </SelectItem>
              <SelectItem value="archived" className="text-zinc-300 focus:bg-zinc-800 focus:text-white rounded-lg">
                Arquivados
              </SelectItem>
              <SelectItem value="all" className="text-zinc-300 focus:bg-zinc-800 focus:text-white rounded-lg">
                Todos
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="h-10 col-span-2 sm:col-span-1 bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900 hover:border-zinc-700 transition-all rounded-xl text-sm">
              <SelectValue placeholder="Ordenar" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800 rounded-xl shadow-xl">
              <SelectItem value="newest" className="text-zinc-300 focus:bg-zinc-800 focus:text-white rounded-lg">
                Mais recentes
              </SelectItem>
              <SelectItem value="oldest" className="text-zinc-300 focus:bg-zinc-800 focus:text-white rounded-lg">
                Mais antigas
              </SelectItem>
              <SelectItem value="views" className="text-zinc-300 focus:bg-zinc-800 focus:text-white rounded-lg">
                Mais visualizadas
              </SelectItem>
              <SelectItem value="title" className="text-zinc-300 focus:bg-zinc-800 focus:text-white rounded-lg">
                A-Z
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="h-10 px-4 bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 hover:border-zinc-700 transition-all rounded-xl flex items-center justify-center gap-2 text-sm font-medium whitespace-nowrap"
          >
            <X className="w-4 h-4" />
            Limpar
          </button>
        )}
      </div>

      {/* Results Counter & Active Badges */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="text-zinc-500 text-sm">
          {resultsCount === totalCount ? (
            <span>
              <span className="text-lime-400 font-semibold">{totalCount}</span>{' '}
              {totalCount === 1 ? 'notícia' : 'notícias'}
            </span>
          ) : (
            <span>
              <span className="text-lime-400 font-semibold">{resultsCount}</span> de{' '}
              <span className="text-zinc-300">{totalCount}</span>{' '}
              {totalCount === 1 ? 'notícia' : 'notícias'}
            </span>
          )}
        </div>

        {activeBadges.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activeBadges.map((b, idx) => (
              <Badge
                key={`${b.label}-${idx}`}
                variant="outline"
                className="border-lime-500/30 text-lime-400 bg-lime-500/5 hover:bg-lime-500/10 transition-colors px-2.5 py-0.5 text-xs rounded-lg"
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

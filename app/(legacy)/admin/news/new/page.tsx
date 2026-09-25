'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ArticleMetadataForm,
  type ArticleMetadataValue
} from '@/components/admin/ArticleMetadataForm'

const initialValue: ArticleMetadataValue = {
  title: '',
  excerpt: '',
  coverImage: '',
  category: 'devlog',
  tagsText: '',
  author: ''
}

export default function NewArticlePage() {
  const router = useRouter()
  const [value, setValue] = useState<ArticleMetadataValue>(initialValue)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit() {
    if (!value.title.trim()) {
      toast.error('Título é obrigatório')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/admin/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: value.title,
          excerpt: value.excerpt,
          coverImage: value.coverImage,
          category: value.category,
          author: value.author,
          tags: value.tagsText
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean)
        })
      })

      if (!response.ok) {
        toast.error('Não foi possível criar a notícia')
        return
      }

      const { article } = await response.json()
      router.push(`/admin/news/${article.id}/edit`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Nova notícia</h1>
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-lg text-lime-400">
            Informações básicas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <ArticleMetadataForm
            value={value}
            onChange={setValue}
            disabled={isSubmitting}
          />
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-lime-600 hover:bg-lime-700"
          >
            {isSubmitting ? 'Criando...' : 'Criar e continuar para o editor'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Pencil, Trash2, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

interface AdminArticleRow {
  id: string
  title: string
  slug: string
  status: 'draft' | 'published'
  category: string
  tags: string[]
  updatedAt: string
}

export function AdminNewsTable({ articles }: { articles: AdminArticleRow[] }) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function handleDelete(id: string) {
    setDeletingId(id)
    try {
      const response = await fetch(`/api/admin/news/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        toast.error('Não foi possível excluir a notícia')
        return
      }
      toast.success('Notícia excluída')
      router.refresh()
    } finally {
      setDeletingId(null)
    }
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-16 text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
        Nenhuma notícia criada ainda.
      </div>
    )
  }

  return (
    <div className="border border-zinc-800 rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-zinc-800 hover:bg-transparent">
            <TableHead className="text-zinc-400">Título</TableHead>
            <TableHead className="text-zinc-400">Status</TableHead>
            <TableHead className="text-zinc-400">Categoria</TableHead>
            <TableHead className="text-zinc-400">Atualizado</TableHead>
            <TableHead className="text-zinc-400 text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article) => (
            <TableRow key={article.id} className="border-zinc-800">
              <TableCell className="font-medium text-white">
                {article.title}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    article.status === 'published'
                      ? 'bg-green-500/20 text-green-400 border-green-500/30'
                      : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                  }
                >
                  {article.status === 'published' ? 'Publicado' : 'Rascunho'}
                </Badge>
              </TableCell>
              <TableCell className="text-zinc-400">
                {article.category}
              </TableCell>
              <TableCell className="text-zinc-400">
                {new Date(article.updatedAt).toLocaleDateString('pt-BR')}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  {article.status === 'published' && (
                    <Link href={`/news/${article.slug}`} target="_blank">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-zinc-400 hover:text-white h-8 w-8"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </Link>
                  )}
                  <Link href={`/admin/news/${article.id}/edit`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-zinc-400 hover:text-white h-8 w-8"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-400 hover:text-red-300 h-8 w-8"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir notícia?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Essa ação não pode ser desfeita. &quot;{article.title}
                          &quot; será removida permanentemente.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800">
                          Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(article.id)}
                          disabled={deletingId === article.id}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

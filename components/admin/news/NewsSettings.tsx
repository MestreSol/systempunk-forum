"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NewsArticle {
  status: 'draft' | 'published' | 'archived';
  category: string;
  publishDate: string;
  author: string;
  featuredImage: string;
  slug: string;
}

interface NewsSettingsProps {
  article: NewsArticle;
  categoryOptions: Array<{ value: string; label: string }>;
  onUpdate: (updates: Partial<NewsArticle>) => void;
}

export function NewsSettings({ article, categoryOptions, onUpdate }: NewsSettingsProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-lime-200">Configurações</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="status" className="text-zinc-200">Status</Label>
          <Select 
            value={article.status} 
            onValueChange={(value: 'draft' | 'published' | 'archived') => 
              onUpdate({ status: value })
            }
          >
            <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700">
              <SelectItem value="draft">Rascunho</SelectItem>
              <SelectItem value="published">Publicado</SelectItem>
              <SelectItem value="archived">Arquivado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="category" className="text-zinc-200">Categoria</Label>
          <Select 
            value={article.category} 
            onValueChange={(value) => onUpdate({ category: value })}
          >
            <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700">
              {categoryOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="publishDate" className="text-zinc-200">Data de Publicação</Label>
          <Input
            id="publishDate"
            type="date"
            value={article.publishDate}
            onChange={(e) => onUpdate({ publishDate: e.target.value })}
            className="bg-zinc-800 border-zinc-700 text-white"
          />
        </div>

        <div>
          <Label htmlFor="author" className="text-zinc-200">Autor</Label>
          <Input
            id="author"
            value={article.author}
            onChange={(e) => onUpdate({ author: e.target.value })}
            placeholder="Nome do autor"
            className="bg-zinc-800 border-zinc-700 text-white"
          />
        </div>

        <div>
          <Label htmlFor="image" className="text-zinc-200">Imagem de Capa</Label>
          <Input
            id="image"
            value={article.featuredImage}
            onChange={(e) => onUpdate({ featuredImage: e.target.value })}
            placeholder="/images/news.jpg"
            className="bg-zinc-800 border-zinc-700 text-white"
          />
        </div>

        <div>
          <Label htmlFor="slug" className="text-zinc-200">URL (Slug)</Label>
          <Input
            id="slug"
            value={article.slug}
            onChange={(e) => onUpdate({ slug: e.target.value })}
            placeholder="url-do-artigo"
            className="bg-zinc-800 border-zinc-700 text-white"
          />
          <p className="text-xs text-zinc-500 mt-1">
            URL: /news/{article.slug}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

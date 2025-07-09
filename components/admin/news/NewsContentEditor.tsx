"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMemo } from "react";

interface NewsArticle {
  title: string;
  excerpt: string;
  content: string;
}

interface NewsContentEditorProps {
  article: NewsArticle;
  onUpdate: (updates: Partial<NewsArticle>) => void;
}

export function NewsContentEditor({ article, onUpdate }: NewsContentEditorProps) {
  const estimateReadingTime = useMemo(() => {
    const wordsPerMinute = 200;
    const words = article.content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min`;
  }, [article.content]);

  const handleContentChange = (content: string) => {
    const excerpt = content.substring(0, 150) + (content.length > 150 ? '...' : '');
    onUpdate({ content, excerpt });
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-lime-200">Conteúdo Principal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title" className="text-zinc-200">Título</Label>
          <Input
            id="title"
            value={article.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="Título da notícia..."
            className="bg-zinc-800 border-zinc-700 text-white"
          />
        </div>

        <div>
          <Label htmlFor="excerpt" className="text-zinc-200">Resumo</Label>
          <Textarea
            id="excerpt"
            value={article.excerpt}
            onChange={(e) => onUpdate({ excerpt: e.target.value })}
            placeholder="Breve descrição da notícia..."
            className="bg-zinc-800 border-zinc-700 text-white h-20"
          />
        </div>

        <div>
          <Label htmlFor="content" className="text-zinc-200">Conteúdo</Label>
          <Textarea
            id="content"
            value={article.content}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="Escreva o conteúdo da notícia aqui... Suporte para Markdown disponível."
            className="bg-zinc-800 border-zinc-700 text-white min-h-96 font-mono"
          />
          <p className="text-xs text-zinc-500 mt-1">
            Tempo de leitura estimado: {estimateReadingTime}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

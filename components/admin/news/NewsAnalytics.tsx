"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo } from "react";

interface NewsArticle {
  views: number;
  tags: string[];
  content: string;
  category: string;
}

interface NewsAnalyticsProps {
  article: NewsArticle;
  getCategoryLabel: (value: string) => string;
}

export function NewsAnalytics({ article, getCategoryLabel }: NewsAnalyticsProps) {
  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  const estimateReadingTime = useMemo(() => {
    const wordsPerMinute = 200;
    const words = article.content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min`;
  }, [article.content]);

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-lime-200">Estatísticas do Artigo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-lime-400">{formatViews(article.views)}</div>
            <div className="text-sm text-zinc-400">Visualizações</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-lime-400">{article.tags.length}</div>
            <div className="text-sm text-zinc-400">Tags</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-lime-400">{estimateReadingTime}</div>
            <div className="text-sm text-zinc-400">Leitura</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-lime-400">{getCategoryLabel(article.category)}</div>
            <div className="text-sm text-zinc-400">Categoria</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

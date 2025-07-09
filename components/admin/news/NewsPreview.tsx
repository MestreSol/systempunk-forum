"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface NewsArticle {
  title: string;
  excerpt: string;
  featuredImage: string;
  tags: string[];
}

interface NewsPreviewProps {
  article: NewsArticle;
}

export function NewsPreview({ article }: NewsPreviewProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-lime-200">Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-zinc-800 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
          {article.featuredImage ? (
            <Image 
              src={article.featuredImage} 
              alt="Preview" 
              className="w-full h-full object-cover rounded-lg"
              width={400}
              height={225}
            />
          ) : (
            <span className="text-zinc-500">Sem imagem</span>
          )}
        </div>
        
        <h3 className="font-bold text-lime-200 mb-2 line-clamp-2">
          {article.title || 'Título da notícia'}
        </h3>
        
        <p className="text-sm text-zinc-400 mb-2 line-clamp-2">
          {article.excerpt || 'Resumo da notícia'}
        </p>
        
        <div className="flex gap-1 flex-wrap">
          {article.tags.slice(0, 3).map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {article.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{article.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

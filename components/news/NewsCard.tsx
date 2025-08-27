"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardMedia } from "@/components/ui/card";
import { Calendar, Eye, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getCategoryLabel, type NewsArticle } from "@/lib/data/newsData";

interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
}

export function NewsCard({ article, featured = false }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  const estimateReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'draft':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return 'Publicado';
      case 'draft': return 'Rascunho';
      default: return 'Arquivado';
    }
  };

  return (
    <Card className={`bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all duration-300 group ${featured ? 'ring-2 ring-lime-500/20' : ''}`}>
      <CardMedia
        src="/images/projeto.jpg"
        alt="preview do projeto"
        aspect="aspect-video" // mude para aspect-[4/3], etc.
        priority
        sizes="(max-width: 768px) 100vw, 600px"
      />
      <CardHeader className="p-0">
        <div className="aspect-video bg-zinc-800 rounded-t-lg overflow-hidden relative">
          {article.featuredImage ? (
            <CardMedia
        src={article.featuredImage}
        alt="preview do projeto"
        aspect="aspect-video"
        priority
        sizes="(max-width: 768px) 100vw, 600px"
      />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-500">
              <Calendar className="w-12 h-12" />
            </div>
          )}
          
          {/* Featured badge */}
          {featured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-lime-600 text-white font-semibold">
                ⭐ Destaque
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Article metadata */}
        <div className="flex items-center gap-2 mb-3">
          <Badge 
            variant="outline" 
            className={getStatusBadge(article.status)}
          >
            {getStatusText(article.status)}
          </Badge>
          <Badge variant="secondary" className="text-xs bg-lime-600/20 text-lime-300 border-lime-500/30">
            {getCategoryLabel(article.category)}
          </Badge>
        </div>

        {/* Title and excerpt */}
        <h3 className="text-xl font-bold text-lime-200 mb-2 line-clamp-2 group-hover:text-lime-100 transition-colors">
          {article.title}
        </h3>
        <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {article.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs border-zinc-600 text-zinc-300">
              {tag}
            </Badge>
          ))}
          {article.tags.length > 3 && (
            <Badge variant="outline" className="text-xs border-zinc-600 text-zinc-300">
              +{article.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-zinc-500 mb-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(article.publishDate)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {formatViews(article.views)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {estimateReadingTime(article.content)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500">
            Por {article.author}
          </span>
          <Link href={`/news/${article.slug}`}>
            <Button size="sm" className="bg-lime-600 hover:bg-lime-700 group-hover:bg-lime-500 transition-colors">
              Ler mais
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

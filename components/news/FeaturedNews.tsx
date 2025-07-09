"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getCategoryLabel, type NewsArticle } from "@/lib/data/newsData";

interface FeaturedNewsProps {
  article: NewsArticle;
}

export function FeaturedNews({ article }: FeaturedNewsProps) {
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

  return (
    <div className="relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 z-10">
      <div className="aspect-video lg:aspect-[21/9] relative">
        {article.featuredImage ? (
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover relative z-0"
            priority
          />
        ) : (
          <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
            <Calendar className="w-24 h-24 text-zinc-600" />
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent z-10" />
        
        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 z-20">
          <div className="max-w-4xl">
            {/* Featured badge */}
            <div className="mb-4">
              <Badge className="bg-lime-600 text-white font-semibold">
                ⭐ Artigo em Destaque
              </Badge>
            </div>

            {/* Tags and category */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-lime-600/20 text-lime-300 border-lime-500/30">
                {getCategoryLabel(article.category)}
              </Badge>
              {article.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="border-zinc-600 text-zinc-300">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title and excerpt */}
            <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              {article.title}
            </h2>
            
            <p className="text-base lg:text-lg text-zinc-300 mb-6 max-w-2xl line-clamp-3">
              {article.excerpt}
            </p>

            {/* Metadata and CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(article.publishDate)}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {formatViews(article.views)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {estimateReadingTime(article.content)}
                </span>
                <span>Por {article.author}</span>
              </div>
              
              <Link href={`/news/${article.slug}`}>
                <Button size="lg" className="bg-lime-600 hover:bg-lime-700 text-white font-semibold">
                  Ler artigo completo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

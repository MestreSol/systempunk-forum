"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardMedia } from "@/components/ui/card";
import { Calendar, Clock, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { type NewsArticle, getCategoryLabel } from "@/lib/data/newsData";
import { formatDate, formatViews, estimateReadingTime } from "@/lib/utils/formatters";

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <Card
      className={`bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all duration-300 p-0 overflow-hidden`} 
    >      <CardHeader className="p-0">

          {article.featuredImage ? (
            <CardMedia
        src={article.featuredImage}
        alt="preview do projeto"
        aspect="aspect-video"
        priority
        sizes="(max-width: 768px) 100vw, 600px"
      />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-primary-500">
              <Calendar className="w-12 h-12" />
            </div>
          )}
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="text-xs bg-lime-200/20 text-lime-600 border-lime-500/30">
            {getCategoryLabel(article.category)}
          </Badge>
        </div>

        <h3 className="text-lg font-bold text-lime-600 mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
          {article.excerpt}
        </p>

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
            <Button size="sm" className="bg-lime-600 hover:bg-lime-700">
              Ler mais
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

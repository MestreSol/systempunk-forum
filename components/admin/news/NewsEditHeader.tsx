"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Save, Eye, Clock } from "lucide-react";
import Link from "next/link";

interface NewsArticle {
  id: string;
  title: string;
  status: 'draft' | 'published' | 'archived';
  publishDate: string;
  views: number;
  slug: string;
  content: string;
}

interface NewsEditHeaderProps {
  article: NewsArticle;
  isSaving: boolean;
  onSave: (status?: 'draft' | 'published' | 'archived') => void;
}

export function NewsEditHeader({ article, isSaving, onSave }: NewsEditHeaderProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
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
    <div className="mb-8">
      <Link href="/admin/news" className="inline-flex items-center text-lime-400 hover:text-lime-300 mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para Notícias
      </Link>
      
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-lime-400 mb-2">Editar Artigo</h1>
          <p className="text-zinc-400">ID: {article.id} • Criado em {formatDate(article.publishDate)}</p>
          
          <div className="flex items-center gap-4 mt-2">
            <Badge 
              variant="outline" 
              className={getStatusBadge(article.status)}
            >
              {getStatusText(article.status)}
            </Badge>
            
            <span className="text-zinc-500 text-sm flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {formatViews(article.views)} visualizações
            </span>
            
            <span className="text-zinc-500 text-sm flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {estimateReadingTime(article.content)} de leitura
            </span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Link href={`/news/${article.slug}`}>
            <Button variant="outline" className="border-zinc-700">
              <ExternalLink className="w-4 h-4 mr-2" />
              Ver Publicação
            </Button>
          </Link>
          
          <Button 
            onClick={() => onSave()} 
            disabled={isSaving}
            variant="outline" 
            className="border-zinc-700"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Salvando...' : 'Salvar'}
          </Button>
          
          <Button 
            onClick={() => onSave('published')} 
            disabled={isSaving}
            className="bg-lime-600 hover:bg-lime-700"
          >
            {article.status === 'published' ? 'Atualizar' : 'Publicar'}
          </Button>
        </div>
      </div>
    </div>
  );
}

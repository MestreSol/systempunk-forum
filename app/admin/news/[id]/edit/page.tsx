"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as React from "react";

// Components
import { NewsEditHeader } from "@/components/admin/news/NewsEditHeader";
import { NewsContentEditor } from "@/components/admin/news/NewsContentEditor";
import { NewsAnalytics } from "@/components/admin/news/NewsAnalytics";
import { NewsPreview } from "@/components/admin/news/NewsPreview";
import { NewsSettings } from "@/components/admin/news/NewsSettings";
import { NewsTags } from "@/components/admin/news/NewsTags";
import { NewsActions } from "@/components/admin/news/NewsActions";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorState } from "@/components/ui/error-state";

// Hooks and data
import { useNewsEditor } from "@/hooks/useNewsEditor";
import { mockArticles, categoryOptions, getCategoryLabel } from "@/lib/data/newsData";

interface NewsEditProps {
  params: Promise<{ id: string }>;
}

export default function EditNews(props: NewsEditProps) {
  const params = React.use(props.params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Find the article from mock data
  const foundArticle = mockArticles.find(a => a.id === params.id);
  
  useEffect(() => {
    const loadArticle = async () => {
      try {
        if (!foundArticle) {
          console.error('Artigo não encontrado');
          router.push('/admin/news');
          return;
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao carregar artigo:', error);
        setIsLoading(false);
      }
    };

    loadArticle();
  }, [foundArticle, router]);

  // Initialize news editor hook only if article exists
  const {
    article,
    isSaving,
    updateArticle,
    addTag,
    removeTag,
    saveArticle,
    deleteArticle
  } = useNewsEditor(foundArticle || mockArticles[0]); // Fallback to first article

  // Handler functions
  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este artigo? Esta ação não pode ser desfeita.')) {
      const success = await deleteArticle();
      if (success) {
        router.push('/admin/news');
      }
    }
  };

  const handleSaveAsDraft = () => saveArticle('draft');
  const handleArchive = () => saveArticle('archived');

  // Loading state
  if (isLoading) {
    return <LoadingSpinner message="Carregando artigo..." />;
  }

  // Article not found state
  if (!foundArticle) {
    return (
      <ErrorState
        title="Artigo não encontrado"
        message="O artigo que você está procurando não existe ou foi removido."
        backLink="/admin/news"
        backLabel="Voltar para Notícias"
      />
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <NewsEditHeader 
          article={article}
          isSaving={isSaving}
          onSave={saveArticle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <NewsContentEditor 
              article={article}
              onUpdate={updateArticle}
            />

            <NewsAnalytics 
              article={article}
              getCategoryLabel={getCategoryLabel}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <NewsPreview article={article} />

            <NewsSettings 
              article={article}
              categoryOptions={categoryOptions}
              onUpdate={updateArticle}
            />

            <NewsTags 
              tags={article.tags}
              onAddTag={addTag}
              onRemoveTag={removeTag}
            />

            <NewsActions 
              isSaving={isSaving}
              onSaveAsDraft={handleSaveAsDraft}
              onArchive={handleArchive}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

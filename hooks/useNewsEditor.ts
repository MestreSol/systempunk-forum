import { useState, useCallback } from "react";

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  category: string;
  tags: string[];
  featuredImage: string;
  author: string;
  publishDate: string;
  lastModified: string;
  views: number;
  slug: string;
}

export function useNewsEditor(initialArticle: NewsArticle) {
  const [article, setArticle] = useState<NewsArticle>(initialArticle);
  const [isSaving, setIsSaving] = useState(false);

  const updateArticle = useCallback((updates: Partial<NewsArticle>) => {
    setArticle(prev => ({ ...prev, ...updates }));
  }, []);

  const addTag = useCallback((tag: string) => {
    setArticle(prev => ({
      ...prev,
      tags: [...prev.tags, tag]
    }));
  }, []);

  const removeTag = useCallback((tag: string) => {
    setArticle(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  }, []);

  const saveArticle = useCallback(async (status?: 'draft' | 'published' | 'archived') => {
    setIsSaving(true);
    try {
      const updatedArticle = {
        ...article,
        status: status || article.status,
        lastModified: new Date().toISOString().split('T')[0]
      };
      
      console.log('Salvando artigo:', updatedArticle);
      // Aqui você implementaria a lógica real de salvamento
      
      // Simular delay de salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setArticle(updatedArticle);
      console.log('Artigo salvo com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao salvar artigo:', error);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [article]);

  const deleteArticle = useCallback(async () => {
    try {
      console.log('Excluindo artigo:', article.id);
      // Aqui você implementaria a lógica real de exclusão
      return true;
    } catch (error) {
      console.error('Erro ao excluir artigo:', error);
      return false;
    }
  }, [article.id]);

  return {
    article,
    isSaving,
    updateArticle,
    addTag,
    removeTag,
    saveArticle,
    deleteArticle
  };
}

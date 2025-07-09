"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, X, Save } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface NewsData {
  title: string;
  subtitle: string;
  content: string;
  tags: string[];
  image: string;
  status: 'draft' | 'published';
  readingTime: string;
  publishDate: string;
}

export default function NewNews() {
  const [newsData, setNewsData] = useState<NewsData>({
    title: '',
    subtitle: '',
    content: '',
    tags: [],
    image: '',
    status: 'draft',
    readingTime: '',
    publishDate: new Date().toISOString().split('T')[0]
  });

  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim() && !newsData.tags.includes(newTag.trim())) {
      setNewsData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setNewsData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleSave = (status: 'draft' | 'published') => {
    const updatedNews = { ...newsData, status };
    console.log('Salvando notícia:', updatedNews);
    // Aqui você implementaria a lógica para salvar a notícia
  };

  const estimateReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min`;
  };

  const handleContentChange = (content: string) => {
    setNewsData(prev => ({
      ...prev,
      content,
      readingTime: estimateReadingTime(content)
    }));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="inline-flex items-center text-lime-400 hover:text-lime-300 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Painel
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-lime-400 mb-2">Criar Nova Notícia</h1>
              <p className="text-zinc-400">Escreva uma nova notícia para o site</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleSave('draft')} variant="outline" className="border-zinc-700">
                <Save className="w-4 h-4 mr-2" />
                Salvar Rascunho
              </Button>
              <Button onClick={() => handleSave('published')} className="bg-lime-600 hover:bg-lime-700">
                Publicar
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lime-200">Conteúdo Principal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-zinc-200">Título</Label>
                  <Input
                    id="title"
                    value={newsData.title}
                    onChange={(e) => setNewsData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Título da notícia..."
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="subtitle" className="text-zinc-200">Subtítulo</Label>
                  <Input
                    id="subtitle"
                    value={newsData.subtitle}
                    onChange={(e) => setNewsData(prev => ({ ...prev, subtitle: e.target.value }))}
                    placeholder="Breve descrição da notícia..."
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="content" className="text-zinc-200">Conteúdo</Label>
                  <Textarea
                    id="content"
                    value={newsData.content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    placeholder="Escreva o conteúdo da notícia aqui... Suporte para Markdown disponível."
                    className="bg-zinc-800 border-zinc-700 text-white min-h-96 font-mono"
                  />
                  <p className="text-xs text-zinc-500 mt-1">
                    Tempo de leitura estimado: {newsData.readingTime || '0 min'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lime-200">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-zinc-800 rounded-lg flex items-center justify-center mb-4">
                  {newsData.image ? (
                    <Image src={newsData.image} alt="Preview" className="w-full h-full object-cover rounded-lg" width={400} height={225} />
                  ) : (
                    <span className="text-zinc-500">Sem imagem</span>
                  )}
                </div>
                <h3 className="font-bold text-lime-200 mb-2">{newsData.title || 'Título da notícia'}</h3>
                <p className="text-sm text-zinc-400 mb-2">{newsData.subtitle || 'Subtítulo da notícia'}</p>
                <div className="flex gap-1 flex-wrap">
                  {newsData.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lime-200">Configurações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status" className="text-zinc-200">Status</Label>
                  <Select value={newsData.status} onValueChange={(value: 'draft' | 'published') => setNewsData(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="draft">Rascunho</SelectItem>
                      <SelectItem value="published">Publicado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="publishDate" className="text-zinc-200">Data de Publicação</Label>
                  <Input
                    id="publishDate"
                    type="date"
                    value={newsData.publishDate}
                    onChange={(e) => setNewsData(prev => ({ ...prev, publishDate: e.target.value }))}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="image" className="text-zinc-200">Imagem de Capa</Label>
                  <Input
                    id="image"
                    value={newsData.image}
                    onChange={(e) => setNewsData(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="/images/news.jpg"
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lime-200">Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Nova tag..."
                    className="bg-zinc-800 border-zinc-700 text-white"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  />
                  <Button type="button" onClick={handleAddTag} variant="outline" className="border-zinc-700">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {newsData.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-lime-600 text-white">
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 p-0 h-auto"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

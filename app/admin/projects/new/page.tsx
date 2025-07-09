"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, X, Upload } from "lucide-react";
import Link from "next/link";

interface ProjectData {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  platforms: string[];
  status: string;
  heroImage: string;
  video: string;
  tags: string[];
  customCss: string;
}

export default function NewProject() {
  const [projectData, setProjectData] = useState<ProjectData>({
    id: '',
    name: '',
    subtitle: '',
    description: '',
    platforms: [],
    status: 'active',
    heroImage: '',
    video: '',
    tags: [],
    customCss: ''
  });

  const [newTag, setNewTag] = useState('');
  const [newPlatform, setNewPlatform] = useState('');

  const availablePlatforms = ['Steam', 'PC', 'PlayStation', 'Xbox', 'Epic Games', 'Itch.io'];

  const handleAddTag = () => {
    if (newTag.trim() && !projectData.tags.includes(newTag.trim())) {
      setProjectData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setProjectData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleAddPlatform = (platform: string) => {
    if (!projectData.platforms.includes(platform)) {
      setProjectData(prev => ({
        ...prev,
        platforms: [...prev.platforms, platform]
      }));
    }
  };

  const handleRemovePlatform = (platform: string) => {
    setProjectData(prev => ({
      ...prev,
      platforms: prev.platforms.filter(p => p !== platform)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica para salvar o projeto
    console.log('Projeto criado:', projectData);
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
          <h1 className="text-3xl font-bold text-lime-400 mb-2">Criar Novo Projeto</h1>
          <p className="text-zinc-400">Preencha as informações básicas do projeto</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-lime-200">Informações Básicas</CardTitle>
              <CardDescription>Dados principais do projeto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="id" className="text-zinc-200">ID do Projeto</Label>
                  <Input
                    id="id"
                    value={projectData.id}
                    onChange={(e) => setProjectData(prev => ({ ...prev, id: e.target.value }))}
                    placeholder="Ex: RR, MON"
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="status" className="text-zinc-200">Status</Label>
                  <Select value={projectData.status} onValueChange={(value) => setProjectData(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="inactive">Inativo</SelectItem>
                      <SelectItem value="development">Em Desenvolvimento</SelectItem>
                      <SelectItem value="completed">Concluído</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="name" className="text-zinc-200">Nome do Projeto</Label>
                <Input
                  id="name"
                  value={projectData.name}
                  onChange={(e) => setProjectData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Retail Rush"
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <div>
                <Label htmlFor="subtitle" className="text-zinc-200">Subtítulo</Label>
                <Input
                  id="subtitle"
                  value={projectData.subtitle}
                  onChange={(e) => setProjectData(prev => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="Ex: Simulação Profunda de Supermercado"
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-zinc-200">Descrição</Label>
                <Textarea
                  id="description"
                  value={projectData.description}
                  onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descrição detalhada do projeto..."
                  className="bg-zinc-800 border-zinc-700 text-white min-h-24"
                />
              </div>
            </CardContent>
          </Card>

          {/* Media */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-lime-200">Mídia</CardTitle>
              <CardDescription>Imagens e vídeos do projeto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="heroImage" className="text-zinc-200">Imagem Hero</Label>
                <div className="flex gap-2">
                  <Input
                    id="heroImage"
                    value={projectData.heroImage}
                    onChange={(e) => setProjectData(prev => ({ ...prev, heroImage: e.target.value }))}
                    placeholder="/images/hero.jpg"
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                  <Button type="button" variant="outline" className="border-zinc-700">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="video" className="text-zinc-200">Vídeo do Trailer</Label>
                <Input
                  id="video"
                  value={projectData.video}
                  onChange={(e) => setProjectData(prev => ({ ...prev, video: e.target.value }))}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Platforms */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-lime-200">Plataformas</CardTitle>
              <CardDescription>Plataformas onde o projeto está disponível</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-zinc-200">Selecionar Plataforma</Label>
                <Select value={newPlatform} onValueChange={(value) => {
                  setNewPlatform(value);
                  handleAddPlatform(value);
                }}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Selecione uma plataforma" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    {availablePlatforms.map(platform => (
                      <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-wrap gap-2">
                {projectData.platforms.map(platform => (
                  <Badge key={platform} variant="secondary" className="bg-lime-600 text-white">
                    {platform}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemovePlatform(platform)}
                      className="ml-2 p-0 h-auto"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-lime-200">Tags</CardTitle>
              <CardDescription>Tags para categorizar o projeto</CardDescription>
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
                {projectData.tags.map(tag => (
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

          {/* Advanced */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-lime-200">Configurações Avançadas</CardTitle>
              <CardDescription>CSS customizado e outras configurações</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="customCss" className="text-zinc-200">CSS Customizado</Label>
                <Input
                  id="customCss"
                  value={projectData.customCss}
                  onChange={(e) => setProjectData(prev => ({ ...prev, customCss: e.target.value }))}
                  placeholder="/projects/projeto/style.css"
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 justify-end">
            <Link href="/admin">
              <Button variant="outline" className="border-zinc-700">
                Cancelar
              </Button>
            </Link>
            <Button type="submit" className="bg-lime-600 hover:bg-lime-700">
              Criar Projeto
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

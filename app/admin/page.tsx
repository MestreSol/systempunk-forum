"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  FolderPlus, 
  FileText, 
  Settings, 
  Users, 
  BarChart3, 
  Plus,
  Edit,
  Trash2,
  Eye
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats] = useState({
    projects: 2,
    news: 5,
    users: 150,
    views: 2340
  });

  const [recentProjects] = useState([
    { id: "RR", name: "Retail Rush", status: "active", lastUpdate: "2025-07-09" },
    { id: "MON", name: "Monsters & Dungeons", status: "active", lastUpdate: "2025-07-08" }
  ]);

  const [recentNews] = useState([
    { id: 1, title: "Sistema de Espionagem Disponível", status: "published", date: "2025-07-09" },
    { id: 2, title: "Nova Atualização de Gameplay", status: "draft", date: "2025-07-08" }
  ]);

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-lime-400 mb-2">Painel de Administração</h1>
          <p className="text-zinc-400">Gerencie projetos, notícias e configurações do site</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-200">Projetos</CardTitle>
              <FolderPlus className="h-4 w-4 text-lime-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-lime-400">{stats.projects}</div>
              <p className="text-xs text-zinc-500">+1 este mês</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-200">Notícias</CardTitle>
              <FileText className="h-4 w-4 text-lime-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-lime-400">{stats.news}</div>
              <p className="text-xs text-zinc-500">+2 esta semana</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-200">Usuários</CardTitle>
              <Users className="h-4 w-4 text-lime-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-lime-400">{stats.users}</div>
              <p className="text-xs text-zinc-500">+12% este mês</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-200">Visualizações</CardTitle>
              <BarChart3 className="h-4 w-4 text-lime-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-lime-400">{stats.views}</div>
              <p className="text-xs text-zinc-500">+8% esta semana</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="bg-zinc-900 border-zinc-800">
            <TabsTrigger value="projects" className="data-[state=active]:bg-lime-600">Projetos</TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-lime-600">Notícias</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-lime-600">Configurações</TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-lime-400">Gerenciar Projetos</h2>
              <Link href="/admin/projects/new">
                <Button className="bg-lime-600 hover:bg-lime-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Projeto
                </Button>
              </Link>
            </div>

            <div className="grid gap-4">
              {recentProjects.map((project) => (
                <Card key={project.id} className="bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lime-200">{project.name}</CardTitle>
                        <CardDescription>ID: {project.id}</CardDescription>
                      </div>
                      <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-zinc-400">Última atualização: {project.lastUpdate}</span>
                      <div className="flex gap-2">
                        <Link href={`/projects/jogo/${project.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/projects/${project.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="text-red-400 hover:text-red-300">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* News Tab */}
          <TabsContent value="news" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-lime-400">Gerenciar Notícias</h2>
              <Link href="/admin/news/new">
                <Button className="bg-lime-600 hover:bg-lime-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Notícia
                </Button>
              </Link>
            </div>

            <div className="grid gap-4">
              {recentNews.map((news) => (
                <Card key={news.id} className="bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lime-200">{news.title}</CardTitle>
                        <CardDescription>Data: {news.date}</CardDescription>
                      </div>
                      <Badge variant={news.status === 'published' ? 'default' : 'secondary'}>
                        {news.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-end gap-2">
                      <Link href={`/news/${news.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/news/${news.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-xl font-semibold text-lime-400">Configurações do Site</h2>
            
            <div className="grid gap-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-lime-200">Configurações Gerais</CardTitle>
                  <CardDescription>Configure as informações básicas do site</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Editar Configurações
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-lime-200">Backup e Restauração</CardTitle>
                  <CardDescription>Faça backup dos dados ou restaure de um backup anterior</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-2">
                  <Button variant="outline">Fazer Backup</Button>
                  <Button variant="outline">Restaurar Backup</Button>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-lime-200">Cache e Performance</CardTitle>
                  <CardDescription>Gerencie cache e otimizações do site</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-2">
                  <Button variant="outline">Limpar Cache</Button>
                  <Button variant="outline">Otimizar Imagens</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

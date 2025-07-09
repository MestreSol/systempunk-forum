"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  MoreVertical,
  Calendar,
  Users,
  Activity,
  ExternalLink
} from "lucide-react";
import Image from "next/image";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'completed' | 'planning';
  progress: number;
  teamSize: number;
  lastUpdate: string;
  image: string;
  tags: string[];
}

const statusOptions = [
  { value: 'all', label: 'Todos os Status', color: 'text-gray-400' },
  { value: 'active', label: 'Ativo', color: 'text-green-400' },
  { value: 'paused', label: 'Pausado', color: 'text-yellow-400' },
  { value: 'completed', label: 'Completo', color: 'text-blue-400' },
  { value: 'planning', label: 'Planejamento', color: 'text-purple-400' }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'paused': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'completed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'planning': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'active': return 'Ativo';
    case 'paused': return 'Pausado';
    case 'completed': return 'Completo';
    case 'planning': return 'Planejamento';
    default: return 'Desconhecido';
  }
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento dos projetos
    const loadProjects = async () => {
      try {
        // Mock de dados dos projetos
        const mockProjects: Project[] = [
          {
            id: 'RR',
            name: 'Dawson Miller Supermarket Systems',
            description: 'Um jogo de simulação e gerenciamento de supermercado com elementos de RPG e estratégia.',
            status: 'active',
            progress: 65,
            teamSize: 5,
            lastUpdate: '2025-01-08',
            image: '/projects/jogo/RR.png',
            tags: ['Unity', 'C#', 'Simulação', 'RPG']
          },
          {
            id: 'MON',
            name: 'Monster Collection',
            description: 'Jogo de coleta e batalha de monstros com elementos de aventura.',
            status: 'planning',
            progress: 15,
            teamSize: 3,
            lastUpdate: '2025-01-05',
            image: '/projects/jogo/MON.png',
            tags: ['Unity', 'Mobile', 'Aventura']
          },
          {
            id: 'website',
            name: 'SystemPunk Website',
            description: 'Website oficial da empresa com portfólio e blog.',
            status: 'completed',
            progress: 100,
            teamSize: 2,
            lastUpdate: '2024-12-20',
            image: '/systempunkBrand.png',
            tags: ['Next.js', 'React', 'Website']
          },
          {
            id: 'tools',
            name: 'Dev Tools Suite',
            description: 'Conjunto de ferramentas para desenvolvimento interno.',
            status: 'paused',
            progress: 40,
            teamSize: 2,
            lastUpdate: '2024-11-15',
            image: '/logo.png',
            tags: ['Tools', 'Automation', 'Workflow']
          }
        ];
        
        setProjects(mockProjects);
        setFilteredProjects(mockProjects);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao carregar projetos:', error);
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  useEffect(() => {
    // Filtrar projetos com base na busca e status
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    setFilteredProjects(filtered);
  }, [projects, searchTerm, statusFilter]);

  const handleDeleteProject = (projectId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      setProjects(prev => prev.filter(p => p.id !== projectId));
      console.log('Projeto excluído:', projectId);
      // Aqui você implementaria a lógica real de exclusão
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="animate-pulse text-lime-400">Carregando projetos...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="inline-flex items-center text-lime-400 hover:text-lime-300 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Painel
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-lime-400 mb-2">Gerenciar Projetos</h1>
              <p className="text-zinc-400">
                Visualize, edite e gerencie todos os projetos da empresa
              </p>
            </div>
            <Link href="/admin/projects/new">
              <Button className="bg-lime-600 hover:bg-lime-700">
                <Plus className="w-4 h-4 mr-2" />
                Novo Projeto
              </Button>
            </Link>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="mb-6 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
            <Input
              placeholder="Buscar projetos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Filter className="text-zinc-400 w-4 h-4" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-zinc-800 border-zinc-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                {statusOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    <span className={option.color}>{option.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-lime-500/20 rounded-lg">
                  <Activity className="w-5 h-5 text-lime-400" />
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Total</p>
                  <p className="text-white font-bold text-xl">{projects.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Activity className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Ativos</p>
                  <p className="text-white font-bold text-xl">
                    {projects.filter(p => p.status === 'active').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Activity className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Completos</p>
                  <p className="text-white font-bold text-xl">
                    {projects.filter(p => p.status === 'completed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Users className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Membros</p>
                  <p className="text-white font-bold text-xl">
                    {projects.reduce((acc, p) => acc + p.teamSize, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Projetos */}
        <div className="space-y-4">
          {filteredProjects.length === 0 ? (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="py-12 text-center">
                <Activity className="w-12 h-12 mx-auto mb-4 text-zinc-400 opacity-50" />
                <h3 className="text-lg font-semibold text-zinc-300 mb-2">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Nenhum projeto encontrado' 
                    : 'Nenhum projeto cadastrado'
                  }
                </h3>
                <p className="text-zinc-400 mb-4">
                  {searchTerm || statusFilter !== 'all'
                    ? 'Tente ajustar os filtros de busca'
                    : 'Comece criando seu primeiro projeto'
                  }
                </p>
                {!searchTerm && statusFilter === 'all' && (
                  <Link href="/admin/projects/new">
                    <Button className="bg-lime-600 hover:bg-lime-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Criar Primeiro Projeto
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredProjects.map((project) => (
              <Card key={project.id} className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Imagem do Projeto */}
                    <div className="w-16 h-16 bg-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {project.image ? (
                        <Image 
                          src={project.image} 
                          alt={project.name}
                          className="w-full h-full object-cover"
                          width={64}
                          height={64}
                        />
                      ) : (
                        <Activity className="w-8 h-8 text-zinc-400" />
                      )}
                    </div>

                    {/* Informações do Projeto */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-1">
                            {project.name}
                          </h3>
                          <p className="text-zinc-400 text-sm line-clamp-2">
                            {project.description}
                          </p>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-zinc-800 border-zinc-700">
                            <Link href={`/projects/jogo/${project.id}`}>
                              <DropdownMenuItem className="text-zinc-300 hover:bg-zinc-700">
                                <Eye className="w-4 h-4 mr-2" />
                                Visualizar
                              </DropdownMenuItem>
                            </Link>
                            <Link href={`/admin/projects/${project.id}/edit`}>
                              <DropdownMenuItem className="text-zinc-300 hover:bg-zinc-700">
                                <Edit className="w-4 h-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator className="bg-zinc-600" />
                            <DropdownMenuItem 
                              className="text-red-400 hover:bg-red-900/20"
                              onClick={() => handleDeleteProject(project.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-zinc-700 text-zinc-200 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Métricas e Status */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={getStatusColor(project.status)}>
                              {getStatusLabel(project.status)}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2 text-zinc-400 text-sm">
                            <Activity className="w-4 h-4" />
                            <span>{project.progress}% completo</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-zinc-400 text-sm">
                            <Users className="w-4 h-4" />
                            <span>{project.teamSize} membros</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-zinc-400 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>Atualizado em {formatDate(project.lastUpdate)}</span>
                          </div>
                        </div>

                        {/* Botões de Ação */}
                        <div className="flex items-center gap-2">
                          <Link href={`/projects/jogo/${project.id}`}>
                            <Button variant="outline" size="sm" className="border-zinc-600 text-zinc-300 hover:bg-zinc-700">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Ver Projeto
                            </Button>
                          </Link>
                          <Link href={`/admin/projects/${project.id}/edit`}>
                            <Button size="sm" className="bg-lime-600 hover:bg-lime-700">
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </Button>
                          </Link>
                        </div>
                      </div>

                      {/* Barra de Progresso */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                          <span>Progresso do Projeto</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-zinc-800 rounded-full h-2">
                          <div 
                            className="bg-lime-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Footer com Resumo */}
        {filteredProjects.length > 0 && (
          <div className="mt-8 text-center text-zinc-400 text-sm">
            Mostrando {filteredProjects.length} de {projects.length} projeto(s)
          </div>
        )}
      </div>
    </div>
  );
}

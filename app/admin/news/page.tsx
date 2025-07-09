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
  Clock,
  ExternalLink,
  FileText,
  TrendingUp
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

interface NewsArticle {
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

const statusOptions = [
  { value: 'all', label: 'Todos os Status', color: 'text-gray-400' },
  { value: 'published', label: 'Publicado', color: 'text-green-400' },
  { value: 'draft', label: 'Rascunho', color: 'text-yellow-400' },
  { value: 'archived', label: 'Arquivado', color: 'text-gray-400' }
];

const categoryOptions = [
  { value: 'all', label: 'Todas as Categorias' },
  { value: 'updates', label: 'Atualizações' },
  { value: 'releases', label: 'Lançamentos' },
  { value: 'devlogs', label: 'Dev Logs' },
  { value: 'announcements', label: 'Anúncios' },
  { value: 'tutorials', label: 'Tutoriais' },
  { value: 'community', label: 'Comunidade' }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'published': return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'draft': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'archived': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'published': return 'Publicado';
    case 'draft': return 'Rascunho';
    case 'archived': return 'Arquivado';
    default: return 'Desconhecido';
  }
};

const getCategoryLabel = (category: string) => {
  const option = categoryOptions.find(opt => opt.value === category);
  return option ? option.label : category;
};

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento dos artigos
    const loadArticles = async () => {
      try {
        // Mock de dados dos artigos
        const mockArticles: NewsArticle[] = [
          {
            id: '1',
            title: 'Dawson Miller Supermarket Systems - Beta 0.8 Lançada!',
            excerpt: 'Nova versão beta com sistema de funcionários aprimorado, novos produtos e correções de bugs importantes.',
            content: 'Conteúdo completo do artigo...',
            status: 'published',
            category: 'releases',
            tags: ['Beta', 'Update', 'RR', 'Gameplay'],
            featuredImage: '/news/beta-08-release.jpg',
            author: 'SystemPunk Team',
            publishDate: '2025-01-08',
            lastModified: '2025-01-08',
            views: 1250,
            slug: 'dawson-miller-beta-08-lancada'
          },
          {
            id: '2',
            title: 'Dev Log #15: Sistema de Inventário Redesenhado',
            excerpt: 'Detalhes sobre as melhorias no sistema de inventário e como isso impacta a experiência do jogador.',
            content: 'Conteúdo completo do artigo...',
            status: 'published',
            category: 'devlogs',
            tags: ['DevLog', 'Inventory', 'UX', 'Design'],
            featuredImage: '/news/inventory-redesign.jpg',
            author: 'João Silva',
            publishDate: '2025-01-05',
            lastModified: '2025-01-06',
            views: 892,
            slug: 'dev-log-15-sistema-inventario-redesenhado'
          },
          {
            id: '3',
            title: 'Comunidade Spotlight: Melhores Supermercados Criados',
            excerpt: 'Destacamos os supermercados mais criativos e eficientes criados pela nossa comunidade.',
            content: 'Conteúdo completo do artigo...',
            status: 'draft',
            category: 'community',
            tags: ['Community', 'Showcase', 'Creative'],
            featuredImage: '/news/community-spotlight.jpg',
            author: 'Maria Souza',
            publishDate: '2025-01-10',
            lastModified: '2025-01-07',
            views: 0,
            slug: 'comunidade-spotlight-melhores-supermercados'
          },
          {
            id: '4',
            title: 'Tutorial: Como Otimizar Seu Layout de Loja',
            excerpt: 'Dicas e estratégias para criar layouts eficientes que maximizam lucros e satisfação dos clientes.',
            content: 'Conteúdo completo do artigo...',
            status: 'published',
            category: 'tutorials',
            tags: ['Tutorial', 'Strategy', 'Tips'],
            featuredImage: '/news/layout-optimization.jpg',
            author: 'Carlos Lima',
            publishDate: '2025-01-03',
            lastModified: '2025-01-03',
            views: 2150,
            slug: 'tutorial-otimizar-layout-loja'
          },
          {
            id: '5',
            title: 'Anúncio: Próxima Atualização Major em Desenvolvimento',
            excerpt: 'Revelamos detalhes sobre a próxima grande atualização que chegará no primeiro trimestre.',
            content: 'Conteúdo completo do artigo...',
            status: 'archived',
            category: 'announcements',
            tags: ['Announcement', 'Major Update', 'Roadmap'],
            featuredImage: '/news/major-update-announcement.jpg',
            author: 'SystemPunk Team',
            publishDate: '2024-12-20',
            lastModified: '2024-12-20',
            views: 3400,
            slug: 'anuncio-proxima-atualizacao-major'
          }
        ];
        
        setArticles(mockArticles);
        setFilteredArticles(mockArticles);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao carregar artigos:', error);
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  useEffect(() => {
    // Filtrar artigos com base na busca, status e categoria
    let filtered = articles;

    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(article => article.status === statusFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(article => article.category === categoryFilter);
    }

    setFilteredArticles(filtered);
  }, [articles, searchTerm, statusFilter, categoryFilter]);

  const handleDeleteArticle = (articleId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este artigo?')) {
      setArticles(prev => prev.filter(a => a.id !== articleId));
      console.log('Artigo excluído:', articleId);
      // Aqui você implementaria a lógica real de exclusão
    }
  };

  const handleStatusChange = (articleId: string, newStatus: 'draft' | 'published' | 'archived') => {
    setArticles(prev => prev.map(article => 
      article.id === articleId 
        ? { ...article, status: newStatus, lastModified: new Date().toISOString().split('T')[0] }
        : article
    ));
    console.log('Status alterado:', articleId, newStatus);
    // Aqui você implementaria a lógica real de alteração de status
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="animate-pulse text-lime-400">Carregando artigos...</div>
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
              <h1 className="text-3xl font-bold text-lime-400 mb-2">Gerenciar Notícias</h1>
              <p className="text-zinc-400">
                Crie, edite e publique artigos para o blog e página de notícias
              </p>
            </div>
            <Link href="/admin/news/new">
              <Button className="bg-lime-600 hover:bg-lime-700">
                <Plus className="w-4 h-4 mr-2" />
                Novo Artigo
              </Button>
            </Link>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="mb-6 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
            <Input
              placeholder="Buscar artigos..."
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
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48 bg-zinc-800 border-zinc-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                {categoryOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
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
                  <FileText className="w-5 h-5 text-lime-400" />
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Total</p>
                  <p className="text-white font-bold text-xl">{articles.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Eye className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Publicados</p>
                  <p className="text-white font-bold text-xl">
                    {articles.filter(a => a.status === 'published').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Edit className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Rascunhos</p>
                  <p className="text-white font-bold text-xl">
                    {articles.filter(a => a.status === 'draft').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Visualizações</p>
                  <p className="text-white font-bold text-xl">
                    {formatViews(articles.reduce((acc, a) => acc + a.views, 0))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Artigos */}
        <div className="space-y-4">
          {filteredArticles.length === 0 ? (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="py-12 text-center">
                <FileText className="w-12 h-12 mx-auto mb-4 text-zinc-400 opacity-50" />
                <h3 className="text-lg font-semibold text-zinc-300 mb-2">
                  {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
                    ? 'Nenhum artigo encontrado' 
                    : 'Nenhum artigo cadastrado'
                  }
                </h3>
                <p className="text-zinc-400 mb-4">
                  {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
                    ? 'Tente ajustar os filtros de busca'
                    : 'Comece criando seu primeiro artigo'
                  }
                </p>
                {!searchTerm && statusFilter === 'all' && categoryFilter === 'all' && (
                  <Link href="/admin/news/new">
                    <Button className="bg-lime-600 hover:bg-lime-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Criar Primeiro Artigo
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredArticles.map((article) => (
              <Card key={article.id} className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Imagem destacada */}
                    <div className="w-24 h-24 bg-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {article.featuredImage ? (
                        <Image 
                          src={article.featuredImage} 
                          alt={article.title}
                          className="w-full h-full object-cover"
                          width={96}
                          height={96}
                        />
                      ) : (
                        <FileText className="w-8 h-8 text-zinc-400" />
                      )}
                    </div>

                    {/* Conteúdo do artigo */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-1 line-clamp-1">
                            {article.title}
                          </h3>
                          <p className="text-zinc-400 text-sm line-clamp-2 mb-2">
                            {article.excerpt}
                          </p>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white ml-4">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-zinc-800 border-zinc-700">
                            <Link href={`/news/${article.slug}`}>
                              <DropdownMenuItem className="text-zinc-300 hover:bg-zinc-700">
                                <Eye className="w-4 h-4 mr-2" />
                                Visualizar
                              </DropdownMenuItem>
                            </Link>
                            <Link href={`/admin/news/${article.id}/edit`}>
                              <DropdownMenuItem className="text-zinc-300 hover:bg-zinc-700">
                                <Edit className="w-4 h-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator className="bg-zinc-600" />
                            {article.status === 'draft' && (
                              <DropdownMenuItem 
                                className="text-green-400 hover:bg-green-900/20"
                                onClick={() => handleStatusChange(article.id, 'published')}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Publicar
                              </DropdownMenuItem>
                            )}
                            {article.status === 'published' && (
                              <DropdownMenuItem 
                                className="text-yellow-400 hover:bg-yellow-900/20"
                                onClick={() => handleStatusChange(article.id, 'draft')}
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Voltar para Rascunho
                              </DropdownMenuItem>
                            )}
                            {article.status !== 'archived' && (
                              <DropdownMenuItem 
                                className="text-gray-400 hover:bg-gray-900/20"
                                onClick={() => handleStatusChange(article.id, 'archived')}
                              >
                                <FileText className="w-4 h-4 mr-2" />
                                Arquivar
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator className="bg-zinc-600" />
                            <DropdownMenuItem 
                              className="text-red-400 hover:bg-red-900/20"
                              onClick={() => handleDeleteArticle(article.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="secondary" className="bg-blue-900/20 text-blue-400 border-blue-500/30">
                          {getCategoryLabel(article.category)}
                        </Badge>
                        {article.tags.slice(0, 3).map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-zinc-700 text-zinc-200 text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {article.tags.length > 3 && (
                          <Badge variant="secondary" className="bg-zinc-700 text-zinc-200 text-xs">
                            +{article.tags.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Métricas e Status */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={getStatusColor(article.status)}>
                              {getStatusLabel(article.status)}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2 text-zinc-400 text-sm">
                            <Eye className="w-4 h-4" />
                            <span>{formatViews(article.views)} visualizações</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-zinc-400 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(article.publishDate)}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-zinc-400 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>por {article.author}</span>
                          </div>
                        </div>

                        {/* Botões de Ação */}
                        <div className="flex items-center gap-2">
                          <Link href={`/news/${article.slug}`}>
                            <Button variant="outline" size="sm" className="border-zinc-600 text-zinc-300 hover:bg-zinc-700">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Ver Publicação
                            </Button>
                          </Link>
                          <Link href={`/admin/news/${article.id}/edit`}>
                            <Button size="sm" className="bg-lime-600 hover:bg-lime-700">
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </Button>
                          </Link>
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
        {filteredArticles.length > 0 && (
          <div className="mt-8 text-center text-zinc-400 text-sm">
            Mostrando {filteredArticles.length} de {articles.length} artigo(s)
          </div>
        )}
      </div>
    </div>
  );
}

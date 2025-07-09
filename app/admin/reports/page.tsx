"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileText,
  Download,
  Zap,
  Target,
  Globe,
  MessageSquare,
  Star,
  RefreshCw
} from "lucide-react";
import Link from "next/link";

interface ReportData {
  users: {
    total: number;
    active: number;
    new: number;
    retention: number;
  };
  projects: {
    total: number;
    published: number;
    inDevelopment: number;
    archived: number;
  };
  news: {
    total: number;
    published: number;
    views: number;
    engagement: number;
  };
  traffic: {
    visitors: number;
    pageViews: number;
    bounceRate: number;
    avgSessionTime: string;
  };
  performance: {
    loadTime: number;
    uptime: number;
    errors: number;
    satisfaction: number;
  };
}

interface ChartData {
  date: string;
  visitors: number;
  pageViews: number;
  projects: number;
  news: number;
}

const mockReportData: ReportData = {
  users: {
    total: 12458,
    active: 8902,
    new: 1247,
    retention: 78.5
  },
  projects: {
    total: 34,
    published: 28,
    inDevelopment: 4,
    archived: 2
  },
  news: {
    total: 156,
    published: 142,
    views: 89456,
    engagement: 6.8
  },
  traffic: {
    visitors: 45678,
    pageViews: 123456,
    bounceRate: 32.4,
    avgSessionTime: "4:32"
  },
  performance: {
    loadTime: 1.2,
    uptime: 99.8,
    errors: 23,
    satisfaction: 4.6
  }
};

const mockChartData: ChartData[] = [
  { date: "2025-01-01", visitors: 1200, pageViews: 3400, projects: 2, news: 5 },
  { date: "2025-01-02", visitors: 1350, pageViews: 3800, projects: 1, news: 3 },
  { date: "2025-01-03", visitors: 1100, pageViews: 3200, projects: 3, news: 7 },
  { date: "2025-01-04", visitors: 1450, pageViews: 4100, projects: 2, news: 4 },
  { date: "2025-01-05", visitors: 1600, pageViews: 4500, projects: 1, news: 8 },
  { date: "2025-01-06", visitors: 1380, pageViews: 3900, projects: 4, news: 6 },
  { date: "2025-01-07", visitors: 1520, pageViews: 4200, projects: 2, news: 5 }
];

export default function ReportsPage() {
  const [reportData, setReportData] = useState<ReportData>(mockReportData);
  const [chartData, setChartData] = useState<ChartData[]>(mockChartData);
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState('7days');
  const [selectedMetric, setSelectedMetric] = useState('visitors');

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      // Simular carregamento de dados
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Aqui você faria a chamada real para a API
      setReportData(mockReportData);
      setChartData(mockChartData);
      
      console.log('Dados atualizados');
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="inline-flex items-center text-lime-400 hover:text-lime-300 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Painel
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-lime-400 mb-2">Relatórios e Analytics</h1>
              <p className="text-zinc-400">
                Análise detalhada de performance, usuários e conteúdo
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-40 bg-zinc-800 border-zinc-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  <SelectItem value="7days">Últimos 7 dias</SelectItem>
                  <SelectItem value="30days">Últimos 30 dias</SelectItem>
                  <SelectItem value="90days">Últimos 90 dias</SelectItem>
                  <SelectItem value="1year">Último ano</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={handleRefresh} 
                disabled={isLoading}
                variant="outline" 
                className="border-zinc-700"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Atualizando...' : 'Atualizar'}
              </Button>
              <Button className="bg-lime-600 hover:bg-lime-700">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-zinc-900 border-zinc-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-lime-600">
              <BarChart3 className="w-4 h-4 mr-2" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-lime-600">
              <Users className="w-4 h-4 mr-2" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-lime-600">
              <FileText className="w-4 h-4 mr-2" />
              Conteúdo
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-lime-600">
              <Zap className="w-4 h-4 mr-2" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="engagement" className="data-[state=active]:bg-lime-600">
              <MessageSquare className="w-4 h-4 mr-2" />
              Engajamento
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* KPIs Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-zinc-400 text-sm">Visitantes</p>
                      <p className="text-2xl font-bold text-white">{formatNumber(reportData.traffic.visitors)}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3 text-green-400" />
                        <span className="text-green-400 text-xs">+12.5%</span>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <Globe className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-zinc-400 text-sm">Usuários Ativos</p>
                      <p className="text-2xl font-bold text-white">{formatNumber(reportData.users.active)}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3 text-green-400" />
                        <span className="text-green-400 text-xs">+8.3%</span>
                      </div>
                    </div>
                    <div className="p-3 bg-green-500/20 rounded-lg">
                      <Users className="w-6 h-6 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-zinc-400 text-sm">Projetos Ativos</p>
                      <p className="text-2xl font-bold text-white">{reportData.projects.published}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3 text-green-400" />
                        <span className="text-green-400 text-xs">+5.2%</span>
                      </div>
                    </div>
                    <div className="p-3 bg-purple-500/20 rounded-lg">
                      <Target className="w-6 h-6 text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-zinc-400 text-sm">Satisfação</p>
                      <p className="text-2xl font-bold text-white">{reportData.performance.satisfaction}/5</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span className="text-yellow-400 text-xs">Excelente</span>
                      </div>
                    </div>
                    <div className="p-3 bg-yellow-500/20 rounded-lg">
                      <Star className="w-6 h-6 text-yellow-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gráfico de Tendências */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lime-200">Tendências de Tráfego</CardTitle>
                    <CardDescription>Análise dos últimos 7 dias</CardDescription>
                  </div>
                  <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                    <SelectTrigger className="w-40 bg-zinc-800 border-zinc-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="visitors">Visitantes</SelectItem>
                      <SelectItem value="pageViews">Page Views</SelectItem>
                      <SelectItem value="projects">Projetos</SelectItem>
                      <SelectItem value="news">Notícias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-zinc-800 rounded-lg p-4 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 mx-auto mb-4 text-zinc-400" />
                    <p className="text-zinc-400 text-lg">Gráfico de {selectedMetric}</p>
                    <p className="text-zinc-500 text-sm mt-2">
                      Simulação de dados dos últimos 7 dias
                    </p>
                    <div className="mt-4 grid grid-cols-7 gap-2">
                      {chartData.map((data, index) => (
                        <div key={index} className="text-center">
                          <div 
                            className="bg-lime-500 mx-auto mb-1 rounded-sm"
                            style={{ 
                              width: '20px', 
                              height: `${(data[selectedMetric as keyof ChartData] as number) / 50}px`,
                              minHeight: '4px'
                            }}
                          />
                          <p className="text-xs text-zinc-400">
                            {new Date(data.date).getDate()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Métricas Detalhadas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-lime-200">Métricas de Tráfego</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-300">Page Views</span>
                    <span className="text-white font-semibold">{formatNumber(reportData.traffic.pageViews)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-300">Taxa de Rejeição</span>
                    <span className="text-white font-semibold">{reportData.traffic.bounceRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-300">Tempo de Sessão</span>
                    <span className="text-white font-semibold">{reportData.traffic.avgSessionTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-300">Novos Usuários</span>
                    <span className="text-white font-semibold">{formatNumber(reportData.users.new)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-lime-200">Status dos Projetos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-300">Total de Projetos</span>
                    <span className="text-white font-semibold">{reportData.projects.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-300">Publicados</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold">{reportData.projects.published}</span>
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        {((reportData.projects.published / reportData.projects.total) * 100).toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-300">Em Desenvolvimento</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold">{reportData.projects.inDevelopment}</span>
                      <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                        {((reportData.projects.inDevelopment / reportData.projects.total) * 100).toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-300">Arquivados</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold">{reportData.projects.archived}</span>
                      <Badge variant="outline" className="text-gray-400 border-gray-400">
                        {((reportData.projects.archived / reportData.projects.total) * 100).toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-lime-200">Usuários Totais</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">
                    {formatNumber(reportData.users.total)}
                  </div>
                  <p className="text-zinc-400 text-sm">
                    Usuários registrados na plataforma
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-lime-200">Usuários Ativos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">
                    {formatNumber(reportData.users.active)}
                  </div>
                  <p className="text-zinc-400 text-sm">
                    Ativos nos últimos 30 dias
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-lime-200">Taxa de Retenção</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">
                    {reportData.users.retention}%
                  </div>
                  <p className="text-zinc-400 text-sm">
                    Usuários que retornam
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lime-200">Análise de Crescimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-zinc-800 rounded-lg p-4 flex items-center justify-center">
                  <div className="text-center">
                    <Users className="w-16 h-16 mx-auto mb-4 text-zinc-400" />
                    <p className="text-zinc-400 text-lg">Gráfico de Crescimento de Usuários</p>
                    <p className="text-zinc-500 text-sm mt-2">
                      Análise detalhada do crescimento da base de usuários
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-lime-200">Estatísticas de Projetos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-300">Total de Projetos</span>
                    <span className="text-white font-semibold">{reportData.projects.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-300">Publicados</span>
                    <span className="text-white font-semibold">{reportData.projects.published}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-300">Em Desenvolvimento</span>
                    <span className="text-white font-semibold">{reportData.projects.inDevelopment}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-300">Arquivados</span>
                    <span className="text-white font-semibold">{reportData.projects.archived}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-lime-200">Estatísticas de Notícias</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-300">Total de Artigos</span>
                    <span className="text-white font-semibold">{reportData.news.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-300">Publicados</span>
                    <span className="text-white font-semibold">{reportData.news.published}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-300">Total de Views</span>
                    <span className="text-white font-semibold">{formatNumber(reportData.news.views)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-300">Taxa de Engajamento</span>
                    <span className="text-white font-semibold">{reportData.news.engagement}%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-2">
                      {reportData.performance.loadTime}s
                    </div>
                    <p className="text-zinc-400 text-sm">Tempo de Carregamento</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-2">
                      {reportData.performance.uptime}%
                    </div>
                    <p className="text-zinc-400 text-sm">Uptime</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-2">
                      {reportData.performance.errors}
                    </div>
                    <p className="text-zinc-400 text-sm">Erros</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-2">
                      {reportData.performance.satisfaction}/5
                    </div>
                    <p className="text-zinc-400 text-sm">Satisfação</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Engagement Tab */}
          <TabsContent value="engagement" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lime-200">Métricas de Engajamento</CardTitle>
                <CardDescription>
                  Análise de como os usuários interagem com o conteúdo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-zinc-800 rounded-lg p-4 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="w-16 h-16 mx-auto mb-4 text-zinc-400" />
                    <p className="text-zinc-400 text-lg">Análise de Engajamento</p>
                    <p className="text-zinc-500 text-sm mt-2">
                      Métricas de interação e engajamento dos usuários
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

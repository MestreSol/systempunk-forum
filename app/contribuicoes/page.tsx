"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart,
  Code,
  Palette,
  Music,
  Users,
  Star,
  Zap,
  Rocket,
  Gift,
  MessageCircle,
  DollarSign,
  Github,
  Twitter,
  Linkedin,
  BookOpen,
  Bug,
  Lightbulb,
  Handshake,
  Target,
  ArrowRight,
  CheckCircle,
  Plus,
  Award,
  Sparkles,
  Calendar,
  Clock,
  FileText
} from "lucide-react";

import { LucideIcon } from "lucide-react";

interface ContributionType {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  difficulty: "iniciante" | "intermediario" | "avancado";
  timeCommitment: string;
  skills: string[];
  benefits: string[];
  examples: string[];
  color: string;
}

interface ContributionOpportunity {
  title: string;
  description: string;
  type: string;
  urgency: "baixa" | "media" | "alta";
  skills: string[];
  reward: string;
  deadline?: string;
}

const contributionTypes: ContributionType[] = [
  {
    id: "development",
    title: "Desenvolvimento",
    description: "Contribua com código para nossos projetos open source",
    icon: Code,
    difficulty: "intermediario",
    timeCommitment: "5-20h/semana",
    skills: ["React", "TypeScript", "Node.js", "Unity", "C#"],
    benefits: ["Portfólio", "Networking", "Experiência", "Reconhecimento"],
    examples: [
      "Implementar novas features em jogos",
      "Corrigir bugs e otimizar performance",
      "Criar ferramentas para desenvolvedores",
      "Contribuir com documentação técnica"
    ],
    color: "lime"
  },
  {
    id: "design",
    title: "Design & Arte",
    description: "Crie assets visuais e melhore a experiência do usuário",
    icon: Palette,
    difficulty: "intermediario",
    timeCommitment: "3-15h/semana",
    skills: ["Figma", "Photoshop", "Illustrator", "Blender", "UI/UX"],
    benefits: ["Portfólio", "Créditos", "Feedback", "Colaboração"],
    examples: [
      "Design de interfaces e mockups",
      "Criação de sprites e texturas",
      "Modelagem 3D e animação",
      "Identidade visual e branding"
    ],
    color: "cyan"
  },
  {
    id: "audio",
    title: "Áudio & Música",
    description: "Componha trilhas sonoras e efeitos para nossos projetos",
    icon: Music,
    difficulty: "intermediario",
    timeCommitment: "2-10h/semana",
    skills: ["Logic Pro", "FL Studio", "Audacity", "Sound Design"],
    benefits: ["Créditos", "Royalties", "Exposição", "Colaboração"],
    examples: [
      "Composição de trilhas sonoras",
      "Criação de efeitos sonoros",
      "Edição e masterização",
      "Implementação de áudio interativo"
    ],
    color: "purple"
  },
  {
    id: "testing",
    title: "Testes & QA",
    description: "Ajude a encontrar bugs e melhorar a qualidade",
    icon: Bug,
    difficulty: "iniciante",
    timeCommitment: "1-5h/semana",
    skills: ["Atenção ao detalhe", "Comunicação", "Paciência"],
    benefits: ["Acesso antecipado", "Feedback direto", "Comunidade"],
    examples: [
      "Testes de jogabilidade",
      "Relatórios de bugs",
      "Testes de usabilidade",
      "Validação de features"
    ],
    color: "orange"
  },
  {
    id: "community",
    title: "Comunidade",
    description: "Ajude a crescer e engajar nossa comunidade",
    icon: Users,
    difficulty: "iniciante",
    timeCommitment: "2-8h/semana",
    skills: ["Comunicação", "Redes sociais", "Moderação"],
    benefits: ["Networking", "Liderança", "Reconhecimento", "Experiência"],
    examples: [
      "Moderação de fóruns e Discord",
      "Criação de conteúdo para redes sociais",
      "Organização de eventos",
      "Suporte a novos membros"
    ],
    color: "rose"
  },
  {
    id: "content",
    title: "Conteúdo & Documentação",
    description: "Crie tutoriais, artigos e documentação",
    icon: BookOpen,
    difficulty: "iniciante",
    timeCommitment: "3-10h/semana",
    skills: ["Escrita", "Pesquisa", "Markdown", "Comunicação"],
    benefits: ["Portfólio", "Autoridade", "Networking", "Aprendizado"],
    examples: [
      "Tutoriais e guias",
      "Documentação técnica",
      "Artigos no blog",
      "Tradução de conteúdo"
    ],
    color: "blue"
  }
];

const currentOpportunities: ContributionOpportunity[] = [
  {
    title: "UI/UX Designer para Project Aurora",
    description: "Procuramos um designer para criar a interface do nosso próximo jogo RPG",
    type: "Design",
    urgency: "alta",
    skills: ["Figma", "Game UI", "UX Research"],
    reward: "Créditos + Portfólio + €500",
    deadline: "15 de Agosto"
  },
  {
    title: "Desenvolvedor React para Dashboard",
    description: "Implementar dashboard administrativo para a Creator Platform",
    type: "Desenvolvimento",
    urgency: "media",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    reward: "Código open source + Referência",
    deadline: "30 de Agosto"
  },
  {
    title: "Compositor para Trilha Sonora",
    description: "Criar música ambiente para fases do jogo Neon Runners",
    type: "Áudio",
    urgency: "baixa",
    skills: ["Composição", "Synthwave", "Game Audio"],
    reward: "Royalties + Créditos",
    deadline: "10 de Setembro"
  },
  {
    title: "Community Manager",
    description: "Gerenciar comunidade Discord e organizar eventos mensais",
    type: "Comunidade",
    urgency: "alta",
    skills: ["Discord", "Eventos", "Comunicação"],
    reward: "Posição remunerada + Benefícios"
  },
  {
    title: "Tester Beta para Mobile App",
    description: "Testar nova versão do Creative Hub antes do lançamento",
    type: "Testes",
    urgency: "media",
    skills: ["Mobile Testing", "Bug Reports"],
    reward: "Acesso vitalício + Reconhecimento"
  }
];

const rewards = [
  {
    title: "Reconhecimento Público",
    description: "Seu nome nos créditos e redes sociais",
    icon: Award,
    color: "text-yellow-400"
  },
  {
    title: "Acesso Antecipado",
    description: "Primeiro acesso a jogos e ferramentas",
    icon: Zap,
    color: "text-lime-400"
  },
  {
    title: "Networking Profissional",
    description: "Conexões com profissionais da indústria",
    icon: Handshake,
    color: "text-blue-400"
  },
  {
    title: "Portfólio e Experiência",
    description: "Projetos reais para seu portfólio",
    icon: FileText,
    color: "text-purple-400"
  },
  {
    title: "Mentoria e Feedback",
    description: "Orientação de desenvolvedores seniores",
    icon: Users,
    color: "text-cyan-400"
  },
  {
    title: "Recompensas Financeiras",
    description: "Pagamentos para contribuições significativas",
    icon: DollarSign,
    color: "text-green-400"
  }
];

export default function ContribuicoesPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "iniciante":
        return "bg-green-600";
      case "intermediario":
        return "bg-yellow-600";
      case "avancado":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "baixa":
        return "border-green-500 bg-green-500/10";
      case "media":
        return "border-yellow-500 bg-yellow-500/10";
      case "alta":
        return "border-red-500 bg-red-500/10";
      default:
        return "border-gray-500 bg-gray-500/10";
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-500/20 via-transparent to-cyan-500/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.15),transparent_70%)]" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Badge variant="outline" className="mb-6 text-lime-400 border-lime-400 bg-lime-400/10 text-lg px-4 py-2">
              <Heart className="w-5 h-5 mr-2" />
              Junte-se à Revolução
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-lime-400 via-cyan-400 to-lime-400 bg-clip-text text-transparent">
              Contribua
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Seja parte da <span className="text-lime-400 font-semibold">comunidade SystemPunk</span> e ajude a criar{" "}
              <span className="text-cyan-400 font-semibold">experiências digitais extraordinárias</span> que inspiram o mundo
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-lime-600 hover:bg-lime-700 text-white px-8 py-4 text-lg"
                onClick={() => setActiveTab('opportunities')}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Ver Oportunidades
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-zinc-700 hover:bg-zinc-800 px-8 py-4 text-lg"
                onClick={() => setActiveTab('how-to')}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Como Contribuir
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-lime-400 mb-2">150+</div>
                <div className="text-zinc-400">Contribuidores</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">50+</div>
                <div className="text-zinc-400">Projetos Ativos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">25K+</div>
                <div className="text-zinc-400">Commits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">€10K+</div>
                <div className="text-zinc-400">Recompensas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-zinc-900 border-zinc-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-lime-600">
              <Star className="w-4 h-4 mr-2" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="how-to" className="data-[state=active]:bg-lime-600">
              <BookOpen className="w-4 h-4 mr-2" />
              Como Contribuir
            </TabsTrigger>
            <TabsTrigger value="opportunities" className="data-[state=active]:bg-lime-600">
              <Target className="w-4 h-4 mr-2" />
              Oportunidades
            </TabsTrigger>
            <TabsTrigger value="rewards" className="data-[state=active]:bg-lime-600">
              <Gift className="w-4 h-4 mr-2" />
              Recompensas
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-lime-200 mb-4">
                Por que Contribuir?
              </h2>
              <p className="text-zinc-400 text-lg max-w-3xl mx-auto">
                O SystemPunk é uma comunidade open source que acredita no poder da colaboração. 
                Juntos, criamos experiências que não seriam possíveis sozinhos.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contributionTypes.map((type) => (
                <Card 
                  key={type.id} 
                  className={`bg-zinc-900 border-zinc-800 hover:border-${type.color}-500/50 transition-all duration-300 cursor-pointer ${
                    selectedType === type.id ? `border-${type.color}-500` : ''
                  }`}
                  onClick={() => setSelectedType(selectedType === type.id ? null : type.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 bg-${type.color}-500/20 rounded-lg`}>
                        <type.icon className={`w-6 h-6 text-${type.color}-400`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{type.title}</h3>
                        <Badge className={getDifficultyColor(type.difficulty)}>
                          {type.difficulty}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-zinc-400 mb-4">{type.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-zinc-400" />
                        <span className="text-sm text-zinc-300">{type.timeCommitment}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {type.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-zinc-600">
                            {skill}
                          </Badge>
                        ))}
                        {type.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs border-zinc-600">
                            +{type.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {selectedType === type.id && (
                      <div className="mt-6 pt-4 border-t border-zinc-800">
                        <h4 className="text-sm font-semibold text-lime-200 mb-2">Exemplos de Contribuição:</h4>
                        <ul className="text-sm text-zinc-400 space-y-1">
                          {type.examples.map((example, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-3 h-3 text-lime-400 mt-0.5 flex-shrink-0" />
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* How To Tab */}
          <TabsContent value="how-to" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-lime-200 mb-4">
                Como Começar
              </h2>
              <p className="text-zinc-400 text-lg">
                Passos simples para se juntar à nossa comunidade de contribuidores
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-lime-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                      <h3 className="text-xl font-semibold text-white">Encontre sua Área</h3>
                    </div>
                    <p className="text-zinc-400 mb-4">
                      Explore as diferentes maneiras de contribuir e encontre algo que combine com suas habilidades e interesses.
                    </p>
                    <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800">
                      <Target className="w-4 h-4 mr-2" />
                      Explorar Áreas
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-lime-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                      <h3 className="text-xl font-semibold text-white">Junte-se à Comunidade</h3>
                    </div>
                    <p className="text-zinc-400 mb-4">
                      Entre no nosso Discord, siga-nos nas redes sociais e conheça outros contribuidores.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-zinc-700 hover:bg-zinc-800">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Discord
                      </Button>
                      <Button variant="outline" size="sm" className="border-zinc-700 hover:bg-zinc-800">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-lime-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                      <h3 className="text-xl font-semibold text-white">Comece Pequeno</h3>
                    </div>
                    <p className="text-zinc-400 mb-4">
                      Escolha uma tarefa inicial simples para se familiarizar com nossos processos e ferramentas.
                    </p>
                    <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Tarefas para Iniciantes
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-lime-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
                      <h3 className="text-xl font-semibold text-white">Receba Mentoria</h3>
                    </div>
                    <p className="text-zinc-400 mb-4">
                      Nossos membros experientes estão sempre dispostos a ajudar e orientar novos contribuidores.
                    </p>
                    <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800">
                      <Users className="w-4 h-4 mr-2" />
                      Encontrar Mentor
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-lime-600 rounded-full flex items-center justify-center text-white font-bold">5</div>
                      <h3 className="text-xl font-semibold text-white">Contribua Regularmente</h3>
                    </div>
                    <p className="text-zinc-400 mb-4">
                      Mantenha um ritmo consistente de contribuições para maximizar seu impacto e aprendizado.
                    </p>
                    <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800">
                      <Calendar className="w-4 h-4 mr-2" />
                      Planejar Contribuições
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-lime-600 rounded-full flex items-center justify-center text-white font-bold">6</div>
                      <h3 className="text-xl font-semibold text-white">Cresça Conosco</h3>
                    </div>
                    <p className="text-zinc-400 mb-4">
                      À medida que contribui, você pode assumir papéis de liderança e projetos mais desafiadores.
                    </p>
                    <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800">
                      <Rocket className="w-4 h-4 mr-2" />
                      Oportunidades Avançadas
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-lime-200 mb-4">
                Oportunidades Atuais
              </h2>
              <p className="text-zinc-400 text-lg">
                Projetos e posições em aberto que estão esperando por você
              </p>
            </div>

            <div className="space-y-6">
              {currentOpportunities.map((opportunity, index) => (
                <Card key={index} className={`bg-zinc-900 border-2 ${getUrgencyColor(opportunity.urgency)}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">{opportunity.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {opportunity.type}
                          </Badge>
                          <Badge className={
                            opportunity.urgency === 'alta' ? 'bg-red-600' :
                            opportunity.urgency === 'media' ? 'bg-yellow-600' : 'bg-green-600'
                          }>
                            {opportunity.urgency === 'alta' ? 'Urgente' : 
                             opportunity.urgency === 'media' ? 'Média' : 'Baixa'} Prioridade
                          </Badge>
                        </div>
                        <p className="text-zinc-400 mb-4">{opportunity.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-semibold text-lime-200 mb-2">Habilidades Necessárias</h4>
                        <div className="flex flex-wrap gap-1">
                          {opportunity.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="outline" className="text-xs border-zinc-600">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold text-lime-200 mb-2">Recompensa</h4>
                        <p className="text-zinc-300 text-sm">{opportunity.reward}</p>
                      </div>
                      
                      {opportunity.deadline && (
                        <div>
                          <h4 className="text-sm font-semibold text-lime-200 mb-2">Prazo</h4>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-zinc-400" />
                            <span className="text-zinc-300 text-sm">{opportunity.deadline}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-3">
                      <Button className="bg-lime-600 hover:bg-lime-700">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Candidatar-se
                      </Button>
                      <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Fazer Pergunta
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-lime-900/20 to-cyan-900/20 border-lime-500/30">
              <CardContent className="p-8 text-center">
                <Sparkles className="w-16 h-16 mx-auto mb-4 text-lime-400" />
                <h3 className="text-2xl font-bold text-lime-200 mb-4">
                  Não encontrou o que procura?
                </h3>
                <p className="text-zinc-300 mb-6">
                  Proponha seu próprio projeto ou ideia! Estamos sempre abertos a novas contribuições criativas.
                </p>
                <Button className="bg-lime-600 hover:bg-lime-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Propor Projeto
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-lime-200 mb-4">
                Recompensas e Benefícios
              </h2>
              <p className="text-zinc-400 text-lg">
                Reconhecemos e valorizamos cada contribuição para o SystemPunk
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {rewards.map((reward, index) => (
                <Card key={index} className="bg-zinc-900 border-zinc-800 hover:border-lime-500/50 transition-colors">
                  <CardContent className="p-6 text-center">
                    <reward.icon className={`w-12 h-12 mx-auto mb-4 ${reward.color}`} />
                    <h3 className="text-lg font-semibold text-white mb-2">{reward.title}</h3>
                    <p className="text-zinc-400">{reward.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-lime-200">Sistema de Pontos</CardTitle>
                  <CardDescription>
                    Ganhe pontos por suas contribuições e troque por recompensas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-300">Bug Report</span>
                    <span className="text-lime-400 font-semibold">+10 pontos</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-300">Feature Implementation</span>
                    <span className="text-lime-400 font-semibold">+100 pontos</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-300">Design Asset</span>
                    <span className="text-lime-400 font-semibold">+50 pontos</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-300">Tutorial/Artigo</span>
                    <span className="text-lime-400 font-semibold">+75 pontos</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-lime-200">Níveis de Contribuidor</CardTitle>
                  <CardDescription>
                    Progrida através dos níveis e desbloqueie novos benefícios
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-zinc-300">Iniciante (0-100 pontos)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-zinc-300">Contribuidor (100-500 pontos)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-zinc-300">Veterano (500-1000 pontos)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-lime-500 rounded-full"></div>
                    <span className="text-zinc-300">Expert (1000+ pontos)</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-lime-900/20 to-cyan-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-lime-200 mb-6">
            Pronto para Começar?
          </h2>
          <p className="text-zinc-300 text-lg mb-8">
            Junte-se a centenas de desenvolvedores, designers e criadores que estão 
            construindo o futuro das experiências digitais
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-lime-600 hover:bg-lime-700 px-8">
              <Heart className="w-5 h-5 mr-2" />
              Começar Agora
            </Button>
            <Button size="lg" variant="outline" className="border-zinc-700 hover:bg-zinc-800 px-8">
              <MessageCircle className="w-5 h-5 mr-2" />
              Falar com a Comunidade
            </Button>
          </div>
          
          <div className="flex justify-center gap-6">
            <Button variant="ghost" size="sm">
              <Github className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Twitter className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Linkedin className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

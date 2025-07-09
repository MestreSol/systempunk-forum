"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Target,
  Star,
  Heart,
  Zap,
  Code,
  Clock
} from "lucide-react";

// Import components
import { HeroSection } from "@/components/about/HeroSection";
import { StatsSection } from "@/components/about/StatsSection";
import { TechnologyCards } from "@/components/about/TechnologyCards";
import { Timeline } from "@/components/about/Timeline";
import { TeamSection } from "@/components/about/TeamSection";
import { ProjectsTeaser } from "@/components/about/ProjectsTeaser";
import { ContactCTA } from "@/components/about/ContactCTA";

// Import constants
import { teamMembers, milestones, introStats, technologies } from "@/components/about/constants";

export default function IntroducaoPage() {
  const [activeTab, setActiveTab] = useState("sobre");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero Section */}
      <HeroSection 
        isVisible={isVisible} 
        onExploreClick={() => scrollToSection('projetos')}
        onTeamClick={() => scrollToSection('equipe')}
      />

      {/* Statistics */}
      <StatsSection stats={introStats} />

      <div className="max-w-6xl mx-auto px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="py-16">
          <TabsList className="grid w-full grid-cols-4 bg-zinc-900 border-zinc-800">
            <TabsTrigger value="sobre" className="data-[state=active]:bg-lime-600">
              <Target className="w-4 h-4 mr-2" />
              Sobre Nós
            </TabsTrigger>
            <TabsTrigger value="missao" className="data-[state=active]:bg-lime-600">
              <Heart className="w-4 h-4 mr-2" />
              Missão
            </TabsTrigger>
            <TabsTrigger value="tecnologias" className="data-[state=active]:bg-lime-600">
              <Code className="w-4 h-4 mr-2" />
              Tech Stack
            </TabsTrigger>
            <TabsTrigger value="historia" className="data-[state=active]:bg-lime-600">
              <Clock className="w-4 h-4 mr-2" />
              História
            </TabsTrigger>
          </TabsList>

          {/* Sobre Nós Tab */}
          <TabsContent value="sobre" className="mt-8 space-y-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-4xl font-bold text-lime-200 mb-6">
                  Quem Somos
                </h2>
                <div className="space-y-4 text-zinc-300 leading-relaxed">
                  <p>
                    O <strong className="text-lime-400">SystemPunk</strong> é um coletivo criativo 
                    que nasceu da paixão por unir tecnologia de ponta com narrativas envolventes 
                    e design inovador.
                  </p>
                  <p>
                    Somos desenvolvedores, designers, artistas e sonhadores que acreditam 
                    no poder da tecnologia para criar experiências que tocam o coração 
                    e expandem horizontes.
                  </p>
                  <p>
                    Nosso trabalho abrange desde jogos indie revolucionários até 
                    aplicações web que redefinem a interação digital, sempre 
                    mantendo a <span className="text-cyan-400">criatividade</span> e 
                    a <span className="text-lime-400">inovação</span> no centro de tudo.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-lime-500/20 to-cyan-500/20 rounded-2xl p-8">
                  <div className="w-full h-full bg-zinc-800 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <Zap className="w-24 h-24 mx-auto mb-4 text-lime-400" />
                      <p className="text-zinc-400">Imagem do estúdio</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Missão Tab */}
          <TabsContent value="missao" className="mt-8">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <Target className="w-12 h-12 text-lime-400 mb-4" />
                  <CardTitle className="text-lime-200">Nossa Missão</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300">
                    Criar experiências digitais que inspirem, emocionem e conectem pessoas 
                    através da tecnologia e criatividade.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <Star className="w-12 h-12 text-cyan-400 mb-4" />
                  <CardTitle className="text-cyan-200">Nossa Visão</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300">
                    Ser reconhecido como um estúdio que quebra barreiras entre 
                    arte e tecnologia, criando o futuro das mídias interativas.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <Heart className="w-12 h-12 text-rose-400 mb-4" />
                  <CardTitle className="text-rose-200">Nossos Valores</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-zinc-300 space-y-2">
                    <li>• Criatividade sem limites</li>
                    <li>• Qualidade acima de tudo</li>
                    <li>• Colaboração e inclusão</li>
                    <li>• Inovação constante</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tecnologias Tab */}
          <TabsContent value="tecnologias" className="mt-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-lime-200 mb-4">
                Nossa Stack Tecnológica
              </h2>
              <p className="text-zinc-400 text-lg">
                Utilizamos as melhores tecnologias para criar experiências incríveis
              </p>
            </div>
            
            <TechnologyCards technologies={technologies} />
          </TabsContent>

          {/* História Tab */}
          <TabsContent value="historia" className="mt-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-lime-200 mb-4">
                Nossa Jornada
              </h2>
              <p className="text-zinc-400 text-lg">
                5 anos de evolução, criação e inovação
              </p>
            </div>
            
            <Timeline milestones={milestones} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Team Section */}
      <TeamSection members={teamMembers} />

      {/* Projects Teaser */}
      <ProjectsTeaser />

      {/* Contact CTA */}
      <ContactCTA />
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import { Search, Filter, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { allProjects } from "@/lib/data/projectsData";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectFilters from "@/components/projects/ProjectFilters";

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProjects = useMemo(() => {
    return allProjects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
      const matchesStatus = selectedStatus === "all" || project.status.toLowerCase() === selectedStatus.toLowerCase();
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, selectedCategory, selectedStatus]);

  const categories = ["all", "games", "books", "tools", "libraries"];
  const statuses = ["all", "released", "beta", "alpha", "development", "planning"];

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-lime-400 mb-4">Nossos Projetos</h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Explore nossa coleção completa de jogos, livros, ferramentas e bibliotecas. 
            Cada projeto é desenvolvido com paixão e dedicação para a comunidade.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
              <Input
                placeholder="Buscar projetos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-zinc-900 border-zinc-700 text-white placeholder-zinc-400"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-lime-600 hover:bg-lime-700" : "border-zinc-700 text-zinc-300 hover:bg-zinc-800"}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-lime-600 hover:bg-lime-700" : "border-zinc-700 text-zinc-300 hover:bg-zinc-800"}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Filters */}
          <ProjectFilters
            categories={categories}
            statuses={statuses}
            selectedCategory={selectedCategory}
            selectedStatus={selectedStatus}
            onCategoryChange={setSelectedCategory}
            onStatusChange={setSelectedStatus}
          />
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-zinc-400">
            Mostrando {filteredProjects.length} projeto{filteredProjects.length !== 1 ? 's' : ''} de {allProjects.length}
          </p>
          
          {/* Active Filters */}
          <div className="flex items-center gap-2">
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="bg-lime-600/20 text-lime-300 border-lime-500/30">
                {selectedCategory}
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="ml-2 hover:text-lime-100"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedStatus !== "all" && (
              <Badge variant="secondary" className="bg-lime-600/20 text-lime-300 border-lime-500/30">
                {selectedStatus}
                <button
                  onClick={() => setSelectedStatus("all")}
                  className="ml-2 hover:text-lime-100"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            : "space-y-6"
          }>
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <Card className="bg-zinc-900 border-zinc-800 text-center py-12">
            <CardContent>
              <div className="text-zinc-400 mb-4">
                <Filter className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nenhum projeto encontrado</h3>
                <p>Tente ajustar os filtros ou termo de busca para encontrar projetos.</p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedStatus("all");
                }}
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              >
                Limpar Filtros
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

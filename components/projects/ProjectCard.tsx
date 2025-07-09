import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Download, Star, Calendar, Book, Code, Wrench, Package } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/data/projectsData";

interface ProjectCardProps {
  project: Project;
  viewMode?: "grid" | "list";
}

const categoryIcons = {
  games: Package,
  books: Book,
  tools: Wrench,
  libraries: Code
};

const categoryColors = {
  games: "bg-blue-600/20 text-blue-300 border-blue-500/30",
  books: "bg-purple-600/20 text-purple-300 border-purple-500/30",
  tools: "bg-orange-600/20 text-orange-300 border-orange-500/30",
  libraries: "bg-green-600/20 text-green-300 border-green-500/30"
};

export default function ProjectCard({ project, viewMode = "grid" }: ProjectCardProps) {
  const CategoryIcon = categoryIcons[project.category];
  
  if (viewMode === "list") {
    return (
      <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Image */}
            <div className="w-full lg:w-48 aspect-video bg-zinc-800 rounded-lg overflow-hidden relative flex-shrink-0">
              {project.featured && (
                <div className="absolute top-3 left-3 z-10">
                  <Badge className="bg-lime-600 text-white font-semibold">
                    ⭐ Em Destaque
                  </Badge>
                </div>
              )}
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={categoryColors[project.category]}>
                    <CategoryIcon className="w-3 h-3 mr-1" />
                    {project.category}
                  </Badge>
                  <Badge variant="secondary" className="bg-lime-600/20 text-lime-300 border-lime-500/30">
                    {project.status}
                  </Badge>
                </div>
                {project.rating && (
                  <div className="flex items-center gap-1 text-xs text-zinc-400">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {project.rating}
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold text-lime-200 mb-2">{project.name}</h3>
              <p className="text-zinc-400 text-sm mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-1 mb-4">
                {project.tags.slice(0, 5).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs border-zinc-600 text-zinc-300">
                    {tag}
                  </Badge>
                ))}
                {project.tags.length > 5 && (
                  <Badge variant="outline" className="text-xs border-zinc-600 text-zinc-300">
                    +{project.tags.length - 5}
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  {project.downloads && (
                    <span className="flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      {project.downloads}
                    </span>
                  )}
                  {project.releaseDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(project.releaseDate).toLocaleDateString('pt-BR')}
                    </span>
                  )}
                  {project.version && (
                    <span>v{project.version}</span>
                  )}
                </div>
                <Link href={`/projects/${project.id}`}>
                  <Button size="sm" className="bg-lime-600 hover:bg-lime-700">
                    Ver Detalhes
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all duration-300 ${project.featured ? 'ring-2 ring-lime-500/20' : ''}`}>
      <CardHeader className="p-0">
        <div className="aspect-video bg-zinc-800 rounded-t-lg overflow-hidden relative z-0">
          {project.featured && (
            <div className="absolute top-3 left-3 z-10">
              <Badge className="bg-lime-600 text-white font-semibold">
                ⭐ Em Destaque
              </Badge>
            </div>
          )}
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={categoryColors[project.category]}>
              <CategoryIcon className="w-3 h-3 mr-1" />
              {project.category}
            </Badge>
          </div>
          {project.rating && (
            <div className="flex items-center gap-1 text-xs text-zinc-400">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              {project.rating}
            </div>
          )}
        </div>

        <Badge variant="secondary" className="bg-lime-600/20 text-lime-300 border-lime-500/30 mb-3">
          {project.status}
        </Badge>

        <h3 className="text-xl font-bold text-lime-200 mb-2">{project.name}</h3>
        <p className="text-zinc-400 text-sm mb-4 line-clamp-3">{project.description}</p>

        <div className="flex flex-wrap gap-1 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs border-zinc-600 text-zinc-300">
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge variant="outline" className="text-xs border-zinc-600 text-zinc-300">
              +{project.tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            {project.downloads && (
              <>
                <Download className="w-3 h-3" />
                {project.downloads}
              </>
            )}
            {project.pages && (
              <>
                <Book className="w-3 h-3" />
                {project.pages}p
              </>
            )}
          </div>
          <Link href={`/projects/${project.id}`}>
            <Button size="sm" className="bg-lime-600 hover:bg-lime-700">
              Ver Projeto
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

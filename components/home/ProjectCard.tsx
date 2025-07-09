import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Download, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  image: string;
  tags: string[];
  downloads: string;
  rating: number;
  featured: boolean;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
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
          <Badge variant="secondary" className="bg-lime-600/20 text-lime-300 border-lime-500/30">
            {project.status}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-zinc-400">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {project.rating}
          </div>
        </div>

        <h3 className="text-xl font-bold text-lime-200 mb-2">{project.name}</h3>
        <p className="text-zinc-400 text-sm mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-1 mb-4">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs border-zinc-600 text-zinc-300">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Download className="w-3 h-3" />
            {project.downloads}
          </div>
          <Link href={`/projects/jogo`}>
            <Button size="sm" className="bg-lime-600 hover:bg-lime-700">
              Ver Projeto
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

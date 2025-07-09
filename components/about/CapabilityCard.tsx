import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

interface Capability {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  technologies: string[];
  strength: number;
}

interface CapabilityCardProps {
  capability: Capability;
}

export function CapabilityCard({ capability }: CapabilityCardProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 hover:border-lime-500/50 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-lime-500/20 rounded-lg flex-shrink-0">
            <capability.icon className="w-6 h-6 text-lime-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2">{capability.title}</h3>
            <p className="text-zinc-400 mb-4">{capability.description}</p>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-zinc-300">Nível de Expertise</span>
                <span className="text-sm text-lime-400 font-semibold">{capability.strength}%</span>
              </div>
              <Progress value={capability.strength} className="h-2" />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {capability.technologies.map((tech, techIndex) => (
                <Badge key={techIndex} variant="outline" className="text-xs border-zinc-600">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

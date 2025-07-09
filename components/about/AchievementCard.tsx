import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface Achievement {
  title: string;
  description: string;
  date: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  status: "completed" | "in-progress" | "planned";
}

interface AchievementCardProps {
  achievement: Achievement;
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-600 hover:bg-green-700">Concluído</Badge>;
      case "in-progress":
        return <Badge className="bg-yellow-600 hover:bg-yellow-700">Em Andamento</Badge>;
      case "planned":
        return <Badge className="bg-blue-600 hover:bg-blue-700">Planejado</Badge>;
      default:
        return <Badge variant="outline">Status</Badge>;
    }
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800 hover:border-lime-500/30 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-lime-500/20 rounded-lg flex-shrink-0">
            <achievement.icon className="w-6 h-6 text-lime-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-semibold text-white">{achievement.title}</h3>
              {getStatusBadge(achievement.status)}
            </div>
            <p className="text-zinc-400 mb-3">{achievement.description}</p>
            <div className="flex items-center gap-4 text-sm text-zinc-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {achievement.date}
              </span>
              <Badge variant="outline" className="text-xs">
                {achievement.category}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

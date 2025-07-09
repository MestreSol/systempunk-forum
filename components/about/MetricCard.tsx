import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Activity } from "lucide-react";

interface MetricCardProps {
  metric: {
    label: string;
    current: number;
    previous: number;
    unit: string;
    trend: "up" | "down" | "stable";
    icon: React.ComponentType<{ className?: string }>;
  };
}

export function MetricCard({ metric }: MetricCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case "down":
        return <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />;
      default:
        return <Activity className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-400";
      case "down":
        return "text-red-400";
      default:
        return "text-yellow-400";
    }
  };

  const growthPercentage = Math.abs(((metric.current - metric.previous) / metric.previous) * 100);

  return (
    <Card className="bg-zinc-900 border-zinc-800 hover:border-lime-500/30 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <metric.icon className="w-8 h-8 text-lime-400" />
          {getTrendIcon(metric.trend)}
        </div>
        <div className="space-y-2">
          <p className="text-zinc-400 text-sm">{metric.label}</p>
          <p className="text-2xl font-bold text-white">
            {typeof metric.current === 'number' && metric.current > 1000 
              ? formatNumber(metric.current) 
              : metric.current}
            <span className="text-lg text-zinc-400">{metric.unit}</span>
          </p>
          <p className={`text-sm ${getTrendColor(metric.trend)}`}>
            {metric.trend === 'up' ? '+' : metric.trend === 'down' ? '-' : ''}
            {growthPercentage.toFixed(1)}%
            <span className="text-zinc-500 ml-1">vs período anterior</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

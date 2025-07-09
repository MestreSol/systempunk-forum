import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface SummaryCardProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  titleColor: string;
  children: React.ReactNode;
}

export function SummaryCard({ title, icon: Icon, iconColor, titleColor, children }: SummaryCardProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Icon className={`w-6 h-6 ${iconColor}`} />
          <CardTitle className={titleColor}>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}

interface ValueListProps {
  values: string[];
}

export function ValueList({ values }: ValueListProps) {
  return (
    <ul className="text-zinc-300 space-y-2">
      {values.map((value, index) => (
        <li key={index} className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-lime-400 flex-shrink-0" />
          {value}
        </li>
      ))}
    </ul>
  );
}

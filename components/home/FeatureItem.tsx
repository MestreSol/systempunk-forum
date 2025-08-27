import { LucideIcon } from "lucide-react";

interface FeatureItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureItem({ icon: Icon, title, description }: FeatureItemProps) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-lime-600 rounded-full mb-4">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-lime-400 mb-2">{title}</h3>
      <p className="text-primary-400">{description}</p>
    </div>
  );
}

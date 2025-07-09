import { ArrowLeft, Building2 } from "lucide-react";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  description: string;
  backLink?: {
    href: string;
    label: string;
  };
  isVisible: boolean;
}

export function PageHeader({ title, description, backLink, isVisible }: PageHeaderProps) {
  return (
    <section className="py-12 px-6 bg-gradient-to-br from-zinc-900 to-zinc-950">
      <div className="max-w-6xl mx-auto">
        {backLink && (
          <Link href={backLink.href} className="inline-flex items-center text-lime-400 hover:text-lime-300 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {backLink.label}
          </Link>
        )}
        
        <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-lime-500/20 rounded-xl">
              <Building2 className="w-8 h-8 text-lime-400" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-lime-200 mb-2">
                {title}
              </h1>
              <p className="text-zinc-400 text-lg">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

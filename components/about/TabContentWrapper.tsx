import { ReactNode } from "react";

interface TabContentWrapperProps {
  children: ReactNode;
  className?: string;
}

export function TabContentWrapper({ children, className = "" }: TabContentWrapperProps) {
  return (
    <div className={`space-y-8 ${className}`}>
      {children}
    </div>
  );
}

interface TabSectionHeaderProps {
  title: string;
  description: string;
  className?: string;
}

export function TabSectionHeader({ title, description, className = "" }: TabSectionHeaderProps) {
  return (
    <div className={`text-center mb-8 ${className}`}>
      <h2 className="text-3xl font-bold text-lime-200 mb-4">{title}</h2>
      <p className="text-zinc-400 text-lg max-w-2xl mx-auto">{description}</p>
    </div>
  );
}

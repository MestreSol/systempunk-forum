import { ReactNode } from "react";
import Link from "next/link";
import { 
  Home, 
  FolderPlus, 
  FileText, 
  Settings, 
  Users, 
  BarChart3,
  LogOut
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Projetos', href: '/admin/projects', icon: FolderPlus },
    { name: 'Notícias', href: '/admin/news', icon: FileText },
    { name: 'Equipe', href: '/admin/team', icon: Users },
    { name: 'Relatórios', href: '/admin/reports', icon: BarChart3 },
    { name: 'Configurações', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800">
        <div className="p-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-lime-500 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">SP</span>
            </div>
            <span className="text-lime-400 font-bold text-lg">SystemPunk Admin</span>
          </Link>
        </div>

        <nav className="px-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2 text-sm font-medium text-zinc-300 rounded-md hover:bg-zinc-800 hover:text-lime-400 transition-colors"
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Link
            href="/"
            className="flex items-center px-3 py-2 text-sm font-medium text-zinc-400 rounded-md hover:bg-zinc-800 hover:text-red-400 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Voltar ao Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

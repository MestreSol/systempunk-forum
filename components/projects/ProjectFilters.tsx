import { Badge } from "@/components/ui/badge";

interface ProjectFiltersProps {
  categories: string[];
  statuses: string[];
  selectedCategory: string;
  selectedStatus: string;
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
}

const categoryLabels: Record<string, string> = {
  all: 'Todos',
  games: 'Jogos',
  books: 'Livros',
  tools: 'Ferramentas',
  libraries: 'Bibliotecas'
};

const statusLabels: Record<string, string> = {
  all: 'Todos',
  released: 'Lançado',
  beta: 'Beta',
  alpha: 'Alpha',
  development: 'Desenvolvimento',
  planning: 'Planejamento'
};

export default function ProjectFilters({
  categories,
  statuses,
  selectedCategory,
  selectedStatus,
  onCategoryChange,
  onStatusChange
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Category Filters */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-400">Categoria:</label>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className="transition-all duration-200"
            >
              <Badge
                variant={selectedCategory === category ? "default" : "outline"}
                className={
                  selectedCategory === category
                    ? "bg-lime-600 text-white hover:bg-lime-700"
                    : "border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-500"
                }
              >
                {categoryLabels[category] || category}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Status Filters */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-400">Status:</label>
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => onStatusChange(status)}
              className="transition-all duration-200"
            >
              <Badge
                variant={selectedStatus === status ? "default" : "outline"}
                className={
                  selectedStatus === status
                    ? "bg-lime-600 text-white hover:bg-lime-700"
                    : "border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-500"
                }
              >
                {statusLabels[status] || status}
              </Badge>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

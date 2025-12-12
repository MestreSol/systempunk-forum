import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ExpansionItem } from '@/types/ExpansionItem.type'

interface ExpansionPlansProps {
  items: ExpansionItem[]
  title: string
  icon: React.ComponentType<{ className?: string }>
}

export function ExpansionPlans({
  items,
  title,
  icon: Icon
}: ExpansionPlansProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-lime-200 flex items-center gap-3">
          <Icon className="w-6 h-6" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-4 bg-zinc-800 rounded-lg"
          >
            <item.icon className={`w-6 h-6 ${item.color}`} />
            <div>
              <h4 className="font-semibold text-white">{item.title}</h4>
              <p className="text-zinc-400 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

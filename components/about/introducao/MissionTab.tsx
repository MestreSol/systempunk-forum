import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { missionCards } from './data'

export function MissionTab() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {missionCards.map(
        ({ icon: Icon, title, iconClass, titleClass, text, items }) => (
          <Card key={title} className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <Icon className={`w-12 h-12 mb-4 ${iconClass}`} />
              <CardTitle className={titleClass}>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              {text && <p className="text-zinc-300">{text}</p>}
              {items && (
                <ul className="text-zinc-300 space-y-2">
                  {items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        )
      )}
    </div>
  )
}

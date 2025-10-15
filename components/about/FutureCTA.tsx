import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Rocket, Users, Coffee } from 'lucide-react'

export function FutureCTA() {
  return (
    <Card className="bg-gradient-to-r from-lime-900/20 to-cyan-900/20 border-lime-500/30">
      <CardContent className="p-8 text-center">
        <Rocket className="w-16 h-16 mx-auto mb-4 text-lime-400" />
        <h3 className="text-2xl font-bold text-lime-200 mb-4">
          Junte-se à Nossa Jornada
        </h3>
        <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
          Estamos sempre em busca de talentos apaixonados por tecnologia e
          criatividade. Venha fazer parte do futuro das experiências digitais!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-lime-600 hover:bg-lime-700">
            <Users className="w-4 h-4 mr-2" />
            Ver Vagas Abertas
          </Button>
          <Button
            variant="outline"
            className="border-zinc-700 hover:bg-zinc-800"
          >
            <Coffee className="w-4 h-4 mr-2" />
            Conhecer a Equipe
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

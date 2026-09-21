import Link from 'next/link'
import { Newspaper } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedText } from './text-effects'

export function JogosCTA() {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-lime-900/20 to-cyan-900/20">
      <div className="max-w-3xl mx-auto text-center">
        <AnimatedText
          as="h2"
          text="Quer acompanhar os lançamentos?"
          className="block text-3xl md:text-4xl font-bold text-lime-200 mb-4"
        />
        <AnimatedText
          as="p"
          text="Novidades, builds e bastidores dos nossos jogos saem primeiro nas notícias."
          delay={200}
          stagger={30}
          className="block text-zinc-300 text-lg mb-8"
        />
        <Button asChild size="lg" className="bg-lime-600 hover:bg-lime-500 px-8">
          <Link href="/news">
            <Newspaper className="w-5 h-5 mr-2" />
            Ver notícias
          </Link>
        </Button>
      </div>
    </section>
  )
}

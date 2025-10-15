'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Users, Globe } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-lime-900/20 to-background-900">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-lime-400 mb-4">
          Junte-se à Nossa Comunidade
        </h2>
        <p className="text-xl text-primary-300 mb-8 max-w-2xl mx-auto">
          Faça parte da jornada SystemPunk. Descubra novos jogos, participe de
          discussões e contribua com o desenvolvimento dos nossos projetos.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contribuicoes">
            <Button
              size="lg"
              className="bg-lime-600 hover:bg-lime-700 text-white font-semibold"
            >
              <Users className="w-5 h-5 mr-2" />
              Contribuir
            </Button>
          </Link>
          <Link href="/about">
            <Button
              size="lg"
              variant="outline"
              className="border-background-700 text-primary-300 hover:bg-background-800"
            >
              <Globe className="w-5 h-5 mr-2" />
              Sobre Nós
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

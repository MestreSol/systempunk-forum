'use client'

import React from 'react'
import FeatureItem from './FeatureItem'

export default function WhySection({ features }: { features: any[] }) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-lime-400 mb-4">
            Por que Systempunk?
          </h2>
          <p className="text-xl text-background-400 max-w-2xl mx-auto">
            Somos apaixonados por criar experiências únicas e memoráveis para
            nossos jogadores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

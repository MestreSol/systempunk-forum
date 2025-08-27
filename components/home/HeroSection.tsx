"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Gamepad2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface StatItem {
  label: string;
  value: string;
}

interface HeroSectionProps {
  stats: StatItem[];
}

export default function HeroSection({ stats }: HeroSectionProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Trailer.png"
          alt="SystemPunk Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-lime-400 via-green-500 to-lime-400 bg-clip-text text-transparent drop-shadow-lg">
            SystemPunk
          </h1>
          
          <p className="text-2xl lg:text-3xl text-white mb-4 max-w-4xl mx-auto font-medium drop-shadow-lg">
            Desenvolvemos jogos únicos e experiências interativas
          </p>
          <p className="text-lg lg:text-xl text-zinc-300 mb-12 max-w-3xl mx-auto drop-shadow-md">
            Bem-vindo ao futuro dos jogos independentes. Descubra mundos únicos, mecânicas inovadoras e histórias envolventes.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/projects">
              <Button size="lg" className="bg-lime-600 hover:bg-lime-700 text-white font-semibold px-8 py-4 text-lg shadow-2xl hover:shadow-lime-600/25 transition-all duration-300 transform hover:scale-105">
                <Gamepad2 className="w-6 h-6 mr-3" />
                Explorar Jogos
              </Button>
            </Link>
            <Link href="/news">
              <Button size="lg" variant="outline" className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50 px-8 py-4 text-lg shadow-2xl transition-all duration-300 transform hover:scale-105">
                <Calendar className="w-6 h-6 mr-3" />
                Últimas Notícias
              </Button>
            </Link>
          </div>
          
          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.slice(0, 4).map((stat, index) => (
              <div key={index} className="text-center bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="text-2xl lg:text-3xl font-bold text-lime-400 mb-1">{stat.value}</div>
                <div className="text-sm text-zinc-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import { Mail, Coffee, Github, Twitter, Linkedin, Instagram } from "lucide-react";

export function ContactCTA() {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-lime-900/20 to-cyan-900/20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-lime-200 mb-6">
          Vamos Criar Algo Incrível Juntos?
        </h2>
        <p className="text-zinc-300 text-lg mb-8">
          Estamos sempre abertos a novas colaborações, ideias e projetos desafiadores
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-lime-600 hover:bg-lime-700 px-8">
            <Mail className="w-5 h-5 mr-2" />
            Entre em Contato
          </Button>
          <Button size="lg" variant="outline" className="border-zinc-700 hover:bg-zinc-800 px-8">
            <Coffee className="w-5 h-5 mr-2" />
            Agendar um Café
          </Button>
        </div>
        
        <div className="flex justify-center gap-6 mt-8">
          <Button variant="ghost" size="sm">
            <Github className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <Twitter className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <Linkedin className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <Instagram className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

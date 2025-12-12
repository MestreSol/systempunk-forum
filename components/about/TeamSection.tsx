import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, Github, Twitter, Linkedin, Instagram } from 'lucide-react'

interface TeamMember {
  name: string
  role: string
  specialties: string[]
  bio: string
  socials: {
    github?: string
    twitter?: string
    linkedin?: string
    instagram?: string
  }
}

interface TeamSectionProps {
  members: TeamMember[]
}

export function TeamSection({ members }: TeamSectionProps) {
  return (
    <section id="equipe" className="py-16 px-6 bg-zinc-900/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-lime-200 mb-4">
            Nossa Equipe
          </h2>
          <p className="text-zinc-400 text-lg">
            Conheça as mentes criativas por trás dos nossos projetos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <Card
              key={index}
              className="bg-zinc-900 border-zinc-800 hover:border-lime-500/50 transition-all duration-300 group"
            >
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-lime-400 to-cyan-400 rounded-full p-0.5">
                  <div className="w-full h-full bg-zinc-800 rounded-full flex items-center justify-center">
                    <Users className="w-12 h-12 text-lime-400" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-lime-400 text-sm mb-3">{member.role}</p>
                <p className="text-zinc-400 text-sm mb-4">{member.bio}</p>

                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {member.specialties.map((specialty, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="text-xs border-zinc-600 text-zinc-300"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-center gap-3">
                  {member.socials.github && (
                    <Button size="sm" variant="ghost" className="p-2">
                      <Github className="w-4 h-4" />
                    </Button>
                  )}
                  {member.socials.twitter && (
                    <Button size="sm" variant="ghost" className="p-2">
                      <Twitter className="w-4 h-4" />
                    </Button>
                  )}
                  {member.socials.linkedin && (
                    <Button size="sm" variant="ghost" className="p-2">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                  )}
                  {member.socials.instagram && (
                    <Button size="sm" variant="ghost" className="p-2">
                      <Instagram className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

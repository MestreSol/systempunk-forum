import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, Github, Twitter, Linkedin, Instagram } from 'lucide-react'
import PortifyIcon from '@/components/ui/icons/Portify'

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
    portify?: string
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

        <div className="grid justify-items-center md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => {
            const githubUrl = member.socials.github
              ? member.socials.github.startsWith('http')
                ? member.socials.github
                : `https://github.com/${member.socials.github}`
              : undefined

            const portifyUrl = member.socials.portify
              ? member.socials.portify.startsWith('http')
                ? member.socials.portify
                : `https://portify.com/${member.socials.portify}`
              : undefined

            return (
            <Card
              key={index}
              className="w-full max-w-xs bg-zinc-900 border-zinc-800 hover:border-lime-500/50 transition-all duration-300 group"
            >
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-lime-400 to-cyan-400 rounded-full p-0.5">
                  <div className="w-full h-full bg-zinc-800 rounded-full flex items-center justify-center overflow-hidden">
                    {member.avatar ? (
                      <img
                        src={member.avatar.startsWith('/public/') ? member.avatar.replace('/public', '') : member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <Users className="w-12 h-12 text-lime-400" />
                    )}
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
                  {githubUrl && (
                    <Button size="sm" variant="ghost" className="p-2" asChild>
                      <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  {member.socials.twitter && (
                    <Button size="sm" variant="ghost" className="p-2" asChild>
                      <a href={`https://twitter.com/${member.socials.twitter}`} target="_blank" rel="noopener noreferrer">
                        <Twitter className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  {member.socials.linkedin && (
                    <Button size="sm" variant="ghost" className="p-2" asChild>
                      <a href={`https://linkedin.com/in/${member.socials.linkedin}`} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  {member.socials.instagram && (
                    <Button size="sm" variant="ghost" className="p-2" asChild>
                      <a href={`https://instagram.com/${member.socials.instagram}`} target="_blank" rel="noopener noreferrer">
                        <Instagram className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  {portifyUrl && (
                    <Button size="sm" variant="ghost" className="p-2" asChild>
                      <a href={portifyUrl} target="_blank" rel="noopener noreferrer">
                        <PortifyIcon className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { slugify } from '@/lib/utils'
import type {
  ProjectNewsCard,
  ProjectTeamMember
} from '@/types/ProjectDetail.type'
import { Reveal } from './common'

export function NewsCards({ items }: { items: ProjectNewsCard[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {items.map((news, i) => (
        <Reveal key={news.title} delay={i * 100}>
          <Link
            href={`/news/${slugify(news.title)}`}
            className="group block h-full rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all hover:-translate-y-1 hover:border-lime-500/60 hover:shadow-xl hover:shadow-lime-500/10"
          >
            <div className="flex flex-wrap gap-1 mb-3">
              {news.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <h3 className="font-semibold text-lg text-lime-100 mb-1">
              {news.title}
            </h3>
            <p className="text-zinc-400 text-sm mb-4">{news.subtitle}</p>
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span>
                {news.year} · {news.readingTime}
              </span>
              <span className="flex items-center gap-1 text-lime-400 transition-all group-hover:gap-2">
                Ler <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  )
}

export function TeamGrid({ members }: { members: ProjectTeamMember[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {members.map((member, i) => (
        <Reveal key={member.name} delay={i * 80}>
          <div className="h-full rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center transition-all hover:-translate-y-1 hover:border-lime-500/60">
            <Avatar className="w-20 h-20 mx-auto mb-3 ring-2 ring-lime-500/40">
              <AvatarImage src={member.photo} alt={member.name} />
              <AvatarFallback>
                {member.name
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-lime-100">{member.name}</h3>
            <div className="text-xs text-cyan-300 mb-2">{member.role}</div>
            <p className="text-zinc-500 text-xs">{member.description}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

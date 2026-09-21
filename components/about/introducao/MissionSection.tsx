import { SectionHeading } from './SectionHeading'
import { accentClasses, missionCards } from './data'

export function MissionSection() {
  return (
    <section id="missao" className="py-20 px-6 bg-zinc-900/40 scroll-mt-14">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="propósito"
          title="O que nos move"
          subtitle="Missão, visão e valores que guiam cada projeto."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {missionCards.map(({ icon: Icon, title, accent, text, items }) => {
            const c = accentClasses[accent]
            return (
              <article
                key={title}
                className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-8"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${c.bar} to-transparent`}
                />
                <div
                  className={`inline-flex p-3 rounded-xl border mb-5 ${c.icon}`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {title}
                </h3>
                {text && <p className="text-zinc-400 leading-relaxed">{text}</p>}
                {items && (
                  <ul className="space-y-2 text-zinc-400">
                    {items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className={c.dot}>▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

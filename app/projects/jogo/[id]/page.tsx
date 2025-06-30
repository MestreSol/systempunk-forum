import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface Hero {
  image: string;
  title: string;
  subtitle: string;
}

interface FastDescription {
  description: string;
  video: string;
}

interface NewsCard {
  tags: string[];
  title: string;
  subtitle: string;
  image: string;
  year: number;
  readingTime: string;
}

interface LoreSection {
  title: string;
  description: string;
  image: string;
}

interface Footer {
  company: string;
  rating: string;
  platforms: string[];
  copyright: string;
}

interface GameData {
  hero: Hero;
  platforms: string[];
  fastDescription: FastDescription;
  lastNews: NewsCard[];
  lore: LoreSection[];
  media: string[];
  footer: Footer;
  customCss?: string;
}

async function getGameData(id: string): Promise<GameData> {
  const filePath = path.join(process.cwd(), 'public', 'projects', 'jogo', `${id}.json`);
  try {
    const json = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(json) as GameData;
  } catch (e) {
    console.error(`Error reading game data for ID ${id}:`, e);
    console.error(`Error reading game data for ID ${id}:`, e);
    throw new Error('not-found');
  }
}

export default async function GamePage(props: { params: { id: string } }) {
  const { params } = props;
  let data: GameData;
  try {
    data = await getGameData(params.id);
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {data.customCss && (
        <link rel="stylesheet" href={data.customCss} />
      )}
      {/* HERO SECTION */}
      <section
        id="hero"
        className="relative flex flex-col items-center justify-center text-center min-h-[70vh] md:min-h-[90vh] w-full py-0 px-0 bg-gradient-to-b from-black to-zinc-900 overflow-hidden"
         style={{
            backgroundImage: `url(${data.hero.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
      >
        <div
          className="absolute inset-0 -z-10 opacity-50"
        >
        </div>
        <div className="relative z-10 max-w-2xl mx-auto pt-24 pb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-lg mb-4 animate-fade-in bg-gradient-to-r from-lime-400 to-green-500 bg-clip-text text-transparent">
            {data.hero.title}
          </h1>
          <p className="text-2xl md:text-3xl text-lime-200 mb-8 animate-fade-in delay-100">{data.hero.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {data.platforms.map((p) => (
              <span key={p} className="inline-flex items-center gap-2 bg-black/60 px-4 py-2 rounded-full text-lime-300 border border-lime-500 text-base shadow">
                <PlatformIcon name={p} />
                {p}
              </span>
            ))}
          </div>
          <a href="#fast-description" className="inline-block bg-lime-500 hover:bg-lime-600 text-black font-bold px-10 py-4 rounded-full text-xl shadow-lg transition-all animate-bounce">Jogar agora</a>
        </div>
      </section>

      {/* TRAILER & FAST DESCRIPTION */}
      <section className="py-16 px-4 flex flex-col md:flex-row gap-8 items-center max-w-5xl mx-auto" id="fast-description">
        <div className="flex-1 w-full max-w-xl">
          <div className="aspect-video rounded-lg overflow-hidden shadow-lg border border-lime-500">
            <iframe
              src={data.fastDescription.video}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              title="Trailer"
            />
          </div>
        </div>
        <div className="flex-1 text-lg text-zinc-100 bg-black/60 p-6 rounded-lg shadow">
          {data.fastDescription.description}
        </div>
      </section>

      {/* NEWS */}
      <section className="py-16 px-4 max-w-6xl mx-auto" id="news">
        <h2 className="text-3xl font-bold mb-6 text-lime-400">Últimas notícias</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.lastNews.map((n, idx) => (
            <article key={idx} className="bg-zinc-900 border border-lime-700 rounded-lg overflow-hidden shadow-lg flex flex-col">
              <div className="relative h-48">
                <Image src={n.image} alt={n.title} fill style={{objectFit:'cover'}} />
                <div className="absolute top-0 left-0 bg-black/70 text-lime-300 text-xs p-1 rounded-br">
                  {n.year} • {n.readingTime}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="mb-2 text-xs flex gap-1 flex-wrap">
                  {n.tags.map((t) => (
                    <span key={t} className="bg-lime-800/40 text-lime-300 px-2 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="font-bold text-lg text-lime-200 mb-1">{n.title}</h3>
                <p className="text-sm text-lime-100 flex-1">{n.subtitle}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FEATURES & SYSTEMS */}
      <section className="py-16 px-4 max-w-6xl mx-auto" id="features">
        <h2 className="text-3xl font-bold mb-6 text-lime-400">Sistemas e Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(data.systems || {}).map(([category, items]) => (
            <div key={category} className="bg-zinc-900 border border-lime-700 rounded-lg p-6 shadow-lg flex flex-col">
              <h3 className="text-xl font-semibold text-lime-300 mb-3 capitalize">{category.replace(/([A-Z])/g, ' $1')}</h3>
              <ul className="list-disc list-inside text-lime-100 text-base space-y-1">
                {(items as string[]).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* LORE (já existe, mas agora com título mais claro) */}
      <section className="py-16 px-4 max-w-5xl mx-auto" id="lore">
        <h2 className="text-3xl font-bold mb-6 text-lime-400">Lore e História</h2>
        {data.lore.map((l, idx) => (
          <div key={idx} className={`flex flex-col md:flex-row gap-8 mb-10 ${idx % 2 ? 'md:flex-row-reverse' : ''}`}>
            <Image src={l.image} alt={l.title} width={400} height={240} className="rounded-lg shadow-lg border border-lime-700" />
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold text-lime-200 mb-2">{l.title}</h3>
              <p className="text-lime-100 text-lg">{l.description}</p>
            </div>
          </div>
        ))}
      </section>

      {/* STATUS */}
      <section className="py-16 px-4 max-w-4xl mx-auto" id="status">
        <h2 className="text-3xl font-bold mb-6 text-lime-400">Status do Projeto</h2>
        <div className="bg-zinc-900 border border-lime-700 rounded-lg p-6 shadow-lg text-lime-100 text-lg">
          <p>Em desenvolvimento ativo. Última atualização: Junho de 2025.</p>
          <p>Versão Alpha disponível para testes fechados.</p>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="py-16 px-4 max-w-4xl mx-auto" id="roadmap">
        <h2 className="text-3xl font-bold mb-6 text-lime-400">Roadmap</h2>
        <div className="bg-zinc-900 border border-lime-700 rounded-lg p-6 shadow-lg">
          <ul className="list-disc list-inside text-lime-100 text-base space-y-2">
            <li>Q3 2025: Beta público e integração de feedback da comunidade</li>
            <li>Q4 2025: Lançamento oficial na Steam e PC</li>
            <li>2026: Novos modos de jogo, expansão de sistemas e suporte a mods</li>
          </ul>
        </div>
      </section>

      {/* GALERIA */}
      <section className="py-16 px-4 max-w-6xl mx-auto" id="media">
        <h2 className="text-3xl font-bold mb-6 text-lime-400">Galeria</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.media.map((img, idx) => (
            <Image key={idx} src={img} alt={`media-${idx}`} width={300} height={200} className="rounded-lg shadow border border-lime-700" />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-lime-300 bg-black/80 mt-10 border-t border-lime-800">
        <div className="mb-2 font-bold">{data.footer.company}</div>
        <div className="mb-2">{data.footer.platforms.join(', ')}</div>
        <div className="mb-2">{data.footer.rating}</div>
        <div className="text-xs">{data.footer.copyright}</div>
      </footer>
    </div>
  );
}

function PlatformIcon({ name }: { name: string }) {
  const icons: Record<string, string> = {
    steam: '/steam.svg',
    playstation: '/playstation.svg',
    xbox: '/xbox.svg',
    epic: '/epic.svg',
    'itch.io': '/itchio.svg',
  };
  const src = icons[name.toLowerCase()] || '/file.svg';
  return <Image src={src} alt={name} width={24} height={24} />;
}

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
    throw new Error('not-found');
  }
}

export default async function GamePage({ params }: { params: { id: string } }) {
  let data: GameData;
  try {
    data = await getGameData(params.id);
  } catch {
    notFound();
  }

  return (
    <div>
      {data.customCss && <link rel="stylesheet" href={data.customCss} />}

      <section className="text-center py-8" id="hero">
        <Image src={data.hero.image} alt={data.hero.title} width={800} height={400} className="mx-auto" />
        <h1 className="text-3xl font-bold animate-fade-in mt-4">{data.hero.title}</h1>
        <p className="text-lg text-muted-foreground">{data.hero.subtitle}</p>
      </section>

      <section className="py-8" id="platforms">
        <h2 className="text-2xl font-semibold mb-2">Plataformas</h2>
        <ul className="flex flex-wrap gap-4">
          {data.platforms.map((p) => (
            <li key={p} className="flex items-center gap-2 capitalize">
              <PlatformIcon name={p} />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="py-8 flex flex-col md:flex-row gap-4" id="fast-description">
        <div className="flex-1">
          <iframe
            src={data.fastDescription.video}
            className="w-full aspect-video"
            allow="autoplay; encrypted-media"
            title="Trailer"
          />
        </div>
        <p className="flex-1 self-center text-lg">{data.fastDescription.description}</p>
      </section>

      <section className="py-8" id="news">
        <h2 className="text-2xl font-semibold mb-4">Últimas notícias</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.lastNews.map((n, idx) => (
            <article key={idx} className="border rounded-md overflow-hidden">
              <div className="relative">
                <Image src={n.image} alt={n.title} width={400} height={200} />
                <div className="absolute top-0 left-0 bg-black bg-opacity-60 text-white text-xs p-1">
                  {n.year} • {n.readingTime}
                </div>
              </div>
              <div className="p-2">
                <div className="mb-1 text-xs text-muted-foreground flex gap-1">
                  {n.tags.map((t) => (
                    <span key={t} className="bg-muted px-1 rounded-sm">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="font-bold">{n.title}</h3>
                <p className="text-sm text-muted-foreground">{n.subtitle}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-8" id="lore">
        {data.lore.map((l, idx) => (
          <div key={idx} className={`flex flex-col md:flex-row gap-4 mb-6 ${idx % 2 ? 'md:flex-row-reverse' : ''}`}>
            <Image src={l.image} alt={l.title} width={400} height={200} className="flex-1" />
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">{l.title}</h3>
              <p>{l.description}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="py-8" id="media">
        <h2 className="text-2xl font-semibold mb-4">Galeria</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {data.media.map((img, idx) => (
            <Image key={idx} src={img} alt={`media-${idx}`} width={300} height={200} className="rounded" />
          ))}
        </div>
      </section>

      <footer className="py-8 text-center text-sm" id="footer">
        <p>{data.footer.company}</p>
        <p>{data.footer.platforms.join(', ')}</p>
        <p>{data.footer.rating}</p>
        <p>{data.footer.copyright}</p>
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

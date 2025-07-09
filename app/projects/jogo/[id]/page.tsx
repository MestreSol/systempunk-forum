"use client";
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useState, useEffect } from "react";
import * as React from "react";

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

interface RoadmapItem {
  title: string;
  date: string; // formato YYYY-MM
  description: string;
}

interface TeamMember {
  name: string;
  role: string;
  photo: string;
  description: string;
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
  systems?: Record<string, string[]>;
  sprints?: Sprint[];
  roadmap?: RoadmapItem[];
  team?: TeamMember[];
}

async function getGameData(id: string): Promise<GameData> {
  const res = await fetch(`/projects/jogo/${id}/${id}.json`, { cache: "no-store" });
  if (!res.ok) throw new Error('not-found');
  return res.json();
}

async function getMarkdownContent(id: string): Promise<MarkdownContent> {
  try {
    const [sprintsRes, todoRes] = await Promise.all([
      fetch(`/projects/jogo/${id}/Sprints.md`, { cache: "no-store" }),
      fetch(`/projects/jogo/${id}/TODO.md`, { cache: "no-store" })
    ]);
    
    const sprints = sprintsRes.ok ? await sprintsRes.text() : '';
    const todo = todoRes.ok ? await todoRes.text() : '';
    
    return { sprints, todo };
  } catch {
    return { sprints: '', todo: '' };
  }
}

interface SprintActivity {
  name: string;
  status: "done" | "ongoing" | "stopped" | "todo";
}
interface Sprint {
  title: string;
  activities: SprintActivity[];
}

interface MarkdownContent {
  sprints: string;
  todo: string;
}

export default function GamePage(props: { params: Promise<{ id: string }> }) {
  // unwrap params using React.use
  const params = React.use(props.params);
  const [data, setData] = useState<GameData | null>(null);
  const [markdownContent, setMarkdownContent] = useState<MarkdownContent>({ sprints: '', todo: '' });
  const [error, setError] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [openSprint, setOpenSprint] = useState<number | null>(null);
  const [openRoadmap, setOpenRoadmap] = useState<number | null>(null);
  const [openTodo, setOpenTodo] = useState<number | null>(null);

  // Helper to extract YouTube video ID
  function getYoutubeId(url: string) {
    const match = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&?/]+)/);
    return match ? match[1] : "";
  }

  // Helper para gerar slug a partir do título da notícia
  function slugify(text: string) {
    return text
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }

  // Helper para processar markdown das sprints
  function parseSprintsMarkdown(content: string) {
    const sections: Array<{ title: string; content: string }> = [];
    const lines = content.split('\n');
    
    let currentSection: { title: string; content: string } | null = null;
    
    for (const line of lines) {
      // Detectar início de uma nova sprint (## 🟦 Sprint...)
      if (line.startsWith('## 🟦 Sprint')) {
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = {
          title: line.replace(/^## 🟦\s*/, '').trim(),
          content: ''
        };
      } else if (currentSection && line.trim() !== '' && !line.startsWith('#') && !line.startsWith('---')) {
        // Adicionar conteúdo da seção atual
        currentSection.content += line + '\n';
      }
    }
    
    if (currentSection) {
      sections.push(currentSection);
    }
    
    return sections;
  }

  // Helper para processar markdown do TODO
  function parseTodoMarkdown(content: string) {
    const sections: Array<{ title: string; content: string }> = [];
    const lines = content.split('\n');
    
    let currentSection: { title: string; content: string } | null = null;
    
    for (const line of lines) {
      // Detectar início de uma nova seção (## título ou ### título)
      if (line.match(/^##\s+[^#]/)) {
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = {
          title: line.replace(/^##\s*/, '').replace(/🎮|🛒|🤝|🔼|⚙️|🧪|📈/g, '').trim(),
          content: ''
        };
      } else if (currentSection && line.trim() !== '' && !line.startsWith('#') && !line.startsWith('---')) {
        // Adicionar conteúdo da seção atual
        currentSection.content += line + '\n';
      }
    }
    
    if (currentSection) {
      sections.push(currentSection);
    }
    
    return sections;
  }

  // Helper para calcular progresso de uma seção
  function calculateProgress(content: string) {
    const lines = content.split('\n');
    let totalItems = 0;
    let completedItems = 0;
    
    lines.forEach((line) => {
      line = line.trim();
      if (line.startsWith('* ✅') || line.startsWith('* [x]') || line.startsWith('- [x]')) {
        totalItems++;
        completedItems++;
      } else if (line.startsWith('* 🟡') || line.startsWith('* ⛔') || line.startsWith('* ⬜') || 
                 line.startsWith('* [ ]') || line.startsWith('- [ ]')) {
        totalItems++;
      }
    });
    
    return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  }

  // Helper para renderizar markdown simples
  function renderMarkdownContent(content: string) {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    
    lines.forEach((line, index) => {
      line = line.trim();
      if (!line) return;
      
      if (line.startsWith('###')) {
        elements.push(
          <h4 key={index} className="text-lg font-semibold text-lime-300 mb-2 mt-3">
            {line.replace(/^###\s*/, '')}
          </h4>
        );
      } else if (line.startsWith('* [x]') || line.startsWith('- [x]')) {
        elements.push(
          <div key={index} className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="text-lime-100 line-through opacity-70">
              {line.replace(/^[*-]\s*\[x\]\s*/, '')}
            </span>
          </div>
        );
      } else if (line.startsWith('* [ ]') || line.startsWith('- [ ]')) {
        elements.push(
          <div key={index} className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 bg-gray-500 rounded-full"></span>
            <span className="text-lime-100">
              {line.replace(/^[*-]\s*\[\s*\]\s*/, '')}
            </span>
          </div>
        );
      } else if (line.startsWith('* ✅')) {
        elements.push(
          <div key={index} className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="text-lime-100 line-through opacity-70">
              {line.replace(/^[*]\s*✅\s*/, '')}
            </span>
          </div>
        );
      } else if (line.startsWith('* 🟡')) {
        elements.push(
          <div key={index} className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            <span className="text-lime-100">
              {line.replace(/^[*]\s*🟡\s*/, '')}
            </span>
          </div>
        );
      } else if (line.startsWith('* ⛔')) {
        elements.push(
          <div key={index} className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="text-lime-100 opacity-70">
              {line.replace(/^[*]\s*⛔\s*/, '')}
            </span>
          </div>
        );
      } else if (line.startsWith('* ⬜')) {
        elements.push(
          <div key={index} className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 bg-gray-500 rounded-full"></span>
            <span className="text-lime-100">
              {line.replace(/^[*]\s*⬜\s*/, '')}
            </span>
          </div>
        );
      } else if (line.startsWith('* ') || line.startsWith('- ')) {
        elements.push(
          <div key={index} className="flex items-start gap-2 mb-1">
            <span className="w-2 h-2 bg-lime-400 rounded-full mt-2 flex-shrink-0"></span>
            <span className="text-lime-100">
              {line.replace(/^[*-]\s*/, '')}
            </span>
          </div>
        );
      } else if (line.length > 0) {
        elements.push(
          <p key={index} className="text-lime-100 mb-2">
            {line}
          </p>
        );
      }
    });
    
    return elements;
  }

  useEffect(() => {
    Promise.all([
      getGameData(params.id),
      getMarkdownContent(params.id)
    ])
      .then(([gameData, mdContent]) => {
        setData(gameData);
        setMarkdownContent(mdContent);
      })
      .catch(() => setError(true));
  }, [params.id]);

  if (error) {
    notFound();
  }
  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  // Parse markdown content
  const sprintsSections = parseSprintsMarkdown(markdownContent.sprints);
  const todoSections = parseTodoMarkdown(markdownContent.todo);

  // Use roadmap from JSON, fallback to empty array if not present
  const roadmap: RoadmapItem[] = data.roadmap || [];

  // Use team from JSON, fallback to empty array if not present
  const team: TeamMember[] = data.team || [];

  return (
    <div className="min-h-screen bg-background">
      {data.customCss && (
        <link rel="stylesheet" href={data.customCss} />
      )}
      {/* HERO SECTION */}
      <section
        id="hero"
        className="relative flex flex-col items-center justify-center text-center min-h-[60vh] md:min-h-[80vh] w-full py-8 px-2 sm:px-4 bg-gradient-to-b from-black to-zinc-900 overflow-hidden"
        style={{
          backgroundImage: `url(${data.hero.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <div className="absolute inset-0 -z-10 opacity-50"></div>
        <div className="relative z-10 max-w-2xl mx-auto pt-16 pb-10 sm:pt-24 sm:pb-16">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold drop-shadow-lg mb-4 animate-fade-in bg-gradient-to-r from-lime-400 to-green-500 bg-clip-text text-transparent">
            {data.hero.title}
          </h1>
          <p className="text-lg sm:text-2xl md:text-3xl text-lime-200 mb-6 sm:mb-8 animate-fade-in delay-100">{data.hero.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            {data.platforms.map((p) => (
              <span key={p} className="inline-flex items-center gap-2 bg-black/60 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-lime-300 border border-lime-500 text-sm sm:text-base shadow">
                <PlatformIcon name={p} />
                {p}
              </span>
            ))}
          </div>
          <a href="#fast-description" className="inline-block bg-lime-500 hover:bg-lime-600 text-black font-bold px-6 py-3 sm:px-10 sm:py-4 rounded-full text-lg sm:text-xl shadow-lg transition-all animate-bounce">Jogar agora</a>
        </div>
      </section>

      {/* TRAILER & FAST DESCRIPTION */}
      <section className="py-10 sm:py-16 px-2 sm:px-4 flex flex-col md:flex-row gap-6 sm:gap-8 items-center max-w-5xl mx-auto" id="fast-description">
        <div className="flex-1 w-full max-w-full sm:max-w-xl">
          <div
            className="aspect-video rounded-lg overflow-hidden shadow-lg border border-lime-500 bg-black flex items-center justify-center cursor-pointer group relative"
            onClick={() => setVideoOpen(true)}
            tabIndex={0}
            role="button"
            aria-label="Assistir trailer"
          >
            <Image
              src={"/Trailer.avif"}
              alt="Trailer"
              fill
              style={{ objectFit: "cover" }}
              className="group-hover:opacity-80 transition"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="40" fill="rgba(0,0,0,0.6)" />
                <polygon points="32,25 60,40 32,55" fill="#fff" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex-1 text-base sm:text-lg text-zinc-100 bg-black/60 p-4 sm:p-6 rounded-lg shadow w-full">
          {data.fastDescription.description}
        </div>
        {videoOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
            onClick={() => setVideoOpen(false)}
            aria-modal="true"
            role="dialog"
          >
            <div
              className="relative w-[90vw] max-w-3xl aspect-video bg-black rounded-lg shadow-lg flex items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 z-10 p-2 rounded-full bg-zinc-900 text-lime-400"
                aria-label="Fechar vídeo"
                onClick={() => setVideoOpen(false)}
              >
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M6 18L18 6"/>
                </svg>
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${getYoutubeId(data.fastDescription.video)}`}
                className="w-full h-full rounded-lg"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Trailer"
              />
            </div>
          </div>
        )}
      </section>

      {/* NEWS */}
      <section className="py-10 sm:py-16 px-2 sm:px-4 max-w-6xl mx-auto" id="news">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-lime-400">Últimas notícias</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {data.lastNews.map((n, idx) => (
            <a
              key={idx}
              href={`/news/${slugify(n.title)}`}
              className="group bg-zinc-900 border border-lime-700 rounded-lg overflow-hidden shadow-lg flex flex-col transition-transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-lime-400"
              tabIndex={0}
              aria-label={`Ver detalhes da notícia: ${n.title}`}
            >
              <div className="relative h-40 sm:h-48">
                <Image src={n.image} alt={n.title} fill style={{objectFit:'cover'}} />
                <div className="absolute top-0 left-0 bg-black/70 text-lime-300 text-xs p-1 rounded-br">
                  {n.year} • {n.readingTime}
                </div>
              </div>
              <div className="p-3 sm:p-4 flex-1 flex flex-col">
                <div className="mb-1 sm:mb-2 text-xs flex gap-1 flex-wrap">
                  {n.tags.map((t) => (
                    <span key={t} className="bg-lime-800/40 text-lime-300 px-2 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="font-bold text-base sm:text-lg text-lime-200 mb-1 group-hover:underline">{n.title}</h3>
                <p className="text-xs sm:text-sm text-lime-100 flex-1">{n.subtitle}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* FEATURES & SYSTEMS */}
      <section className="py-10 sm:py-16 px-2 sm:px-4 max-w-6xl mx-auto" id="features">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-lime-400">Sistemas e Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {Object.entries(data.systems || {}).map(([category, items]) => (
            <div key={category} className="bg-zinc-900 border border-lime-700 rounded-lg p-4 sm:p-6 shadow-lg flex flex-col">
              <h3 className="text-lg sm:text-xl font-semibold text-lime-300 mb-2 sm:mb-3 capitalize">{category.replace(/([A-Z])/g, ' $1')}</h3>
              <ul className="list-disc list-inside text-lime-100 text-sm sm:text-base space-y-1">
                {(items as string[]).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* LORE */}
      <section className="py-10 sm:py-16 px-2 sm:px-4 max-w-5xl mx-auto" id="lore">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-lime-400">Lore e História</h2>
        {data.lore.map((l, idx) => (
          <div key={idx} className={`flex flex-col md:flex-row gap-4 sm:gap-8 mb-8 sm:mb-10 ${idx % 2 ? 'md:flex-row-reverse' : ''}`}>
            <div className="w-full md:w-[400px] flex-shrink-0">
              <Image src={l.image} alt={l.title} width={400} height={240} className="rounded-lg shadow-lg border border-lime-700 w-full h-auto object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-xl sm:text-2xl font-semibold text-lime-200 mb-1 sm:mb-2">{l.title}</h3>
              <p className="text-lime-100 text-base sm:text-lg">{l.description}</p>
            </div>
          </div>
        ))}
      </section>

      {/* STATUS */}
      <section className="py-10 sm:py-16 px-2 sm:px-4 max-w-4xl mx-auto" id="status">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-lime-400">Status do Projeto</h2>
        <div className="bg-zinc-900 border border-lime-700 rounded-lg p-4 sm:p-6 shadow-lg text-lime-100 text-base sm:text-lg">
          {/* Accordion de Sprints */}
          {sprintsSections.map((sprint, idx) => {
            const progress = calculateProgress(sprint.content);
            return (
              <div key={idx} className="mb-4 border-b border-lime-800 last:border-b-0">
                <button
                  className="w-full flex justify-between items-center py-3 px-2 text-left font-semibold text-lime-200 hover:bg-black/30 transition rounded"
                  onClick={() => setOpenSprint(openSprint === idx ? null : idx)}
                  aria-expanded={openSprint === idx}
                  aria-controls={`sprint-panel-${idx}`}
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span>{sprint.title}</span>
                      <span className="text-xs text-lime-400 ml-2">{progress}%</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-lime-500 to-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 ml-4 transition-transform ${openSprint === idx ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {openSprint === idx && (
                  <div id={`sprint-panel-${idx}`} className="py-2 px-2">
                    <div className="space-y-2">
                      {renderMarkdownContent(sprint.content)}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* TODO */}
      <section className="py-10 sm:py-16 px-2 sm:px-4 max-w-4xl mx-auto" id="todo">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-lime-400">TODO - Sistemas em Desenvolvimento</h2>
        <div className="bg-zinc-900 border border-lime-700 rounded-lg p-4 sm:p-6 shadow-lg text-lime-100 text-base sm:text-lg">
          {/* Accordion do TODO */}
          {todoSections.map((section, idx) => {
            const progress = calculateProgress(section.content);
            return (
              <div key={idx} className="mb-4 border-b border-lime-800 last:border-b-0">
                <button
                  className="w-full flex justify-between items-center py-3 px-2 text-left font-semibold text-lime-200 hover:bg-black/30 transition rounded"
                  onClick={() => setOpenTodo(openTodo === idx ? null : idx)}
                  aria-expanded={openTodo === idx}
                  aria-controls={`todo-panel-${idx}`}
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span>{section.title}</span>
                      <span className="text-xs text-lime-400 ml-2">{progress}%</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-lime-500 to-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 ml-4 transition-transform ${openTodo === idx ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {openTodo === idx && (
                  <div id={`todo-panel-${idx}`} className="py-2 px-2">
                    <div className="space-y-2">
                      {renderMarkdownContent(section.content)}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ROADMAP */}
      <section className="py-10 sm:py-16 px-2 sm:px-4 max-w-4xl mx-auto" id="roadmap">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-lime-400">Roadmap</h2>
        <div className="bg-zinc-900 border border-lime-700 rounded-lg p-4 sm:p-6 shadow-lg">
          {roadmap.length === 0 ? (
            <div className="text-lime-200">Nenhum item de roadmap disponível.</div>
          ) : (
            <ul className="divide-y divide-lime-800">
              {roadmap.map((item, idx) => (
                <li key={idx} className="py-2">
                  <button
                    className="w-full flex justify-between items-center text-left font-semibold text-lime-200 hover:bg-black/30 transition rounded px-2 py-3"
                    onClick={() => setOpenRoadmap(openRoadmap === idx ? null : idx)}
                    aria-expanded={openRoadmap === idx}
                    aria-controls={`roadmap-panel-${idx}`}
                  >
                    <span>
                      <span className="block">{item.title}</span>
                      <span className="text-xs text-lime-400">{new Date(item.date + "-01").toLocaleDateString("pt-BR", { year: "numeric", month: "long" })}</span>
                    </span>
                    <svg
                      className={`w-5 h-5 ml-2 transition-transform ${openRoadmap === idx ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {openRoadmap === idx && (
                    <div id={`roadmap-panel-${idx}`} className="mt-2 px-2 text-lime-100 text-base">
                      {item.description}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* TIME (Swiper/Carrossel) */}
      {team.length > 0 && (
        <section className="py-10 sm:py-16 px-2 sm:px-4 max-w-6xl mx-auto" id="team">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-lime-400 text-center">Nosso Time</h2>
          <div
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {team.map((member, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-72 sm:w-80 bg-zinc-900 border border-lime-700 rounded-lg p-6 shadow-lg text-center snap-center"
              >
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={120}
                  height={120}
                  className="rounded-full mb-4 object-cover border-4 border-lime-500 mx-auto"
                />
                <div className="font-bold text-lg text-lime-200">{member.name}</div>
                <div className="text-lime-400 text-sm mb-2">{member.role}</div>
                <div className="text-zinc-100 text-sm">{member.description}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* GALERIA */}
      <section className="py-10 sm:py-16 px-2 sm:px-4 max-w-6xl mx-auto" id="media">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-lime-400">Galeria</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {data.media.map((img, idx) => (
            <Image key={idx} src={img} alt={`media-${idx}`} width={300} height={200} className="rounded-lg shadow border border-lime-700 w-full h-auto object-cover" />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 sm:py-10 text-center text-lime-300 bg-black/80 mt-8 sm:mt-10 border-t border-lime-800 text-xs sm:text-base">
        <div className="mb-1 sm:mb-2 font-bold">{data.footer.company}</div>
        <div className="mb-1 sm:mb-2">{data.footer.platforms.join(', ')}</div>
        <div className="mb-1 sm:mb-2">{data.footer.rating}</div>
        <div className="text-[10px] sm:text-xs">{data.footer.copyright}</div>
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

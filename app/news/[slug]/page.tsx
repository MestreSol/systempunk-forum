"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

// Helper para gerar slug a partir do título da notícia
function slugify(text: string) {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

interface NewsCard {
  tags: string[];
  title: string;
  subtitle: string;
  image: string;
  year: number;
  readingTime: string;
  content?: string;
}

interface ProjectNews {
  projectId: string;
  news: NewsCard;
}

export default function NewsPage({ params }: { params: { slug: string } }) {
  const [news, setNews] = useState<ProjectNews | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchNews() {
      try {
        // Lista de projetos (adicione outros IDs se necessário)
        const projectIds = ["RR", "MON", "NOV"];
        for (const projectId of projectIds) {
          const res = await fetch(`/projects/jogo/${projectId}.json`);
          if (!res.ok) continue;
          const data = await res.json();
          if (Array.isArray(data.lastNews)) {
            const found = data.lastNews.find(
              (n: NewsCard) => slugify(n.title) === params.slug
            );
            if (found) {
              setNews({ projectId, news: found });
              return;
            }
          }
        }
        setError(true);
      } catch {
        setError(true);
      }
    }
    fetchNews();
  }, [params.slug]);

  if (error) {
    notFound();
  }
  if (!news) {
    return <div className="min-h-screen flex items-center justify-center">Carregando notícia...</div>;
  }

  const { news: n } = news;

  return (
    <div className="min-h-screen bg-background">
      {/* HERO DA NOTÍCIA */}
      <section
        className="relative flex flex-col items-center justify-center text-center min-h-[40vh] w-full py-10 px-2 sm:px-4 bg-gradient-to-b from-black/80 to-zinc-900 overflow-hidden"
        style={{
          backgroundImage: `url(${n.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="absolute inset-0 bg-black/70 -z-10"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="mb-4 flex flex-wrap justify-center gap-2">
            {n.tags.map((tag) => (
              <span key={tag} className="bg-lime-800/40 text-lime-300 px-2 py-0.5 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold drop-shadow-lg mb-2 bg-gradient-to-r from-lime-400 to-green-500 bg-clip-text text-transparent">
            {n.title}
          </h1>
          <div className="text-lime-400 text-sm mb-2">
            {n.year} • {n.readingTime}
          </div>
          <p className="text-lg sm:text-xl text-lime-100 mb-4">{n.subtitle}</p>
        </div>
      </section>
      {/* TEXTO COMPLETO DA NOTÍCIA */}
      <article className="max-w-2xl w-full mx-auto bg-zinc-900 border border-lime-700 rounded-lg shadow-lg p-6 mt-8">
        {n.content ? (
          <div className="prose prose-invert prose-lg max-w-none text-lime-100" dangerouslySetInnerHTML={{ __html: n.content }} />
        ) : (
          <div className="text-lime-200 text-base">Conteúdo completo em breve.</div>
        )}
      </article>
    </div>
  );
}

import PostCard from '@/components/PostCard';
import HeroSwiper, { type HeroPost } from '@/components/HeroSwiper';

const posts: (HeroPost & { author: string; date: string; tag: string })[] = [
  {
    id: 1,
    title: 'Bem-vindo ao Systempunk Forum',
    subtitle: 'Primeiros passos',
    excerpt:
      'Este é o primeiro post do fórum. Sinta-se à vontade para começar uma discussão e compartilhar suas ideias.',
    author: 'Admin',
    date: '21/05/2024',
    tag: 'Oficial',
    image: 'https://source.unsplash.com/random/1200x600?technology',
  },
  {
    id: 2,
    title: 'Compartilhe seus projetos',
    subtitle: 'Mostre seu trabalho',
    excerpt:
      'Mostre para a comunidade o que você tem desenvolvido e receba feedback de outros membros.',
    author: 'Jane Doe',
    date: '22/05/2024',
    tag: 'Oficial',
    image: 'https://source.unsplash.com/random/1200x600?code',
  },
  {
    id: 3,
    title: 'Novas Funcionalidades',
    subtitle: 'O que vem por aí',
    excerpt: 'Confira as novidades que estamos planejando para o fórum.',
    author: 'Admin',
    date: '23/05/2024',
    tag: 'Oficial',
    image: 'https://source.unsplash.com/random/1200x600?innovation',
  },
  {
    id: 4,
    title: 'Eventos da Comunidade',
    subtitle: 'Participe!',
    excerpt: 'Fique por dentro dos próximos eventos organizados pela comunidade.',
    author: 'Admin',
    date: '24/05/2024',
    tag: 'Oficial',
    image: 'https://source.unsplash.com/random/1200x600?community',
  },
  {
    id: 5,
    title: 'Dicas e Truques',
    subtitle: 'Aprimore suas habilidades',
    excerpt: 'Selecionamos algumas dicas para você aproveitar melhor o fórum.',
    author: 'Jane Doe',
    date: '25/05/2024',
    tag: 'Oficial',
    image: 'https://source.unsplash.com/random/1200x600?tips',
  },
];

export default function Home() {
  const officialPosts = posts.filter((p) => p.tag === 'Oficial').slice(0, 5);
  return (
    <>
      <HeroSwiper posts={officialPosts} />
      <div className="container mx-auto space-y-6 px-4 py-8">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </>
  );
}

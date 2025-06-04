import PostCard from '@/components/PostCard';

const posts = [
  {
    id: 1,
    title: 'Bem-vindo ao Systempunk Forum',
    excerpt:
      'Este é o primeiro post do fórum. Sinta-se à vontade para começar uma discussão e compartilhar suas ideias.',
    author: 'Admin',
    date: '21/05/2024',
  },
  {
    id: 2,
    title: 'Compartilhe seus projetos',
    excerpt:
      'Mostre para a comunidade o que você tem desenvolvido e receba feedback de outros membros.',
    author: 'Jane Doe',
    date: '22/05/2024',
  },
];

export default function Home() {
  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}

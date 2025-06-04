import Button from '@/containers/atoms/button';

export type PostCardProps = {
  title: string;
  excerpt: string;
  author: string;
  date: string;
};

export default function PostCard({ title, excerpt, author, date }: PostCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-2 text-2xl font-semibold">{title}</h2>
      <p className="mb-4 text-sm text-gray-500">
        {author} • {date}
      </p>
      <p className="mb-4">{excerpt}</p>
      <Button level="primary" variant="solid">
        Ler mais
      </Button>
    </div>
  );
}

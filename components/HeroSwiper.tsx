import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/containers/atoms/button';

export type HeroPost = {
  id: number;
  title: string;
  subtitle: string;
  excerpt: string;
  image: string;
};

export default function HeroSwiper({ posts }: { posts: HeroPost[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % posts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [posts.length]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {posts.map((post, i) => (
        <div
          key={post.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image src={post.image} alt={post.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-start justify-center p-8 text-white space-y-4">
            <h1 className="text-4xl font-bold">{post.title}</h1>
            <h2 className="text-2xl">{post.subtitle}</h2>
            <p className="max-w-xl">{post.excerpt}</p>
            <Link href={`/posts/${post.id}`}>
              <Button level="primary" variant="solid">
                Ver mais
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

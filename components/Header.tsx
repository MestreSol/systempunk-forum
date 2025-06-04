import Link from 'next/link';
import Button from '@/containers/atoms/button';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold">
          Systempunk Forum
        </Link>
        <Link href="#">
          <Button level="primary" size="medium">
            Nova Postagem
          </Button>
        </Link>
      </div>
    </header>
  );
}

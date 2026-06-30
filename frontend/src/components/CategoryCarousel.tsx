import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Category } from '../types';

const EMOJI: Record<string, string> = {
  cookware: '🍳', appliances: '🔌', stoves: '🔥', tools: '🥄',
  storage: '🥡', tableware: '🍽️', drinkware: '🥤', bakeware: '🧁',
};

function CategoryCard({ category }: { category: Category }) {
  const [imgError, setImgError] = useState(false);
  const imgSrc = `/categories/${category.slug}.png`;

  return (
    <Link
      to={`/shop?category=${category.slug}`}
      className="shrink-0 w-36 sm:w-44 bg-white border border-gray-100 rounded-2xl p-5 text-center hover:shadow-md hover:border-brand-accent/40 transition group"
    >
      <div className="h-20 flex items-center justify-center">
        {imgError ? (
          <span className="text-4xl">{EMOJI[category.slug] ?? '🛒'}</span>
        ) : (
          <img
            src={imgSrc}
            alt={category.name}
            loading="lazy"
            onError={() => setImgError(true)}
            className="max-h-20 object-contain group-hover:scale-105 transition-transform"
          />
        )}
      </div>
      <p className="mt-3 font-semibold text-sm">{category.name}</p>
    </Link>
  );
}

export default function CategoryCarousel({ categories }: { categories: Category[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });

  return (
    <div className="relative">
      <button onClick={() => scroll(-1)} className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hidden sm:block" aria-label="Prev">
        <ChevronLeft size={18} />
      </button>
      <div ref={ref} className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {categories.map((c) => (
          <CategoryCard key={c.slug} category={c} />
        ))}
      </div>
      <button onClick={() => scroll(1)} className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hidden sm:block" aria-label="Next">
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
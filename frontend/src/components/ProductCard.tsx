import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, Star } from 'lucide-react';
import { Product } from '../types';
import { formatRwf } from '../lib/format';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product }: { product: Product }) {
  const { t } = useTranslation();
  const { has, toggle } = useWishlist();
  const image = product.images[0]?.url ?? '/placeholder-product.jpg';
  const liked = has(product.slug);
  const discount = product.oldPriceRwf
    ? Math.round(((product.oldPriceRwf - product.priceRwf) / product.oldPriceRwf) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition">
      <button
        onClick={() => toggle(product.slug)}
        className="absolute top-2 right-2 z-10 bg-white/90 rounded-full p-2 shadow hover:scale-110 transition"
        aria-label="Wishlist"
      >
        <Heart size={16} className={liked ? 'fill-red-500 text-red-500' : 'text-gray-500'} />
      </button>
      {discount > 0 && (
        <span className="absolute top-2 left-2 z-10 bg-brand-accent text-white text-[11px] font-bold px-2 py-1 rounded-md">
          -{discount}% {t('card.off')}
        </span>
      )}
      <Link to={`/product/${product.slug}`}>
        <div className="aspect-square bg-gray-100 overflow-hidden">
          <img src={image} alt={product.name} loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition" />
        </div>
        <div className="p-3">
          <div className="flex items-baseline gap-2">
            <span className="font-extrabold text-brand-accent">{formatRwf(product.priceRwf)}</span>
            {product.oldPriceRwf && (
              <span className="text-xs text-gray-400 line-through">{formatRwf(product.oldPriceRwf)}</span>
            )}
          </div>
          <h3 className="mt-1 font-medium text-sm text-gray-800 line-clamp-2">{product.name}</h3>
          <div className="mt-1.5 flex items-center justify-between">
            {product.rating > 0 ? (
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Star size={12} className="fill-amber-400 text-amber-400" /> {product.rating.toFixed(1)}
                <span className="text-gray-300">({product.reviewCount})</span>
              </span>
            ) : <span />}
            <span className={`text-[11px] ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
              {product.stock > 0 ? t('card.inStock') : t('card.outOfStock')}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

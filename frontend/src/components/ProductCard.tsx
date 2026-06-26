import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Product } from '../types';
import { formatRwf } from '../lib/format';

export default function ProductCard({ product }: { product: Product }) {
  const { t } = useTranslation();
  const image = product.images[0]?.url ?? '/placeholder-product.jpg';

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition"
    >
      <div className="aspect-square bg-gray-100 overflow-hidden">
        <img
          src={image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition"
        />
      </div>
      <div className="p-3">
        <p className="text-xs text-gray-400">{product.category?.name}</p>
        <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-semibold text-brand">{formatRwf(product.priceRwf)}</span>
          <span className={`text-xs ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {product.stock > 0 ? t('common.inStock') : t('common.outOfStock')}
          </span>
        </div>
      </div>
    </Link>
  );
}

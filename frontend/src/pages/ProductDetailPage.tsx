import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import api from '../lib/api';
import { Product } from '../types';
import { formatRwf } from '../lib/format';
import { whatsappLink } from '../config/site';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { t } = useTranslation();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', slug],
    queryFn: async () => (await api.get<Product>(`/products/${slug}`)).data,
    enabled: Boolean(slug),
  });

  if (isLoading) return <p className="max-w-6xl mx-auto px-4 py-8 text-gray-400">{t('common.loading')}</p>;
  if (!product) return null;

  const image = product.images[0]?.url ?? '/placeholder-product.jpg';
  const order = whatsappLink(`Hello! I want to order: ${product.name} — ${formatRwf(product.priceRwf)}`);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
      <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
        <img src={image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div>
        <p className="text-sm text-gray-400">{product.category?.name}</p>
        <h1 className="text-2xl font-bold mt-1">{product.name}</h1>
        <p className="text-2xl font-semibold text-brand mt-3">{formatRwf(product.priceRwf)}</p>
        <p className="text-gray-600 mt-4">{product.description}</p>
        <a
          href={order}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-6 bg-brand-accent text-brand font-semibold px-6 py-3 rounded-lg"
        >
          {t('common.orderWhatsapp')}
        </a>
      </div>
    </div>
  );
}

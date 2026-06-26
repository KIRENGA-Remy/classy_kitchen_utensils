import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../lib/api';
import { ProductList } from '../types';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery({
    queryKey: ['featured'],
    queryFn: async () => (await api.get<ProductList>('/products', { params: { featured: true, pageSize: 8 } })).data,
  });

  return (
    <>
      {/* Hero */}
      <section className="bg-brand text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold max-w-2xl mx-auto leading-tight">{t('hero.title')}</h1>
          <p className="mt-4 text-gray-300 max-w-xl mx-auto">{t('hero.subtitle')}</p>
          <Link to="/shop" className="inline-block mt-8 bg-brand-accent text-brand font-semibold px-6 py-3 rounded-lg">
            {t('hero.cta')}
          </Link>
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl font-semibold mb-6">{t('common.featured')}</h2>
        {isLoading ? (
          <p className="text-gray-400">{t('common.loading')}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data?.items.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </>
  );
}

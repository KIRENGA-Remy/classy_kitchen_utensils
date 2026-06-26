import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import api from '../lib/api';
import { ProductList, Category } from '../types';
import ProductCard from '../components/ProductCard';

export default function ProductsPage() {
  const { t } = useTranslation();
  const [category, setCategory] = useState<string>('');
  const [search, setSearch] = useState('');

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => (await api.get<Category[]>('/categories')).data,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['products', category, search],
    queryFn: async () =>
      (await api.get<ProductList>('/products', { params: { category: category || undefined, search: search || undefined, pageSize: 24 } })).data,
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">{t('common.allProducts')}</h1>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t('common.search')}
        className="w-full mb-4 rounded-lg border border-gray-200 px-4 py-2"
      />

      {/* category filter */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
        <button
          onClick={() => setCategory('')}
          className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${category === '' ? 'bg-brand text-white' : 'bg-gray-100'}`}
        >
          {t('common.all')}
        </button>
        {categories?.map((c) => (
          <button
            key={c.slug}
            onClick={() => setCategory(c.slug)}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${category === c.slug ? 'bg-brand text-white' : 'bg-gray-100'}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p className="text-gray-400">{t('common.loading')}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data?.items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}

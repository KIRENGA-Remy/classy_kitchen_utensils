import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import api from '../lib/api';
import { ProductList, Category } from '../types';
import ProductCard from '../components/ProductCard';

export default function ShopPage() {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState(params.get('search') ?? '');
  const category = params.get('category') ?? '';
  const sort = params.get('sort') ?? 'newest';

  // keep the input in sync if the URL changes (e.g. from navbar search)
  useEffect(() => setSearch(params.get('search') ?? ''), [params]);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    value ? next.set(key, value) : next.delete(key);
    setParams(next);
  };

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => (await api.get<Category[]>('/categories')).data,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['shop', category, sort, params.get('search')],
    queryFn: async () =>
      (await api.get<ProductList>('/products', {
        params: { category: category || undefined, sort, search: params.get('search') || undefined, pageSize: 24 },
      })).data,
  });

  return (
    <div className="w-full px-4 sm:px-8 py-8 grid lg:grid-cols-[260px_1fr] gap-6">
      {/* Filters sidebar */}
      <aside className="bg-white rounded-2xl border border-gray-100 p-5 h-fit lg:sticky lg:top-24">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">{t('shop.filters')}</h2>
          <button onClick={() => setParams(new URLSearchParams())} className="text-sm text-brand-accent font-semibold">
            {t('shop.clearAll')}
          </button>
        </div>
        <h3 className="font-semibold mb-2">{t('shop.categories')}</h3>
        <ul className="space-y-1">
          <li>
            <button onClick={() => setParam('category', '')}
              className={`w-full text-left px-2 py-1.5 rounded-lg text-sm ${!category ? 'bg-brand-accent/10 text-brand-accent font-semibold' : 'hover:bg-gray-50'}`}>
              {t('shop.title')}
            </button>
          </li>
          {categories?.map((c) => (
            <li key={c.slug}>
              <button onClick={() => setParam('category', c.slug)}
                className={`w-full text-left px-2 py-1.5 rounded-lg text-sm ${category === c.slug ? 'bg-brand-accent/10 text-brand-accent font-semibold' : 'hover:bg-gray-50'}`}>
                {c.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Results */}
      <div>
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <form onSubmit={(e) => { e.preventDefault(); setParam('search', search); }} className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t('search.placeholder')}
              className="w-full rounded-full border border-gray-200 pl-10 pr-4 py-2.5 text-sm" />
          </form>
          <select value={sort} onChange={(e) => setParam('sort', e.target.value)}
            className="rounded-full border border-gray-200 px-4 py-2.5 text-sm bg-white">
            <option value="newest">{t('shop.sortNewest')}</option>
            <option value="price_asc">{t('shop.sortPriceAsc')}</option>
            <option value="price_desc">{t('shop.sortPriceDesc')}</option>
          </select>
        </div>

        {isLoading ? (
          <p className="text-gray-400">…</p>
        ) : data && data.items.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.items.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <p className="text-gray-500 py-12 text-center">{t('shop.noResults')}</p>
        )}
      </div>
    </div>
  );
}

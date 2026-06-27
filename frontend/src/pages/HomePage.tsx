import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import api from '../lib/api';
import { ProductList, Category } from '../types';
import HeroCarousel from '../components/HeroCarousel';
import CategoryCarousel from '../components/CategoryCarousel';
import SectionHeader from '../components/SectionHeader';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const { t } = useTranslation();

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => (await api.get<Category[]>('/categories')).data,
  });
  const { data: featured } = useQuery({
    queryKey: ['featured'],
    queryFn: async () => (await api.get<ProductList>('/products', { params: { featured: true, pageSize: 8 } })).data,
  });
  const { data: latest } = useQuery({
    queryKey: ['latest'],
    queryFn: async () => (await api.get<ProductList>('/products', { params: { sort: 'newest', pageSize: 10 } })).data,
  });

  return (
    <>
      <HeroCarousel />

      <section className="w-full px-4 sm:px-8 mt-12">
        <SectionHeader title={t('sections.featuredCats')} to="/shop" more={t('sections.viewAll')} />
        {categories && <CategoryCarousel categories={categories} />}
      </section>

      <section className="w-full px-4 sm:px-8 mt-12">
        <SectionHeader title={t('sections.featured')} to="/shop" more={t('sections.seeMore')} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured?.items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="w-full px-4 sm:px-8 mt-12">
        <SectionHeader title={t('sections.newArrivals')} to="/shop" more={t('sections.seeMore')} />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {latest?.items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </>
  );
}

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Heart, Star, Truck, RotateCcw, Minus, Plus, ShoppingCart } from 'lucide-react';
import api from '../lib/api';
import { ProductDetail } from '../types';
import { formatRwf } from '../lib/format';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { add } = useCart();
  const { has, toggle } = useWishlist();

  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [color, setColor] = useState('');
  const [tab, setTab] = useState<'desc' | 'reviews'>('desc');

  const { data: p, isLoading } = useQuery({
    queryKey: ['product', slug],
    queryFn: async () => (await api.get<ProductDetail>(`/products/${slug}`)).data,
    enabled: Boolean(slug),
  });

  if (isLoading || !p) return <div className="w-full px-4 sm:px-8 py-16 text-gray-400">…</div>;

  const images = p.images.length ? p.images : [{ url: '/placeholder-product.jpg', alt: p.name }];
  const addToCart = () => add({ slug: p.slug, name: p.name, priceRwf: p.priceRwf, image: images[0].url }, qty);
  const buyNow = () => { addToCart(); navigate('/cart'); };

  return (
    <div className="w-full px-4 sm:px-8 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Gallery */}
        <div>
          <div className="aspect-square bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <img src={images[activeImg].url} alt={p.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)}
                className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${i === activeImg ? 'border-brand-accent' : 'border-transparent'}`}>
                <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-2xl font-extrabold text-brand">{p.name}</h1>
            <button onClick={() => toggle(p.slug)} className="bg-white border border-gray-200 rounded-lg p-2.5">
              <Heart size={18} className={has(p.slug) ? 'fill-red-500 text-red-500' : 'text-gray-500'} />
            </button>
          </div>

          {p.rating > 0 && (
            <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
              <Star size={14} className="fill-amber-400 text-amber-400" /> {p.rating.toFixed(1)}
              <span className="text-gray-300">· {p.reviewCount} {t('detail.reviews')}</span>
            </div>
          )}

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-brand-accent">{formatRwf(p.priceRwf)}</span>
            {p.oldPriceRwf && <span className="text-gray-400 line-through">{formatRwf(p.oldPriceRwf)}</span>}
          </div>

          {p.colors.length > 0 && (
            <div className="mt-5">
              <p className="font-semibold text-sm mb-2">{t('detail.chooseColor')}</p>
              <div className="flex gap-2">
                {p.colors.map((c) => (
                  <button key={c} onClick={() => setColor(c)}
                    className={`px-3 py-1.5 rounded-lg border text-sm ${color === c ? 'border-brand-accent text-brand-accent' : 'border-gray-200'}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3"><Minus size={16} /></button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="p-3"><Plus size={16} /></button>
            </div>
            <button onClick={addToCart} className="flex items-center gap-2 border border-brand-accent text-brand-accent font-semibold px-5 py-3 rounded-lg hover:bg-brand-accent/5">
              <ShoppingCart size={18} /> {t('detail.addToCart')}
            </button>
            <button onClick={buyNow} className="flex-1 min-w-[140px] bg-brand-accent text-white font-bold px-6 py-3 rounded-lg hover:bg-amber-600">
              {t('detail.buyNow')}
            </button>
          </div>

          <div className="mt-6 space-y-3 border-t border-gray-100 pt-5">
            <div className="flex gap-3"><Truck className="text-green-600 shrink-0" size={20} />
              <div><p className="font-semibold text-green-700">{t('detail.weDeliver')}</p><p className="text-sm text-gray-600">{t('detail.weDeliverText')}</p></div></div>
            <div className="flex gap-3"><RotateCcw className="text-brand-accent shrink-0" size={20} />
              <div><p className="font-semibold text-brand-accent">{t('detail.returns')}</p><p className="text-sm text-gray-600">{t('detail.returnsText')}</p></div></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10">
        <div className="flex gap-2 bg-gray-100 rounded-xl p-1 w-fit">
          <button onClick={() => setTab('desc')} className={`px-5 py-2 rounded-lg text-sm font-semibold ${tab === 'desc' ? 'bg-white shadow' : 'text-gray-500'}`}>{t('detail.description')}</button>
          <button onClick={() => setTab('reviews')} className={`px-5 py-2 rounded-lg text-sm font-semibold ${tab === 'reviews' ? 'bg-white shadow' : 'text-gray-500'}`}>{t('detail.reviews')} ({p.reviewCount})</button>
        </div>
        <div className="mt-4 bg-white border border-gray-100 rounded-2xl p-6">
          {tab === 'desc' ? (
            <p className="text-gray-700 leading-relaxed">{p.description}</p>
          ) : p.reviews.length ? (
            <ul className="space-y-4">
              {p.reviews.map((r) => (
                <li key={r.id} className="border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2"><span className="font-semibold">{r.author}</span>
                    <span className="flex">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}</span></div>
                  <p className="text-sm text-gray-600 mt-1">{r.comment}</p>
                </li>
              ))}
            </ul>
          ) : <p className="text-gray-500">—</p>}
        </div>
      </div>

      {/* Similar */}
      {p.similar.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-extrabold text-brand mb-5">{t('detail.similar')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {p.similar.map((s) => <ProductCard key={s.id} product={s} />)}
          </div>
        </div>
      )}
    </div>
  );
}

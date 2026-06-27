import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatRwf } from '../lib/format';
import { whatsappLink } from '../config/site';

export default function CartPage() {
  const { t } = useTranslation();
  const { items, remove, setQty, totalRwf, clear } = useCart();

  if (items.length === 0)
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 text-lg">{t('cart.empty')}</p>
        <Link to="/shop" className="inline-block mt-5 bg-brand-accent text-white font-bold px-6 py-3 rounded-full">{t('cart.continue')}</Link>
      </div>
    );

  const orderMsg = `Order from Classy Kitchen Utensils:\n${items.map((i) => `• ${i.quantity} x ${i.name} (${formatRwf(i.priceRwf)})`).join('\n')}\nTotal: ${formatRwf(totalRwf)}`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-extrabold text-brand mb-6">{t('cart.title')}</h1>
      <div className="space-y-3">
        {items.map((i) => (
          <div key={i.slug} className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-3">
            <img src={i.image} alt={i.name} className="w-16 h-16 rounded-lg object-cover bg-gray-100" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{i.name}</p>
              <p className="text-brand-accent font-bold">{formatRwf(i.priceRwf)}</p>
            </div>
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button onClick={() => setQty(i.slug, i.quantity - 1)} className="p-2"><Minus size={14} /></button>
              <span className="w-8 text-center text-sm">{i.quantity}</span>
              <button onClick={() => setQty(i.slug, i.quantity + 1)} className="p-2"><Plus size={14} /></button>
            </div>
            <button onClick={() => remove(i.slug)} className="text-gray-400 hover:text-red-500 p-2"><Trash2 size={18} /></button>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white border border-gray-100 rounded-2xl p-5">
        <div className="flex justify-between text-lg font-bold">
          <span>{t('cart.total')}</span><span className="text-brand-accent">{formatRwf(totalRwf)}</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <a href={whatsappLink(orderMsg)} target="_blank" rel="noreferrer"
            className="flex-1 text-center bg-brand-accent text-white font-bold px-6 py-3 rounded-full">{t('cart.checkout')}</a>
          <button onClick={clear} className="px-6 py-3 rounded-full border border-gray-200 font-semibold text-gray-600">{t('cart.remove')}</button>
        </div>
        <p className="text-xs text-gray-400 mt-3">MTN MoMo · Airtel Money · Cash on delivery</p>
      </div>
    </div>
  );
}

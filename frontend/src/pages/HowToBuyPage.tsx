import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, ShoppingCart, ClipboardCheck, CreditCard, Truck, Smartphone, Banknote, MessageCircle, ArrowRight } from 'lucide-react';
import { whatsappLink } from '../config/site';

export default function HowToBuyPage() {
  const { t } = useTranslation();

  const steps = [
    { icon: Search, emoji: '🔍', title: t('howto.s1t'), desc: t('howto.s1d') },
    { icon: ShoppingCart, emoji: '🛒', title: t('howto.s2t'), desc: t('howto.s2d') },
    { icon: ClipboardCheck, emoji: '📋', title: t('howto.s3t'), desc: t('howto.s3d') },
    { icon: CreditCard, emoji: '💳', title: t('howto.s4t'), desc: t('howto.s4d') },
    { icon: Truck, emoji: '🚚', title: t('howto.s5t'), desc: t('howto.s5d') },
  ];

  const payments = [
    { icon: Smartphone, label: 'MTN MoMo' },
    { icon: Smartphone, label: 'Airtel Money' },
    { icon: Banknote, label: t('howto.cod', 'Cash on delivery') },
  ];

  const waMsg = t('howto.waMsg', "Hello Classy Kitchen! I'd like to place an order.");

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-accent to-orange-600 text-white text-center px-4 py-16">
        <div className="absolute inset-0 opacity-10 text-6xl flex items-center justify-center gap-8 select-none pointer-events-none">
          🍳 🥘 🍽️ 🔪 🥄
        </div>
        <div className="relative">
          <h1 className="text-3xl sm:text-4xl font-extrabold">{t('howto.title')}</h1>
          <p className="mt-3 max-w-2xl mx-auto text-white/85">{t('howto.subtitle')}</p>
        </div>
      </section>

      {/* Step journey */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="relative">
          {/* connecting line (desktop) */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-amber-200 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-4">
            {steps.map((s, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center px-2">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-white ring-4 ring-amber-100 text-brand-accent flex items-center justify-center shadow-sm">
                    <s.icon size={26} />
                  </div>
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-bold mt-4 text-brand">{s.title}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-snug">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payments strip */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <span className="text-sm font-semibold text-gray-500">{t('howto.payWith', 'Pay your way')}</span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {payments.map((p) => (
              <span key={p.label} className="flex items-center gap-2 bg-brand-accent/10 text-brand rounded-full px-4 py-2 text-sm font-medium">
                <p.icon size={16} className="text-brand-accent" /> {p.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 px-4">
        <h2 className="text-2xl font-extrabold text-brand">{t('howto.ready')}</h2>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/shop" className="inline-flex items-center justify-center gap-2 bg-brand text-white font-bold px-8 py-3 rounded-full hover:bg-black transition">
            {t('howto.cta')} <ArrowRight size={18} />
          </Link>
          <a href={whatsappLink(waMsg)} target="_blank" rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-brand-accent text-white font-bold px-8 py-3 rounded-full hover:bg-amber-600 transition">
            <MessageCircle size={18} /> {t('howto.orderWhatsapp', 'Order on WhatsApp')}
          </a>
        </div>
      </section>
    </div>
  );
}


import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, ShoppingCart, CreditCard, Package, Truck } from 'lucide-react';

export default function HowToBuyPage() {
  const { t } = useTranslation();
  const steps = [
    { icon: Search, title: t('howto.s1t'), desc: t('howto.s1d') },
    { icon: ShoppingCart, title: t('howto.s2t'), desc: t('howto.s2d') },
    { icon: Package, title: t('howto.s3t'), desc: t('howto.s3d') },
    { icon: CreditCard, title: t('howto.s4t'), desc: t('howto.s4d') },
    { icon: Truck, title: t('howto.s5t'), desc: t('howto.s5d') },
  ];
  return (
    <div>
      <section className="bg-gradient-to-br from-brand-accent to-orange-600 text-white text-center px-4 py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold">{t('howto.title')}</h1>
        <p className="mt-3 max-w-2xl mx-auto text-white/85">{t('howto.subtitle')}</p>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-brand-accent text-white flex items-center justify-center">
              <s.icon size={24} />
            </div>
            <h3 className="font-bold mt-4">{s.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{s.desc}</p>
          </div>
        ))}
      </section>
      <section className="text-center pb-16 px-4">
        <h2 className="text-2xl font-extrabold text-brand">{t('howto.ready')}</h2>
        <Link to="/shop" className="inline-block mt-5 bg-brand text-white font-bold px-8 py-3 rounded-full">{t('howto.cta')}</Link>
      </section>
    </div>
  );
}

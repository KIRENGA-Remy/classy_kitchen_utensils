import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Truck, Smartphone, RotateCcw, ArrowRight } from 'lucide-react';

const PRODUCTS = [
  { src: '/hero/fridge.png', name: 'Refrigerators' },
  { src: '/hero/serving_pot.png', name: 'Cookware' },
  { src: '/hero/stove.png', name: 'Gas stoves' },
  { src: '/hero/vacuum_flask.png', name: 'Vacuum flasks' },
  { src: '/hero/spoon.png', name: 'Kitchen tools' },
];

export default function HeroCarousel() {
  const { t } = useTranslation();

  const slides = [
    { title: t('hero.slide1Title'), sub: t('hero.slide1Sub'), cta: t('hero.shopNow') },
    { title: t('hero.slide2Title'), sub: t('hero.slide2Sub'), cta: t('hero.browse') },
    { title: t('hero.slide3Title'), sub: t('hero.slide3Sub'), cta: t('hero.orderNow') },
  ];

  const [active, setActive] = useState(0);
  const n = PRODUCTS.length;

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % n), 3500);
    return () => clearInterval(id);
  }, [n]);

  // position of each product relative to the active one
  const styleFor = (idx: number): React.CSSProperties => {
    const pos = (idx - active + n) % n;
    const base: React.CSSProperties = {
      transition: 'all 0.7s cubic-bezier(.4,0,.2,1)',
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
    if (pos === 0) return { ...base, transform: 'translateX(0) rotateY(0) scale(1)', opacity: 1, zIndex: 30 };
    if (pos === n - 1) return { ...base, transform: 'translateX(-120%) rotateY(35deg) scale(.8)', opacity: 0, zIndex: 10 };
    return { ...base, transform: 'translateX(120%) rotateY(-35deg) scale(.8)', opacity: 0, zIndex: 10 };
  };

  const slide = slides[active % slides.length];

  const badges = [
    { icon: Truck, label: t('hero.badgeDeliver', 'Delivered in Rwanda') },
    { icon: Smartphone, label: t('hero.badgePay', 'MoMo & Airtel') },
    { icon: RotateCcw, label: t('hero.badgeReturn', 'Easy returns') },
  ];

  return (
    <section className="w-full px-4 sm:px-8 pt-6">
      <style>{`@keyframes ckFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}`}</style>

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 via-white to-amber-50 border border-amber-100">
        <div className="grid md:grid-cols-2 items-center gap-6 px-6 sm:px-12 py-10 sm:py-14">

          {/* LEFT: message + purpose */}
          <div className="max-w-xl">
            <span className="inline-block bg-brand-accent/10 text-brand-accent text-xs font-bold rounded-full px-3 py-1">
              {t('hero.tagline', 'Kitchenware store · Kigali')}
            </span>
            <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold text-brand leading-tight transition-all duration-500">
              {slide.title}
            </h1>
            <p className="mt-4 text-gray-600 text-base sm:text-lg transition-all duration-500">{slide.sub}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/shop" className="inline-flex items-center gap-2 bg-brand-accent text-white font-bold px-6 py-3 rounded-full hover:bg-amber-600 transition">
                {slide.cta} <ArrowRight size={18} />
              </Link>
              <Link to="/how-to-buy" className="inline-flex items-center gap-2 border border-gray-300 text-brand font-semibold px-6 py-3 rounded-full hover:border-brand-accent hover:text-brand-accent transition">
                {t('hero.howTo', 'How to buy')}
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
              {badges.map((b) => (
                <span key={b.label} className="flex items-center gap-2 text-sm text-gray-600">
                  <b.icon size={16} className="text-brand-accent" /> {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT: rotating product stage */}
          <div className="relative h-[300px] sm:h-[380px]" style={{ perspective: '1200px' }}>
            {/* soft glow behind the centered product */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-brand-accent/20 blur-3xl" />

            {PRODUCTS.map((p, idx) => (
              <div key={p.src} style={styleFor(idx)}>
                <div style={(idx - active + n) % n === 0 ? { animation: 'ckFloat 3.5s ease-in-out infinite' } : undefined}>
                  <img src={p.src} alt={p.name} className="max-h-[230px] sm:max-h-[320px] object-contain drop-shadow-2xl" />
                </div>
              </div>
            ))}

            {/* product name + dots */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-40">
              <span className="text-sm font-semibold text-brand">{PRODUCTS[active].name}</span>
              <div className="flex gap-2">
                {PRODUCTS.map((_, idx) => (
                  <button key={idx} onClick={() => setActive(idx)} aria-label={`Show ${PRODUCTS[idx].name}`}
                    className={`h-2 rounded-full transition-all ${idx === active ? 'w-6 bg-brand-accent' : 'w-2 bg-gray-300'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


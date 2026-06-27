import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function HeroCarousel() {
  const { t } = useTranslation();
  const slides = [
    { title: t('hero.slide1Title'), sub: t('hero.slide1Sub'), cta: t('hero.shopNow'), grad: 'from-brand to-gray-800' },
    { title: t('hero.slide2Title'), sub: t('hero.slide2Sub'), cta: t('hero.browse'), grad: 'from-amber-600 to-orange-700' },
    { title: t('hero.slide3Title'), sub: t('hero.slide3Sub'), cta: t('hero.orderNow'), grad: 'from-orange-600 to-brand' },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section className="w-full px-4 sm:px-8 pt-6">
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${slides[i].grad} transition-all duration-700`}>
        <div className="px-6 sm:px-12 py-14 sm:py-24 max-w-2xl">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">{slides[i].title}</h1>
          <p className="mt-4 text-white/85 text-base sm:text-lg">{slides[i].sub}</p>
          <Link to="/shop" className="inline-block mt-7 bg-white text-brand font-bold px-6 py-3 rounded-full hover:bg-amber-50 transition">
            {slides[i].cta}
          </Link>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)}
              className={`h-2 rounded-full transition-all ${idx === i ? 'w-6 bg-white' : 'w-2 bg-white/50'}`} aria-label={`Slide ${idx + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

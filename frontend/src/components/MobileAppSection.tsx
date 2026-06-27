import { useTranslation } from 'react-i18next';
import { Apple, Smartphone } from 'lucide-react';
import { site } from '../config/site';

export default function MobileAppSection() {
  const { t } = useTranslation();
  return (
    <section className="w-full px-4 sm:px-8 mt-16">
      <div className="rounded-3xl bg-brand text-white p-8 sm:p-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-brand-accent text-xs font-bold border border-brand-accent/40 rounded-full px-3 py-1">
            ● {t('app.badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-4">{t('app.title')}</h2>
          <p className="text-white/70 mt-3 max-w-md">{t('app.text')}</p>
        </div>
        <div className="flex flex-wrap gap-4 md:justify-end">
          <a href={site.appStoreUrl} className="flex items-center gap-3 bg-black/60 border border-white/10 rounded-xl px-5 py-3">
            <Apple size={26} />
            <span><span className="block text-[10px] text-white/60">DOWNLOAD ON THE</span><span className="font-bold">{t('app.appStore')}</span></span>
          </a>
          <a href={site.playStoreUrl} className="flex items-center gap-3 bg-black/60 border border-white/10 rounded-xl px-5 py-3">
            <Smartphone size={24} className="text-green-400" />
            <span><span className="block text-[10px] text-white/60">DOWNLOAD ON</span><span className="font-bold">{t('app.android')}</span></span>
          </a>
        </div>
      </div>
    </section>
  );
}

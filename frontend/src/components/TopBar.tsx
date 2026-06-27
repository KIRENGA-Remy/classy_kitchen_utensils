import { useTranslation } from 'react-i18next';
import { Instagram, Facebook, Youtube, Smartphone, Languages, Phone } from 'lucide-react';
import { site } from '../config/site';

export default function TopBar() {
  const { t, i18n } = useTranslation();
  const isRw = i18n.language?.startsWith('rw');
  return (
    <div className="bg-brand-accent text-white text-sm">
      <div className="w-full px-8 sm:px-16 h-10 flex items-center justify-between gap-3">
        <div className="hidden sm:flex items-center gap-2 font-semibold">
          <Phone size={15} /> <span>{t('topbar.helpline')} : {site.helpline}</span>
        </div>
        <button
          onClick={() => i18n.changeLanguage(isRw ? 'en' : 'rw')}
          className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 rounded-full px-3 py-1 font-medium transition"
        >
          <Languages size={15} /> {t('topbar.lang')}
        </button>
        <div className="flex items-center gap-3">
          {/* <a href={site.appStoreUrl} className="hidden md:flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 font-medium">
            <Smartphone size={15} /> {t('topbar.getApp')}
          </a> */}
          <div className="hidden sm:flex items-center gap-3">
            <a href={site.socials.instagram} aria-label="Instagram"><Instagram size={16} /></a>
            <a href={site.socials.facebook} aria-label="Facebook"><Facebook size={16} /></a>
            <a href={site.socials.youtube} aria-label="YouTube"><Youtube size={16} /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

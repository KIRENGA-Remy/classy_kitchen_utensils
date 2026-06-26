import { useTranslation } from 'react-i18next';
import { Instagram, Facebook, Music2 } from 'lucide-react';
import { site } from '../config/site';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-brand text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-3">
        <div>
          <h3 className="text-white font-semibold mb-2">{t('brand')}</h3>
          <p className="text-sm">{t('contact.location')}</p>
          <p className="text-sm mt-1">{t('contact.payments')}</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">{t('footer.follow')}</h4>
          <div className="flex gap-4">
            <a href={site.socials.instagram} aria-label="Instagram"><Instagram size={20} /></a>
            <a href={site.socials.facebook} aria-label="Facebook"><Facebook size={20} /></a>
            <a href={site.socials.tiktok} aria-label="TikTok"><Music2 size={20} /></a>
          </div>
        </div>
        <div className="text-sm">
          <p>© {new Date().getFullYear()} {t('brand')}.</p>
          <p>{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
